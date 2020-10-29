import linea1 from '../images/linia.gif'
import linea2 from '../images/linia2.gif'
import linea3 from '../images/linia3.gif'

function arreu(){
    var imgs=new Array();
    imgs.push(linea1,linea2,linea3);
    var img=imgs[Math.round(Math.random() * ((imgs.length-1) - 0) + 0  )];
    return img;
}


export const modalLinia= (player) => {
    var img=arreu();
    return `

    <div id="liniaForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>Linia player ${player}</h1>
                <img src=${img} />
            </div>  
        </div>

    `
}

