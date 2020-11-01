class Background {
  constructor() {
    this.x = 0;
  }

  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    image(bgLevelOne, this.x, 0, this.width, this.height);
  }
}
