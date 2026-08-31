import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-cyan-500 flex justify-center items-center">

      <div className="bg-white w-[450px] rounded-3xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          placeholder="Full Name"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          placeholder="Phone"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
        />

        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-xl"
        >
          Register
        </button>

        <p className="text-center mt-5">

          Already have an account?

          <Link
            to="/login"
            className="text-indigo-600 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;