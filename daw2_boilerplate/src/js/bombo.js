

export class Bombo{    
    constructor(rootElement){
        let boles = Array.from({length:90},(_,i) => i + 1);
        let bolesExtracted = [];
        let shuffle = () => boles.sort((a,b) => Math.random()-0.5);         
        this.getExtractedNumbers= () =>  bolesExtracted;
        this.getRemainingBoles = () => boles;
        this.pickNumber = () => {
            shuffle();             
            boles[0] && bolesExtracted.push(boles[0]);          
            if (boles[0]) render(boles[0])             
            return (boles.length>0 && boles.splice(0,1))?bolesExtracted[bolesExtracted.length-1]:false;            
        }
        let render = (num) => {
            /*let a={<div class="bingoBall">
                ${num}
            </div>}*/
            let out=""
            for (let i=1;i<91;i++){
                
                let className= "bingoBallEmpty"
                if (bolesExtracted.includes(i))
                    className = 'bingoBall';
                out += `<div class=${className}>${i}</div>`             
                
            }
            rootElement.innerHTML = out;
            
        }
    }   
}