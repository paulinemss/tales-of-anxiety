class ChangedMonster {
  constructor(x, y, direction) {
    this.x = x; 
    this.y = y; 
    this.width = 30;
    this.height = 38; 
    this.direction = direction; 
  }

  changePosition(x, y) {
    this.x = x; 
    this.y = y; 
  }

  move(leftBorder, rightBorder) {
    if (this.x <= leftBorder) {
      this.direction = "right";
    } else if (this.x >= rightBorder) {
      this.direction = "left";
    }

    if (this.direction === "left" && this.x > leftBorder) {
      this.x -= 1;
    } else if (this.direction === "right" && this.x < rightBorder) {
      this.x += 1;
    }
  }

  draw() {
    if (this.direction === "left") {
      animation(transformRunLeftAnimation, this.x, this.y);
    } else if (this.direction === "right") {
      animation(transformRunRightAnimation, this.x, this.y);
    }
  }
}