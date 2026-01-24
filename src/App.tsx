/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import TextEditor from "./components/TextEditor";
import { useEffect, useState } from "react";


function App() {
  const [initialHTML, setInitialHTML] = useState("");
  const [images, setImages] = useState<string[]>([]);


  useEffect(() => {
    fetch("http://localhost:3000/code-matic/openCDP-editor/hey.html")
      .then((res) => res.text())
      .then(setInitialHTML);
  }, []);


  useEffect(() => {
    const storedImages = localStorage.getItem("imageList");
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    } else {
      const defaultImages = [
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c",
        "https://images.unsplash.com/photo-1709884735626-63e92727d8b6",
        "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79",
      ];
      localStorage.setItem("imageList", JSON.stringify(defaultImages));
      setImages(defaultImages);
    }
  }, []);


  const handleEditorChange = (value: string) => {
    console.log("Editor output:", value);
  };

  return (
    <div className="w-[550px] mx-auto my-0">
      <TextEditor
      exportFullHTML
      // className="!h-[600px]"
      imageChildren={
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`img-${index}`}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      }
      onChange={handleEditorChange}
    />
    </div>
    
  );
}

export default App;
