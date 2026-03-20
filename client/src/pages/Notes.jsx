import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const BASE_URL = "https://taskduty-server.vercel.app/api/notes";

export default function Notes() {
  const [notes, setNotes] = useState([]);

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
    <div className="p-6 max-w-2xl mx-auto mt-30">
      <h2 className="text-2xl font-bold mb-4">Notes</h2>

      {/* ✅ FIXED BUTTON */}
      <Link to="/notes/new">
        <button className="bg-custom-hover cursor-pointer text-white px-4 py-2 rounded mb-4 hover:bg-purple-700">
          + Add Note
        </button>
      </Link>

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
                <button className="text-white bg-custom-hover  px-4 py-2 rounded-lg border cursor-pointer transition flex items-center gap-1 justify-center">
                   <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </Link>

              <button
                onClick={() => deleteNote(note._id)}
                className="border border-custom-hover cursor-pointer text-custom-hover px-4 py-2 rounded-lg font-medium hover:bg-violet-50 transition flex items-center gap-1 justify-center bg-transparent"
              ><FontAwesomeIcon icon={faTrashCan} />
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}