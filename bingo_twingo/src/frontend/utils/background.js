import video from '../videos/los_bingueros.mp4';
import audio from '../audios/Bingo Sound Effect.mp3';
import '../css/modalPlayers.css';

/**
 * Set the backgroundVideo 
 */
export function setupBackgroundVideo() {
    let backgroundVideo = `
        <div id="div_bg" class="bg">
            <video autoplay muted loop id="videoBackground">
                <source src="${video}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <i class="fas fa-video-slash btn--removebg" id="remove_video"></i>
            <i class="fas fa-volume-mute btn--mute off--red" id="unmuteBtn"></i>
        </div>`;
    let parser = new DOMParser();
    let videoEl = parser.parseFromString(backgroundVideo, "text/html");
    videoEl = videoEl.body.firstChild;
    if(!document.getElementById("div_bg"))document.body.appendChild(videoEl);
        /**
     * Mute and unmute the background video button
     */
    
    let unmuteBtn = document.getElementById('unmuteBtn');
    let remove_video = document.getElementById('remove_video');
    let videoEl2 = document.getElementById('videoBackground');
    unmuteBtn.onclick = function () {
        videoEl2.muted = !videoEl2.muted;
        this.className = (videoEl2.muted == true) ? "fas fa-volume-mute btn--mute off--red" : "fas fa-volume-off btn--mute"
    }

    /**
     * Remove / show video background
     */
    remove_video.onclick = function () {
        console.log("REMOVE");
        if (this.classList.contains('off--red')) {
            this.className = "fas fa-video-slash btn--removebg"
            videoEl2.style.display = "block";
        } else {
            this.className = "fas fa-video-slash btn--removebg off--red"
            videoEl2.style.display = "none";
        }
    }
}

/**
* It's a function that when any player win the bingo  there is a background audio that sings bingo!!
* This function I'll  imported it into index and called it in  pubSub.subscribe("BINGO")
*/
export function setupAudioBingoWin() {
    let audioBackground = `
        <div id="sound">
            <audio controls autoplay loop id="bingoSound">
                  <source src="${audio}" type="audio/mpeg">
             </audio>
        </div>
        `;
    let parser = new DOMParser();
    let bingoAudio = parser.parseFromString(audioBackground, "text/html");

    bingoAudio = bingoAudio.body.firstChild;
    bingoAudio.currentTime = Math.round(Math.random() * 10);
    document.body.appendChild(bingoAudio);
}