import "./App.css";
import TextEditor from "./components/TextEditor";
import { useEffect, useState } from "react";


function App() {

  const [initialHTML, setInitialHTML] = useState("<div>Hello World</div>");

  //   useEffect(() => {
  //   fetch("/new.html")
  //     .then(res => res.text())
  //     .then(setInitialHTML);
  // }, []);

  const handleEditorChange = (value: string) => {
    console.log("Editor output:", value);
  };


  return (
    <TextEditor
      bodyHTML={initialHTML}
      // fullHTML={initialHTML}
      onChange={handleEditorChange} />
  );
}

export default App;
