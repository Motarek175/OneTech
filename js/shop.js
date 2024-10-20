let loader = document.querySelector(".load");
let nav = document.querySelector(".nav");
let menu = document.querySelector(".right .con .menu");
let togglemenu = document.querySelector(".nav .toggleMenu");
let up = document.querySelector(".upp");

document.body.style.overflowY = "hidden";
window.onload = setInterval(() => {
  loader.style.cssText = "  opacity: 0; z-index:-1";
  document.body.style.overflowY = "auto";
}, 1000);

// toggle menu + scroll to top
up.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

menu.addEventListener("click", () => {
  togglemenu.classList.toggle("active");
  togglemenu.style.cssText = "z-index:1";
});

window.onscroll = function () {
  if (window.scrollY > 113) {
    nav.style.cssText = "position: fixed; top:0; left:0; width:100%; z-index:1";
    up.style.transform = "scale(1)";
  } else {
    nav.style.cssText = "position: relative;";
    up.style.transform = "scale(0)";
  }
};

let productDiv = document.querySelector("#product-list");
let catDiv = document.querySelector("#category-filter");
let allCat = [];
let allBrands = [
  "defacto",
  "adidas",
  "Jack & Jones",
  "Canon",
  "SONY",
  "puma",
  "lc waikiki",
  "Samsung",
  "Dell",
];
let currentCategoryFilter = [];
let currentBrandFilter = [];
let currentPage = 1;
let itemsInPage = 12;
let numPages;

async function fetchProducts() {
  let product = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
    method: "GET",
  });
  let finalProduct = await product.json();
  let info = finalProduct.data;
  return info;
}

let displayProduct = async (page = 1, allCheckCat = [], allCheckBrand = []) => {
  productDiv.innerHTML = "";
  let data = await fetchProducts();
  data.forEach((element) => {
    if (!allCat.includes(element.category.name)) {
      catDiv.innerHTML += `<label>
        <input onclick='catFilter()' type="checkbox"  value="${element.category.name}"/>${element.category.name}
      </label>`;
      allCat.push(element.category.name);
    }
  });
  if (allCheckCat.length === 0) {
    allCheckCat = allCat;
  }
  if (allCheckBrand.length === 0) {
    allCheckBrand = allBrands;
  }
  let filteredProducts = data.filter(
    (product) =>
      (allCheckCat.includes(product.category.name) &&
        allCheckBrand.includes(product.brand.name.toLowerCase())) ||
      (allCheckCat.includes(product.category.name) &&
        allCheckBrand.includes(product.brand.name))
  );
  numPages = Math.ceil(filteredProducts.length / itemsInPage);
  let start = (page - 1) * itemsInPage;
  let end = page * itemsInPage;
  let paginatedProducts = filteredProducts.slice(start, end);
  let i = 0;
  paginatedProducts.forEach((element) => {
    productDiv.innerHTML += `<div class="productItem" id="${element.id}">
      <div class="heart heartbutton" id="heart${element.id}">
        <i class="fa-solid fa-heart"></i>
      </div>
      <img src="${element.imageCover}" width="200px" alt="">
      <h6>${element.title}</h6>
      <p>${element.category.name}</p>
      <h5>${element.brand.name}</h5>
      <small>$ ${element.price}</small>
      <button  class="testbutton w-100 mt-2" id="button${
        i + 1
      }">Add to Cart</button>
    </div>`;
    i++;
  });
  let buttons = document.querySelectorAll(".testbutton");
  let heartbuttons = document.querySelectorAll(".heartbutton");
  buttonAction(buttons);
  heartButtonAction(heartbuttons);
  buttons.forEach((button) => {
    updateButtonState(button);
  });
  heartbuttons.forEach((heart) => {
    updateHeartState(heart);
  });
  PaginationControls();
};

displayProduct(currentPage);
let catFilter = () => {
  let filterCat = document.querySelectorAll("input[type='checkbox']");
  let checkData = [];
  filterCat.forEach((e) => {
    if (e.checked) {
      checkData.push(e.value);
    }
  });
  currentCategoryFilter = checkData;
  displayProduct(currentPage, currentCategoryFilter, currentBrandFilter);
};
let brandFilter = () => {
  let filterBrand = document.querySelectorAll(
    "input[type='checkbox'][onclick='brandFilter()']"
  );
  let checkData = [];
  filterBrand.forEach((e) => {
    if (e.checked) {
      checkData.push(e.value.toLowerCase());
    }
  });
  currentBrandFilter = checkData;
  displayProduct(currentPage, currentCategoryFilter, currentBrandFilter);
};

function PaginationControls() {
  let paginationControls = document.getElementById("pagination-controls");
  paginationControls.innerHTML = "";
  for (let i = 1; i <= numPages; i++) {
    let pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("page-btn");
    if (i === currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayProduct(currentPage, currentCategoryFilter, currentBrandFilter);
    });
    paginationControls.appendChild(pageButton);
  }
}

function onlod(buttons) {
  btnState = JSON.parse(localStorage.getItem("State")) || [];
  cardContainer = JSON.parse(localStorage.getItem("Details")) || [];
  testheart.forEach((heart) => {
    updateHeartState(heart);
  });
  if (JSON.parse(localStorage.getItem("cartCounter"))) {
    cartcounter = JSON.parse(localStorage.getItem("cartCounter"));
    cartprice = JSON.parse(localStorage.getItem("cartPrice"));
    span.innerHTML = cartcounter;
    pric.innerHTML = `$ ${cartprice}`;
  } else {
    cartcounter = 0;
    cartprice = 0;
    localStorage.setItem("cartCounter", cartcounter);
    localStorage.setItem("cartPrice", cartprice);
  }
  buttons.forEach((button) => {
    updateButtonState(button);
  });
}

let cartcounter = 0;
let cartprice = 0;
let cartItems = JSON.parse(localStorage.getItem("Details")) || [];
let btnState = [];
let heartState = [];
let wishcounter = localStorage.getItem("wishcounter")
  ? JSON.parse(localStorage.getItem("wishcounter"))
  : 0;
let favcontainer = localStorage.getItem("wish")
  ? JSON.parse(localStorage.getItem("wish"))
  : [];

window.onload = function () {
  btnState = JSON.parse(localStorage.getItem("State")) || [];
  cartItems = JSON.parse(localStorage.getItem("Details")) || [];
  if (JSON.parse(localStorage.getItem("cartCounter"))) {
    cartcounter = JSON.parse(localStorage.getItem("cartCounter"));
    cartprice = JSON.parse(localStorage.getItem("cartPrice"));
  } else {
    cartcounter = 0;
    cartprice = 0;
    localStorage.setItem("cartCounter", cartcounter);
    localStorage.setItem("cartPrice", cartprice);
  }
};

function buttonAction(buttons) {
  buttons.forEach((btn) => {
    let card = btn.parentNode;
    card.querySelector(".productItem img").addEventListener("click", () => {
      window.location.href = `../product/product.html?id=${card.id}`;
    });
    btn.addEventListener("click", () => {
      let itemprice = card
        .querySelector("small")
        .textContent.replace(/[^0-9.-]+/g, "");
      let price = parseFloat(itemprice);
      btn.classList.toggle("active");
      let btnState = JSON.parse(localStorage.getItem("State")) || [];
      if (btn.classList.contains("active")) {
        btn.innerHTML = "Remove";
        btn.style.backgroundColor = "red";
        Swal.fire({
          icon: 'success',
          title: 'What a nice choice!',
          text: 'The product is added to the cart. Check the cart.'
        })
        if (!btnState.includes(`${btn.id}`)) {
          btnState.push(`${btn.id}`);
        }
        cartcounter++;
        cartprice += price;
        let productDetails = {
          button: card.querySelector("button")?.classList,
          cardimg: card.querySelector("img")?.src,
          cardprice: itemprice,
          cardtype: card.querySelector("h5")?.textContent,
          cardname: card.querySelector("h6")?.textContent,
          numcards: 1,
          id: card.querySelector("button").id,
        };
        cartItems.push(productDetails);
      } else {
        btn.innerHTML = "Add to Cart";
        btn.style.backgroundColor = "";
        Swal.fire({
          icon: 'warning',
          title: 'Oops!',
          text: 'The product is removed from the cart. Check the cart.'
        })
        cartcounter--;
        if (cartcounter < 0) {
          cartcounter = 0;
        }
        cartprice -= price;
        if (cartprice < 0) {
          cartprice = 0;
        }
        let btnindex = cartItems.findIndex(
          (item) => item.cardname === card.querySelector("h6")?.textContent
        );
        if (btnindex !== -1) {
          cartItems.splice(btnindex, 1);
          localStorage.setItem("Details", JSON.stringify(cartItems));
        }
        let index = btnState.indexOf(btn.id);
        if (index !== -1) btnState.splice(index, 1);
      }
      localStorage.setItem("Details", JSON.stringify(cartItems));
      localStorage.setItem("cartCounter", cartcounter);
      localStorage.setItem("cartPrice", cartprice);
      localStorage.setItem("State", JSON.stringify(btnState));
    });
  });
}

function heartButtonAction(heartbuttons) {
  heartbuttons.forEach((heart) => {
    updateHeartState(heart);
    heart.addEventListener("click", () => {
      heart.classList.toggle("active");
      let heartState = JSON.parse(localStorage.getItem("heartState")) || [];
      let wish = heart.parentNode;
      console.log(wish);
      heart.style.cssText = "color:red";
      if (heart.classList.contains("active")) {
        Swal.fire({
          icon: 'success',
          title: 'What a nice choice!',
          text: `The product is added to the wishlist. Check the wishlist.`,
        })
        localStorage.setItem(`heart-${heart.id}`, "1");
        if (!heartState.includes(`${heart.id}`)) {
          heartState.push(heart.id);
        }
        wishcounter++;
        localStorage.setItem("wishcounter", wishcounter);
        let details = {
          favimg: wish.querySelector(".productItem img")?.src,
          favprice: wish.querySelector("small")?.textContent,
          favtype: wish.querySelector("p")?.textContent,
          favname: wish.querySelector("h6")?.textContent,
          favid: `heart-${heart.id}`,
        };
        console.log(details);
        console.log("Adding to wishlist:", details);
        favcontainer.push(details);
        localStorage.setItem("wish", JSON.stringify(favcontainer));
        localStorage.setItem("heartState", JSON.stringify(heartState));
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Oops!',
          text: 'The product is removed from the wishlist. Check the wishlist!',
        })
        localStorage.setItem(`heart-${heart.id}`, "0");
        heart.style.cssText = "color:black";
        let stateIndex = heartState.indexOf(heart.id);
        heartState.splice(stateIndex, 1);
        localStorage.setItem("heartState", JSON.stringify(heartState));
        wishcounter--;
        if (wishcounter < 0) wishcounter = 0;
        let heartindex = favcontainer.findIndex(
          (item) => item.favname === wish.querySelector("h6")?.textContent
        );
        if (heartindex !== -1) {
          favcontainer.splice(heartindex, 1);
        }
        console.log("Removing from wishlist:", favcontainer);
        localStorage.setItem("wish", JSON.stringify(favcontainer));
        localStorage.setItem("wishcounter", wishcounter);
      }
    });
  });
}

function updateButtonState(button) {
  let bttnstate = JSON.parse(localStorage.getItem("State")) || [];
  if (bttnstate.includes(button.id)) {
    button.classList.add("active");
    button.style.backgroundColor = "red";
    button.innerHTML = "Remove";
  } else {
    button.classList.remove("active");
    button.innerHTML = "Add to Cart";
  }
}

function updateHeartState(heart) {
  let heartstate = JSON.parse(localStorage.getItem("heartState")) || [];
  if (heartstate.includes(heart.id)) {
    heart.classList.add("active");
    heart.style.cssText = "color:red; transition: all 0.3s ease-in-out";
  } else {
    heart.classList.remove("active");
    heart.style.cssText = "color:black; transition: all 0.3s ease-in-out";
  }
}
