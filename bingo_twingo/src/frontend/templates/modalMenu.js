import { app } from '../index.js';
import { debug, clearModal } from '../js/core/core';
import '../css/modalMenu.css';
import {setupBackgroundVideo} from '../utils/background';

export const modalMenu = () => {

    const controllers = () => {
        setupBackgroundVideo();
        let play_online = document.getElementById('play_online');
        let play_offline = document.getElementById('play_offline');
        play_offline.onclick = function () {
            clearModal("modal")
            app.offline_mode();
        }
        play_online.onclick = function () {
            console.log("ONLINE MODE");
        }
    }

    return {
        template:
            `
            <div id="menu_principal" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                <div class="menu">
                    <div class="menu__header">
                        <h1>MENU</h1>
                    </div>
                    <div class="menu__buttons">
                        <button id="play_online" class="button online">Online</button>
                        <button id="play_offline" class="button offline">Offline</button>
                    </div>
                </div>

                    
                </div>
            </div>`,
        controllers: controllers

    }
}