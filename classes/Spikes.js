class Spikes {
  constructor(x, y, speed) {
    this.x = x; 
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.minY = this.y - 40;
    this.maxY = this.y + 40; 
    this.direction = "down";
    this.speed = speed; 
  }
  
  move() {
    if (this.y <= this.minY) {
      this.direction = "down";
    } else if (this.y >= this.maxY) {
      this.direction = "up";
    }

    if (this.direction === "up") {
      this.y -= this.speed;
    } else if (this.direction === "down") {
      this.y += this.speed;
    }
  }

  draw() {
    image(spikeBall, this.x, this.y, this.width, this.height);
    this.move();
  }
}