import {debug} from './core/core.js'; 


export let BingoCardOnline = (() => {
     let render_online_card =(card_online,username,location,)=>{
          console.log(location);
          location = document.getElementById(location);
          let out =`
          <div id="player_card_${username}" class="modal__lobby__body__full__info__player">
               <h1>Player ${username}</h1>
               <table class='bingoCard'>
               `+
               card_online.map((value) => 
                    "<tr>"+value.map((val) =>{
                         if (val==null){
                              return "<th class='nulo'></th>"
                         }else{
                              return "<th class='card_number_"+val+"'>"+val+"</th>"
                         }}).join("")
                    +"</tr>"                          
                    ).join("")+
               `</table>
          </div>`;

          location.innerHTML += out;
     }
     let render_number = (num)=>{
          let card_numbers = document.getElementsByClassName("card_number_"+num);
          console.log(card_numbers);
          for(let i = 0; i < card_numbers.length; i++) {
               card_numbers[i].classList.add("extracted");
          }
     }
     return {
          render_online_card:render_online_card,
          render_number:render_number
      };
 
 })()