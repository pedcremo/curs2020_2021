import { debug, clearModal, showModal } from '../js/core/core';
import '../css/ingame.css';
import * as utils from '../js/utils.js'

let renderBalls = () => {
    document.getElementById('balls').innerHTML = `${Array.from({length:90},(_,i) => i + 1).map(ball => `<div class='bingoBallEmpty' id='${ball}'>${ball}</div>`).join("")}`;
}

let renderCard = (card,num) => {
    console.log(card);
}

export const inGameLayout = (socketIO, card) => {

    const controllers = () => {
        let socket = socketIO;
        let liniaAwarded = false;
        let lastBall;
        renderCard(card);
        renderBalls();
        socket.on('new_number', function (msg) {
            // let messagesDiv = document.getElementById("chatMessages");
            console.log(msg);

            if(lastBall){
                document.getElementById(lastBall).className = 'bingoBall';
            }
            //a la bola actual le ponemos la animacion
            document.getElementById(msg.num).className = 'bingoBall blink'

            lastBall = msg.num;

            // messagesDiv.innerHTML = "NUMBER: " + msg.num + " playId=" + msg.id + "<br>" + messagesDiv.innerHTML;
            //Check if we have linia for testing purposes
            //We had picked randomly a number between 1--9
            //If we get it we emit linia event
            // if (msg.num == linia) {
            //     liniaAwarded = true;
            //     console.log(`emit linia ${playInfo.id} ${nickname}`);
            //     socket.emit('linia', { playId: playInfo.id, player: nickname })
            // }
            //Once we have been awarded by a line prize we emit bingo event
            //This and previous if obviosly should be properly implemented
            //REMEMBER: We are now only focused on communication protocol flow               
            // if (liniaAwarded) {
            //     console.log(`emit bingo ${playInfo.id} ${nickname}`)
            //     socket.emit('bingo', { playId: playInfo.id, player: nickname })
            // }
        });

        socket.on('end_game', function (msg) {
            console.log(msg);
        });

        socket.on('bingo_accepted', function (msg) {
            console.log("bingo_accepted ->" + JSON.stringify(msg));
        });

        socket.on('linia_accepted', function (msg) {
            console.log("linia_accepted ->" + JSON.stringify(msg));
        });

    }


    return {
        template:
            `
            <div class="gameLayout">
                <div id="bingoCards" class="cards"></div>
                <div class="panel">
                    <div id="balls" class="balls__grid"></div>
                </div>
            </div>
            `,
        controllers: controllers
    }
}