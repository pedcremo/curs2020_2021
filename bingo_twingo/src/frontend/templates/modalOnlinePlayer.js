import { app } from '../index.js';
import { debug, clearModal } from '../js/core/core';
import '../css/modalOnlinePlayer.css';
import {setupBackgroundVideo} from '../utils/background';



export const modalOnlinePlayer = () => {

    const controllers = () => {
        
        setupBackgroundVideo();
        debug("load modalOnlinePlayer")
        let start_online = document.getElementById("start_online")
        start_online.onclick = function () {
            let checkName = (name) => {
                let regEx = /[aA1-zZ9]/;
                if (regEx.test(name)) {
                    return true;
                } else {
                    return false;
                }
            }
            let username = document.getElementById("username_online").value;
            if(username){
                if(checkName(username)){
                    clearModal("modal");
                    app.start_online(username);
                }
            }
            
        }
    }

    return {
        template:
            `
            <div id="menu_principal" class="modal modal__online__player">
                <!-- Modal content -->
                <div class="modal-content modal__online__player__content">
                <div class="modal__online__player__body">
                    <div class="modal__online__player__body__header">
                        <h1>USERNAME</h1>
                        <input class="modal__online__player__body__header__input" placeholder="USERNAME" type="text" id="username_online" name="username_online">
                    </div>
                    <div class="modal__online__player__body__options">
                        <button id="start_online" class="button start">START</button>
                    </div>
                </div> 
                </div>
            </div>`,
        controllers: controllers

    }
}