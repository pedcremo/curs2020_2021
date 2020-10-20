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
let showModal = (idHtml,callback) => {
    let modal = document.getElementById(idHtml);
    modal.style.display = "block";
    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    
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