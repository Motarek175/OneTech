// toggle menu + scroll to top
var up = document.querySelector(".upp");
// header variables
var nav = document.querySelector(".nav");
var menu = document.querySelector(".right .con .menu");
var togglemenu = document.querySelector(".nav .toggleMenu");
// details variables
var details = [];
var empty = document.querySelector(".empty");
var detail = document.querySelector(".cart .container .detail");

// scroll to top
up.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

// header
menu.addEventListener("click", () => {
  togglemenu.classList.toggle("active");
  togglemenu.style.cssText = "z-index:1111111";
});
window.onscroll = function () {
  if (window.scrollY > 50) {
    up.style.transform = "scale(1)";
  } else {
    up.style.transform = "scale(0)";
  }
};

// details
var pros = "";
var detail = document.querySelector(".cart .container .detail");
if (JSON.parse(localStorage.getItem("wish"))) {
  empty.style.display = "none";
  details = JSON.parse(localStorage.getItem("wish"));
  for (let i = 0; i < details.length; i++) {
    pros += `<div class="row pt-3 justify-content-center align-items-center">
          <div class="col-4 d-flex gap-2 align-items-center">
            <img src="${details[i].favimg}" alt="">
            <div class="text">
              <h5>${details[i].favname}</h5>
              <p class="text-secondary">${details[i].favtype}</p>
            </div>
          </div>
          <div class="col-4">
            <p class="text-center">${details[i].favprice}</p>
          </div>
          <div class="col-4 d-flex justify-content-center align-items-center">
            <button class="btn btn-danger remove"><i class="fa-solid fa-heart-crack text-white"></i></button>
          </div>
        </div>`;
    detail.innerHTML = pros;
  }
} else {
  empty.style.display = "block";
}
