const debugStatus = true;

/**  Checks if DOM is already loades afterwards we call fn */
let docReady = (fn) => {
    

    if (document.readyState === "complete" || document.readyState === "interactive") {        
        fn();             
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

/**
 * This function works like a component launcher, but is especially used to display modals, with its own actions and templates.
 * @param {object} templateHtml, the template to be displayed and the actions of the template
 * @param {Function} callback, function that will init when modal closes.
 */
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

/**
 * This function is used for debug the code, enabling us to init a callback function during debug. We can active this function for develop and disable in production.
 * @param {object} msg, the message that have to be displayed.
 * @param {Function} callback, function that will init when the message it's displayed.
 */
let debug = (msg, callback) => {
    if (debugStatus) {
        console.log(msg);
        if (callback) callback();
    }
}

export {docReady,showModal,debug};