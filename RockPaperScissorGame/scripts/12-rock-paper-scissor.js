let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  losses : 0,
  ties : 0
}
/*
if(score === null){   // also use if(!score){}
  score = {
    wins : 0,
    losses : 0,
    ties : 0 
  }
}  */



updateScoreElement();

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(()=> {
      const playerMove = computermovef();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function playGame(playerMove){
  const computerMove = computermovef();
  let result='';

  if(playerMove==='rock'){
    if(computerMove === 'rock'){
      result = 'Tie.';
    }else if(computerMove === 'paper'){
      result = 'You lose the game.';
    }else if(computerMove === 'scissor'){
      result = 'You won the game.';
    }
  }else if(playerMove==='paper'){
    if(computerMove === 'rock'){
      result = 'You won the game.';
    }else if(computerMove === 'paper'){
      result = 'Tie.';
    }else if(computerMove === 'scissor'){
      result = 'You lose the game.';
    }
  }else if(playerMove==='scissor'){
    if(computerMove === 'rock'){
      result = 'You lose the game.';
    }else if(computerMove === 'paper'){
      result = 'You won the game.';
    }else if(computerMove === 'scissor'){
      result = 'Tie.';
    }
  }
  if(result==='You won the game.'){
    score.wins += 1;
  } else if(result==='You lose the game.'){
    score.losses += 1;
  } else if(result==='Tie.'){
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score)); //use to store object values
                                                        // localStorage only support string values
  updateScoreElement();
  
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> 
  <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
                                                        
}

function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML=`wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}


function computermovef(){
  let computerMove='';
  const randomNum=Math.random();  
  if(randomNum>=0&&randomNum<1/3){
    computerMove='rock';
  }else if(randomNum>=1/3&&randomNum<2/3){
    computerMove='paper';
  }else if(randomNum>=2/3&&randomNum<1){
    computerMove='scissor';
  }
  return computerMove;
}