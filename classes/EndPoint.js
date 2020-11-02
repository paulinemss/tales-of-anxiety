class EndPoint {
  constructor() {
    this.x = WIDTH - 100;
    this.y = HEIGHT - 95;
    this.width = 64;
    this.height = 64;
  }

  collisionCheck(player) {
    const isTouchingOnLeft = this.x + this.width - 35 >= player.x;
    const isTouchingOnRight = this.x <= player.x + player.width - 35;

    const isTouchingOnTop = this.y + this.height >= player.y;
    const isTouchingOnBottom = this.y <= player.y + player.height;

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
    animation(endPointAnimation, this.x, this.y);
  }
}
