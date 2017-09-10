var g = {
  numOfPlayers: 3,
  supply: {},
  deck: {},
  board: {}
}

startingVariables()

function startingVariables () {
  setStartingSupplyVariables()
  setStartingPlayerVariables()
  setAndShuffleDeck()
  setAndShuffleOfferings()
  setRaids()
  setRaidPlunder()
  setBoardSpaces()
  dealInitialCards()
}
function setStartingSupplyVariables () {
  g.supply.gold = 18
  g.supply.iron = 18
  g.supply.livestock = 26
  g.supply.valkyrie = 18
}
function setStartingPlayerVariables () {
  g.players = []
  for (var i = 0; i < g.numOfPlayers; i++) {
    g.players.push({
      playerNum: i,
      armour: 0,
      cards: [],
      crew: [],
      gold: 0,
      iron: 0,
      livestock: 0,
      offerings: [],
      silver: 2,
      valkyrie: 0,
      vps: 0,
      worker: 'black'
    })
  }
}
function setAndShuffleDeck () {
  g.deck.cards = require('./data/cards.json')
  g.deck.cards = shuffle(g.deck.cards)
}
function setAndShuffleOfferings () {
  g.deck.offerings = require('./data/offerings.json')
  g.deck.offerings = shuffle(g.deck.offerings)
}
function setRaids () {
  g.raids = require('./data/raids.json')
}
function setRaidPlunder () {
  let arr = []
  arr = addToArray(arr, g.gold, 'gold')
  arr = addToArray(arr, g.iron, 'iron')
  arr = addToArray(arr, g.livestock, 'livestock')
  arr = addToArray(arr, g.valkyrie, 'valkyrie')
  arr = shuffle(arr)

  for (var i = 0; i < g.raids.length; i++) {
    g.raids[i].plunder = []
    for (var j = 0; j < g.raids[i].rewards; j++) {
      g.raids[i].plunder.push(arr.pop())
    }
  }

  g.gold = 0
  g.iron = 0
  g.livestock = 0
  g.valkyrie = 0

  for (i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case 'gold': g.gold++; break
      case 'iron': g.iron++; break
      case 'livestock': g.livestock++; break
      case 'valkyrie': g.valkyrie++; break
    }
  }
}
function setBoardSpaces () {
  g.board.armoury.worker = 'none'
  g.board.armoury.requires = ['white', 'grey']
  g.board.gatehouse.worker = 'black'
  g.board.gatehouse.requires = ['white', 'grey', 'black']
  g.board.treasury.worker = 'black'
  g.board.treasury.requires = ['white', 'grey', 'black']
  g.board.mill.worker = 'none'
  g.board.mill.requires = ['white', 'grey', 'black']
  g.board.silversmith.worker = 'none'
  g.board.silversmith.requires = ['white', 'grey', 'black']
  g.board.barracks.worker = 'none'
  g.board.barracks.requires = ['white', 'grey', 'black']
  g.board.townhall.worker = 'black'
  g.board.townhall.requires = ['white', 'grey', 'black']
  g.board.longhouse.worker = 'none'
  g.board.longhouse.requires = ['white', 'grey']
}
function dealInitialCards () {
  for (let i = 0; i < g.numOfPlayers; i++) {
    g.players[i].cards = getCards(i, 5)
  }
}

function addToArray (arr, num, value) {
  for (var i = 0; i < num; i++) {
    arr.push(value)
  }
  return arr
}
function shuffle (arr) {
  let countArr = []
  for (var i = 0; i < arr.length; i++) {
    countArr.push(i)
  }
  let answerArr = []
  let rNum = 0
  for (i = 0; i < arr.length; i++) {
    rNum = Math.floor(Math.random() * countArr.length)
    answerArr.push(arr[countArr[rNum]])
    countArr.splice(rNum, 1)
  }
  return answerArr
}

function getCards (player, num) {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(g.deck.cards.pop())
  }
  return arr
}

module.exports = {
  shuffle
}
