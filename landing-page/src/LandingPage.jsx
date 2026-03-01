"use client";

import BgStars from "./components/BgStars";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function LandingPage({ onLaunch }) {
  return (
    <div className="min-h-screen  text-slate-200 overflow-x-hidden">
      <BgStars />
      <Cursor />
      <Nav onLaunch={onLaunch} />
      <Hero onLaunch={onLaunch} />
      <Marquee />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <CTA onLaunch={onLaunch} />
      <Footer />
    </div>
  );
}
