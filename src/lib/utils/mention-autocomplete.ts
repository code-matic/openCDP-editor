import type { InsertableAttribute } from "../types";

/** Walk text nodes in document order; concatenate text up to (endNode, endOffset). */
export function collectTextBeforeCaret(editor: HTMLElement, endNode: Node, endOffset: number): string {
  let out = "";
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const tn = n as Text;
    if (tn === endNode) {
      out += tn.data.slice(0, endOffset);
      break;
    }
    out += tn.data;
  }
  return out;
}

/** Map a character offset in the editor's text stream to a DOM boundary. */
export function resolveTextOffsetInEditor(
  editor: HTMLElement,
  targetOffset: number
): { node: Text; offset: number } | null {
  let remaining = targetOffset;
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null);
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const tn = n as Text;
    const len = tn.data.length;
    if (remaining < len) return { node: tn, offset: remaining };
    if (remaining === len) return { node: tn, offset: len };
    remaining -= len;
  }
  return null;
}

export interface ParsedMention {
  /** Resolved namespace; `both` when only `@` has been typed so far. */
  group: "customer" | "event" | "both";
  /** Filter on attribute label / value (suffix after full `customer` / `event` word when applicable). */
  query: string;
  matchLength: number;
  startOffset: number;
}

const CUSTOMER = "customer";
const EVENT = "event";

/** Map `@` + raw run (e.g. `c`, `cust`, `customer`, `customerfir`) to namespace + attribute filter. */
export function parseMentionRawRun(raw: string): { group: ParsedMention["group"]; query: string } | null {
  if (raw === "") return { group: "both", query: "" };

  if (raw.startsWith(CUSTOMER)) {
    return { group: "customer", query: raw.slice(CUSTOMER.length) };
  }
  if (raw.startsWith(EVENT)) {
    return { group: "event", query: raw.slice(EVENT.length) };
  }
  if (CUSTOMER.startsWith(raw)) {
    return { group: "customer", query: "" };
  }
  if (EVENT.startsWith(raw)) {
    return { group: "event", query: "" };
  }
  return null;
}

/**
 * If the caret is immediately after an active @-mention token, return it.
 * Supports partial keywords (`@c`, `@cust`, `@e`, `@eve`) and full `@customer` / `@event` plus a filter suffix.
 * Uses a word-boundary rule before `@` so `a@customer` does not trigger.
 */
export function parseMentionAtCaret(
  editor: HTMLElement,
  anchorNode: Node,
  anchorOffset: number
): ParsedMention | null {
  if (anchorNode.nodeType !== Node.TEXT_NODE) return null;
  const before = collectTextBeforeCaret(editor, anchorNode, anchorOffset);
  const at = before.lastIndexOf("@");
  if (at < 0) return null;
  if (at > 0 && /[a-zA-Z0-9_]/.test(before.charAt(at - 1))) return null;
  const tail = before.slice(at);
  const m = tail.match(/^@([a-zA-Z0-9_]*)$/);
  if (!m) return null;
  const raw = m[1] ?? "";
  const parsed = parseMentionRawRun(raw);
  if (!parsed) return null;
  const mentionOnly = `@${raw}`;
  const startOffset = before.length - mentionOnly.length;
  return {
    group: parsed.group,
    query: parsed.query,
    matchLength: mentionOnly.length,
    startOffset,
  };
}

function isCustomerAttr(a: InsertableAttribute): boolean {
  return /\{\{\s*customer\./.test(a.value);
}

function isEventAttr(a: InsertableAttribute): boolean {
  return /\{\{\s*event\./.test(a.value);
}

export function filterInsertableAttributes(
  attrs: InsertableAttribute[],
  group: "customer" | "event" | "both",
  query: string
): InsertableAttribute[] {
  const base =
    group === "both"
      ? attrs.filter((a) => isCustomerAttr(a) || isEventAttr(a))
      : attrs.filter((a) => (group === "customer" ? isCustomerAttr(a) : isEventAttr(a)));
  const q = query.trim().toLowerCase();
  if (!q) return base;
  return base.filter(
    (a) => a.label.toLowerCase().includes(q) || a.value.toLowerCase().replace(/\s/g, "").includes(q)
  );
}
