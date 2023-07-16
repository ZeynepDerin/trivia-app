const gameContainer = document.getElementById("game")
let scoreEl = document.getElementById("score")
let score = 0

const categories = [
  {name: "Science & Nature",
  id:"17"},
  {name: "Geography",
  id:"22"}, 
  {name: "Art",
  id:"25"}]
const levels = ["easy", "medium", "hard"]

function addGenre(category){
  const column = document.createElement("div")
  gameContainer.append(column)
  column.classList.add("column-style")

 levels.forEach( level => {
    const card = document.createElement("div")
    card.classList.add("card")
    column.append(card)

    fetch(`https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${level}&type=boolean`)
    .then(result => result.json())
    .then(data => {
      card.setAttribute("data-question", data.results[0].question)
      card.setAttribute("data-correct_answer", data.results[0].correct_answer)
      card.setAttribute("data-score", level === "easy" ? "100" : level === "medium" ? "200" : "300")
      card.innerText = level === "easy" ? "100" : level === "medium" ? "200" : "300"
      
    })
    card.addEventListener("click", flipTheCard)

  })

}

categories.forEach(category => addGenre(category.id))


function flipTheCard() {
  
  const trueButton = document.createElement("button")
  const falseButton = document.createElement("button")
 
  trueButton.innerText = "True"
  falseButton.innerText = "False"
  trueButton.classList.add("true-btn")
  falseButton.classList.add("false-btn")
  trueButton.addEventListener("click", getAnswer)
  falseButton.addEventListener("click", getAnswer)
  this.innerHTML = this.dataset.question
  this.append(trueButton, falseButton)
  this.classList.add("flipped-card")
  const allCards = Array.from(document.querySelectorAll(".card"))
  allCards.forEach(card => card.removeEventListener("click", flipTheCard))

}

function getAnswer(){

  const cardEl = this.parentElement
  cardEl.classList.remove("flipped-card")
  cardEl.classList.remove("card")
  cardEl.classList.add("answered-card")
  
  if(this.innerText === cardEl.dataset.correct_answer){
    score = score + parseInt(cardEl.dataset.score)
    scoreEl.innerText = "Your Score: " + score
    while(cardEl.firstChild){
      cardEl.removeChild(cardEl.lastChild)
    }
    
    
  } else {
    while (cardEl.firstChild) {
      cardEl.removeChild(cardEl.lastChild);
    }
  }

 const allCards = document.querySelectorAll(".card")
 allCards.forEach(card => card.addEventListener("click", flipTheCard))
  
  
}




