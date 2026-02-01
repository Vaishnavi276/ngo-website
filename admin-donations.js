import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tableBody = document.getElementById("donationTableBody");

const totalAmountEl = document.getElementById("totalAmount");
const totalCountEl = document.getElementById("totalCount");
const todayAmountEl = document.getElementById("todayAmount");
const weekAmountEl = document.getElementById("weekAmount");

async function loadDonations() {

  let totalAmount = 0;
  let totalCount = 0;
  let todayAmount = 0;
  let weekAmount = 0;

  const today = new Date();
  today.setHours(0,0,0,0);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const q = query(
    collection(db, "donations"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  tableBody.innerHTML = "";

  snapshot.forEach(doc => {
    const d = doc.data();
    const date = d.createdAt?.toDate();

    totalAmount += d.amount;
    totalCount++;

    if (date >= today) {
      todayAmount += d.amount;
    }

    if (date >= weekAgo) {
      weekAmount += d.amount;
    }

    const row = `
      <tr>
        <td>${d.name}</td>
        <td>${d.email}</td>
        <td>${d.phone}</td>
        <td>₹${d.amount}</td>
        <td>${d.paymentId}</td>
        <td>${date ? date.toLocaleString() : "-"}</td>
      </tr>
    `;

    tableBody.innerHTML += row;
  });

  totalAmountEl.innerText = `₹${totalAmount}`;
  totalCountEl.innerText = totalCount;
  todayAmountEl.innerText = `₹${todayAmount}`;
  weekAmountEl.innerText = `₹${weekAmount}`;
}

loadDonations();

