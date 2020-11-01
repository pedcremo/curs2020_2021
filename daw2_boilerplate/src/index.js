
import './css/style.css';
import {docReady,showModal} from './js/core/core.js'; 
import './js/card.js';
import {Bombo} from './js/bombo.js';
import {BingoCard} from './js/card.js';
import {PubSub} from './js/core/pubSub.js';
import {modalPlayers} from './templates/modalPlayers.js';
import {modalBingo} from './templates/modalBingo.js';
import {modalLinia} from './templates/modalLinia.js';
import video from './videos/los_bingueros.mp4';

const app = (() => {    
    let myApp;
    let speed = 50;
    let bombo;
    let players = []
    let pubSub = new PubSub();
    //let cardPlayer1,cardPlayer2;
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
        // Clear the root element before append new Elements
        document.getElementById('root').innerHTML = "";
        let videoEl= document.getElementById('videoBackground');
        if (videoEl) videoEl.remove();
        pubSub = new PubSub();
        bombo = new Bombo(document.getElementById('root'));
        stateApp = "run";
        pubSub.subscribe("LINIA",(player) => {
            console.log("Linia");
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function() {                 
                showModal(modalLinia(player),function(){
                    myApp = setInterval(play,speed);
                })
                
            }, 50);
            
            
        });
        pubSub.subscribe("BINGO",(player) => {            
            stop();
            setTimeout(function() { 
                pubSub.unsubscribe("BINGO");                
                showModal(modalBingo(player),function(){
                    setupBackgroundVideo();
                    showModal(modalPlayers(),app.start)
                })
            }, 50);                        
        });
        players = [];
       
        let playersNames = JSON.parse(localStorage.getItem('playersNames'));
        playersNames.forEach(name => {
            players.push(new BingoCard(name,document.getElementById('root'),pubSub));
        });
        play();
        myApp = setInterval(play,speed); 
    }

    // The new function to change the game speed
    return {start: start
            ,
            toggle: () => {
                (stateApp == "run")?stop():start();  
            },
            changeSpeed: (newSpeed) => {
                speed = newSpeed;
            },
    };
        
})();

function setupBackgroundVideo(){
    let backgroundVideo = `<div><video autoplay muted loop id="videoBackground">
            <source src="${video}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        
        </div>
        `;
    let parser = new DOMParser();
    let videoEl = parser.parseFromString(backgroundVideo, "text/html");
    videoEl = videoEl.body.firstChild;
    videoEl.currentTime += Math.round(Math.random()*400);
    document.body.appendChild(videoEl);
    /* showModal(modalSound); */
}
setupBackgroundVideo();
docReady(() => showModal(modalPlayers(app.start, app.changeSpeed),app.start));


export {app};