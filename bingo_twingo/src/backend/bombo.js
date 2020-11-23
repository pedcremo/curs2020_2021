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
            return (boles.length>0 && boles.splice(0,1))?bolesExtracted[bolesExtracted.length-1]:false;            
        }
    }   
}

module.exports = Bombo;