// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var height = 400;
var width = 790;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'game', stateActions);
// the scaffolding for Phaser is here
var score=0;
var labelScore;
var player;
var pipes = [];
var gameGravity = 400;
var pipeIntervalSetter = 2;
var gameSpeed = 200;
var jumpPower = 150;
var gapSize = 120;
var gapMargin = 50;
var blockHeight = 50;
var pipeEndHeight = 25
var pipeEndExtraWidth = 10
var pipeInterval = 1.75;




/*
 * Loads all resources for the game and gives them names.
 */
function preload() {


game.load.image("Flapper", "../assets/ducker.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock", "../assets/pipe2-body.png");
game.load.image("pipeEnd", "../assets/pipe-end.png");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
  game.stage.setBackgroundColor("#5ecaeb");

  player = game.add.sprite(50, 50, "Flapper");

  player.anchor.setTo(0.5, 0.5);

  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.physics.arcade.enable(player);

  player.body.gravity.y = gameGravity;

  //game.add.text(300, 75, "It's Flapping Time!", {font: "30px Agency FB", fill: "#000000"});

 game.input.keyboard.addKey(Phaser.Keyboard.UP)
 .onDown.add(movePlayerUp);

 game.input.onDown.add(playerJump);

 labelScore=game.add.text(700, 50, "0");

    // set the game colour of the scene
  game.input.onDown.add(clickHandler);

 game.input.keyboard
 .addKey(Phaser.Keyboard.SPACEBAR)
 .onDown.add(playerJump);

 var pipeInterval = pipeIntervalSetter * Phaser.Timer.SECOND;
game.time.events.loop(
pipeInterval,
generatePipe
);

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

  player.rotation += 1;
  player.rotation = Math.atan(player.body.velocity.y / 200);

  game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);

  if (player.y < 0 || player.y > 400) {
    gameOver();


  }

}


function clickHandler(event) {
  game.add.sprite(event.x, event.y, "Flapper");
  game.add.text(event.x+50, event.y, "Virus Installed", {font: "30px Agency FB", fill: "#000000"});
 playerJump();

}

function spaceHandler() {

 game.sound.play("score");

}

function changeScore(){

  score=score+1;
 labelScore.setText(score.toString());


}


function movePlayerUp() {
  player.y--;

}

function changeGravity(g){
  gameGravity += g;
  player.body.velocity.x = -200;
}

function playerJump() {
 player.body.velocity.y = -jumpPower;
}

function generate() {

}
 //  var diceRoll = game.rnd.integerInRange(1, 10);
 // if(diceRoll==1) {
 // generateBalloons();
 // } else if(diceRoll==2) {
 // generateWeight();
 // } else {
 // generatePipe();
 // }

// function generateBalloons(){
//  var bonus = game.add.sprite(width, height, "balloons");
//  balloons.push(bonus);
//  game.physics.arcade.enable(bonus);
//  bonus.body.velocity.x = ‐ 200;
//  bonus.body.velocity.y = ‐ game.rnd.integerInRange(60, 100);
// }

function addPipeBlock(x, y) {
   var pipeBlock = game.add.sprite(x,y,"pipeBlock");
   pipes.push(pipeBlock);
   game.physics.arcade.enable(pipeBlock);
   pipeBlock.body.velocity.x = -200;
}

function addPipeEnd(x, y) {
   var pipeEnd = game.add.sprite(x,y,"pipeEnd");
   pipes.push(pipeEnd);
   game.physics.arcade.enable(pipeEnd);
   pipeEnd.body.velocity.x = -200;
}

function generatePipe() {
 //   var gap = game.rnd.integerInRange(1 ,5);
 //   for (var count = 0; count < 8; count++) {
 //     if (count != gap && count != gap+1) {
 //       addPipeBlock(750, count * 50);
 //     }
 //     }
 //   changeScore();
 // }
   var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
   addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);
   for(var y = gapStart; y > 0; y -= blockHeight) {
   addPipeBlock(width, y - blockHeight);
   }
   addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
   for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
   addPipeBlock(width, y);
   }
   changeScore();
}


function gameOver(){
  location.reload();
}
