export const modalPlayers =()=>{
    const controllers = () => {
        let addButton=document.getElementById('addplayer');
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
                            
                let li=document.createElement('li');
                li.innerHTML = `<span class='players'>${uList.children.length+1}</span><p>${document.getElementById("fname").value}</p>`;
                uList.appendChild(li);
                if (window.localStorage){
                    playersNames.push(document.getElementById("fname").value);
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                }
                li.addEventListener('click',(event) => {
                    li.remove();
                    playersNames=playersNames.filter((item) => item!=li.innerHTML)
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                })
            })
        }
        let unmuteBtn=document.getElementById('unmuteBtn');
        unmuteBtn.addEventListener('click', function() {
            console.log("galdll");
            let video=document.getElementById('videoBackground');
            video.muted = false;
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
                <form id="modalPardal">
                   
                    <input type="text" id="fname" name="fname" placeholder="Player name">                                
                </form>
                <button id='addplayer' class="button">Add Player</button>
                <button id="unmuteBtn" class="button">Unmute</button>

            
            </div>  
        </div>

    `,controllers:controllers}
}