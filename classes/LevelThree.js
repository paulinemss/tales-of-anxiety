class LevelThree {
  constructor() {
    this.myBackground = new Background();
    this.player = new Player(420, 64, 65, "level 3");
    this.monster1 = new Monster(100, 178);
    this.monster2 = new Monster(470, 322, 3000);
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
    this.showDisappearingAnim = true; 
    this.monsterConversation = false; 
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
    this.showDisappearingAnim = true; 
    this.monsterConversation = false; 
  }

  showNewMonsters() {
    // this only happens for the first 700 ms 
    if (this.showDisappearingAnim === true) {
      disappearingAnimation.looping = false; 
      animation(disappearingAnimation, this.monster1.x, this.monster1.y);

      disappearingAnimation.looping = false; 
      animation(disappearingAnimation, this.monster2.x, this.monster2.y);

      this.changedMonster1.changePosition(this.monster1.x, this.monster1.y - 3);
      this.changedMonster2.changePosition(this.monster2.x, this.monster2.y - 3);
    }
    
    // draw the new radish monsters 
    this.changedMonster1.draw();
    this.changedMonster2.draw();
    this.changedMonster1.move(80, 420);
    this.changedMonster2.move(160, WIDTH - 80);

    // hide disappearing animation
    setTimeout(() => {
      this.showDisappearingAnim = false; 
    }, 700);
  }

  draw() {
    this.myBackground.draw("level 3");
    this.myEndPoint.draw(38, 304);
    this.player.draw();

    if (!this.firstMsg && !this.winningMsg) {
      this.textBox.draw(this.player, this.monster1);
      this.monster1.draw();
      this.monster2.draw();
    } else if (this.firstMsg && !this.winningMsg) { 
      this.textBox.draw(this.player, this.monster1);
      this.monster1.draw(3);
      this.monster2.draw(3);
      this.monster1.move(this.player, 80, 420);
      this.monster2.move(this.player, 160, WIDTH - 80);
    } else if (this.winningMsg) {
      this.showNewMonsters();
      this.textBox.draw(this.player, this.changedMonster1);
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
      this.freeze();
      this.textBox.onClose = () => {
        this.winning = false;
        this.winningMsg = true; 
      }
    }

    if (this.winningMsg && !this.monsterConversation && !this.textBox.active) {
      this.textBox.open(
        ["monster: we're sorry we scared you!", "monster: we are not that evil", "..."]
      );
      this.freeze();
      this.textBox.onClose = () => {
        this.monsterConversation = true; 
      }
    }

    if (keyIsDown(39)) {
      this.player.moveRight();
    } else if (keyIsDown(37)) {
      this.player.moveLeft();
    }
  }
}