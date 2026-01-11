import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill all required fields");
    return;
  }

  try {
    await addDoc(collection(db, "contacts"), {
      name: name,
      email: email,
      phone: phone,
      message: message,
      createdAt: serverTimestamp()
    });

    alert("✅ Message sent successfully!");
    form.reset();

  } catch (error) {
    alert("❌ Something went wrong. Try again.");
    console.error(error);
  }
});
