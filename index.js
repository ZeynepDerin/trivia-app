
/* index.js
HOME PAGE */

const chooseCategoriesContainer = document.getElementById("choose-categories-container")
const setYourChoice = document.getElementById("set-the-categories")
const startGame = document.getElementById("start-game")
const categoryDroplistOne =document.getElementById("category-droplist-one")
const categoryDroplistTwo =document.getElementById("category-droplist-two")
const categoryDroplistThree =document.getElementById("category-droplist-three")

const dropLists = [categoryDroplistOne, categoryDroplistTwo, categoryDroplistThree]
let filteredCategories =[]



const categoriesToChooseFrom = [
    {name: "Please Select",
    id:"0"},
    {name: "General Knowledge",
    id:"9"},
    {name: "Science & Nature",
    id:"17"}, 
    {name: "Science: Mathematics",
    id:"19"}, 
    {name: "Mythology",
    id:"20"}, 
    {name: "Geography",
    id:"22"}, 
    {name: "History",
    id:"23"}, 
    {name: "Art",
    id:"25"}]
  
  
dropLists.forEach(list => createDroplists(list))
function createDroplists(list){
    categoriesToChooseFrom.forEach (item => {
     list.innerHTML += `
     <option value=${item.id} name=${item.name}> ${item.name} </option>
     `
    })

  }
  
startGame.addEventListener("click", disableStartBtn)
setYourChoice.addEventListener("click", setYourChosenCategories)

function disableStartBtn(e){
  e.preventDefault()
}

const errorText = document.createElement("div")
errorText.classList.add("error-text")
chooseCategoriesContainer.appendChild(errorText)

function setYourChosenCategories(){
    filteredCategories =[]
  
    dropLists.forEach(list => chosenOnes(list))
  
    function chosenOnes(list){ categoriesToChooseFrom.forEach((item) => {
      if(item.id !== "0" && item.id === list.value){
        filteredCategories.push(item) 
      }  
      })}

    if(filteredCategories.length === 3 &&
      filteredCategories[0].id !== filteredCategories[1].id && 
      filteredCategories[0].id !== filteredCategories[2].id && 
      filteredCategories[1].id !== filteredCategories[2].id){
      errorText.textContent = ""
      startGame.classList.remove("start-game-disabled")
      startGame.classList.add("start-game")
      startGame.removeEventListener("click", disableStartBtn)
    
      localStorage.removeItem('filteredCategories')
      localStorage.setItem('filteredCategories', JSON.stringify(filteredCategories))

    } else {
      errorText.textContent = ""
      errorText.textContent = "Please Select 3 Different Categories!"

    }
  
  
  }
 





  










