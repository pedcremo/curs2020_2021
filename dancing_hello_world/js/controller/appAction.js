document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        //your code
        if (appState == "running"){
            //appId variable global(BAD)
            stop(appId);
            appState = "stopped"
        }else{
            appId=start(function(){danceWorld(ball)});
            
            appState = "running"
        }
    }
}