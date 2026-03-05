import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

export default function NewTask() {
  const navigate = useNavigate();

 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Important");

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTask = {
      id: Date.now(),
      title,
      description,
      priority,
    };

    localStorage.setItem("tasks", JSON.stringify([...savedTasks, newTask]));

    navigate("/tasks");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-18 md:mt-28">
      <div className="flex items-center gap-2 mb-6">
        <div className="group inline-block">
          <HiArrowLeft
            className="text-2xl transition-transform duration-200 ease-in-out cursor-pointer group-hover:-translate-x-2"
            onClick={() => navigate("/tasks")}
          />
        </div>
        <h1 className="text-3xl font-semibold text-black">New Task</h1>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          required
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-custom-hover resize-none"
          rows={6}
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg cursor-pointer text-dark-purple focus:outline-none focus:ring focus:ring-custom-hover"
        >
          {" "}
          <option value="" disabled>
            Select Priority
          </option>
          <option value="Urgent">Urgent</option>
          <option value="Important">Important</option>
        </select>
        <div className="flex flex-col gap-4 mt-4 md:flex-row md:gap-4">
          <button
            type="submit"
            className="bg-custom-hover cursor-pointer text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition w-full md:w-auto"
          >
            Add Task
          </button>

          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="border border-gray-300 px-6 py-2 text-dark-purple rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition w-full md:w-auto"
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
