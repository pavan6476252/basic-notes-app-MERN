import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/api";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import truncateMarkdown from "markdown-truncate";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getNotes(search ? `search=${search}` : "");
      setNotes(data);
    } catch (err) {
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (err) {
      setError("Failed to delete note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3">Personal Notes Manager</h1>
        <button onClick={() => navigate("/add")} className="btn btn-success">
          Add Note
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {notes.length === 0 && !loading && !error && (
        <div className="alert alert-warning">No notes found.</div>
      )}

      {notes.length != 0 && notes && (
        <div className="row">
          {notes.map((note) => (
            <div key={note._id} className="col-md-4 mb-4 ">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {note.category}
                  </h6>
                  <ReactMarkdown className="markdown-content">
                    {truncateMarkdown(note.description, {
                      limit: 100,
                      ellipsis: true,
                    })}
                  </ReactMarkdown>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    onClick={() => navigate(`/note/${note._id}`)}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </button>

                  <div className="d-flex gap-2">
                    <button
                      onClick={() => navigate(`/edit/${note._id}`)}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
