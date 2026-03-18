import { useEffect, useState } from "react";

export default function Notes() {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    await fetch("http://localhost:5000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content })
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: "DELETE"
    });

    fetchNotes();
  };

  return (
    <div>
      <h2>Notes</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addNote}>Add Note</button>

      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <button onClick={() => deleteNote(note._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// ok