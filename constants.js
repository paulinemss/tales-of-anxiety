// MAIN VARIABLES // 

let WIDTH = 600;
let HEIGHT = 400;
let level = "level 3";

// PLAYER ANIMATIONS // 

let playerIdle;
let playerIdleAnimation;
let playerIdleLeft;
let playerIdleLeftAnimation;
let playerRunRight;
let playerRunRightAnimation;
let playerRunLeft;
let playerRunLeftAnimation;
let playerJump;
let playerJumpAnimation;
let playerDblJump;
let playerDblJumpAnimation;
let playerFall; 
let playerFallAnimation;

// MONSTER ANIMATIONS //

let monsterRunLeft;
let monsterRunLeftAnimation;
let monsterRunRight;
let monsterRunRightAnimation;
let transformRunLeft;
let transformRunLeftAnimation;
let transformRunRight;
let transformRunRightAnimation;

// TERRAIN ANIMATIONS // 

let endPoint;
let endPointAnimation;
let torchOn; 
let torchOnAnimation;
let torchOff;
let torchOffAnimation;
let platform; 
let spikeBall; 

// BACKGROUNDS // 

let bgGeneral; 
let bgIntro; 
let bgLevelOne;
let bgLevelOneDark1; 
let bgLevelOneDark2; 
let bgLevelTwo; 
let bgLevelThree; 
let bgConclusion;

// BUTTONS AND LINKS // 

let startGameButton;
let restartLevelButton;
let restartGameButton;
let learnMoreLink;

// ANXIETY THOUGHTS //

let msgIndex = 0;
let anxietyThoughts = [
  "Nobody really\n likes you at work.\n They think you're weird.",
  "You haven't called\n your parents in\n at least a week",
  "The t-shirt you're\n wearing is probably\n unethically produced",
  "Did you remember\n returning that book\n from the library?",
  'The way you said "hello"\n to your boss sounded\n super weird today.',
  "Probably some people\n somewhere are making\n fun of you right now",
  "Do you remember that\n awkward thing you said\n in high school?",
  "There's probably a\n super important task that\n you have forgotten",
  "Antibiotic resistance\n is a rising problem that\n should concern you",
  "You've been eating way\n too much processed food\n and sugar lately",
  "Your last match on Tinder\n was probably a psychopathic\n serial killer",
  "Everyone think you\n are the most annoying\n person on the planet",
  "What if gravity stops\n working and you fall\n into space forever?",
  "Did you remember to turn\n off the oven before leaving\n home today?"
]; 

