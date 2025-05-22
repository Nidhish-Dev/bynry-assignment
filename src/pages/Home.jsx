import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getProfiles } from "../services/firebase";
import ProfileCard from "../components/ProfileCard";
import MapViewer from "../components/MapViewer";

const Home = () => {
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => setProfiles(await getProfiles());
    fetch();
  }, []);

  return (
    <div className="p-6 bg-[#212121] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#F5F5F7] tracking-tight">User Profiles</h1>
        <motion.button
          onClick={() => navigate("/admin")}
          className="bg-[#007AFF] text-[#F5F5F7] px-5 py-2 rounded-md hover:bg-[#005BB5] transition-all duration-300 text-sm font-medium tracking-wide"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          Admin Dashboard
        </motion.button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onSummary={() => setSelected(profile)}
          />
        ))}
      </div>
      {selected && selected.city && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-[#F5F5F7] tracking-tight">
            Location of {selected.name} ({selected.city})
          </h2>
          <MapViewer city={selected.city} />
        </div>
      )}
    </div>
  );
};

export default Home;