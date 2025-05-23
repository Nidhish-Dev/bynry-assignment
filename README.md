# Profile Management App

A modern, cyberpunk-themed React application for managing user profiles, built with Vite, Firebase, and Leaflet. The app allows users to create, read, update, and delete (CRUD) profiles, view profile locations on a dark-themed map, and interact with a sleek UI featuring subtle animations and particle effects. A demo data push feature seeds the Firebase database with 10 sample profiles on page load, which can be removed after initial setup.

*I used leaflet maps because it is free, Google maps or mapbox api requires card information
## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## Features

- **Profile Management**: Create, view, edit, and delete user profiles via an admin dashboard.
- **Cyberpunk UI**: Professional design with dark backgrounds, cyan accents, glassmorphism (`backdrop-blur-xl`), and glowing effects (`glow-cyan`).
- **Interactive Map**: Displays profile locations using React Leaflet with a dark-themed OpenStreetMap tileset and custom neon markers.
- **Particle Effects**: Subtle cyan particle sparks on button clicks, implemented via a custom canvas-based component.
- **Responsive Design**: Grid-based layout adapts to various screen sizes (1, 2, or 3 columns).
- **Animations**: Smooth entrances using Framer Motion, without excessive hover effects for a professional feel.

## Technologies Used

- **React (18.x)**: Frontend library for building UI components.
- **Vite (5.x)**: Fast build tool and development server.
- **Firebase (10.x)**: Firestore for real-time profile storage and retrieval.
- **Framer Motion (10.x)**: For smooth animations and transitions.
- **React Leaflet (4.x) & Leaflet (1.7.1)**: For rendering interactive maps.
- **Tailwind CSS (3.x)**: Utility-first CSS framework for styling.
- **Fonts**:
  - **Orbitron**: Sci-fi font for headings.
  - **Inter**: Clean, readable font for body text.
- **Unsplash**: Source for demo profile images (freely usable, 300x300).

## Setup Instructions

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: Version 18 or higher.
- **npm**: Version 8 or higher.
- **Firebase Account**: For Firestore database.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Nidhish-Dev/bynry-assignment.git
   cd bynry-assignment

2. **Install Node Modules**:
   ```bash
   npm install
2. **Run App**:
   ```bash
   npm run dev  