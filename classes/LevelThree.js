class LevelThree {
  constructor() {
    this.myBackground = new Background();
    this.player = new Player(420, 64, 65, "level 3");
    this.monster1 = new Monster(470, 65);
    this.monster2 = new Monster(100, 178);
    this.monster3 = new Monster(470, 322);
    this.myEndPoint = new EndPoint();
  }

  setup() {
    this.myBackground.setup();
  }

  freeze() {
    this.player.freeze();
    this.monster1.freeze();
    this.monster2.freeze();
    this.monster3.freeze();
  }

  unfreeze() {
    this.player.unfreeze();
    this.monster1.unfreeze();
    this.monster2.unfreeze();
    this.monster3.unfreeze();
  }

  draw() {
    this.myBackground.draw("level 3");
    this.player.draw();
    this.myEndPoint.draw(50, 304);

    this.monster1.draw(3);
    this.monster2.draw(3);
    this.monster3.draw(3);

    this.monster1.move(this.player, 180, WIDTH - 105);
    this.monster2.move(this.player, 70, 420);
    this.monster3.move(this.player, 160, WIDTH - 80);

    if (keyIsDown(39)) {
      this.player.moveRight();
    } else if (keyIsDown(37)) {
      this.player.moveLeft();
    }
  }
}