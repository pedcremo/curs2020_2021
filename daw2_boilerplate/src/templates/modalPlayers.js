import video from '../videos/los_bingueros.mp4';
import {Toastr} from '../js/core/toaster.js';
const toaster = new Toastr();

// Set background video
function setupBackgroundVideo(){
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

// Draw the players in localStorage. Each time you add or delete a player, this function is called.
function setupPlayers(){
    let uList=document.getElementById("listPlayers");
    // Delete all palyers before drawing them again
    while (uList.firstChild) {
        uList.removeChild(uList.lastChild);
    }
    // Draw all current players
    let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
    playersNames.forEach((name,index) => {
        let li=document.createElement('li');
        li.setAttribute("id", "player_"+name);
        li.innerHTML = `<span class='players'>${index+1}</span><p>${name}</p>`;
        li.addEventListener('click',(event) => {
            let name=li.id.replace('player_','');
            let cont = 0;
            for(let i=0; i<playersNames.length; i++){
                if (name==playersNames[i]) cont+=1
            }
            // If the name is repeated, only delete it one time
            if(cont>1){
                let index = playersNames.indexOf(name);
                playersNames.splice(index, 1);
            }else{
                playersNames=playersNames.filter((item) => item!=name);
            }
            localStorage.setItem('playersNames',JSON.stringify(playersNames));
            let modal = modalPlayers(false);
            modal.controllers();
        })
        uList.appendChild(li);
    });
}

export const modalPlayers =(video=true)=>{
    if(video) setupBackgroundVideo()
    
    const controllers = () => {
        /*
        * First add the current players in localstorage. Then, if you hit the
        * add player button you can add more. You can also delete them
        * by clicking in their names
        */
        let addButton=document.getElementById('addplayer');
        if (addButton) {
            setupPlayers();

            addButton.addEventListener("click",(event)=>{     
                if(!document.getElementById("fname").value){
                    toaster.error("First add the player name");
                }else{
                    let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];

                    if (window.localStorage){
                        playersNames.push(document.getElementById("fname").value);
                        localStorage.setItem('playersNames',JSON.stringify(playersNames));
                        document.getElementById("fname").value = null;
                        let modal = modalPlayers(false);
                        modal.controllers();
                    }
                }
            })
        }

        // Mute and unmute the background video button
        let unmuteBtn=document.getElementById('unmuteBtn');
        unmuteBtn.addEventListener('click', function() {
            let video=document.getElementById('videoBackground');
            if(video.muted){
                video.muted = false;
                document.querySelector('#unmuteBtn').innerHTML = 'Mute';
            }else{
                video.muted = true;
                document.querySelector('#unmuteBtn').innerHTML = 'Unmute';
            }
        });
    }

    return{template:    
    `<div id="playersForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <h1>Bingo players</h1>
                <p></p>
                <div class='players'>
                <ol id="listPlayers"></ol>
                </div>
                <form id="modalPardal">
                    <input type="text" id="fname" name="fname" placeholder="Player name">                                
                </form>
                <button id='startGame' class="button startGame">Start Game</button>
                <button id='addplayer' class="button">Add Player</button>
                <button id="unmuteBtn" class="button">Unmute</button>
            </div>  
    </div>`,
    controllers:controllers,
    templateName:"modalPlayers"}
}