
/* index.js
HOME PAGE */


const chooseCategoriesContainer = document.getElementById("choose-categories-container")
const setYourChoice = document.getElementById("set-the-categories")
const startGame = document.getElementById("start-game")
const categoryDroplistOne =document.getElementById("category-droplist-one")
const categoryDroplistTwo =document.getElementById("category-droplist-two")
const categoryDroplistThree =document.getElementById("category-droplist-three")

const dropLists = [categoryDroplistOne, categoryDroplistTwo, categoryDroplistThree]

  const categoriesToChooseFrom = [
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
    id:"25"}, 
    {name: "Animals",
    id:"27"}, 
    {name: "Sports",
    id:"21"}, 
    {name: "Science: Gadgets",
    id:"30"}]
  
  
function createDropLists(list){
    categoriesToChooseFrom.forEach (item => {
      list.innerHTML += `
      <option value="${item.id}" name="${item.name}"> ${item.name} </option> ` 
    })
  }
  
dropLists.forEach(list => createDropLists(list))


startGame.addEventListener("click", disableStartBtn)
function disableStartBtn(e){
  e.preventDefault()
}



  let filteredCategories =[]
    setYourChoice.addEventListener("click", function(){  
    filteredCategories =[]
  
    dropLists.forEach(list => chosenOnes(list))
  
    function chosenOnes(list){ categoriesToChooseFrom.forEach((item) => {
      if(item.id === list.value){
        filteredCategories.push(item) 
      }  
      })}
  
    startGame.classList.remove("start-game-disabled")
    startGame.classList.add("start-game")
    startGame.removeEventListener("click", disableStartBtn)
  
    console.log(filteredCategories)
  
  })






  










