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

  draw() {
    if (this.direction === "left") {
      animation(transformRunLeftAnimation, this.x, this.y);
    } else if (this.direction === "right") {
      animation(transformRunRightAnimation, this.x, this.y);
    }
  }
}