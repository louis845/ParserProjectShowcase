import { FIMTemplate, escapeBlue, escapeGreen } from "./FIMTemplate";
import { escapeHTML, escapeRed } from "./InstructionTemplate";

export class Qwen2Coder extends FIMTemplate{
    
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
        return escapeHTML("<|endoftext|>");
    }

    public getStartOfSequence(): string {
        return "";
    }

    public getFileSeparator(): string | null {
        return escapeHTML("<|file_sep|>");
    }

    public formatFillingObjective(prefix: string, suffix: string, context: string[] | null): string {
        let formatStr = "";

        if (context !== null) {
            formatStr = escapeHTML("<|repo_name|>CodeRepo\n");
            context.forEach((cont, index) => {
                formatStr += this.getFileSeparator() + `code_file_${index + 1}\n`;
                formatStr += escapeRed(cont) + "\n";
            });
            formatStr += this.getFileSeparator() + "code_to_edit\n";
        }

        formatStr += this.getFillPrefix();
        formatStr += escapeBlue(prefix);
        formatStr += this.getFillSuffix();
        formatStr += escapeGreen(suffix);
        formatStr += this.getFillMiddleStart();

        return formatStr;
    }
    
}