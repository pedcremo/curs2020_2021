export const modalPlayers =()=>{
    const controllers = () => {
        let addButton=document.getElementById('addplayer');
        if (addButton) {
            let uList=document.getElementById("listPlayers");
            let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
            playersNames.forEach(element => {
                let li=document.createElement('li');
                li.innerHTML = element;
                li.addEventListener('click',(event) => {
                    li.remove();
                    playersNames=playersNames.filter((item) => item!=element)
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                })
                uList.appendChild(li);
            });
            addButton.addEventListener("click",(event)=>{            
                            
                let li=document.createElement('li');
                li.innerHTML = document.getElementById("fname").value;
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
    }
    
    return{template:    
    `
    <div id="playersForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>Bingo players</h1>
                <p></p>
                <ul id="listPlayers"></ul>
                <form id="modalPardal">
                    <label for="fname">Player Name</label>
                    <input type="text" id="fname" name="fname">                                
                </form>
                <button id='addplayer' class="button">Add Player</button>
            </div>  
        </div>

    `,controllers:controllers}
}