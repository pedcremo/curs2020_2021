let speed = 15; //1 to 100
appState = "stopped";
let incX = speed * (Math.round(Math.random())?1:-1);
let incY = speed * (Math.round(Math.random())?1:-1);
let ball=document.getElementById("ball");

function danceWorld(){
   
   x =  ball.style.left?parseInt(ball.style.left,10):400;
   y =  ball.style.top?parseInt(ball.style.top,10):350;

   ball.style.left =  x + incX +"px";
   ball.style.top = y + incY+"px";
   
   //Detect if we reach X coordinates limits
   if (((x+incX) > (window.innerWidth-40)) || ((x+incX)<=0))
      incX = (-1)*incX
      
   //Detect if we reach Y coordinates limits
   if (((y+incY) > (window.innerHeight-40)) || ((y+incY) <= 0))
      incY = (-1)*incY
}

//Function in core/appContext.js
let appId=start(danceWorld)
appState = "running";
