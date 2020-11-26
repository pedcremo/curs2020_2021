
import './css/style.css';
import './css/ingame.css';
import { docReady, showModal, clearModal, debug } from './js/core/core.js';
import './js/card.js';
import { Bombo } from './js/bombo.js';
import { BingoCard } from './js/card.js';
import { PubSub } from './js/core/pubSub.js';
import { modalPlayers, setupAudioBingoWin } from './templates/modalPlayers.js';
import { modalLiniaBingo } from './templates/modalLiniaBingo.js';
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
    let socket = io('ws://localhost:8080', { transports: ['websocket'] });


    /* OFFLINE MODE */

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


    /* ONLINE MODE */

    let onlineMode = () => {

        let cardMatrix = []
        let extractedBalls = []
        let onlineName = ""
        let lineDone = false


        let renderPanel = (extractedBall) => {
            // render panel
            (extractedBalls.length > 1) && (document.getElementById(extractedBalls[extractedBalls.length - 2]).className = "bingoBall")
            document.getElementById(extractedBall).className = "bingoBall blink"
        }

        let renderCards = (extractedBall) => {
            if (extractedBalls.length > 1) {
                let previousMatches = Array.from(document.getElementsByClassName("card-" + extractedBalls[extractedBalls.length - 2]))
                console.log(previousMatches);
                previousMatches.forEach(numero => {
                    numero.style.backgroundColor = "green"
                });
            }

            let matches = Array.from(document.getElementsByClassName("card-" + extractedBall))
            matches.forEach(numero => {
                numero.style.backgroundColor = "#ef70eb"
            });
        }


        /* EMIT */

        let joinRoom = (playerName) => {
            socket.emit('join', playerName)
            onlineName = playerName

            clearModal('modal')
            clearModal('bg')

            /* Layer where initial background video has been loaded we
            need to remove it as we are going to start playing */
            let videoEl = document.getElementById('videoBackground');
            if (videoEl) videoEl.remove();

            /* Basic template where we are going to render bingo play */
            let doc = new DOMParser().parseFromString(`
            <div class="gameLayout">
                <div id="bingoCards" class="cards"></div>
                <div class="panel">
                    <div id="balls" class="balls__grid"></div>
                </div>
                <h3 class="newPlayers">Waiting for other players...<h3/>
            </div>
            `, 'text/html');

            let layout = doc.body.firstChild;
            document.getElementById('main').appendChild(layout);

            if (pubSub) pubSub.subscribe("GET-NUMBER", renderPanel);

            bombo = new Bombo(document.getElementById('balls'));
        }

        /* RECEIVE */

        /** When a player joins a game */
        socket.on('joined_game', (data) => {
            data = JSON.parse(data)
            cardMatrix = data.cardMatrix
        })

        /** When another/self player joined a game */
        socket.on('joined', (data) => {
            data = JSON.parse(data)
            
            let out = `
            ${data.prayers.map((player) => {
                return `
                <div class="bingoCardLayout">
                    <h1>Player ${player.username}</h1>
                    <table class='bingoCard'>
                        `+
                    player.card.map((value) =>
                        "<tr>" + value.map((val) => {
                            if (val == null) {
                                return "<th class='nulo'></th>"
                            } else {
                                return "<th class='card-" + + val + "'>" + val + "</th>"
                            }
                        }).join("")
                        + "</tr>"
                    ).join("") +
                    `</table>
                 </div>`;
            })}`
            document.getElementById('bingoCards').innerHTML = out;

            pubSub.subscribe("CARD-NUMBER", renderCards)
        })

        /** Game starts */
        socket.on('starts_game', (data) => {
            console.log("starts_game", data);
            clearModal('newPlayers')
        })

        /** New number is out the bombo and must check linea and bingo */
        socket.on('new_number', (data) => {
            extractedBalls.push(data.num)
            pubSub.publish("GET-NUMBER", data.num)
            pubSub.publish("CARD-NUMBER", data.num)

            //check linea


            //check bingo
            let bingo = true;
            cardMatrix.forEach((row) => {
                let linia = row.filter((val) => { if (extractedBalls.indexOf(val) <= 0) return val }).length;
                if (linia > 0) bingo = false;
                else if (!lineDone) {
                    lineDone = true
                    socket.emit('linia', onlineName)
                }
            })

            if (bingo) {
                socket.emit('bingo', onlineName)
            }
        })

        /** When a linea is accepted by the server */
        socket.on('linia_accepted', (data) => {
            lineDone = true;
            showModal(modalLiniaBingo("player", "linea"), function () { })
        })

        /** When the bingo is accepted by the server */
        socket.on('bingo_accepted', (data) => {
            showModal(modalLiniaBingo("player", "bingo"), function () {
                showModal(modalPlayers(onlineMode()), app.start);
            })
        })

        /** Ends the game */
        socket.on('end_game', (data) => {
            // console.log("end_game", data);
        })


        return {
            joinRoom: joinRoom
        }
    }

    /* Return start and stop function and play speed */
    return {
        start: start
        ,
        toggle: () => {
            (stateApp == "run") ? stop() : start();
        },
        onlineMode: onlineMode,
        speed: speed
    };

})();

/* Real entry point to our bingo app. Show modals to choose players and
 when closed start bingo playing (callback) */
docReady(() => showModal(modalPlayers(app.onlineMode()), app.start));


export { app };