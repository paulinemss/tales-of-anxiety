function preload() {
  playerIdle = loadSpriteSheet("/assets/player/idle.png", 32, 32, 11);
  playerRunRight = loadSpriteSheet("/assets/player/runRight.png", 32, 32, 12);
  playerRunLeft = loadSpriteSheet("/assets/player/runLeft.png", 32, 32, 12);
  playerJump = loadSpriteSheet("/assets/player/jump.png", 32, 32, 1);
  playerDblJump = loadSpriteSheet("/assets/player/doubleJump.png", 32, 32, 6);

  monsterRunRight = loadSpriteSheet("/assets/monster/runRight.png", 44, 30, 10);
  monsterRunLeft = loadSpriteSheet("/assets/monster/runLeft.png", 44, 30, 10);
  endPoint = loadSpriteSheet("/assets/terrain/endPoint.png", 64, 64, 17);
  bgLevelOne = loadImage("/assets/terrain/Level1.png");

  gameFont = loadFont("/assets/font/PressStart2P-Regular.ttf")

  playerIdleAnimation = loadAnimation(playerIdle);
  playerRunRightAnimation = loadAnimation(playerRunRight);
  playerRunLeftAnimation = loadAnimation(playerRunLeft);
  playerJumpAnimation = loadAnimation(playerJump);
  playerDblJumpAnimation = loadAnimation(playerDblJump);

  monsterRunRightAnimation = loadAnimation(monsterRunRight);
  monsterRunLeftAnimation = loadAnimation(monsterRunLeft);
  endPointAnimation = loadAnimation(endPoint);
}

const intro = new Intro();
const game = new Game();
const textBox = new TextBox();
const winning = new Winning();

let level = "beginning";
let hasSeenIntroduction = false;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  game.setup();
  textBox.setup();
}

function draw() {
  clear();
  background("snow");
  textBox.draw();

  if (level === "beginning") {
    intro.draw();
  } else if (level === "level 1") {
    game.draw();
  } else if (level === "winning") {
    winning.draw();
  }

  // if (game.player.collisionCheck(game.monster)) {
  //   message.innerText = "GAME OVER!";
  //   noLoop();
  // }

  if (!hasSeenIntroduction && !textBox.active) {
    textBox.open(["...", "where are we?", "should we try to find a way out?"]);
    game.freeze();
    textBox.onClose = () => {
      hasSeenIntroduction = true;
      game.unfreeze();
    }
  }

  if (game.player.collisionCheck(game.myEndPoint) && !textBox.active) {
    textBox.open(["you won the game!"]);
    game.freeze();
    level = "winning";
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (textBox.active) {
      textBox.messageIndex++;
    } else {
      game.player.jump();
    }
  }
}

function keyReleased() {
  if (keyCode === 39 || keyCode === 37) {
    game.player.reset();
  }
}

function startGame() {
  startGameButton.hide();
  level = "level 1";
}

function restart() {
  game.player.spawn();
  game.monster.spawn();
  game.unfreeze();
  hasSeenIntroduction = false;
  textBox.close();
  level = "level 1";
  restartButton.hide();
  learnMoreLink.hide();
  loop();
}