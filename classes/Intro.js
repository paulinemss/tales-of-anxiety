class Intro {
  draw() {
    background("lightsalmon");

    fill(255, 255, 255);
    textSize(16);
    text("TALES OF ANXIETY", WIDTH / 2, 150);

    animation(monsterRunRightAnimation, 220, 200);
    animation(playerRunRightAnimation, 350, 200);

    fill(255, 255, 255);
    textSize(6);
    text("this is your anxiety", 220, 250);

    fill(255, 255, 255);
    textSize(6);
    text("this is you", 350, 250);

    if (!startGameButton) {
      startGameButton = createButton('Start Game');
      startGameButton.position(500, 450);
      startGameButton.mousePressed(startGame);
    } else {
      startGameButton.show();
    }
  }
}