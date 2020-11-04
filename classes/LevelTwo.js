class LevelTwo {
  constructor() {
    this.myBackground = new Background();
    this.myEndPoint = new EndPoint();
    this.monster = new Monster(374, 370);
    this.player = new Player(100, 226, 226, "level 2");
    this.firstMsg = false; 
    this.textBox = new TextBox();
    this.platform1 = new Platform(200, 208, 1);
    this.platform2 = new Platform(331, 176, 1);
    this.spike = new Spikes(270, 180, 1.5);
  }

  setup() {
    this.myBackground.setup();
  }

  freeze() {
    this.player.freeze();
    this.monster.freeze();
  }

  unfreeze() {
    this.player.unfreeze();
    this.monster.unfreeze();
  }

  reset() {
    this.player.spawn(100, 200);
    this.monster.spawn(374, 370);
    this.player.unfreeze();
    this.monster.unfreeze();
    this.monster.reset();
    this.textBox.close();
  }

  playerCollidesWithElement(element) {
    return this.player.x >= element.x && this.player.x <= element.x + element.width; 
  }

  draw() {
    this.myBackground.draw("level 2");
    this.myEndPoint.draw(480, 129);

    this.platform1.draw();
    this.platform2.draw();
    this.spike.draw();

    if (!this.firstMsg) {
      this.monster.draw();
    } else {
      this.monster.draw(3);
    }
    
    this.monster.move(this.player, 220, 370);
    this.player.draw();

    this.textBox.draw(this.player, this.monster);

    if (this.playerCollidesWithElement(this.platform1)) {
      this.player.usePlatform(this.platform1);
    } else if (this.playerCollidesWithElement(this.platform2)) {
      this.player.usePlatform(this.platform2);
    } else if (this.player.isOnPlatform) {
      this.player.leavePlatform();
    }

    if (!this.firstMsg && !this.textBox.active) {
      this.textBox.open(
        ["it was close!", "there's another anxiety\n monster here!"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.firstMsg = true;
        this.unfreeze();
      }
    }

    if (keyIsDown(39)) {
      this.player.moveRight();
    } else if (keyIsDown(37)) {
      this.player.moveLeft();
    }
  }
}