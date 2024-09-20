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

// countdown
function countDown(days, hours, minutes, seconds) {
  if (!localStorage.getItem("countdownDays")) {
    localStorage.setItem("countdownDays", days);
    localStorage.setItem("countdownHours", hours);
    localStorage.setItem("countdownMinutes", minutes);
    localStorage.setItem("countdownSeconds", seconds);
  } else {
    days = parseInt(localStorage.getItem("countdownDays"));
    hours = parseInt(localStorage.getItem("countdownHours"));
    minutes = parseInt(localStorage.getItem("countdownMinutes"));
    seconds = parseInt(localStorage.getItem("countdownSeconds"));
  }
  function updateCountDown() {
    if (seconds === 0) {
      if (minutes === 0) {
        if (hours === 0) {
          if (days === 0) {
            document.getElementById("countdown").innerHTML =
              "00 : 00 : 00 : 00";
            return;
          } else {
            days--;
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
        } else {
          hours--;
          minutes = 59;
          seconds = 59;
        }
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }
    localStorage.setItem("countdownDays", days);
    localStorage.setItem("countdownHours", hours);
    localStorage.setItem("countdownMinutes", minutes);
    localStorage.setItem("countdownSeconds", seconds);
    let day = days < 10 ? "0" + days : days;
    let hour = hours < 10 ? "0" + hours : hours;
    let minute = minutes < 10 ? "0" + minutes : minutes;
    let second = seconds < 10 ? "0" + seconds : seconds;
    document.querySelector(".countdown0").style.cssText = "font-weight:bold";
    document.querySelector(
      ".countdown0"
    ).innerHTML = `${day} : ${hour} : ${minute} : ${second}`;
    document.querySelector(".countdown1").style.cssText = "font-weight:bold";
    document.querySelector(
      ".countdown1"
    ).innerHTML = `${day} : ${hour} : ${minute} : ${second}`;
    document.querySelector(".countdown2").style.cssText = "font-weight:bold";
    document.querySelector(
      ".countdown2"
    ).innerHTML = `${day} : ${hour} : ${minute} : ${second}`;
    setTimeout(updateCountDown, 1000);
  }
  updateCountDown();
}
countDown(12, 22, 2, 45);

// deals
let feature = document.querySelector(
  ".deal .container .row .right .items .content .feature"
);
let onsal = document.querySelector(
  ".deal .container .row .right .items .content .onsal"
);
let best = document.querySelector(
  ".deal .container .row .right .items .content .best"
);
let headings = document.querySelectorAll(
  ".deal .container .row .right .items .head button"
);

headings.forEach((button) => {
  button.addEventListener("click", () => {
    headings.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    if (button.classList.contains("featured")) {
      feature.style.display = "flex";
      onsal.style.display = "none";
      best.style.display = "none";
    } else if (button.classList.contains("onsale")) {
      onsal.style.display = "flex";
      best.style.display = "none";
      feature.style.display = "none";
    } else {
      feature.style.display = "none";
      best.style.display = "flex";
      onsal.style.display = "none";
    }
  });
});

// newArrival
let feat = document.querySelector(".newArrival .container .row .left .feature");
let onsa = document.querySelector(".newArrival .container .row .left  .onsal");
let bes = document.querySelector(".newArrival .container .row .left  .best");
let heading = document.querySelectorAll(
  ".newArrival .container .row  .buttons button"
);
heading.forEach((button) => {
  button.addEventListener("click", () => {
    heading.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    if (button.classList.contains("featured")) {
      feat.style.display = "flex";
      onsa.style.display = "none";
      bes.style.display = "none";
    } else if (button.classList.contains("onsale")) {
      onsa.style.display = "flex";
      bes.style.display = "none";
      feat.style.display = "none";
    } else {
      feat.style.display = "none";
      bes.style.display = "flex";
      onsa.style.display = "none";
    }
  });
});

// hot best seller
let hotfeat = document.querySelector(".bestSeller .container  .feature");
let hotonsal = document.querySelector(".bestSeller .container .onsal");
let hotbest = document.querySelector(".bestSeller .container  .best");
let hotheading = document.querySelectorAll(
  ".bestSeller .container .row  .buttons button"
);
hotheading.forEach((button) => {
  button.addEventListener("click", () => {
    hotheading.forEach((btn) => {
      btn.classList.remove("active");
    });
    button.classList.add("active");
    if (button.classList.contains("featured")) {
      hotfeat.style.display = "flex";
      hotonsal.style.display = "none";
      hotbest.style.display = "none";
    } else if (button.classList.contains("onsale")) {
      hotonsal.style.display = "flex";
      hotbest.style.display = "none";
      hotfeat.style.display = "none";
    } else {
      hotfeat.style.display = "none";
      hotbest.style.display = "flex";
      hotonsal.style.display = "none";
    }
  });
});

// cart and wishlist
let span = document.querySelector(
  "header .main .container .row .icon .cart .counter span"
);
let pric = document.querySelector(
  "header .main .container .row .icon .cart .info small"
);
let whishlist = document.querySelector(
  "header .main .container .row .icon .whishlist .counter span"
);
let cartcounter = 0;
let cartprice = 0;
let card;
let cardContainer = JSON.parse(localStorage.getItem("Details")) || [];
let buttons = document.querySelectorAll(".testbutton");
let heartbuttons = document.querySelectorAll(".heartbutton");
let testheart = document.querySelectorAll(".testheart");
let btnState = [];
let heartState = [];
// add and remove from wishlist
let wishcounter = localStorage.getItem("wishcounter")
  ? JSON.parse(localStorage.getItem("wishcounter"))
  : 0;
let favcontainer = localStorage.getItem("wish")
  ? JSON.parse(localStorage.getItem("wish"))
  : [];
whishlist.innerHTML = wishcounter;

// add and remove from cart
window.onload = function () {
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
};

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

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    card = btn.parentNode;
    let cardname = card.querySelector(".text strong")?.textContent;
    btnState = JSON.parse(localStorage.getItem("State")) || [];
    let details = {
      button: card.querySelector("button")?.classList,
      cardimg: card.querySelector(".img img")?.src,
      cardprice: card.querySelector(".text small:nth-of-type(1)")?.textContent,
      cardtype: card.querySelector(".text small:nth-of-type(2)")?.textContent,
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
      span.innerHTML = cartcounter;
      pric.innerHTML = `$ ${cartprice}`;
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
      span.innerHTML = cartcounter;
      pric.innerHTML = `$ ${cartprice}`;
      localStorage.setItem("cartCounter", cartcounter);
      localStorage.setItem("cartPrice", cartprice);
      let index = cardContainer.findIndex((item) => item.cardname === cardname);
      let btnindex = btnState.indexOf(btn.id);
      if (btnindex !== -1) btnState.splice(btnindex, 1);
      localStorage.setItem("State", JSON.stringify(btnState));
      if (index !== -1) {
        cardContainer.splice(index, 1);
        localStorage.setItem("Details", JSON.stringify(cardContainer));
      }
    }
    updateButtonState(btn);
  });
});

heartbuttons.forEach((heart) => {
  updateHeartState(heart);
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
    heartState = JSON.parse(localStorage.getItem("heartState")) || [];
    let wish = heart.parentNode;
    console.log(wish);
    if (heart.classList.contains("active")) {
      localStorage.setItem(`heart-${heart.id}`, "1");
      if (!heartState.includes(`${heart.id}`)) {
        heartState.push(heart.id);
      }
      heart.style.cssText = "color:red";
      // Add to wishlist
      wishcounter++;
      whishlist.innerHTML = wishcounter;
      localStorage.setItem("wishcounter", wishcounter);
      let details = {
        favimg: wish.querySelector("img")?.src,
        favprice: wish.querySelector("small:nth-of-type(1)")?.textContent,
        favtype: wish.querySelector("small:nth-of-type(2)")?.textContent,
        favname: wish.querySelector("strong")?.textContent,
        favid: wish.querySelector(".heartbutton").id,
      };
      favcontainer.push(details);
      localStorage.setItem("wish", JSON.stringify(favcontainer));
      localStorage.setItem("heartState", JSON.stringify(heartState));
    } else {
      localStorage.setItem(`heart-${heart.id}`, "0");
      heart.style.cssText = "color:black";
      // Remove from wishlist
      let stateIndex = heartState.indexOf(heart.id);
      heartState.splice(stateIndex, 1);
      localStorage.setItem("heartState", JSON.stringify(heartState));
      wishcounter--;
      if (wishcounter <= 0) {
        wishcounter = 0;
      }
      let heartindex = favcontainer.findIndex(
        (item) => item.favname === wish.querySelector(".text a")?.textContent
      );
      if (heartindex !== -1) {
        favcontainer.splice(heartindex, 1);
      }
      localStorage.setItem("wish", JSON.stringify(favcontainer));
      whishlist.innerHTML = wishcounter;
      localStorage.setItem("wishcounter", wishcounter);
    }
  });
});

testheart.forEach((heart) => {
  updateHeartState(heart);
  heart.addEventListener("click", () => {
    heart.classList.toggle("active");
    heartState = JSON.parse(localStorage.getItem("heartState")) || [];
    let wish = heart.parentNode;
    if (heart.classList.contains("active")) {
      localStorage.setItem(`heart-${heart.id}`, "1");
      if (!heartState.includes(`${heart.id}`)) {
        heartState.push(heart.id);
      }
      heart.style.cssText = "color:red";
      // Add to wishlist
      wishcounter++;
      whishlist.innerHTML = wishcounter;
      localStorage.setItem("wishcounter", wishcounter);
      let details = {
        favimg: wish.querySelector("img")?.src,
        favprice: wish.querySelector("p")?.textContent,
        favtype: wish.querySelector(".text small")?.textContent,
        favname: wish.querySelector(".text a")?.textContent,
        favid: wish.querySelector(".testheart").id,
      };
      favcontainer.push(details);
      localStorage.setItem("wish", JSON.stringify(favcontainer));
      localStorage.setItem("heartState", JSON.stringify(heartState));
    } else {
      localStorage.setItem(`heart-${heart.id}`, "0");
      heart.style.cssText = "color:black";
      // Remove from wishlist
      let stateIndex = heartState.indexOf(heart.id);
      heartState.splice(stateIndex, 1);
      localStorage.setItem("heartState", JSON.stringify(heartState));
      wishcounter--;
      if (wishcounter <= 0) {
        wishcounter = 0;
      }
      let heartindex = favcontainer.findIndex(
        (item) => item.favname === wish.querySelector(".text a")?.textContent
      );
      if (heartindex !== -1) {
        favcontainer.splice(heartindex, 1);
      }
      localStorage.setItem("wish", JSON.stringify(favcontainer));
      whishlist.innerHTML = wishcounter;
      localStorage.setItem("wishcounter", wishcounter);
    }
  });
});
