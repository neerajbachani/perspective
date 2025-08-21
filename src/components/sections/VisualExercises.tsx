import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brush, Eraser, Grid, Save, Share, Undo, Redo } from 'lucide-react';

const VisualExercises: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(3);
  const [showGrid, setShowGrid] = useState(true);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set initial drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#B87333';
    ctx.lineWidth = brushSize;

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx, rect.width, rect.height);
    }
  }, [brushSize, showGrid]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(184, 115, 51, 0.2)';
    ctx.lineWidth = 1;

    const gridSize = 20;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#B87333';
    }

    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (showGrid) {
      const rect = canvas.getBoundingClientRect();
      drawGrid(ctx, rect.width, rect.height);
    }
  };

  const exercises = [
    {
      title: 'One-Point Perspective',
      description: 'Draw a simple corridor using one-point perspective',
      difficulty: 'Beginner'
    },
    {
      title: 'Two-Point Perspective',
      description: 'Create a building corner with two vanishing points',
      difficulty: 'Intermediate'
    },
    {
      title: 'Three-Point Perspective',
      description: 'Draw a skyscraper from a dramatic angle',
      difficulty: 'Advanced'
    }
  ];

  return (
    <section className="py-20 bg-sage/10" id="create">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-headline text-4xl md:text-6xl font-bold text-charcoal mb-6">
            Visual Exercises
          </h2>
          <p className="font-body text-xl text-charcoal/70 max-w-3xl mx-auto">
            Practice perspective drawing with interactive exercises designed to improve
            your spatial understanding and artistic skills.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Exercise List */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="font-headline text-2xl font-bold text-charcoal mb-6">
                Practice Exercises
              </h3>
              <div className="space-y-4">
                {exercises.map((exercise, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h4 className="font-body font-semibold text-charcoal mb-2">
                      {exercise.title}
                    </h4>
                    <p className="font-body text-sm text-charcoal/70 mb-2">
                      {exercise.description}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-mono ${
                      exercise.difficulty === 'Beginner' ? 'bg-sage/20 text-sage' :
                      exercise.difficulty === 'Intermediate' ? 'bg-copper/20 text-copper' :
                      'bg-charcoal/20 text-charcoal'
                    }`}>
                      {exercise.difficulty}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Drawing Canvas */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-sage/20 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        tool === 'brush' ? 'bg-copper text-cream' : 'text-charcoal hover:bg-sage/20'
                      }`}
                      onClick={() => setTool('brush')}
                    >
                      <Brush className="w-5 h-5" />
                    </button>
                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        tool === 'eraser' ? 'bg-copper text-cream' : 'text-charcoal hover:bg-sage/20'
                      }`}
                      onClick={() => setTool('eraser')}
                    >
                      <Eraser className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm text-charcoal">Size:</span>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        className="w-20"
                      />
                      <span className="font-mono text-sm text-charcoal w-6">{brushSize}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        showGrid ? 'bg-sage text-cream' : 'text-charcoal hover:bg-sage/20'
                      }`}
                      onClick={() => setShowGrid(!showGrid)}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-charcoal hover:bg-sage/20 rounded-lg transition-colors">
                      <Undo className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-charcoal hover:bg-sage/20 rounded-lg transition-colors">
                      <Redo className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-charcoal hover:bg-sage/20 rounded-lg transition-colors"
                      onClick={clearCanvas}
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Canvas */}
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-96 cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t border-sage/20 flex justify-end space-x-4">
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 text-charcoal hover:bg-sage/20 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-4 h-4" />
                    <span className="font-body">Save</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 bg-copper text-cream rounded-lg hover:bg-copper/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Share className="w-4 h-4" />
                    <span className="font-body">Share</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualExercises;