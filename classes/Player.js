class Player {
  constructor() {
    this.x = 60;
    this.y = 400;
    this.width = 32;
    this.height = 32;
    this.gravity = 0.2;
    this.velocity = 0;
    this.floor = 400;
    this.jumpCounts = 0;
    this.movement = "idle";
  }

  collisionCheck(obstacle) {
    const isTouchingOnLeft = this.x + this.width >= obstacle.x;
    const isTouchingOnRight = this.x <= obstacle.x + obstacle.width;

    const isTouchingOnTop = this.y + this.height >= obstacle.y;
    const isTouchingOnBottom = this.y <= obstacle.y + obstacle.height;

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

  spawn() {
    this.x = 60;
    this.y = 400;
  }

  reset() {
    this.movement = "idle";
  }

  moveRight() {
    if (this.x >= WIDTH - this.width) {
      return;
    }
    this.x += 2;
    this.movement = "moveRight";
  }

  moveLeft() {
    if (this.x <= 10) {
      return;
    }
    this.x -= 2;
    this.movement = "moveLeft";
  }

  jump() {
    if (this.jumpCounts === 2) {
      return;
    }
    this.y -= 5;
    this.velocity -= 5;
    this.jumpCounts++;
    this.movement = "jumping";
  }

  isInTheAir() {
    return this.y < 400;
  }

  draw() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > this.floor) {
      this.y = this.floor;
      this.velocity = 0;
      this.jumpCounts = 0;
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
