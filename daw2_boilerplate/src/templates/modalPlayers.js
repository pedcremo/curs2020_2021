import video from '../videos/los_bingueros.mp4';
import { app } from '../index.js';


// Set background video
function setupBackgroundVideo() {
    let backgroundVideo = `<div><video autoplay muted loop id="videoBackground">
            <source src="${video}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        </div>
        `;
    let parser = new DOMParser();
    let videoEl = parser.parseFromString(backgroundVideo, "text/html");
    videoEl = videoEl.body.firstChild;
    document.body.appendChild(videoEl);
}

// Set html players modal again to not concatenate events (avoid event problems)
function setupModal() {
    // document.getElementById("playersForm").innerHTML =
    //     `<!-- Modal content -->
    // <div class="modal-content">
    //     <h1>Bingo players</h1>
    //     <p></p>
    //     <div class='players'>
    //     <ol id="listPlayers"></ol>
    //     </div>
    //     <div style="display:flex">
    //     <input type="text" id="fname" name="fname" placeholder="Player name">                                                
    //     <button id='addplayer' class="button">Add</button>
    //     </div>
    //     <button id='playBtn' class="button">PLAY</button>
    //     <button id="unmuteBtn" class="button">Unmute</button>
    // </div>`
}

// Draw the players in localStorage. Each time you add or delete a player, this function is called.
function setupPlayers() {
    let uList = document.getElementById("listPlayers");
    // Delete all palyers before drawing them again
    while (uList.firstChild) {
        uList.removeChild(uList.lastChild);
    }
    // Draw all current players
    let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
    playersNames.forEach((name, index) => {
        let li = document.createElement('li');
        li.setAttribute("id", "player_" + name);
        li.innerHTML = `<span class='players'>${index + 1}</span><p>${name}</p>`;
        li.addEventListener('click', (event) => {
            let name = li.id.replace('player_', '');
            let cont = 0;
            for (let i = 0; i < playersNames.length; i++) {
                if (name == playersNames[i]) cont += 1
            }
            // If the name is repeated, only delete it one time
            if (cont > 1) {
                let index = playersNames.indexOf(name);
                playersNames.splice(index, 1);
            } else {
                playersNames = playersNames.filter((item) => item != name);
            }
            localStorage.setItem('playersNames', JSON.stringify(playersNames));
            let modal = modalPlayers(false);
            modal.controllers();
        })
        uList.appendChild(li);
    });
}

export const modalPlayers = (repeat = true) => {
    (repeat) ? setupBackgroundVideo() : setupModal();

    const controllers = () => {
        /*
        * First add the current players in localstorage. Then, if you hit the
        * add player button you can add more. You can also delete them
        * by clicking in their names
        */
        let addButton = document.getElementById('addplayer');
        if (addButton) {
            setupPlayers();

            let checkName = (name) => {
                let regEx = /[aA1-zZ9]/;
                if (regEx.test(name)) {
                    return true;
                } else {
                    return false;
                }
            }

            addButton.addEventListener("click", (event) => {
                let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
                if (document.getElementById("fname").value === "") {
                    alert("First add the player name");
                } else if (playersNames.includes(document.getElementById("fname").value)) {
                    alert("Don't repeat name");
                } else if (!checkName(document.getElementById("fname").value)) {
                    alert("Nombre no permitido");
                } else {
                    if (window.localStorage) {
                        playersNames.push(document.getElementById("fname").value);
                        localStorage.setItem('playersNames', JSON.stringify(playersNames));
                        document.getElementById("fname").value = null;
                        let modal = modalPlayers(false);
                        modal.controllers();
                    }
                }
            })
        }

        
        //Set interval time options =======================
        let inputVal = document.querySelector('#spinner__value');
        let btnUp = document.querySelector('#spinner__up');
        let btnDown = document.querySelector('#spinner__down');

        btnUp.onclick = function () {
            let value = parseFloat(inputVal.value);
            if (value < 5.0) inputVal.value = (value + parseFloat(0.1)).toFixed(1);
        };

        btnDown.onclick = function () {
            let value = parseFloat(inputVal.value);
            if (value > 0.1) inputVal.value = (value - parseFloat(0.1)).toFixed(1);
        };  

        // =================================================


        let playBtn = document.getElementById('playBtn');
        // playBtn.addEventListener('click', function () {
        //     let m = document.getElementById('playersForm');
        //     m.style.display = "none";
        //     app.start();
        // });

        playBtn.addEventListener('click',function() {
            let m=document.getElementById('playersForm');
            m.style.display = "none";       
            app.speed = (parseFloat(inputVal.value) * 1000);
            console.log(app.speed);
            app.start();
        });

        // Mute and unmute the background video button
        let unmuteBtn = document.getElementById('unmuteBtn');
        unmuteBtn.addEventListener('click', function () {
            let video = document.getElementById('videoBackground');
            if (video.muted) {
                video.muted = false;
                document.querySelector('#unmuteBtn').innerHTML = 'Mute';
            } else {
                video.muted = true;
                document.querySelector('#unmuteBtn').innerHTML = 'Unmute';
            }
        });
    }

    return {
        template:
            `
            <div id="playersForm" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <h1>Bingo players</h1>
                    <p></p>
                    <div class='players'>
                        <ol id="listPlayers"></ol>
                    </div>
                    <div style="display:flex">
                        <input type="text" id="fname" name="fname" placeholder="Player name">
                        <button id='addplayer' class="button">Add</button>
                    </div>
                    <p class="msg--error" id="msg--err"></p>
                    <div class="menu__options">
                        <button id='playBtn' class="button">PLAY</button>
                        <button id="unmuteBtn" class="button">Unmute</button>
                        <!-- SPEED OPTIONS -->
                        <div class="spinner__opts" style="margin-left:10px">
                            <span> Timer: (sec)</span>
                            <div class="spinner">
                                <button type="button" id="spinner__down" class="spinner__btn spinner__down">&lsaquo;</button>
                                <input type="number" id="spinner__value" class="spinner__value" name="time" id="match_time"
                                    min="0.1" max="5" step="0.1" value="5">
                                <button type="button" id="spinner__up" class="spinner__btn spinner__up">&rsaquo;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
        controllers: controllers
    }
}