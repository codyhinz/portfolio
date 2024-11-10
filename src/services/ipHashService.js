export const ipHashService = {
    async getUserHash() {
      try {
        // Get IP address from a free IP API
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        
        // Create a simple hash of the IP
        const hash = await this.hashIP(ip);
        return hash;
      } catch (error) {
        console.error('Error getting IP:', error);
        // Fallback to browser fingerprint
        return this.getBrowserFingerprint();
      }
    },
  
    async hashIP(ip) {
      // Create a hash of the IP using SubtleCrypto
      const msgBuffer = new TextEncoder().encode(ip);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },
  
    getBrowserFingerprint() {
      // Simple browser fingerprint as fallback
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        new Date().getTimezoneOffset(),
        window.innerWidth,  // Changed from screen.width
        window.innerHeight, // Changed from screen.height
        navigator.hardwareConcurrency
      ].join('|');
      
      return this.hashIP(fingerprint);
    }
  };