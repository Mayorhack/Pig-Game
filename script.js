'use strict';
const elementSelector = function (query) {
  return document.querySelector(query);
};
let currentScore, finalScore1, finalScore2, playing;
const winner = 20;
const rollingDice = function () {
  if (playing) {
    const randomDigit = Math.trunc(Math.random() * 6) + 1;
    dice.src = `img/dice-${randomDigit}.png`;
    dice.classList.remove('hidden');
    if (randomDigit === 1) {
      currentScore = 0;
      holdNumber();
    } else {
      currentScore += randomDigit;
      player1.classList.contains('player--active')
        ? (currentScorePlayer1.textContent = currentScore)
        : (currentScorePlayer2.textContent = currentScore);
    }
  }
};
const toggle = function (player, finalScore, currentScorePlayer, alt) {
  if (finalScore >= winner) {
    player.classList.add('player--winner');
    playing = false;
    dice.classList.add('hidden');
  } else {
    player.classList.remove('player--active');
    alt.classList.add('player--active');
    currentScorePlayer.textContent = 0;
  }
};
const holdNumber = function () {
  if (playing) {
    if (player1.classList.contains('player--active')) {
      finalScore1 += currentScore;
      finalScorePlayer1.textContent = finalScore1;
      toggle(player1, finalScore1, currentScorePlayer1, player2);
    } else {
      finalScore2 += currentScore;
      finalScorePlayer2.textContent = finalScore2;
      toggle(player2, finalScore2, currentScorePlayer2, player1);
    }
  }
  currentScore = 0;
};
const resetAll = function () {
  currentScore = 0;
  finalScore1 = 0;
  finalScore2 = 0;
  dice.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner', 'player--active');
  player1.classList.add('player--active');
  document.querySelectorAll('.current-score').forEach(current => {
    current.textContent = currentScore;
  });
  document.querySelectorAll('.score').forEach(current => {
    current.textContent = 0;
  });
  playing = true;
};
const dice = elementSelector('.dice');
const diceRoll = elementSelector('.btn--roll').addEventListener(
  'click',
  rollingDice
);
const currentScorePlayer1 = elementSelector('#current--0');
const currentScorePlayer2 = elementSelector('#current--1');
const hold = elementSelector('.btn--hold').addEventListener(
  'click',
  holdNumber
);
const finalScorePlayer1 = elementSelector('#score--0');
const finalScorePlayer2 = elementSelector('#score--1');
const player1 = elementSelector('.player--0');
const player2 = elementSelector('.player--1');
const newGame = elementSelector('.btn--new').addEventListener(
  'click',
  resetAll
);
resetAll();
