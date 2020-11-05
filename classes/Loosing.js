class Loosing {
  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    image(bgIntro, 0, 0, this.width, this.height);

    animation(monsterRunRightAnimation, WIDTH / 2, 100);

    fill(255, 255, 255);
    textSize(24);
    text("GAME OVER", WIDTH / 2, 170);

    fill(255, 255, 255);
    textSize(12);
    text("The anxiety monster\n won this time.", WIDTH / 2, 200);

    if (!restartLevelButton) {
      restartLevelButton = createButton('RESTART LVL');
      restartLevelButton.addClass('restartLevelButton');
      restartLevelButton.addClass('allButtons');
      restartLevelButton.mousePressed(restartLevel);
    } else {
      restartLevelButton.show();
    }
   
    if (!restartGameButton) {
      restartGameButton = createButton('RESTART GAME');
      restartGameButton.addClass('restartGameButton');
      restartGameButton.addClass('allButtons');
      restartGameButton.mousePressed(restartGame);
    } else {
      restartGameButton.show();
    }
  }
}