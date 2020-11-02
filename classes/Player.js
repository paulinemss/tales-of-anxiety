class Player {
  constructor() {
    this.x = 390;
    this.y = 130;
    this.width = 32;
    this.height = 32;
    this.gravity = 0.2;
    this.velocity = 0;
    this.floor = HEIGHT - 78;
    this.jumpCounts = 0;
    this.movement = "idle";
    this.isFrozen = false;
  }

  spawn() {
    this.x = 390;
    this.y = 130;
  }

  freeze() {
    this.isFrozen = true;
  }

  unfreeze() {
    this.isFrozen = false;
  }

  findFloor() {
    if (this.velocity >= 0 && this.y < 250 && this.x < 240) {
      return HEIGHT - 206;
    } else if (this.y < 140 && this.x > 355) {
      return HEIGHT - 270;
    } else {
      return HEIGHT - 78;
    }
  }

  collisionCheck(monster) {
    const isTouchingOnLeft = this.x + this.width - 3 >= monster.x;
    const isTouchingOnRight = this.x <= monster.x + monster.width - 15;

    const isTouchingOnTop = this.y + this.height >= monster.y;
    const isTouchingOnBottom = this.y <= monster.y + monster.height;

    if (
      isTouchingOnLeft &&
      isTouchingOnRight &&
      isTouchingOnTop &&
      isTouchingOnBottom
    ) {
      return true;
    } else {
      return false;
    }
  }

  reset() {
    this.movement = "idle";
  }

  moveRight() {
    if (this.isFrozen) return;

    if (this.y < 140 && this.x >= WIDTH - 105) {
      return; 
    } else if (this.x >= WIDTH - 70) {
      return;
    }
    this.x += 2;
    this.movement = "moveRight";
  }

  moveLeft() {
    if (this.isFrozen) return;

    if (this.x <= 70) {
      return;
    }
    this.x -= 2;
    this.movement = "moveLeft";
  }

  jump() {
    if (this.isFrozen) return;

    if (this.jumpCounts === 2) {
      return;
    }
    this.y -= 5;
    this.velocity -= 5;
    this.jumpCounts++;
    this.movement = "jumping";
  }

  isInTheAir() {
    return this.y < this.floor;
  }

  draw(level) {
    this.floor = this.findFloor();

    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > this.floor) {
      this.y = this.floor;
      this.velocity = 0;
      this.jumpCounts = 0;
    } else if (this.y <= 0) {
      this.y = 0;
      this.velocity = 1;
    }

    if (this.movement === "idle") {
      animation(playerIdleAnimation, this.x, this.y);
    } else if (this.movement === "moveRight" && !this.isInTheAir()) {
      animation(playerRunRightAnimation, this.x, this.y);
    } else if (this.movement === "moveLeft" && !this.isInTheAir()) {
      animation(playerRunLeftAnimation, this.x, this.y);
    } else if (this.movement === "jumping" || this.isInTheAir()) {
      if (this.jumpCounts === 1) {
        animation(playerJumpAnimation, this.x, this.y);
      } else {
        animation(playerDblJumpAnimation, this.x, this.y);
      }
    }

    if (this.y === this.floor && this.movement === "jumping") {
      this.movement = "idle";
    }
  }
}
