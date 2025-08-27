
# @codematic.io/open-cdp-editor

A customizable, React-based rich text editor component with sanitization and extensible toolbar, built with [Ant Design](https://ant.design/) and [DOMPurify](https://github.com/cure53/DOMPurify). Includes a flexible modal system for image selection, designed for npm package consumers to fully control image sources and insertion logic.

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
import { Editor } from '@codematic.io/open-cdp-editor';

function MyEditorComponent() {

  const [showImageModal, setShowImageModal] = useState(false);
  
  const handleChange = (html: string) => {
    // handle updated HTML or full HTML here
    console.log(html);
  };



  return (
    <>
      <TextEditor
        bodyHTML={initialHTML}
        // fullHTML={initialHTML}
        className="!h-[300px]"
        children={<div>Custom Modal Content</div>}
        onChange={handleEditorChange} />
    </>
  );
}

export default MyEditorComponent;
```

---


## Props

### Editor

| Prop        | Type                            | Description                                                                                                 |
|-------------|---------------------------------|-------------------------------------------------------------------------------------------------------------|
| `bodyHTML`  | `string`                        | The HTML content to display and edit inside the editor's body. Ignored if `fullHTML` is provided.           |
| `fullHTML`  | `string`                        | The full HTML document to edit. If provided, the editor will extract and edit the `<body>` content, and `onChange` will return the updated full HTML document. |
| `onChange`  | `(html: string) => void`        | Callback function that receives the updated HTML content. Returns full HTML if `fullHTML` is set, otherwise just the body HTML. |
| ...         | ...                             | See source for more options.                                                                                |

### ImageModal

| Prop        | Type                  | Description                                                                                                 |
|-------------|-----------------------|-------------------------------------------------------------------------------------------------------------|
| `onClose`   | `() => void`          | Function to close the modal.                                                                                |
| `children`  | `React.ReactNode`     | Content to display inside the modal (e.g., your image grid).                                                |

**Note:** The modal does not fetch images itself. You must provide the image grid and handle image selection logic in your own code. This makes the modal fully customizable and reusable for any content.


## Customization

- **Toolbar**: Modify `ToolbarButton` or add your own in `src/components/`.
- **Icons**: SVG icons are in `src/components/icons/`.
- **Sanitization**: See `lib/SantizeHtml.ts` for how HTML is cleaned.
- **Image Modal**: Pass any content as `children` to `ImageModal` (such as a grid of images, file upload, etc). Handle image selection and insertion logic in your own code for maximum flexibility.

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