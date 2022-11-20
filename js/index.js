import { routerFunction } from "../src/router/index.js";

const url = "https://restcountries.com/v3.1/all";
const content = document.getElementById("root");

window.addEventListener("load", () => fetchData(url));

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  const view = data.map((item) => printView(item));
  content.innerHTML = view.join('');
}

//---------All Countries---------

function printView(item) {
  return `
    <div class="card">
          <div class="card-body">
          <a href="country.html?name=${item.name.common}"><img src="${item.flags.png}" alt="" /></a>
            <div class="card-description">
              <h2>${item.name.common}</h2>
              <p> Region: ${item.region}</p>
              <p> Capital: ${item.capital}</p>
              <p >Population: ${item.population}</p>
            </div>
          </div>
        </div>
    `;
}


//--------------Filtro de regiones-----------------

const homeButton = document.querySelector('.homeSelect');
  homeButton.addEventListener('click', () => fetchData(url));

const buttonsFilters = document.querySelectorAll('.textSelect');

const fetchByRegion = async (e) => {
  const res = await fetch(`https://restcountries.com/v3.1/region/${e}`);
  const data = await res.json();

  return data
};

  const makeSearch = async(region) => {
  const data = await fetchByRegion(region);
  const templates = data.map((element) => printView(element));
  content.innerHTML = templates.join('');
}

buttonsFilters.forEach((element) => {
  element.addEventListener('click', (e) => makeSearch(e.target.textContent));
});


const dropdownButton = document.getElementsByClassName('dropdownContainer')[0]
const filterLinks = document.getElementsByClassName('appSelect')[0]

dropdownButton.addEventListener('click', () => {
  filterLinks.classList.toggle('active');
});




//--------------Hashs--------------


const onLoadApp = () => {
  location.hash = "_home";
};

//On load app function
window.addEventListener("load", () => onLoadApp());

//Listener hash changer
window.addEventListener("hashchange", () => routerFunction(location.hash));
