import { debug, clearModal, showModal } from '../js/core/core';
import '../css/modalLobbyPlayers.css';
//import * as utils from '../js/utils.js'
import { inGameLayout } from './inGameLayout';

/*
In this modal we show who has been connected to the online bingo game
and what is left in seconds before playing starts
*/


/* Players who are joining the game */
let renderPlayersLobby = (parsedData) => {
    let playersDiv = document.getElementById('listLobbyPlayers');
    playersDiv.innerHTML = '';
    parsedData.players.map((player) => {
        let doc = new DOMParser().parseFromString(`
            <li> Player: ${player.username} &nbsp; - &nbsp; Lv: 8 &nbsp; - &nbsp; Wins : 0
                <div class="lobby__card">
                    <table class='lobby__card__table'>
                        `+
                        player.card.map((value) =>
                            "<tr>" + value.map((val) => {
                                if (val == null) {
                                    return "<th class='null'></th>"
                                } else {
                                    return "<th>" + val + "</th>"
                                }
                            }).join("")
                            + "</tr>"
                        ).join("") +
                    `</table>
                </div>
            </li>
        `, 'text/html');
        playersDiv.appendChild(doc.body.firstChild)
    })   
}

/* Main modal */
export const modalLobbyPlayers = (socketIO, card) => {

    const controllers = () => {
        let socket = socketIO;
        let timer = document.getElementById('time_count');
        let otherPlayers;
        /* Event triggered once a user joins a 
        * game and get a ramdom card with unique id that 
        * should not be shared
        */

        let intervalTimer = setInterval(() => {
            let time = timer.innerText;
            let current = (time - 1);            
            timer.innerText = current;
        }, 1000);
        
        /* When a user is joined to the game socket.io even joined is triggered and we render the information in this modal */
        socket.on('joined', function (msg) {
            //The returned server message (msg) is information about players nicknames and their bingo cards
            let parsed = JSON.parse(msg);
            //We store other players cards and names to render in our browser
            otherPlayers = parsed.players.filter((item) => item.username!=card.username)
           
            let messagesDiv = document.getElementById("listLobbyMessages");
            //Countdown to start the game
            timer.innerText = parsed.countDown;
            
            //We pass parsed msg to therender
            renderPlayersLobby(parsed)
            //Get last player joined 
            let userJoined = parsed.players[parsed.players.length - 1]
            let notif = userJoined.username + " has joined to the game"
            
            messagesDiv.innerHTML = messagesDiv.innerHTML + "<li>" + notif + "</li>";
        });
        //Event notifying game starts. It's triggered by server
        socket.on('starts_game', function (msg) {
            let div_bg = document.getElementById('div_bg');
            clearInterval(intervalTimer);
            //Modal where we render online game: bombo, player card and others players cards            
            showModal(inGameLayout(socket, card, otherPlayers));
        });
    }

    return {
        template:
            `
            <div id="mainMenu" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <h1>BINGO TWINGO</h1>
                    <p></p>
                    <span class="time_left">Time left: <span id="time_count"></span></span>
                    <div class='lobby__players__list'>
                        <ol id="listLobbyPlayers"></ol>
                    </div>
                    
                    <div class='lobby__messages'>
                        <span>Chat Messages</span>
                        <ol id="listLobbyMessages"></ol>
                    </div>
                    
                </div>
            </div>`,
        controllers: controllers
    }
}