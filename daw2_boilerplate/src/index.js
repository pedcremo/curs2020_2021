
import './css/style.css';
import {docReady} from './js/core/core.js'; 
import './js/controlers/stopball.js';
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {generateBingoCard,renderBingoCard} from './js/card.js';

let app = (() => {
    //let el = document.getElementById("ball");
    let myApp;
    let bombo;
    let stateApp="stop"
    
    let play =  () =>{    
        let num=bombo.pickNumber();
        if (num){
            document.getElementById('balls').innerHTML = "<h1>"+bombo.getExtractedNumbers()+"</h1>";
            document.getElementById('bingoCard').innerHTML = renderBingoCard(generateBingoCard());
        }else{
            stop();
        }
        //document.getElementById('bingoCard').innerHTML = renderBingoCard(generateBingoCard);
    };
    let stop = () => {
        stateApp="stop";
        clearInterval(myApp);
    }
    let start = () => {
        bombo = new Bombo();
        stateApp = "run";
        myApp = setInterval(play,2000); 
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