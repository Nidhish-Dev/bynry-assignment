import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProfiles, addProfile, deleteProfile, updateProfile } from "../services/firebase";
import ProfileForm from "../components/ProfileForm";

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [editing, setEditing] = useState(null);

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
    <div className="min-h-screen bg-[#212121] p-6">
      <h1 className="text-3xl font-semibold mb-8 text-center text-[#F5F5F7] tracking-tight">Admin Panel</h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            whileHover={{ y: -3, boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)" }}
            className="backdrop-blur-md bg-[#2C2C2E]/80 p-6 rounded-xl shadow-sm border border-[#3A3A3C]/50 transition-all duration-300"
          >
            <h2 className="text-lg font-medium text-[#F5F5F7] tracking-tight">{profile.name}</h2>
            <p className="text-sm text-[#86868B]">{profile.city}</p>
            <p className="text-sm text-[#86868B]">Contact: {profile.contact || "N/A"}</p>
            <p className="text-sm text-[#86868B]">Interests: {profile.interests || "N/A"}</p>
            {profile.photo && (
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-24 h-24 object-cover rounded-md mt-3 mx-auto border-2 border-[#007AFF]"
              />
            )}
            <p className="mt-3 text-[#86868B] text-sm">{profile.description}</p>

            <div className="mt-4 flex gap-3 justify-center">
              <motion.button
                className="bg-[#007AFF] text-[#F5F5F7] px-4 py-2 rounded-md hover:bg-[#005BB5] transition-all duration-300 text-sm font-medium tracking-wide"
                onClick={() => setEditing(profile)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Edit
              </motion.button>
              <motion.button
                className="bg-[#FF3B30] text-[#F5F5F7] px-4 py-2 rounded-md hover:bg-[#D32F2F] transition-all duration-300 text-sm font-medium tracking-wide"
                onClick={async () => {
                  if (window.confirm(`Are you sure you want to delete profile "${profile.name}"?`)) {
                    await deleteProfile(profile.id);
                    fetchProfiles();
                    if (editing?.id === profile.id) setEditing(null);
                  }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;