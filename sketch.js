var road, roadImg;
var horse, horseImg;
var Whorse, WhorseImg, WhorseG;
var hay, hayImg, hayG
var stick,stickG,stickImg
var restart
var gameOver, gameOverImg
var score=0
var endImg
var gameState = 1;
var END =0;
var PLAY =1;


function preload(){
    roadImg = loadImage("Road.png");
    horseImg = loadAnimation("black horse.png","black horse 2.png" );
    WhorseImg = loadImage("white_horse.png");
    hayImg = loadImage("HAY.png");
    stickImg= loadImage("stick.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png")
    }


function setup() {
    createCanvas(windowWidth,windowHeight);;
    // Moving background
    road=createSprite(100,200);
    road.addImage(roadImg);
    road.velocityX=-5;

    horse=createSprite(70,140);
horse.addAnimation("running",horseImg);
horse.scale=0.1;
horse.velocityX=0.5;

gameOver = createSprite(700,200);
  gameOver.addImage( gameOverImg);
  
  restart = createSprite(700,240);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  WhorseG =new Group();
hayG=new Group();
stickG=new Group();

}

function draw() {
 //horse.debug = true;
 if(gameState===PLAY){

    background(0);
     horse.y=World.mouseY;
   
     if(road.x < 0 ){
       road.x = width/2;
     }
     edges= createEdgeSprites();
     horse.collide(edges);
   
     var select_oppPlayer = Math.round(random(1,3));
     if (World.frameCount % 150 == 0) {
       if (select_oppPlayer == 1) {
           spawnWhorse();
       } 
       else if (select_oppPlayer == 2) {
       spawnhay();
       } 
       else
        if (select_oppPlayer == 3) {
           spawnstick();
         }
       
       }
       if (hayG.isTouching(horse)) {
        hayG.destroyEach();
        score=score+30
        horse.velocityX=horse.velocityX+0.5
     }
     else if (stickG.isTouching(horse)) {
        stickG.destroyEach();
       score=score-10
       horse.velocityX=horse.velocityX-0.2
    
    }

    if(WhorseG.isTouching(horse)) {
        gameState=END;
        }
        
    }
       else if (gameState === END) {
        
        horse.velocityX=0;
        road.velocityX= 0;

        gameOver.visible = true;
        restart.visible = true;
                 
        hayG.destroyEach();
        stickG.destroyEach();
        WhorseG.destroyEach();
        hayG.setVelocityYEach(0);
        stickG.setVelocityYEach(0);
        WhorseG.setVelocityYEach(0);
       
       if(mousePressedOver(restart)) {
          reset();
          horse.velocityX=0;
          road.velocityX= -5;
        }
    }

    
     drawSprites();
     textSize(20);
     fill(250);
     text("SCORE: "+ score,10,30);
    }
 

function spawnWhorse(){

    Whorse =createSprite(900,Math.round(random(50, 250)))
    Whorse.scale =0.06;
    Whorse.velocityX = -3
    Whorse.addAnimation("running",WhorseImg);
    Whorse.setLifetime=170;
    WhorseG.add(Whorse);
   
}

function spawnhay(){
    
    hay =createSprite(1000,Math.round(random(50, 250)))
    hay.scale =0.04;
    hay.velocityX = -3
    hay.addImage (hayImg);
    hay.setLifetime=170;
    hayG.add(hay);
}
function spawnstick(){
    
    stick =createSprite(1200,Math.round(random(50, 250)))
    stick.scale =0.04;
    stick.velocityX = -3
    stick.addImage (stickImg);
    stick.setLifetime=170;
    stickG.add(stick);
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    hayG.destroyEach();
    stickG.destroyEach();
    WhorseG.destroyEach();
    horse.changeAnimation("horseRunning",horseImg);
    
    score = 0;
    
  }