document.getElementById('card1').addEventListener('input', function() {
    fetchCardInfo(this.value, 'card1Info');
});

document.getElementById('card2').addEventListener('input', function() {
    fetchCardInfo(this.value, 'card2Info');
});

function fetchCardInfo(cardName, elementId) {
    fetch(`https://api.hearthstonejson.com/v1/latest/enUS/cards/${cardName}.json`)
        .then(response => response.json())
        .then(data => {
            const card = data[0];
            const cardInfo = document.getElementById(elementId);
            cardInfo.innerHTML = `
                <img src="${card.img}" alt="${card.name}">
                <h2>${card.name}</h2>
                <p>${card.set}</p>
                <p>${card.year}</p>
            `;
            if (card.year < getOtherCardYear(elementId)) {
                cardInfo.classList.add('old');
            } else {
                cardInfo.classList.remove('old');
            }
        })
        .catch(error => console.error('Error:', error));
}

function getOtherCardYear(elementId) {
    return elementId === 'card1Info' ? document.getElementById('card2Info').querySelector('p').textContent : document.getElementById('card1Info').querySelector('p').textContent;
}
