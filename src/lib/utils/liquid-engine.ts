import { Liquid } from "liquidjs";

const liquidEngine = new Liquid({
  strictVariables: false,
  strictFilters: false,
});

function toNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

const DECIMAL_2 = { minimumFractionDigits: 2, maximumFractionDigits: 2 } as const;
const DECIMAL_0 = { minimumFractionDigits: 0, maximumFractionDigits: 0 } as const;

function formatPlain(n: number, decimals: typeof DECIMAL_2 | typeof DECIMAL_0): string {
  return new Intl.NumberFormat("en-US", decimals).format(n);
}

liquidEngine.registerFilter("money", (value: unknown, currency?: string) => {
  const n = toNumber(value);
  if (!currency) return formatPlain(n, DECIMAL_2);
  try {
    return new Intl.NumberFormat("en-US", {
      ...DECIMAL_2,
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(n);
  } catch {
    return `${currency} ${formatPlain(n, DECIMAL_2)}`;
  }
});

liquidEngine.registerFilter("money_with_currency", (value: unknown, currency?: string) => {
  const n = toNumber(value);
  if (!currency) return formatPlain(n, DECIMAL_2);
  return `${currency} ${formatPlain(n, DECIMAL_2)}`;
});

liquidEngine.registerFilter("money_no_decimals", (value: unknown, currency?: string) => {
  const n = toNumber(value);
  if (!currency) return formatPlain(n, DECIMAL_0);
  try {
    return new Intl.NumberFormat("en-US", {
      ...DECIMAL_0,
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(n);
  } catch {
    return `${currency} ${formatPlain(n, DECIMAL_0)}`;
  }
});

liquidEngine.registerFilter("number", (value: unknown) => {
  return new Intl.NumberFormat("en-US").format(toNumber(value));
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builtinDate = liquidEngine.filters.date as (this: any, value: unknown, format?: string) => string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
liquidEngine.registerFilter("date", function (this: any, value: unknown, format?: string) {
  if (value === null || value === undefined || value === "") return "";
  return builtinDate.call(this, value, format);
});

export default liquidEngine;
