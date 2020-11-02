class Game {
  constructor() {
    this.player = new Player();
    this.myBackground = new Background();
    this.myEndPoint = new EndPoint();
    this.monster = new Monster();
    this.darkness = new Darkness();
    this.textBox = new TextBox();
    this.userMessages = 0; 
    this.firstMsg = false; 
    this.secondMsg = false; 
    this.thirdMsg = false; 
    this.fourthMsg = false; 
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
    this.player.unfreeze();
    this.monster.unfreeze();
    this.monster.reset();
    this.darkness.reset();
    this.firstMsg = false; 
    this.secondMsg = false; 
    this.thirdMsg = false; 
    this.fourthMsg = false; 
    this.textBox.close();
  }

  draw() {
    this.myBackground.draw();
    this.myEndPoint.draw();

    this.player.draw(this.darkness.subLevel);

    this.monster.draw(this.darkness.subLevel);
    this.monster.move(this.player);

    this.darkness.draw();
    this.darkness.collisionCheck(this.darkness.torch1, this.player);
    this.darkness.collisionCheck(this.darkness.torch2, this.player);

    this.textBox.draw();

    if (!this.firstMsg && !this.textBox.active) {
      this.textBox.open(
        ["...", "where are we?", "should we try to find a way out?"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.firstMsg = true;
        this.unfreeze();
      }
    }

    if (this.darkness.subLevel === 2 && !this.secondMsg && !this.textBox.active) {
      this.textBox.open(
        ["nice! let's get the second torch"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.secondMsg = true; 
        this.unfreeze();
      }
    }

    if (this.darkness.subLevel === 3 && !this.thirdMsg && !this.textBox.active) {
      this.textBox.open(
        ["what is this monster?"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.thirdMsg = true; 
        this.unfreeze();
      }

      setTimeout(() => {
        this.textBox.open(
          ["that's a bit harsh!", "let's run away from it"]
        );
        this.freeze();
        this.textBox.onClose = () => {
          this.userMessages === 3; 
          this.unfreeze();
        }
      }, 6000);
    }
    
    if (keyIsDown(39)) {
      this.player.moveRight();
    } else if (keyIsDown(37)) {
      this.player.moveLeft();
    }
  }
}
