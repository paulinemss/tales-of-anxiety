class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 30;
    this.direction = "left";
    this.isFrozen = false;
    this.speed = 1; 
    this.speechTimeout = null;
    this.msg = ''; 
    this.msgIndex = 0;
    this.anxietyThoughts = [
      "For sure, nobody\n likes you at work.\n They think you're weird.",
      "You haven't called\n your parents in\n at least a week",
      "The t-shirt you're\n wearing is probably\n unethically produced",
      "Did you remember\n returning that book\n from the library?",
      'The way you said "hello"\n to your boss sounded\n super weird today.',
      "Probably some people\n somewhere are making\n fun of you right now",
      "Do you remember that\n awkward thing you said\n in high school?",
      "There's probably a\n super important task that\n you have forgotten"
    ]; 
  }

  spawn(x, y) {
    this.x = x;
    this.y = y;
  }

  freeze() {
    this.isFrozen = true;
    this.msg = '';
  }
  
  unfreeze() {
    this.isFrozen = false;
  }

  reset() {
    clearInterval(this.speechTimeout);
    this.speechTimeout = null;
    this.msg = '';
    this.msgIndex = 0;
  }

  speak() {
    let msg; 
    this.msgIndex++; 
    if (this.msgIndex > this.anxietyThoughts.length) {
      this.msgIndex = 0;
    }
    msg = this.anxietyThoughts[this.msgIndex]; 
    return msg; 
  }

  move(player, leftBorder, rightBorder) {
    if (this.isFrozen) return;

    if (player.y < this.y) {
      this.speed = 1; 
      monsterRunLeftAnimation.frameDelay = 4;
      monsterRunRightAnimation.frameDelay = 4; 
      if (this.x <= leftBorder) {
        this.direction = "right";
      } else if (this.x >= rightBorder) {
        this.direction = "left";
      }
    } else {
      this.speed = 2.5;
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

    if (!this.speechTimeout && subLevel === 3 && this.isFrozen === false) { 
      this.speechTimeout = setInterval(() => {
        if (this.msg === '') {
          this.msg = this.speak(); 
        } else {
          this.msg = '';
        }
      }, 3000); 
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
