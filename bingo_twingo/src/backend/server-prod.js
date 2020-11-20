import path from 'path'
import express from 'express'
import gameController from './gameController'
import bombo from './bombo'
import PubSub from './pubSub'
import BingoCard from './bingoCard'

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')

const http = require('http').createServer(app)
export let io = require('socket.io')(http)

app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})

io.on('connect', (socket) => {
    //Only one pubSub instance per socket room 
    let pubSub = new PubSub();
    let game;
    console.log("NEVER REACHED PROD");
    //A player wants to join a bingo game
    socket.on('join', playerName => {
      console.log(playerName);
      let bingoCard = new BingoCard(playerName);
      // We create a random id in order to create a hash
      // only known by joined user in order ti avoid fake cards
      let card = {
        id:"card_id_"+playerName,
        cardMatrix:bingoCard.getMatrix(),
        checksum:"checksum card"
      }
      //Should be provided to other jooined players
      let card_hidden = {
        username: playerName,
        card:bingoCard.getMatrix()
      }
     
      game=gameController.getCurrentGame(card_hidden,pubSub);
      //if (!game.pubSub) game.pubSub = new PubSub();
      
      //The most important thing. We register socket in a room 'id'
      //that should be shared by all players on the same game
      socket.join(game.id);
  
      //SEND TO JOINED USER THE CARD WITH ID AND CHECKSUM
      io.to(socket.id).emit('joined_game', JSON.stringify(card));
  
      //SEND TO EVERY PLAYER IN THE GAME THAT NEW PLAYER HAS JOINED, AND ONLY THE CARDMATRIX and USERNAME
      io.sockets.in(game.id).emit('joined',JSON.stringify(game));
  
      //PUBSUB ------
      //The only publisher of this event is gameController
      pubSub.subscribe("starts_game", (data) => {
        io.sockets.in(game.id).emit('starts_game',data);
        console.log("gameID="+game.id+"starts_game ->"+JSON.stringify(data))
      });
      //The only publisher of this event is gameController
      pubSub.subscribe("new_number", (data) => {
        if (data != false) io.sockets.in(game.id).emit('new_number',data);
        console.log("gameID="+game.id+" new_number ->"+data.id+" "+data.num)
      });
      //The publishers of this event is gameController and when bingo
      //is shooted
      pubSub.subscribe("end_game", (data) => {
        io.sockets.in(game.id).emit('end_game',data);
      });
  
    });
  
    socket.on('bingo',playInfo =>{
      //game.pubSub.publish("end_game",game.id);
      io.sockets.in(game.id).emit('end_game',game.id);
  
      pubSub.unsubscribe('new_number');  
      console.log("GAME INFO "+JSON.stringify(game)); 
      //console.log("bomboTimer "+game.bomboTimer);   
      //clearInterval(game.bomboTimer);
      console.log("bingo ->"+JSON.stringify(playInfo));
      io.sockets.in(game.id).emit('bingo_accepted',playInfo);
      
      //Stop throwing balls from bombo
      let gId=gameController.getGameById(game.id);
      clearInterval(gId.get('bomboInterval'));
    });
  
    socket.on('linia',playInfo =>{
      console.log("linia ->"+JSON.stringify(playInfo));
      io.sockets.in(game.id).emit('linia_accepted',playInfo);
    });
    
  });