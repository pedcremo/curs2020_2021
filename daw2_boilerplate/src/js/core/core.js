let docReady = (fn) => {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {        
        fn();        
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}    

export {docReady};