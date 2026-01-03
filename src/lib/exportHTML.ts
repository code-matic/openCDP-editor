export const getFullHTML = (editorContent: string) => {
    const template = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Exported Document</title>
        <style>
          /* Your custom CSS for buttons and shifted images goes here */
          .btn-link { padding: 10px 20px; background: blue; color: white; border-radius: 5px; text-decoration: none; }
          .shift-left { float: left; margin-right: 20px; }
          .shift-right { float: right; margin-left: 20px; }
        </style>
      </head>
      <body>
        ${editorContent}
      </body>
      </html>
    `;
    return template;
  };
  