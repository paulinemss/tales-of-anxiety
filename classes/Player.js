class Player {
  constructor(x, y, floor, level) {
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
    this.isOnPlatform = false; 
    this.level = level;
  }

  spawn(x, y) {
    this.x = x;
    this.y = y;
    this.movement = "idle";
  }

  freeze() {
    this.isFrozen = true;
  }

  unfreeze() {
    this.isFrozen = false;
  }

  findFloor() {
    if (this.level === "level 1") {
      if (this.velocity >= 0 && this.y < 200 && this.x < 240) {
        return 194;
      } else if (this.y < 140 && this.x > 355) {
        return 130;
      } else {
        return 322;
      }
    } else if (this.level === "level 2") {
      if (this.y < 230 && this.x < 160) {
        return 226;
      } else if (this.y > 230 && this.x < 200 && this.x > 110) {
        return 322; 
      } else if (this.y < 150 && this.x > 440) {
        return 145;
      } else if (this.y < 310 && this.x > 395 && this.x < 475) {
        return 305;
      } 
    } else if (this.level === "level 3") {
      if (this.y <= 65 && this.x > 150) {
        return 65;
      } else if (this.y <= 176 && this.x < 450) {
        return 176;
      } else if (this.y <= 290 && this.x > 106 && this.x < 150) {
        return 290;
      } else {
        return 322;
      }
    }
  }
  
  usePlatform(platform) {
    this.isOnPlatform = true; 
    this.floor = platform.y; 
  }

  leavePlatform () {
    this.isOnPlatform = false;
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
    if (this.movement !== "dying") {
      this.movement = "idle";
    }
  }

  moveRight() {
    if (this.isFrozen) return;
    if (this.y < 140 && this.x >= WIDTH - 105) {
      return; 
    } else if (this.x >= WIDTH - 70) {
      return;
    }
    if (this.collidesWithCube()) {
      return; 
    }
    this.x += 2;
    this.movement = "moveRight";
  }

  moveLeft() {
    if (this.isFrozen) return;
    if (this.x <= 70 && this.level !== "level 3") return; 
    if (this.collidesWithCube()) {
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
    this.velocity -= 4;
    this.velocity = Math.max(this.velocity, -5);
    this.jumpCounts++;
    this.movement = "jumping";
  }

  isInTheAir() {
    return this.y < this.floor || !this.floor;
  }

  die() {
    this.freeze();
    this.movement = "dying";
  }

  collidesWithElement(element) {
    return this.x >= element.x &&
    this.x <= element.x + element.width &&
    this.y <= element.y + 5; 
  }

  collidesWithCube() {
    if (this.level !== "level 3") return false; 

    if (this.y <= 322 && this.y >= 295 && this.x < 150 && this.x > 106) {
      return true;
    } else if (this.x <= 0 + this.width) {
      return true;
    } 

    return false; 
  }

  collidesWithSpike(spike) {
    const isTouchingOnLeft = this.x + this.width - 20 >= spike.x;
    const isTouchingOnRight = this.x <= spike.x + spike.width;

    const isTouchingOnTop = this.y + this.height >= spike.y;
    const isTouchingOnBottom = this.y <= spike.y + spike.height;

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

  draw() {
    if (this.movement !== "dying") {
      if (!this.isOnPlatform) {
        this.floor = this.findFloor();
      }

      this.velocity += this.gravity;
      this.y += this.velocity;
      
      // adding 5 as threshold so player doesnt bounce on moving platforms
      if (this.y > this.floor - 5) {
        this.y = this.floor;
        this.velocity = 0;
        this.jumpCounts = 0;
      } else if (this.y <= 0) {
        this.y = 0;
        this.velocity = 1;
      }
    }

    if (this.movement === "idle") {
      animation(playerIdleAnimation, this.x, this.y);
    } else if (this.movement === "dying") {
      animation(playerFallAnimation, this.x, this.y);
      this.y += 3;
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

    if (this.y > HEIGHT) {
      level = "loosing";
    }
  }
}
