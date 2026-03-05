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
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const existingTask = savedTasks.find((t) => t.id === Number(id));

    if (existingTask) {
      setTask(existingTask);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const updatedTasks = savedTasks.map((t) =>
      t.id === Number(id) ? { ...t, ...task } : t,
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    navigate("/tasks");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-18 md:mt-28">
      <div className="flex items-center gap-2 mb-6 ">
        <div className="group inline-block">
          <HiArrowLeft
            className="text-2xl transition-transform duration-200 ease-in-out cursor-pointer group-hover:-translate-x-2"
            onClick={() => navigate("/tasks")}
          />
        </div>
        <h1 className="text-3xl font-semibold text-black">Edit Task</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-7">
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm ">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="p-3 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>

        <div className="relative">
          <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm ">
            Description
          </label>

          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Task Description"
            rows={6}
            className="p-3 w-full border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
            required
          />
        </div>
        <div className="relative">
          <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm ">
            Tags
          </label>

          <select
            name="priority"
            placeholder="Urgent  Important"
            value={task.priority}
            onChange={handleChange}
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-hover cursor-pointer"
          >
            {" "}
            <option value="" disabled>
              Select Priority
            </option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-custom-hover w-38 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition cursor-pointer"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="border w-38 border-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
        <div className="text-center mt-10">
          <button
            type="button"
            onClick={scrollToTop}
            className="text-custom-hover font-medium hover:underline cursor-pointer"
          >
            Back To Top
          </button>
        </div>
      </form>
    </main>
  );
}
