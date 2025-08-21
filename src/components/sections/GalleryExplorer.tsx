import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Heart, Share, User, Calendar } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  artist: string;
  image: string;
  date: string;
  likes: number;
  technique: string;
  description: string;
}

const GalleryExplorer: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Urban Perspective Study',
      artist: 'Maria Santos',
      image: 'https://images.pexels.com/photos/1547813/pexels-photo-1547813.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-15',
      likes: 124,
      technique: 'Two-Point Perspective',
      description: 'A detailed study of urban architecture showcasing the power of two-point perspective in creating depth and dimension.'
    },
    {
      id: '2',
      title: 'Nature\'s Viewpoint',
      artist: 'Alex Chen',
      image: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-12',
      likes: 89,
      technique: 'Atmospheric Perspective',
      description: 'Exploring how atmospheric perspective creates depth in natural landscapes through color and clarity variations.'
    },
    {
      id: '3',
      title: 'Interior Focus',
      artist: 'Jordan Taylor',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-10',
      likes: 67,
      technique: 'One-Point Perspective',
      description: 'A masterful use of one-point perspective to guide the viewer\'s eye through an intimate interior space.'
    },
    {
      id: '4',
      title: 'Dramatic Heights',
      artist: 'Sam Rodriguez',
      image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-08',
      likes: 156,
      technique: 'Three-Point Perspective',
      description: 'An impressive three-point perspective study capturing the vertigo-inducing height of modern architecture.'
    },
    {
      id: '5',
      title: 'Reflective Surfaces',
      artist: 'Emma Thompson',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-05',
      likes: 78,
      technique: 'Reflection Study',
      description: 'Exploring how reflective surfaces create multiple perspectives within a single composition.'
    },
    {
      id: '6',
      title: 'Motion Perspective',
      artist: 'David Park',
      image: 'https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=600',
      date: '2024-01-03',
      likes: 92,
      technique: 'Dynamic Perspective',
      description: 'Capturing movement and energy through dynamic perspective techniques and motion blur effects.'
    }
  ];

  const filters = [
    { key: 'all', label: 'All Works' },
    { key: 'one-point', label: 'One-Point' },
    { key: 'two-point', label: 'Two-Point' },
    { key: 'three-point', label: 'Three-Point' },
    { key: 'atmospheric', label: 'Atmospheric' }
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => 
        item.technique.toLowerCase().includes(filter.replace('-', ' '))
      );

  return (
    <section className="py-20 bg-cream" id="gallery">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-charcoal mb-6">
            Gallery Explorer
          </h2>
          <p className="font-body text-xl text-charcoal/70 max-w-3xl mx-auto">
            Discover inspiring perspective studies from our community of artists and learners.
            Each piece demonstrates different techniques and approaches to visual perspective.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {filters.map((filterOption) => (
            <button
              key={filterOption.key}
              className={`px-6 py-3 rounded-full font-body font-medium transition-all duration-300 ${
                filter === filterOption.key
                  ? 'bg-copper text-cream shadow-lg'
                  : 'bg-white text-charcoal hover:bg-sage/20'
              }`}
              onClick={() => setFilter(filterOption.key)}
            >
              {filterOption.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <div className="masonry-grid">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="masonry-item group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedItem(item)}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Zoom Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-copper rounded-full flex items-center justify-center shadow-lg">
                      <ZoomIn className="w-6 h-6 text-cream" />
                    </div>
                  </div>

                  {/* Technique Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-copper/90 text-cream text-xs font-mono rounded-full">
                    {item.technique}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-headline text-xl font-bold text-charcoal mb-2">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-charcoal/60 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{item.artist}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <p className="font-body text-sm text-charcoal/70 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-copper">
                      <Heart className="w-4 h-4" />
                      <span className="font-mono text-sm">{item.likes}</span>
                    </div>
                    <button className="text-charcoal/60 hover:text-copper transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                className="max-w-4xl w-full bg-cream rounded-2xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="font-headline text-3xl font-bold text-charcoal mb-4">
                      {selectedItem.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-charcoal/60 mb-6">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span className="font-body">{selectedItem.artist}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-body">{new Date(selectedItem.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-copper/20 text-copper font-mono text-sm rounded-full">
                        {selectedItem.technique}
                      </span>
                    </div>
                    <p className="font-body text-charcoal/80 mb-8 leading-relaxed">
                      {selectedItem.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-copper">
                        <Heart className="w-5 h-5" />
                        <span className="font-mono">{selectedItem.likes} likes</span>
                      </div>
                      <button className="flex items-center space-x-2 px-6 py-3 bg-copper text-cream rounded-lg hover:bg-copper/80 transition-colors">
                        <Share className="w-4 h-4" />
                        <span className="font-body">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GalleryExplorer;