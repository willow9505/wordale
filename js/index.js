const answer = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "Game over";
    div.style =
      "display: flex; justify-content: center; align-items:center; position:absolute; top:40vh; left:38vw; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterkey = () => {
    let correctNumber = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const insertedString = block.innerText;
      const answerString = answer[i];
      if (insertedString === answerString) {
        correctNumber += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(insertedString))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E ";
      block.style.color = "white";
    }
    if (correctNumber === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (keyCode <= 90 && keyCode >= 65) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const startTime = new Date();

    function setTime() {
      const nowTime = new Date();
      const usingTime = new Date(nowTime - startTime);
      const minutes = usingTime.getMinutes().toString();
      const seconds = usingTime.getSeconds().toString();
      const timeDiv = document.querySelector(".timer ");
      timeDiv.innerText = `${minutes.padStart(2, "0")}:${seconds.padStart(
        2,
        "0"
      )}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
