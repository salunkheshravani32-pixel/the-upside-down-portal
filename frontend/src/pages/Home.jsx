import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Story from "../components/Story";
import Features from "../components/Features";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <Story />
      <Features />
      <Footer />
    </div>
  );
}

export default Home;