import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProfiles, addProfile, deleteProfile, updateProfile } from "../services/firebase";
import ProfileForm from "../components/ProfileForm";
import ParticleEffect from "../components/ParticleEffect.jsx";

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [editing, setEditing] = useState(null);
  const [clickTrigger, setClickTrigger] = useState(0);

  const fetchProfiles = async () => {
    const data = await getProfiles();
    setProfiles(data);
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleSubmit = async (data) => {
    if (editing) await updateProfile(editing.id, data);
    else await addProfile(data);
    setEditing(null);
    fetchProfiles();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 p-10">
      <motion.h1
        className="text-5xl font-bold mb-12 text-center text-cyan-200 font-orbitron tracking-wide glow-cyan"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Admin Panel
      </motion.h1>

      <ProfileForm
        onSubmit={handleSubmit}
        initialData={
          editing || {
            name: "",
            description: "",
            city: "",
            contact: "",
            interests: "",
            photo: "",
          }
        }
        buttonLabel={editing ? "Update Profile" : "Add Profile"}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {profiles.map((profile, index) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            className="backdrop-blur-xl bg-gray-950/90 p-8 rounded-3xl shadow-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-colors duration-300"
          >
            <h2 className="text-2xl font-bold text-cyan-200 font-orbitron tracking-wide">{profile.name}</h2>
            <p className="text-sm text-gray-300 font-inter">{profile.city}</p>
            <p className="text-sm text-gray-300 font-inter">Contact: {profile.contact || "N/A"}</p>
            <p className="text-sm text-gray-300 font-inter">Interests: {profile.interests || "N/A"}</p>
            {profile.photo && (
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-40 h-40 object-cover rounded-xl mt-6 mx-auto border-4 border-cyan-400/50 glow-cyan"
              />
            )}
            <p className="mt-6 text-gray-300 text-sm font-inter">{profile.description}</p>

            <div className="mt-8 flex gap-6 justify-center">
              <motion.button
                className="relative bg-gray-800 text-cyan-300 px-6 py-3 rounded-lg font-medium font-inter tracking-wide hover:bg-gray-700 transition-colors duration-300"
                onClick={() => {
                  setClickTrigger((prev) => prev + 1);
                  setEditing(profile);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span className="relative z-10">Edit</span>
                <ParticleEffect trigger={clickTrigger} />
              </motion.button>
              <motion.button
                className="relative bg-gray-600 text-cyan-300 px-6 py-3 rounded-lg font-medium font-inter tracking-wide hover:bg-gray-500 transition-colors duration-300"
                onClick={async () => {
                  if (window.confirm(`Are you sure you want to delete profile "${profile.name}"?`)) {
                    setClickTrigger((prev) => prev + 1);
                    await deleteProfile(profile.id);
                    fetchProfiles();
                    if (editing?.id === profile.id) setEditing(null);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <span className="relative z-10">Delete</span>
                <ParticleEffect trigger={clickTrigger} />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;