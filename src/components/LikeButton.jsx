import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { ref, onValue, set, get } from 'firebase/database';
import { db } from '../config/firebaseConfig';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    const likesCountRef = ref(db, 'likes/count');

    const unsubscribe = onValue(likesCountRef, (snapshot) => {
      if (snapshot.exists()) {
        setLikes(snapshot.val());
      } else {
        set(likesCountRef, 0).catch(console.error);
        setLikes(0);
      }
    });

    const hasLikedBefore = localStorage.getItem('hasLiked') === 'true';
    setHasLiked(hasLikedBefore);

    return () => unsubscribe();
  }, []);

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    setIsLoading(true);
    try {
      const likesCountRef = ref(db, 'likes/count');
      const snapshot = await get(likesCountRef);
      const currentCount = snapshot.exists() ? snapshot.val() : 0;
      
      await set(likesCountRef, currentCount + 1);
      localStorage.setItem('hasLiked', 'true');
      setHasLiked(true);
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!buttonRef.current || hasLiked) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - buttonRect.left;
    const y = e.clientY - buttonRect.top;

    setTooltipPosition({ x, y });
  };

  const handleMouseEnter = () => {
    if (!hasLiked) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative z-50">
      <div className="relative inline-block">
        <button
          ref={buttonRef}
          onClick={handleLike}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          disabled={hasLiked || isLoading}
          className={`p-2 bg-wow-bg/80 border border-wow-border rounded-lg transition-all duration-300
            ${!hasLiked && !isLoading ? 'hover:scale-110' : ''}
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${hasLiked ? 'bg-red-500/20' : 'hover:bg-wow-gold/20'}`}
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 
              ${hasLiked ? 'text-red-500 fill-red-500' : 'text-wow-gold'}
              ${isLoading ? 'animate-pulse' : ''}`}
          />
          
          <div className={`absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full px-1.5
            flex items-center justify-center text-xs font-bold
            shadow-[0_0_10px_rgba(0,0,0,0.3)]
            ${hasLiked 
              ? 'bg-gradient-to-b from-red-400 to-red-500 text-white' 
              : 'bg-gradient-to-b from-[#ffd700] to-[#ffa500] text-black/90'}`}
          >
            {likes}
          </div>
        </button>

        {showTooltip && !hasLiked && (
          <div 
            className="absolute pointer-events-none z-50"
            style={{ 
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: 'translate(-100%, -50%)',
              marginLeft: '-10px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          >
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeButton;