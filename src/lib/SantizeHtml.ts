// sanitizeHTML.ts
import DOMPurify from 'dompurify';

// Hook to sanitize CSS styles manually
// DOMPurify.addHook('uponSanitizeAttribute', (node) => {
//   if (!node || typeof node.hasAttribute !== "function") return;
//   if (node.hasAttribute('style')) {
//     const style = node.getAttribute('style') || '';

//     // Allow only safe styles
//     const safeStyles = style
//       .split(';')
//       .map(s => s.trim())
//       .filter(s => {
//         const [prop] = s.split(':').map(p => p.trim().toLowerCase());
//         return [
//           'color',
//           'font-weight',
//           'font-style',
//           'text-decoration',
//           'background-color',
//           'font-size',
//           'text-align',
//         ].includes(prop);
//       })
//       .join('; ');
//     if (safeStyles) {
//       node.setAttribute('style', safeStyles);
//     } else {
//       node.removeAttribute('style');
//     }
//   }
// });

DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
  if (!node || typeof node.hasAttribute !== "function") return;

  if (data.attrName === 'style') {
    const style = data.attrValue || '';

    // Allow only safe styles
    const safeStyles = style
      .split(';')
      .map(s => s.trim())
      .filter(s => {
        const [prop] = s.split(':').map(p => p.trim().toLowerCase());
        return [
          'color',
          'font-weight',
          'font-style',
          'text-decoration',
          'background-color',
          'font-size',
          'text-align',
        ].includes(prop);
      })
      .join('; ');

    if (safeStyles) {
      data.attrValue = safeStyles;
    } else {
      // Remove attribute entirely
      data.keepAttr = false;
    }
  }
});


// Your sanitize function
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'span', 'div', 'br', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['style', 'href', 'target', 'rel'],
    FORBID_ATTR: ['onerror', 'onclick', 'onload'],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed'],
  });
};
