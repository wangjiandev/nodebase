import { NonRetriableError } from "inngest";
import type { Options } from "ky";
import ky from "ky";
import type { NodeExecutor } from "@/features/executions/types";

type HttpRequestData = {
  variableName?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
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

  const result = await step.run("http-request", async () => {
    const method = data.method || "GET";
    const endpoint = data.endpoint!;
    const options: Options = {
      method,
    };
    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.body = data.body;
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

    if (data.variableName) {
      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    }
    return {
      ...context,
      ...responsePayload,
    };
  });

  return result;
};
