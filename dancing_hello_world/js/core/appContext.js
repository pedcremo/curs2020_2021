
function stop(intervalId) {
    clearInterval(intervalId);
}

function start(fnPlay) {
    return setInterval(fnPlay,50);
}