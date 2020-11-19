
import './css/style.css';
import './css/ingame.css';
import { docReady, showModal, clearModal, debug } from './js/core/core.js';
import './js/card.js';
import { Bombo } from './js/bombo.js';
import { BingoCard } from './js/card.js';
import { PubSub } from './js/core/pubSub.js';
import { modalPlayers} from './templates/modalPlayers.js';
import {setupAudioBingoWin} from './utils/background';
import { modalLiniaBingo } from './templates/modalLiniaBingo.js';
import { modalMenu } from './templates/modalMenu.js';
import { modalOnlinePlayer } from './templates/modalOnlinePlayer.js';
import io from 'socket.io-client';
/**
 * Within the app constant(closure), we have defined several variables with anonymous functions which are responsible for starting and stopping the game
 * As for the start variable, it is where we have the subscription patterns, 
 * and it goes down for the line and the bingo, so that when one player gets a 'line', the others can no longer and in the case of bingo,
 * when one player sings bingo the game stops and in addition to showing a modal with a gif, an audio jumps with a voice that sings BIINGO.
 */

const app = (() => {

    let myApp;
    const speed = 2000; //2 seconds
    let bombo;
    let players = []
    let pubSub = new PubSub();
    let stateApp = "stop";
    // const socket = io('ws://localhost:8080', {transports: ['websocket']});
    // socket.on('connect', () => {
    //     socket.emit('join', `POPO`);
    //     console.log("EMIT")
    // });
    let offline_mode = () =>{
        //starts offline mode
        showModal(modalPlayers(), start);
    }
    let online_mode = () =>{
        //starts online mode
        debug("Online")
        showModal(modalOnlinePlayer(), start_online);
    }
    let start_online = (username) =>{
        const socket = io('ws://localhost:8080', {transports: ['websocket']});
        socket.on('connect', () => {
            socket.emit('join', username);
        });
        debug("START ONLINE!")
    }
    /* Every time runs pick a ball from bombo bingo game */
    let getBallFromBombo = () => {
        /* Get a ball from bombo */
        let num = bombo.pickNumber();

        /* If num is a real number we inform all subscribers we have just picked a ball */
        if (num) {
            pubSub.publish("New Number", bombo.getExtractedNumbers());

        /* otherwise means bombo is running out of ball and we should finish the game */    
        } else {
            stop();
        }
    };

    /* Stop bingo play an clear timer */
    let stop = () => {
        stateApp = "stop";
        clearInterval(myApp);
    }
    /* Start bingo play */
    let start = () => {
        
        /* Basic template where we are going to render bingo play */
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

        /* Layer where initial background video has been loaded we
        need to remove it as we are going to start playing */
        let videoEl = document.getElementById('videoBackground');
        if (videoEl) videoEl.remove();

        /* Create publish/subscriber mechanism useful to be aware of some interesting bingo events like linia or bingo */
        pubSub = new PubSub();
        /* Create and render empty bombo for our playing */
        bombo = new Bombo(document.getElementById('balls'));
        /* Change app state from stop to run  */
        stateApp = "run";

        /* Subscribe app to LINIA event. When this occurs
        we show up a modal with the player awarded and a gif animation 
        obviously we stop bingo playing until modal is closed 
        */        
        pubSub.subscribe("LINIA", (player) => {
            debug("Linia");            
            /* Stop bingo playing */
            stop();
            /* As linia only could be awarded once per playing we delete that event
            from publish/subscriber mechanism */
            pubSub.unsubscribe("LINIA");
            /* Show modal */
            setTimeout(function () {
                showModal(modalLiniaBingo(player, "linea"), function () {
                    myApp = setInterval(getBallFromBombo, app.speed);
                })
            }, 50);


        });
        /* Subscribe app to BINGO event. When this occurs
        we show up a modal with the player awarded and a gif animation 
        obviously we stop bingo playing until modal is closed 
        */
        pubSub.subscribe("BINGO", (player) => {
            stop();
            /* call audio song to enhance bingo prize experience*/
            setupAudioBingoWin();
            /* Show bingo modal with animation and player awarded */
            setTimeout(function () {
                /* Delete BINGO event from publish/subscriber mechanism */
                pubSub.unsubscribe("BINGO");
                // clearModal("bingoCard") BUG
                showModal(modalLiniaBingo(player, "bingo"), function () {
                    document.getElementById('sound').remove();//remove div audio sound
                    showModal(modalPlayers(), app.start);

                })

            }, 50);


        });
        players = [];
        /* Get players names from browser localStorage */
        let playersNames = JSON.parse(localStorage.getItem('playersNames'));
        /* Clear html layer reserved for render bingo cards */
        document.getElementById('bingoCards').innerHTML = ""
        /* Create one bingo card for every bingo player */
        playersNames.forEach(name => {
            players.push(new BingoCard(name, document.getElementById('bingoCards'), pubSub));
        });
        /* Start throwing first ball from bombo. Here we go */
        getBallFromBombo();
        /* Timer in charge to pace time between balls extraction from bombo */
        myApp = setInterval(getBallFromBombo, app.speed);
    }

    /* Return start and stop function and play speed */
    return {
        start: start,
        start_online:start_online,
        offline_mode:offline_mode,
        online_mode:online_mode,
        toggle: () => {
            (stateApp == "run") ? stop() : start();
        },
        speed: speed
    };

})();
/* Real entry point to our bingo app. Show modals to choose players and
 when closed start bingo playing (callback) */
docReady(() => showModal(modalMenu()));


export { app };