import { debug, clearModal, showModal } from '../js/core/core';
import '../css/modalLobbyPlayers.css';
import * as utils from '../js/utils.js'
import { inGameLayout } from './inGameLayout';

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
        // playersDiv.innerHTML += "<li>Player: " + player.username + " &nbsp; - &nbsp; Lv: 8 &nbsp; - &nbsp; Wins : 0</li>";
        playersDiv.appendChild(doc.body.firstChild)
    })
    // let userJoined = parsedData.players[parsedData.players.length - 1]
    // playersDiv.innerHTML = playersDiv.innerHTML + "<li>Player: " + userJoined.username + " &nbsp; - &nbsp; Lv: 8 &nbsp; - &nbsp; Wins : 0</li>";

}

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
            console.log("interval");
            timer.innerText = current;
        }, 1000);

        socket.on('joined', function (msg) {
            
            let parsed = JSON.parse(msg);
            otherPlayers = parsed.players.filter((item) => item.username!=card.username)
           
            let messagesDiv = document.getElementById("listLobbyMessages");

            timer.innerText = parsed.countDown;
            // clearInterval(intervalTimer);

            console.log(parsed);
            renderPlayersLobby(parsed)
            let userJoined = parsed.players[parsed.players.length - 1]
            let notif = userJoined.username + " has joined to the game"
            
            messagesDiv.innerHTML = messagesDiv.innerHTML + "<li>" + notif + "</li>";
        });
        //Event notifying starts the game
        socket.on('starts_game', function (msg) {
            let div_bg = document.getElementById('div_bg');
            clearInterval(intervalTimer);
            // div_bg.remove();           
            showModal(inGameLayout(socket, card, otherPlayers));
            //messagesDiv.innerHTML = "";
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