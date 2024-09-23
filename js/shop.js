window.onload = function () {
  getdata();
};

async function getdata() {
  let data = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
    method: "GET",
  });
  let finalres = await data.json();
  let finalresData = finalres.data;
  console.log(finalresData);
  display(finalresData);
}

function display(finalresData) {
  let pros = "";
  for (let i = 0; i < finalresData.length; i++) {
    pros += `<div class="item position-relative col-6 col-md-4 col-lg-3 px-0 pt-3 d-flex align-items-center flex-column border-2 border-end" id="1">
                <div class="img">
                    <img src="${finalresData[i].imageCover}" alt="" class = "w-100"/>
                </div>
                <div class="text my-3 d-flex flex-column gap-1 align-items-center px-2">
                    <small>$ ${finalresData[i].price}</small>
                    <small>${finalresData[i].title}</small>
                    <strong class="text-center">${finalresData[i].brand.name}</strong>
                </div>
                <span>-25$%</span>
                <button class="w-100 testbutton" id="button1">Add Cart</button>
                <div class="heart heartbutton" id="heart15">
                    <i class="fa-solid fa-heart"></i>
                </div>
              </div>`;
  }
  document.querySelector(".feature").innerHTML = pros;
}
