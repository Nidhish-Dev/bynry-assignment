import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ParticleEffect from "./ParticleEffect.jsx";

const ProfileCard = ({ profile, onSummary }) => {
  const [clickTrigger, setClickTrigger] = useState(0);

  const handleClick = () => {
    setClickTrigger((prev) => prev + 1);
    if (onSummary) onSummary(profile);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative backdrop-blur-xl bg-gray-950/90 p-8 rounded-3xl shadow-2xl border border-cyan-500/30 flex flex-col items-center cursor-pointer hover:border-cyan-400/50 transition-colors duration-300"
      onClick={handleClick}
    >
      {profile.photo ? (
        <motion.img
          src={profile.photo}
          alt={profile.name}
          className="w-28 h-28 rounded-full object-cover mb-6 border-4 border-cyan-400/50 glow-cyan"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      ) : (
        <motion.div
          className="w-28 h-28 rounded-full bg-gray-900/50 flex items-center justify-center mb-6 text-cyan-400 text-xl font-orbitron"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          N/A
        </motion.div>
      )}
      <motion.h3
        className="text-2xl font-bold text-cyan-200 font-orbitron tracking-wide"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {profile.name}
      </motion.h3>
      <motion.p
        className="text-sm text-gray-300 font-inter"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {profile.city}
      </motion.p>
      <Link
        to={`/profile/${profile.id}`}
        className="relative mt-6 inline-block bg-gray-800 text-cyan-300 px-6 py-3 rounded-lg font-medium font-inter tracking-wide hover:bg-gray-700 transition-colors duration-300"
        onClick={() => setClickTrigger((prev) => prev + 1)}
      >
        <span className="relative z-10">View Profile</span>
        <ParticleEffect trigger={clickTrigger} />
      </Link>
    </motion.div>
  );
};

export default ProfileCard;