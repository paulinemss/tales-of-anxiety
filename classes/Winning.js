class Winning {
  setup() {
    this.width = WIDTH;
    this.height = HEIGHT;
  }

  draw() {
    image(bgConclusion, 0, 0, this.width, this.height);

    animation(playerIdleAnimation, WIDTH/2, 100);

    fill(0, 0, 0);
    textSize(14);
    text("YOU WON", WIDTH / 2, 150);

    fill(0, 0, 0);
    textSize(12);
    text("You are so much more\n than what is making\n you anxious.", WIDTH / 2, 180);

    if (!learnMoreLink) {
      learnMoreLink = createA('https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/self-care-for-anxiety/', 'Learn how to cope with the anxiety monster here.', '_blank');
      learnMoreLink.addClass("learnMoreLink");
    } else {
      learnMoreLink.show();
    }
   
    if (!restartGameButton) {
      restartGameButton = createButton('RESTART GAME');
      restartGameButton.addClass("lastRestartGame");
      restartGameButton.addClass("allButtons");
      restartGameButton.mousePressed(restartGame);
    } else {
      restartGameButton.show();
    }
  }
}