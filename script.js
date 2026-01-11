console.log("NGO Website Loaded Successfully");
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;
  successMsg.textContent = "";

  function error(input, msg) {
    input.parentElement.querySelector("small").textContent = msg;
    valid = false;
  }
  function clear(input) {
    input.parentElement.querySelector("small").textContent = "";
  }

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  name.value.length < 3 ? error(name,"Min 3 characters") : clear(name);
  !/^\S+@\S+\.\S+$/.test(email.value) ? error(email,"Invalid email") : clear(email);
  phone.value && !/^\d{10}$/.test(phone.value) ? error(phone,"10 digit number") : clear(phone);
  message.value.length < 10 ? error(message,"Min 10 characters") : clear(message);

  if(valid){
    successMsg.textContent = "✅ Message sent successfully!";
    form.reset();
  }
});



const donationCards = document.querySelectorAll(".donation-card");

donationCards.forEach(card => {
  card.addEventListener("click", () => {
    donationCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});
