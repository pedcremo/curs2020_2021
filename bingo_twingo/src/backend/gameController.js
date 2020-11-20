let  Bombo = require('./bombo.js');
let  bingoCard = require('./bingoCard.js');
const PubSub = require('./pubSub.js');

const gameController = () => {    
    let currentGame=new Map();    
    const secsUntilBegin = 30;
    const maxUsers = 3;
    let countDown;
    
    //Maps id -> Map object with game informations
    let gamesOnFire = new Map();

    /* Function create a new game if not exists or join to a new is 
    *  going to launch in the near future 
    *  @param {cardHidden} - {
            username: playerGame,
            card: card.cardMatrix
            }
        
    * @param {cardHidden} - publish/subscriber agent
    */

    let getCurrentGame = (cardHidden,pubSub) => {
        let bomboInterval;
        //There's no new game. So we create a new one
        if (currentGame.size == 0) {
            currentGame.set('id',Math.round(Math.random()*10000000));
            currentGame.set('listPlayers',[cardHidden]);
            currentGame.set('countDown',secsUntilBegin);
            
            //We start game when time is over or we have reached
            //max users goal
            setTimeout(() => {
                //Remove countDown timer. Its's nod needed because
                //we are going to start the game
                clearInterval(countDown);
                //pubSub.publish("starts_game",JSON.stringify({id:currentGame.get('id'),players:currentGame.get('listPlayers'),countDown:currentGame.get('countDown')}));
                currentGame.set('bombo',new Bombo);                
                let bombo = currentGame.get("bombo");
               
                let idPlay = currentGame.get('id');
                
                bomboInterval = setInterval(() => {
                    let realGame=gamesOnFire.get(idPlay)
                    
                    let num = bombo.pickNumber();
                    if (num){ 
                        pubSub.publish("new_number",{id:realGame.get('id'),num:num});
                    }else{
                        pubSub.publish("end_game",realGame.get('id'));
                        //Stop throwing balls from bombo
                        clearInterval(bomboInterval);
                    }
                    if (!realGame.get('bomboInterval')) {
                        realGame.set('bomboInterval',bomboInterval)
                        console.log('Arre GAT')
                    }
                    console.log("bomboInterval->"+idPlay)
                }, 1000);
                
                //currentGame.set('bomboTimer',bomboInterval);
                //realGame = new Map(currentGame);
                pubSub.publish("starts_game",JSON.stringify({id:currentGame.get('id'),players:currentGame.get('listPlayers'),countDown:currentGame.get('countDown')})); 
                gamesOnFire.set(currentGame.get('id'),new Map(currentGame))
                //RESET currentGame
                currentGame = new Map();

            }, secsUntilBegin * 1000);

            //Every second we decrement countDown until we me call above
            //setTimeout
            countDown = setInterval(()=>{
                let count = currentGame.get('countDown');
                currentGame.set('countDown',(count-1));
            },1000);

        //There's a game has been started by other user, so we join it
        }else{
            let listUsers = currentGame.get('listPlayers');
            listUsers.push(cardHidden);
            currentGame.set('listPlayers',listUsers);
            if (listUsers.length >= maxUsers){
               setTimeout(()=>{currentGame=new Map();
                clearInterval(countDown);
            },100);
            }
            
        }
        return {id:currentGame.get('id'),players:currentGame.get('listPlayers'),countDown:currentGame.get('countDown'),bomboCongo:bomboInterval}

    } 

    let getGameById =(gameID) => gamesOnFire.get(gameID);
    
    return {getCurrentGame: getCurrentGame,
            getGameById: getGameById}
};

module.exports = gameController();