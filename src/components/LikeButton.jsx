import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { likeService } from '../services/likeService';
import { ipHashService } from '../services/ipHashService';

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLikes = async () => {
      try {
        const userHash = await ipHashService.getUserHash();
        const [hasLikedAlready, totalLikes] = await Promise.all([
          likeService.checkIfUserHasLiked(userHash),
          likeService.getLikeCount()
        ]);

        setHasLiked(hasLikedAlready);
        setLikes(totalLikes);
      } catch (error) {
        console.error('Error initializing likes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLikes();
  }, []);

  const handleLike = async () => {
    if (hasLiked || isLoading) return;

    try {
      setIsLoading(true);
      const userHash = await ipHashService.getUserHash();
      const success = await likeService.addLike(userHash);

      if (success) {
        setLikes(prev => prev + 1);
        setHasLiked(true);
      }
    } catch (error) {
      console.error('Error adding like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={handleLike}
        className={`p-2 bg-wow-bg/80 border border-wow-border rounded-lg transition-all duration-300 hover:scale-110 group
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          ${hasLiked ? 'hover:bg-red-500/20' : 'hover:bg-wow-gold/20'}`}
        disabled={hasLiked || isLoading}
      >
        <Heart
          className={`w-6 h-6 transition-all duration-300 
            ${hasLiked 
              ? 'text-red-500 fill-red-500' 
              : 'text-wow-gold group-hover:scale-110'}
            ${isLoading ? 'animate-pulse' : ''}`}
        />
      </button>

      {/* Like Counter */}
      <span className={`absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full px-1
        flex items-center justify-center text-xs font-medium bg-black text-white
        ${hasLiked ? 'bg-red-500' : 'bg-wow-gold'}`}>
        {likes}
      </span>

      {/* Tooltip */}
      {showTooltip && !isLoading && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 border border-wow-gold 
          text-white text-xs py-2 px-3 rounded pointer-events-none z-50">
          {hasLiked 
            ? "Thanks for the support!"
            : "Enjoying the website? Please consider leaving a like!"}
          <div className="absolute -top-1 right-4 transform -translate-y-1/2 rotate-45 
            w-2 h-2 bg-black/90 border-t border-l border-wow-gold" />
        </div>
      )}
    </div>
  );
};

export default LikeButton;