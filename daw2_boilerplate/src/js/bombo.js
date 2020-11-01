export class Bombo {
    constructor(rootElement) {
        const templateBombo = Array.from({ length: 90 }, (_, i) => i + 1);
        let boles = [...templateBombo];
        let bolesExtracted = [];

        // Create the balls element and append to the root element

        let ballsElement = document.createElement('div');
        rootElement.appendChild(ballsElement);


        let shuffle = () => boles.sort((a, b) => Math.random() - 0.5);
        this.getExtractedNumbers = () => bolesExtracted;
        this.getRemainingBoles = () => boles;
        this.pickNumber = () => {
            shuffle();
            boles[0] && bolesExtracted.push(boles[0]);
            if (boles[0]) render(boles[0])
            return (boles.length > 0 && boles.splice(0, 1)) ? bolesExtracted[bolesExtracted.length - 1] : false;
        }
        let render = (extractedNum) => {

            // We check for the extracted ball to iluminate this ball with red color (class='extractedBall')

            let tpl_nums = templateBombo.map((item) => bolesExtracted.includes(item) 
                ? { num: item, className: item == extractedNum ? 'extractedBall' : 'bingoBall' }
                : { num: item, className: 'bingoBallEmpty' })
            ballsElement.innerHTML = `${tpl_nums.map(a => `<div class='${a.className}'>${a.num}</div>`).join("")}`;
        }
    }
}