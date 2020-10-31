import imglinia from '../images/linia.gif'
import imgbingo from '../images/bingo.gif'

export const modalBingo= (player) =>{
    return `
    <div id="bingoForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>Bingo Bangoo ${player}</h1>
                <img src=${imgbingo} />
            </div>  
        </div>
    `
}

export const modalLinia= (player) =>{
    return `
    <div id="liniaForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>Linia player ${player}</h1>
                <img src=${imglinia} />
            </div>  
        </div>
    `
}

