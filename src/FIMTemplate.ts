import { escapeHTML } from "./InstructionTemplate";

export abstract class FIMTemplate {
    public abstract getFillPrefix(): string;
    public abstract getFillSuffix(): string;
    public abstract getFillMiddleStart(): string;
    public abstract getFillMiddleEnd(): string;
    public abstract getStartOfSequence(): string;
    public abstract getFileSeparator(): string | null;
    public abstract formatFillingObjective(prefix: string, suffix: string, context: string[] | null): string;
}

export function escapeBlue(str: string): string {
    return "<span class=\"text-blue-500\">" + escapeHTML(str) + "</span>";
}

export function escapeGreen(str: string): string {
    return "<span class=\"text-green-500\">" + escapeHTML(str) + "</span>";
}