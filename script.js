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

// ===== Volunteer Form Validation =====
const vForm = document.getElementById("volunteerForm");
const vSuccess = document.getElementById("volunteerSuccess");

vForm.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;
  vSuccess.textContent = "";

  function error(input, msg) {
    input.parentElement.querySelector("small").textContent = msg;
    valid = false;
  }
  function clear(input) {
    input.parentElement.querySelector("small").textContent = "";
  }

  const name = document.getElementById("vname");
  const email = document.getElementById("vemail");
  const phone = document.getElementById("vphone");
  const interest = document.getElementById("interest");

  name.value.length < 3 ? error(name,"Min 3 characters") : clear(name);
  !/^\S+@\S+\.\S+$/.test(email.value) ? error(email,"Invalid email") : clear(email);
  !/^\d{10}$/.test(phone.value) ? error(phone,"10 digit number") : clear(phone);
  interest.value === "" ? error(interest,"Please select an option") : clear(interest);

  if(valid){
    vSuccess.textContent = "✅ Thank you for volunteering! We will contact you soon.";
    vForm.reset();
  }
});
