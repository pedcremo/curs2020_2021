
import './css/style.css';
import './css/ingame.css';
import {docReady,showModal} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
import {PubSub} from './js/core/pubSub.js';
import {modalPlayers} from './templates/modalPlayers.js';
import {modalBingo} from './templates/modalBingo.js';
import {modalLinia} from './templates/modalLinia.js';

/**
 * Main function of the application, start or stop the game. Show the necessary modals.
 * @returns {object} returns multiple functions or variables, that can be accessible.
 */

const app = (() => {    
    let myApp;
    let speed;
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
            console.log("Linia");
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function() {                 
                showModal(modalLinia(player),function(){
                    myApp = setInterval(play,app.speed);
                })                
            }, 50);
            
            
        });
        pubSub.subscribe("BINGO",(player) => {            
            stop();
            setTimeout(function() { 
                pubSub.unsubscribe("BINGO");
                document.getElementById('main').innerHTML = '';            
                showModal(modalBingo(player),function(){                    
                    showModal(modalPlayers(),app.start)
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