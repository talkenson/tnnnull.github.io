var audio = {"wallhit":new Audio('audio/wallhit.wav'),"eaten":new Audio('audio/eated.wav'),"background":new Audio('audio/back.wav')};
audio["background"].addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
var TO_SCORE=10;
function setup() {
  createCanvas(600,600);

  audio["background"].volume=0.1;
  audio["wallhit"].volume=0.5;
  audio.volume=0;
  //audio["background"].play();
  //s=new Snake(0,0);
  //sns=[new Snake(30,30,[50,80,240]),new Snake(width-30,30,[230,60,60])];
  pattern=[new Snake(30,40,[50,80,240]),new Snake(width-30,40,[230,60,60]) ,new Snake(width/2,40,[50,240,70]) ];
  //                                                                           third player solution
  sns=[];

//  n=new Snake(10,0);

  frameRate(15);
  noLoop();
  console.log("Press \'P\' key to start");

}
function startGame(){
  points=[0,0,0];
  sns[0]=$.extend( true, {}, pattern[0]);
  sns[1]=$.extend( true, {}, pattern[1]);
  //sns[2]=$.extend( true, {}, pattern[2]);

}

var points=[0,0,0];

function draw() {
  background(51);
  textSize(16);

  noStroke();
  fill([50,80,240]);
  textAlign(LEFT, TOP);
  text('Blue: ' + points[0], 12, 12, 70);
  fill([230,60,60]);
  textAlign(LEFT, TOP);
  text('Red: ' + points[1], width-65, 12, 70);
  if(sns.length>2){
  fill([50,240,70]);
  textAlign(LEFT, TOP);
  text('Green: ' + points[2], width/2-30, 12, 70);}
  noFill();
  stroke(255);
  textSize(26);
  textAlign(BOTTOM);
  //text('SNAKE', width/2-50, 50, 100);
  stroke(0);

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



function checkWin(){
for(var pp=0;pp<points.length;pp++){
  if(points[pp]>=TO_SCORE){
    win="";
    switch(pp){
      case 0:
      win='Blue';
      break;
      case 1:
      win='Red';
      break;
      case 2:
      win='Green';
      break;
      default:
      win="ne znau kto"
      break;

    }
    stroke(0);
    fill([240,240,240]);
    textSize(40);
    textAlign(LEFT,TOP);
    text(win + ' wins!', width/2-100, 300, width);
    noLoop();
  }
}
}

function keyPressed(){
  /*
if(keyCode===UP_ARROW || key=='w'){
  s.dir(0,-1);
}else if (keyCode===DOWN_ARROW || key=='s') {
  s.dir(0,1);
}else if (keyCode===RIGHT_ARROW || key=='d') {
  s.dir(1,0);
}else if (keyCode===LEFT_ARROW || key=='a') {
  s.dir(-1,0);
}*/
//console.log(key);
if(keyCode===UP_ARROW ){
  sns[1].dir(0,-1);
}else if (keyCode===DOWN_ARROW ) {
  sns[1].dir(0,1);
}else if (keyCode===RIGHT_ARROW ) {
  sns[1].dir(1,0);
}else if (keyCode===LEFT_ARROW ) {
  sns[1].dir(-1,0);
}
if(key=='p' || key=='з'){
  startGame();
  loop();
//  n.inc();
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

function Eat(){
  this.x=0;
  this.y=0;
  this.size=10;

  this.generate=function(){


  }


}

function Snake(x=0,y=0,color=[255,255,255]){
this.x=x;
this.y=y;
this.size=10;
this.xspeed=0;
this.yspeed=1;
this.history=[];
this.total=14;
this.color=color;

this.update=function(){
  //console.log(this.history.length);

  if(this.total === this.history.length){
    for(var i=0;i<this.history.length-1;i++){
    this.history[i]=this.history[i+1];
    }
}
//console.log(this.history.length);

if(this.total - this.history.length > 0){
  for(var i=0;i<this.total;i++){
  //this.history[i]=this;
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
      //  audio['wallhit'].play();

    }else
      {
        points[k]+=1;
        checkWin();
      }
    }}

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

for(var j=0;j<sns.length;j++){
  if(sns[j].color!==this.color){
  for(var i=0;i<this.history.length;i++){
    var pos=this.history[i];
    var d=min(dist(pos.x,pos.y,sns[j].x,sns[j].y),dist(this.x,this.y,sns[j].x,sns[j].y));
    if(d<1){
      //console.log('Snake ' + j + ' died! (0-blue, 1-red, 2-green)');
      sns[j].history=[];
      sns[j].total=14;
      sns[j]=$.extend( true, {}, pattern[j]);
      //sns[j]=pattern[j];
      //this.total=this.total+1;
      for(var k=0;k<sns.length;k++){
        if(sns[k].color==this.color){points[k]+=1;
          //audio['eaten'].play();
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
  if(this.total===this.history.length){
  for(var i=0;i<this.total;i++){
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

}





}
