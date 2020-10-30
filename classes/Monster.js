class Monster {
  constructor() {
    this.x = 400;
    this.y = 400;
    this.width = 44;
    this.height = 30;
    this.direction = "left";
  }

  spawn() {
    this.x = 400;
    this.y = 400;
  }

  move(player) {
    if (player.x < this.x) {
      if (this.x <= 10) {
        return;
      }
      this.x -= 1;
      this.direction = "left";
    } else if (player.x > this.x) {
      if (this.x >= WIDTH - this.width) {
        return;
      }
      this.x += 1;
      this.direction = "right";
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
