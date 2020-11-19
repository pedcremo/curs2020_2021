
import {BingoCard} from '../card.js';


describe('Generate bingo card', () => {
  let card;
  beforeAll(()=>{
     document.body.innerHTML =`<div id="card"></div>`;
     card = new BingoCard("Player",document.getElementById('card'));      
  });
     
  test('3 rows expected', () => {
    expect(card.getMatrix().length).toEqual(3)
  });
  test('9 columns expected', () => {
    card.getMatrix().forEach((item)=>{
        expect((item.length==9)).toBeTruthy()
    })    
  });
  test('Well formed', () => {    
    expect(testCard(card.getMatrix())).toBeTruthy()    
  });

  /*test('1 Thousand cards well formed', () => {
    for(let i=0;i<1000;i++){
        card = new BingoCard("Player",document.getElementById('card'));  
        expect(testCard(card.getMatrix())).toBeTruthy();    
    }
  });*/

})


function testCard(cardMatrix){
     let pass=false;
     let RowBreakException = {message:"There are not 4 empty cells in a row",name:"RowBreakException"};
     let ColBreakException = {message:"3 empty cells in a col",name:"ColBreakException"};     
     let NotSortedException = {message:"Column not sorted ASC",name:"NotShortedException"};     
     try{
          cardMatrix.forEach((elem)=>{
               let arrNull= elem.filter((value) => value==null);
               if (arrNull.length!==4) throw RowBreakException;
          })  
          const isSorted = arr => arr.every((v,i,a) => !i || a[i-1] <= v);
       
          transpose(cardMatrix).forEach((elem)=>{
               let arrNull= elem.filter((value) => value==null);
               let arrNotNull= elem.filter((value) => value!=null);
               if(!isSorted(arrNotNull)) throw NotSortedException;               

               if (arrNull.length==3) throw ColBreakException;
          })
          return true;

     }catch(e){
          //console.log(e.name+" "+e.message);
          //if (e !== BreakException) throw e;
          return false;
     }

}
//Transpose a matrix
function transpose(matrix){
     return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}
