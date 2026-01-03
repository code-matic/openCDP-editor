export const getFullHTML = (editorContent: string) => {
    const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Exported Document</title>
      </head>
      <body>
        ${editorContent}
      </body>
      </html>
    `;
    return template;
  };
  