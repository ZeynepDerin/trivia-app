
/* gamepage.js
GAME PAGE */


const filteredCategories = JSON.parse(localStorage.getItem('filteredCategories'));
const gameContainer = document.getElementById("game")
const timeLeft = document.getElementById("time-left")
let scoreEl = document.getElementById("score")
let score = 0
const levels = ["easy", "medium", "hard"]
  
  const categories = filteredCategories
  
  function addGenre(category){
    const column = document.createElement("div")
    gameContainer.append(column)
    column.classList.add("column-style")
    const columnName = document.createElement("h4")
    column.append(columnName)
    columnName.textContent = category.name
    columnName.setAttribute("id", "genre-name")
  
   levels.forEach( level => {
      const card = document.createElement("div")
      card.classList.add("card")
      column.append(card)
  
      fetch(`https://opentdb.com/api.php?amount=1&category=${category.id}&difficulty=${level}&type=boolean`)
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
  
  categories.forEach(category => addGenre(category))
  
  
  function flipTheCard() {
    
    const trueButton = document.createElement("button")
    const falseButton = document.createElement("button")
    const btnDisplay = document.createElement("div")
   
    trueButton.innerText = "True"
    falseButton.innerText = "False"
    trueButton.classList.add("true-btn")
    falseButton.classList.add("false-btn")
    trueButton.addEventListener("click", getAnswer)
    falseButton.addEventListener("click", getAnswer)
    this.innerHTML = this.dataset.question
    this.append(btnDisplay)
    btnDisplay.append(trueButton, falseButton)
    this.classList.add("flipped-card")

    const allCards = Array.from(document.querySelectorAll(".card"))
    allCards.forEach(card => card.removeEventListener("click", flipTheCard))

    let timeCount = 10
    timeLeft.innerHTML = `🕰️ Time Left: ${timeCount} Seconds`
    const countDown = setInterval(()=> {
      if(timeCount > 0){
        timeCount--
        timeLeft.innerHTML = `🕰️ Time Left: ${timeCount} Seconds`
      }

      if(timeCount === 0){
        clearInterval(countDown)
        notAnsweredCard(this) 
        timeLeft.innerHTML = " "
      }
      
    }, 1000)

    trueButton.addEventListener("click", ()=> clearInterval(countDown))
    falseButton.addEventListener("click", ()=> clearInterval(countDown))


  }

  function notAnsweredCard(card){
    while (card.firstChild) {
      card.removeChild(card.lastChild);
    }
    card.classList.remove("flipped-card")
    card.classList.remove("card")
    card.classList.add("incorrect-answered-card")
    const allCards = document.querySelectorAll(".card")
    allCards.forEach(card => card.addEventListener("click", flipTheCard))
    if(allCards.length === 0 ) { 
      if(score >= 1500){
        scoreEl.innerText = "Congrats! Your score is " + score + " ! 🤩"
       
      }else if(score >= 1000 & score < 1500){
        
        scoreEl.innerText = " Congrats! Your score is " + score + " ! 😁"
  
      }else if(score >= 500 & score < 1000){
        
        scoreEl.innerText = "Your score is " + score + " ! 😶"
      } else {
       
        scoreEl.innerText = "Ups! Your score is " + score + " ! 😟"
      }
  
    }
    
  }

   
  
  function getAnswer(){
  
    const cardEl = this.parentElement.parentElement
    cardEl.classList.remove("flipped-card")
    cardEl.classList.remove("card")
    timeLeft.innerHTML = " "
    
    if(this.innerText === cardEl.dataset.correct_answer){
      score = score + parseInt(cardEl.dataset.score)
      scoreEl.innerText = "Your Score: " + score
      while(cardEl.firstChild){
        cardEl.removeChild(cardEl.lastChild)
      }
      cardEl.classList.add("correct-answered-card")
      
    } else {
      while (cardEl.firstChild) {
        cardEl.removeChild(cardEl.lastChild);
      }
      cardEl.classList.add("incorrect-answered-card")
    }  
   const allCards = document.querySelectorAll(".card")
   allCards.forEach(card => card.addEventListener("click", flipTheCard))

   if(allCards.length === 0 ) { 
    if(score >= 1500){
      scoreEl.innerText = "Congrats! Your score is " + score + " ! 🤩"
     
    }else if(score >= 1000 & score < 1500){
      
      scoreEl.innerText = " Congrats! Your score is " + score + " ! 😁"

    }else if(score >= 500 & score < 1000){
      
      scoreEl.innerText = "Your score is " + score + " ! 😶"
    } else {
     
      scoreEl.innerText = "Ups! Your score is " + score + " ! 😟"
    }

  }
    
  }