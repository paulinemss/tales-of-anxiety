function preload() {
  // loading spritesheets
  playerIdle = loadSpriteSheet("/assets/player/idle.png", 32, 32, 11);
  playerRunRight = loadSpriteSheet("/assets/player/runRight.png", 32, 32, 12);
  playerRunLeft = loadSpriteSheet("/assets/player/runLeft.png", 32, 32, 12);
  playerJump = loadSpriteSheet("/assets/player/jump.png", 32, 32, 1);
  playerDblJump = loadSpriteSheet("/assets/player/doubleJump.png", 32, 32, 6);
  monsterRunRight = loadSpriteSheet("/assets/monster/runRight.png", 44, 30, 10);
  monsterRunLeft = loadSpriteSheet("/assets/monster/runLeft.png", 44, 30, 10);
  endPoint = loadSpriteSheet("/assets/terrain/endPoint.png", 64, 64, 17);
  torchOn = loadSpriteSheet("/assets/terrain/torchOn.png", 16, 32, 3);
  torchOff = loadSpriteSheet("/assets/terrain/torchOff.png", 16, 32, 1);

  // loading images, fonts 
  bgGeneral = loadImage("/assets/terrain/Background.png");
  bgIntro = loadImage("/assets/terrain/Intro.png");
  bgLevelOne = loadImage("/assets/terrain/Level1.png");
  bgLevelOneDark1 = loadImage("/assets/terrain/Dark-Level1-1.png");
  bgLevelOneDark2 = loadImage("/assets/terrain/Dark-Level1-2.png");
  bgConclusion = loadImage("/assets/terrain/Conclusion.png");
  gameFont = loadFont("/assets/font/PressStart2P-Regular.ttf")

  // loading animations 
  playerIdleAnimation = loadAnimation(playerIdle);
  playerRunRightAnimation = loadAnimation(playerRunRight);
  playerRunLeftAnimation = loadAnimation(playerRunLeft);
  playerJumpAnimation = loadAnimation(playerJump);
  playerDblJumpAnimation = loadAnimation(playerDblJump);
  monsterRunRightAnimation = loadAnimation(monsterRunRight);
  monsterRunLeftAnimation = loadAnimation(monsterRunLeft);
  endPointAnimation = loadAnimation(endPoint);
  torchOnAnimation = loadAnimation(torchOn);
  torchOffAnimation = loadAnimation(torchOff);
}

// initializing classes 
const intro = new Intro();
const game = new Game();
const winning = new Winning();
const loosing = new Loosing(); 

// initializing the level
let level = "beginning";

function setup() {
  createCanvas(WIDTH, HEIGHT);
  game.setup();
  intro.setup();
  loosing.setup();
  winning.setup();
}

function draw() {
  clear();

  // checking the current level to display 
  if (level === "beginning") {
    intro.draw();
  } else if (level === "level 1") {
    game.draw();
  } else if (level === "winning") {
    winning.draw();
  } else if (level === "loosing") {
     loosing.draw();
  }

  // if the player touches the monster and looses 
  if (game.player.collisionCheck(game.monster)) {
    game.freeze();
    level = "loosing";
  }

  // if the player touches the end point and wins
  if (game.myEndPoint.collisionCheck(game.player)) {
    game.freeze();
    level = "winning";
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (game.textBox.active) {
      game.textBox.messageIndex++;
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

function restartLevel() {
  game.player.spawn();
  game.monster.spawn();
  game.reset();
  level = "level 1";
  if (restartGameButton) { restartGameButton.hide(); }
  if (restartLevelButton) { restartLevelButton.hide(); }
}

function restartGame() {
  game.player.spawn();
  game.monster.spawn();
  game.reset();
  level = "beginning";
  if (restartGameButton) { restartGameButton.hide(); }
  if (restartLevelButton) { restartLevelButton.hide(); }
  if (learnMoreLink) { learnMoreLink.hide(); }
}