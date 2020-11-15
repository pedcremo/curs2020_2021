
/**
 * Checks if DOM is already loades afterwards we call fn 
 * @param {*} fn 
 */
let docReady = (fn) => {


    if (document.readyState === "complete" || document.readyState === "interactive") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

/**
 * Debug option
 */
const debugOption = true;

let debug = (text) => {
    if (debugOption) console.log(text);
}

/**
 * <!-- The Modal -->
 *   <div id="myModal" class="modal">
 * 
 *  <!-- Modal content -->
 *  <div class="modal-content">
 *    <span class="close">&times;</span>
 *     <p>Some text in the Modal..</p>
 *  </div>

 *   </div>
 *  https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
 */

 /**
  * Function ShowModal
  * This function is use to implement the diferents modal that we use in the app
  * For example  in the main page we have a modal to add players to the game,  also when  any player sing line we show a modal
  * and the same when someone sings bingo
  * @param {*} templateHtml 
  * @param {*} callback 
  */


let showModal = (templateHtml, callback) => {
    let template = templateHtml
    if (templateHtml.template) template = templateHtml.template;
    let parser = new DOMParser();
    let modal = parser.parseFromString(template, "text/html");

    Array.from(modal.body.children).forEach((item) => {
        //Remove layer If thereis in DOM a div with the same id 
        if (document.getElementById(item.id)) {
            document.getElementById(item.id).remove();

        }
        document.body.appendChild(item);
        if (item.className == 'modal')
            item.style.display = "block";
        // Get the <span> element that closes the modal
        let span = item.getElementsByClassName("close")[0];
        // When the user clicks on <span> (x), close the modal
        span && span.addEventListener('click', function () {
            item.style.display = "none";
            callback();
        });

    });

    if (templateHtml.controllers) templateHtml.controllers();

}

/**
 * delete a modal
 * @param {String} templateToClear modal class 
 */
let clearModal = (templateToClear) => {
    if (document.getElementsByClassName(templateToClear)) {
        Array.from(document.getElementsByClassName(templateToClear)).forEach((el) => {
            el.remove();
        });
    }

}

export { docReady, showModal, clearModal, debug };