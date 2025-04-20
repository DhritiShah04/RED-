import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import NavbarImage from "../../../public/Images/Navbar-under-banner.png";
import CategoryGrid from "../../Components/Cardgrid";
import EcoCarousel from "../../Components/Carousel";
import BannerImg from "../../../public/Images/Banner2.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <p className="mt-8 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-md tracking-wide">
        Unleash Your Style
      </p>
      <div className="w-32 h-1 mt-4 mx-auto bg-gradient-to-r from-green-600 to-yellow-400 rounded-full animate-pulse"></div>

      <img
        src={NavbarImage}
        className="block mx-auto w-[70%] h-[220px] object-cover mt-6 mb-8"
        alt="Navbar Banner"
      />
      <CategoryGrid />

      <button
        onClick={() => navigate("/shopping")}
        className="mt-6 mx-auto block px-8 py-3 text-lg font-semibold text-green-900 bg-yellow-300 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition-all duration-300 ease-in-out hover:scale-105 animate-bounce"
      >
        Show More
      </button>

      <p className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text    bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-md tracking-wide mb-4">
        Sustainability Starts Here!
      </p>

      <div className="w-32 h-1 mt-0 mx-auto bg-gradient-to-r from-green-600 to-yellow-400 rounded-full animate-pulse"></div>

      <img src={BannerImg} className="w-2/3 h-auto mx-auto mt-6" />

      <EcoCarousel />
      <Footer />
    </div>
  );
}
