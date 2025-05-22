import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-md mx-auto backdrop-blur-md bg-[#2C2C2E]/80 p-6 rounded-xl shadow-sm border border-[#3A3A3C]/50"
    >
      <motion.input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-3 border border-[#3A3A3C]/50 rounded-md bg-[#3A3A3C]/50 text-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all duration-300 text-sm font-medium placeholder-[#86868B]"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-3 border border-[#3A3A3C]/50 rounded-md bg-[#3A3A3C]/50 text-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all duration-300 text-sm font-medium placeholder-[#86868B]"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
        className="w-full p-3 border border-[#3A3A3C]/50 rounded-md bg-[#3A3A3C]/50 text-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all duration-300 text-sm font-medium placeholder-[#86868B]"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.input
        name="contact"
        placeholder="Contact"
        value={form.contact}
        onChange={handleChange}
        className="w-full p-3 border border-[#3A3A3C]/50 rounded-md bg-[#3A3A3C]/50 text-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all duration-300 text-sm font-medium placeholder-[#86868B]"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.input
        name="interests"
        placeholder="Interests"
        value={form.interests}
        onChange={handleChange}
        className="w-full p-3 border border-[#3A3A3C]/50 rounded-md bg-[#3A3A3C]/50 text-[#F5F5F7] focus:outline-none focus:ring-1 focus:ring-[#007AFF] transition-all duration-300 text-sm font-medium placeholder-[#86868B]"
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.input
        name="photoFile"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-3 border border-[#3A3A3C]/50 rounded-md bg-[#3A3A3C]/50 text-[#F5F5F7] file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#007AFF] file:text-[#F5F5F7] hover:file:bg-[#005BB5] transition-all duration-300"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {form.photo && (
        <img
          src={form.photo}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-md mt-3 mx-auto border-2 border-[#007AFF]"
        />
      )}
      <motion.button
        type="submit"
        className="w-full bg-[#007AFF] text-[#F5F5F7] px-5 py-3 rounded-md font-medium hover:bg-[#005BB5] transition-all duration-300 text-sm tracking-wide"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {buttonLabel}
      </motion.button>
    </form>
  );
};

export default ProfileForm;