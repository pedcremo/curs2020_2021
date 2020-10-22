function controllers(){
    let add=document.getElementById('addplayer');
    if (add) {
        add.addEventListener(onclick,(event)=>{
            let uList=document.getElementById("listPlayers");
            
        })
    }
}

export const tl=`

<div id="playersForm" class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close">&times;</span>
            <h1>Bingo players</h1>
            <p>Some text in the Modal..</p>
            <ul id="listPlayers"></ul>
            <form id="modalPardal">
                <label for="fname">Player Name</label>
                <input type="text" id="fname" name="fname">                                
            </form>
            <button id='addplayer' class="button">Add Player</button>
        </div>  
    </div>

`
