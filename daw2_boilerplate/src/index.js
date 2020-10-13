
import './css/style.css';
import {docReady} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
import {PubSub} from './js/core/pubSub.js';

let app = (() => {
    //let el = document.getElementById("ball");
    let myApp;
    let bombo;
    let pubSub = new PubSub();
    let cardPlayer1,cardPlayer2;
    let stateApp="stop";
    
    
    let play = () =>{    
        let num=bombo.pickNumber();
       
        if (num){           
            pubSub.publish("New Number",bombo.getExtractedNumbers());
        }else{
            stop();
        }
    };
    let stop = () => {
        stateApp="stop";
        clearInterval(myApp);
    }
    let start = () => {
        bombo = new Bombo(document.getElementById('balls'));
        stateApp = "run";
        pubSub.subscribe("LINIA",(player) => alert("Linia Player "+player));
        pubSub.subscribe("BINGO",(player) => {
            alert("Bingo Player "+player);
            stop();
        });

        cardPlayer1 =  new BingoCard("PERE",document.getElementById('bingoCard1'),pubSub);      
        //pubSub.subscribe("New Number",cardPlayer1.render);         
        
        cardPlayer2 =  new BingoCard("PACO",document.getElementById('bingoCard2'),pubSub);
        //pubSub.subscribe("New Number",cardPlayer2.render);      
        
        myApp = setInterval(play,200); 
    }

    return {start: start
            ,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
    };
        
})();

docReady(app.start);

//if (module.hot)       // eslint-disable-line no-undef
//  module.hot.accept() // eslint-disable-line no-undef

export {app};