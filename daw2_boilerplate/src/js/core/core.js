import {Toastr} from './toaster.js';
const toaster = new Toastr();

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

// See if DOM is already available and start the function passed as a parameter
let docReady = (fn) => {
    if (document.readyState === "complete" || document.readyState === "interactive") {        
        fn();             
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

// Shows any modal (players, linea, bingo)
let showModal = (templateHtml,callback) => {  
    let template=templateHtml
    if (templateHtml.template) template=templateHtml.template;  
    let parser = new DOMParser();
    let modal = parser.parseFromString(template, "text/html");
    modal = modal.body.firstChild;
    //Remove layer If thereis in DOM a div with the same id 
    if (document.getElementById(modal.id)){
        document.getElementById(modal.id).remove();
    }
    document.body.appendChild(modal);
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    let span = modal.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    if(span){
        span.addEventListener('click',function() {
            modal.style.display = "none";
            callback();
        });
    }

    // Start the modal's controllers, if it has
    if (templateHtml.controllers) templateHtml.controllers();
    
    // When the user clicks on Start Game, the game starts. If there are 0 payers, toastr advices you and the game doesn't start.
    if(templateHtml.templateName && templateHtml.templateName=="modalPlayers"){
        let startGame = modal.getElementsByClassName("startGame")[0];
        
        startGame.addEventListener('click',function() {
            if(localStorage.getItem('playersNames')=="[]" || !localStorage.playersNames){
                toaster.message("Add at least 1 player to start the game");
            }else{
                // Modal and video background are removed, and the callback function is executed.
                modal.style.display = "none";   
                document.getElementById('videoBackground').remove();
                callback();
            }
        });
    }
}
export {docReady,showModal};