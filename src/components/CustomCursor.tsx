import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  cursorType: 'default' | 'hover' | 'crosshair';
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorType }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className={`custom-cursor ${cursorType}`}
      style={{
        left: position.x - 10,
        top: position.y - 10,
      }}
    />
  );
};

export default CustomCursor;