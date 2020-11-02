import img from '../images/linia.gif'
/**
 * That's a template that can be rendered by ShowModal's function.
 * @param {String} player - Player's username that will be displayed if obtains line.
 */
export const modalLinia= (player) => {
    

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

