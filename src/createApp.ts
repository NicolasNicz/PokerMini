import express from "express";
import { HandName } from "../src/poker/poker";
import { theBestHandIs } from "../src/poker/poker";
import { log } from "console";

export function createApp() {
  const app = express();

  function drawCard(paquet: Carte[]): Carte {
    const index = Math.floor(Math.random() * paquet.length);
    return paquet.splice(index, 1)[0];
  }

  function BotAction(randomChoice: any, amount: any){
    if (randomChoice == 0){
      return 0;
    }
    else if (randomChoice == 1){
      return amount;
    }
    else if (randomChoice == 2){
      return amount + 2;
    }
  }

  function refillPackOfCards(): void {
    packOfCards.length = 0;
    packOfCards.push(
        { ...carte_9, famille: famille_P },
        { ...carte_T, famille: famille_P },
        { ...carte_J, famille: famille_P },
        { ...carte_Q, famille: famille_P },
        { ...carte_K, famille: famille_P },
        { ...carte_A, famille: famille_P },
        { ...carte_9, famille: famille_C },
        { ...carte_T, famille: famille_C },
        { ...carte_J, famille: famille_C },
        { ...carte_Q, famille: famille_C },
        { ...carte_K, famille: famille_C },
        { ...carte_A, famille: famille_C }
    );
  }
  
  let game: any = null;
  let hands: any = null;

  const choice = ["wait", "call", "raise"];

  type Famille = {
    name: string;
  };

  type Carte = {
    name: string;
    importance: number;
    famille: Famille;
  };

  const famille_P: Famille = {
    name: "P"
  };

  const famille_C: Famille = {
    name: "C"
  };

  const carte_9 = {
      name : "9",
      importance : 0
  }

  const carte_T = {
      name : "T",
      importance : 1
  }

  const carte_J = {
      name : "J",
      importance : 2
  }

  const carte_Q = {
      name : "Q",
      importance : 3
  }

  const carte_K = {
      name : "K",
      importance : 4
  }

  const carte_A = {
      name : "A",
      importance : 5
  }

  const packOfCards: Carte[] = [
  ];

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

    if (game && game.lastAction){
      if (game.lastAction == 'raise'){

      }

    }
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
      winner:'',
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
      winner:'',
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
            game.hand.stage = 'showResult';

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
              game.winner = 'Joueur';
              game.balances.human += game.hand.pot;

            }
            else if (theWinner == 'main2'){
              game.winner = 'Bot';
              game.balances.bot += game.hand.pot;
            }
            else{
              game.winner = 'draw'
              const sharing = game.hand.pot/2;
              game.balances.human += sharing;
              game.balances.bot += sharing;
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
        game.hand.stage = 'showResult';
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

    if (game.hand.stage === 'showResult'){
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
        game.winner = 'Joueur'
        game.balances.human += game.hand.pot

      }
      else if (theWinner == 'main2'){
        game.winner = 'Bot'
        game.balances.bot += game.hand.pot
      }
      else{
        game.winner = 'draw'
        const sharing = game.hand.pot/2;
        game.balances.human += sharing;
        game.balances.bot += sharing;
      }

    }

    res.redirect("/");
  });

  return app;
}
