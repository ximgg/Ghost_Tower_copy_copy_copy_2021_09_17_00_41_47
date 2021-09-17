var gameState= "play";
var tower, towerImg;
var door,doorImg, doorsGroup;
var climber,climberImg,climbersGroup;
var ghost, ghostImg;
var invisibleblockGroup,invisibleblock;
var sound;

function preload(){
  towerImg= loadImage("tower.png");
  doorImg= loadImage("door.png");
  climberImg= loadImage("climber.png");
  ghostImg= loadImage("ghost-standing.png");
  sound=loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  
  sound.loop();
  
  tower= createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleblockGroup= new Group();
}

function draw() {
  background("#99CCFF");
  if(gameState==="play"){
     if(tower.y>400){
     tower.y=300;
     }
  if(keyDown("RIGHT_ARROW")){
     ghost.x=ghost.x+3
    
     }
  if(keyDown("LEFT_ARROW")){
     ghost.x=ghost.x-3;
     }
  if(keyDown("Space")){
     ghost.velocityY=-5;
     }
  ghost.velocityY=ghost.velocityY + 0.8;
  
  if(climbersGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
     ghost.destroy();
    gameState="end";
     }
    spawndoor();
    drawSprites();
     }
  
  if(gameState==="end"){
     stroke("#FFCCCC");
    fill("black");
    textSize(50);
    text("GAME OVER",150,300);
     }
  
  
  
}

function spawndoor(){
  if(frameCount%240===0){
     var door= createSprite(200,-50);
    door.addImage(doorImg);
    var climber= createSprite(200,10);
    climber.addImage(climberImg);
    var invisibleblock= createSprite(200,15);
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    climber.x=door.x;
    climber.velocityY=1;
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
    ghost.depth=door.depth;
    ghost.depth+=1;
    climber.lifetime=600
    door.lifetime=600;
    invisibleblock.debug=true;
    invisibleblockGroup.add(invisibleblock);
    doorsGroup.add(door);
    climbersGroup.add(climber);
     }
}
