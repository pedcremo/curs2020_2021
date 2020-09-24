import {app} from "../../index.js";

document.body.onkeyup = (e) => {
    if(e.keyCode == 32){
        app.toggle();
    }
}