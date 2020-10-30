const message = document.querySelector(".message");
const restartBtn = document.querySelector(".restart");

function preload() {
  playerIdle = loadSpriteSheet("/assets/player/idle.png", 32, 32, 11);
  playerRunRight = loadSpriteSheet("/assets/player/runRight.png", 32, 32, 12);
  playerRunLeft = loadSpriteSheet("/assets/player/runLeft.png", 32, 32, 12);
  playerJump = loadSpriteSheet("/assets/player/jump.png", 32, 32, 1);
  playerDblJump = loadSpriteSheet("/assets/player/doubleJump.png", 32, 32, 6);

  monsterRunRight = loadSpriteSheet("/assets/monster/runRight.png", 44, 30, 10);
  monsterRunLeft = loadSpriteSheet("/assets/monster/runLeft.png", 44, 30, 10);
  endPoint = loadSpriteSheet("/assets/terrain/endPoint.png", 64, 64, 17);
  bgImage = loadImage("/assets/terrain/bckg-test.png");

  playerIdleAnimation = loadAnimation(playerIdle);
  playerRunRightAnimation = loadAnimation(playerRunRight);
  playerRunLeftAnimation = loadAnimation(playerRunLeft);
  playerJumpAnimation = loadAnimation(playerJump);
  playerDblJumpAnimation = loadAnimation(playerDblJump);

  monsterRunRightAnimation = loadAnimation(monsterRunRight);
  monsterRunLeftAnimation = loadAnimation(monsterRunLeft);
  endPointAnimation = loadAnimation(endPoint);
}

const game = new Game();

function setup() {
  createCanvas(WIDTH, 500);
  game.setup();
}

function draw() {
  clear();
  background("thistle");
  game.draw();

  if (game.player.collisionCheck(game.monster)) {
    message.innerText = "GAME OVER!";
    noLoop();
  }

  if (game.player.collisionCheck(game.myEndPoint)) {
    message.innerText = "YOU WIN!";
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.jump();
  }
}

function keyReleased() {
  if (keyCode === 39 || keyCode === 37) {
    game.player.reset();
  }
}

restartBtn.onclick = () => {
  message.innerText = "";
  game.player.spawn();
  game.monster.spawn();
  loop();
};
