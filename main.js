function preload() {
  // loading spritesheets
  playerIdle = loadSpriteSheet("./assets/player/idle.png", 32, 32, 11);
  playerIdleLeft = loadSpriteSheet("./assets/player/idleLeft.png", 32, 32, 11);
  playerRunRight = loadSpriteSheet("./assets/player/runRight.png", 32, 32, 12);
  playerRunLeft = loadSpriteSheet("./assets/player/runLeft.png", 32, 32, 12);
  playerJump = loadSpriteSheet("./assets/player/jump.png", 32, 32, 1);
  playerDblJump = loadSpriteSheet("./assets/player/doubleJump.png", 32, 32, 6);
  playerJumpLeft = loadSpriteSheet("./assets/player/jumpLeft.png", 32, 32, 1);
  playerDblJumpLeft = loadSpriteSheet("./assets/player/doubleJumpLeft.png", 32, 32, 6);
  monsterRunRight = loadSpriteSheet("./assets/monster/runRight.png", 44, 30, 10);
  monsterRunLeft = loadSpriteSheet("./assets/monster/runLeft.png", 44, 30, 10);
  endPoint = loadSpriteSheet("./assets/terrain/endPoint.png", 64, 64, 17);
  torchOn = loadSpriteSheet("./assets/terrain/torchOn.png", 16, 32, 3);
  torchOff = loadSpriteSheet("./assets/terrain/torchOff.png", 16, 32, 1);
  playerFall = loadSpriteSheet("./assets/player/fall.png", 32, 32, 1);
  transformRunLeft = loadSpriteSheet("./assets/monster/newMonster/radishRunLeft.png", 30, 38, 12); 
  transformRunRight = loadSpriteSheet("./assets/monster/newMonster/radishRunRight.png", 30, 38, 12);
  appearing = loadSpriteSheet("./assets/effects/appearing.png", 96, 96, 7);
  disappearing = loadSpriteSheet("./assets/effects/disappearing.png", 96, 96, 7);

  // loading images, fonts, songs 
  bgGeneral = loadImage("./assets/terrain/Background-dark.png");
  bgIntro = loadImage("./assets/terrain/Intro.png");
  bgLevelOne = loadImage("./assets/terrain/Level1.png");
  bgLevelOneDark1 = loadImage("./assets/terrain/Dark-Level1-1.png");
  bgLevelOneDark2 = loadImage("./assets/terrain/Dark-Level1-2.png");
  bgLevelTwo = loadImage("./assets/terrain/Level2.png");
  bgLevelThree = loadImage("./assets/terrain/Level3.png");
  bgConclusion = loadImage("./assets/terrain/Conclusion.png");
  platform = loadImage("./assets/terrain/platform.png");
  spikeBall = loadImage("./assets/terrain/spikeBall.png");
  gameFont = loadFont("./assets/font/PressStart2P-Regular.ttf");
  songIntro = loadSound("./assets/music/introMusic.mp3"); 

  // loading animations 
  playerIdleAnimation = loadAnimation(playerIdle);
  playerIdleLeftAnimation = loadAnimation(playerIdleLeft);
  playerRunRightAnimation = loadAnimation(playerRunRight);
  playerRunLeftAnimation = loadAnimation(playerRunLeft);
  playerJumpAnimation = loadAnimation(playerJump);
  playerDblJumpAnimation = loadAnimation(playerDblJump);
  playerJumpLeftAnimation = loadAnimation(playerJumpLeft);
  playerDblJumpLeftAnimation = loadAnimation(playerDblJumpLeft);
  monsterRunRightAnimation = loadAnimation(monsterRunRight);
  monsterRunLeftAnimation = loadAnimation(monsterRunLeft);
  endPointAnimation = loadAnimation(endPoint);
  torchOnAnimation = loadAnimation(torchOn);
  torchOffAnimation = loadAnimation(torchOff);
  playerFallAnimation = loadAnimation(playerFall);
  transformRunLeftAnimation = loadAnimation(transformRunLeft);
  transformRunRightAnimation = loadAnimation(transformRunRight); 
  appearingAnimation = loadAnimation(appearing);
  disappearingAnimation = loadAnimation(disappearing);
}

// initializing classes 
const intro = new Intro();
const levelOne = new LevelOne();
const levelTwo = new LevelTwo();
const levelThree = new LevelThree();
const winning = new Winning();
const loosing = new Loosing(); 

// initializing the level
let wonLevelOne = false; 
let wonLevelTwo = false; 

// initializing the music and DOM elements
let volume = 0; 
const soundButton = document.querySelector(".soundButton"); 
const footer = document.querySelector(".footer"); 

function setup() {
  createCanvas(WIDTH, HEIGHT);
  footer.style.display = "flex";
  soundButton.style.display = "flex";
  levelOne.setup();
  levelTwo.setup();
  levelThree.setup();
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
  } else if (level === "level 3") {
    levelThree.draw();
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

  // LEVEL 2 if the player touches the monster or falls down or touches the spike moving in the middle and looses
  if (levelTwo.player.collisionCheck(levelTwo.monster) || levelTwo.player.y > 380 || levelTwo.player.collidesWithSpike(levelTwo.spike)) {
    levelTwo.monster.freeze();
    levelTwo.player.die();
  }

  // LEVEL 3 if the player touches the monsters and looses 
  if (levelThree.player.collisionCheck(levelThree.monster1) || levelThree.player.collisionCheck(levelThree.monster2)) {
    levelThree.monster1.freeze();
    levelThree.monster2.freeze();
    levelThree.player.die();
  }
  
  // LEVEL 1 if the player touches the end point and wins
  if (levelOne.myEndPoint.collisionCheck(levelOne.player) && level === "level 1") {
    levelOne.freeze();
    level = "level 2";
    wonLevelOne = true; 
  }

  // LEVEL 2 if the player touches the end point and wins 
  if (levelTwo.myEndPoint.collisionCheck(levelTwo.player) && level === "level 2") {
    levelTwo.freeze();
    level = "level 3";
    wonLevelTwo = true; 
  }

  // LEVEL 3 if the player finalizes the story and wins 
  if (levelThree.myEndPoint.collisionCheck(levelThree.player)) {
    levelThree.winning = true; 
  }

  if (levelThree.monsterConversation === true) {
    level = "winning";
  }
}

function keyPressed() {
  if (keyCode === 32) {
    
    // press "space" to go through text boxes 
    if (levelOne.textBox.active) {
      levelOne.textBox.messageIndex++;
    } else if (levelTwo.textBox.active) {
      levelTwo.textBox.messageIndex++;
    } else if (levelThree.textBox.active) {
      levelThree.textBox.messageIndex++;
    } else {

      // press "space" to jump 
      if (level === "level 1") {
        levelOne.player.jump();
      } else if (level === "level 2") {
        levelTwo.player.jump();   
      } else if (level === "level 3") {
        levelThree.player.jump();
      }
    }
  }
}

// to reset the player to idle animation after moving
function keyReleased() {
  if (keyCode === 39) {
    if (level === "level 1") {
      levelOne.player.reset("right");
    } else if (level === "level 2") {
      levelTwo.player.reset("right");
    } else if (level === "level 3") {
      levelThree.player.reset("right");
    }
  } else if (keyCode === 37) {
    if (level === "level 1") {
      levelOne.player.reset("left");
    } else if (level === "level 2") {
      levelTwo.player.reset("left");
    } else if (level === "level 3") {
      levelThree.player.reset("left");
    }
  }
}

// function attached to the "start game" button
function startGame() {
  startGameButton.hide();
  level = "level 1";
}

// function attached to the "restart level" button
function restartLevel() {
  levelOne.reset();
  levelTwo.reset();
  levelThree.reset();
  if (wonLevelOne && wonLevelTwo) {
    level = "level 3"; 
  } else if (wonLevelOne && !wonLevelTwo) {
    level = "level 2";
  } else {
    level = "level 1"; 
  }
  if (restartGameButton) { restartGameButton.hide(); }
  if (restartLevelButton) { restartLevelButton.hide(); }
}

// function attached to the "restart game" button
function restartGame() {
  levelOne.reset();
  levelTwo.reset();
  levelThree.reset();
  level = "beginning";
  wonLevelOne = false;
  wonLevelTwo = false; 
  if (restartGameButton) { restartGameButton.hide(); }
  if (restartLevelButton) { restartLevelButton.hide(); }
  if (learnMoreLink) { learnMoreLink.hide(); }
}

// functions to play song and change the sound button 
soundButton.addEventListener("click", () => {
  if (volume === 0.5) {
    soundButton.innerHTML = '<i class="fas fa-volume-down"></i>';
    volume = 0.1; 
    songIntro.setVolume(volume);
  } else if (volume === 0.1) {
    soundButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volume = 0; 
    songIntro.stop();
  } else if (volume === 0) {
    soundButton.innerHTML = '<i class="fas fa-volume-up"></i>';
    volume = 0.5; 
    songIntro.loop();
    songIntro.play();
    songIntro.setVolume(volume);
  }
  soundButton.blur(); 
});