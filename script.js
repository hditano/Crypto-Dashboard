const body = document.querySelector('body');
const cryptoLabel = document.querySelector('.crypto-data')
const authorLabel = document.querySelector('.author-label');
const cryptoPrice = document.querySelector('.crypto-price');
const cryptoUpperPart = document.querySelector('.crypto-upper-part');
const menuDropdown = document.querySelector('.menu-dropdown');
const itemsDropdown = document.querySelector('.items-dropdown');
const timeLabel = document.querySelector('.time-label');

async function getFetch() {
    const getBackgroundImage = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature');
    const resolve = await getBackgroundImage.json();
    body.style.backgroundImage = `url('${resolve.urls.regular}')`;
    authorLabel.textContent = `Author: ${resolve.user.name}`;

    const getCryptoName = await fetch('https://api.coingecko.com/api/v3/coins/dogecoin');
    const resolveName = await getCryptoName.json();
    cryptoLabel.textContent = resolveName.name;
    const coinImg = document.createElement('img');
    cryptoUpperPart.prepend(coinImg, cryptoLabel);
    coinImg.setAttribute('src', `${resolveName.image.small}`);
    coinImg.style.width = '40px';
    coinImg.style.objectFit = 'contain';
    cryptoPrice.textContent = `${resolveName.market_data.current_price.usd} USD`;

}

getFetch();
getDay();

// Dropdown menu
// TODO

function getDay() {

    let date = new Date();
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let getDay = days[date.getDay()];
    timeLabel.textContent = `${getDay} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} -  ${date.getFullYear()}`;

}


getDay();
setInterval(getDay, 100);