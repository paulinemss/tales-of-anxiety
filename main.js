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
  bgLevelTwo = loadImage("/assets/terrain/Level2.png");
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
let levelOne = new LevelOne();
const levelTwo = new LevelTwo();
const winning = new Winning();
const loosing = new Loosing(); 

// initializing the level
let level = "level 1";
let wonLevelOne = false; 

function setup() {
  createCanvas(WIDTH, HEIGHT);
  levelOne.setup();
  intro.setup();
  loosing.setup();
  winning.setup();
}

function draw() {
  clear();
  console.log(levelTwo.player.x);
  console.log(levelTwo.player.y);
  // checking the current level to display 
  if (level === "beginning") {
    intro.draw();
  } else if (level === "level 1") {
    levelOne.draw();
  } else if (level === "level 2") {
    levelTwo.draw(); 
  } else if (level === "winning") {
    winning.draw();
  } else if (level === "loosing") {
    loosing.draw();
  }

  // LEVEL 1 if the player touches the monster and looses
  if (levelOne && levelOne.player.collisionCheck(levelOne.monster)) {
    levelOne.freeze();
    level = "loosing";
  }

  // LEVEL 2 if the player touches the monster or falls down and looses
  if (levelTwo.player.collisionCheck(levelTwo.monster) || levelTwo.player.y > 380) {
    levelTwo.freeze();
    level = "loosing";
  }

  // LEVEL 1 if the player touches the end point and wins
  if (levelOne && levelOne.myEndPoint.collisionCheck(levelOne.player)) {
    levelOne.freeze();
    level = "level 2";
    levelOne = null;
    wonLevelOne = true; 
  }

  // LEVEL 2 if the player touches the end point and wins 
  if (levelTwo.myEndPoint.collisionCheck(levelTwo.player)) {
    levelTwo.freeze();
    level = "winning";
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (levelOne && levelOne.textBox.active) {
      levelOne.textBox.messageIndex++;
    } else if (levelTwo.textBox.active) {
      levelTwo.textBox.messageIndex++;
    } else {
      levelOne && levelOne.player.jump();
      levelTwo.player.jump();   
    }
  }
}

function keyReleased() {
  if (keyCode === 39 || keyCode === 37) {
    levelOne && levelOne.player.reset();
    levelTwo.player.reset();
  }
}

function startGame() {
  startGameButton.hide();
  level = "level 1";
}

function restartLevel() {
  levelOne.reset();
  levelTwo.reset();
  if (wonLevelOne) {
    level = "level 2"; 
  } else {
    level = "level 1";
  }
  if (restartGameButton) { restartGameButton.hide(); }
  if (restartLevelButton) { restartLevelButton.hide(); }
}

function restartGame() {
  levelOne.reset();
  levelTwo.reset();
  level = "beginning";
  wonLevelOne = false;
  if (restartGameButton) { restartGameButton.hide(); }
  if (restartLevelButton) { restartLevelButton.hide(); }
  if (learnMoreLink) { learnMoreLink.hide(); }
}