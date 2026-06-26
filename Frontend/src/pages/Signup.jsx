import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
import {
  User,
  Mail,
  Lock,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (formData.role === "Student") {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/recrutter_dashboard", { replace: true });
        }
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md backdrop-blur-lg bg-white/70 shadow-xl rounded-2xl p-8 mt-20">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account 🚀
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <User className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
            />
          </div>

          {/* Email / Mobile */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Mail className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              name="email"
              placeholder="Email or Mobile Number"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
            />
          </div>



          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Lock className="text-gray-500 mr-2" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password (8-12 characters)"
              className="w-full outline-none bg-transparent"
              onChange={handleChange}
            />
          </div>

          {/* Role */}
          <select
            name="role"
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 outline-none bg-white"
          >
            <option value="">Select Role</option>
            <option value="Student">Job Seeker</option>
            <option value="Recruiter">Recruiter</option>
          </select>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            Register
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span className="text-purple-600 cursor-pointer hover:underline">
            <Link to="/login">
            Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
