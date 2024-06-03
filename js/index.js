function appStart() {
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(".board-column[data-index='00']");
    // console.log(event);
    // thisBlock.innerText = key;
    if (keyCode <= 90) {
      thisBlock.innerText = key;
    }
  };
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
s;
