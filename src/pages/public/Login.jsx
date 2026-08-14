import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);
      alert("Login Successful 🚀");

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* LEFT */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-gradient-to-r from-purple-200 to-purple-100">
        <h1 className="text-4xl font-bold">
          Find Jobs Based on{" "}
          <span className="text-purple-600">Your Verified Skills</span>
        </h1>

        <p className="mt-4 text-gray-600">
          Join thousands of students and professionals.
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow w-[400px]"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome Back!
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-4"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border p-2 rounded mb-4"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-purple-600 text-white py-2 rounded">
            Login →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;