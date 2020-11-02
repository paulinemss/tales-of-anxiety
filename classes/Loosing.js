class Loosing {
  draw() {
    background("black");

    animation(monsterRunRightAnimation, WIDTH/2, 100);

    fill(255, 255, 255);
    textSize(10);
    text("Game over!", WIDTH / 2, 150);

    if (!restartLevelButton) {
      restartLevelButton = createButton('Restart Level');
      restartLevelButton.position(WIDTH / 2, 450);
      restartLevelButton.mousePressed(restartLevel);
    } else {
      restartLevelButton.show();
    }
   
    if (!restartGameButton) {
      restartGameButton = createButton('Restart Game');
      restartGameButton.position(WIDTH / 2, 400);
      restartGameButton.mousePressed(restartGame);
    } else {
      restartGameButton.show();
    }
  }
}