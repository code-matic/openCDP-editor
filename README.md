
# @codematic.io/open-cdp-editor
A React rich text editor component designed for openCDP, featuring a robust, extensible toolbar and seamless integration with Ant Design. It includes a sanitization layer using DOMPurify to ensure content security and a flexible modal system, allowing you to fully customize image selection and insertion logic

---


## Features

- **Rich Text Editing**: Bold, italics, underline, lists, alignment, and more.
- **Image & Link Support**: Easily add images and links.
- **Sanitization**: Uses DOMPurify to prevent XSS attacks.
- **Customizable Toolbar**: Add or remove toolbar buttons as needed.
- **TypeScript Support**: Fully typed for safe integration.
- **Ant Design UI**: Clean, modern interface.
- **Flexible Modal System**: Use the provided modal for image selection, or pass your own content for maximum flexibility.

---

## Installation

```bash
npm install @codematic.io/open-cdp-editor
```

---


## Usage

```tsx
import React, { useState } from 'react';
import { TextEditor } from '@codematic.io/open-cdp-editor';
import '@codematic.io/open-cdp-editor/dist/index.css';

function MyEditorComponent() {

  const [showImageModal, setShowImageModal] = useState(false);

  const handleEditorChange = (html: string) => {
    // handle updated HTML or full HTML here
    console.log(html);
  };


  return (
      <TextEditor
        bodyHTML={initialHTML}
        // fullHTML={initialHTML}
        className="!h-[300px]"
        imageChildren={<div>Custom Modal Content</div>}
        onChange={handleEditorChange} />
  );
}

export default MyEditorComponent;
```

---


## Props

| Prop        | Type                            | Description                                                                                                 |
|-------------|---------------------------------|-------------------------------------------------------------------------------------------------------------|
| `bodyHTML`  | `string`                        | The HTML content to display and edit inside the editor's body. Ignored if `fullHTML` is provided.           |
| `fullHTML`  | `string`                        | The full HTML document to edit. If provided, the editor will extract and edit the `<body>` content, and `onChange` will return the updated full HTML document. |
| `onChange`  | `(html: string) => void`        | Callback function that receives the updated HTML content. Returns full HTML if `fullHTML` is set, otherwise just the body HTML. |
| `imageChildren`  | `React.ReactNode`               | Custom content to render inside the editor, such as a modal for image selection. Use this to provide your own image grid/modal and handle image selection and insertion logic. |
| ...         | ...                             | options.                                                                                |

**Note:** The editor does not fetch images or handle image selection logic itself. You must provide your own modal and image grid as children, and handle image insertion in your own code. This makes the editor fully customizable and reusable for any content.


## Customization

- **Toolbar**: Modify `ToolbarButton` or add your own in `src/components/`.
- **Icons**: SVG icons are in `src/components/icons/`.
- **Sanitization**: See `lib/SantizeHtml.ts` for how HTML is cleaned.
- **Image Modal**: Pass any content as `imageChildren` (such as a grid of images, file upload, etc). Handle image selection and insertion logic in your own code for maximum flexibility.

---


## Development

```bash
# Run locally
npm start

# Run tests
npm test

# Build for production
npm run build
```

---


## File Structure

```
src/
  components/         # Editor, Toolbar, Buttons, Icons, ImageModal
  HTML-component/     # Example HTML files
  lib/                # HTML sanitization
```

---


## License

[MIT](LICENSE)

---


## Contributing

Pull requests and issues are welcome! Please open an issue to discuss your idea.

---


## Acknowledgements

- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [DOMPurify](https://github.com/cure53/DOMPurify)