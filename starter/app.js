/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. 
Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. 
After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND 
score gets added to his GLBAL score. After that, 
it's the next player's turn
- The first player to reach 100 points on GLOBAL 
score wins the game
*/
var rounds, roundScore, activePlayer, goal;
var doubleSix = [];
clear()
document.querySelector('.btn-roll').addEventListener('click', function()
{
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.seconddice').style.display = 'block';
    var seconddice = Math.floor(Math.random()*6 +1); //Math.floor remove decimal part of a number
    var dice = Math.floor(Math.random()*6 +1);   
    document.querySelector('.dice').src = 'dice-' + dice + '.png';
    document.querySelector('.seconddice').src = 'dice-' + seconddice + '.png';
    doubleSix.push(dice)
    doubleSix.push(seconddice)
    if (dice!==1 && seconddice!==1 && doubleSix[0]+doubleSix[1] != 12)
    {
        roundScore = roundScore+ dice + seconddice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore
       
    }
    else if (doubleSix[0]+doubleSix[1] == 12)
    {
        document.getElementById('score-' + activePlayer).textContent =0
        cleanDoubleSix();
        changePlayer()  
    }
    else
    {
        changePlayer()  
        cleanDoubleSix(); 
    }
});
function cleanDoubleSix(){
    doubleSix.length = 0;
}
document.querySelector('.btn-new').addEventListener('click', clear);
function clear()
{
    cleanDoubleSix();
    activePlayer=0;
    roundScore = 0; 
    scores = [0,0];
    var player = [first=prompt('Declare the first player'), second=prompt('Declare the second player')]
    goal = prompt('Declare the maximum point')
    document.querySelector('.limite-points').textContent = 'objetive: ' + goal
    document.querySelector('#name-0').textContent = player[0];
    document.querySelector('#name-1').textContent = player[1];
    document.getElementById('score-1').textContent = 0
    document.getElementById('score-0').textContent = 0
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.seconddice').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('winner')
}
document.querySelector('.btn-hold').addEventListener('click', function()
{
    scores[activePlayer] += roundScore
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]
    if (scores[activePlayer] >=goal)
    {
        document.querySelector('#name-'+ activePlayer).textContent = 'winner'
        document.querySelector('.btn-roll').style.display = 'none';
        document.getElementById('current-0').textContent = 0
        document.getElementById('current-1').textContent = 0
        roundScore = 0
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner')
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active')
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.seconddice').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    }
    else
    {
        cleanDoubleSix();
        changePlayer();
    }
});
function changePlayer()
{
    activePlayer ===0? 
    activePlayer = 1
    :activePlayer = 0; roundScore = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.seconddice').style.display = 'none';
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    //also theres in the classList method the options .add and .remove
}

