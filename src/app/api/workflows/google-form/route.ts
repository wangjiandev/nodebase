import { type NextRequest, NextResponse } from "next/server";
import { sendWorkflowExecution } from "@/inngest/utils";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        { success: false, error: "Missing workflowId parameter" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const formData = {
      formId: body.formId,
      formTitle: body.formTitle,
      responseId: body.responseId,
      timeStamp: body.timeStamp,
      respondentEmail: body.respondentEmail,
      responses: body.responses,
      raw: body,
    };

    // Trigger an inngest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        googleForm: formData,
      },
    });
    return NextResponse.json({ success: true });
  } catch (_) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process Google Form webhook",
      },
      { status: 500 }
    );
  }
}
