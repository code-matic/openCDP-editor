# @codematic.io/open-cdp-editor
A React rich text editor component designed for openCDP, featuring a robust, extensible toolbar and seamless integration with Ant Design. It includes a sanitization layer using DOMPurify to ensure content security and a flexible modal system, allowing you to fully customize image selection and insertion logic.

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

To install the package, run the following command:

```bash
npm install @codematic.io/open-cdp-editor
```

Ensure that you have the required peer dependencies installed in your project:

```bash
npm install react react-dom antd
```

---

## Usage

Here is an example of how to use the `TextEditor` component in your project:

```tsx
import React, { useState, useEffect } from 'react';
import TextEditor from '@codematic.io/open-cdp-editor';
import '@codematic.io/open-cdp-editor/dist/index.css';

function MyEditorComponent() {
  const [initialHTML, setInitialHTML] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch initial HTML content
    fetch('http://localhost:3000/code-matic/openCDP-editor/hey.html')
      .then((res) => res.text())
      .then(setInitialHTML);
  }, []);

  useEffect(() => {
    // Load images from localStorage or set default images
    const storedImages = localStorage.getItem('imageList');
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    } else {
      const defaultImages = [
        'https://images.unsplash.com/photo-1526779259212-939e64788e3c',
        'https://images.unsplash.com/photo-1709884735626-63e92727d8b6',
        'https://images.unsplash.com/photo-1591779051696-1c3fa1469a79',
      ];
      localStorage.setItem('imageList', JSON.stringify(defaultImages));
      setImages(defaultImages);
    }
  }, []);

  const handleEditorChange = (html: string) => {
    console.log('Editor output:', html);
  };

  return (
    <TextEditor
      initialValue={initialHTML}
      exportFullHTML
      className="!h-[600px]"
      imageChildren={
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`img-${index}`}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      }
      onChange={handleEditorChange}
    />
  );
}

export default MyEditorComponent;
```

---

## Props

| Prop            | Type                            | Description                                                                                                 |
|-----------------|---------------------------------|-------------------------------------------------------------------------------------------------------------|
| `initialValue`  | `string`                        | The initial HTML content to display and edit inside the editor.                                             |
| `exportFullHTML`| `boolean`                       | If `true`, the editor will export the full HTML document.                                                   |
| `onChange`      | `(html: string) => void`        | Callback function that receives the updated HTML content. Returns full HTML if `exportFullHTML` is set.     |
| `imageChildren` | `React.ReactNode`               | Custom content to render inside the editor, such as a modal for image selection.                            |
| `className`     | `string`                        | Additional CSS classes to apply to the editor container.                                                    |

---

**Note:** The editor does not fetch images or handle image selection logic itself. You must provide your own modal and image grid as children, and handle image insertion in your own code. This makes the editor fully customizable and reusable for any content.

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