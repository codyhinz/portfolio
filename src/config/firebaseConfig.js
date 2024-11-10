import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDYUHX5bqI4JQHGje0l8o8E2Fle2L6eHGc",
    authDomain: "portfolio-11f0d.firebaseapp.com",
    projectId: "portfolio-11f0d",
    storageBucket: "portfolio-11f0d.firebasestorage.app",
    messagingSenderId: "571401866426",
    appId: "1:571401866426:web:23a55ed5a33124a9d38683",
    measurementId: "G-HJE8VVKBH6"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);