import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  // Demo Credentials
  const demoEmail = "admin@eventhub.com";
  const demoPassword = "admin123";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === demoEmail && password === demoPassword) {
      alert("Login Successful!");

      navigate("/dashboard");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-cyan-500 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-2">
          EventHub
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

          </div>

          <div className="mb-6">

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="text-indigo-600 font-semibold ml-2"
          >
            Register
          </Link>
        </p>

        <div className="mt-8 bg-gray-100 rounded-xl p-4">

          <h3 className="font-semibold mb-2 text-indigo-700">
            Demo Login
          </h3>

          <p>
            <strong>Email:</strong> admin@eventhub.com
          </p>

          <p>
            <strong>Password:</strong> admin123
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;