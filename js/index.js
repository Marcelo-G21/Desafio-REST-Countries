const url = "https://restcountries.com/v3.1/all";

document.addEventListener("DOMContentLoaded", (e) => {
  fetchData();
});

const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    cards(data);
    clientForm(data);
  } catch (error) {
    console.log(error);
  }
};
const cards = (data) => {
  let elements = "";
  data.forEach((item) => {
    elements += `
<div class="card">
        <div class="card-body">
        <a class="country-name" href="country.html?name=${item.name.common}"><img src="${item.flags.png}" alt="" /></a>
          <div class="card-description">
            <h2>${item.name.common}</h2>
            <p> Region: ${item.region}</p>
            <p> Capital: ${item.capital}</p>
            <p >Population: ${item.population}</p>
          </div>
        </div>
      </div>
      `;
  });
  root.innerHTML = elements;
};

//--------------Filtro de regiones-----------------

const homeButton = document.querySelector(".homeSelect");
homeButton.addEventListener("click", () => fetchData(url));

const buttonsFilters = document.querySelectorAll(".textSelect");

  buttonsFilters.forEach((element) => {
    
    element.addEventListener('click', () => fetchByRegion(element.value));
  });

  const fetchByRegion = async (element) => {
    const res = await fetch(url);
    const data = await res.json();

    const filterData = data.filter(
      (item) => item.region === element
    );
    cards(filterData);
  };


  const dropdownButton = document.getElementsByClassName('dropdownContainer')[0]
  const filterLinks = document.getElementsByClassName('appSelect')[0]
  
  dropdownButton.addEventListener('click', () => {
    filterLinks.classList.toggle('active');
  });
  

//--------------Search------------

const form = document.getElementById("form");
const searchInput = document.getElementById("search-input");

const clientForm = (data) => {
  form.addEventListener("keyup", (e) => {
    e.preventDefault();
    const clientInput = searchInput.value.toLowerCase();
    const arrayFilter = data.filter((item) => {
      const countryName = item.name.common.toLowerCase();
      if (countryName.indexOf(clientInput) !== -1) {
        return item;
      }
    });
    cards(arrayFilter);
  });
};

