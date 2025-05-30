export default class Game {
  constructor(fieldSelector) {
    this.field = document.querySelector(fieldSelector);
    this.cells = [];
    this.goblinImgSrc = require("../img/goblin.png");
    this.hits = 0;
    this.misses = 0;
    this.maxMisses = 5;
    this.initField();
    this.attachCursor();
  }

  initField() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      this.field.append(cell);
      this.cells.push(cell);
    }
  }

  attachCursor() {
    this.cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.firstChild && cell.firstChild.classList.contains("goblin")) {
          this.updateScore(true, cell);
          cell.firstChild.remove();
        } else {
          this.updateScore(false);
        }
      });
    });
  }

  clearGame() {
    if (this.misses >= this.maxMisses) {
      alert("Игра окончена!");
      clearInterval(this.intervalId);

      this.hits = 0;
      this.misses = 0;

      document.querySelector(".score_hit").textContent = this.hits;
      document.querySelector(".score_miss").textContent = this.misses;
      
    window.location.reload();
    }
  }

  updateScore(hit = null) {
    if (hit) {
      this.hits++;
      document.querySelector(".score_hit").textContent = this.hits;
    } else {
      this.misses++;
      document.querySelector(".score_miss").textContent = this.misses;

      this.clearGame();
    }
  }

  startGame() {
    const goblin = document.createElement("img");
    goblin.setAttribute = ("alt", "");
    goblin.src = this.goblinImgSrc;
    goblin.classList.add("goblin");
    let previousCellIndex = Math.floor(Math.random() * this.cells.length);
    let currentCell = this.cells[previousCellIndex];
    currentCell.append(goblin);

    this.intervalId = setInterval(() => {
      goblin.classList.add("hidden");

      let randomCellIndex;
      do {
        randomCellIndex = Math.floor(Math.random() * this.cells.length);
      } while (randomCellIndex === previousCellIndex);

      previousCellIndex = randomCellIndex;
      currentCell = this.cells[randomCellIndex];

      currentCell.append(goblin);
      goblin.classList.remove("hidden");

      goblin.addEventListener("click", () => {
        goblin.classList.add("clicked");
      });
      if (!goblin.classList.contains("clicked")) {
        this.misses++;
        document.querySelector(".score_miss").textContent = this.misses;
        this.clearGame();
      }
      goblin.classList.remove("clicked");
    }, 1000);
  }
}
