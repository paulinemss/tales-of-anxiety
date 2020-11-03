class Player {
  constructor(x, y, floor) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.gravity = 0.2;
    this.velocity = 0;
    this.floor = floor;
    this.jumpCounts = 0;
    this.movement = "idle";
    this.isFrozen = false;
  }

  spawn(x, y) {
    this.x = x;
    this.y = y;
  }

  freeze() {
    this.isFrozen = true;
  }

  unfreeze() {
    this.isFrozen = false;
  }

  findFloor(level) {
    if (level === "level 1") {
      if (this.velocity >= 0 && this.y < 250 && this.x < 240) {
        return 194;
      } else if (this.y < 140 && this.x > 355) {
        return 130;
      } else {
        return 322;
      }
    } else if (level === "level 2") {
      if (this.y < 230 && this.x < 160) {
        return 226;
      } else if (this.y > 230 && this.x < 200 && this.x > 110) {
        return 322; 
      } else if (this.y < 216 && this.x > 235 && this.x < 285)  {
        return 210;
      } else if (this.y < 180 && this.x > 330 && this.x < 375) {
        return 176; 
      } else if (this.y < 150 && this.x > 440) {
        return 145;
      } else if (this.y < 310 && this.x > 395 && this.x < 475) {
        return 305;
      } 
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
    console.log("jump");
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
    this.floor = this.findFloor(level);

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
