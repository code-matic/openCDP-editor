export declare const COMMON_CURRENCY_CODES: readonly ["USD", "EUR", "GBP", "NGN", "CAD", "AUD", "JPY", "INR"];
export declare const VALID_CURRENCY_CODES: Set<string>;
export declare function getCurrencyName(currencyCode: string): string | undefined;
export declare function isValidCurrencyCode(currencyCode: string): boolean;
export declare function extractCurrencyCodesFromTemplate(template: string): string[];
export declare function findInvalidCurrencyCodes(template: string): string[];
