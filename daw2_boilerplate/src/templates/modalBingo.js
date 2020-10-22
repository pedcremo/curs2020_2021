import img from '../images/bingo.gif'
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
