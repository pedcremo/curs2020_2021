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

let docReady = (fn) => {
    // see if DOM is already available

    if (document.readyState === "complete" || document.readyState === "interactive") {        
        fn();             
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    
/*
<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
*/
let showModal = (templateHtml,callback) => {    
    //let modal = document.getElementById(idHtml);
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
    let span = document.getElementsByClassName("close")[0];
    debugger
    if (templateHtml.controllers) templateHtml.controllers();
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";       
        callback();
    }
  
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            callback();
        }
    }
    
}
export {docReady,showModal};