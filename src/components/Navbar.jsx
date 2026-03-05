import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar({ showAllTasks = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white mx-auto py-4 md:py-8 px-6 md:px-20 border-b border-gray-300 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/Logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10" />

          <Link to="/" className="text-lg md:text-xl font-semibold">
            TaskDuty
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-6 text-base">
          <li>
            <Link to="/tasks/new" className="hover:text-custom-hover">
              New Task
            </Link>
          </li>

          {showAllTasks && (
            <li>
              <Link to="/tasks" className="hover:text-custom-hover">
                All Tasks
              </Link>
            </li>
          )}

          <li>
            <img
              src="/image.png"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </li>
        </ul>

        <button
          className="md:hidden text-xlv cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-6 ">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-6 text-lg">
          <li className="flex items-center gap-3 border-b pb-4">
            <img
              src="/image.png"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium cursor-pointer text-dark-purple"> Profile</span>
          </li>

          <li>
            <Link
              to="/tasks/new"
              onClick={() => setMenuOpen(false)}
              className="hover:text-custom-hover"
            >
              New Task
            </Link>
          </li>

          {showAllTasks && (
            <li>
              <Link
                to="/tasks"
                onClick={() => setMenuOpen(false)}
                className="hover:text-custom-hover"
              >
                All Tasks
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
