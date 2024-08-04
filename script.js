const container = document.querySelector('.container')
container.style.display = 'none'

const toggle = document.querySelector('.toggle')

let degreeTypeChanger = ''

async function fetchData() {
    const API_KEY = '5e747cca4ae351b0048405b67284b046'
    const city = document.querySelector('.search').value
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
    const data = await response.json();

    const cityName = data.name
    const country = data.sys.country
    let degree = parseInt(data.main.temp)
    const condition = data.weather[0].main

    let pic;

    switch (condition) {
        case 'Clouds':
            pic = 'images/cloudy.png';
            break;
        case 'Rain':
            pic = 'images/rainy.png';
            break;
        case 'Snow':
            pic = 'images/snowy.png';
            break;
        case 'Clear':
            pic = 'images/sunny.png';
            break;
        case 'Haze':
            pic = 'images/windy.png';
            break;
    }

    if (toggle.classList.contains('move')) {
        degreeTypeChanger = '°F';
        degree = (degree * 9/5) + 32;
        degree =  Math.round(degree);
    } else {
        degreeTypeChanger = '°C';
    }
    
    changeWeather(cityName,degree,pic,country);
}


function degreeType() {
    toggle.classList.toggle('move');
    let degreeElement = document.querySelector('.degree')
    let currentDegree = parseInt(degreeElement.textContent);


    if (toggle.classList.contains('move')) {
        degreeTypeChanger = '°F';
        currentDegree = (currentDegree * 9/5) + 32;
    } else {
        degreeTypeChanger = '°C';
        currentDegree = (currentDegree - 32) * 5/9; 
    }

    degreeElement.textContent = Math.round(currentDegree);
    document.querySelector('.degree-type').textContent = degreeTypeChanger;
}

function changeWeather(cityName,degree,pic,country) {
    container.style.display = 'block'
    
    container.innerHTML = `
    <div class="icon-container">
        <img class="picture" src=${pic}>
    </div>
    <div class="degree-container">
        <p class="degree">${degree}</p>
        <p class="degree-type">${degreeTypeChanger}</p>
    </div>
    <div class="location-container">
        <h1 class="location">${country}/${cityName}</h1>
    </div>
    `
}

function initEnter(e) {
    if(e.key === 'Enter') {
        fetchData();
    }
}



document.querySelector('.search').addEventListener('keydown',initEnter)
toggle.addEventListener('click',degreeType)
document.querySelector('.search-btn').addEventListener('click',fetchData);