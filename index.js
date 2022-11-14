import { routerFunction } from "./src/router/index.js";

const url = "https://restcountries.com/v3.1/all";

const content = document.getElementById("root");

window.addEventListener("load", () => fetchData(url));

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  const view = data.map((item) => printView(item));
  content.innerHTML = view.join('');
}

function printView(item) {
  return `
    <div class="card">
          <div class="card-body">
            <img src="${item.flags.png}" alt="" />
            <div class="card-description">
              <h2 class="country-name">${item.name.common}</h2>
              <p class="country-region">${item.region}</p>
            </div>
          </div>
        </div>
    `;
}

const onLoadApp = () => {
  location.hash = "_home";
};

//On load app function
window.addEventListener("load", () => onLoadApp());

//Listener hash changer
window.addEventListener("hashchange", () => routerFunction(location.hash));
