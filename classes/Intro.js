class Intro {
  constructor() {
    this.subTitle = "";
    this.title = ""; 
    this.showYou = false;
    this.showAnxiety = false;
    this.showCommands = false; 
    this.showButton = false;  
  }

  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  
    setTimeout(() => {
      this.subTitle = "TALES"; 
    }, 1000);

    setTimeout(() => {
      this.subTitle = "TALES OF"; 
    }, 2000);

    setTimeout(() => {
      this.title = "ANXIETY"; 
    }, 3000);

    setTimeout(() => {
      this.showYou = true; 
    }, 4000);

    setTimeout(() => {
      this.showAnxiety = true; 
    }, 5000);

    setTimeout(() => {
      this.showCommands = true; 
      // setInterval(() => {
      //   this.showCommands = !this.showCommands;
      // }, 800);
    }, 6000);

    setTimeout(() => {
      this.showButton = true; 
    }, 7000);
  }

  draw() {
    image(bgIntro, 0, 0, this.width, this.height);

    fill(255, 255, 255);
    textSize(20);
    text(this.subTitle, WIDTH / 2, 75);

    fill(255, 255, 255);
    textSize(28);
    text(this.title, WIDTH / 2, 115);

    if (this.showAnxiety) {
      animation(monsterRunRightAnimation, 220, 175);
      fill(255, 255, 255);
      textSize(7);
      text("this is your anxiety", 220, 225);
    }

    if (this.showYou) {
      animation(playerRunRightAnimation, 380, 175);
      fill(255, 255, 255);
      textSize(7);
      text("this is you", 380, 225);
    }

    if (this.showCommands) {
      textSize(6);
      let msgBox1 = gameFont.textBounds("SPACE", 240, 335);
      fill(211);
      stroke(0);
      rect(msgBox1.x-15, msgBox1.y-5, msgBox1.w+30, msgBox1.h+10);
      fill(0);
      noStroke();

      text("SPACE", 240, 335);
      fill(0, 102, 153); 

      fill(255, 255, 255);
      text("to jump", 240, 355);
      text("and speak", 240, 365);

      let msgBox2 = gameFont.textBounds("←", 340, 335);
      fill(211);
      stroke(0);
      rect(msgBox2.x-5, msgBox2.y-5, msgBox2.w+10, msgBox2.h+10);
      fill(0);
      noStroke();

      text("←", 340, 335);
      fill(0, 102, 153); 

      let msgBox3 = gameFont.textBounds("→", 370, 335);
      fill(211);
      stroke(0);
      rect(msgBox3.x-5, msgBox3.y-5, msgBox3.w+10, msgBox3.h+10);
      fill(0);
      noStroke();

      text("→", 370, 335);
      fill(0, 102, 153); 

      fill(255, 255, 255);
      text("move left", 355, 355);
      text("and right", 355, 365);
    }
    
    if (this.showButton) {
      if (!startGameButton) {
        startGameButton = createButton('START GAME');
        startGameButton.addClass('startGameButton');
        startGameButton.addClass('allButtons');
        startGameButton.mousePressed(startGame);
      } else {
        startGameButton.show();
      }
    }
  }
}