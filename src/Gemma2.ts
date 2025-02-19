import { escapeHTML, InstructionTemplate } from "./InstructionTemplate";

export class Gemma2 extends InstructionTemplate {
    public supportsSystemPrompt(): boolean {
        return false;
    }

    public formatFirstPrompt(prompt: string, systemPrompt: string | null): string {
        if (systemPrompt !== null) {
            throw new Error("Gemma 2 doesn't support system prompts.");
        }
        return escapeHTML("<bos>") + this.formatPrompt(prompt).substring(1);
    }

    public formatPrompt(prompt: string): string {
        return escapeHTML("\n<start_of_turn>user\n") + prompt + escapeHTML("<end_of_turn>");
    }

    public getInstructionTemplateAssistantStart(): string {
        return escapeHTML("\n<start_of_turn>model\n")
    }

    public getInstructionTemplateAssistantEnd(): string {
        return escapeHTML("<end_of_turn>");
    }
}