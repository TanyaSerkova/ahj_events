import Game from "./game";

class Start {
  static init() {
    this.game = new Game("#field");
    this.game.startGame();
  }
}

export default Start;