export class Bombo{    
    constructor(rootElement){
        const templateBombo = Array.from({length:90},(_,i) => i + 1);
        let boles = [...templateBombo];
        let bolesExtracted = [];
        let lastBall;
        let shuffle = () => boles.sort((a,b) => Math.random()-0.5);         
        this.getExtractedNumbers= () =>  bolesExtracted;
        this.getRemainingBoles = () => boles;
        this.pickNumber = () => {
            shuffle();             
            boles[0] && bolesExtracted.push(boles[0]);
            if (boles[0]){
                //si existe una ultima bola le quitamos la animacion
                if(lastBall){
                    document.getElementById(lastBall).className = 'bingoBall';
                }
                //a la bola actual le ponemos la animacion
                document.getElementById(boles[0]).className = 'bingoBall blink'
                
                lastBall = boles[0];
            }             
            return (boles.length>0 && boles.splice(0,1))?bolesExtracted[bolesExtracted.length-1]:false;            
        }
        //el render solo lo realiza una vez (añadiendo id a cada bola)
        let render = () => {
            rootElement.innerHTML = `${boles.map(ball => `<div class='bingoBallEmpty' id='${ball}'>${ball}</div>`).join("")}`;
        }
        
        render();
    }   
}