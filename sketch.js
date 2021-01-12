var rocket, rocketImage, rocketSound;
var meteor, meteorImage, meteorGroup;
// var sky, skyImage;
var star, starImage, starGroup;
var score = 0;
var gameState = true;
function preload() {
  
  rocketImage = loadImage("rocket.png");
  meteorImage = loadImage("meteor.png");
  //skyImage = loadImage("sky.gif");
  starImage = loadImage("star.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  /*sky = createSprite(width / 2, height / 2, 20, 20);
  sky.addImage("sky", skyImage);
  sky.scale = width / 800;*/
  
  rocket = createSprite(width / 2, height - 100, 20, 20);
  rocket.addImage("we have liftoff", rocketImage);
  rocket.scale = width / 12500;
  
  starGroup = new Group();
  meteorGroup = new Group();
  
}

function draw() {
  background("black");
  
  drawSprites();
  if(rocket.isTouching(meteorGroup)) {
    rocket.destroy();
    meteorGroup.destroyEach();
    gameState = false;
  }
  if(gameState) {
    //drawSprites();
    control();
    meteors();
    stars();
    score += Math.round(getFrameRate() / 60);
  }
  else {
    text("U DED", (width / 2) - 12.5, height / 2);
  }
  //text("X: " + mouseX + ", Y: " + mouseY, mouseX, mouseY);
  text(score, width - 60, height - 60);
}
function control() {
  if(keyDown("a") && rocket.x > 0 || keyDown("left") && rocket.x > 0) {
    rocket.x -= 15;
  }
  if(keyDown("d") && rocket.x < width|| keyDown("right") && rocket.x < width) {
    rocket.x += 15;
  }
}
function meteors() {
  var r = Math.round(random(0, width))
  if(frameCount % 1 == 0) {
    meteor = createSprite(r, 0, 20, 20);
    meteor.addImage("BOOOOM!", meteorImage);
    meteor.scale = 0.45;
    meteorGroup.add(meteor)
    if(score < 300) {
      meteor.velocityY = score / 15;
      meteor.lifetime = height / (score / 15);
    }
    else {
      meteor.velocityY = 30;
      meteor.lifeTime = 30;
    }
    
  }
}
function stars() {
  var r = Math.round(random(0, width));
  if(frameCount % 1 == 0) {
    star = createSprite(r, 0, 5, 5);
    star.velocityY = 1000;
    star.lifetime = height / 1000
    star.addImage("bright", starImage);
    starGroup.add(star);
  }
}
  
