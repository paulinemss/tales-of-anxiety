class EndPoint {
  constructor() {
    this.x = 0;
    this.y = 0;
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

  draw(x, y) {
    this.x = x;
    this.y = y; 
    animation(endPointAnimation, x, y);
  }
}
