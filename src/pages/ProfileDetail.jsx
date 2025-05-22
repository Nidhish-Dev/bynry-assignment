import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import MapViewer from "../components/MapViewer";

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="text-center mt-8 text-[#86868B]">
      <div className="spinner border-4 border-[#3A3A3C] border-t-[#007AFF] rounded-full w-8 h-8 animate-spin mx-auto"></div>
      <p className="mt-4 text-sm">Loading profile...</p>
    </div>
  );

  if (!profile) return (
    <div className="text-center mt-8 text-[#FF3B30]">
      Profile not found. <Link to="/" className="text-[#007AFF] hover:underline text-sm">Go back</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 backdrop-blur-md bg-[#2C2C2E]/80 rounded-xl shadow-sm border border-[#3A3A3C]/50 mt-8">
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        {/* Profile Info (Left on Desktop, Top on Mobile) */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
          <h1 className="text-2xl font-semibold mb-4 text-[#F5F5F7] tracking-tight">{profile.name}</h1>
          {profile.photo && (
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-40 h-40 object-cover rounded-md mb-6 border-2 border-[#007AFF]"
            />
          )}
          <div className="w-full text-center lg:text-left">
            <p className="mb-3 text-[#86868B] text-sm">{profile.description}</p>
            <p className="mb-3 text-[#86868B] text-sm">
              <strong>City:</strong> {profile.city}
            </p>
            <p className="mb-3 text-[#86868B] text-sm">
              <strong>Contact:</strong> {profile.contact || "N/A"}
            </p>
            <p className="mb-4 text-[#86868B] text-sm">
              <strong>Interests:</strong> {profile.interests || "N/A"}
            </p>
          </div>
        </div>

        {/* Map (Right on Desktop, Bottom on Mobile) */}
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <h2 className="text-lg font-medium mb-4 text-[#F5F5F7] tracking-tight text-center lg:text-left">Location Map</h2>
          <MapViewer city={profile.city} />
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="inline-block bg-[#007AFF] text-[#F5F5F7] px-5 py-2 rounded-md hover:bg-[#005BB5] transition-all duration-300 text-sm font-medium tracking-wide"
        >
          Back to List
        </Link>
      </div>
    </div>
  );
};

export default ProfileDetail;