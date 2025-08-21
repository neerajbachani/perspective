import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Move } from 'lucide-react';

interface ViewPoint {
  id: string;
  name: string;
  image: string;
  description: string;
}

const ThroughDifferentEyes: React.FC = () => {
  const [activeView, setActiveView] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);

  const viewpoints: ViewPoint[] = [
    {
      id: 'first-person',
      name: 'First Person',
      image: 'https://thewildcattribune.com/wp-content/uploads/2021/06/1.jpeg.jpg',
      description: 'Experience the world through human eyes'
    },
    {
      id: 'aerial',
      name: 'Aerial View',
      image: 'https://images7.alphacoders.com/607/thumb-1920-607711.jpg',
      description: 'See the bigger picture from above'
    },
    {
      id: 'macro',
      name: 'Macro Detail',
      image: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Discover beauty in the smallest details'
    },
    {
      id: 'wide-angle',
      name: 'Wide Perspective',
      image: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Capture the full scope of experience'
    }
  ];

  return (
    <section className="py-20 bg-cream" id="explore">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-charcoal mb-6">
            Through Different Eyes
          </h2>
          <p className="font-body text-xl text-charcoal/70 max-w-3xl mx-auto">
            Every perspective tells a different story. Explore how changing your viewpoint
            transforms understanding and reveals hidden truths.
          </p>
        </motion.div>

        {/* Interactive Comparison */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            {/* Background Images */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{ backgroundImage: `url(${viewpoints[activeView].image})` }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url(${viewpoints[(activeView + 1) % viewpoints.length].image})`,
                clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`
              }}
            />

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-copper cursor-col-resize flex items-center justify-center group"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={(e) => {
                const rect = e.currentTarget.parentElement!.getBoundingClientRect();
                const handleMouseMove = (e: MouseEvent) => {
                  const newPosition = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  setSliderPosition(newPosition);
                };
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }}
            >
              <div className="w-8 h-8 bg-copper rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Move className="w-4 h-4 text-cream" />
              </div>
            </div>

            {/* View Labels */}
            <div className="absolute top-4 left-4 glass px-3 py-2 rounded-lg">
              <span className="font-mono text-sm text-cream font-medium">
                {viewpoints[activeView].name}
              </span>
            </div>
            <div className="absolute top-4 right-4 glass px-3 py-2 rounded-lg">
              <span className="font-mono text-sm text-cream font-medium">
                {viewpoints[(activeView + 1) % viewpoints.length].name}
              </span>
            </div>
          </div>
        </div>

        {/* Viewpoint Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {viewpoints.map((viewpoint, index) => (
            <motion.button
              key={viewpoint.id}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                activeView === index
                  ? 'bg-copper text-cream shadow-lg'
                  : 'bg-white text-charcoal hover:bg-sage/20'
              }`}
              onClick={() => setActiveView(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Eye className="w-6 h-6 mx-auto mb-2" />
              <h3 className="font-body font-semibold text-sm mb-1">
                {viewpoint.name}
              </h3>
              <p className="font-body text-xs opacity-80">
                {viewpoint.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThroughDifferentEyes;