export const modalPlayers = (callback, changeSpeed) => {
    const controllers = () => {
        let addButton = document.getElementById('addplayer');
        if (addButton) {
            let uList = document.getElementById("listPlayers");
            let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
            playersNames.forEach((name, index) => {
                let li = document.createElement('li');
                li.innerHTML = `<span class='players'>${index + 1}</span><p>${name}</p>`;
                li.addEventListener('click', (event) => {
                    li.remove();
                    playersNames = playersNames.filter((item) => item != name)
                    localStorage.setItem('playersNames', JSON.stringify(playersNames));
                })
                uList.appendChild(li);
            });
            addButton.addEventListener("click", (event) => {
                let li = document.createElement('li');

                // We check if that player name is already stored
                if (window.localStorage && !window.localStorage.getItem('playersNames').includes(document.getElementById("fname").value)) {
                    li.innerHTML = `<span class='players'>${uList.children.length + 1}</span><p>${document.getElementById("fname").value}</p>`;
                    uList.appendChild(li);
                    playersNames.push(document.getElementById("fname").value);
                    localStorage.setItem('playersNames', JSON.stringify(playersNames));
                    // Clear the player name input
                    document.getElementById("fname").value = "";
                }
                li.addEventListener('click', (event) => {
                    li.remove();
                    playersNames = playersNames.filter((item) => item != li.innerHTML)
                    localStorage.setItem('playersNames', JSON.stringify(playersNames));
                })
            })
        }

        // An improved mute/unmute button

        let unmuteBtn = document.getElementById('unmuteBtn');
        unmuteBtn.addEventListener('click', function () {
            let video = document.getElementById('videoBackground');
            video.muted = !video.muted;
            unmuteBtn.innerHTML = video.muted ? "Unmute" : "Mute"
        });

        // The new play button to avoid the outside click for start the game

        let playGame = document.getElementById('playgame');
        playGame.addEventListener('click', function () {
            document.getElementById('playersForm').style.display = "none";
            callback();
        });

        // The new input for the game speed

        let gameSpeed = document.getElementById('gameSpeed');
        gameSpeed.onchange = () => {
            changeSpeed(gameSpeed.value * 1000);
        };
    }

    return {
        template:
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
                <button id='playgame' class="button">Play Game</button>
                <input id='gameSpeed' placeholder="Game speed (secs)" type="number" min="1" max="5" value="2"/>
                <button id="unmuteBtn" class="button">Unmute</button>

            
            </div>  
        </div>

    `, controllers: controllers
    }
}