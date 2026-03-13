import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      } else {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        navigate("/", {replace: true}); 
      }

    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      <div className="absolute w-96 h-96 bg-custom-hover rounded-full -top-40 -left-40 opacity-30 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-200 rounded-full -bottom-32 -right-32 opacity-30 animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-10 rounded-xl shadow-2xl w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px] mt-15 flex flex-col gap-2"
      >
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <p className="text-center text-xl text-gray-600 mb-3">
          Enter your details to log in
        </p>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 mb-2"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 mb-2"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 mt-2 bg-custom-hover text-white rounded-xl shadow-lg cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm mt-3">
          Don't have an account?
          <Link to="/register" className="text-custom-hover ml-1 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}