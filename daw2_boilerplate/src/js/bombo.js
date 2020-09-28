class Bombo{
    constructor(){
        this.boles = Array.from({length:99},(_,i) => i + 1);
        this.bolesExtracted = [];
    }
    shuffle(){
        this.boles.sort((a,b) => Math.random()-0.5);
    }    
    pickNumber(){        
        if (this.boles.length>0){
            let indexPicked = Math.floor(Math.random()*this.boles.length);
            let selectedNumber = this.bombo.splice(indexPicked,1);
            this.bolesExtracted.push(selectedNumber[0]);        
            return selectedNumber[0];
        }else{
            return false;
        }
    }
    getExtractedNumbers(){
        console.log(this.bolesExtracted);
    }
    toString(){
        console.log(this.boles);
    }
}

