/**
 * Bingo and line template
 */

import linea1 from '../images/linia.gif'
import linea2 from '../images/linia2.gif'
import linea3 from '../images/linia3.gif'
import bingo1 from '../images/bingo.gif'
import bingo2 from '../images/bingo2.gif'
import bingo3 from '../images/bingo3.gif'

/**
 * Here we put the different line and bingo gifs in an arrangement
 */
var imgsBingo=new Array();
imgsBingo.push(bingo1,bingo2,bingo3);

var imgsLinea=new Array();
imgsLinea.push(linea1,linea2,linea3);

/**
 * These functions return a random gif from which we have imported
 */
function randomBingo(){
    let img=imgsBingo[Math.round(Math.random() * ((imgsBingo.length-1) - 0) + 0  )];
    return img;
}
function randomLinea(){
    let img=imgsLinea[Math.round(Math.random() * ((imgsLinea.length-1) - 0) + 0  )];
    return img;
}

export const modalLiniaBingo= (player,type) => {
    let img=null;

    if(type=="bingo") img=randomBingo();
    if(type=="linea") img=randomLinea();

    return `
    <div id="liniaForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>${type} player ${player}</h1>
                <img src=${img} />
            </div>  
        </div>
    `
} 