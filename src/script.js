function generateRandomValue() {
  const randonColorValue = Math.round(Math.random() * 255);

  return randonColorValue;
}

function paintTheBalls() {
  const ballsNodeList = document.querySelectorAll(".ball");

  ballsNodeList.forEach((ball) => {
    ball.style.backgroundColor = `rgb(${generateRandomValue()}, ${generateRandomValue()}, ${generateRandomValue()})`;
  });
}

function setTheCurrentColor() {
  const ballsNodeList = document.querySelectorAll(".ball");
  const randomBallIndex = Math.floor(Math.random() * ballsNodeList.length);
  const currentColorTextElement = document.querySelector("#rgb-color");

  currentColorTextElement.innerText =
    ballsNodeList[randomBallIndex].style.backgroundColor;
}

function listenToResetGameButton() {
  const resetGameButton = document.querySelector("#reset-game");
  const answerText = document.querySelector("#answer");
  const scoreSpan = document.querySelector("#score");

  resetGameButton.addEventListener("click", () => {
    paintTheBalls();
    setTheCurrentColor();

    answerText.innerText = "Escolha uma cor";
    scoreSpan.innerText = "0";
  });
}

function saveHighestScore() {
  const highestScoreSpan = document.querySelector("#highest-score");

  if (!localStorage.highestScore) {
    localStorage.setItem("highestScore", "0");
  }

  localStorage.setItem("highestScore", highestScoreSpan.innerText);
}

function updateHighestScore() {
  const highestScoreSpan = document.querySelector("#highest-score");
  const scoreSpan = document.querySelector("#score");

  if (parseInt(scoreSpan.innerText) > parseInt(highestScoreSpan.innerText)) {
    highestScoreSpan.innerText = scoreSpan.innerText;

    saveHighestScore();
  }
}

function listenToBallsSection() {
  const ballsSection = document.querySelector(".balls");
  const currentColorTextElement = document.querySelector("#rgb-color");
  const scoreSpan = document.querySelector("#score");
  const answerText = document.querySelector("#answer");

  ballsSection.addEventListener("click", (event) => {
    if (event.target.className === "ball") {
      if (
        event.target.style.backgroundColor === currentColorTextElement.innerText
      ) {
        scoreSpan.innerText = parseInt(scoreSpan.innerText) + 3;
        answerText.innerText = "Acertou!";

        paintTheBalls();
        setTheCurrentColor();
        updateCurrentHighestScore()
        updateHighestScore();
      } else {
        if (parseInt(scoreSpan.innerText) !== 0) {
          scoreSpan.innerText = parseInt(scoreSpan.innerText) - 1;
        }

        answerText.innerText = "Errou! Tente novamente!";

        // paintTheBalls();
        // setTheCurrentColor();
      }
    }
  });
}

function loadHighestScore() {
  const highestScoreSpan = document.querySelector("#highest-score");
  const highestScoreStorage = localStorage.getItem("highestScore");

  highestScoreSpan.innerText = highestScoreStorage;
}

function updateCurrentHighestScore() {
  const currentHighestScoreSpan = document.querySelector("#current-highest");
  const scoreSpan = document.querySelector("#score");

  if (parseInt(scoreSpan.innerText) > parseInt(currentHighestScoreSpan.innerText)) {
    currentHighestScoreSpan.innerText = scoreSpan.innerText;
  }
}

function createLine() {
  const line = document.createElement('div')

  line.className = 'line'

  for (let i = 0; i < 6; i++) {
    const ball = document.createElement('div')

    ball.className = 'ball'
    line.appendChild(ball)
  }

  return line
}

function clearBallsSection() {
  const ballsSection = document.querySelector('.balls')
  const linesNodeList = document.querySelectorAll('.balls .line')

  linesNodeList.forEach((line) => {
    ballsSection.removeChild(line)
  })
}

function listenToChangeLevelButton() {
  const changeLevelButton = document.querySelector('#change-level')
  const ballsSection = document.querySelector('.balls')

  changeLevelButton.addEventListener('click', () => {
    const linesNodeList = document.querySelectorAll('.balls .line')

    if (linesNodeList.length === 3) {
      clearBallsSection()

      ballsSection.appendChild(createLine())

      paintTheBalls()
    } else {
      ballsSection.appendChild(createLine())

      paintTheBalls()
    }

    setTheCurrentColor()
  })
}

window.onload = () => {
  loadHighestScore();
  paintTheBalls();
  listenToResetGameButton();
  setTheCurrentColor();
  listenToBallsSection();
  listenToChangeLevelButton();
};
