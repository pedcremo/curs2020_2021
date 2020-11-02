import video from '../videos/los_bingueros.mp4';
import {app} from '../index.js';
import '../css/modalPlayers.css';

/**
 * That's a template that can be rendered by ShowModal's function. It contains a Literal Template, and the actions that have to be initiated when the modal it's displayed. You can add the players to the game (with error controls for deny if are repeated names or the match doesn't have any player, and if you didn't write any name) You can set the time that will have the game (The seconds that will take to get a number) 
 */
export const modalPlayers =()=>{
    const controllers = () => {
        let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
        document.getElementById('remainingPlayersSpan').innerHTML = "Players: "+playersNames.length + "/50 ";
        let addButton=document.getElementById('addplayer');
        if (addButton) {
            let uList=document.getElementById("listPlayers");
            playersNames.forEach((name,index) => {
                let li=document.createElement('li');
                li.innerHTML = `<div><span class='players'>${index+1}</span><p>${name}</p></div><span class="removePlayer">&times;</span>`;
                li.addEventListener('click',(event) => {
                    li.remove();
                    playersNames=playersNames.filter((item) => item!=name)
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                    document.getElementById('remainingPlayersSpan').innerHTML = "Players: "+playersNames.length + "/50 ";
                })
                uList.appendChild(li);
            });
            addButton.addEventListener("click",(event)=>{  
                let namePlayer=document.getElementById("fname").value;          
                if (namePlayer) {
                    if (!playersNames.includes(namePlayer)) {
                        document.getElementById('msg--err').innerHTML = "";
                        let li=document.createElement('li');
                        li.innerHTML = `<div><span class='players'>${uList.children.length+1}</span><p>${document.getElementById("fname").value}</p></div><span class="removePlayer">&times;</span>`;
                        uList.appendChild(li);
                        if (window.localStorage){
                            playersNames.push(document.getElementById("fname").value);
                            localStorage.setItem('playersNames',JSON.stringify(playersNames));
                            document.getElementById('remainingPlayersSpan').innerHTML = "Players: "+playersNames.length + "/50 ";
                        }
                        li.addEventListener('click',(event) => {
                            li.remove();
                            let filtered = playersNames.filter(function(e) { return e !== namePlayer })
                            localStorage.setItem('playersNames',JSON.stringify(filtered));
                            document.getElementById('remainingPlayersSpan').innerHTML = "Players: "+filtered.length + "/50 ";
                        })
                        document.getElementById("fname").value = "";
                    }else{
                        document.getElementById('msg--err').innerHTML = "\u26A0  You cannot introduce repeated names!"
                    }
                    
                }else{
                    document.getElementById('msg--err').innerHTML = "\u26A0  Enter the player's name!"
                }
            })
        }

        //When press enter for add player
        document.getElementById("fname").addEventListener("keyup", function (event) { //Add player pressing enter in input
            if (event.keyCode === 13) {
                event.preventDefault();
                document.getElementById("addplayer").click();
            }
        });

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

        let playBtn=document.getElementById('playBtn');
        playBtn.addEventListener('click',function() {
            if (playersNames.length !== 0 && playersNames != undefined){
                document.getElementById('msg--err').innerHTML = "";
                let m=document.getElementById('playersForm');
                m.style.display = "none";       
                app.speed = (parseFloat(inputVal.value) * 1000);
                app.start();
            }else{
                document.getElementById('msg--err').innerHTML = "\u26A0  Add some players first!"
            }
        });
        let unmuteBtn=document.getElementById('unmuteBtn');
        
        let videoEl=document.getElementById('videoBackground');
        videoEl.currentTime += Math.round(Math.random()*400);
        unmuteBtn.addEventListener('click', function() {        
            if (this.classList.contains('mutted')){
                this.className = "fas fa-volume-off btn--mute"
                videoEl.muted = false;
            }else{
                this.className = "fas fa-volume-mute btn--mute mutted"
                videoEl.muted = true;
            }
        });
    }
    
    return{template:    
    `
    <i class="fas fa-volume-mute btn--mute mutted" id="unmuteBtn"></i>
    <div id="playersForm" class="modal">
        <!-- Modal content -->
        <div class="modal-content ">
            <span class="close">&times;</span>
            <h1>BINGO TWINGO</h1>
            <div class='modal__players__list'>
            <ol id="listPlayers"></ol>
            </div>                   
            <div class="menu__addPlayer">
                <input type="text" id="fname" name="fname" placeholder="Player name">                                               
                <i class="far fa-plus-square menu__addPlayer__btn" id='addplayer'></i>
            </div>
            <p class="msg--error" id="msg--err"></p>
            <div class="menu__options">
                <button id='playBtn' class="menu__start_btn">START GAME</button>
            </div>
            <div class="spinner__opts" style="margin-left:10px">
                <span> Timer: (sec)</span>
                <div class="spinner">
                    <button type="button" id="spinner__down" class="spinner__btn spinner__down">&lsaquo;</button>
                    <input type="number" id="spinner__value" class="spinner__value" name="time" id="match_time" min="0.1" max="5" step="0.1" value="5">
                    <button type="button" id="spinner__up" class="spinner__btn spinner__up">&rsaquo;</button>
                </div>    
            </div>
            <span class="remainingPlayers" id="remainingPlayersSpan"></span>
        </div>  
    </div>

    <div>
        <video autoplay muted loop id="videoBackground">
            <source src="${video}" type="video/mp4">
            Your browser does not support HTML5 video.
        </video>
        
    </div>     
                         
       
    

    `,controllers:controllers}
}