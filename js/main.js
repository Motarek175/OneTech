let loader = document.querySelector(".load");
document.body.style.overflowY = "hidden";
window.onload = setInterval(() => {
  loader.style.cssText = "  opacity: 0; z-index:-1";
  document.body.style.overflowY = "auto";
}, 1000);

let leftspan = document.querySelector(".left p span");
let rightspan = document.querySelector(".right p span");
let linkSignin = document.querySelector(".otherLinks .signin");
let linkSignup = document.querySelector(".otherLinks .signup");
let overlay = document.querySelector(".overlay");
leftspan.addEventListener("click", () => {
  overlay.classList.add("active");
});

linkSignup.addEventListener("click", () => {
  overlay.classList.add("active");
});

rightspan.addEventListener("click", () => {
  overlay.classList.remove("active");
});

linkSignin.addEventListener("click", () => {
  overlay.classList.remove("active");
});

let signIn = document.querySelector(".left button");
let signUp = document.querySelector(".right button");

async function login(info) {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signin",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    }
  );
  let result = await response.json();
  if (!response.ok) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message || "Invalid email or password.",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: `Welcome!`,
    }).then(() => {
      window.location.href = "home/home.html";
    });
  }
}

async function signup(data) {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  let result = await response.json();
  console.log(result);
  if (result.message === "success") {
    Swal.fire({
      icon: "success",
      title: "SignUp Successful",
      text: `Please Login!`,
    }).then(() => {
      window.location.href = "../index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${result.message}`,
    });
  }
}

signIn.addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;
  let info = {
    email: email,
    password: password,
  };
  login(info);
});

signUp.addEventListener("click", async function () {
  let name = document.getElementById("username").value;
  let email = document.getElementById("emaill").value;
  let password = document.getElementById("password").value;
  let rePassword = document.getElementById("confPass").value;
  let phone = document.getElementById("tele").value;
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    rePassword === "" ||
    phone === "" ||
    password !== rePassword ||
    phone.length !== 11
  ) {
    Swal.fire({
      icon: "error",
      title: "SignUp Failed",
      text: "Please  fill all fields and check your password and phone number",
    });
  } else {
    let info = {
      name: name,
      email: email,
      password: password,
      rePassword: rePassword,
      phone: phone,
    };
    signup(info);
  }
});
