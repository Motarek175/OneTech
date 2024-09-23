let loader = document.querySelector(".load");
document.body.style.overflowY = "hidden";
window.onload = setInterval(() => {
  loader.style.cssText = "  opacity: 0; z-index:-1";
  document.body.style.overflowY = "auto";
}, 1000);

// toggle menu + scroll to top
var up = document.querySelector(".upp");
// header variables
var nav = document.querySelector(".nav");
var menu = document.querySelector(".right .con .menu");
var togglemenu = document.querySelector(".nav .toggleMenu");
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

let details = [];
let empty = document.querySelector(".empty");
let detail = document.querySelector(".cart .container .detail");
let wish = JSON.parse(localStorage.getItem("wish")) || [];
if (wish != "") {
  empty.style.display = "none";
  details = JSON.parse(localStorage.getItem("wish"));
  let pros = "";
  for (let i = 0; i < details.length; i++) {
    pros += `<div id = "${
      i + 1
    }" class="row pt-3 justify-content-center align-items-center" data-index="${i}">
          <div class="col-4 d-flex gap-2 align-items-center">
            <img src="${details[i].favimg}" alt="" class = "w-50">
            <div class="text">
              <h5>${details[i].favname}</h5>
              <small class="text-secondary">${details[i].favtype}</small>
            </div>
          </div>
          <div class="col-4">
            <p class="text-center">${details[i].favprice}</p>
          </div>
          <div class="col-4 d-flex gap-3 justify-content-center align-items-center">
            <button class="btn btn-danger remove"><i class="fa-solid fa-heart-crack text-white"></i></button>
            <button class="btn btn-success add"><i class="fa-solid fa-cart-shopping"></i></button>
          </div>
        </div>`;
  }
  detail.innerHTML = pros;
} else {
  empty.style.display = "block";
}

let buttonsR = document.querySelectorAll(".btn-danger");
let wishCount = localStorage.getItem("wishcounter");
let state = JSON.parse(localStorage.getItem("heartState"));
buttonsR.forEach((button) => {
  let index = button.closest(".row").dataset.index;
  button.addEventListener("click", () => {
    let id = details[index].favid;
    state.splice(id, 1);
    localStorage.setItem("heartState", JSON.stringify(state));
    details.splice(index, 1);
    localStorage.setItem("wish", JSON.stringify(details));
    wishCount--;
    if (wishCount <= 0) {
      wishCount = 0;
    }
    localStorage.setItem("wishcounter", wishCount);
    window.location.reload();
  });
});

// add to cart

let buttonsA = document.querySelectorAll(".btn-success");
// console.log(buttonsA);
let cardContainer = JSON.parse(localStorage.getItem("Details")) || [];
let cartcounter = JSON.parse(localStorage.getItem("cartCounter"));
let cartPrice = JSON.parse(localStorage.getItem("cartPrice"));
let heartS = JSON.parse(localStorage.getItem("heartState"));
let btnS = JSON.parse(localStorage.getItem("State"));

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
});

buttonsA.forEach((button) => {
  let index = button.closest(".row").dataset.index;
  button.addEventListener("click", () => {
    let id = details[index].favid;
    let parent = button.parentNode.parentNode;
    let detail = {
      cardimg: parent.querySelector(".col-4 img")?.src,
      cardprice: parent.querySelector(".col-4 p")?.textContent,
      cardtype: parent.querySelector(".col-4 small")?.textContent,
      cardname: parent.querySelector(".col-4 .text h5")?.textContent,
      numcards: 1,
    };
    var itemprice = detail.cardprice;
    itemprice = itemprice.replace(/[^0-9.-]+/g, "");
    var price = parseFloat(itemprice);
    cardContainer.push(detail);
    cartcounter++;
    cartPrice += price;
    localStorage.setItem("cartCounter", cartcounter);
    localStorage.setItem("cartPrice", cartPrice);
    localStorage.setItem("Details", JSON.stringify(cardContainer));
    state.splice(id, 1);
    localStorage.setItem("heartState", JSON.stringify(state));
    details.splice(index, 1);
    localStorage.setItem("wish", JSON.stringify(details));
    wishCount--;
    if (wishCount <= 0) {
      wishCount = 0;
    }
    localStorage.setItem("wishcounter", wishCount);
    localStorage.setItem("State", JSON.stringify(state));
    Toast.fire({
      icon: "success",
      title: "Added To Cart",
    }).then(() => {
      window.location.reload();
    });
  });
});
