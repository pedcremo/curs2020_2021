import { debug, clearModal, showModal } from '../js/core/core';
import '../css/ingame.css';
import { modalLiniaBingo } from './modalLiniaBingo.js';
import { modalMainMenu } from './modalMainMenu.js';
import * as utils from '../js/utils.js';

let renderBalls = () => {
    document.getElementById('balls').innerHTML = `${Array.from({length:90},(_,i) => i + 1).map(ball => `<div class='bingoBallEmpty' id='${ball}'>${ball}</div>`).join("")}`;
}

let renderCard = (extractedBalls=[],cardMatrix,player) => {
    // console.log(cardMatrix);
    
    let out =`<h1>Player ${player}</h1>
         <table class='bingoCard'>
            
             `+
              cardMatrix.map((value) => 
              "<tr>"+value.map((val) =>{
                   if (val==null){
                        return "<th class='nulo'></th>"
                   }else{
                        if (extractedBalls && extractedBalls.indexOf(val) >= 0){
                            if (val===extractedBalls[extractedBalls.length-1]){
                                return "<th class='extracted blink'>"+val+"</th>";                                  
                            }else{
                                return "<th class='extracted'>"+val+"</th>";                                  
                            }
                        }else{
                             return "<th>"+val+"</th>"
                        }
                   }}).join("")
              +"</tr>"                          
              ).join("")+
         `</table>`;
    document.getElementById(player).innerHTML = out;
    //divRoot.innerHTML = out;
    
    // checkBingo(cardMatrix,extractedBalls,player);   
    //return out;
}

export const inGameLayout = (socketIO, card,otherPlayers) => {

    const controllers = () => {
       
        console.log(otherPlayers);
        // console.log(card);
        let socket = socketIO;
        let line_status = false;
        let bingo_status = false;
        let extractedBalls = [];
        let lastBall;
        let divRoot = document.createElement('div');
        divRoot.classList.add('bingoCardLayout');
        divRoot.setAttribute("id",card.username);
        document.getElementById('bingoCards').appendChild(divRoot);
        // console.log("++++++++++++++++");
        // console.log(card.cardMatrix);
        renderCard(extractedBalls,card.cardMatrix,card.username);
        debugger
        otherPlayers.forEach((otherPlayer) => {
            let divRoot = document.createElement('div');
            divRoot.classList.add('bingoCardLayoutOther');
            divRoot.setAttribute("id",otherPlayer.username);
            document.getElementById('bingoCards').appendChild(divRoot);
            renderCard(extractedBalls,otherPlayer.card,otherPlayer.username)

        });
        renderBalls();
        socket.on('new_number', function (msg) {
            // console.log(msg);
            extractedBalls.push(msg.num)
            renderCard(extractedBalls,card.cardMatrix,card.username);
            otherPlayers.forEach((otherPlayer) =>
                renderCard(extractedBalls,otherPlayer.card,otherPlayer.username)
            );
        
            checkBingo(card,extractedBalls,line_status);   
            if(lastBall){
                document.getElementById(lastBall).className = 'bingoBall';
            }
            //a la bola actual le ponemos la animacion
            document.getElementById(msg.num).className = 'bingoBall blink'

            lastBall = msg.num;
        });
        
        let checkBingo = (card, extractedBalls,line_status) => {
            console.log(extractedBalls.length);
            let bingo = true;
            card.cardMatrix.forEach((row) => {
                let linia = row.filter((val) => { if (!extractedBalls.includes(val) && val != null) return val }).length;

            //    let linia = row.filter((val) => { if (extractedBalls.indexOf(val) <= 0) return val }).length;
               if (linia > 0) bingo = false;
               else {
                  if (line_status == false) {
                     line_status = true;
                     socket.emit('linia', { playId: card.gameID, card: card })
                  }
        
               }
            })
        
            if (bingo && bingo_status == false) {
            //    console.log(extractedBalls.length);
               let send = {
                game_id: card.gameID,
                  nickname: card.username,
                  card: card,
               }
               socket.emit('bingo', { playId: card.gameID, card: card })
            }
         }

        socket.on('end_game', function (msg) {
            console.log(msg);
        });

        socket.on('bingo_accepted', function (msg) {
            // let data = JSON.parse(msg);
            let username = msg.card.username;
            showModal(modalLiniaBingo(username, "bingo"),function() {
                showModal(modalMainMenu());
            },false)
            socket.disconnect();
            bingo_status = true;
        });

        socket.on('linia_accepted', function (msg) {
            // console.log("LINEA ACCEPTEEEEEDDDD");
            // console.log(msg);
            // let data = JSON.parse(msg);
            let username = msg.card.username;
            showModal(modalLiniaBingo(username, "linea"),null,false)
            line_status = true;
        });

    }


    return {
        template:
            `
            <div class="gameLayout">
                <div id="bingoCards" class="cards">
                
                </div>
                <div class="panel">
                    <div id="balls" class="balls__grid"></div>
                </div>
            </div>
            `,
        controllers: controllers
    }
}