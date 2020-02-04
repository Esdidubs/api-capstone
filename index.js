'use strict'
let countA = 4, count2 = 4, count3 = 4, count4 = 4, count5 = 4, count6 = 4, count7 = 4, count8 = 4, count9 = 4, count10 = 4, countJ = 4, countQ = 4, countK = 4;
let highProb = 0, lowProb = 0, sameProb = 0;
let deckID = '';
let hl = '';
let numberOfCards = 52;
let correctGuesses = 0;
let incorrectGuesses = 0;
let priorCard = {
  suit: '',
  value: '',
  image: ''
}
let currentCard = {
  suit: '',
  value: '',
  image: ''
}
let currentGuess = {
  type: '',
  highLow: ''
}
let cardBack = './Images/CardBack.png';

function getDeck(url){
  fetch(url)
  .then(response => response.json())
  .then(responseJson => 
    startGame(responseJson))
  .catch(error => alert("That wasn't supposed to happen. Try again."));
}

function startGame(deckInfo){
  deckID = deckInfo.deck_id;
  drawCard('https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
}

function shuffleDeck(url){
  fetch(url)
  .then(response => response.json())
  .then(responseJson => 
    resetGame(responseJson))
  .catch(error => alert("That wasn't supposed to happen. Try again."));
}

function resetGame(deckInfo){
  numberOfCards = 52;
  correctGuesses = 0;
  incorrectGuesses = 0;
  drawCard('https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
}

function drawCard(url){
  fetch(url)
  .then(response => response.json())
  .then(responseJson => 
    updateInfo(responseJson))
  .catch(error => alert("That wasn't supposed to happen. Try again."));
}

function updateInfo(cardInfo){
  numberOfCards = cardInfo.remaining;
  currentCard.suit = cardInfo.cards[0].suit;
  currentCard.value = cardInfo.cards[0].value;
  currentCard.image = cardInfo.cards[0].image;
  showProb();
  calcProb();
  fixValues();
  displayCard(currentCard.image);
  scoreDisplay();
  if(numberOfCards < 51){
    handleGuess();
  }
}

function showProb(){
    return currentCard.value === "ACE" ? countA--
           : currentCard.value === "2" ? count2--
           : currentCard.value === "3" ? count3--
           : currentCard.value === "4" ? count4--
           : currentCard.value === "5" ? count5--
           : currentCard.value === "6" ? count6--
           : currentCard.value === "7" ? count7--
           : currentCard.value === "8" ? count8--
           : currentCard.value === "9" ? count9--
           : currentCard.value === "10" ? count10--
           : currentCard.value === "JACK" ? countJ--
           : currentCard.value === "QUEEN" ? countQ--
           : countK--;
}

function calcProb(){
  if(currentCard.value === "ACE"){
    highProb = (Math.round((count2+count3+count4+count5+count6+count7+count8+count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = 0;
    sameProb = (Math.round((countA)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "2"){
    highProb = (Math.round((count3+count4+count5+count6+count7+count8+count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count2)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "3"){
    highProb = (Math.round((count4+count5+count6+count7+count8+count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count3)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "4"){
    highProb = (Math.round((count5+count6+count7+count8+count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count4)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "5"){
    highProb = (Math.round((count6+count7+count8+count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count5)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "6"){
    highProb = (Math.round((count7+count8+count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count6)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "7"){
    highProb = (Math.round((count8+count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5+count6)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count7)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "8"){
    highProb = (Math.round((count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5+count6+count7)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count8)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "9"){
    highProb = (Math.round((count9+count10+countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5+count6+count7+count8)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count9)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "10"){
    highProb = (Math.round((countJ+countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5+count6+count7+count8+count9)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((count10)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "JACK"){
    highProb = (Math.round((countQ+countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5+count6+count7+count8+count9+count10)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((countJ)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "QUEEN"){
    highProb = (Math.round((countK)/numberOfCards * 100)).toFixed(2);
    lowProb = (Math.round((countA+count2+count3+count4+count5+count6+count7+count8+count9+count10+countJ)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((countQ)/numberOfCards * 100)).toFixed(2);
  } else if(currentCard.value === "KING"){
    highProb = 0;
    lowProb = (Math.round((countA+count2+count3+count4+count5+count6+count7+count8+count9+count10+countJ+countQ)/numberOfCards * 100)).toFixed(2);
    sameProb = (Math.round((countK)/numberOfCards * 100)).toFixed(2);
  }  
}

function fixValues(){
  if(currentCard.value === "JACK"){
    currentCard.value = "11";
  } else if(currentCard.value === "QUEEN"){
    currentCard.value = "12";
  } else if(currentCard.value === "KING"){
    currentCard.value = "13";
  } else if(currentCard.value === "ACE"){
    currentCard.value = "1";
  }
}

function displayCard(image){
  $('.results-sec').replaceWith(
    `<div class="results-sec">
    <img src="${cardBack}" class="cards" alt="Deck of Cards">
    <img src="${image}" class="cards" alt="${currentCard.value} of ${currentCard.suit}">
    </div>`
  )
  $('.results').removeClass('hidden');
}

function handleGuess(){
  console.log("new guess");
  console.log(parseInt(priorCard.value));
  console.log(parseInt(currentCard.value));
  if(parseInt(priorCard.value) > parseInt(currentCard.value)){
    if(hl === "low"){
      correctGuesses++;
    } else {
      incorrectGuesses++;
    }
  } else if(parseInt(priorCard.value) < parseInt(currentCard.value)){
    if(hl === "high"){
      correctGuesses++;
    } else {
      incorrectGuesses++;
    }
  } else {
    incorrectGuesses++;
  }
  scoreDisplay();
}

function scoreDisplay(){
  $('.scores').replaceWith(
    `<ul class="scores">
      <li>Number of cards left in deck: ${numberOfCards}</li>
      <li>Correct guesses: ${correctGuesses}</li>
      <li>Incorrect guesses: ${incorrectGuesses}</li>
    </ul>`
  )
  if($('.hints').hasClass('hidden')){
    $('.hints').replaceWith(
      `<ul class="hints hidden">
        <li>Higher Card Probability: ${highProb}%</li>
        <li>Lower Card Probability: ${lowProb}%</li>
        <li>Same Card Probability: ${sameProb}%</li>
      </ul>`
    )
  } else {
    $('.hints').replaceWith(
      `<ul class="hints">
        <li>Higher Card Probability: ${highProb}%</li>
        <li>Lower Card Probability: ${lowProb}%</li>
        <li>Same Card Probability: ${sameProb}%</li>
      </ul>`
    )
  }
  
  
  if(numberOfCards === 0){
    $('#cardForm').addClass('hidden');
    cardBack = './Images/EmptyBack.png';
    displayResults();
  }
}

function displayResults(){  
  $('#resultsBox').replaceWith(
    `<div id="resultsBox" class="">
      <img src="${cardBack}" class="cards" alt="Deck of Cards">
      <img src="${currentCard.image}" class="cards"  alt="${currentCard.value} of ${currentCard.suit}">
      <li>Number of cards left in deck: ${numberOfCards}</li>
      <li>Correct guesses: ${correctGuesses}</li>
      <li>Incorrect guesses: ${incorrectGuesses}</li>
        <h2>Final Score: ${correctGuesses}</h2>
        <a href="https://twitter.com/intent/tweet?button_hashtag=highlowcardgame&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" 
              data-text="I just scored ${correctGuesses} on the High Low Card Game" data-url="https://www.github.com/esdidubs/card-game" data-show-count="false">Tweet</a>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        <button id="shuffle" class="">Play Again</button>
    </div>`
  )
}

function buttons() {
  $('#cardForm').on( "click", "#newDeck", function() {
    event.preventDefault();
    let newDeckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
    getDeck(newDeckUrl);
    $('#shuffle').toggleClass('hidden');
    $('.drawDeck').toggleClass('hidden');
    $('#newDeck').toggleClass('hidden');
    $('#hintToggle').toggleClass('hidden');
  });

  $('main').on( "click", "#shuffle", function() {
    event.preventDefault();
    cardBack = 'https://i.imgur.com/9LTTPdE.png';
    let shuffleUrl = 'https://deckofcardsapi.com/api/deck/' + deckID + '/shuffle/';
    shuffleDeck(shuffleUrl);
    if($('#cardForm').hasClass('hidden')){
      $('#cardForm').removeClass('hidden');
      $('#resultsBox').addClass('hidden');
    };
  });

  $('#cardForm').on( "click", ".drawDeck", function() {
    event.preventDefault();
    hl = this.value;
    priorCard.suit = currentCard.suit;
    priorCard.value = currentCard.value;
    let drawDeckUrl = 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1';
    drawCard(drawDeckUrl);
  });

  $('main').on( "click", "#hintToggle", function() {
    event.preventDefault();
    $('.hints').toggleClass('hidden');
  });
}

$(function() {
  buttons();
});