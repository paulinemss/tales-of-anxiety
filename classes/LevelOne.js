class LevelOne {
  constructor() {
    this.player = new Player(390, 130, 322, "level 1");
    this.myBackground = new Background();
    this.myEndPoint = new EndPoint();
    this.monster = new Monster(400, 322);
    this.darkness = new Darkness();
    this.textBox = new TextBox();
    this.userMessages = 0; 
    this.firstMsg = false; 
    this.secondMsg = false; 
    this.thirdMsg = false; 
    this.level = 1;
  }

  setup() {
    this.myBackground.setup();
    this.darkness.setup();
    this.textBox.setup();
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
    this.unfreeze();
    this.player.spawn(390, 130);
    this.monster.spawn(400, 322);
    this.monster.reset();
    this.darkness.reset();
    this.firstMsg = false; 
    this.secondMsg = false; 
    this.thirdMsg = false; 
    this.textBox.close();
  }

  draw() {
    this.myBackground.draw("level 1");
    this.myEndPoint.draw(500, 305);

    this.player.draw();

    this.monster.draw(this.darkness.subLevel);
    this.monster.move(this.player, 80, 450);

    this.darkness.draw();
    this.darkness.collisionCheck(this.darkness.torch1, this.player);
    this.darkness.collisionCheck(this.darkness.torch2, this.player);

    this.textBox.draw(this.player, this.monster);

    if (!this.firstMsg && !this.textBox.active) {
      this.textBox.open(
        ["...", "where are we?", "should we try to\n find a way out?"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.firstMsg = true;
        this.unfreeze();
      }
    }

    if (this.darkness.subLevel === 2 && !this.secondMsg && !this.textBox.active) {
      this.textBox.open(
        ["nice! let's get\n the second torch"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.secondMsg = true; 
        this.unfreeze();
      }
    }

    if (this.darkness.subLevel === 3 && !this.thirdMsg && !this.textBox.active) {
      this.textBox.open(
        ["what is that?", "monster: you should work\n instead of playing a\n game in your browser", "that's a bit harsh!", "monster: you are not productive\n enough and you should\n feel bad about that", "...", "let's run away"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.thirdMsg = true; 
        this.unfreeze();
      }
    }
    
    if (this.player.movement !== "dying") {
      if (keyIsDown(39)) {
        this.player.moveRight();
      } else if (keyIsDown(37)) {
        this.player.moveLeft();
      }
    }    
  }
}
