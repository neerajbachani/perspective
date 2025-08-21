import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    Learn: ['Courses', 'Tutorials', 'Workshops', 'Certification'],
    Explore: ['Gallery', 'Community', 'Challenges', 'Resources'],
    Create: ['Drawing Tools', 'Templates', 'Exercises', 'Feedback'],
    Support: ['Help Center', 'Contact', 'FAQ', 'Community Forum']
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-charcoal text-cream">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Camera className="w-8 h-8 text-copper" />
              <span className="font-headline text-2xl font-bold">
                PERSPECTIVE
              </span>
            </motion.div>
            <motion.p
              className="font-body text-cream/70 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Transform how you see and understand the world through the art and science of visual perspective.
            </motion.p>

            {/* Newsletter Signup */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-headline text-lg font-semibold">
                Get new perspectives weekly
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-cream/10 border border-cream/20 rounded-l-lg focus:outline-none focus:border-copper font-body"
                />
                <motion.button
                  className="px-6 py-3 bg-copper hover:bg-copper/80 rounded-r-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-headline text-lg font-semibold mb-6 text-copper">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-cream/70 hover:text-cream transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Student Work Showcase */}
        <motion.div
          className="mt-16 pt-16 border-t border-cream/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="font-headline text-xl font-semibold mb-8 text-center">
            Recent Student Work
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-lg overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <img
                  src={`https://images.pexels.com/photos/${1000000 + i * 100000}/pexels-photo-${1000000 + i * 100000}.jpeg?auto=compress&cs=tinysrgb&w=200`}
                  alt={`Student work ${i}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-cream/20 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="font-body text-cream/60 text-center md:text-left">
            © 2024 PERSPECTIVE. All rights reserved. Seeing is understanding.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="text-cream/60 hover:text-copper transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;