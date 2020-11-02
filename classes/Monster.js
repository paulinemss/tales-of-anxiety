class Monster {
  constructor() {
    this.x = WIDTH - 200;
    this.y = HEIGHT - 78;
    this.width = 44;
    this.height = 30;
    this.direction = "left";
    this.isFrozen = false;
    this.speed = 1; 
    this.speechTimeout = null;
    this.msg = ''; 
    this.msgIndex = 0;
    this.anxietyThoughts = [
      "You haven't called\n your parents in\n at least a week",
      "You should work\n instead of playing a\n game on your browser",
      "The t-shirt you're\n wearing is probably\n unethically produced",
      "Did you remember\n returning that book\n from the library?",
      "Probably some people\n somewhere are making\n fun of you right now",
      "Do you remember that\n awkward thing you said\n in high school?"
    ]; 
  }

  spawn() {
    this.x = WIDTH - 200;
    this.y = HEIGHT - 78;
  }

  freeze() {
    this.isFrozen = true;
  }
  
  unfreeze() {
    this.isFrozen = false;
    this.speechTimeout = null;
    this.msgIndex = 0;
  }

  speak() {
    let msg; 
    if (this.msgIndex < this.anxietyThoughts.length) {
      this.msgIndex++; 
      msg = this.anxietyThoughts[this.msgIndex]; 
    } else {
      this.msgIndex = 0; 
      msg = this.anxietyThoughts[this.msgIndex]; 
    }
    return msg; 
  }

  move(player) {
    if (this.isFrozen) return;

    if (player.y < this.y) {
      this.speed = 1; 
      monsterRunLeftAnimation.frameDelay = 4;
      monsterRunRightAnimation.frameDelay = 4; 
      if (this.x === 80) {
        this.direction = "right";
      } else if (this.x === WIDTH - 150) {
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

    if (this.direction === "left" && this.x > 80) {
      this.x -= this.speed;
    } else if (this.direction === "right" && this.x < WIDTH - 150) {
      this.x += this.speed;
    }
  }

  draw(level) {
    if (this.direction === "left") {
      animation(monsterRunLeftAnimation, this.x, this.y);
    } else if (this.direction === "right") {
      animation(monsterRunRightAnimation, this.x, this.y);
    }

    if (!this.speechTimeout && level === 3) { 
      this.msg = this.speak();
      this.speechTimeout = setInterval(() => {
        if (this.msg === '') {
          this.msg = this.speak(); 
        } else {
          this.msg = '';
        }
      }, 3000); 
    }
   
    textSize(6);
    let msgBox = gameFont.textBounds(this.msg, this.x, this.y - 40);
    fill(255);
    stroke(0);
    rect(msgBox.x-5, msgBox.y-5, msgBox.w+10, msgBox.h+10);
    fill(0);
    noStroke();

    text(this.msg, this.x, this.y - 40);
    fill(0, 102, 153); 
    
  }
}
