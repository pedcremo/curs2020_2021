export const modalSound = () => {
    const controllers = () => {
        let unmuteBtn = document.getElementById('unmuteBtn');
        unmuteBtn.addEventListener('click', function () {
            let video = document.getElementById('videoBackground');
            video.muted = false;
        });
    }

    return {
        template:
            `
                <button id="unmuteBtn" class="button">Unmute</button>

    `, controllers: controllers
    }
}