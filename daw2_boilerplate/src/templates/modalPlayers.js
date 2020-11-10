import video from '../videos/los_bingueros.mp4';
import {app} from '../index.js';
import { debug } from '../js/core/core';

export const modalPlayers =()=>{
    const controllers = () => {
        let addButton=document.getElementById('addplayer');
        let speed_val = document.getElementById('speed');

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
            addButton.addEventListener("click",(event)=>{  
                if(check_player_name(document.getElementById("fname").value)){
                    let namePlayer=document.getElementById("fname").value;          
                    if (namePlayer) {
                        let li=document.createElement('li');
                        li.id = namePlayer;
                        li.innerHTML = `<span class='players'>${uList.children.length+1}</span><p>${document.getElementById("fname").value}</p>`;
                        uList.appendChild(li);
                        if (window.localStorage){
                            playersNames.push(document.getElementById("fname").value);
                            localStorage.setItem('playersNames',JSON.stringify(playersNames));
                        }
                        
                        let remove = () =>{
                            playersNames=playersNames.filter((item) => item!=this.id)
                            localStorage.setItem('playersNames',JSON.stringify(playersNames));
                            this.remove();
                        }

                        li.addEventListener('click',remove)
                    }
                }else{
                    alert("No puedes insertar un user sin nombre!")
                }
            })
        }

        //This function we pass the value of the input. If it doesn't match the regex (check if it has at least one character, spaces don't count)
        let check_player_name = (player_name) =>{
            var regex_player=/\S/;
            if(regex_player.test(player_name)) return true;
            return false;
        }

        let playBtn=document.getElementById('playBtn');
        playBtn.addEventListener('click',function() {
            if(localStorage.getItem('playersNames')){
                if(JSON.parse(localStorage.getItem('playersNames')).length!=0){
                    let m=document.getElementById('playersForm');
                    m.style.display = "none";   
                    // debug(speed_val);
                    app.speed=speed_val.value *1000;
                    // debug(app.speed);  
                    app.start();
                }else{
                    alert("Introduce almenos un jugador");
                }
            }else{
                alert("Introduce almenos un jugador");
            }


        });
        let unmuteBtn=document.getElementById('unmuteBtn');
        let remove_video = document.getElementById('remove_video');
        
        let videoEl=document.getElementById('videoBackground');
        videoEl.currentTime += Math.round(Math.random()*400);
        unmuteBtn.addEventListener('click', function() {
            unmuteBtn.classList.toggle("active");
            if(unmuteBtn.classList.contains("active")){
                // unmuteBtn.classList.remove("active"); 
                unmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                videoEl.muted = false;
            }else{
                // unmuteBtn.classList.add("active"); 
                unmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                videoEl.muted = true;
            }                     
        });

        remove_video.addEventListener('click',function(){
            remove_video.classList.toggle("active");
            if(remove_video.classList.contains("active")){
                remove_video.innerHTML = '<i class="fas fa-video"></i>';
                videoEl.style.display="none";
            }else{
                remove_video.innerHTML = '<i class="fas fa-video-slash"></i>';
                videoEl.style.display="block";
            }   
        })

        //controla los inputs + y - del speed
        let speed_menu = () =>{
            speed_val.value=1;
            document.getElementById('speed_up').addEventListener("click",function(){
                if(parseFloat(speed_val.value) < 5.0){
                    speed_val.value = parseFloat(speed_val.value) + parseFloat(0.5);
                }
            })
            document.getElementById('speed_down').addEventListener("click",function(){
                if(parseFloat(speed_val.value) > 0.5){
                    speed_val.value = parseFloat(speed_val.value) - parseFloat(0.5)
                }
            })
        }
        speed_menu();


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
                <div class="options">
                    <button id='playBtn' class="button">PLAY</button>
                    <div class="speed_menu">
                        <small class="small_text">SPEED (seconds)</small>
                        <div class="speed_input">
                            <button type="button" id="speed_down" class="speed_button speed_down">-</button>
                            <input type="number" id="speed" name="speed">
                            <button type="button" id="speed_up" class="speed_button speed_up">+</button>
                        </div>
                    </div>
                </div>
            </div>  
            
        </div>
        <div id="background_menu" class="fondo">
            <video autoplay muted loop id="videoBackground">
                <source src="${video}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <div id="unmuteBtn"><i class="fas fa-volume-mute"></i></div>
            <div id="remove_video"><i class="fas fa-video-slash"></i></div>
        </div>     
                         
       
    

    `,controllers:controllers}
}