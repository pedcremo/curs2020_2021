import { showModal, clearModal } from '../js/core/core';
import '../css/modalPlayers.css';
import { modalPlayers } from './modalPlayers.js';
import { validation_user } from '../../../utils/validations.js'
import { app } from '../index.js';


export const modalPlay = () => {

    const controllers = () => {
        clearModal("gameLayout") //clear the game


        let playbtnonline = document.getElementById('playBtnonline');


        playbtnonline.onclick = function () {
            // validation_user("play") == true ? app.online() : false
            if( (validation_user("play")) == (true) ){
                let m = document.getElementById('playersForm');
                m.style.display = "none";
                let div_bg = document.getElementById('div_bg');
                div_bg.remove();
                app.online();

            }
        }



        /**
         * Add player on press enter key
         */
        document.getElementById("fname").addEventListener("keyup", function (event) { //Add player pressing enter in input
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("playBtnonline").click();
            }
        });

        let offline = document.getElementById('offline');
        offline.onclick = function () {
            showModal(modalPlayers())
        }
    }

    return {
        template:
            `
        <div id="playersForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <h1>BINGO TWINGO ONLINE MODE</h1>
                <button id="offline" class="button">Offline Mode</button>


                <p></p>
                <div class="menu__addPlayer">
                    <input type="text" id="fname" name="fname" placeholder="Player name">                                               
                </div>
                <p class="msg--error" id="msg--err"></p>
                <div class="menu__options">
                    <button id='playBtnonline' class="menu__start_btn">START GAME</button>
                </div>
                </div>
            </div>
        </div>`,
        controllers: controllers
    }
}