import express from "express";
import { HandName, theBestHandIs, drawCard, BotAction, refillPackOfCards, newPackOfCards } from "../src/poker/poker";
import { log } from "console";

export function createApp() {
  const app = express();

  let packOfCards = newPackOfCards();
  let game: any = null;
  let hands: any = null;

  const choice = ["wait", "call", "raise"];


  app.use(express.static("public"));
  app.set("views", "./views")
  app.set("view engine","ejs")
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.render("index", {
      game: game,
      handHuman: hands?.human,
      handBot: hands?.bot,  
    });
  });

  app.post("/new-game", (req, res) => {

    refillPackOfCards();

    hands = {
      human: [],
      bot: [],
    };
    game = {
      packOfCards: packOfCards,
      balances: {
        human: 100,
        bot: 100,
      },
      round: 1,
      winner:'',
      finalwinner:'',
      hand: {
        stage: "ante",
        currentPlayer: "human",
        pot: 0,
        name: {
          human:'',
          bot:'',
        },
        bets: {
          human: 0,
          bot: 0,
        },
        wins: {
          human: 0,
          bot: 0,
        },
      },
    };
    game.balances.human -= 1;
    game.hand.pot += 1;
    game.balances.bot -= 1;
    game.hand.pot += 1;
    game.hand.stage = "turn1";

    const randomPlayerCard1 = drawCard(game.packOfCards);
    const randomPlayerCard2 = drawCard(game.packOfCards);

    const randomBotCard1 = drawCard(game.packOfCards);
    const randomBotCard2 = drawCard(game.packOfCards);

    hands.human = [
      { rank: randomPlayerCard1, suit: randomPlayerCard1.famille },
      { rank: randomPlayerCard2, suit: randomPlayerCard2.famille },
    ];
    hands.bot = [
      { rank: randomBotCard1, suit: randomBotCard1.famille },
      { rank: randomBotCard2, suit: randomBotCard2.famille },
    ];

    res.redirect("/");
  });

  app.get("/game-status", (req, res) => {
    res.json(game);
  });

  app.post("/next-game", (req, res) => {
    refillPackOfCards();

    const currentBalanceBot = game.balances.bot;
    const currentBalanceHuman = game.balances.human;
    const currentRound = game.round;
    const winsplayer = game.hand.wins.human;
    const winsbot = game.hand.wins.bot;

    hands = {
      human: [],
      bot: [],
    };
    game = {
      packOfCards: packOfCards,
      balances: {
        human: currentBalanceHuman,
        bot: currentBalanceBot,
      },
      round: currentRound+1,
      winner:'',
      finalwinner:'',
      hand: {
        stage: "ante",
        currentPlayer: "human",
        pot: 0,
        name: {
          human:'',
          bot:'',
        },
        bets: {
          human: 0,
          bot: 0,
        },
        wins: {
          human: winsplayer,
          bot: winsbot,
        },
      },
    };
    game.balances.human -= 1;
    game.hand.pot += 1;
    game.balances.bot -= 1;
    game.hand.pot += 1;
    game.hand.stage = "turn1";

    const randomPlayerCard1 = drawCard(game.packOfCards);
    const randomPlayerCard2 = drawCard(game.packOfCards);

    const randomBotCard1 = drawCard(game.packOfCards);
    const randomBotCard2 = drawCard(game.packOfCards);

    hands.human = [
      { rank: randomPlayerCard1, suit: randomPlayerCard1.famille },
      { rank: randomPlayerCard2, suit: randomPlayerCard2.famille },
    ];
    hands.bot = [
      { rank: randomBotCard1, suit: randomBotCard1.famille },
      { rank: randomBotCard2, suit: randomBotCard2.famille },
    ];

    res.redirect("/");
  });


  app.post("/play", (req, res) => {
    console.log("betting");
    console.log(game);

    if (!game || game.hand.currentPlayer !== "human") {
      res.redirect("/");
      return;
    }

    if (req.body.action === "fold") {
      game.balances.bot += game.hand.pot;
      game.lastAction = "fold";
      game.winner = "Bot";
      game.hand.wins.bot += 1
      res.redirect("/");
      return;
    }


    if (req.body.action === "bet") {
      const amount = parseInt(req.body.amount, 10);
      game.hand.bets.human += amount;
      
      game.balances.human -= amount;
      game.hand.currentPlayer = "bot";
      setTimeout(() => {
        game.lastAction = "bet";
        game.lastAmount = amount;
        if (game.lastAmount == 1 || game.lastAmount == 2){
          const randomChoice = Math.floor(Math.random() * 2) + 1;
          const jetonToAdd = BotAction(randomChoice, amount);
          const nameAction = choice[randomChoice];
          game.lastAction = nameAction;
          game.hand.bets.bot += jetonToAdd;
          game.balances.bot -= jetonToAdd;
        }
        else{
          const randomChoice = Math.floor(Math.random() * 3);
          const jetonToAdd = BotAction(randomChoice, amount);
          const nameAction = choice[randomChoice];
          game.lastAction = nameAction;
          game.hand.bets.bot += jetonToAdd;
          game.balances.bot -= jetonToAdd;
        }

        game.hand.currentPlayer = "human";

        if (game.lastAction !== "raise"){
          const potToAdd = game.hand.bets.human + game.hand.bets.bot;
          game.hand.pot += potToAdd;
          game.hand.bets.human = 0;
          game.hand.bets.bot = 0;
          if (game.hand.stage === "turn2"){
            game.hand.stage = 'Result';

            const mainHuman = {
              carte1 : [hands.human[0].rank, hands.human[0].suit],
              carte2 : [hands.human[1].rank, hands.human[1].suit],
              carte3 : [hands.human[2].rank, hands.human[2].suit]
            }

            console.log('HAND' + hands.human[0].rank, hands.human[0].suit);
            console.log('HAND' + hands.human[1].rank, hands.human[1].suit);
            console.log('HAND' + hands.human[2].rank, hands.human[2].suit);
            
      
            const mainBot= {
              carte1 : [hands.bot[0].rank, hands.bot[0].suit],
              carte2 : [hands.bot[1].rank, hands.bot[1].suit],
              carte3 : [hands.bot[2].rank, hands.bot[2].suit]
            }
            const nameMainHuman = HandName(mainHuman);
            const nameMainBot = HandName(mainBot);
      
      
            game.hand.name.human = nameMainHuman;
            game.hand.name.bot = nameMainBot;
      
            const theWinner = theBestHandIs(nameMainHuman, nameMainBot, mainHuman, mainBot);
      
            if (theWinner == 'main1'){
              game.winner = 'Player';
              game.hand.wins.human += 1;
              game.balances.human += game.hand.pot;

            }
            else if (theWinner == 'main2'){
              game.winner = 'Bot';
              game.hand.wins.bot += 1;
              game.balances.bot += game.hand.pot;
            }
            else{
              game.winner = 'draw';
              const sharing = game.hand.pot/2;
              game.balances.human += sharing;
              game.balances.bot += sharing;
            }

            if (game.balances.human <= 0){
              game.finalwinner = "Bot";
            }
            if (game.balances.bot <= 0){
              game.finalwinner = "Player";
            }

          }
          else{
            game.lastAction = 'startTurn2';
            game.hand.stage = "turn2";
      
            const randomPlayerCard3 = drawCard(game.packOfCards);
            const randomBotCard3 = drawCard(game.packOfCards);
      
            hands.human.push({ rank: randomPlayerCard3, suit: randomPlayerCard3.famille });
            hands.bot.push({ rank: randomBotCard3, suit: randomBotCard3.famille });
          }
        }

      }, 2000);
    }


    else if (req.body.action === "call") {
      const numberToCall = game.hand.bets.bot - game.hand.bets.human;
      game.hand.bets.human += numberToCall;
      game.balances.human -= numberToCall;
      if (game.hand.stage === "turn2"){
        game.hand.stage = 'Result';
      }
      else{
        game.lastAction = "finishTurn1";
      }
    }

    if (game.lastAction == 'fold'){

    }

    if (game.lastAction == 'finishTurn1'){
      const potToAdd = game.hand.bets.human + game.hand.bets.bot;
      game.hand.pot += potToAdd;
      game.hand.bets.human = 0;
      game.hand.bets.bot = 0;
      game.lastAction = 'startTurn2';
      game.hand.stage = "turn2";

      const randomPlayerCard3 = drawCard(game.packOfCards);
      const randomBotCard3 = drawCard(game.packOfCards);

      hands.human.push({ rank: randomPlayerCard3, suit: randomPlayerCard3.famille });
      hands.bot.push({ rank: randomBotCard3, suit: randomBotCard3.famille });
    }

    if (game.hand.stage === 'Result'){
      const potToAdd = game.hand.bets.human + game.hand.bets.bot;
      game.hand.pot += potToAdd;
      game.hand.bets.human = 0;
      game.hand.bets.bot = 0;

      const mainHuman = {
        carte1 : [hands.human[0].rank, hands.human[0].suit],
        carte2 : [hands.human[1].rank, hands.human[1].suit],
        carte3 : [hands.human[2].rank, hands.human[2].suit]
      }

      
      console.log('HAND' + hands.human[0].rank, hands.human[0].suit);
      console.log('HAND' + hands.human[1].rank, hands.human[1].suit);
      console.log('HAND' + hands.human[2].rank, hands.human[2].suit);

      const mainBot= {
        carte1 : [hands.bot[0].rank, hands.bot[0].suit],
        carte2 : [hands.bot[1].rank, hands.bot[1].suit],
        carte3 : [hands.bot[2].rank, hands.bot[2].suit]
      }
      const nameMainHuman = HandName(mainHuman);
      const nameMainBot = HandName(mainBot);

      game.hand.name.human = nameMainHuman;
      game.hand.name.bot = nameMainBot;

      const theWinner = theBestHandIs(nameMainHuman, nameMainBot, mainHuman, mainBot);

      if (theWinner == 'main1'){
        game.winner = 'Player'
        game.hand.wins.human += 1;
        game.balances.human += game.hand.pot

      }
      else if (theWinner == 'main2'){
        game.winner = 'Bot'
        game.hand.wins.bot += 1;
        game.balances.bot += game.hand.pot
      }
      else{
        game.winner = 'draw'
        const sharing = game.hand.pot/2;
        game.balances.human += sharing;
        game.balances.bot += sharing;
      }

      if (game.balances.human <= 0){
        game.finalwinner = "Bot";
      }
      if (game.balances.bot <= 0){
        game.finalwinner = "Player";
      }

    }

    res.redirect("/");
  });

  return app;
}
