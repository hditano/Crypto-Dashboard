const body = document.querySelector('body');
const cryptoLabel = document.querySelector('.crypto-data')
const upperPart = document.querySelector('.upper-part');

async function getFetch() {
    const getBackgroundImage = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature');
    const resolve = await getBackgroundImage.json();
    body.style.backgroundImage = `url('${resolve.urls.regular}')`;

    const getCryptoName = await fetch('https://api.coingecko.com/api/v3/coins/dogecoin');
    const resolveName = await getCryptoName.json();
    cryptoLabel.textContent = resolveName.name;
    const coinImg = document.createElement('img');
    upperPart.prepend(coinImg, cryptoLabel);
    coinImg.setAttribute('src', `${resolveName.image.thumb}`);
    
    
}

getFetch();