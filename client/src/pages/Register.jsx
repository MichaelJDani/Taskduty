import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful!");
      navigate("/login", { replace: true });

    } catch (err) {
      console.error("Registration error:", err);
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
        <h1 className="text-4xl font-bold text-center">Register</h1>
        <p className="text-center text-xl text-gray-600 mb-3">
          Create an account to get started
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-hover mb-2"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

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
            className="absolute right-3 top-4 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 mt-2 bg-custom-hover text-white rounded-xl shadow-lg cursor-pointer"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center text-sm mt-3">
          Already have an account?
          <Link to="/login" className="text-custom-hover ml-1 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}