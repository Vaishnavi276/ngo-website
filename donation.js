import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.payNow = function () {

  const name = document.getElementById("donorName").value;
  const email = document.getElementById("donorEmail").value;
  const phone = document.getElementById("donorPhone").value;
  const amount = 10;

  if (!name || !email || !phone) {
    alert("Please fill all details");
    return;
  }

  const options = {
    key: "rzp_test_S32yNxhB4HFbX7",
    amount: amount * 100,
    currency: "INR",
    name: "Shree Sai Avtar Bahuuddeshiya Sanstha",
    description: "Donation",
handler: async function (response) {

  const docRef = await addDoc(collection(db, "donations"), {
    name,
    email,
    phone,
    amount,
    paymentId: response.razorpay_payment_id,
    receiptNo: "SSA-" + Date.now(),   // ✅ UNIQUE RECEIPT NO
    status: "success",
    createdAt: serverTimestamp()
  });

  alert("Thank you! Donation successful ❤️");
  generateReceipt(name, email, phone, amount, response.razorpay_payment_id);
},


    prefill: {
      name,
      email,
      contact: phone
    },

    theme: {
      color: "#0ea5e9"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();

  rzp.on("payment.failed", function (response) {
    console.error("Payment Failed:", response.error);
    alert("Payment failed. Try again.");
  });
  window.generateReceipt = function (name, email, phone, amount, paymentId) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Donation Receipt", 70, 20);

  doc.setFontSize(11);
  doc.text("Shree Sai Avtar Bahuuddeshiya Sanstha", 20, 35);
  doc.text("Registered Charitable Trust", 20, 42);

  doc.line(20, 45, 190, 45);

  doc.text(`Receipt No: SSA-${Date.now()}`, 20, 55);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 62);

  doc.text("Donor Details:", 20, 75);
  doc.text(`Name: ${name}`, 20, 82);
  doc.text(`Email: ${email}`, 20, 89);
  doc.text(`Phone: ${phone}`, 20, 96);

  doc.text("Donation Details:", 20, 110);
  doc.text(`Amount: ₹${amount}`, 20, 117);
  doc.text(`Payment ID: ${paymentId}`, 20, 124);
  doc.text("Mode: Online (Razorpay)", 20, 131);

  doc.line(20, 145, 190, 145);

  doc.text(
    "This receipt acknowledges the donation received. No goods or services were provided in return.",
    20,
    155,
    { maxWidth: 170 }
  );

  doc.text("Thank you for your support ❤️", 20, 175);
  doc.text("Authorized Signatory", 140, 185);

  doc.save(`Donation_Receipt_${paymentId}.pdf`);
};

};
