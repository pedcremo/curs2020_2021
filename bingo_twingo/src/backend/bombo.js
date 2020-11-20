class Bombo{    
    // constructor(rootElement){
    constructor(){
        const templateBombo = Array.from({length:90},(_,i) => i + 1);
        let boles = [...templateBombo];
        let bolesExtracted = [];
        let shuffle = () => boles.sort((a,b) => Math.random()-0.5);         
        this.getExtractedNumbers= () =>  bolesExtracted;
        this.getRemainingBoles = () => boles;
        this.pickNumber = () => {
            shuffle();             
            boles[0] && bolesExtracted.push(boles[0]);          
            // if (boles[0]) render(boles[0])             
            return (boles.length>0 && boles.splice(0,1))?bolesExtracted[bolesExtracted.length-1]:false;            
        }
        // let render = (num) => {
        //     let tpl_nums = templateBombo.map((item) => bolesExtracted.includes(item)?{num:item,className:'bingoBall'}:{num:item,className:'bingoBallEmpty'})
        //     rootElement.innerHTML = `${tpl_nums.map(a=>  `<div class='${a.className}'>${a.num}</div>`).join("")}`; 
        // }
    }   
}

module.exports = Bombo;