import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 flex items-center">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <h1 className="text-6xl font-extrabold text-white leading-tight">
            Manage Events
            <br />
            Like Never Before
          </h1>

          <p className="mt-6 text-white text-lg">
            Plan, organize and track events effortlessly using our modern Event
            Management Platform.
          </p>

          <div className="flex gap-5 mt-8">

            <Link
              to="/events"
              className="bg-white text-indigo-700 px-7 py-3 rounded-xl font-semibold"
            >
              Explore Events
            </Link>

            <Link
              to="/register"
              className="border border-white text-white px-7 py-3 rounded-xl"
            >
              Join Now
            </Link>

          </div>

        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=900"
          alt="Event"
          className="rounded-3xl shadow-2xl"
        />

      </div>

    </section>
  );
};

export default Hero;