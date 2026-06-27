import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../lib/api";
import { Mail, Lock, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/user/login`,
        formData,
        {
          withCredentials: true
        }
      );

      const user = res.data.user;

      // ✅ Store token if provided
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🔥 Role-based redirect
      if (user.role === "Recruiter") {
        navigate("/recrutter_dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">

      {/* Glass Card */}
      <div className="w-full max-w-md backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-2xl p-8">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="flex items-center border border-gray-300/50 bg-white/40 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Mail className="text-gray-600 mr-2" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300/50 bg-white/40 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Lock className="text-gray-600 mr-2" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <div className="flex items-center border border-gray-300/50 bg-white/40 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <UserCheck className="text-gray-600 mr-2" size={18} />
            <select
              name="role"
              className="w-full bg-transparent outline-none text-gray-700"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="Student">Job Seeker</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:scale-105 transition duration-300 shadow-md"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-700 mt-5">
          Don’t have an account?{" "}
          <span className="text-purple-700 font-medium cursor-pointer hover:underline">
            <Link to="/signup">
            Sign Up
            </Link>
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;