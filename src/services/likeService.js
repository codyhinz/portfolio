import { ref, get, set, runTransaction } from 'firebase/database';
import { db } from '../config/firebaseConfig';

export const likeService = {
  async checkIfUserHasLiked(ipHash) {
    const likeRef = ref(db, `likes/users/${ipHash}`);
    const snapshot = await get(likeRef);
    return snapshot.exists();
  },

  async getLikeCount() {
    const countRef = ref(db, 'likes/count');
    const snapshot = await get(countRef);
    return snapshot.val() || 0;
  },

  async addLike(ipHash) {
    const userLikeRef = ref(db, `likes/users/${ipHash}`);
    const countRef = ref(db, 'likes/count');

    try {
      // Check if user has already liked
      const hasLiked = await this.checkIfUserHasLiked(ipHash);
      if (hasLiked) {
        return false;
      }

      // Atomic transaction to update like count
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