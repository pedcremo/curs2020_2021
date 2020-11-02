import img from '../images/bingo.gif'
/**
 * That's a template that can be rendered by ShowModal's function.
 * @param {String} player - Player's username that will be displayed if obtains bingo.
 */
export const modalBingo= (player) =>

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
