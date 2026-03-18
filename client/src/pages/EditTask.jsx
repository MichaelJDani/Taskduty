import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Important",
  });

  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(
          `https://taskduty-server.vercel.app/api/tasks/${id}`
        );
        const data = await res.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        `https://taskduty-server.vercel.app/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
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
            onClick={() => navigate("/tasks")}
          />
        </div>
        <h1 className="text-3xl font-semibold text-black">Edit Task</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        {/* TITLE */}
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="p-3 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

       
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm">
            Description
          </label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            rows={6}
            className="p-3 w-full border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

       
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm">
            Priority
          </label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover cursor-pointer"
          >
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-custom-hover text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/tasks")}
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