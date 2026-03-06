import { codes, code as codeLookup } from "currency-codes";

export const COMMON_CURRENCY_CODES = [
  "USD", "EUR", "GBP", "NGN", "CAD", "AUD", "JPY", "INR",
] as const;

const NON_PRACTICAL_CODES = new Set([
  "XAU", "XAG", "XPT", "XPD", "XBA", "XBB", "XBC", "XBD",
  "XDR", "XSU", "XUA", "XXX", "XTS", "USN", "UYI", "UYW",
  "CLF", "COU", "MXV", "BOV", "CHE", "CHW", "CUC", "VED", "ZWL",
]);

export const VALID_CURRENCY_CODES = new Set(codes().filter((c) => !NON_PRACTICAL_CODES.has(c)));

export function getCurrencyName(currencyCode: string): string | undefined {
  return codeLookup(currencyCode)?.currency;
}

export function isValidCurrencyCode(currencyCode: string): boolean {
  if (!currencyCode) return false;
  return VALID_CURRENCY_CODES.has(currencyCode.toUpperCase());
}

export function extractCurrencyCodesFromTemplate(template: string): string[] {
  const regex = /\|\s*(?:money|money_with_currency|money_no_decimals)\s*:\s*["']([^"']+)["']/g;
  const extracted: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(template)) !== null) {
    extracted.push(match[1].toUpperCase());
  }
  return extracted;
}

export function findInvalidCurrencyCodes(template: string): string[] {
  const extracted = extractCurrencyCodesFromTemplate(template);
  return extracted.filter((c) => !isValidCurrencyCode(c));
}
