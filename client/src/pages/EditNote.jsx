import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function NewNote() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("https://taskduty-server.vercel.app/api/notes", {
        method: "POST",
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
      console.error("Error creating note:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-18 md:mt-28">
     
      <div className="flex items-center gap-2 mb-6">
        <div className="group inline-block">
          <HiArrowLeft
            className="text-2xl cursor-pointer group-hover:-translate-x-2 transition"
            onClick={() => navigate("/notes")}
          />
        </div>
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

        <div className="flex flex-col gap-4 mt-4 md:flex-row">
          <button
            type="submit"
            className="bg-custom-hover text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Add Note
          </button>

          <button
            type="button"
            onClick={() => navigate("/notes")}
            className="border border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>

       
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={scrollToTop}
            className="text-custom-hover font-medium hover:underline"
          >
            Back To Top
          </button>
        </div>
      </form>
    </main>
  );
}