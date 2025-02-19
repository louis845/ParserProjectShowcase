import { escapeHTML, InstructionTemplate } from "./InstructionTemplate";

export class Phi3 extends InstructionTemplate {
    public supportsSystemPrompt(): boolean {
        return true;
    }

    public formatFirstPrompt(prompt: string, systemPrompt: string | null): string {
        if (systemPrompt === null) {
            systemPrompt = "You are a helpful assistant.";
        }
        return (escapeHTML("<s><|system|>\n") + systemPrompt +
            escapeHTML("<|end|>\n<|user|>\n") + prompt + escapeHTML("<|end|>"));
    }

    public formatPrompt(prompt: string): string {
        return escapeHTML("\n<|user|>\n") + prompt + escapeHTML("<|end|>");
    }

    public getInstructionTemplateAssistantStart(): string {
        return escapeHTML("\n<|assistant|>\n")
    }

    public getInstructionTemplateAssistantEnd(): string {
        return escapeHTML("<|end|>");
    }
}