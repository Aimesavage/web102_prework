/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
   let counter = 0
    // loop over each item in the data
    games.forEach(item => {
        
        // create a new div element, which will become the game card
      const div =  document.createElement("div");
      

       
        // add the class game-card to the list
       
        div.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        div.innerHTML = `<div><img style ="width: 95%; height: 60%" src=${item.img} /> </div> <h4>${item.name}</h4><p>${item.description} </p><p>Backers: ${item.backers} </p> `;

        // append the game to the games-container
        gamesContainer.append(div);

    });

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

let sums =  GAMES_JSON.reduce( (acc, item)=>{ return acc + item.backers},0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `<p> ${sums.toLocaleString('US')}</p>`
// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
let raisedSums =  GAMES_JSON.reduce( (acc, item)=>{ return acc + item.pledged},0)
raisedCard.innerHTML = `<p>$${raisedSums.toLocaleString('US')}</p>`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let game_sums =  GAMES_JSON.reduce( (acc, item)=>{ return acc + 1},0)
gamesCard.innerHTML = `<p>${game_sums}</p>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
    let counter = unfundedGames.reduce((acc, games)=>{
        return acc + 1
    }, 0)

    addGamesToPage(unfundedGames);
}
filterUnfundedOnly();
// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
    let counter = fundedGames.reduce((acc, games)=>{
        return acc + 1
    }, 0)

    console.log(counter)
    addGamesToPage(fundedGames);


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM

    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// index.js
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

// ... similar for other buttons

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    })

    // use the function we previously created to add the unfunded games to the DOM
let totalUnfundedGame = unfundedGames.length;
let totalNumberOfGame = GAMES_JSON.length;
let totalFundedGame = totalNumberOfGame - totalUnfundedGame

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${raisedSums.toLocaleString('US')} has been raised for ${totalFundedGame} games. Currently, ${totalUnfundedGame} game${totalUnfundedGame == 1 ? ' remains':'s remain'} unfunded. We need your help to fund ${totalUnfundedGame == 1 ? ' this amazing game!':'theses amazing games!'}`
// create a new DOM element containing the template string and append it to the description container

const display = document.createElement("p")

display.innerText = displayStr;

descriptionContainer.appendChild(display)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...otherGames] = sortedGames;

console.log(firstGame)
console.log(secondGame)

// create a new element to hold the name of the top pledge game, then append it to the correct element
const p1 = document.createElement("p")

p1.innerText = firstGame.name

firstGameContainer.appendChild(p1)



// do the same for the runner up item
const p2= document.createElement("p")

p2.innerText = secondGame.name

secondGameContainer.appendChild(p2)