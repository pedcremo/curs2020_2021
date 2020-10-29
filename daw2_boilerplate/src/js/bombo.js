export class Bombo {
    constructor(rootElement) {
        const templateBombo = Array.from({ length: 90 }, (_, i) => i + 1);
        let boles = [...templateBombo];
        let bolesExtracted = [];
        let shuffle = () => boles.sort((a, b) => Math.random() - 0.5);
        this.getExtractedNumbers = () => bolesExtracted;
        this.getRemainingBoles = () => boles;
        this.pickNumber = () => {
            shuffle();
            boles[0] && bolesExtracted.push(boles[0]);
            /**It only changes the color of the ball if it is drawn, it also shows an animation */
            if (boles[0]) { document.getElementById(bolesExtracted[bolesExtracted.length - 1]).className = 'ball_ani' }
            return (boles.length > 0 && boles.splice(0, 1)) ? bolesExtracted[bolesExtracted.length - 1] : false;
        }
        /** Paint the render only once */
        let render = () => {
            rootElement.innerHTML = `${boles.map(bola => `<div class='bingoBallEmpty' id='${bola}'>${bola}</div>`).join("")}`;
        }
        render()

    }
}