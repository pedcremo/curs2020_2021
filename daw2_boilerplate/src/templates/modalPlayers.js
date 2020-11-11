import video from '../videos/los_bingueros.mp4';
import {app} from '../index.js';

export const modalPlayers =()=>{
    const controllers = () => {
        let addButton=document.getElementById('addplayer');
        if (addButton) {
            let uList=document.getElementById("listPlayers");
            let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
            playersNames.forEach((name,index) => {
                let li=document.createElement('li');
                li.setAttribute("id", "player_"+name);
                li.innerHTML = `<span class='players'>${index+1}</span><p>${name}</p>`;
                li.addEventListener('click',(event) => {
                    let name=li.id.replace('player_','');
                    li.remove();
                    playersNames=playersNames.filter((item) => item!=name);
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                })
                uList.appendChild(li);
            });
            addButton.addEventListener("click",(event)=>{  
                addplayer(playersNames, uList)
            })

            document.getElementById("fname").addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    console.log("")
                    addplayer(playersNames, uList)

                }
            })

        }

        let playBtn=document.getElementById('playBtn');
        playBtn.addEventListener('click',function() {
            let m=document.getElementById('playersForm');
            m.style.display = "none";       
            app.start();
        });
        let unmuteBtn=document.getElementById('unmuteBtn');
        
        let videoEl=document.getElementById('videoBackground');
        videoEl.currentTime += Math.round(Math.random()*400);
        unmuteBtn.addEventListener('click', function() {                        
            videoEl.muted = false;
        });
    }

    let addplayer=(...variables)=>{
        let playersNames=variables[0]
        let uList=variables[1]
        let namePlayer=document.getElementById("fname").value;    
            if (!localStorage.getItem('playersNames') || (namePlayer && window.localStorage && !window.localStorage.getItem('playersNames').includes(namePlayer))) {
                let li=document.createElement('li');
                li.setAttribute("id", "player_"+namePlayer);
                li.innerHTML = `<span class='players'>${uList.children.length+1}</span><p>${namePlayer}</p>`;
                uList.appendChild(li);
                if (window.localStorage){
                    playersNames.push(namePlayer);
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                }
                li.addEventListener('click',(event) => {
                    let name=li.id.replace('player_','');
                    li.remove();
                    playersNames=playersNames.filter((item) => item!=name)
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                })
                document.getElementById("fname").value="";
            }
        
    }
    
    return{template:    
    `<div id="playersForm" class="modal">
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
                <button id='playBtn' class="button">PLAY</button>
                <button id="unmuteBtn" class="button">Unmute</button>
            </div>  
            
        </div>
        <div>
            <video autoplay muted loop id="videoBackground">
                <source src="${video}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            
        </div>`

        ,controllers:controllers}
}