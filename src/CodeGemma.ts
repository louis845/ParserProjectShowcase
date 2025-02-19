import { escapeBlue, escapeGreen, FIMTemplate } from "./FIMTemplate";
import { escapeHTML, escapeRed } from "./InstructionTemplate";

export class CodeGemma extends FIMTemplate {

    public getFillPrefix(): string {
        return escapeHTML("<|fim_prefix|>");
    }

    public getFillSuffix(): string {
        return escapeHTML("<|fim_suffix|>");
    }

    public getFillMiddleStart(): string {
        return escapeHTML("<|fim_middle|>");
    }

    public getFillMiddleEnd(): string {
        return escapeHTML("<eos>");
    }

    public getStartOfSequence(): string {
        return escapeHTML("<bos>");
    }

    public getFileSeparator(): string | null {
        return escapeHTML("<|file_separator|>");
    }

    public formatFillingObjective(prefix: string, suffix: string, context: string[] | null): string {
        let formatStr = this.getStartOfSequence();
        if (context !== null) {
            for (const cont of context) {
                formatStr += escapeRed(cont);
                const sep = this.getFileSeparator();
                if (sep === null) {
                    throw new Error("Invalid file separator.");
                }
                formatStr += sep;
            }
        }
        formatStr += this.getFillPrefix();
        formatStr += escapeBlue(prefix);
        formatStr += this.getFillSuffix();
        formatStr += escapeGreen(suffix);
        formatStr += this.getFillMiddleStart();
        
        return formatStr;
    }
    
}