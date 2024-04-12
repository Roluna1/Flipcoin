let betPrice = [{
  bet: 'betPrice1',
  price: 1
},{
  bet: 'betPrice5',
  price: 5
},{
  bet: 'betPrice10',
  price: 10
},{
  bet: 'betPrice50',
  price: 50
},{
  bet: 'betPrice100',
  price: 100
},{
  bet: 'betPrice500',
  price: 500
}]
let cash = {
  money: 0
};
cash.money = 500
let allTotalsBet = 0;
let betButtons = '';
let heads = 0;
let tails = 0;
betPrice.forEach((betButtonPrice) => {
  betButtons += `
  <button class="bet-button betButton" data-button-price="${betButtonPrice.bet}">Bet <br> ₱${betButtonPrice.price}</button>
  `;
});
const moneyStats = document.querySelector('.money-stats');
const betStats = document.querySelector('.bet-stats');
const resultHTML = document.querySelector('.js-result');
document.querySelector('.bet-button-content').innerHTML = betButtons;
document.querySelectorAll('.bet-button').forEach((button) => {
  button.addEventListener('click', () => {
    const betPriceButton = button.dataset.buttonPrice;
    totalBets(betPriceButton)
  });
});
const pickHeads = document.querySelector('.js-pick-heads');
const pickTails = document.querySelector('.js-pick-tails');
let coin = document.querySelector('.coin');
let resetBtn = document.querySelector('#reset-button');
let result = '';
let buttonPrice = betPrice.price
let betPriceBet = betPrice.bet
pickHeads.addEventListener('click', () => {
  playGame('heads')
});
pickTails.addEventListener('click', () => {
  playGame('tails');
});
function playGame(playerPick) {
  if (allTotalsBet === 0) {
    alert('Please add some bet');
  } else {
    let headsWin = Math.floor(Math.random() * 2);
    coin.style.animation = 'none';
    if (headsWin) {
      setTimeout(() => {
        coin.style.animation = "spin-heads 3s forwards";
      }, 100);
      heads++;
      result = 'heads';
    } else {
      setTimeout(() => {
        coin.style.animation = "spin-tails 3s forwards";
      }, 100);
      tails++;
      result = 'tails';
    }
    setTimeout(() => {
      let playerResult = '';
      if (playerPick === 'heads') {
        if (result === 'heads') {
          playerResult = 'You win';
          let betsPlaced = allTotalsBet;
          cash.money += betsPlaced * 2;
          allTotalsBet = 0;
        } else {
          playerResult = 'You lose';
          allTotalsBet = 0;
        }
        console.log(playerResult);
      }
      if (playerPick === 'tails') {
        if (result === 'tails') {
          playerResult = 'You win';
          let betsPlaced = allTotalsBet;
          cash.money += betsPlaced * 2;
          allTotalsBet = 0;
        } else {
          playerResult = 'You lose';
          allTotalsBet = 0;
        }
        console.log(playerResult);
      }
      resultHTML.textContent = playerResult;
      updateStats();
    }, 3000);
    disableButton();
  }
}
function totalBets(betPriceBet) {
  betPrice.forEach((bet) => {
    if (bet.bet === betPriceBet) {
      if (cash.money >= bet.price) {
        allTotalsBet += bet.price;
        cash.money -= bet.price; 
        
        console.log(`Bet added = ${bet.price}`)
      } else {
        console.log("Insufficient funds.");
      }
    }
    moneyStats.textContent = `Money: ₱${cash.money}`
    betStats.textContent = `Total Bets: ₱${allTotalsBet}`
  });
  console.log(`Total bets: ${allTotalsBet}`);
}
function updateStats() {
  const totalFlips = heads + tails;
  const headPercent = totalFlips === 0 ? 0 : (heads / totalFlips) * 100;
  const tailPercent = totalFlips === 0 ? 0 : (tails / totalFlips) * 100;
  document.querySelector('.head-count').textContent = `Heads: ${headPercent.toFixed(1)}%`;
  document.querySelector('.tail-count').textContent = `Tails: ${tailPercent.toFixed(1)}%`;
  moneyStats.textContent = `Money: ₱${cash.money}`
  betStats.textContent = `Total Bets: ₱${allTotalsBet}`
}
function disableButton() {
  pickHeads.disabled = true;
  pickTails.disabled = true;
  setTimeout(() => {
    pickHeads.disabled = false;
    pickTails.disabled = false;
  }, 3000);
}
updateStats()
