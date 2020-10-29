import bingo1 from '../images/bingo.gif'
import bingo2 from '../images/bingo2.gif'
import bingo3 from '../images/bingo3.gif'
var imgs=new Array();
imgs.push(bingo1,bingo2,bingo3);
var img=imgs[Math.round(Math.random() * ((imgs.length-1) - 0) + 0  )];

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
