class Intro {
  constructor() {
    this.subTitle = "";
    this.title = ""; 
    this.showYou = false;
    this.showAnxiety = false;
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
      this.showButton = true; 
    }, 6000);
  }

  draw() {
    image(bgIntro, 0, 0, this.width, this.height);

    fill(255, 255, 255);
    textSize(20);
    text(this.subTitle, WIDTH / 2, 100);

    fill(255, 255, 255);
    textSize(28);
    text(this.title, WIDTH / 2, 140);

    if (this.showAnxiety) {
      animation(monsterRunRightAnimation, 220, 200);
      fill(255, 255, 255);
      textSize(7);
      text("this is your anxiety", 220, 250);
    }

    if (this.showYou) {
      animation(playerRunRightAnimation, 380, 200);
      fill(255, 255, 255);
      textSize(7);
      text("this is you", 380, 250);
    }
    
    if (this.showButton) {
      if (!startGameButton) {
        startGameButton = createButton('Start Game');
        startGameButton.addClass('startGameButton');
        startGameButton.addClass('allButtons');
        startGameButton.mousePressed(startGame);
      } else {
        startGameButton.show();
      }
    }
  }
}