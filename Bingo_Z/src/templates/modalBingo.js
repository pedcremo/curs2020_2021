import img from '../images/bingo.gif';
import audio from '../audios/Bingo Sound Effect.mp3';
/**
* It's a function that when any player win the bingo  there is a background audio that sings bingo!!
* This function I'll  imported it into index and called it in  pubSub.subscribe("BINGO")
*/

export function setupAudioBingoWin() {
    let audioBackground = `
        <div id="sound">
            <audio controls  autoplay  loop id="uefaChamps">
                  <source src="${audio}" type="audio/mpeg">
             </audio>
        </div>
        `;
    let parser = new DOMParser();
    let uefaAudio = parser.parseFromString(audioBackground, "text/html");


    uefaAudio = uefaAudio.body.firstChild;
    uefaAudio.currentTime = Math.round(Math.random() * 10);
    document.body.appendChild(uefaAudio);
}

/**
 * Exports this conts that contains the modalBingo is that when you win the game show you a modal with a gif
 */

export const modalBingo = (player) =>

    `

<div id="bingoForm" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h1>Bingo Bangoo ${player}</h1>
            <img src=${img} />
        </div>  


    </div>

`
