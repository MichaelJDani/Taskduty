import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function NewNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = "https://taskduty-server.vercel.app/api/notes";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    setLoading(true);

    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      navigate("/notes");
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-18 md:mt-28">
      
     
      <div className="flex items-center gap-2 mb-6">
        <HiArrowLeft
          className="text-2xl cursor-pointer hover:-translate-x-2 transition"
          onClick={() => navigate("/notes")}
        />
        <h1 className="text-3xl font-semibold text-black">New Note</h1>
      </div>

    
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-custom-hover cursor-pointer text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Note"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/notes")}
            className="border border-gray-300 cursor-pointer px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}