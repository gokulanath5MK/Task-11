const apiKey = "YOUR_API_KEY";

const loadCountryAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then((res) => res.json())
        .then((data) => displayCountries(data));
};

const displayCountries = (countries) => {
    const countriesHTML = countries.map((country) => getCountry(country));
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML.join(' ');
    addWeatherButtonListeners();
};

const addWeatherButtonListeners = () => {
    const weatherButtons = document.querySelectorAll('.btn.btn-primary');
    weatherButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const countryName = button.getAttribute('data-country');
            fetchWeatherData(countryName, index + 1);
        });
    });
};

const fetchWeatherData = (countryName, cardNumber) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
};

const getCountry = (country) => {
    return `
        <div class="country-div">
            <h2>${country.name.common}</h2>
            <img src="${country.flags.png}">
            <hr>
            <h4>Capital: ${country.capital}</h4>
            <h4>Latlng: ${country.latlng.join(', ')}</h4>
            <h4>Region: ${country.region}</h4>
            <h4>Country Code: ${country.cca2}</h4>
            <button class="btn btn-primary" data-country="${country.name.common}">Click for Weather</button>
        </div>
    `;
};

loadCountryAPI();