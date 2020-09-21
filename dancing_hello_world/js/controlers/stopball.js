//import {start} from "../main.js";

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        if (stateApp=="run"){
            stateApp="stop";
            clearInterval(myApp);
        }else{            
            start();
        }
    }
}