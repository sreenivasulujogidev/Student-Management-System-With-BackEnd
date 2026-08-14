document.querySelector("#showPassword").addEventListener("click", (event) => {
  const passwordField = document.querySelector("#passwordField");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    event.currentTarget.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
  } else {
    passwordField.type = "password";
    event.currentTarget.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

let generatedCaptchaValue = "";
function generateCaptcha() {
  const str = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  let captcha = "";
  for (let i = 0; i < 7; i++) {
    const index = Math.floor(Math.random() * str.length);
    captcha += str[index];
  }
  const cap = document.querySelector("#captcha");
  cap.innerHTML = captcha;
  generatedCaptchaValue = captcha;
}
document
  .querySelector("#refreshCaptcha")
  .addEventListener("click", generateCaptcha);
window.addEventListener("load", generateCaptcha);

///////// SIGN UP //////////

document.querySelector("#SignUPshowPassword").addEventListener("click", () => {
  const signUPpasswordField = document.querySelector("#signUPpasswordField");
  if (signUPpasswordField.type === "password") {
    signUPpasswordField.type = "text";
    event.currentTarget.classList.remove("fa-eye");
    event.currentTarget.classList.add("fa-eye-slash");
  } else {
    signUPpasswordField.type = "password";
    event.currentTarget.classList.remove("fa-eye-slash");
    event.currentTarget.classList.add("fa-eye");
  }
});

const signInForm = document.querySelector(".signin");
const signUpForm = document.querySelector(".signup");

function showForm(fromToShow, fromToHide) {
  fromToShow.classList.add("active");
  fromToHide.classList.remove("active");
}

document.querySelector("#signin").addEventListener("click", () => {
  showForm(signInForm, signUpForm);
});

document.querySelector("#signup").addEventListener("click", () => {
  showForm(signUpForm, signInForm);
});

const signUpResult = document.querySelector("#signUpResult");
document.querySelector(".signup").addEventListener("submit", () => {
  event.preventDefault();
  signupUser();
});

async function signupUser() {
  const formData = Object.fromEntries(new FormData(signUpForm));
  try {
    const response = await axios.post("/auth/signup", formData);
    window.location.href = response.data.redirectTo;
  } catch (error) {
    if (error.response) {
      signUpResult.innerHTML = error.response.data;
    } else {
      signUpResult.innerHTML = error.message;
    }
  }
}

const signInResult = document.querySelector("#signInResult");
document.querySelector(".signin").addEventListener("submit", () => {
  event.preventDefault();
  signinuser();
});

async function signinuser() {
  const formData = Object.fromEntries(new FormData(signInForm));
  const { captcha: userEnteredCaptcha } = formData;
  if (userEnteredCaptcha === "") {
    signInResult.innerHTML = "Please Enter the Captcha";
    return;
  }
  if (generatedCaptchaValue !== userEnteredCaptcha) {
    signInResult.innerHTML = "Captcha Not Matched";
    return;
  }
  delete formData.captcha;
  try {
    const response = await axios.post("/auth/signin", formData);
    window.location.href = response.data.redirectTo;
  } catch (error) {
    if (error.response) {
      signInResult.innerHTML = error.response.data;
    } else {
      signInResult.innerHTML = error.message;
    }
  }
}
