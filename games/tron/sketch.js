var audio = {"wallhit":new Audio('audio/wallhit.wav'),"eaten":new Audio('audio/eated.wav'),"background":new Audio('audio/back.wav')};
audio["background"].addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
var TO_SCORE=10;
var START_LENGTH=80;
var FRAME_RATE=15;
var PLAYERS=2;

function setup() {
  createCanvas(1000,600);

  audio["background"].volume=0.1;
  audio["wallhit"].volume=0.5;
  //audio.volume=0;
  //audio["background"].play();
  //s=new Snake(0,0);
  //sns=[new Snake(30,30,[50,80,240]),new Snake(width-30,30,[230,60,60])];
  pattern=[new Snake(30,50,[50,80,240]),new Snake(width-30,50,[230,60,60]) ,new Snake(width/2,50,[50,240,70]) ];
  //                                                                           third player solution
  sns=[];

//  n=new Snake(10,0);

  frameRate(FRAME_RATE);
  noLoop();
  console.log("Press \'P\' key to start");

}
function startGame(){
  points=[0,0,0];
  for(var pls=0;pls<PLAYERS;pls++){
  sns[pls]=$.extend( true, {}, pattern[pls]);
}

}

var points=[0,0,0];

function draw() {
  background(51);
  textSize(16);

  noStroke();
  fill([50,80,240]);
  textAlign(LEFT, TOP);
  text('Blue: ' + points[0] + '/' + TO_SCORE, 12, 12, 70);
  fill([230,60,60]);
  textAlign(RIGHT, TOP);
  text('Red: ' + points[1] + '/' + TO_SCORE, width-75, 12, 70);
  if(sns.length>2){
  fill([50,240,70]);
  textAlign(LEFT, TOP);
  text('Green: ' + points[2] + '/' + TO_SCORE, width/2-30, 12, 70);
  }
  noFill();
  stroke(255);
  textSize(26);
  textAlign(BOTTOM);
  //text('SNAKE', width/2-50, 50, 100);
  stroke(0);
checkWin();
for(var p=0;p<sns.length;p++){
    sns[p].death();
    sns[p].update();
    sns[p].show();
}

//  s.update();
//  s.show();
//  n.update();
//  n.show();
  //frameRate(frameCount+1);
  //console.log(rotationX);
}
/*
function Wall(){


}
*/
function checkWin(){
winner=-1;
for(var pp=0;pp<points.length;pp++){
  if(points[pp]>=TO_SCORE){
    if(winner==-1){
    winner=pp;}else{
      winner=-2;
      //TO_SCORE+=1;
      stroke(0);
      fill([240,240,240]);
      textSize(40);
      textAlign(LEFT,TOP);
      text('Draw!', width/2-50, 300, width);
      noLoop();
      return;
    }
    console.log(winner);
    win="";
    switch(pp){
      case 0: win='Blue'; break;
      case 1: win='Red';  break;
      case 2: win='Green';break;
      default:win="No one";break;
    }
  }
}
if(winner>=0){
  console.log("Winning" + winner);
stroke(0);
fill([240,240,240]);
textSize(40);
textAlign(LEFT,TOP);
text(win + ' wins!', width/2-100, 300, width);
noLoop();

}


}
var direction={0:dir(1,0),1:dir(0,1),2:dir(-1,0),3:dir(0,-1)};
function keyPressed(){

if(keyCode===UP_ARROW ){
  sns[1].dir(0,-1);
}else if (keyCode===DOWN_ARROW ) {
  sns[1].dir(0,1);
}else
if (keyCode===RIGHT_ARROW ) {
  //sns[1].direction[(sns[1].dirct+1)%4];
  sns[1].dir(1,0);
}else if (keyCode===LEFT_ARROW ) {
  //sns[1].dir([-1,0]);
  sns[1].dir(-1,0);
}
if(key=='p' || key=='з'){
  startGame();
  loop();

}
if(key=='*'){
  noLoop();

}

if(key=='w' || key=='ц'){
  sns[0].dir(0,-1);
}else if (key=='s' || key=='ы') {
  sns[0].dir(0,1);
}else if (key=='d' || key=='в') {
  sns[0].dir(1,0);
}else if (key=='a' || key=='ф') {
  sns[0].dir(-1,0);
}

if(key=='u' || key=='г'){
  sns[2].dir(0,-1);
}else if (key=='j' || key=='о') {
  sns[2].dir(0,1);
}else if (key=='k' || key=='л') {
  sns[2].dir(1,0);
}else if (key=='h' || key=='р') {
  sns[2].dir(-1,0);
}

}



function Snake(x=0,y=0,color=[255,255,255]){
this.x=x;
this.y=y;
this.size=10;
this.xspeed=0;
this.yspeed=1;
this.history=[];
this.total=START_LENGTH;
this.color=color;
this.dirct=1;
this.minCols=2;

this.update=function(){


  if(this.total === this.history.length){
    for(var i=0;i<this.history.length-1;i++){
    this.history[i]=this.history[i+1];
    }
}
//console.log(this.history.length);

if(this.total - this.history.length > 0){
  var lp=this.total-this.history.length;
  for(var i=0;i<lp;i++){

  append(this.history,this);
}
}

this.history[this.total-1]=createVector(this.x,this.y);
  //this.history.forEach(function(){});
  this.x+=this.xspeed*this.size;
  this.y+=this.yspeed*this.size;
/*
    if(this.x==width)this.x=0;
    if(this.y==height)this.y=0;
    if(this.x<0)this.x=width-this.size;
    if(this.y<0)this.y=height-this.size;
    */
    if(this.x==width || this.y==height || this.x<0 || this.y<0){
    for(var k=0;k<sns.length;k++){
      if(sns[k].color==this.color){
        sns[k].history=[];
        sns[k].total=14;
        sns[k]=$.extend( true, {}, pattern[k]);
        audio['wallhit'].play();

    }else
      {
        points[k]+=1;

      }
    }
    //console.log("HITTED");


  }

}

this.death=function(){
/*  for(var i=0;i<this.history.length;i++){
    var pos=this.history[i];
    for(var j=0;j<sns.length;i++){
    if(sns[j]===this)continue;
    var d=dist(pos.x,pos.y,sns[j].x,sns[j].y);
    if(d<1){
      console.log('Snake ' + j + ' died!');
      sns[j]=pattern[j];

    }

  }
}*/
var cols=0;
for(var i=1;i<this.history.length;i++){
  var pos=this.history[i];
  if(dist(this.x,this.y,pos.x,pos.y)<1){
    //console.log("self");
    cols++;
  }
}

if((cols>1)){this.minCols=1;}
if((cols<this.minCols)){this.minCols=cols;}
//console.log(cols, this.minCols);
if((cols==1) && (this.minCols==0)){
  //console.log("Eated by self");
  for(var k=0;k<sns.length;k++){
    if(sns[k].color==this.color){
      sns[k].history=[];
      sns[k].total=START_LENGTH;
      sns[k]=$.extend( true, {}, pattern[k]);
    }
  }

}

for(var j=0;j<sns.length;j++){
  if(sns[j].color!==this.color){
  for(var i=0;i<this.history.length;i++){
    var pos=this.history[i];
    var d=min(dist(pos.x,pos.y,sns[j].x,sns[j].y),dist(this.x,this.y,sns[j].x,sns[j].y));
    if(d<1){
      //console.log('Snake ' + j + ' died! (0-blue, 1-red, 2-green)');
      var sl=sns[j].total;
      sns[j].history=[];
      sns[j].total=START_LENGTH;
      sns[j]=$.extend( true, {}, pattern[j]);
      //sns[j]=pattern[j];
      for(var nl=0;nl<sl;nl++){
        this.inc();
      }

      for(var k=0;k<sns.length;k++){
        if(sns[k].color==this.color){points[k]+=1;
          audio['eaten'].play();
          checkWin();
        //console.log('1 point added!');
        }
      }
    }
  }
}
}




}

this.show=function(){

  fill(this.color);
  /*if(this.total<this.history.length){
    for(var i=0;i<(this.history.length-this.total);i++){
        pop(this.history);
    }

  }*/
  if(this.total===this.history.length){
  for(var i=0;i<this.history.length;i++){
      rect(this.history[i].x,this.history[i].y,this.size,this.size);
  }}
  rect(this.x,this.y,this.size,this.size);
}

this.dir=function(x,y){
  if((x != -this.xspeed) && (y != -this.yspeed)){
    this.xspeed=x;
    this.yspeed=y;
  }

}

this.inc=function(){
  //append(this.history,new Snake(this.x,this.y));
  this.total++;
  var lp=this.total-this.history.length;
  for(var i=0;i<lp;i++){
  //this.history[i]=this;
  append(this.history,this);
  }
  //append(this.history,this);
}





}
