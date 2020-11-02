class Winning {
  draw() {
    background("lightsalmon");

    animation(playerIdleAnimation, WIDTH/2, 100);

    fill(255, 255, 255);
    textSize(10);
    text("You are so much more than what is making you anxious.", WIDTH / 2, 150);

    if (!learnMoreLink) {
      learnMoreLink = createA('http://p5js.org/', 'Find resources to learn to confront your anxiety here.', '_blank');
      learnMoreLink.position(WIDTH / 2, 250);
    } else {
      learnMoreLink.show();
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