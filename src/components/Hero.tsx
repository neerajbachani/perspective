import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 0.1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <section className="relative h-screen overflow-hidden video-container">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted={isMuted}
        loop
        playsInline
      >
        <source
          src="https://ik.imagekit.io/2ovnzhrgn/WhatsApp%20Video%202025-06-29%20at%2010%20(online-video-cutter.com).mp4"
          type="video/mp4"
        />
      </video>

      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-charcoal/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h1
          className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.span
            className="inline-block"
            initial={{ width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ duration: 2, delay: 1 }}
            style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            SEEING IS UNDERSTANDING
          </motion.span>
        </motion.h1>

        <motion.p
          className="font-body text-xl md:text-2xl text-cream/80 max-w-2xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          Explore how perspective shapes reality
        </motion.p>

        <motion.button
          className="glass px-8 py-4 rounded-full font-body font-medium text-cream hover:bg-copper/20 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Your Journey
        </motion.button>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <ChevronDown className="w-8 h-8 text-copper animate-bounce" />
        </motion.div>
      </div>

      {/* Video Controls */}
      <div className="video-controls glass px-6 py-3 rounded-full flex items-center space-x-4">
        <button
          onClick={togglePlay}
          className="text-cream hover:text-copper transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <div className="w-32 h-1 bg-cream/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-copper transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={toggleMute}
          className="text-cream hover:text-copper transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>
    </section>
  );
};

export default Hero;