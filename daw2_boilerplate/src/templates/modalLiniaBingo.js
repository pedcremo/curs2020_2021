//Bingo and line template
import linea_img from '../images/linia.gif'
import bingo_img from '../images/bingo.gif'
export const modalLiniaBingo= (player,type) => {
    let img=null;
    if(type=="bingo") img=bingo_img;
    if(type=="linea") img=linea_img;

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