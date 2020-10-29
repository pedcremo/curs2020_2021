import img from '../images/linia.gif'
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

