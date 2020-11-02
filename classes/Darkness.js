class Darkness {
  constructor() {
    this.x = 0;
    this.torch1 = {
      x: 465,
      y: 128,
      width: 16,
      height: 32,
      state: 'off'
    };
    this.torch2 = {
      x: 200,
      y: 192,
      width: 16,
      height: 32,
      state: 'off'
    };
    this.level = 1;
  }

  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  reset() {
    this.torch1.state = 'off';
    this.torch2.state = 'off';
  }

  collisionCheck(torch, player) {
    const isTouchingOnLeft = torch.x + torch.width >= player.x;
    const isTouchingOnRight = torch.x <= player.x + player.width;

    const isTouchingOnTop = torch.y + torch.height >= player.y;
    const isTouchingOnBottom = torch.y <= player.y + player.height;

    if (
      isTouchingOnLeft &&
      isTouchingOnRight &&
      isTouchingOnTop &&
      isTouchingOnBottom
    ) {
      torch.state = "on";
    } 
  }

  draw() {
    if (this.level === 1) {
      animation(torchOffAnimation, this.torch1.x, this.torch1.y);
      image(bgLevelOneDark1, this.x, 0, this.width, this.height);
    } else if (this.level === 2) {
      animation(torchOnAnimation, this.torch1.x, this.torch1.y);
      animation(torchOffAnimation, this.torch2.x, this.torch2.y);
      image(bgLevelOneDark2, this.x, 0, this.width, this.height);
    } else if (this.level === 3) {
      animation(torchOnAnimation, this.torch1.x, this.torch1.y);
      animation(torchOnAnimation, this.torch2.x, this.torch2.y);
    }

    if (this.torch1.state === "off") { 
      this.level = 1; 
    } else if (this.torch1.state === "on" && this.torch2.state === "off") {
      this.level = 2;
    } else if (this.torch1.state === "on" && this.torch2.state === "on") {
      this.level = 3; 
    }
  }
}