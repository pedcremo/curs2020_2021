/**  Checks if DOM is already loades afterwards we call fn */
let docReady = (fn) => {
    

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

//General modal for win
let showModal = (templateHtml,callback) => {    
    let template=templateHtml
    if (templateHtml.template) template=templateHtml.template;  
    let parser = new DOMParser();
    let modal = parser.parseFromString(template, "text/html");
            
    Array.from(modal.body.children).forEach((item)=>{
        //Remove layer If thereis in DOM a div with the same id 
        if (document.getElementById(item.id)){
            document.getElementById(item.id).remove();
            
        }
        document.body.appendChild(item);    
        if (item.className == 'modal')
            item.style.display = "block";
            // Get the <span> element that closes the modal
            let span = item.getElementsByClassName("close")[0];
            // When the user clicks on <span> (x), close the modal
            span && span.addEventListener('click',function() {
                item.style.display = "none";       
                callback();
            });
  
            // When the user clicks anywhere outside of the modal, close it
           /* window.onclick = function(event) {
                if (event.target != item) {
                    item.style.display = "none";
                    callback();
                }
            }*/       
    });    
    
    if (templateHtml.controllers) templateHtml.controllers();    
        
}
export {docReady,showModal};