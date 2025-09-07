'use server';

import { agentBuilderTool, type AgentBuilderInput, type AgentBuilderOutput } from '@/ai/flows/agent-builder-tool';

export async function buildAgentAction(
  input: AgentBuilderInput
): Promise<{ success: true; data: AgentBuilderOutput } | { success: false; error: string }> {
  try {
    const result = await agentBuilderTool(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error in buildAgentAction:', error);
    // The provided AI flow might have issues. We return a user-friendly message.
    return {
      success: false,
      error: 'An unexpected error occurred while building the agent. The AI model may be temporarily unavailable. Please try again later.',
    };
  }
}
