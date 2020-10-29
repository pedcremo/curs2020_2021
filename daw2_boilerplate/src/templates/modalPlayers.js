import video from '../videos/los_bingueros.mp4';
import {app} from '../index.js';

export const modalPlayers =()=>{
    const controllers = () => {
        let addButton=document.getElementById('addplayer');
        //if exists the add button, do..
        if (addButton) {
            let uList=document.getElementById("listPlayers");
            let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
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
            //click to add player
            addButton.addEventListener("click",(event)=>{  
                let namePlayer=document.getElementById("fname").value;      
                //if player name exists    
                if (namePlayer) {
                    let li=document.createElement('li');
                    li.innerHTML = `<span class='players'>${uList.children.length+1}</span><p>${document.getElementById("fname").value}</p>`;
                    uList.appendChild(li);
                    //if exists local storage..
                    if (window.localStorage){
                        playersNames.push(document.getElementById("fname").value);
                        localStorage.setItem('playersNames',JSON.stringify(playersNames));
                    }//end-if localStorage
                    document.getElementById("fname").value='';
                    li.addEventListener('click',(event) => {
                        li.remove();
                        //if you put the name of the player you can delete in localstorage
                        playersNames=playersNames.filter((item) => item!=namePlayer)
                        localStorage.setItem('playersNames',JSON.stringify(playersNames));
                    })
                }//end-if Players
            })
        }
      
        let playBtn=document.getElementById('playBtn');
        //Play button
        playBtn.addEventListener('click',function() {
            //Check if are users in localStorage
            if(JSON.parse(localStorage.getItem('playersNames')).length==0){
                alert("Add players to play!")
                return;
            }
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
    
    return{template:    
    `
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
                <button id='playBtn' class="button">PLAY</button>
                <button id="unmuteBtn" class="button">Unmute</button>

            
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