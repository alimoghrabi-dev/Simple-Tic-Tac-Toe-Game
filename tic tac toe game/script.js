const cells = document.querySelectorAll(".key");
const statusText = document.querySelector("#text-status");
const restart = document.getElementById("restart");

const winConidtions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let running = false;

startGame();

function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restart.addEventListener("click", restartGame);
  running = true;
  statusText.textContent = `${player}'s Turn`;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  winCheck();
}

function updateCell(cell, index) {
  options[index] = player;
  cell.innerHTML = player;
}

function changePlayer() {
  player = player == "X" ? "O" : "X";
  statusText.innerText = `${player}'s Turn`;
}

function winCheck() {
  let roundWon = false;

  for (let i = 0; i < winConidtions.length; i++) {
    const condition = winConidtions[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellB == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.innerHTML = `${player} Wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw!";
  } else {
    changePlayer();
  }
}

function restartGame() {
  player = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${player}' turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
