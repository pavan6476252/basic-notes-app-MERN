import React, { useEffect, useState } from "react";
import { getNotes } from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getNotes();
        const foundNote = data.find((n) => n._id === id);
        if (foundNote) {
          setNote(foundNote);
        } else {
          setError("Note not found.");
        }
      } catch (err) {
        setError("Failed to fetch note. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!note) return null;

  return (
    <div className="container mt-4">
      <button onClick={() => navigate("/")} className="btn btn-secondary mb-3">
        Back
      </button>
      <h1>{note.title}</h1>
      <h6 className="text-muted">{note.category}</h6>
      <hr />
      <ReactMarkdown className="markdown-content">{note.description}</ReactMarkdown>
    </div>
  );
};

export default NoteDetail;
