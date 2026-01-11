
import { signOut } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase.js";

document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

import { auth } from "./firebase.js";
import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { auth } from "./firebase.js";
import { db } from "./firebase.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";



onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Check admin role
  const adminRef = doc(db, "admins", user.email);
  const adminSnap = await getDoc(adminRef);

  if (!adminSnap.exists()) {
    alert("Access denied. Admins only.");
    window.location.href = "login.html";
  }
});


import { getAuth, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// CONTACT DATA
const contactTable = document.getElementById("contactData");

const contactQuery = query(
  collection(db, "contacts"),
  orderBy("createdAt", "desc")
);

const contactSnapshot = await getDocs(contactQuery);

contactSnapshot.forEach(doc => {
  const d = doc.data();
  const row = `
    <tr>
      <td>${d.name}</td>
      <td>${d.email}</td>
      <td>${d.message}</td>
      <td>${d.createdAt?.toDate().toLocaleString()}</td>
    </tr>
  `;
  contactTable.innerHTML += row;
});

// VOLUNTEER DATA
const volunteerTable = document.getElementById("volunteerData");

const volunteerQuery = query(
  collection(db, "volunteers"),
  orderBy("createdAt", "desc")
);

const volunteerSnapshot = await getDocs(volunteerQuery);

volunteerSnapshot.forEach(doc => {
  const d = doc.data();
  const row = `
    <tr>
      <td>${d.name}</td>
      <td>${d.email}</td>
      <td>${d.interest}</td>
      <td>${d.availability}</td>
    </tr>
  `;
  volunteerTable.innerHTML += row;
});
window.showContacts = function () {
  document.getElementById("contactsSection").style.display = "block";
  document.getElementById("volunteersSection").style.display = "none";
};

window.showVolunteers = function () {
  document.getElementById("contactsSection").style.display = "none";
  document.getElementById("volunteersSection").style.display = "block";
};
