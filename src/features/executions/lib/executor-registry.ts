import { goolgeFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { NodeType } from "@/generated/prisma/enums";
import { geminiExecutor } from "../components/gemini/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import type { NodeExecutor } from "../types";

export const executeRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: goolgeFormTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.DEEPSEEK]: geminiExecutor,
  [NodeType.OPENAI]: geminiExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executeRegistry[type];
  if (!executor) {
    throw new Error(`executor not found for type ${type}`);
  }
  return executor;
};
