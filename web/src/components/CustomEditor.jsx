import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./customeditor.css";
const CustomEditor = ({ note, setNote }) => {
  const editorRef = useRef(null);

  const handleResize = () => {
    const editor = editorRef.current?.mdEditor;
    if (editor) {
      const contentHeight = editor.querySelector(".section-container")
        ?.scrollHeight;
      if (contentHeight) {
        editor.style.height = `${contentHeight + 100}px`;
      }
    }
  };

  return (
    <MdEditor
      ref={editorRef}
      name="description"
      className="form-control"
      value={note.description}
      renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      onChange={({ text }) => {
        setNote({
          ...note,
          description: text,
        });
        handleResize();
      }}
      style={{ height: "auto" }}
    />
  );
};

export default CustomEditor;
