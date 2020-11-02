class Background {
  constructor() {
    this.x = 0;
  }

  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    image(bgGeneral, this.x, 0, this.width, this.height);
    image(bgLevelOne, this.x, 0, this.width, this.height);
  }
}
