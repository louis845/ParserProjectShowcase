import { InstructionTemplate, escapeHTML } from "./InstructionTemplate";

export class Qwen2 extends InstructionTemplate {
    constructor() {super();}

    public supportsSystemPrompt(): boolean {
        return true;
    }

    public formatFirstPrompt(prompt: string, systemPrompt: string | null): string {
        if (systemPrompt === null) {
            systemPrompt = "You are a helpful assistant.";
        }
        return (escapeHTML("<|im_start|>system\n") + systemPrompt +
            escapeHTML("<|im_end|>\n<|im_start|>user\n") + prompt + escapeHTML("<|im_end|>"));
    }

    public formatPrompt(prompt: string): string {
        return escapeHTML("\n<|im_start|>user\n") + prompt + escapeHTML("<|im_end|>");
    }

    public getInstructionTemplateAssistantStart(): string {
        return escapeHTML("\n<|im_start|>assistant\n")
    }

    public getInstructionTemplateAssistantEnd(): string {
        return escapeHTML("<|im_end|>");
    }
}