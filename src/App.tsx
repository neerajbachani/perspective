import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ThroughDifferentEyes from './components/sections/ThroughDifferentEyes';
import PerspectiveAcademy from './components/sections/PerspectiveAcademy';
import VisualExercises from './components/sections/VisualExercises';
import GalleryExplorer from './components/sections/GalleryExplorer';
import Footer from './components/Footer';

function App() {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'crosshair'>('default');

  return (
    <div className="min-h-screen bg-cream">
      <CustomCursor cursorType={cursorType} />
      
      <div
        onMouseEnter={() => setCursorType('default')}
        onMouseLeave={() => setCursorType('default')}
      >
        <Navigation />
        
        <main>
          <Hero />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <ThroughDifferentEyes />
            <PerspectiveAcademy />
            <VisualExercises />
            <GalleryExplorer />
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;