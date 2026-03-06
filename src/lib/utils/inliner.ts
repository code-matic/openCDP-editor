import juice from "juice";

export function handleInlineCSS(html: string): string {
  return juice(html, {
    removeStyleTags: true,
    applyAttributesTableElements: true,
    preserveImportant: true,
  });
}

export function needsInliningDetailed(html: string): boolean {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.querySelectorAll("style").length > 0;
}
