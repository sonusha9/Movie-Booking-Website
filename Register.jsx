import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUserApi } from "../api/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !phone || !dob || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await registerUserApi({ username, email, password });
      if (res.success) {
        toast.success(`Registration successful! Welcome, ${username}`);
        setUsername("");
        setEmail("");
        setPhone("");
        setDob("");
        setPassword("");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-6">
      <form
        onSubmit={handleRegister}
        className="flex items-center gap-4 flex-wrap"
      >
        <input
          type="text"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded focus:outline-purple-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded focus:outline-purple-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="p-2 border border-gray-300 rounded focus:outline-purple-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="date"
          className="p-2 border border-gray-300 rounded focus:outline-purple-500"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded focus:outline-purple-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Register
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
