var bg;
var shooterStandingImg, shooterStanding;
var police,policeImg;
var gunImg, gun;
var BigGunshooterStandingImg;
var gameState=PLAY;
var PLAY=1
var END=0
var police2Img, Police2;
var bulletImg, bullet;
var bullets=[]
var gameState="serve"
var level=0;
var police_Group
var score=0
var ShootEffect;
var shooterDeathImg;
var reset,resetImg;
var rifle;
function preload(){
 bg=loadImage("bgstreet.png")
 shooterStandingImg=loadImage("shooterstill-removebg-preview.png")
 policeImg=loadImage("policespritesheet-removebg-preview.png")
 gunImg=loadImage("gun-removebg-preview.png")
 police2Img=loadImage("police-removebg-preview.png")
 bulletImg=loadImage("bullet-removebg-preview.png")
 BigGunshooterStandingImg=loadAnimation("Biggunshooterstanding.png")
 shooterShootingImg=loadAnimation("shootershoot-removebg-preview.png")
ShootEffect=loadSound("gunshot.mp3")
shooterDeathImg=loadAnimation("Screenshot_2021-11-27_at_12.50.41-removebg-preview.png")
resetImg=loadImage("restart-removebg-preview.png")
}
function setup() {
 createCanvas(displayWidth - 20, displayHeight-30);
 
police_Group=new Group()
bullet=createSprite(120,displayHeight-355)
  bullet.addImage(bulletImg)
  bullet.scale=0.1
  bullet.velocityX=0;
  reset=createSprite(displayWidth/2,displayHeight/2)
  reset.addImage(resetImg)
  reset.scale=0.5;
  reset.visible=false;
shooterStanding=createSprite(displayWidth/8, displayHeight-200)
shooterStanding.addAnimation("standing", shooterStandingImg)
shooterStanding.addAnimation("stronger", BigGunshooterStandingImg)
shooterStanding.addAnimation("death",shooterDeathImg)
shooterStanding.debug=false;
shooterStanding.setCollider("rectangle",-100,-70,100,300)
police=createSprite(displayWidth/2, displayHeight-300)

police.addImage(policeImg)
police.scale=0.5
police.visible=false;
gun=createSprite(displayWidth/4,displayHeight-300)
gun.addImage(gunImg)
gun.visible=false;
gun.scale=0.3
Police2=createSprite(displayWidth/5,displayHeight-300)
Police2.addImage(police2Img)
Police2.scale=0.5
Police2.visible=false;
rifle=createSprite(shooterStanding.x-60,0)
rifle.addImage(gunImg)
rifle.scale=0.3;
rifle.velocityY=0;
rifle.visible=false;

}
function draw() {
background(bg);
textSize(45)
text("Score: "+ score, width-200, 100)
if(gameState===PLAY){
  spawnPolice();
  if(keyDown("space")){
    bullet.velocityX=10
    bullet.x=138
    bullet.y=displayHeight-355
  ShootEffect.play()
  }
  if(score=== 1){
    rifle.visible=true;
    rifle.velocityY=15
  }
  if( rifle.isTouching(shooterStanding))
{
  level=level+1
  rifle.remove()
  shooterStanding.changeAnimation("stronger", BigGunshooterStandingImg)
  
  }
  for(var i=0; i<police_Group.length; i++){
    if(police_Group.get(i).isTouching(bullet)){
      police_Group.get(i).destroy()
      score=score+1
    }
  }
  
  for(var j=0; j<police_Group.length; j++){
    if(police_Group.get(j).isTouching(shooterStanding)){
      bullet.visible=false;
      shooterStanding.visible=false;
    //police_Group.setVelocityXEach(0)
    police_Group[police_Group.length-1].remove()
    
     gameState=END; 
     }}
}
else if(gameState===END){
  reset.visible=true;
}






drawSprites();
}
function spawnPolice(){
  if(frameCount%150===0){
police0=createSprite(width,height-200)
police0.scale=0.7;
police0.y=Math.round(random(height-200,height-300))
police0.debug=false;
 var rand=Math.round(random(1,2))
    switch(rand){
case 1: police0.addImage(policeImg)
police0.setCollider("circle",150,0,80)
break;
case 2: police0.addImage(police2Img)
break;
default:break;
    }
police0.velocityX=-8
police_Group.add(police0)
  }
}