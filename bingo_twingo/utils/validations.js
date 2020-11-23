let checkName = (name) => {
    let regEx = /[aA1-zZ9]/;
    if (regEx.test(name)) {
        return true;
    } else {
        return false;
    }
}

export let validation_user = (from)=> {
    let playersNames = JSON.parse(localStorage.getItem('playersNames')) || [];
    let playerName = document.getElementById("fname").value;
    if (playerName) { //If input name is empty
        if (from=="players"){
        if (!playersNames.includes(playerName)) { //If name is repeated
            if (checkName(playerName)) { //If name is not allowed
                if (window.localStorage) { //Check if the navigator supports localstorage
                    document.getElementById('msg--err').innerHTML = "";
                    playersNames.push(document.getElementById("fname").value);
                    localStorage.setItem('playersNames', JSON.stringify(playersNames));
                    document.getElementById("fname").value = null;
                    return true
                }
            } else document.getElementById('msg--err').innerHTML = "\u26A0  Name not allowed!"
        } else document.getElementById('msg--err').innerHTML = "\u26A0  You cannot introduce repeated names!"
    }else return true
    } else document.getElementById('msg--err').innerHTML = "\u26A0  Enter the player's name!"
}