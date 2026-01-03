export const processInitialValue = (html: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // 1. Find the style tag (even if it's in the <head>)
    const styleTag = doc.querySelector('style');
    
    // 2. Extract the body content
    let bodyContent = doc.body.innerHTML;
  
    // 3. If a style tag exists, wrap it in a div and prepend it to the content
    if (styleTag) {
      const styleWrapper = `<div class="editor-styles-container">${styleTag.outerHTML}</div>`;
      bodyContent = styleWrapper + bodyContent;
    }
  
    return bodyContent;
  };
  