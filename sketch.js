var lionGroup, bulletGroup, treeGroup;
var gameState = "start";
var done=0;
var restart;

function preload(){

  bgImg = loadImage("images/bg.png")
  rabbitImg = loadImage("images/rabbit.png")
  treeImg = loadImage("images/tree.png")
  lionImg = loadImage("images/lion.png")
  bulletImg = loadImage("images/bullet.png")
  restartImg = loadImage("images/reset.png")

  overSound = loadSound("sounds/game over.mp3")
  jumpSound = loadSound("sounds/jump.mp3")

  //overSound.looping=false;
}

function setup() {

  createCanvas(1200,700);
  rabbit=createSprite(200, 200, 50, 50);
  rabbit.addImage("rabbit",rabbitImg)
  rabbit.scale=0.5
rabbit.debug=true
 rabbit.setCollider("rectangle",0,40,200,300) 

 lionGroup=new Group();
 bulletGroup=new Group();
 treeGroup=new Group();

ground = createSprite(600,670,1200,20)
ground.visible=false;

restart = createSprite(270,200,10,10)
restart.addImage("restart",restartImg)
restart.scale=0.5
restart.visible=false;
}

function draw() {

  background(bgImg);  

  if(gameState==="start"){

  
  
  if(keyDown("space")){
    rabbit.velocityY=-10
    jumpSound.play();
  }
  rabbit.velocityY=rabbit.velocityY+0.8

  
  spawnTrees();
  spawnLions();
  spawnbullet();

  if(treeGroup.isTouching(rabbit)||bulletGroup.isTouching(rabbit)||lionGroup.isTouching(rabbit)|| rabbit.isTouching(ground))
gameState="end"
  }
else if(gameState==="end"){

  
  reset()
}
  drawSprites();
//text(mouseX+" "+mouseY,mouseX,mouseY)
}
function spawnTrees (){
  if(frameCount%60===0){
    var tree= createSprite(1200,680,20,20)
    tree.addImage(treeImg)
  tree.scale=0.5
    tree.velocityX= -4

    tree.lifetime=300;


    treeGroup.add(tree);
    //tree.debug=true
  }
  
}
function spawnLions (){
  if(frameCount%100===0){
    var lion= createSprite(1200,200,20,20)
    lion.y=random(50,500)
    lion.addImage(lionImg)
  lion.scale=0.3
    lion.velocityX= -4
    
lion.lifetime=300;

    //lion.debug=true
    lion.setCollider("rectangle",0,50,200,300)
    lionGroup.add(lion);
  }
  
}
function spawnbullet (){
  if(frameCount%150===0){
    var bullet= createSprite(1200,200,20,20)
    bullet.y=random(5,500)
    bullet.addImage(bulletImg)
  bullet.scale=0.3
    bullet.velocityX= -5

    bullet.lifetime=300;

    //bullet.debug=true
    bullet.setCollider("circle",-130,20,35)
bulletGroup.add(bullet);

  }
  
}
function reset(){
  if(done===0){
  overSound.play();
  }
  done=1;
  treeGroup.setVelocityXEach(0)
  bulletGroup.setVelocityXEach(0)
  lionGroup.setVelocityXEach(0)
  treeGroup.setLifetimeEach(-1)
  bulletGroup.setLifetimeEach(-1)
  lionGroup.setLifetimeEach(-1)
  
  rabbit.velocityY=0

 fill ("purple")
  textSize(100)
  text("GaMe OvEr!!",width/2,height/2)
  //overSound.looping=false;

  restart.visible=true;

  if(mousePressedOver(restart)){
    rest()  
  }

}

function rest()
{
   restart.visible=false;
    
    treeGroup.destroyEach();
    lionGroup.destroyEach();
    bulletGroup.destroyEach();
    rabbit.y=100;
    gameState="start"

}