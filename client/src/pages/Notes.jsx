import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = "https://taskduty-server.vercel.app/api/notes";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  
  const fetchNotes = async () => {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  
  const addNote = async () => {
    if (!title || !content) return;

    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // ✅ DELETE NOTE
  const deleteNote = async (id) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>

      
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />

      <button
        onClick={addNote}
        className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded mb-4 hover:bg-purple-700"
      >
        Add Note
      </button>

     
      {notes.length === 0 ? (
        <p className="text-gray-500">No note yet</p>
      ) : (
        notes.map((note) => (
          <div
            key={note._id}
            className="border p-4 rounded mb-3 shadow"
          >
            <h3 className="font-semibold">{note.title}</h3>
            <p className="text-gray-600">{note.content}</p>

           
            <div className="flex gap-3 mt-2">
              <Link to={`/notes/${note._id}/edit`}>
                <button className="text-blue-500 cursor-pointer">
                  Edit
                </button>
              </Link>

              <button
                onClick={() => deleteNote(note._id)}
                className="text-red-500 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}