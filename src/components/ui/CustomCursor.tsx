import React, { useEffect, useState, useRef, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);

  const requestRef = useRef<number>();
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  
  // Simple debounce utility (since external libraries are not allowed)
  const debounce = (func: Function, delay: number) => {
    let timeoutId: number; 
    return function(this: any, ...args: any[]) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay) as unknown as number; // Explicitly cast to number
    };
  };

  const animateCursor = useCallback(() => {
    setPosition({ x: mouseX.current, y: mouseY.current });
    requestRef.current = requestAnimationFrame(animateCursor);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    // Debounce the element hover check
    const debouncedHandleElementHover = debounce((e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isLink = target.tagName === 'A' || target.closest('a');
      const isButton = target.tagName === 'BUTTON' || target.closest('button') || 
                      target.className.includes('btn') || target.closest('.btn');
      const isImage = target.tagName === 'IMG' || target.closest('img') || 
                    (target.className && target.className.includes('bg-[url') || 
                    target.style.backgroundImage !== '');
      
      setLinkHovered(!!isLink);
      setButtonHovered(!!isButton);
      setImageHovered(!!isImage);
    }, 50); // Debounce by 50ms

    const handleMouseLeave = () => {
      setHidden(true);
      setLinkHovered(false);
      setButtonHovered(false);
      setImageHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', debouncedHandleElementHover); // Use debounced version
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(requestRef.current as number);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', debouncedHandleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animateCursor]);

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

  // Adjusted transitions for smoother feel
  const dotClasses = `fixed w-5 h-5 rounded-full pointer-events-none z-50 transition-transform ${dotColor} mix-blend-difference`;
  const ringClasses = `fixed w-10 h-10 rounded-full border-2 ${ringColor} pointer-events-none z-50 transition-all`;

  return (
    <>
      <div 
        className={`${dotClasses} ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${dotScale})`, 
          transitionDuration: linkHovered || buttonHovered || imageHovered ? '200ms' : '100ms' // Faster transition on hover
        }}
      />
      <div 
        className={`${ringClasses} ${hidden ? 'opacity-0' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${ringScale})`,
          opacity: hidden ? 0 : ringOpacity,
          transitionDuration: linkHovered || buttonHovered || imageHovered ? '200ms' : '150ms' // Faster transition on hover
        }}
      />
    </>
  );
};

export default CustomCursor;
