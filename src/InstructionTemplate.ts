/**
 * Port of the Python version from LLM Helper to TypeScript
 */
export abstract class InstructionTemplate {
    public abstract supportsSystemPrompt(): boolean;
    public abstract formatFirstPrompt(prompt: string, systemPrompt: string | null): string;
    public abstract formatPrompt(prompt: string): string;
    public abstract getInstructionTemplateAssistantStart(): string;
    public abstract getInstructionTemplateAssistantEnd(): string;

    public formatMultiturnPrompts(
        promptConvo: string[],
        systemPrompt: string | null=null,
        systemPromptFallback: string="You are a helpful assistant."
    ): string {
        if (systemPrompt === null) {
            systemPrompt = systemPromptFallback;
        }

        let result: string = "";
        for (let i = 0; i < Math.floor((promptConvo.length + 1) / 2); i++) {
            const first = 2 * i;
            const second = 2 * i + 1;

            if (i == 0) {
                if (this.supportsSystemPrompt()) {
                    result += this.formatFirstPrompt(escapeRed(promptConvo[first]), escapeRed(systemPrompt));
                } else {
                    result += this.formatFirstPrompt(escapeRed(promptConvo[first]), null);
                }
            } else {
                result += this.formatPrompt(escapeRed(promptConvo[first]));
            }

            if (second < promptConvo.length) {
                result += (this.getInstructionTemplateAssistantStart() + escapeRed(promptConvo[second]) + this.getInstructionTemplateAssistantEnd());
            }
        }
        return result;
    }
}

export function escapeHTML(str: string): string {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

export function escapeRed(str: string): string {
    return "<span class=\"text-red-500\">" + escapeHTML(str) + "</span>";
}