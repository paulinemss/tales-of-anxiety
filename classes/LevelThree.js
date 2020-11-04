class LevelThree {
  constructor() {
    this.myBackground = new Background();
    this.player = new Player(420, 64, 65, "level 3");
    this.monster1 = new Monster(100, 178);
    this.monster2 = new Monster(470, 322);
    this.changedMonster1 = new ChangedMonster(
      this.monster1.x, 
      this.monster1.y, 
      this.monster1.direction
    );
    this.changedMonster2 = new ChangedMonster(
      this.monster2.x,
      this.monster2.y,
      this.monster2.direction
    );
    this.myEndPoint = new EndPoint();
    this.firstMsg = false; 
    this.winningMsg = false; 
    this.winning = false; 
    this.textBox = new TextBox();
  }

  setup() {
    this.myBackground.setup();
  }

  freeze() {
    this.player.freeze();
    this.monster1.freeze();
    this.monster2.freeze();
  }

  unfreeze() {
    this.player.unfreeze();
    this.monster1.unfreeze();
    this.monster2.unfreeze();
  }

  reset() {
    this.player.spawn(420, 64);
    this.monster1.spawn(100, 178);
    this.monster2.spawn(470, 322);
    this.unfreeze();
    this.monster1.reset();
    this.monster2.reset();
    this.firstMsg = false; 
    this.winningMsg = false; 
    this.winning = false; 
  }

  draw() {
    this.myBackground.draw("level 3");
    this.myEndPoint.draw(50, 304);
    this.player.draw();

    this.textBox.draw(this.player, this.monster1);

    if (!this.firstMsg && !this.winningMsg) {
      this.monster1.draw();
      this.monster2.draw();
    } else if (this.firstMsg && !this.winningMsg) { 
      this.monster1.draw(3);
      this.monster2.draw(3);
      this.monster1.move(this.player, 70, 420);
      this.monster2.move(this.player, 160, WIDTH - 80);
    } else if (this.winningMsg) {
      this.changedMonster1.changePosition(this.monster1.x, this.monster1.y);
      this.changedMonster2.changePosition(this.monster2.x, this.monster2.y);
      this.changedMonster1.draw();
      this.changedMonster2.draw();
    }
    
    if (!this.firstMsg && !this.textBox.active) {
      this.textBox.open(
        ["these monsters are everywhere!"]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.firstMsg = true;
        this.unfreeze();
      }
    }

    if (this.winning && !this.winningMsg && !this.textBox.active) {
      this.textBox.open(
        ["from here I'm safe", "...", "what is happening?"]
      );
      this.player.freeze();
      this.textBox.onClose = () => {
        this.winning = false;
        this.winningMsg = true; 
      }
    }

    if (keyIsDown(39)) {
      this.player.moveRight();
    } else if (keyIsDown(37)) {
      this.player.moveLeft();
    }
  }
}