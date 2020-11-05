class TextBox {
  constructor() {
    this.messages = [];
    this.messageIndex = 0;
    this.active = false; 
    this.onClose = null;
  }

  setup() {
    textFont(gameFont);
    textSize(8);
    textAlign(CENTER);
  }

  open(arr) {
    this.messages = arr;
    this.messageIndex = 0;
    this.active = true;
  }

  close() {
    this.messages = [];
    this.messageIndex = 0;
    this.active = false; 
    if (this.onClose) {
      this.onClose();
    }
    this.onClose = null;
  }

  findTheMonsterMsg(str, speaker) {
    let monsterMsg = ''; 
    if (str.split(' ')[0] === speaker) {
      monsterMsg = str.split(' ');
      monsterMsg.shift();
    }
    return monsterMsg ? monsterMsg.join(' ') : false; 
  }

  draw(player, monster, monster2) {
    if (this.active) {
      if (!this.messages[this.messageIndex]) {
        this.close();
        return;
      }

      const msg = this.messages[this.messageIndex];
      const monsterMsg = this.findTheMonsterMsg(msg, 'monster:');
      const niceMonsterMsg1 = this.findTheMonsterMsg(msg, 'niceMonster1:');
      const niceMonsterMsg2 = this.findTheMonsterMsg(msg, 'niceMonster2:');

      if (!monsterMsg && !niceMonsterMsg1 && !niceMonsterMsg2) {

        let xPosition = player.x; 
        if (xPosition < 80) { xPosition = 80; }
        textSize(6);
        let msgBox = gameFont.textBounds(msg, xPosition, player.y - 30);
        fill(255);
        stroke(0);
        rect(msgBox.x-5, msgBox.y-5, msgBox.w+10, msgBox.h+10);
        fill(0);
        noStroke();

        text(msg, xPosition, player.y - 30);
        fill(0, 102, 153); 

      } else if (monsterMsg && !niceMonsterMsg1 && !niceMonsterMsg2) {

        let xPosition = monster.x; 
        if (xPosition < 150) { xPosition = 150; }
        textSize(6);
        let msgBox = gameFont.textBounds(monsterMsg, xPosition, monster.y - 40);
        fill(255);
        stroke(0);
        rect(msgBox.x-5, msgBox.y-5, msgBox.w+10, msgBox.h+10);
        fill(0);
        noStroke();

        text(monsterMsg, xPosition, monster.y - 40);
        fill(0, 102, 153); 

      } else if (niceMonsterMsg1 && !monsterMsg && !niceMonsterMsg2) {

        let xPosition = monster.x; 
        if (xPosition < 150) { xPosition = 150; }
        textSize(6);
        let msgBox = gameFont.textBounds(niceMonsterMsg1, xPosition, monster.y - 30);
        fill(255);
        stroke(0);
        rect(msgBox.x-5, msgBox.y-5, msgBox.w+10, msgBox.h+10);
        fill(0);
        noStroke();

        text(niceMonsterMsg1, xPosition, monster.y - 30);
        fill(0, 102, 153);

      } else if (niceMonsterMsg2 && !monsterMsg && !niceMonsterMsg1) {

        let xPosition = monster2.x; 
        if (xPosition < 150) { xPosition = 150; }
        textSize(6);
        let msgBox = gameFont.textBounds(niceMonsterMsg2, xPosition, monster2.y - 30);
        fill(255);
        stroke(0);
        rect(msgBox.x-5, msgBox.y-5, msgBox.w+10, msgBox.h+10);
        fill(0);
        noStroke();

        text(niceMonsterMsg2, xPosition, monster2.y - 30);
        fill(0, 102, 153); 

      }
    }
  }
}