export const modalPlayers =()=>{
    const controllers = () => {
        let addButton=document.getElementById('addplayer');
        if (addButton) {
            let uList=document.getElementById("listPlayers");
            let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];

            /**
             * Evento para eliminar el usuario
             */
            let addEventUserRemove = (li, name) => {
                li.addEventListener('click',(event) => {
                    li.remove();
                    playersNames=playersNames.filter((item) => item!=name)
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                });// end_addEventListener
            }// end_addEventUserRemove

            /**
             * Renderizado de usuarios
             */
            let renderUsers = (name, num) => {
                let li=document.createElement('li');
                li.innerHTML = `<span class='players'>${num + 1}</span><p>${name}</p>`;
                addEventUserRemove(li, name);
                uList.appendChild(li);
            }// end_renderUsers

            /**
             * Función para añadir usuarios
             */
            let addUser = () => {
                let username = document.getElementById("fname");
                if (username.value.length <= 0) return;
                renderUsers(username.value, uList.children.length);
                if (window.localStorage){
                    playersNames.push(username.value);
                    localStorage.setItem('playersNames',JSON.stringify(playersNames));
                }// end_if
                username.value = "";
            }// end_addUser

            /**
             * Renderizado de usuarios al inicio
             */
            playersNames.forEach((name,index) => {renderUsers(name, index)});

            /**
             * Eventos para añadir usuarios
             */
            addButton.addEventListener("click", addUser);
            document.getElementById('fname').addEventListener('keydown', (e) => {
                if (e.keyCode == 13) {
                    addUser();
                    e.preventDefault();
                }// end_if
            });
        }
        let unmuteBtn=document.getElementById('unmuteBtn');
        unmuteBtn.addEventListener('click', function() {
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