class EndPoint {
  constructor() {
    this.x = 530;
    this.y = 385;
    this.width = 64;
    this.height = 64;
  }

  draw() {
    animation(endPointAnimation, this.x, this.y);
  }
}
