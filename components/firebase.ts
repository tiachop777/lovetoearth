// components/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDkXjcSJc5u5UEh0PTK0XPhCtvN_27cEXw",
    authDomain: "lovetoearth-659d9.firebaseapp.com",
    projectId: "lovetoearth-659d9",
    storageBucket: "lovetoearth-659d9.firebasestorage.app",
    messagingSenderId: "1052083844597",
    appId: "1:1052083844597:web:fbc57e03b66d7832e59cbc",
    measurementId: "G-PGKLWK59F5"
};

// Chỉ khởi tạo một lần
const app = initializeApp(firebaseConfig);

// 🔥 Quan trọng: xuất `db` ra
export const db = getFirestore(app);

