class Background {
  constructor() {
    this.x = 0;
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw(level) {
    image(bgGeneral, this.x, 0, this.width, this.height);
    if (level === "level 1") {
      image(bgLevelOne, this.x, 0, this.width, this.height);
    } else if (level === "level 2") {
      image(bgLevelTwo, this.x, 0, this.width, this.height);
    } else if (level === "level 3") {
      image(bgLevelThree, this.x, 0, this.width, this.height);
    }
  }
}
