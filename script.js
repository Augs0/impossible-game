const startBtn = document.getElementById('start-btn');
const startScreen = document.querySelector('.start-screen');
const selectFrogBtn = document.querySelectorAll('.select');
const selectScreen = document.querySelector('.select-screen');
const gameScreen = document.querySelector('.game-screen');
const timer = document.querySelector('.time');
const scoreboard = document.querySelector('.score');
const message = document.querySelector('.message');
let secs = 0;
let score = 0;
let selectedFrog = {};

// start the game
startBtn.addEventListener('click', () =>{
  startScreen.classList.add('upwards');
})

// set event listeners on selectable frogs to get the correct image
selectFrogBtn.forEach(frog => {
  frog.addEventListener('click', () => {
    const frogImg = frog.querySelector('img');
    const src = frogImg.getAttribute('src');
    const alt = 'catch frog';
    //we grab the image info then feed it into the empty object, selectedFrog
    selectedFrog = {
      src, //set above
      alt //set above
    }
    selectScreen.classList.add('upwards');
    setTimeout(showFrog, 1000);
    startTimer();
  })
})

// start timer and run every second
function startTimer(){
  //uses setInterval to run the the function every second, imitating a timer
  setInterval(countTime, 1000);
}

// setup for timer
function countTime(){
  //we initialized secs as 0 at the start of the script
  let minutes = Math.floor(secs / 60); //divide the total number of seconds by 60 to convert to minutes
  let seconds = secs % 60; //this will give us the leftovers of what seconds don't go into the number of minutes
  minutes = minutes < 10 ? `0${minutes}` : minutes; //if under ten, we need to make sure there's a zero before the number of minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds; //same approach here
  timer.innerHTML = `Time: ${minutes}:${seconds}`;
  
  secs++; //this is kind of like 'i' in for loop
}

// display the frog image we got details of above
function showFrog(){
  const froggy = document.createElement('div');
  //destructuring to use the coordinates we set 
  const {vertical, horizontal} = randomize();
  froggy.classList.add('froggy');
  froggy.setAttribute('tabIndex', 0);
  froggy.style.left = `${vertical}px`;
	froggy.style.top = `${horizontal}px`;
  froggy.innerHTML = `<img src="${selectedFrog.src}" alt="${selectedFrog.alt}">`;
  froggy.addEventListener('click', frogCaught);
  //struggling to get this to work at the mo as using enter doesn't seem to give us access to this keyword
  froggy.addEventListener('keydown', checkEnter);
  // add to the game
  gameScreen.appendChild(froggy);
}

function checkEnter(e){
 const keycode = (e.keyCode ? e.keyCode : e.which)
 if(keycode == '13'){
   frogCaught();
 }
}

// set random location for frog to appear in
function randomize(){
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const vertical = Math.random() * (width - 100)  //a random number under one multiplied by the current width, with some adding and subtracting to make sure the frog will fit within the screen
  const horizontal = Math.random() * (height - 100)
  
  // Important! Remember to return the values or you cannot use them
  return {
    vertical, horizontal
  }
}

// Track score
function addToScore(){
  score++;
  if(score > 50){
    message.classList.add('visible');
  }
  scoreboard.innerHTML = `Score: ${score}`;
}

function addMoreFrogs(){
  setTimeout(showFrog, 1000);
  setTimeout(showFrog, 1500);
}

// set what happens when user clicks/catches a frog
function frogCaught(){
  addToScore();
  this.classList.add('caught'); 
  setTimeout(() => {this.remove();}, 2000);
  addMoreFrogs();
}
