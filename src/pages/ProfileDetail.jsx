import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import MapViewer from "../components/MapViewer";
import ParticleEffect from "../components/ParticleEffect.jsx";

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickTrigger, setClickTrigger] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "profiles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("No such profile!");
          setProfile(null);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) return (
    <div className="text-center mt-16 text-cyan-400 font-orbitron">
      <div className="animate-pulse rounded-full h-16 w-16 border-4 border-cyan-400/50 border-t-cyan-400 mx-auto"></div>
      <p className="mt-6 text-sm">Loading profile...</p>
    </div>
  );

  if (!profile) return (
    <div className="text-center mt-16 text-gray-300 font-orbitron">
      Profile not found.{" "}
      <Link to="/" className="text-cyan-300 hover:text-cyan-200 text-sm transition-colors duration-300">
        Go back
      </Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-10 bg-gradient-to-br from-gray-950 to-gray-900 rounded-3xl shadow-2xl border border-cyan-500/30 mt-10">
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        <motion.div
          className="lg:w-1/2 flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold mb-8 text-cyan-200 font-orbitron tracking-wide glow-cyan">{profile.name}</h1>
          {profile.photo && (
            <motion.img
              src={profile.photo}
              alt={profile.name}
              className="w-64 h-64 object-cover rounded-xl mb-8 border-4 border-cyan-400/50 glow-cyan"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          )}
          <div className="w-full text-center lg:text-left">
            <p className="mb-6 text-gray-300 text-sm font-inter">{profile.description}</p>
            <p className="mb-6 text-gray-300 text-sm font-inter">
              <strong>City:</strong> {profile.city}
            </p>
            <p className="mb-6 text-gray-300 text-sm font-inter">
              <strong>Contact:</strong> {profile.contact || "N/A"}
            </p>
            <p className="mb-6 text-gray-300 text-sm font-inter">
              <strong>Interests:</strong> {profile.interests || "N/A"}
            </p>
          </div>
        </motion.div>
        <motion.div
          className="lg:w-1/2 mt-10 lg:mt-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-8 text-cyan-200 font-orbitron tracking-wide glow-cyan text-center lg:text-left">
            Location Map
          </h2>
          <MapViewer city={profile.city} />
        </motion.div>
      </div>
      <div className="mt-10 text-center">
        <Link
          to="/"
          className="relative inline-block bg-gray-800 text-cyan-300 px-8 py-4 rounded-lg font-medium font-orbitron tracking-wide hover:bg-gray-700 transition-colors duration-300"
          onClick={() => setClickTrigger((prev) => prev + 1)}
        >
          <span className="relative z-10">Back to List</span>
          <ParticleEffect trigger={clickTrigger} />
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetail;