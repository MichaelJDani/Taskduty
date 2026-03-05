import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default function Tasks() {
 
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: "",
            description:
              "",
            priority: "",
          },
          {
            id: 2,
            title: "",
            description:
              "",
            priority: "",
          },
        ];
  });

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

 
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-gray-50 py-8 px-6 md:px-20 mt-10">
      <div className=" container mx-auto  md:grid-cols-2 items-center gap-10 md:gap-15 py-10 md:py-20">
        
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
              key={task.id}
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
                  <Link to={`/tasks/${task.id}/edit`}>
                    <button className="bg-custom-hover w-22 text-white px-4 py-2 rounded-lg cursor-pointer font-medium hover:bg-violet-700 transition"> <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      const updatedTasks = tasks.filter(
                        (t) => t.id !== task.id,
                      );
                      setTasks(updatedTasks);
                    }}
                    className="border w-22 border-custom-hover text-custom-hover px-4 py-2 rounded-lg font-medium hover:bg-violet-50 cursor-pointer transition flex items-center gap-1 justify-center bg-transparent"
                  >  <FontAwesomeIcon icon={faTrashCan} />
                    Delete
                  </button>
                </div>
              </div>

            
              <h2 className="text-2xl font-semibold mb-3">{task.title}</h2>

             
              <p className="text-gray-600 text-lg leading-relaxed">
                {task.description}
              </p>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-10">
          <button
            onClick={scrollToTop}
            className="text-violet-600 font-medium cursor-pointer hover:underline"
          >
            Back To Top
          </button>
        </div>
      </div>
    </main>
  );
}
