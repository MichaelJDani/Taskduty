import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://taskduty-server.vercel.app/api/notes";

  // ✅ FETCH EXISTING NOTE
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`${BASE_URL}/${id}`);
        const data = await res.json();

        setTitle(data.title || "");
        setContent(data.content || "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching note:", error);
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // ✅ UPDATE NOTE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT", // 🔥 THIS is what makes it EDIT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      navigate("/notes");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading note...</p>;
  }

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-18 md:mt-28">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-6">
        <div className="group inline-block">
          <HiArrowLeft
            className="text-2xl cursor-pointer group-hover:-translate-x-2 transition"
            onClick={() => navigate("/notes")}
          />
        </div>
        <h1 className="text-3xl font-semibold text-black">Edit Note</h1>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-custom-hover text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/notes")}
            className="border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}