// toggle menu + scroll to top
var up = document.querySelector(".upp");
// header variables
var nav = document.querySelector(".nav");
var menu = document.querySelector(".right .con .menu");
var togglemenu = document.querySelector(".nav .toggleMenu");
// details variables
var details = [];
var empty = document.querySelector(".empty");
var paynow = document.querySelector(".paynow");
var detail = document.querySelector(".cart .container .detail");
var pros = "";
let total = [];

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
  details = JSON.parse(localStorage.getItem("Details"));
  display();
} else {
  empty.style.display = "block";
  paynow.style.display = "none";
}

function display() {
  pros = "";
  for (let i = 0; i < details.length; i++) {
    var itemprice = details[i].cardprice;
    itemprice = itemprice.replace(/[^0-9.-]+/g, "");
    var price = parseFloat(itemprice);
    pros += `<div class="row border-2 border-bottom py-3 justify-content-center align-items-center" data-index="${i}">
          <div class="col-4 d-flex gap-2 align-items-center">
            <img src="${details[i].cardimg}" alt="">
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
    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.closest(".row").dataset.index;
        editCount(this, index);
      });
    });

    document.querySelectorAll(".remove").forEach((button) => {
      button.addEventListener("click", function () {
        let index = this.closest(".row").dataset.index;
        removeItem(index);
      });
    });
  }
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

function removeItem(index) {
  let cartcounter = localStorage.getItem("cartCounter");
  let cartprice = localStorage.getItem("cartPrice");
  cartcounter--;
  cartprice -= 357;
  details.splice(index, 1);
  localStorage.setItem("Details", JSON.stringify(details));
  localStorage.setItem("cartCounter", cartcounter);
  localStorage.setItem("cartPrice", cartprice);
  display();
  window.location.reload();
}
