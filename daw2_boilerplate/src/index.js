
import './css/style.css';

import {docReady,showModal,clearModal,debug} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
import {PubSub} from './js/core/pubSub.js';
import {modalPlayers,setupAudioBingoWin} from './templates/modalPlayers.js';
// import {modalBingo} from './templates/modalBingo.js';
// import {modalLinia} from './templates/modalLinia.js';
import {modalLiniaBingo} from './templates/modalLiniaBingo.js';

const app = (() => {    
    let myApp;
    let speed = 2000;
    let bombo;
    let players = []
    let pubSub = new PubSub();    
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
        let videoEl= document.getElementById('videoBackground');

        let doc = new DOMParser().parseFromString(`
            <div class="gameLayout">
                <div id="bingoCards" class="cards"></div>
                <div class="panel">
                    <div id="balls" class="balls__grid"></div>
                </div>
            </div>
        `, 'text/html');

        let layout = doc.body.firstChild;
        document.getElementById('main').appendChild(layout);

        if (videoEl) videoEl.remove();
        pubSub = new PubSub();
        bombo = new Bombo(document.getElementById('balls'));
        stateApp = "run";
        pubSub.subscribe("LINIA",(player) => {
            debug("Linia");
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function() {                 
                showModal(modalLiniaBingo(player,"linea"),function(){
                    debug("SPEEEED");
                    debug(app.speed);
                    myApp = setInterval(play,app.speed);
                })                
            }, 50);
            
            
        });
        pubSub.subscribe("BINGO",(player) => {            
            stop();
            setupAudioBingoWin();
            setTimeout(function() { 

                pubSub.unsubscribe("BINGO");   
                // clearModal("bingoCard") BUG
                showModal(modalLiniaBingo(player,"bingo"),function(){                    
                    showModal(modalPlayers(),app.start)
                     document.getElementById('sound').remove();      
                })
              
            }, 50);  
                           
        });
        players = [];
       
        let playersNames = JSON.parse(localStorage.getItem('playersNames'));
        document.getElementById('bingoCards').innerHTML=""
        playersNames.forEach(name => {
            players.push(new BingoCard(name,document.getElementById('bingoCards'),pubSub));
        });
        play();
        myApp = setInterval(play,app.speed); 
    }

    return {start: start
            ,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
            speed: speed
    };
        
})();

docReady(() => showModal(modalPlayers(),app.start));


export {app};