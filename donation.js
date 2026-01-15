import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.payNow = function () {

  const name = document.getElementById("donorName").value;
  const email = document.getElementById("donorEmail").value;
  const phone = document.getElementById("donorPhone").value;
  const amount = 10; // or dynamic amount

  if (!name || !email || !phone) {
    alert("Please fill all details");
    return;
  }

  const options = {
    key: "rzp_test_S32yNxhB4HFbX7", // your TEST KEY
    amount: amount * 100,
    currency: "INR",
    name: "Shree Sai Avtar Bahuuddeshiya Sanstha",
    description: "Donation",
    handler: async function (response) {

      // 🔥 SAVE DATA TO FIREBASE
      await addDoc(collection(db, "donations"), {
        name: name,
        email: email,
        phone: phone,
        amount: amount,
        paymentId: response.razorpay_payment_id,
        status: "success",
        createdAt: serverTimestamp()
      });

      alert("Thank you! Donation successful ❤️");
    },
    prefill: {
      name: name,
      email: email,
      contact: phone
    },
    theme: {
      color: "#0ea5e9"
    }
  };


  const rzp = new Razorpay(options);
  rzp.open();
};


rzp.on('payment.failed', function (response){
  console.error("Payment Failed", response.error);
  alert("Payment failed. Try again.");
});
