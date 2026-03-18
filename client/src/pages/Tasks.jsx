import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

 
  const fetchTasks = async (searchValue = "") => {
    try {
      const res = await fetch(
        `https://taskduty-server.vercel.app/api/tasks?search=${searchValue}`
      );
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  
  const deleteTask = async (id) => {
    try {
      await fetch(
        `https://taskduty-server.vercel.app/api/tasks/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchTasks(search);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-10">
      <div className="container mx-auto py-10 md:py-20">
        
       
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              fetchTasks(e.target.value);
            }}
            className="w-full p-3 border rounded-lg"
          />
        </div>

       
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-4xl font-semibold text-black">My Tasks</h1>

          <Link
            to="/tasks/new"
            className="text-custom-hover font-medium hover:underline"
          >
            + Add New Task
          </Link>
        </div>

      
        <div className="space-y-8">
          {tasks.map((task) => (
            <div
              key={task._id} 
              className="border border-dark-purple rounded-xl p-8 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-center mb-3 border-b border-dark-purple pb-3">
                <span
                  className={`text-sm font-medium ${
                    task.priority === "Urgent"
                      ? "text-red-500"
                      : "text-emerald-500"
                  }`}
                >
                  {task.priority}
                </span>

                <div className="flex gap-3">
                  <Link to={`/tasks/${task._id}/edit`}>
                    <button className="bg-custom-hover text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-700 transition">
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="border border-custom-hover text-custom-hover px-4 py-2 rounded-lg font-medium hover:bg-violet-50 transition flex items-center gap-1 justify-center bg-transparent"
                  >
                    <FontAwesomeIcon icon={faTrashCan} /> Delete
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-3">
                {task.title}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed">
                {task.description}
              </p>
            </div>
          ))}
        </div>

       
        <div className="text-center mt-10">
          <button
            onClick={scrollToTop}
            className="text-violet-600 font-medium hover:underline"
          >
            Back To Top
          </button>
        </div>
      </div>
    </main>
  );
}