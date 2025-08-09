import "./App.css";
import TextEditor from "./components/TextEditor";


function App() {
  return (
    <TextEditor fullHtml={`<h1>Hello World</h1><p>This is pretext.</p>`} />
  );
}

export default App;
