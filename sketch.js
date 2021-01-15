var rocket, rocketImage, rocketSound;
var meteor, meteorImage, meteorGroup;
var star, starImage, starGroup;
var score = 0;
var gameState = true;
function preload() {
  
  rocketImage = loadImage("rocket.png");
  meteorImage = loadImage("meteor.png");
  starImage = loadImage("star.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
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
    rocket.visible = false
    meteorGroup.destroyEach();
    gameState = false;
  }
  if(gameState) {
    control();
    meteors();
    stars();
    score += Math.round(getFrameRate() / 60);
    rocket.visible = true;
  }
  else {
    text("U DED", (width / 2) - 12.5, height / 2);
  }
  
  if(keyDown("r") && gameState == false || keyDown("slash") && gameState == false) {
    rocket.x = width / 2;
    score = 0;
    gameState = true;
  }
  
  text(score, width - 60, height - 60);
}
function control() {
  if(keyDown("a") && rocket.x > 0 || keyDown("left") && rocket.x > 0) {
    rocket.x -= 30;
  }
  if(keyDown("d") && rocket.x < width|| keyDown("right") && rocket.x < width) {
    rocket.x += 30;
  }
}
function meteors() {
  var r = Math.round(random(0, width))
  if(frameCount % 20 == 0) {
    meteor = createSprite(r, 0, 20, 20);
    meteor.addImage("BOOOOM!", meteorImage);
    meteor.scale = 0.45;
    meteor.velocityY = 35;
    meteor.lifetime = 30;
    meteorGroup.add(meteor)
  }
}
function stars() {
  var r = Math.round(random(0, width));
  if(frameCount % 1 == 0) {
    star = createSprite(r, 0, 5, 5);
    star.velocityY = 50;
    star.scale = 0.07;
    star.lifetime = 20;
    star.addImage("bright", starImage);
    starGroup.add(star);
  }
}