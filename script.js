const body = document.querySelector('body');
const cryptoLabel = document.querySelector('.crypto-data')
const upperPart = document.querySelector('.upper-part');
const cryptoLeft = document.querySelector('.crypto-left');
const authorLabel = document.querySelector('.author-label');
const cryptoPrice = document.querySelector('.crypto-price');

async function getFetch() {
        const getBackgroundImage = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature');
        const resolve = await getBackgroundImage.json();
        body.style.backgroundImage = `url('${resolve.urls.regular}')`;
        authorLabel.textContent = `${resolve.user.name}`;

        const getCryptoName = await fetch('https://api.coingecko.com/api/v3/coins/dogecoin');
        const resolveName = await getCryptoName.json();
        cryptoLabel.textContent = resolveName.name;
        const coinImg = document.createElement('img');
        cryptoLeft.prepend(coinImg, cryptoLabel);
        coinImg.setAttribute('src', `${resolveName.image.small}`);
        coinImg.style.width = '40px';
        coinImg.style.objectFit = 'contain';
        cryptoPrice.textContent = `${resolveName.market_data.current_price.usd}`

}

getFetch();