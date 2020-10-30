class Background {
  constructor() {
    this.x = 0;
  }

  setup() {
    this.width = width;
    this.height = height;
  }

  draw() {
    image(bgImage, this.x, 0, this.width, this.height);
  }
}
