import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, createUser, setSession, getSession } from "../api/users";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "student" });
  const navigate = useNavigate();

  useEffect(() => {
    if (getSession()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const user = getUsers().find(
      u => u.username === form.username && u.password === form.password
    );

    if (user) {
      setSession(user);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSignup = () => {
    const users = getUsers();
    if (users.find(u => u.username === form.username)) {
      alert("User already exists");
      return;
    }
    const newUser = {
      ...form,
      id: Date.now(),
      parentId: null 
    };
    createUser(newUser);
    setSession(newUser);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isSignup ? "Create an Account" : "Login to Your Account"}
        </h2>

        <div className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {isSignup && (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
              <option value="parent">Parent</option>
            </select>
          )}

          <button
            onClick={isSignup ? handleSignup : handleLogin}
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>

        <p className="text-center text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}
