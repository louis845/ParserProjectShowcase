import { escapeHTML, InstructionTemplate } from "./InstructionTemplate";

export class Llama3 extends InstructionTemplate {
    public supportsSystemPrompt(): boolean {
        return true;
    }

    public formatFirstPrompt(prompt: string, systemPrompt: string | null): string {
        if (systemPrompt === null) {
            systemPrompt = "You are a helpful assistant.";
        }
        return (escapeHTML("<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n") + systemPrompt +
            escapeHTML("<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n") + prompt + escapeHTML("<|eot_id|>"));
    }

    public formatPrompt(prompt: string): string {
        return escapeHTML("<|start_header_id|>user<|end_header_id|>\n\n") + prompt + escapeHTML("<|eot_id|>");
    }

    public getInstructionTemplateAssistantStart(): string {
        return escapeHTML("<|start_header_id|>assistant<|end_header_id|>\n\n")
    }

    public getInstructionTemplateAssistantEnd(): string {
        return escapeHTML("<|eot_id|>");
    }
}