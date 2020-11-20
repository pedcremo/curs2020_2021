import {debug} from './core/core.js'; 


export let BomboOnline = (() => {
     let lastBall;
     let render_bombo =(rootElement)=>{
          const templateBombo = Array.from({length:90},(_,i) => i + 1);
          let boles = [...templateBombo];
          rootElement.innerHTML = `${boles.map(ball => `<div class='bingoBallEmpty' id='${ball}'>${ball}</div>`).join("")}`;
     }
     let render_num = (ball) =>{
          if (ball){
              //si existe una ultima bola le quitamos la animacion
              if(lastBall){
                  document.getElementById(lastBall).className = 'bingoBall';
              }
              //a la bola actual le ponemos la animacion
              document.getElementById(ball).className = 'bingoBall blink'

              lastBall = ball;
          }               
     }
     return {
          render_bombo:render_bombo,
          render_num:render_num
      };
 
 })()