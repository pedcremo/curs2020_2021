import { app } from '../index.js';
import { debug, clearModal } from '../js/core/core';
import '../css/modalLobby.css';
import {setupBackgroundVideo} from '../utils/background';
import {BingoCardOnline} from '../js/card_online'



export const modalLobby = (socket) => {

    const controllers = () => {
        clearModal()
        setupBackgroundVideo();
        let timeleft;
        let TotalPlayers= [];
        debug("load modalLobby")
        socket.on('joined_game', function (player_info) {
            BingoCardOnline.render_online_card(player_info.cardMatrix,player_info.username,'card_lobby')
        });
        //Event triggered every time a user joins a 
        //game where we are enrolled
        socket.on('joined', function (game_info) {
            console.log("dentro de joined");
            let info_game = document.getElementById("modal__lobby__body__full__info");
            let last_player = game_info.players[game_info.players.length -1];
            info_game.innerHTML += `<span>${last_player.username} se ha unido!</span>`
            timeleft = game_info.countDown;
        });

        let Timer = setInterval(function(){
            document.getElementById("progressBar").value = 10 - timeleft;
            document.getElementById("countDown").innerHTML = timeleft;
            timeleft -= 1;
        }, 1000);

        socket.on('starts_game', function (data) {
            clearInterval(Timer)
            clearModal('modal');
            clearModal('bg')
            app.start_game_online(data,socket);
        });
        
    }

    return {
        template:
            `
            <div id="modal__lobby" class="modal modal__lobby">
                <!-- Modal content -->
                <div class="modal-content modal__lobby__content">
                <div class="modal__lobby__body">
                    <div class="modal__lobby__body__header">
                        <h1>ROOM</h1>
                    </div>
                    <div class="modal__lobby__body__full">
                        <div id="modal__lobby__body__full__player" class="modal__lobby__body__full__player">
                            <span>Players: <span id="total_players"></span></span>
                            <div id="card_lobby" class="modal__lobby__body__full__player__card">
                            </div>
                            <div id="lobby_time" class="modal__lobby__body__full__lobby__time">
                                <progress value="0" max="10" id="progressBar"></progress>
                                <span id="countDown"></span>
                            </div>
                        </div>
                        <div id="modal__lobby__body__full__info" class="modal__lobby__body__full__info">

                        </div>
                    </div>
                </div> 
                </div>
            </div>`,
        controllers: controllers

    }
}