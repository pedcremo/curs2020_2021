
import './css/style.css';
import { docReady, showModal } from './js/core/core.js';
import './js/card.js';
import { Bombo } from './js/bombo.js';
import { BingoCard } from './js/card.js';
import { PubSub } from './js/core/pubSub.js';
import { modalPlayers } from './templates/modalPlayers.js';
import { modalBingo } from './templates/modalBingo.js';
import { modalLinia } from './templates/modalLinia.js';
import { setupAudioBingoWin } from './templates/modalBingo.js'

const app = (() => {
    let myApp;
    const speed = 50;
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
        if (videoEl) videoEl.remove();
        pubSub = new PubSub();
        bombo = new Bombo(document.getElementById('balls'));
        stateApp = "run";
        pubSub.subscribe("LINIA", (player) => {
            pubSub.unsubscribe("LINIA");
            stop();
            setTimeout(function () {
                showModal(modalLinia(player), function () {
                    myApp = setInterval(play, speed);
                })
            }, 50);


        });
        pubSub.subscribe("BINGO", (player) => {
            stop();
     
            setTimeout(function () {

                setupAudioBingoWin();

                pubSub.unsubscribe("BINGO");
                showModal(modalBingo(player), function () {
                    document.getElementById('sound').remove();
                    showModal(modalPlayers(), app.start)
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
        myApp = setInterval(play, speed);
    }

    return {
        start: start
        ,
        toggle: () => {
            (stateApp == "run") ? stop() : start();
        },
    };

})();

docReady(() => showModal(modalPlayers(), app.start));


export { app };