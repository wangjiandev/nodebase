import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import type { Options } from "ky";
import ky from "ky";
import type { NodeExecutor } from "@/features/executions/types";

Handlebars.registerHelper("json", (context) => {
  const jsonString = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(jsonString);
});

type HttpRequestData = {
  variableName: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  context,
  step,
}) => {
  if (!data.endpoint) {
    throw new NonRetriableError("endpoint is required");
  }

  if (!data.variableName) {
    throw new NonRetriableError("Variable Name is required");
  }

  if (!data.method) {
    throw new NonRetriableError("Method is required");
  }

  const result = await step.run("http-request", async () => {
    const endpoint = Handlebars.compile(data.endpoint)(context);
    const method = data.method;
    const options: Options = {
      method,
    };
    if (["POST", "PUT", "PATCH"].includes(method)) {
      const resolvedBody = Handlebars.compile(data.body || "{}")(context);
      JSON.parse(resolvedBody);
      options.body = resolvedBody;
      options.headers = {
        "Content-Type": "application/json",
      };
    }
    const response = await ky(endpoint, options);
    const responseType = response.headers.get("content-type");
    const responseData = responseType?.includes("application/json")
      ? await response.json()
      : await response.text();

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };

    const compiledVariableName = Handlebars.compile(data.variableName)(context);

    return {
      ...context,
      [compiledVariableName]: responsePayload,
    };
  });

  return result;
};
