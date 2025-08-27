/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import TextEditor from "./components/TextEditor";
import { useEffect, useState } from "react";

function App() {

  const [initialHTML, setInitialHTML] = useState("");

  useEffect(() => {
    fetch("/new.html")
      .then(res => res.text())
      .then(setInitialHTML);
  }, []);

  const handleEditorChange = (value: string) => {
    console.log("Editor output:", value);
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

export default App;
