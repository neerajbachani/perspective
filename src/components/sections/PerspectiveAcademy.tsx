import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Users, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  instructor: string;
}

const PerspectiveAcademy: React.FC = () => {
  const courses: Course[] = [
    {
      id: 'foundations',
      title: 'Foundations of Visual Perspective',
      description: 'Master the fundamentals of how perspective shapes perception and reality.',
      thumbnail: 'https://images.pexels.com/photos/1144176/pexels-photo-1144176.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '3h 45m',
      students: 2847,
      rating: 4.9,
      progress: 65,
      instructor: 'Dr. Sarah Chen'
    },
    {
      id: 'psychology',
      title: 'Psychology of Viewpoint',
      description: 'Explore how different perspectives influence thought and decision-making.',
      thumbnail: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '2h 30m',
      students: 1923,
      rating: 4.8,
      progress: 30,
      instructor: 'Prof. Michael Torres'
    },
    {
      id: 'photography',
      title: 'Photographic Perspective',
      description: 'Learn to capture compelling images through intentional perspective choices.',
      thumbnail: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '4h 15m',
      students: 3567,
      rating: 4.9,
      progress: 80,
      instructor: 'Isabella Rodriguez'
    },
    {
      id: 'advanced',
      title: 'Advanced Perspective Theory',
      description: 'Deep dive into complex perspective concepts and their real-world applications.',
      thumbnail: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '5h 20m',
      students: 1456,
      rating: 4.7,
      progress: 0,
      instructor: 'Dr. James Liu'
    }
  ];

  return (
    <section className="py-20 bg-charcoal" id="learn">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-cream mb-6">
            Perspective Academy
          </h2>
          <p className="font-body text-xl text-cream/70 max-w-3xl mx-auto">
            Master the art and science of perspective through expertly crafted courses
            designed to transform how you see and understand the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="group relative overflow-hidden rounded-2xl bg-sage/10 hover:bg-sage/20 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                
                {/* Play Button */}
                <motion.button
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="w-16 h-16 bg-copper rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-cream ml-1" />
                  </div>
                </motion.button>

                {/* Progress Ring */}
                {course.progress > 0 && (
                  <div className="absolute top-4 right-4">
                    <svg className="w-12 h-12 transform -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="rgba(250, 248, 245, 0.2)"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#B87333"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${(course.progress / 100) * 125.6} 125.6`}
                        className="progress-ring"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-cream font-bold">
                      {course.progress}%
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-headline text-xl font-bold text-cream mb-3 group-hover:text-copper transition-colors">
                  {course.title}
                </h3>
                <p className="font-body text-sm text-cream/70 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-xs text-cream/60 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-copper" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Instructor */}
                <p className="font-mono text-xs text-sage mb-4">
                  by {course.instructor}
                </p>

                {/* CTA Button */}
                <motion.button
                  className="w-full py-3 px-4 bg-copper hover:bg-copper/80 text-cream font-body font-medium rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Courses */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 border-2 border-copper text-copper hover:bg-copper hover:text-cream font-body font-medium rounded-full transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Courses
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PerspectiveAcademy;