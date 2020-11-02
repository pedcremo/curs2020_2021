
import './css/style.css';
import {docReady,showModal} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
import {PubSub} from './js/core/pubSub.js';
import {modalPlayers} from './templates/modalPlayers.js';
import {modalLiniaBingo} from './templates/modalLiniaBingo.js';
// import {modalBingo} from './templates/modalBingo.js';
// import {modalLinia} from './templates/modalLinia.js';

const app = (() => {    
    let myApp;
    const speed = 200;
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
        if (videoEl) videoEl.remove();
        pubSub = new PubSub();
        bombo = new Bombo();
        stateApp = "run";
        pubSub.subscribe("LINIA",(player) => {
            console.log("Linia");
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function() {                 
                showModal(modalLiniaBingo(player,"linea"),function(){
                    myApp = setInterval(play,speed);
                })             
            }, 50);
            
            
        });
        pubSub.subscribe("BINGO",(player) => {            
            stop();
            setTimeout(function() { 
                pubSub.unsubscribe("BINGO");                
                showModal(modalLiniaBingo(player,"bingo"),function(){                    
                    showModal(modalPlayers(),app.start)
                })
            }, 50);                        
        });
        players = [];
       
        let playersNames = JSON.parse(localStorage.getItem('playersNames'));
        if(document.getElementById('bingoCards')){
            document.getElementById('bingoCards').remove();
        }
        playersNames.forEach(name => {
            players.push(new BingoCard(name,pubSub));
        });
        play();
        myApp = setInterval(play,speed); 
    }

    return {start: start
            ,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
    };
        
})();

docReady(() => showModal(modalPlayers(),app.start));


export {app};