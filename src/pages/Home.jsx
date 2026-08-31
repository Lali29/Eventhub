import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Stats from "../components/home/Stats";
import Footer from "../components/layout/Footer";


const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Footer />
    </>
  );
};

export default Home;