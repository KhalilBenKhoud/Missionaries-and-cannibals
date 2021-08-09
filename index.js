
var button = document.getElementsByClassName("go")[0]
var boat = document.getElementsByClassName("boat")[0]
var cannibal = document.getElementsByClassName("pr")
var missionary = document.getElementsByClassName("ms")
window.boatCount = 0
window.moves = 0

document.addEventListener("DOMContentLoaded",startGame())

function startGame()
{   
   
    
    setEndAnimations()
    setBoatMovment()
    movePlayersToBoat()
    movePlayersOutOfBoat()
    solutionAndRules()
}
  
function setBoatMovment()
{  
  boat.addEventListener("animationstart",() =>
  {
       button.style.cursor = "not-allowed"
       button.classList.remove("bouton")
       button.disabled = true
       disablePassengersWhileSailing(true)
       moves++

  })
  
  button.addEventListener("click",() =>{
    if(boatCount == 0) {
      
      alert("the boat needs at least one passenger in order to sail")
       return
     }
    if(gameOver())
    {
      if(!boat.classList.contains("otherShore"))
      { animateEatenMissionaries(1) }
      else
      { animateEatenMissionaries(2) }
      setTimeout(function () {
        restart(false)
  
      }, 2500)
      return
    }
  
    if(!boat.classList.contains("otherShore"))
    { 
      boat.style.animation = "go 3.5s 1 linear" 
      boat.classList.add("otherShore")
      animateSpots()
      
    }
    else{
      boat.style.animation = "go 3.5s 1 linear reverse"  
      boat.classList.remove("otherShore")
      animateSpots()
    }
     
  })
    boat.addEventListener("animationend",(e) =>{
    boat.style.animation = ""
    if(!boat.classList.contains("otherShore"))
    {
      boat.style.top = ""
      boat.style.left = ""
    }
    else{
      boat.style.top = "530px"
      boat.style.left = "850px"
    }
    button.style.cursor = ""
    button.classList.add("bouton")
    button.disabled = false
    disablePassengersWhileSailing(false)
  })
}

function movePlayersToBoat()
{  
  
  for(let i=0; i< 3; i++)
  { 
    cannibal[i].addEventListener("click",() => {
      if(!cannibal[i].classList.contains("onBoat") && boatCount == 0
        && !boat.classList.contains("otherShore")
        && !cannibal[i].classList.contains("otherShore"))
    { 
       cannibal[i].style.top = "220px" 
       cannibal[i].style.left = "480px"
       boatCount++
       cannibal[i].classList.add("onBoat") 
       update()
       
    }
    

    else if(!cannibal[i].classList.contains("onBoat") && boatCount == 1 && spotIsEmpty(2)
           && !boat.classList.contains("otherShore")
           && !cannibal[i].classList.contains("otherShore"))
    {
      cannibal[i].style.top = "250px" 
      cannibal[i].style.left = "360px"
      boatCount++
      cannibal[i].classList.add("onBoat")
      update()
    }
    

    else if(!cannibal[i].classList.contains("onBoat") && boatCount == 1 && spotIsEmpty(1)
            && !boat.classList.contains("otherShore")
            && !cannibal[i].classList.contains("otherShore"))
    {
      cannibal[i].style.top = "220px" 
       cannibal[i].style.left = "480px"
       boatCount++
       cannibal[i].classList.add("onBoat") 
       update()
    }
    else if(cannibal[i].classList.contains("onBoat")
             && !cannibal[i].classList.contains("otherShore")
            && !boat.classList.contains("otherShore"))
    {
      cannibal[i].style.top = "" 
      cannibal[i].style.left = ""
      boatCount--
      cannibal[i].classList.remove("onBoat")
      
      update()
    }
   
    })
    missionary[i].addEventListener("click",() => {
      if(!missionary[i].classList.contains("onBoat") && boatCount == 0
      && !boat.classList.contains("otherShore")
      && !missionary[i].classList.contains("otherShore"))
    {  missionary[i].style.top = "250px" 
       missionary[i].style.left = "520px"
       boatCount++
       missionary[i].classList.add("onBoat") 
       update()
    }
    else if(!missionary[i].classList.contains("onBoat") && boatCount == 1 && spotIsEmpty(2)
         && !boat.classList.contains("otherShore")
         && !missionary[i].classList.contains("otherShore"))
    {
      missionary[i].style.top = "280px" 
      missionary[i].style.left = "400px"
      boatCount++
      missionary[i].classList.add("onBoat")
      update()
    }
    else if(!missionary[i].classList.contains("onBoat") && boatCount == 1 && spotIsEmpty(1)
    && !boat.classList.contains("otherShore")
    && !missionary[i].classList.contains("otherShore"))
    {
      missionary[i].style.top = "250px" 
      missionary[i].style.left = "520px"
      boatCount++
      missionary[i].classList.add("onBoat")
      update()
    }

    else if(missionary[i].classList.contains("onBoat")
    && !boat.classList.contains("otherShore")
    && !missionary[i].classList.contains("otherShore"))
    {
      missionary[i].style.top = "" 
      missionary[i].style.left = ""
      boatCount--
      missionary[i].classList.remove("onBoat")
      update()
    }
   
    })
  

  }


}



function spotIsEmpty(spot)
{
  for(let i = 0; i < 3; i++)
  {  
     if(spot == 1)
     {
        if(cannibal[i].style.top == "220px"
         ||cannibal[i].style.top == "410px"
         || missionary[i].style.top == "250px"
         || missionary[i].style.top == "440px") return false
     }
     if(spot == 2)
     {
        if(cannibal[i].style.top == "250px"
         || cannibal[i].style.top == "440px"
         || missionary[i].style.top == "280px"
         || missionary[i].style.top == "280px") return false
     }
    }
    return true

}


function update()
{  
   if(boatCount == 2)
  { for(let i = 0; i < 3; i++)
  {
      if(!cannibal[i].classList.contains("onBoat"))
      { cannibal[i].style.cursor = "not-allowed" 
        
       }
      if(!missionary[i].classList.contains("onBoat"))
      { missionary[i].style.cursor = "not-allowed" 
  }
  }
  }
  else {
    for(let i = 0; i < 3; i++)
    {
     cannibal[i].style.cursor = "" 
     missionary[i].style.cursor = ""
    }
  }

}


function animateSpots()
{
   
  for(let i = 0; i < 3; i++)
  {
    if(cannibal[i].style.top == "220px")
    {
      cannibal[i].style.animation = "goCannibalOne 3.5s 1 linear"
      
    }  
    else if(cannibal[i].style.top == "410px")
    {
      cannibal[i].style.animation = "goCannibalOne 3.5s 1 linear reverse "
    }
    else if(cannibal[i].style.top == "250px")
    {
      cannibal[i].style.animation = "goCannibalTwo 3.5s 1 linear"
    }
    else if(cannibal[i].style.top == "440px")
    {
      cannibal[i].style.animation = "goCannibalTwo 3.5s 1 linear reverse"
    }

    if(missionary[i].style.top == "250px")
    {
      missionary[i].style.animation = "goMissionaryOne 3.5s 1 linear"
      
    }  
    else if(missionary[i].style.top == "440px")
    {
      missionary[i].style.animation = "goMissionaryOne 3.5s 1 linear reverse "
    }
    else if(missionary[i].style.top == "280px")
    {
      missionary[i].style.animation = "goMissionaryTwo 3.5s 1 linear"
    }
    else if(missionary[i].style.top == "470px")
    {
      missionary[i].style.animation = "goMissionaryTwo 3.5s 1 linear reverse"
    }

  }

}
function setEndAnimations()
{
for(let i=0; i<3 ; i++)
{cannibal[i].addEventListener("animationend",() =>{
  
  cannibal[i].style.animation = ""
  if(!cannibal[i].classList.contains("otherShore") && cannibal[i].style.top == "220px") {
     cannibal[i].style.top = "410px"
     cannibal[i].style.left = "950px"
     cannibal[i].classList.add("otherShore")
    }
  else if(cannibal[i].classList.contains("otherShore") && cannibal[i].style.top == "410px")
  { 
    cannibal[i].style.top = "220px"
     cannibal[i].style.left = "480px"
     cannibal[i].classList.remove("otherShore")
  }
  else if(!cannibal[i].classList.contains("otherShore") && cannibal[i].style.top == "250px") {
    cannibal[i].style.top = "440px"
    cannibal[i].style.left = "830px"
    cannibal[i].classList.add("otherShore")
   }
   else if(cannibal[i].classList.contains("otherShore") && cannibal[i].style.top == "440px") {
    cannibal[i].style.top = "250px"
    cannibal[i].style.left = "360px"
    cannibal[i].classList.remove("otherShore")
   }

 })
 missionary[i].addEventListener("animationend",() =>{
 missionary[i].style.animation = ""
 if(!missionary[i].classList.contains("otherShore") && missionary[i].style.top == "250px") {
  missionary[i].style.top = "440px"
  missionary[i].style.left = "990px"
  missionary[i].classList.add("otherShore")
 }
else if(missionary[i].classList.contains("otherShore") && missionary[i].style.top == "440px")
{ 
 missionary[i].style.top = "250px"
  missionary[i].style.left = "520px"
  missionary[i].classList.remove("otherShore")
}
else if(!missionary[i].classList.contains("otherShore") && missionary[i].style.top == "280px")
{
  missionary[i].style.top = "470px"
  missionary[i].style.left = "870px"
  missionary[i].classList.add("otherShore")
}
else if(missionary[i].classList.contains("otherShore") && missionary[i].style.top == "470px")
{  missionary[i].style.top = "280px"
   missionary[i].style.left = "400px"
   missionary[i].classList.remove("otherShore")

}
else if(missionary[i].classList.contains("eaten"))
{
  missionary[i].style.display = "none"
}

})
}
}

function disablePassengersWhileSailing(On) //disables clicking of passengers during boat movment
{     if(On == true)
     { for(let i=0; i< 3; i++)
      {
         
         cannibal[i].style.pointerEvents = "none" 
       
         missionary[i].style.pointerEvents = "none" 
      }
    }
    else
    {
      for(let i=0; i< 3; i++)
      {
       
          cannibal[i].style.pointerEvents = "" 
          missionary[i].style.pointerEvents = "" 
      }
    }

}

function movePlayersOutOfBoat()
{
  for(let i=0; i< 3; i++)
  { window.places = []
    window.placesM = []
    cannibal[i].addEventListener("click",() => {
      if(cannibal[i].classList.contains("onBoat")  && places[0] == undefined
        && boat.classList.contains("otherShore"))
    { 
       cannibal[i].style.top = "140px" 
       cannibal[i].style.left = "970px"
       boatCount--
       cannibal[i].classList.remove("onBoat")
       places[0] = i
       update()
       if(gameWon()) { setTimeout(function () {
        restart(true)
        
      }, 500)}

    }
   else if(cannibal[i].classList.contains("onBoat")  && places[1] == undefined
    && boat.classList.contains("otherShore"))
{ 
   cannibal[i].style.top = "140px" 
   cannibal[i].style.left = "900px"
   boatCount--
   cannibal[i].classList.remove("onBoat")
   places[1] = i 
   update()
   if(gameWon()) { setTimeout(function () {
    restart(true)
   
  }, 500)}
}
else if(cannibal[i].classList.contains("onBoat")  && places[2] == undefined
    && boat.classList.contains("otherShore"))
{ 
   cannibal[i].style.top = "140px" 
   cannibal[i].style.left = "830px"
   boatCount--
   cannibal[i].classList.remove("onBoat")
   places[2] = i
   update()
   if(gameWon()) { setTimeout(function () {
    restart(true)
    
  }, 500)}
}
else if(!cannibal[i].classList.contains("onBoat")  && boatCount == 0
    && boat.classList.contains("otherShore")
    && cannibal[i].classList.contains("otherShore"))
{ 
   cannibal[i].style.top = "410px" 
   cannibal[i].style.left = "950px"
   boatCount++
   cannibal[i].classList.add("onBoat")
   for(let j = 0; j < 3; j++)
   {
      if(places[j] == i)
      {
        places[j] = undefined
      }
   }
   update()
}
else if(!cannibal[i].classList.contains("onBoat")  && boatCount == 1
    && spotIsEmpty(1)
    && boat.classList.contains("otherShore")
    && cannibal[i].classList.contains("otherShore"))
{ 
   cannibal[i].style.top = "410px" 
   cannibal[i].style.left = "950px"
   boatCount++
   cannibal[i].classList.add("onBoat")
   for(let j = 0; j < 3; j++)
   {
      if(places[j] == i)
      {
        places[j] = undefined
      }
   }
   update()
}
else if(!cannibal[i].classList.contains("onBoat")  && boatCount == 1
    && spotIsEmpty(2)
    && boat.classList.contains("otherShore")
    && cannibal[i].classList.contains("otherShore"))
{ 
   cannibal[i].style.top = "440px" 
   cannibal[i].style.left = "830px"
   boatCount++
   cannibal[i].classList.add("onBoat")
   for(let j = 0; j < 3; j++)
   {
      if(places[j] == i)
      {
        places[j] = undefined
      }
   }
   update()
}
})

missionary[i].addEventListener("click", () =>{
  if(missionary[i].classList.contains("onBoat")  && placesM[0] == undefined
  && boat.classList.contains("otherShore"))
{ 
 missionary[i].style.top = "360px" 
 missionary[i].style.left = "1220px"
 boatCount--
 missionary[i].classList.remove("onBoat")
 placesM[0] = i
 update()
 if(gameWon()) { setTimeout(function () {
  restart(true)
  
}, 500)}

}
else if(missionary[i].classList.contains("onBoat")  && placesM[1] == undefined
&& boat.classList.contains("otherShore"))
{ 
missionary[i].style.top = "360px" 
missionary[i].style.left = "1140px"
boatCount--
missionary[i].classList.remove("onBoat")
placesM[1] = i 
update()
if(gameWon()) { setTimeout(function () {
  restart(true)
  
}, 500)}
}
else if(missionary[i].classList.contains("onBoat")  && placesM[2] == undefined
    && boat.classList.contains("otherShore"))
{ 
   missionary[i].style.top = "320px" 
   missionary[i].style.left = "1060px"
   boatCount--
   missionary[i].classList.remove("onBoat")
   placesM[2] = i
   update()
   if(gameWon()) { setTimeout(function () {
    restart(true)
    
  }, 500)}
}
else if(!missionary[i].classList.contains("onBoat")  && boatCount == 0
    && boat.classList.contains("otherShore")
    && missionary[i].classList.contains("otherShore"))
{ 
   missionary[i].style.top = "440px" 
   missionary[i].style.left = "990px"
   boatCount++
   missionary[i].classList.add("onBoat")
   for(let j = 0; j < 3; j++)
   {
      if(placesM[j] == i)
      {
        placesM[j] = undefined
      }
   }
   update()
}
else if(!missionary[i].classList.contains("onBoat")  && boatCount == 1
    && spotIsEmpty(1)
    && boat.classList.contains("otherShore")
    && missionary[i].classList.contains("otherShore"))
{ 
   missionary[i].style.top = "440px" 
   missionary[i].style.left = "990px"
   boatCount++
   missionary[i].classList.add("onBoat")
   for(let j = 0; j < 3; j++)
   {
      if(placesM[j] == i)
      {
        placesM[j] = undefined
      }
   }
   update()
}
else if(!missionary[i].classList.contains("onBoat")  && boatCount == 1
    && spotIsEmpty(2)
    && boat.classList.contains("otherShore")
    && missionary[i].classList.contains("otherShore"))
{ 
   missionary[i].style.top = "470px" 
   missionary[i].style.left = "870px"
   boatCount++
   missionary[i].classList.add("onBoat")
   for(let j = 0; j < 3; j++)
   {
      if(placesM[j] == i)
      {
        placesM[j] = undefined
      }
   }
   update()
}


})

}
}


function gameOver()   // invoked when boat moves : after animationstart event
{  var loss = false
   var firstShore = []
   var secondShore = []
   for(let i = 0; i < 3; i++)
   { 
     if(!cannibal[i].classList.contains("otherShore")
        && !cannibal[i].classList.contains("onBoat")) firstShore.push("C")
     if(!missionary[i].classList.contains("otherShore")
        && !missionary[i].classList.contains("onBoat")) firstShore.push("M")
     if(cannibal[i].classList.contains("otherShore")
      && !cannibal[i].classList.contains("onBoat")) secondShore.push("C")
     if(missionary[i].classList.contains("otherShore")
       && !missionary[i].classList.contains("onBoat")) secondShore.push("M")
   }
   var CannibalsCount1 = 0
   var CannibalsCount2 = 0
   for(let i=0; i < firstShore.length ; i++)
   {
     if(firstShore[i] == "C") CannibalsCount1++
   }
   if(CannibalsCount1 > firstShore.length / 2
      && firstShore.includes("M")) { loss = true }
   for(let i=0; i < secondShore.length ; i++)
   {
     if(secondShore[i] == "C") CannibalsCount2++
   }
   if(CannibalsCount2 > secondShore.length / 2
    && secondShore.includes("M")) { loss = true }
   
   return loss 
    
   
}

function gameWon() // invoked when a passenger gets to the second shore
{
  for(let i=0; i<3 ; i++)
  {
    if(!cannibal[i].classList.contains("otherShore")
        || !missionary[i].classList.contains("otherShore"))
        return false
  }
  
  return boatCount == 0
}

function animateEatenMissionaries(shore)
{
   for(let i = 0; i < 3; i++)
   {
      if(shore == 1)
      {
      if(!missionary[i].classList.contains("otherShore")
        && !missionary[i].classList.contains("onBoat"))
        { missionary[i].style.animation = "eaten 2.5s"
          missionary[i].classList.add("eaten") }
     

      }
      else {
        if(missionary[i].classList.contains("otherShore")
        && !missionary[i].classList.contains("onBoat"))
        { missionary[i].style.animation = "eaten 2.5s forwards"
        missionary[i].classList.add("eaten") }
       

      }
   }
}

function restart(win)
{  window.over = document.getElementsByClassName("overlay")[0]
   window.msg = document.getElementsByClassName("loss")[0]
   msg.getElementsByTagName("button")[0].addEventListener("click",() =>{
    resetGame()

   }) 
  if(win == false)
  { 
   over.style.display = "block"
   msg.style.display = "flex"
   msg.getElementsByTagName("p")[0].innerText = 
   "Cannibals have outnumbered missionaries. Game over !"
  
  }

   else
   {
    over.style.display = "block"
    msg.style.display = "flex"
    msg.getElementsByTagName("p")[0].innerText = 
    "You have won in " + moves + " moves ! "
  }
   
}


function resetGame()
{
  boatCount = 0
  moves = 0
  for(let i = 0; i < 3 ; i++)
  {  
   
    //reset position
    cannibal[i].style.top = ""
    cannibal[i].style.left = ""
    missionary[i].style.top = ""
    missionary[i].style.left = ""
    //remove classes
    cannibal[i].classList.remove("otherShore")
    cannibal[i].classList.remove("onBoat")
    missionary[i].classList.remove("otherShore")
    missionary[i].classList.remove("onBoat")
    if(missionary[i].classList.contains("eaten"))
     { missionary[i].classList.remove("eaten")
     missionary[i].style.display = "" }
  }
  
  boat.classList.remove("otherShore")
  boat.style.top = ""
  boat.style.left = ""
  over.style.display = "none"
  msg.style.display = "none"
  places = []
  placesM = []
  update()
  

}




function solutionAndRules() //à l'aide de fichier Astar.js
{
   
   var solution = document.getElementsByClassName("solution")[0]
   solution.append(JSON.stringify(WinningPath()))

   var rules = document.getElementsByClassName("rules")[0]
   var btnSolution = document.getElementsByClassName("showSolution")[0]
   btnSolution.addEventListener("click",(e) =>{
     if(solution.style.display == "")
     {
      solution.style.display = "block"
      
     e.target.innerText = "Hide"
     
     }
     else {
      solution.style.display = ""
      e.target.innerText = "Solution"
     }
   })
   var btnRules = document.getElementsByClassName("showRules")[0]
   btnRules.addEventListener("click",(e) =>{
     if(rules.style.display == "")
     {
      rules.style.display = "block"
    
      e.target.innerText = "Hide"
      
     }
     else {
      rules.style.display = ""
      e.target.innerText = "Rules"
     }
   })
   
}



