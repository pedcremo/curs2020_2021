
import './css/style.css';
<<<<<<< HEAD

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
=======
import './css/ingame.css';
import { docReady, showModal, clearModal, debug } from './js/core/core.js';
import './js/card.js';
import { Bombo } from './js/bombo.js';
import { BingoCard } from './js/card.js';
import { PubSub } from './js/core/pubSub.js';
import { modalPlayers, setupAudioBingoWin } from './templates/modalPlayers.js';
import { modalLiniaBingo } from './templates/modalLiniaBingo.js';


/**
 * Within the app constant, we have defined several variables with anonymous functions which are responsible for starting and stopping the game
 * As for the start variable, it is where we have the subscription patterns, 
 *  and it goes down for the line and the bingo, so that when one player sings line, the others can no longer and in the case of bingo,
 *  when one player sings bingo the game stops and in addition to showing a modal with a gif, an audio jumps with a voice that sings BIINGO.
 */

const app = (() => {
>>>>>>> develop
    let myApp;
    let speed = 2000;
    let bombo;
    let players = []
    let pubSub = new PubSub();
    let stateApp = "stop";

    let play = () => {
        let num = bombo.pickNumber();

        if (num) {
            pubSub.publish("New Number", bombo.getExtractedNumbers());

        } else {
            stop();
        }
    };

    let stop = () => {
        stateApp = "stop";
        clearInterval(myApp);
    }
    let start = () => {
        let videoEl = document.getElementById('videoBackground');

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
        pubSub.subscribe("LINIA", (player) => {
            debug("Linia");
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function () {
                showModal(modalLiniaBingo(player, "linea"), function () {
                    debug("SPEEEED");
                    debug(app.speed);
                    myApp = setInterval(play, app.speed);
                })
            }, 50);


        });
        pubSub.subscribe("BINGO", (player) => {
            stop();

            setupAudioBingoWin();//call function audio song
            setTimeout(function () {
                pubSub.unsubscribe("BINGO");
                // clearModal("bingoCard") BUG
                showModal(modalLiniaBingo(player, "bingo"), function () {
                    document.getElementById('sound').remove();//remove div audio sound
                    showModal(modalPlayers(), app.start);

                })

            }, 50);


        });
        players = [];

        let playersNames = JSON.parse(localStorage.getItem('playersNames'));
        document.getElementById('bingoCards').innerHTML = ""
        playersNames.forEach(name => {
            players.push(new BingoCard(name, document.getElementById('bingoCards'), pubSub));
        });
        play();
        myApp = setInterval(play, app.speed);
    }

    return {
        start: start
        ,
        toggle: () => {
            (stateApp == "run") ? stop() : start();
        },
        speed: speed
    };

})();

docReady(() => showModal(modalPlayers(), app.start));


export { app };