
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for links and buttons
      const isLink = target.tagName === 'A' || target.closest('a');
      const isButton = target.tagName === 'BUTTON' || target.closest('button') || 
                      target.className.includes('btn') || target.closest('.btn');
      const isImage = target.tagName === 'IMG' || target.closest('img') || 
                    (target.className && target.className.includes('bg-[url') || 
                    target.style.backgroundImage !== '');
      
      setLinkHovered(!!isLink);
      setButtonHovered(!!isButton);
      setImageHovered(!!isImage);
    };

    const handleMouseLeave = () => {
      setHidden(true);
      setLinkHovered(false);
      setButtonHovered(false);
      setImageHovered(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  let dotScale = 1;
  let ringScale = 1;
  let ringOpacity = 0.4;
  let dotColor = 'bg-fashion-black';
  let ringColor = 'border-fashion-black';
  
  // Apply transformations based on element being hovered
  if (linkHovered) {
    dotScale = 1.5;
    ringScale = 1.3;
    ringOpacity = 0.6;
  } else if (buttonHovered) {
    dotScale = 0.5;
    ringScale = 1.5;
    ringOpacity = 0.7;
    dotColor = 'bg-white';
    ringColor = 'border-white';
  } else if (imageHovered) {
    dotScale = 1.2;
    ringScale = 1.8;
    ringOpacity = 0.3;
  } else if (clicked) {
    dotScale = 0.6;
    ringScale = 0.6;
    ringOpacity = 0.8;
  }

  const dotClasses = `fixed w-5 h-5 rounded-full pointer-events-none z-50 transition-all duration-150 ${dotColor} mix-blend-difference`;
  const ringClasses = `fixed w-10 h-10 rounded-full border-2 ${ringColor} pointer-events-none z-50 transition-all duration-300`;

  return (
    <>
      <div 
        className={`${dotClasses} ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${dotScale})` 
        }}
      />
      <div 
        className={`${ringClasses} ${hidden ? 'opacity-0' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          opacity: hidden ? 0 : ringOpacity
        }}
      />
    </>
  );
};

export default CustomCursor;
