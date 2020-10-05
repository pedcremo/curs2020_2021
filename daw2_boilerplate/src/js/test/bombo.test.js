
import {Bombo} from '../bombo.js';

describe('Generate bingo bombo', () => {
  let bombo = new Bombo();  
  test('Not number extracted yet', () => {
    expect(bombo.getExtractedNumbers().length).toEqual(0)
  });
  test('90 balls', () => {
    expect(bombo.getRemainingBoles().length).toEqual(90)
  });
  
  test('One ball extracted', () => {
    bombo.pickNumber();  
    expect(bombo.getExtractedNumbers().length).toEqual(1)
    expect(bombo.getRemainingBoles().length).toEqual(89)
  });

  test('Numbers between 1 and 90', () => {
    bombo = new Bombo();  
    let num=bombo.pickNumber();
    do{        
        expect((num>=1 & num<=90)).toBeTruthy();
        num=bombo.pickNumber()
    }while(num!=false); 
    
  });

  test('Not duplicates', () => {
    bombo = new Bombo();  
    let extracted=[]
    let num=bombo.pickNumber();    
    do{                
        extracted.push(num);
        num=bombo.pickNumber();        
    }while(num!=false); 
    expect(!hasDuplicates(extracted)).toBeTruthy();
    
  });



})

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}