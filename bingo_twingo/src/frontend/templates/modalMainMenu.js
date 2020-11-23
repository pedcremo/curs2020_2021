import { debug, clearModal, showModal } from '../js/core/core';
import { app } from '../index.js';
import '../css/modalMainMenu.css';
import * as utils from '../js/utils.js'
import { modalLobbyPlayers } from './modalLobbyPlayers.js';
// import io from '../js/core/socket.io.js';
import io from 'socket.io-client'
import { modalPlayers } from './modalPlayers';

export const modalMainMenu = () => {

    const controllers = () => {
        let siteIP = location.host;
        if (localStorage.getItem('onlineUsername') != '' || localStorage.getItem('onlineUsername') != undefined){
            document.getElementById('usernameP').value = localStorage.getItem('onlineUsername');
        }
        console.log(location.host);
        /* Load background video with mute/hide video options */
        // utils.setupBackgroundVideo(); 

        console.log("controller mainmenu");
        document.getElementById('playOnline').onclick = function () {
            localStorage.setItem('onlineUsername',document.getElementById('usernameP').value)
            // const socket = io('ws://localhost:8080', {transports: ['websocket']});
            const socket = io('ws://'+siteIP, {transports: ['websocket']});
            socket.on('connect', () => {
                socket.emit('join', document.getElementById('usernameP').value);
                console.log("EMIT")
            });

            /* Event triggered once a user joins a 
            * game and get a ramdom card with unique id that 
            * should not be shared
            */
           socket.on('joined_game', function (msg) {
            // let messagesDiv = document.getElementById("chatMessages");
            console.log(msg);
            let card = JSON.parse(msg)
            // messagesDiv.innerHTML = "<li style='background-color: red'>" + msg + "</li>" + messagesDiv.innerHTML;
            showModal(modalLobbyPlayers(socket,card))
         });

            
        }

        // Offline Game
        document.getElementById('playOffline').onclick = function () {
            showModal(modalPlayers(), app.start)
        }
    }

    return {
        template:
            `
            <div id="mainMenu" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <h1>BINGO TWINGO</h1>
                    <p></p>
                    <input type="text" id="usernameP" name="usernameP" placeholder="Online username:">
                    <div class="menu__options">
                        <button id='playOffline' class="mainMenu__btn menu__offline_btn">Start Offline Game</button>
                        <button id='playOnline' class="mainMenu__btn menu__online_btn">Search Online Game</button>
                    </div>
                    
                </div>
            </div>`,
        controllers: controllers
    }
}