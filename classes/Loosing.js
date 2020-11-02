class Loosing {
  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    image(bgIntro, 0, 0, this.width, this.height);

    animation(monsterRunRightAnimation, WIDTH / 2, 130);

    fill(255, 255, 255);
    textSize(24);
    text("GAME OVER", WIDTH / 2, HEIGHT / 2);

    if (!restartLevelButton) {
      restartLevelButton = createButton('Restart Level');
      restartLevelButton.addClass('restartLevelButton');
      restartLevelButton.addClass('allButtons');
      restartLevelButton.mousePressed(restartLevel);
    } else {
      restartLevelButton.show();
    }
   
    if (!restartGameButton) {
      restartGameButton = createButton('Restart Game');
      restartGameButton.addClass('restartGameButton');
      restartGameButton.addClass('allButtons');
      restartGameButton.mousePressed(restartGame);
    } else {
      restartGameButton.show();
    }
  }
}