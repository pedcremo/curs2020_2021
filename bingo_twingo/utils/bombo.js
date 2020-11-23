export class Bombo {
    constructor(rootElement) {
        const templateBombo = Array.from({ length: 90 }, (_, i) => i + 1);
        let boles = [...templateBombo];
        let lastBall;
        let bolesExtracted = [];
        let shuffle = () => boles.sort((a, b) => Math.random() - 0.5);
        this.getExtractedNumbers = () => bolesExtracted;
        this.getRemainingBoles = () => boles;
        let render = () => {
            rootElement.innerHTML = `${boles.map(ball => `<div class='bingoBallEmpty' id='${ball}'>${ball}</div>`).join("")}`;
        }
        render()
        this.pickNumber = () => {
            shuffle();
            boles[0] && bolesExtracted.push(boles[0]);
            ballrender(boles[0])
            return (boles.length > 0 && boles.splice(0, 1)) ? bolesExtracted[bolesExtracted.length - 1] : false;
        }
        this.renderball = (ball) => {
            ballrender(ball)
        }
        let ballrender = (ball) => {
            if (ball) {
                //si existe una ultima bola le quitamos la animacion
                if (lastBall) {
                    document.getElementById(lastBall).className = 'bingoBall';
                }
                //a la bola actual le ponemos la animacion
                document.getElementById(ball).className = 'bingoBall blink'

                lastBall = ball;
            }
        }
    }
}


// export class RenderBalls{    
//     constructor(){
//         let lastBall;
//         this.render = (ball) => {
//             console.log("*----------------", ball)
//             if (ball){
//                 //si existe una ultima bola le quitamos la animacion
//                 if(lastBall){
//                     document.getElementById(lastBall).className = 'bingoBall';
//                 }
//                 //a la bola actual le ponemos la animacion
//                 document.getElementById(ball).className = 'bingoBall blink'

//                 lastBall =ball;
//             }               
//         }
//     }   
// }