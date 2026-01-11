// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyCH356LR4_Gv2tWCux33tT8pxf80JCA1y8",
  authDomain: "shree-sai-avtar-ngo.firebaseapp.com",
  projectId: "shree-sai-avtar-ngo",
  storageBucket: "shree-sai-avtar-ngo.firebasestorage.app",
  messagingSenderId: "143885707188",
  appId: "1:143885707188:web:75d95bfdb38e2084a674e1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

