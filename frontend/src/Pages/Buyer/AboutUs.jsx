import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../../Components/Navbar";

const team = [
  {
    name: "Aditya Baldawa",
    role: "Founder & Eco-Tech Developer",
    image: "/api/placeholder/150/150",
    desc: "Coding clean and dreaming green. Architect of tech that's kinder to the planet.",
    fun: "Once went 30 days without creating any plastic waste",
    favorite: "Bamboo laptop stand"
  },
  {
    name: "Rishika Rajput",
    role: "Sustainability Analyst",
    image: "/api/placeholder/150/150",
    desc: "Fact-checking footprints. Making sure every item walks the talk.",
    fun: "Can identify 50+ eco-certifications by sight",
    favorite: "Zero-waste coffee kit"
  },
  {
    name: "Dhriti Shah",
    role: "UI/UX Designer",
    image: "/api/placeholder/150/150",
    desc: "Designing flows as fresh as forest air. Minimal. Mindful. Magical.",
    fun: "Creates art from upcycled tech waste",
    favorite: "Cork yoga mat"
  },
  {
    name: "Neil Sulhyan",
    role: "Operations & Logistics Lead",
    image: "/api/placeholder/150/150",
    desc: "Greasing the green machine. Ensuring every delivery is a step toward zero waste.",
    fun: "Bikes 20km to work daily, rain or shine",
    favorite: "Solar power bank"
  },
];

const testimonials = [
  {
    name: "Priya M.",
    text: "Switched my entire skincare routine using EcoCart's recommendations. My skin's glowing and so is my conscience!",
    location: "Mumbai"
  },
  {
    name: "Arjun T.",
    text: "The carbon footprint tracker changed how I shop forever. I've cut my impact by 65% in just 3 months.",
    location: "Bengaluru"
  },
  {
    name: "Leela P.",
    text: "Finally, a shopping platform that doesn't make me choose between aesthetics and ethics. Everything is gorgeous AND green!",
    location: "Delhi"
  }
];

const milestones = [
  { year: "2022", event: "First eco-swap prototype launched" },
  { year: "2023", event: "Reached 10,000 users milestone" },
  { year: "2024", event: "Partnered with 50+ sustainable brands" },
  { year: "2025", event: "Launched carbon footprint API" }
];

const partners = [
  "Clean Ocean Initiative", "Sustainable Fashion Collective", 
  "Zero Waste Alliance", "Green Tech Foundation", 
  "Renewable Energy Partners", "Plastic-Free Certification"
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <> 
    <Navbar/>
    <div className="min-h-screen bg-white text-[#1a472a] px-4 sm:px-10 py-20 font-sans">
      {/* <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none"
      >
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-green-300 blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-emerald-200 blur-3xl"></div>
      </motion.div> */}

      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-7xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-emerald-500"
        >
          Eco Cart
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mt-6"
        >
          <span className="px-4 py-2 bg-green-50 rounded-full text-green-800 text-sm font-medium border border-green-200">
            Shop Green • Live Clean • Feel Amazing
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center text-green-800 mt-6 max-w-3xl mx-auto text-lg leading-relaxed"
        >
          We're rewriting the rules of shopping—making it greener, smarter, and hella sexier. 
          Your cart can now fight climate change, one swap at a time. 
          <span className="text-2xl">💚</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 mt-10"
        >
          <StatsBox number="15,000+" label="kg CO₂ avoided" />
          <StatsBox number="95,000+" label="liters water saved" />
          <StatsBox number="5,200+" label="eco-swaps made" />
        </motion.div>
      </div>

      {/* Video Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-xl shadow-lg border border-green-100"
      >
        <div className="aspect-w-16 aspect-h-9 bg-green-50 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
              <span className="text-3xl">▶️</span>
            </div>
            <p className="text-green-800 font-medium">Our journey to reinvent sustainable shopping</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs Section */}
      <div className="mt-24">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <TabButton active={activeTab === "mission"} onClick={() => setActiveTab("mission")} label="Our Mission" />
          <TabButton active={activeTab === "impact"} onClick={() => setActiveTab("impact")} label="Our Impact" />
          <TabButton active={activeTab === "values"} onClick={() => setActiveTab("values")} label="Our Values" />
        </div>

        <div className="mt-8">
          {activeTab === "mission" && (
            <Section
              title="🌱 Why We Exist"
              desc={`Every day, we make choices that impact the planet. But we're not here to guilt you—we're here to guide you.

Fast fashion? Ghosted.
Plastic-packed nonsense? Blocked.
Climate anxiety? Replaced with climate action.

We're building the ultimate cart that actually *cares*. From sourcing to shipping—we cut the crap and keep it clean.

Our mission is simple: make sustainability the sexy default choice. No more compromising between what looks good and what does good.`}
            />
          )}

          {activeTab === "impact" && (
            <Section
              title="📊 Our Impact So Far"
              desc={`✨ 15,000+ kg CO₂ emissions avoided  
💧 95,000+ liters of water saved  
🌱 5,200+ eco-swaps made
💰 ₹1.2M channeled to ethical producers
🌎 25+ local communities supported

No fluff, just facts. And this is just the beginning.

Every purchase you make through EcoCart is meticulously tracked for its environmental impact. We measure water saved, emissions reduced, and plastic avoided—all displayed in your personal impact dashboard.

Join us in creating ripples that become waves of positive change.`}
            />
          )}

          {activeTab === "values" && (
            <Section
              title="🧬 What Drives Us"
              desc={`We blend tech + nature + good vibes.  
Imagine AI suggesting a bamboo toothbrush, not another plastic bottle.  

We believe in:
- Transparency over greenwashing
- Purpose over profit
- Progress over perfection
- Community over competition
- Innovation with intention
- A better tomorrow, starting today

Every decision at EcoCart passes through our triple filter: Is it good for you? Is it good for communities? Is it good for the planet? If it's not a yes across the board, it's a no from us.`}
            />
          )}
        </div>
      </div>


      {/* Partners */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mt-32"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-green-800">
          Our Green Planet Partners
        </h2>
        <p className="text-center text-green-700 mb-12 max-w-2xl mx-auto">
          We're proud to collaborate with organizations that share our vision for a sustainable future
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {partners.map((partner, index) => (
            <div key={index} className="bg-green-50 px-6 py-3 rounded-full border border-green-100 shadow-sm hover:shadow-md transition-all">
              <span className="text-green-800 font-medium">{partner}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-32"
      >
        <h2 className="text-4xl font-bold text-center mb-6 text-green-800">
          🌱 Meet the Dream Green Team
        </h2>
        <p className="text-center text-green-700 mb-14 max-w-2xl mx-auto">
          Passionate eco-warriors with a knack for making sustainability simple, sexy, and accessible
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {team.map((member, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border-4 border-green-500 object-cover shadow-md"
                />
                <div>
                  <h3 className="text-xl font-semibold text-center sm:text-left mt-4 sm:mt-0 text-green-800">
                    {member.name}
                  </h3>
                  <p className="text-green-700 text-sm text-center sm:text-left">
                    {member.role}
                  </p>
                  <p className="text-green-700 text-sm mt-3">
                    {member.desc}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">✨</span>
                      <span className="text-sm text-green-700">Fun fact: {member.fun}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 mr-2">💚</span>
                      <span className="text-sm text-green-700">Favorite eco product: {member.favorite}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Join Us CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-32 text-center max-w-4xl mx-auto bg-green-50 p-12 rounded-3xl border border-green-100 shadow-lg"
      >
        <h2 className="text-4xl font-bold mb-6 text-green-800">
          Ready to Shop Like Your Future Depends On It?
        </h2>
        <p className="text-green-700 text-lg mb-8">
          Because it kinda does. Join our community of conscious consumers who refuse to compromise between style and sustainability.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-3 bg-green-700 text-white rounded-full font-medium hover:bg-green-600 transition-all shadow-md hover:shadow-lg">
            Start Shopping Green
          </button>
        </div>
      </motion.div>
    </div>
    </>
  );
};

// Section Component
const Section = ({ title, desc }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center max-w-5xl mx-auto px-4"
  >
    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-green-800">
      {title}
    </h2>
    <p className="text-green-700 text-md sm:text-lg leading-relaxed whitespace-pre-line">
      {desc}
    </p>
  </motion.div>
);

// Stats Box Component
const StatsBox = ({ number, label }) => (
  <div className="bg-green-50 p-4 rounded-xl shadow-md border border-green-100 w-40 text-center hover:shadow-lg transition-all">
    <div className="text-2xl font-bold text-green-700">{number}</div>
    <div className="text-green-600 text-sm">{label}</div>
  </div>
);

// Tab Button Component
const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
      active 
        ? "bg-green-700 text-white shadow-md" 
        : "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
    }`}
  >
    {label}
  </button>
);

export default AboutUs;