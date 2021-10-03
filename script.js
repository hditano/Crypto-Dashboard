//DOM Elements
const body = document.querySelector('body');
const cryptoLabel = document.querySelector('.crypto-data')
const authorLabel = document.querySelector('.author-label');
const cryptoPrice = document.querySelector('.crypto-price');
const cryptoUpperPart = document.querySelector('.crypto-upper-part');
const timeLabel = document.querySelector('.time-label');
const weatherTab = document.querySelector('.weather-tab');
const optionsLabel = document.querySelector('.options-label');
const modalWindow = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const coinMenu = document.querySelector('.coin-menu');

// API URL
const iconURL = 'http://openweathermap.org/img/wn/'

//Global Variables
const coinArray = ['bitcoin', 'ethereum', 'cardano', 'litecoin', 'tether', 'solana', 'uniswap', 'polkadot', 'terra-luna', 'polygon', 'stellar', 'axie-infinity']
let coinChosen = 'bitcoin';

async function getFetch() {
    cryptoUpperPart.innerHTML = '';
    cryptoPrice.innerHTML = '';

    try {
        const getBackgroundImage = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature');
        const resolve = await getBackgroundImage.json();
        body.style.backgroundImage = `url('${resolve.urls.regular}')`;
        body.style.textShadow = '0px 0px 20px #242424';
        authorLabel.textContent = `Author: ${resolve.user.name}`;
    
        const getCryptoName = await fetch(`https://api.coingecko.com/api/v3/coins/${coinChosen}`);
        const resolveName = await getCryptoName.json();
        cryptoLabel.textContent = resolveName.name;
        const coinImg = document.createElement('img');
        cryptoUpperPart.prepend(coinImg, cryptoLabel);
        coinImg.setAttribute('src', `${resolveName.image.small}`);
        coinImg.style.width = '40px';
        coinImg.style.objectFit = 'contain';
        cryptoPrice.textContent = `${resolveName.market_data.current_price.usd} USD`;
    } catch (error) {
        console.error(`Error logged: ${error}`);
    }

}

getFetch();
getGeo();
setInterval(getDay, 1000);

// Dropdown menu
// TODO

function getDay() {

    let date = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let getDay = days[date.getDay()];
    timeLabel.textContent = `${getDay} ${date.toLocaleTimeString('en-US')}`;

}

function getGeo() {


    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
            .then(resp => resp.json())
            .then(resol =>
                weatherTab.innerHTML = `<div class="flex items-center m-0 pr-2 w-full justify-end">
                                        <img src="${iconURL}${resol.weather[0].icon}.png" class="w-20">
                                        <p class="weather-data">${Math.floor(resol.main.temp)}º</p>
                                        </div>
                                        <p class="py-0 text-left">${resol.name}</p>`)
            .catch(err => weatherData.textContent = `Weather Data not available`)
    });
}


optionsLabel.addEventListener('click', () => {
    modalWindow.style.display = 'block';
    coinMenu.innerHTML = '';
    for(let i = 0; i < coinArray.length; i++) {
        let opt = coinArray[i];
        let el = document.createElement('option');
        el.textContent = opt;
        el.value = opt;
        coinMenu.appendChild(el);
    }

})

coinMenu.onchange = function () {
    coinChosen =  coinMenu.value;
    getFetch();
}

closeModal.addEventListener('click', () => {
    console.log('clicked');
    modalWindow.style.display = 'none';
})