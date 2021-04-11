var seaImage, seaImage1, seaImage2, seaImage3, sea;
var iceberg1, iceberg, icebergGroup, iceberg2, iceberg3, iceberg4, iceberg5, iceberg6;
var start; startImage;

var boat, boatImage, boatExplosionImage;
var island, islandImage;

var gameState = 0;
var spookySound;

var score = 0;


function preload(){
  seaImage = loadImage("sea 4.png");
  seaImage1 = loadImage("sea 6.png");
  seaImage2 = loadImage("sea 7.png");
  seaImage3 = loadImage("sea 2.png");


  iceberg1 = loadImage("iceberg1.png");
  iceberg2 = loadImage("iceberg2.png");
  iceberg3 = loadImage("iceberg3.png");
  iceberg4 = loadImage("iceberg4.png");
  iceberg5 = loadImage("iceberg5.png");
  iceberg6 = loadImage("iceberg6.png");
  
  boatImage = loadImage("boat.png");
  boatExplosionImage = loadImage("explosion 1.png");
  
  spookySound = loadSound("spooky.wav");

  islandImage = loadImage("island picture.png");
  startImage = loadImage("start.png");
}


function setup(){
  createCanvas(displayWidth,displayHeight);
  //spookySound.loop();


 start = createSprite(displayWidth/2, displayHeight/2, 20,20);
 start.addImage(startImage);
  
    sea = createSprite(displayWidth/2,displayHeight);
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: sea.addImage(seaImage);
                break;
        case 2: sea.addImage(seaImage1);
                break;
        case 3: sea.addImage(seaImage2);
                break;
        case 4: sea.addImage(seaImage3);
                break;
        default: break;
      }
      sea.velocityY = 8;
      sea.scale = 5;
      sea.visible = false;
      
      
      icebergGroup = new Group();
    
      island = createSprite(200,-70,200,200);
      island.addImage(islandImage);
      island.scale = 6.5;
      island.visible = false;
      island.setCollider("rectangle",0,0,1000,100);
      //island.debug = true;
      
      
      boat = createSprite(0,500);
      boat.addImage("boat1",boatImage);
      boat.scale = 0.75 ;
      boat.addImage("boat2",boatExplosionImage);
      boat.visible = false;
    
}

function draw(){
  background("black");
  console.log(frameCount);
  //if(gameState === "play"){
    //startGame();
    score = Math.round(frameCount/20);
  startGame();

  if(sea.y>400){
    sea.y = 300;
  }
  
  
  
  if(icebergGroup.isTouching(boat)){
    boat.changeImage("boat2",boatExplosionImage);
    gameState = 1;
  }

  
  //boat.debug = true;
  boat.setCollider("rectangle", 0,0,120,195);
  drawSprites();
  score = 0;
 if(frameCount > 200){
  spawnicebergs();
icebergGroup.setVelocityYEach(28);
score = score+Math.round(frameCount/200);
stroke("orange");
strokeWeight(10);
fill("yellow");
textSize(15);
text("SCORE: "+score,50,50);
}
//icebergGroup.setVelocityXEach(Math.round(random(-18,18)));
 
  
 if(gameState === 1) {
     icebergGroup.destroyEach();
     sea.velocityY = 0;
       stroke("white");
       strokeWeight(15);
       fill("purple");
       textSize(50);
       text("YOU SUNK. GOOD LUCK FREEZING TO DEATH", 30, displayHeight/2);
       frameCount = Math.round(score*20);
     }
     else if(score > 10){
      island.visible = true;
      icebergGroup.destroyEach();
      island.velocityY = 5;
      if(boat.isTouching(island)){
        island.velocityY = 0;
        sea.velocityY = 0;
        stroke("white");
       strokeWeight(15);
       fill("purple");
       textSize(50);
       text("YOU HAVE REACHED YOUR DESTINATION!!!", 30, displayHeight/2);
        frameCount = Math.round(score*200);
      }
    }    
     else if(keyDown("left_arrow")){
      boat.x = boat.x - 3;
    }
    else if(keyDown("right_arrow")){
      boat.x = boat.x + 3;
    }
    
  
 
 
    
  
}

function spawnicebergs(){
  if (frameCount%20 === 0){
    iceberg = createSprite(1000,0);
    iceberg.x = Math.round(random(50,1200));
    //iceberg.y = Math.round(random(0,100));
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: iceberg.addImage(iceberg1);
              break;
      case 2: iceberg.addImage(iceberg2);
              iceberg.scale = 5.5;
              break;
      case 3: iceberg.addImage(iceberg3);
              iceberg.scale = 5.5;
              break;
      case 4: iceberg.addImage(iceberg4);
              break;
      case 5: iceberg.addImage(iceberg5);
              break;
      case 6: iceberg.addImage(iceberg6);
              break;
      default: break;
    }
    iceberg.scale = 0.95;
    iceberg.velocityY = 28;
    //iceberg.velocityX = Math.round(random(-18,18));
    //iceberg.debug = true;
    
    iceberg.setCollider("rectangle", 0,0,80,80);
    
    
   
    
    
    iceberg.velocityY = 1;
    iceberg.lifetime = 800;
    icebergGroup.add(iceberg);
    
    
    
    boat.depth = iceberg.depth+1;
  }
}

function startGame(){
  if(mousePressedOver(start)){
    sea.visible = true;
    boat.visible = true;
    boat.x = 300;
    start.visible = false;
   
  }
}