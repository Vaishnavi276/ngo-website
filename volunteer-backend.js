import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("volunteerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("vname").value.trim();
  const email = document.getElementById("vemail").value.trim();
  const phone = document.getElementById("vphone").value.trim();
  const interest = document.getElementById("vinterest").value;
  const availability = document.getElementById("vavailability").value;
  const message = document.getElementById("vmessage").value.trim();

  if (!name || !email || !interest || !availability) {
    alert("Please fill all required fields");
    return;
  }

  try {
    await addDoc(collection(db, "volunteers"), {
      name,
      email,
      phone,
      interest,
      availability,
      message,
      createdAt: serverTimestamp()
    });

    alert("✅ Thank you for volunteering!");
    form.reset();
  } catch (err) {
    alert("❌ Something went wrong");
    console.error(err);
  }
});
