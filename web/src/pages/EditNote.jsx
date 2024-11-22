import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotes, updateNote } from "../api/api"; 
import "react-markdown-editor-lite/lib/index.css";
import CustomEditor from "../components/CustomEditor";

const EditNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getNotes();
        const currentNote = data.find((note) => note._id === id);
        if (!currentNote) {
          setError("Note not found");
        } else {
          setNote(currentNote);
        }
      } catch (err) {
        setError("Failed to fetch note. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const payload = {
        title: note.title,
        description: note.description,
        category: note.category,
        completed: note.completed,
      };

      await updateNote(id, payload);

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.log(err);
      setError("Failed to update note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  if (!note) return null;

  return (
    <div className="container mt-4">
      <h1 className="h4 mb-3">Edit Note</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
         
          <CustomEditor note={note} setNote={setNote} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-select"
            value={note.category}
            onChange={handleChange}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {success && (
          <div className="alert alert-success">Note updated successfully!</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Note"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-secondary ms-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditNote;
