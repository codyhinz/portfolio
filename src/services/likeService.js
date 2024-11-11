import { ref, get, set, runTransaction } from 'firebase/database';
import { db } from '../config/firebaseConfig';

export const likeService = {
  async checkIfUserHasLiked(ipHash) {
    if (!ipHash) return false;
    
    try {
      const likeRef = ref(db, `likes/users/${ipHash}`);
      const snapshot = await get(likeRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking like status:', error);
      return false;
    }
  },

  async getLikeCount() {
    try {
      const countRef = ref(db, 'likes/count');
      const snapshot = await get(countRef);
      return snapshot.val() || 0;
    } catch (error) {
      console.error('Error getting like count:', error);
      return 0;
    }
  },

  async addLike(ipHash) {
    if (!ipHash) return false;

    const userLikeRef = ref(db, `likes/users/${ipHash}`);
    const countRef = ref(db, 'likes/count');

    try {
      // Check if user has already liked
      const hasLiked = await this.checkIfUserHasLiked(ipHash);
      if (hasLiked) {
        return false;
      }

      // Use transaction to ensure atomic update
      await runTransaction(countRef, (currentCount) => {
        return (currentCount || 0) + 1;
      });

      // Mark user as having liked
      await set(userLikeRef, true);
      return true;
    } catch (error) {
      console.error('Error adding like:', error);
      return false;
    }
  }
};