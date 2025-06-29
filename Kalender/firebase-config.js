// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 👉 Deine eigene Konfiguration hier einfügen:
const firebaseConfig = {
    apiKey: "AIzaSyAujeUok4jKYwnr5GEXze_EadszqMdY1y4",
    authDomain: "gamechanger-78fb4.firebaseapp.com",
    projectId: "gamechanger-78fb4",
    storageBucket: "gamechanger-78fb4.firebasestorage.app",
    messagingSenderId: "510513691722",
    appId: "1:510513691722:web:c0c1a97141ddfda4377ab3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export { collection, addDoc, query, where, getDocs };