
import './css/style.css';
import {docReady} from './js/core/core.js'; 
import  './js/controlers/stopball.js';

let app = (() => {
    let el = document.getElementById("ball");
    let myApp;
    let stateApp="stop"
    // DOM is loaded and ready for manipulation here
    let speed = 45; //1 to 100
    let incX = speed * (Math.round(Math.random())?1:-1);
    let incY = speed * (Math.round(Math.random())?1:-1);
    
    let play =  () =>{    
        let x =  el.style.left?parseInt(el.style.left,10):350;
        let y =  el.style.top?parseInt(el.style.top,10):400;

        el.style.left =  x + incX +"px";
        el.style.top = y + incY+"px";

        //Detect if we reach X coordinates limits
        if (((x+incX) > (window.innerWidth-40)) || ((x+incX)<=0))
            incX = (-1)*incX;
    
        //Detect if we reach Y coordinates limits
        if (((y+incY) > (window.innerHeight-40)) || ((y+incY) <= 0))
            incY = (-1)*incY;
    };
    let stop = () => {
        stateApp="stop";
        clearInterval(myApp);
    }
    let start = () => {
        stateApp = "run";
        myApp = setInterval(play,50); 
    }

    return {start: start
            ,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
    };
        
})();

docReady(app.start);

if (module.hot)       // eslint-disable-line no-undef
  module.hot.accept() // eslint-disable-line no-undef

export {app};