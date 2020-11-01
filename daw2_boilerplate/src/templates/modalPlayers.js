import video from '../videos/los_bingueros.mp4';
import {app} from '../index.js';
import '../css/modalPlayers.css';

export const modalPlayers =()=>{
    const controllers = () => {
        let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
        let addButton=document.getElementById('addplayer');
        if (addButton) {
            let uList=document.getElementById("listPlayers");
            playersNames.forEach((name,index) => {
                let li=document.createElement('li');
                li.innerHTML = `<span class='players'>${index+1}</span><p>${name}</p>`;
                li.addEventListener('click',(event) => {
                    li.remove();
                    playersNames=playersNames.filter((item) => item!=name)
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                })
                uList.appendChild(li);
            });
            addButton.addEventListener("click",(event)=>{  
                let namePlayer=document.getElementById("fname").value;          
                if (namePlayer) {
                    let li=document.createElement('li');
                    li.innerHTML = `<span class='players'>${uList.children.length+1}</span><p>${document.getElementById("fname").value}</p>`;
                    uList.appendChild(li);
                    if (window.localStorage){
                        playersNames.push(document.getElementById("fname").value);
                        localStorage.setItem('playersNames',JSON.stringify(playersNames));
                        console.log(localStorage.getItem('playersNames'));
                    }
                    li.addEventListener('click',(event) => {
                        li.remove();
                        console.log(namePlayer);
                        var filtered = playersNames.filter(function(e) { return e !== namePlayer })
                        localStorage.setItem('playersNames',JSON.stringify(filtered));
                        console.log(localStorage.getItem('playersNames'));
                    })
                    document.getElementById("fname").value = "";
                }else{
                    document.getElementById('msg--err').innerHTML = "Enter the player's name!"
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

        let playBtn=document.getElementById('playBtn');
        playBtn.addEventListener('click',function() {
            if (playersNames.length !== 0 && playersNames != undefined){
                let m=document.getElementById('playersForm');
                m.style.display = "none";       
                app.speed = (parseFloat(inputVal.value) * 1000);
                app.start();
            }else{
                document.getElementById('msg--err').innerHTML = "Add some players first!"
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
            <div class="modal-content">
                <span class="close">&times;</span>
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
                    
                    <div class="spinner__opts" style="margin-left:10px">
                        <span> Timer: (sec)</span>
                        <div class="spinner">
                            <button type="button" id="spinner__down" class="spinner__btn spinner__down">&lsaquo;</button>
                            <input type="number" id="spinner__value" class="spinner__value" name="time" id="match_time" min="0.1" max="5" step="0.1" value="0.5">
                            <button type="button" id="spinner__up" class="spinner__btn spinner__up">&rsaquo;</button>
                        </div>    
                    </div>
                </div>
            
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