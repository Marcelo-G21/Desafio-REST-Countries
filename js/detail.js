const root = document.getElementById('root');

const query = new URLSearchParams(window.location.search);
const params = query.get('name');
const url = "https://restcountries.com/v3.1/all";

document.addEventListener("DOMContentLoaded", e => {
    fetchData();
});

const fetchData = async () => {
    try{
        const response = await fetch(url);
        const data = await response.json();
      
        const filterData = data.filter(item => item.name.common === params);
      
        console.log(filterData)
        countryDetail(filterData);
    }catch (error){
        console.log(error);
    }
  
}

const countryDetail = data => {
    let elements = ''

    function isObj(obj){
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    function getValues(obj){
        if (obj === undefined){
            return 'Undefined'
        }
        return Object.values(obj).join(', ');
    }

    

    data.forEach(item => {
        elements += `
        <div class="card">
          <div class="card-body">
          <img class="flag" src="${item.flags.png}" alt="" />
          <img class="coat-of-arms" src="${item.coatOfArms.png}" alt="" />
            <div class="card-description">
              <h2>${item.name.common}</h2>
              <p>Official name: ${item.name.official}</p>
              <p>Region: ${item.region}</p>
              <p>Capital: ${item.capital}</p>
              <p>Languages: ${getValues(item.languages)}</p>
              <p>Population: ${item.population}</p>
              <p>Time Zone: ${getValues(item.timezones)}</p>
              <p>Borders: ${getValues(item.borders)}</p>
            </div>
          </div>
        </div>
        `
    });
    root.innerHTML = elements;
}