"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("email", email);
    console.log("passord", password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/signin",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("res", response.data);
        const token = response.data.token;
        console.log({ message: "Login successful", token: token });
        localStorage.setItem("token", token);
        router.push('home-page')
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="bg-gray-200 flex-grow flex items-center justify-center">
        <div className="max-w-md w-full p-10 bg-gray-50 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {/* </Link> */}
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Don't have an account?{" "}
            <Link href="/register-page" style={{ color: "blue" }}>
              Register here
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;

