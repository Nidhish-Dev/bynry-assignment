import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticleEffect from "./ParticleEffect.jsx";

const resizeImage = (file, maxWidth = 300, maxHeight = 300) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
      resolve(dataUrl);
    };

    reader.readAsDataURL(file);
  });
};

const ProfileForm = ({ onSubmit, initialData, buttonLabel }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    city: "",
    contact: "",
    interests: "",
    photo: "",
  });
  const [clickTrigger, setClickTrigger] = useState(0);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        city: initialData.city || "",
        contact: initialData.contact || "",
        interests: initialData.interests || "",
        photo: initialData.photo || "",
      });
    }
  }, [initialData]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "photoFile" && files.length > 0) {
      const file = files[0];
      const resizedDataUrl = await resizeImage(file);
      setForm((prev) => ({ ...prev, photo: resizedDataUrl }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    setClickTrigger((prev) => prev + 1);
    onSubmit(form);
  };

  return (
    <div className="space-y-8 max-w-lg mx-auto backdrop-blur-xl bg-gray-950/90 p-10 rounded-3xl shadow-2xl border border-cyan-500/30">
      {["name", "description", "city", "contact", "interests"].map((field) => (
        <div key={field} className="relative">
          <motion.input
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required={field !== "contact" && field !== "interests"}
            className="w-full p-4 bg-transparent border border-gray-600 rounded-lg text-gray-300 focus:outline-none focus:border-cyan-400 transition-colors duration-300 text-sm font-inter placeholder-transparent peer"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <label className="absolute left-4 -top-3 text-cyan-300 text-xs font-orbitron transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-300">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
        </div>
      ))}
      <div className="relative">
        <motion.input
          name="photoFile"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-4 bg-transparent border border-gray-600 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-cyan-300 hover:file:bg-gray-700 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      {form.photo && (
        <motion.img
          src={form.photo}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-xl mt-6 mx-auto border-4 border-cyan-400/50 glow-cyan"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <motion.button
        onClick={handleSubmit}
        className="relative w-full bg-gray-800 text-cyan-300 px-6 py-4 rounded-lg font-medium font-orbitron tracking-wide hover:bg-gray-700 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <span className="relative z-10">{buttonLabel}</span>
        <ParticleEffect trigger={clickTrigger} />
      </motion.button>
    </div>
  );
};

export default ProfileForm;