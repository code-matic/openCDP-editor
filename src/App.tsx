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


  const handleEditorChange = (html: string) => {
    console.log("Editor output:", html);
  };


  return (
    <TextEditor
      // value={initialHTML}
      fullDocument={initialHTML}
      onChange={handleEditorChange} />
  );
}

export default App;
