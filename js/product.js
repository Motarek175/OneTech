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

let row = document.querySelector(".product .row");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
window.onload = function () {
  getData();
};
async function getData() {
  let api = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
    method: "GET",
  });
  let res = await api.json();
  let data = res.data;
  display(data);
}

function display(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id.includes(productId)) {
      row.innerHTML = `<div
            class="left col-12 col-lg-2 order-2 order-lg-1 d-flex flex-lg-column gap-5"
          >
            <div class="img w-100">
              <img src="${data[i].images[0]}" alt="" class="w-100" />
            </div>
            <div class="img w-100">
              <img src="${data[i].images[1]}" alt="" class="w-100" />
            </div>
            <div class="img w-100">
              <img src="${data[i].images[2]}" alt="" class="w-100" />
            </div>
          </div>
          <div
            class="center col-12 col-lg-6 order-1 order-lg-2 d-flex justify-content-center"
          >
            <div class="img w-100">
              <img src="${data[i].imageCover}" alt="" class="w-100" />
            </div>
          </div>
          <div
            class="right col-12 col-lg-4 order-3 order-lg-3 d-flex flex-column"
          >
            <small>${data[i].brand.name}</small>
            <h1>${data[i].title}</h1>
            <div class="stars">
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
              <i class="fa-solid fa-star text-warning"></i>
            </div>
            <p>${data[i].description}</p>
            <div class="price d-flex justify-content-between">
              <strong>Quantity: <span class="text-black-50">1</span></strong>
              <strong class="w-50"
                >Price: <span class="text-black-50">$${data[i].price}</span
              ></strong>
            </div>
            <button class=" btn testbutton" id="button${
              i + 1
            }">Add Cart</button>
          </div>`;
    }
  }
  let images = document.querySelectorAll(".img img");
  let button = document.querySelector(".right button");
  click(images);
  onlod(button);
  buttonAction(button);
}

function click(images) {
  let imageCenter = document.querySelector(".product .center .img");
  images.forEach((img) => {
    img.addEventListener("click", () => {
      imageCenter.innerHTML = `<img src="${img.src}">`;
    });
  });
}

let cartcounter = 0;
let cartprice = 0;
let cardContainer = JSON.parse(localStorage.getItem("Details")) || [];
let btnState = [];

function onlod(button) {
  btnState = JSON.parse(localStorage.getItem("State")) || [];
  cardContainer = JSON.parse(localStorage.getItem("Details")) || [];
  if (JSON.parse(localStorage.getItem("cartCounter"))) {
    cartcounter = JSON.parse(localStorage.getItem("cartCounter"));
    cartprice = JSON.parse(localStorage.getItem("cartPrice"));
  } else {
    cartcounter = 0;
    cartprice = 0;
    localStorage.setItem("cartCounter", cartcounter);
    localStorage.setItem("cartPrice", cartprice);
  }
  updateButtonState(button);
}

function updateButtonState(button) {
  let bttnstate = JSON.parse(localStorage.getItem("State")) || [];
  if (bttnstate.includes(button.id)) {
    button.classList.add("active");
    button.innerHTML = "Remove";
  } else {
    button.classList.remove("active");
    button.innerHTML = "Add Cart";
  }
}

function buttonAction(btn) {
  btn.addEventListener("click", () => {
    let card = btn.parentNode.parentNode;
    btn.classList.toggle("active");
    let cardname = card.querySelector(".right h1")?.textContent;
    btnState = JSON.parse(localStorage.getItem("State")) || [];
    let details = {
      button: card.querySelector("button")?.classList,
      cardimg: card.querySelector(".center .img img")?.src,
      cardprice: card.querySelector(".right .price strong:nth-of-type(2) span")
        ?.textContent,
      cardtype: card.querySelector(".right small")?.textContent,
      cardname: cardname,
      numcards: 1,
      id: card.querySelector("button").id,
    };
    var itemprice = details.cardprice;
    itemprice = itemprice.replace(/[^0-9.-]+/g, "");
    var price = parseFloat(itemprice);
    if (btn.classList.contains("active")) {
      localStorage.setItem(`${btn.id}`, "1");
      if (!btnState.includes(`${btn.id}`)) {
        btnState.push(`${btn.id}`);
      }
      btn.innerHTML = "Remove";
      cardContainer.push(details);
      // Start add
      cartcounter++;
      cartprice = cartprice + price;
      localStorage.setItem("cartCounter", cartcounter);
      localStorage.setItem("cartPrice", cartprice);
      localStorage.setItem("Details", JSON.stringify(cardContainer));
      localStorage.setItem("State", JSON.stringify(btnState));
    } else {
      localStorage.setItem(`${btn.id}`, "0");
      btn.innerHTML = "Add Cart";
      // Start remove
      cartcounter--;
      cartprice = Math.abs(cartprice - price);
      if (cartcounter <= 0) {
        cartprice = 0;
        cartcounter = 0;
      }
      localStorage.setItem("cartCounter", cartcounter);
      localStorage.setItem("cartPrice", cartprice);
      let btnindex = btnState.indexOf(btn.id);
      console.log(btnindex);
      btnState.splice(btnindex, 1);
      cardContainer.splice(btnindex, 1);
      localStorage.setItem("Details", JSON.stringify(cardContainer));
      localStorage.setItem("State", JSON.stringify(btnState));
      console.log(cardContainer);
    }
    updateButtonState(btn);
  });
}
