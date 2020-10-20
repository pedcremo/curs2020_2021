
import './css/style.css';
import {docReady,showModal} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
import {PubSub} from './js/core/pubSub.js';

const app = (() => {    
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
        pubSub.subscribe("LINIA",(player) => {
            console.log("Linia");
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function() { 
                alert("Linia Player "+player);
                myApp = setInterval(play,200);
            }, 50);
            
            
        });
        pubSub.subscribe("BINGO",(player) => {            
            stop();
            setTimeout(function() { 
                pubSub.unsubscribe("BINGO");
                alert("Bingo Player "+player) 
            }, 50);                        
        });

        cardPlayer1 =  new BingoCard("PERE",document.getElementById('bingoCard1'),pubSub);        
        cardPlayer2 =  new BingoCard("PACO",document.getElementById('bingoCard2'),pubSub);
        
        myApp = setInterval(play,200); 
    }

    return {start: start
            ,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
    };
        
})();

docReady( showModal('playersForm',app.start));


export {app};