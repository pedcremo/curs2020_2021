import { Toast } from "toaster-js";
import "../../../node_modules/toaster-js/default.css";

export class Toastr{
    constructor(){
    }

    error(string){
        new Toast(string, Toast.TYPE_ERROR, Toast.TIME_SHORT);
    }

    info(string){
        new Toast(string, Toast.TYPE_INFO, Toast.TIME_SHORT);
    }

    message(string){
        new Toast(string, Toast.TYPE_MESSAGE, Toast.TIME_SHORT);
    }

    warning(string){
        new Toast(string, Toast.TYPE_WARNING, Toast.TIME_SHORT);
    }

    done(string){
        new Toast(string, Toast.TYPE_DONE, Toast.TIME_SHORT);
    }
}