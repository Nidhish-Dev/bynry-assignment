import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProfileCard = ({ profile }) => {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}
      className="backdrop-blur-md bg-[#2C2C2E]/80 p-6 rounded-xl shadow-sm border border-[#3A3A3C]/50 flex flex-col items-center transition-all duration-300"
    >
      {profile.photo ? (
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-[#007AFF]"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-[#3A3A3C]/50 flex items-center justify-center mb-4 text-[#86868B] text-lg">
          N/A
        </div>
      )}
      <h3 className="text-lg font-medium text-[#F5F5F7] tracking-tight">{profile.name}</h3>
      <p className="text-sm text-[#86868B]">{profile.city}</p>
      <Link
        to={`/profile/${profile.id}`}
        className="mt-4 inline-block bg-[#007AFF] text-[#F5F5F7] px-4 py-2 rounded-md hover:bg-[#005BB5] transition-all duration-300 text-sm font-medium tracking-wide"
      >
        View Profile
      </Link>
    </motion.div>
  );
};

export default ProfileCard;