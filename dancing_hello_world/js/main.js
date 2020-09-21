let speed = 15; //1 to 100
appState = "stopped";
let incX = speed * (Math.round(Math.random())?1:-1);
let incY = speed * (Math.round(Math.random())?1:-1);
let ball=document.getElementById("ball");

function danceWorld(idElem){
   
   x =  idElem.style.left?parseInt(idElem.style.left,10):400;
   y =  idElem.style.top?parseInt(idElem.style.top,10):350;

   idElem.style.left =  x + incX +"px";
   idElem.style.top = y + incY+"px";
   
   //Detect if we reach X coordinates limits
   if (((x+incX) > (window.innerWidth-40)) || ((x+incX)<=0))
      incX = (-1)*incX
      
   //Detect if we reach Y coordinates limits
   if (((y+incY) > (window.innerHeight-40)) || ((y+incY) <= 0))
      incY = (-1)*incY
}

//Function in core/appContext.js
let appId=start(function(){danceWorld(ball)})
appState = "running";
