class Monster {
  constructor(x, y, delay = 0) {
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 30;
    this.direction = "left";
    this.isFrozen = false;
    this.speed = 1; 
    this.speechTimeout = null;
    this.speechInterval = null;
    this.msg = ''; 
    this.delay = delay; 
  }

  spawn(x, y) {
    this.x = x;
    this.y = y;
  }

  freeze() {
    this.isFrozen = true;
    this.msg = '';
    this.stopSpeaking();
  }
  
  unfreeze() {
    this.isFrozen = false;
    this.startSpeaking();
  }

  reset() {
    clearInterval(this.speechInterval);
    this.speechInterval = null;
    this.msg = '';
    msgIndex = 0;
  }

  speak() {
    let msg; 
    msgIndex++; 
    if (msgIndex > anxietyThoughts.length) {
      msgIndex = 0;
    }
    msg = anxietyThoughts[msgIndex]; 
    return msg; 
  }

  startSpeaking() {
    this.speechTimeout = setTimeout(() => {
      this.speechInterval = setInterval(() => {
        if (this.msg === '') {
          this.msg = this.speak(); 
        } else {
          this.msg = '';
        }
      }, 3000); 
    }, this.delay);
  }

  stopSpeaking() {
    clearInterval(this.speechInterval);
    this.speechInterval = null;
    this.speechTimeout = null; 
  }

  move(player, leftBorder, rightBorder) {
    if (this.isFrozen) return;

    if (player.y < this.y - 10 || player.y > this.y + 10) {
      this.speed = 1.5; 
      monsterRunLeftAnimation.frameDelay = 4;
      monsterRunRightAnimation.frameDelay = 4; 
      if (this.x <= leftBorder) {
        this.direction = "right";
      } else if (this.x >= rightBorder) {
        this.direction = "left";
      }
    } else {
      this.speed = 2;
      monsterRunLeftAnimation.frameDelay = 2;
      monsterRunRightAnimation.frameDelay = 2; 
      if (player.x < this.x) {
        this.direction = "left";
      } else if (player.x > this.x) {
        this.direction = "right";
      }
    }

    if (this.direction === "left" && this.x > leftBorder) {
      this.x -= this.speed;
    } else if (this.direction === "right" && this.x < rightBorder) {
      this.x += this.speed;
    }
  }

  draw(subLevel) {
    if (this.direction === "left") {
      animation(monsterRunLeftAnimation, this.x, this.y);
    } else if (this.direction === "right") {
      animation(monsterRunRightAnimation, this.x, this.y);
    }

    if (!this.speechTimeout && !this.speechInterval && subLevel === 3 && this.isFrozen === false) { 
      this.startSpeaking();
    }
   
    if (this.msg && subLevel === 3) {
      let xPosition = this.x; 
      if (xPosition < 150) { xPosition = 150; }
      textSize(6);
      let msgBox = gameFont.textBounds(this.msg, xPosition, this.y - 40);
      fill(255);
      stroke(0);
      rect(msgBox.x-5, msgBox.y-5, msgBox.w+10, msgBox.h+10);
      fill(0);
      noStroke();

      text(this.msg, xPosition, this.y - 40);
      fill(0, 102, 153); 
    } 
  }
}
