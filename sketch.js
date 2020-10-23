var ball,playerPaddle,computerPaddle,edges,gameState="serve",pScore=0,cScore=0
var pimage,kickSound,football,cImage,kick

function preload()
{
  pimage=loadImage("playerP0.png")
  kickSound= loadSound("Ball_Bounce-Popup_Pixels-172648817.mp3")
  football=loadImage("Golden-Football-PNG-Image.png ")
  cImage=loadImage("312887_preview.png")
  kick=loadImage("playerK0.png")
  
}





//it allows the computer to read the instructions only one time
function setup()
{
  createCanvas(400,400);
  //createSprite(x,y,width,height)
  ball=createSprite(200,200,1,1)
  ball.addImage("b11",football)
  ball.scale=0.02
  playerPaddle=createSprite(380,200,10,70)
  playerPaddle.addImage("p11",pimage)
  computerPaddle=createSprite(30,200,10,70)
  computerPaddle.addImage("c11",cImage)
  computerPaddle.scale=0.1
  //creates 4 edges around the screen
  edges=createEdgeSprites();
 
}
//looping system
function draw()
{
 background("green");
  
  if(ball.isTouching(computerPaddle) || ball.isTouching(playerPaddle))
  {
    kickSound.play();
    
  }
  
  if(keyDown("k"))
  {
    playerPaddle.addImage("p11",kick)
  }
  if(keyWentUp("k"))
  {
    playerPaddle.addImage("p11",pimage)
  }
  
  
  text(pScore,300,50)
  text(cScore,100,50)
  
  
  
  if(ball.x>400)
  {
    cScore=cScore+1
  }
  if(ball.x<0)
  {
    pScore=pScore+1
  }
  if(pScore===5||cScore===5)
  {
    text("Game Over",150,170)
    gameState="gameOver"
  }
  if(keyDown("r")&&gameState==="gameOver")
  {
    gameState="serve"
    pScore=0
    cScore=0
  }
if(gameState==="serve")
{
  
  text("press space to serve",150,170)
}
  
  
 playerPaddle.y=mouseY
//makes the computer Y value change where ever the ball's Y value goes
  computerPaddle.y=ball.y
 //makes the ball move 
 serve();
//makes the ball come back to the middle when the ball goes out
  resetBall();
  ball.bounceOff(edges[2])
  ball.bounceOff(edges[3])
  ball.bounceOff(playerPaddle)
  ball.bounceOff(computerPaddle)
 drawSprites() 
//function call
  drawLine();
 
}

//function definition

function drawLine()
{
  for(var y=0;y<410;y=y+20)
  {
    line(200,y,200,y+10)
  }
  
  
  
}
function serve()
{
  if(keyDown("space")&&gameState==="serve")
  {
    ball.velocityX=3
    ball.velocityY=6
    gameState="play"
  }
}
function resetBall()
{
  if(ball.x>400||ball.x<0)
  {
    ball.x=200
    ball.y=200
    ball.velocityX=0
    ball.velocityY=0
    gameState="serve"
  } 
}