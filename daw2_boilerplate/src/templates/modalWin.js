import img from '../images/linia.gif'
export const modalWin= (player, rule) => {
    
//General template for Win
    return `

    <div id="liniaForm" class="modal">
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <h1>${rule} player ${player}</h1>
                <img src=${img} />
            </div>  
        </div>

    `
}

