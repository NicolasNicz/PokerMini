import express from "express";

export function createApp() {
  const app = express();

  function drawCard(paquet: Carte[]): Carte {
    const index = Math.floor(Math.random() * paquet.length);
    return paquet.splice(index, 1)[0];
  }
  
  let game: any = null;
  let hands: any = null;

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
  ];

  app.use(express.static("public"));
  app.set("views", "./views")
  app.set("view engine","ejs")
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.render("index", {
      game: game,
      handHuman: hands?.human,
      handBot: hands?.bot
    });
  });

  app.post("/new-game", (req, res) => {

    const randomPlayerCard1 = drawCard(packOfCards);
    const randomPlayerCard2 = drawCard(packOfCards);

    const randomBotCard1 = drawCard(packOfCards);
    const randomBotCard2 = drawCard(packOfCards);

    hands = {
      human: [],
      bot: [],
    };
    game = {
      balances: {
        human: 100,
        bot: 100,
      },
      hand: {
        stage: "ante",
        currentPlayer: "human",
        pot: 0,
        bets: {
          player: 0,
          bot: 0,
        },
      },
    };
    game.balances.human -= 1;
    game.hand.pot += 1;
    game.balances.bot -= 1;
    game.hand.pot += 1;
    game.hand.stage = "turn1";
    hands.human = [
      { rank: randomPlayerCard1.name, suit: randomPlayerCard1.famille.name },
      { rank: randomPlayerCard2.name, suit: randomPlayerCard2.famille.name },
    ];
    hands.bot = [
      { rank: randomBotCard1.name, suit: randomBotCard1.famille.name },
      { rank: randomBotCard2.name, suit: randomBotCard2.famille.name },
    ];

    res.redirect("/");
  });

  app.get("/game-status", (req, res) => {
    res.json(game);
  });

  app.post("/play", (req, res) => {
    console.log("betting");
    console.log(game);

    if (!game || game.hand.currentPlayer !== "human") {
      res.redirect("/");
      return;
    }
    if (req.body.action === "bet") {
      const amount = parseInt(req.body.bet || "1");
      game.hand.bets.human += amount;
      game.balances.human -= amount;
      game.hand.currentPlayer = "bot";
      setTimeout(() => {
        game.lastAction = "bet";
        game.lastAmount = 1;
        game.balances.bot -= 1;
        game.hand.bets.bot += 1;
        game.hand.currentPlayer = "human";
      }, 5000);
    }
    res.redirect("/");
  });

  return app;
}
