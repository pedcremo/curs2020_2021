
import './css/style.css';
import {docReady} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';

let app = (() => {
    //let el = document.getElementById("ball");
    let myApp;
    let bombo;
    let cardPlayer1,cardPlayer2;
    let stateApp="stop"
    
    let play = () =>{    
        let num=bombo.pickNumber();
        if (num){           
            let ballDiv = document.createElement('div');
            ballDiv.className = 'bingoBall';
            ballDiv.textContent = num;
            document.getElementById('balls').appendChild(ballDiv);           
            //document.getElementById('bingoCard').innerHTML = renderBingoCard(cardPlayer1,bombo.getExtractedNumbers());
            document.getElementById('bingoCard1').innerHTML = cardPlayer1.render(bombo.getExtractedNumbers());           
            document.getElementById('bingoCard2').innerHTML = cardPlayer2.render(bombo.getExtractedNumbers());           
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
        cardPlayer1 =  new BingoCard();       
        document.getElementById('bingoCard1').innerHTML = cardPlayer1.render();
        cardPlayer2 =  new BingoCard();       
        document.getElementById('bingoCard2').innerHTML = cardPlayer2.render();
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