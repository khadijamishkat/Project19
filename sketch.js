var PLAY = 1
var END = 0
var gameState = PLAY
var boy, boy_running
var obstaclesGroup, obstacle1, obstacle2, obstacle3
var ground, groundImg
var gameOver, gameOverImg
var invisibleGround
var score

function preload(){
boy_running = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png")

groundImg = loadImage("road.png")

obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle3.png")

gameOverImg = loadImage("gameover.gif")
}

function setup() {
    createCanvas(windowWidth,windowHeight)

    boy = createSprite(50,height-20,20,50)
    boy.addAnimation("running", boy_running)
    boy.scale = 0.5

    ground = createSprite(width/2,height-20,width,20)
    //ground.addImage("ground", groundImg)
    ground.x = ground.width/2

    gameOver = createSprite(width/2,height/2)
    gameOver.addImage(gameOverImg)

    gameOver.scale = 0.5
    gameOver.visible = false

    invisibleGround = createSprite(width/2,height-10,width,10);
    invisibleGround.visible = false;

    obstaclesGroup = new Group()

    score = 0
}

function draw() {
 background(groundImg)
 text("Score,"+score, 500,50)

 if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/200);
  
    if(keyDown("space") && boy.y >= 159) {
      boy.velocityY = -12;
    }
  
    boy.velocityY = boy.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    } 

    spawnObstacles()

    if(obstaclesGroup.isTouching(boy)){
        gameState = END;
    }
 }

 else if (gameState === END) {
    gameOver.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
  }

  boy.collide(invisibleGround);  
  drawSprites();
}

function spawnObstacles(){
    if(frameCount % 60 === 0) {
        var obstacle = createSprite(600,height-40,20,30);
        //obstacle.debug = true;
        obstacle.velocityX = -(6 + 3*score/100);
        obstacle.scale = 0.5
        
        //generate random obstacles
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                  break;
           default: break;
        }
        obstaclesGroup.add(obstacle)
        obstacle.scale = 0.10;
        obstacle.lifetime = 300;
        obstaclesGroup.add(obstacle);
    }
}
 
