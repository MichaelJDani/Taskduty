import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Navbar({ showAllTasks = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white mx-auto py-4 md:py-8 px-6 md:px-20 border-b border-gray-200 z-50">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/Logo.png" alt="logo" className="w-8 h-8 md:w-10 md:h-10" />
          <Link to="/" className="text-lg md:text-xl font-semibold">
            TaskDuty
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-6 text-base">
          {isLoggedIn ? (
            <>
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
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-custom-hover">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="bg-custom-hover text-white px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        <button
          className="md:hidden text-xl cursor-pointer"
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
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-xl cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>

        <ul className="flex flex-col gap-6 px-6 text-lg">
          {isLoggedIn ? (
            <>
              <li className="flex items-center gap-3 border-b pb-4">
                <img
                  src="/image.png"
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-dark-purple">Profile</span>
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
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-custom-hover"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-custom-hover"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
