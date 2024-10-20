let loader = document.querySelector(".load");

document.body.style.overflowY = "hidden";
window.onload = setInterval(() => {
  loader.style.cssText = "  opacity: 0; z-index:-1";
  document.body.style.overflowY = "auto";
}, 1000);

// details variables
let details = [];
let empty = document.querySelector(".empty");
let paynow = document.querySelector(".paynow");
let detail = document.querySelector(".cart .container .detail");
let pros = "";
let total = document.querySelector(".total");
let totalPricespan = document.querySelector(".total span");
let count = 0;
let totalPrice = 0;
let cartcounter = localStorage.getItem("cartCounter");
let cartprice = localStorage.getItem("cartPrice");
let state = JSON.parse(localStorage.getItem("State"));
// sure
let sureprice = document.querySelector(".sure .con .header span");
let sure = document.querySelector(".sure");
let surecon = document.querySelector(".sure .con");
let sureX = document.querySelector(".sure .con .header i");
let sureNot = document.querySelector(".sure .con .buttons .no");
let sureYes = document.querySelector(".sure .con .buttons .yes");
// scroll to top

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

// details

if (
  JSON.parse(localStorage.getItem("Details")) &&
  localStorage.getItem("cartCounter") !== "0"
) {
  empty.style.display = "none";
  paynow.style.display = "flex";
  total.style.display = "block";
  details = JSON.parse(localStorage.getItem("Details"));
  display();
} else {
  empty.style.display = "block";
  paynow.style.display = "none";
  total.style.display = "none";
}

function display() {
  pros = "";
  let count = 0;
  let totalPrice = 0;
  for (let i = 0; i < details.length; i++) {
    let itemprice = details[i].cardprice;
    itemprice = itemprice.replace(/[^0-9.-]+/g, "");
    let price = parseFloat(itemprice);
    pros += `<div class="row py-3 justify-content-center align-items-center" data-index="${i}">
          <div class="col-4 d-flex gap-2 align-items-center">
            <img src="${details[i].cardimg}" alt="" class = "w-50">
            <div class="text">
              <h5>${details[i].cardname}</h5>
              <p class="text-secondary">${details[i].cardtype}</p>
            </div>
          </div>
          <div class="col-2">
            <p class="text-center">${details[i].cardprice}</p>
          </div>
          <div class="col-4 d-flex justify-content-center">
            <input type="number" class="form-control w-25 text-center" value="${
              details[i].numcards
            }" disabled min="1">
            <button class="btn btn-warning edit">edit</button>
            <button class="btn btn-danger remove"><i class="fa-solid fa-trash-can text-white"></i></button>
          </div>
          <div class="col-2">
            <p class="text-center">${details[i].numcards * price}</p>
          </div>
        </div>`;
    detail.innerHTML = pros;
    count = details[i].numcards * price;
    totalPrice += count;
    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.closest(".row").dataset.index;
        editCount(this, index);
      });
    });

    document.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.closest(".row").dataset.index;
        removeItem(index, price);
      });
    });
  }
  // console.log(totalPrice);
  totalPricespan.innerHTML = `$ ${totalPrice}`;
  sureprice.innerHTML = `${totalPrice} $`;
}

function editCount(edit, i) {
  let input = edit.previousElementSibling;
  if (edit.textContent === "edit") {
    input.disabled = false;
    edit.textContent = "save";
    edit.style.color = "white";
    edit.style.background = "green";
  } else {
    input.disabled = true;
    edit.textContent = "edit";
    edit.style.color = "black";
    edit.style.background = "";
    let inpvalue = input.value;
    details[i].numcards = inpvalue;
    localStorage.setItem("Details", JSON.stringify(details));
    display();
  }
}

function removeItem(index, price) {
  cartcounter--;
  cartprice = cartprice - price;
  details.splice(index, 1);
  state.splice(index, 1);
  localStorage.setItem("Details", JSON.stringify(details));
  localStorage.setItem("cartCounter", cartcounter);
  localStorage.setItem("cartPrice", cartprice);
  localStorage.setItem("State", JSON.stringify(state));
  display();
  window.location.reload();
}

paynow.addEventListener("click", () => {
  sure.style.cssText = "display: flex";
  surecon.style.cssText = "transform: scale(1); ";
  sureX.style.cssText = "cursor:pointer";
});

sureX.addEventListener("click", () => {
  sure.style.cssText = "display: none";
});

sureNot.addEventListener("click", () => {
  sure.style.cssText = "display: none";
});

sureYes.addEventListener("click", () => {
  sure.style.cssText = "display: none";
  Swal.fire({
    title: "Done",
    icon: "success",
  }).then(() => {
    localStorage.clear("Details");
    window.location.reload();
  });
});
