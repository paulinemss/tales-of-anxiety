class EndPoint {
  constructor() {
    this.x = WIDTH - 100;
    this.y = HEIGHT - 95;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    animation(endPointAnimation, this.x, this.y);
  }
}
