class Monster {
  constructor() {
    this.x = WIDTH - 200;
    this.y = HEIGHT - 78;
    this.width = 44;
    this.height = 30;
    this.direction = "left";
    this.isFrozen = false;
  }

  spawn() {
    this.x = WIDTH - 200;
    this.y = HEIGHT - 78;
  }

  freeze() {
    this.isFrozen = true;
  }
  
  unfreeze() {
    this.isFrozen = false;
  }

  move(player) {
    if (this.isFrozen) return;

    if (player.y < this.y) {
      if (this.x === 80) {
        this.direction = "right";
      } else if (this.x === WIDTH - 150) {
        this.direction = "left";
      }
    } else {
      if (player.x < this.x) {
        this.direction = "left";
      } else if (player.x > this.x) {
        this.direction = "right";
      }
    }

    if (this.direction === "left") {
      this.x -= 1;
    } else if (this.direction === "right") {
      this.x += 1;
    }
  }

  draw() {
    if (this.direction === "left") {
      animation(monsterRunLeftAnimation, this.x, this.y);
    } else if (this.direction === "right") {
      animation(monsterRunRightAnimation, this.x, this.y);
    }
  }
}
