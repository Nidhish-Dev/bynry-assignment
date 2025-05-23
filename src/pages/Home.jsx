import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProfiles } from "../services/firebase";
import ProfileCard from "../components/ProfileCard";
import MapViewer from "../components/MapViewer";
import ParticleEffect from "../components/ParticleEffect.jsx";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [clickTrigger, setClickTrigger] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => setProfiles(await getProfiles());
    fetch();
  }, []);

  return (
    <div className="p-10 bg-gradient-to-br from-gray-950 to-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <motion.h1
          className="text-5xl font-bold text-cyan-200 font-orbitron tracking-wide glow-cyan"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Profiles
        </motion.h1>
        <motion.button
          onClick={() => {
            setClickTrigger((prev) => prev + 1);
            navigate("/admin");
          }}
          className="relative bg-gray-800 text-cyan-300 px-8 py-4 rounded-lg font-medium font-orbitron tracking-wide hover:bg-gray-700 transition-colors duration-300"
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <span className="relative z-10">Admin Dashboard</span>
          <ParticleEffect trigger={clickTrigger} />
        </motion.button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSummary={() => setSelected(profile)}
            index={index}
          />
        ))}
      </div>
      {selected && selected.city && (
        <div className="mt-16">
          <motion.h2
            className="text-3xl font-bold mb-8 text-cyan-200 font-orbitron tracking-wide glow-cyan"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Location of {selected.name} ({selected.city})
          </motion.h2>
          <MapViewer city={selected.city} />
        </div>
      )}
    </div>
  );
};

export default Home;