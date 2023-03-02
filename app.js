const API = "https://msshohruh.github.io/menu-api/data.json";
const allBtn = document.querySelector("#all-btn");
const breakfastBtn = document.querySelector("#breakfast-btn");
const lunchBtn = document.querySelector("#lunch-btn");
const shakesBtn = document.querySelector("#shakes-btn");
const conatiner = document.querySelector(".section-center");
const loader = document.querySelector(".loader");
console.log(loader);
// function fetch
let mainData;
AOS.init();
const fetApi = async (url) => {
  try {
    const request = await fetch(url);
    const data = await request.json();
    loader.style.display = "none";
    mainData = data.menu;
    return [...data.menu];
  } catch (error) {
    console.log(error.message);
  }
};

//
fetApi(API).then((data) => {
  createMenu(data);
});

function createMenu(recipes) {
  conatiner.innerHTML = "";
  recipes.forEach((recipe) => {
    const { title, price, img, desc } = recipe;
    const div = document.createElement("article");
    div.classList.add("menu-item");
    div.setAttribute("data-aos", "zoom-in");
    div.innerHTML = `
    <img src=${img} alt=${title} class="photo" />
    <div class="item-info">
        <header>
            <h4>${title}</h4>
            <h4 class="price">$${price}</h4>
        </header>
        <p class="item-text">
            ${desc}
        </p>
    </div>
`;
    conatiner.appendChild(div);
  });
}

breakfastBtn.addEventListener("click", () => {
  filterData("breakfast");
});

lunchBtn.addEventListener("click", () => {
  filterData("lunch");
});

shakesBtn.addEventListener("click", () => {
  filterData("shakes");
});

allBtn.addEventListener("click", () => {
  filterData("all");
});

function filterData(param) {
  if (param === "all") {
    createMenu(mainData);
  } else {
    const newData = mainData.filter((item) => {
      return item.category == param;
    });
    createMenu(newData);
  }
}
