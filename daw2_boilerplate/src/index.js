import './css/style.css';
import {docReady,showModal} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
import {PubSub} from './js/core/pubSub.js';
import {modalPlayers} from './templates/modalPlayers.js';
import {modalBingo, modalLinia} from './templates/modalLiniaBingo.js';

const app = (() => {    
    let myApp;
    const speed = 50;
    let bombo;
    let players = []
    let pubSub = new PubSub();
    let stateApp="stop";
        
    /*
    * Picks a number from bombo class, and publishes it.
    * IF there are no more numbers in the bombo, the game stops
    */
    let play = () =>{    
        let num=bombo.pickNumber();
       
        if (num){           
            pubSub.publish("New Number",bombo.getExtractedNumbers());
        }else{
            stop();
        }
    };

    // Stops the game
    let stop = () => {
        stateApp="stop";
        clearInterval(myApp);
    }

    // Starts the game
    let start = () => {
        pubSub = new PubSub();
        bombo = new Bombo(document.getElementById('balls'));
        stateApp = "run";

        /*
        * When someone publishes LINIA the game stops and shows a modal,
        * and when the user closes the linia modal, the game continues
        */
        pubSub.subscribe("LINIA",(player) => {
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function() {                 
                showModal(modalLinia(player),function(){
                    myApp = setInterval(play,speed);
                })
                
            }, 50);
        });

        /*
        * When someone publishes BINGO the game stops and shows the bingo modal,
        * when the user closes it, the game ends, and the players modal is showed again
        */
        pubSub.subscribe("BINGO",(player) => {  
            stop();
            setTimeout(function() { 
                pubSub.unsubscribe("BINGO");                
                showModal(modalBingo(player),function(){
                    showModal(modalPlayers(),app.start)
                })
            }, 50);                        
        });

        players = [];
        let playersNames = JSON.parse(localStorage.getItem('playersNames'));
        document.getElementById('bingoCards').innerHTML="";
        // For each player in localstorage, a new random bingo card is created.
        playersNames.forEach((name) => {
            players.push(new BingoCard(name,document.getElementById('bingoCards'),pubSub));
        });

        play();
        myApp = setInterval(play,speed); 
    }

    // Returns start and toggle functions
    return {
        start: start,
        toggle: () => { (stateApp == "run")?stop():start(); }
    };
        
})();

// Runs the 'modalPlayers' modal the first
docReady(() => showModal(modalPlayers(),app.start));

export {app};