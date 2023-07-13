"use strict";
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
let currentPlayer = 0;
let diceValue;
let currentScore = 0;

const changeCurentScore = function (playerNumber, currentScore) {
    document.querySelector(`#current--${playerNumber}`).textContent =
        currentScore;
};
const changeTotalScore = function (playerNumber, currentScore) {
    document.querySelector(`#score--${playerNumber}`).textContent =
        Number(document.querySelector(`#score--${playerNumber}`).textContent) +
        currentScore;
};
const switchPlayer = function () {
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--active");
};

const restartGame = function () {
    const scoreList = document.querySelectorAll(".score");
    const currentScoreList = document.querySelectorAll(".current-score");
    currentScore = 0;
    for (let i = 0; i < scoreList.length; i++) {
        scoreList[i].textContent = currentScore;
        currentScoreList[i].textContent = currentScore;
    }
    document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--winner");
    btnHold.disabled = false;
    btnRoll.disabled = false;
    currentPlayer === 1
        ? switchPlayer()
        : document
              .querySelector(`.player--${currentPlayer}`)
              .classList.add("player--active");
};
const roleTheDice = function () {
    diceValue = Math.floor(Math.random() * 6 + 1);
    document.querySelector(".dice").src = `dice-${diceValue}.png`;
    switch (diceValue) {
        case 1:
            currentScore = 0;
            changeCurentScore(currentPlayer, currentScore);
            switchPlayer();
            break;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            currentScore += diceValue;
            break;
    }
    changeCurentScore(currentPlayer, currentScore);
};
const holdTheScore = function () {
    changeTotalScore(currentPlayer, currentScore);
    if (
        Number(
            document.querySelector(`#score--${currentPlayer}`).textContent
        ) >= 100
    ) {
        document
            .querySelector(`.player--${currentPlayer}`)
            .classList.add("player--winner");
        document
            .querySelector(`.player--${currentPlayer}`)
            .classList.remove("player--active");
        document.querySelector(".dice").classList.add("hidden");
        btnHold.disabled = true;
        btnRoll.disabled = true;
    } else {
        currentScore = 0;
        changeCurentScore(currentPlayer, currentScore);
        switchPlayer();
    }
};

btnRoll.addEventListener("click", roleTheDice);
btnHold.addEventListener("click", holdTheScore);
btnNewGame.addEventListener("click", restartGame);
