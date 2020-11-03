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
  playerFall = loadSpriteSheet("/assets/player/fall.png", 32, 32, 1);

  // loading images, fonts 
  bgGeneral = loadImage("/assets/terrain/Background.png");
  bgIntro = loadImage("/assets/terrain/Intro.png");
  bgLevelOne = loadImage("/assets/terrain/Level1.png");
  bgLevelOneDark1 = loadImage("/assets/terrain/Dark-Level1-1.png");
  bgLevelOneDark2 = loadImage("/assets/terrain/Dark-Level1-2.png");
  bgLevelTwo = loadImage("/assets/terrain/Level2.png");
  bgConclusion = loadImage("/assets/terrain/Conclusion.png");
  platform = loadImage("/assets/terrain/platform.png");
  spikeBall = loadImage("/assets/terrain/spikeBall.png");
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
  playerFallAnimation = loadAnimation(playerFall);
}

// initializing classes 
const intro = new Intro();
const levelOne = new LevelOne();
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
  if (levelOne.player.collisionCheck(levelOne.monster)) {
    levelOne.monster.freeze();
    levelOne.player.die();
  }

  if (levelOne.player.y > HEIGHT) {
    level = "loosing";
  }

  // LEVEL 2 if the player touches the monster or falls down and looses
  if (levelTwo.player.collisionCheck(levelTwo.monster)) {
    levelTwo.freeze();
    level = "loosing";
  }

  if (levelTwo.player.y > 380) {
    levelTwo.freeze();
    level = "loosing";
  }

  if (levelTwo.player.collisionCheck(levelTwo.spike)) {
    levelTwo.freeze;
    level = "loosing";
  }

  // LEVEL 1 if the player touches the end point and wins
  if (levelOne.myEndPoint.collisionCheck(levelOne.player) && level === "level 1") {
    levelOne.freeze();
    level = "level 2";
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
    if (levelOne.textBox.active) {
      levelOne.textBox.messageIndex++;
    } else if (levelTwo.textBox.active) {
      levelTwo.textBox.messageIndex++;
    } else {
      if (level === "level 1") {
        levelOne.player.jump();
      } else if (level === "level 2") {
        levelTwo.player.jump();   
      }
    }
  }
}

function keyReleased() {
  if (keyCode === 39 || keyCode === 37) {
    if (level === "level 1") {
      levelOne.player.reset();
    } else if (level === "level 2") {
      levelTwo.player.reset();
    }
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