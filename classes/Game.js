class Game {
  constructor() {
    this.player = new Player();
    this.myBackground = new Background();
    this.myEndPoint = new EndPoint();
    this.monster = new Monster();
  }

  setup() {
    this.myBackground.setup();
  }

  draw() {
    this.myBackground.draw();
    this.myEndPoint.draw();
    this.player.draw();

    this.monster.draw();
    this.monster.move(this.player);

    if (keyIsDown(39)) {
      this.player.moveRight();
    } else if (keyIsDown(37)) {
      this.player.moveLeft();
    }
  }
}
