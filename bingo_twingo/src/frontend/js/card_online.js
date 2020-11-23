import {debug} from './core/core.js'; 
import { app } from '../index';


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
          for(let i = 0; i < card_numbers.length; i++) {
               card_numbers[i].classList.add("extracted");
          }
     }

     let check_bingo = (cardMatrix,extractedBalls,player,socket)=>{
          let bingo=true;     
          cardMatrix.forEach((row)=>{
                let linia = row.filter((val)=> {if (extractedBalls.indexOf(val)<=0) return val }).length;     
                if (linia>0){
                   bingo=false; 
                } 
                else{
                   console.log(app.cantar_linea);
                   if(app.cantar_linea){
                      console.log("LINEA"+player);
                      socket.emit('linea', player);
                   }
                }       
          })     
          if (bingo) {
                socket.emit('bingo', player)
                console.log("BINGO"+player);
          }
     }
     return {
          render_online_card:render_online_card,
          render_number:render_number,
          check_bingo:check_bingo
      };
 
 })()