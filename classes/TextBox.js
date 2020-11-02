class TextBox {
  constructor() {
    this.messages = [];
    this.messageIndex = 0;
    this.active = false; 
    this.onClose = null;
  }

  setup() {
    textFont(gameFont);
    textSize(8);
    textAlign(CENTER);
  }

  open(arr) {
    console.log("open");
    this.messages = arr;
    this.messageIndex = 0;
    this.active = true;
  }

  close() {
    console.log("close");
    this.messages = [];
    this.messageIndex = 0;
    this.active = false; 
    if (this.onClose) {
      this.onClose();
    }
    this.onClose = null;
  }

  draw() {
    if (this.active) {
      if (!this.messages[this.messageIndex]) {
        this.close();
        return;
      }

      const msg = this.messages[this.messageIndex];
      textSize(7);

      let bbox = gameFont.textBounds(msg, WIDTH/2, 40);
      fill(255);
      stroke(0);
      rect(bbox.x-10, bbox.y-10, bbox.w+20, bbox.h+20);
      fill(0);
      noStroke();

      text(msg, WIDTH/2, 40);
      fill(0, 102, 153);

    }
  }
}