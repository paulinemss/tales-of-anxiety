class Game {
  constructor() {
    this.player = new Player();
    this.myBackground = new Background();
    this.myEndPoint = new EndPoint();
    this.monster = new Monster();
    this.darkness = new Darkness();
    this.textBox = new TextBox();
    this.hasSeenIntro = false; 
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
    this.darkness.reset();
  }

  draw() {
    this.myBackground.draw();
    this.myEndPoint.draw();

    this.player.draw(this.darkness.level);

    this.monster.draw(this.darkness.level);
    this.monster.move(this.player);

    this.darkness.draw();
    this.darkness.collisionCheck(this.darkness.torch1, this.player);
    this.darkness.collisionCheck(this.darkness.torch2, this.player);

    this.textBox.draw();

    if (!this.hasSeenIntroduction && !this.textBox.active) {
      this.textBox.open(
        ["...", "where are we?", "should we try to find a way out?"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.hasSeenIntroduction = true;
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
