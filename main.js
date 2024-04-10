import { getData } from "./getData.js"
import { fetchMotorcycles } from "./fetch-moto-api.js"
import { verifyAttribute } from "./verifyAttribute.js"

let images = []


const project = ()=>{
      const url = "https://raw.githubusercontent.com/Patrik930/MotoProjektImages/main/MotoImages"
      getData(url,renderImages)
      
}


function renderImages(data){
  /* console.log(data);
  */
   images = data
   console.log(images);
   fetchMotorcycles(renderData)
   /*
   */
}



project()

function renderData(data){
  console.log(data);
  console.log(images);

  let row = document.querySelector(".sor")
  data.forEach(e => {
    let imgObj = images.find(obj => obj.model.trim().includes(e.model.trim()))
    if(imgObj){

    row.innerHTML += `<div class="max-w-sm rounded overflow-hidden shadow-lg text-center">
    <img class="w-full aspect-square object-contain" src="${imgObj?.img}" alt="${e.model}">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 text-center text-lime-700">${e.model}</div>
      <button class="myBtn">More Info</button>
      <p class="text-gray-700 text-base"></p>
    </div>
 </div>`
    }  
    })
}


document.querySelectorAll('button').forEach(obj=>{
    obj.addEventListener('click',auth)
})

function auth(e){
    if(document.querySelector('input').classList.contains('hidden')){
        document.querySelectorAll('input').forEach(obj=>{
            obj.classList.remove('hidden')
        })
        return
    }
    console.log(e.target.textContent);
    let username=document.getElementById('username').value
    let pw=document.getElementById('pw').value
    let users= JSON.parse(localStorage.getItem('users')) || [] 
    if(username.length==0 || pw.length==0) return
    //register esetén:
    if(e.target.textContent=='Register'){
        //nem lehet két egyforma felhasználónev
        if(verifyAttribute(users,'username',username)){
            document.querySelector('#msg').innerHTML=`Foglalt felhasználónév`
            return
        }
        users.push({username,pw})
        localStorage.setItem('users',JSON.stringify(users))
        document.querySelector('#msg').innerHTML = `Sikeres regisztráció!`

    }else{//login esetén
        verifyAuth()
        let invalidUser=users.find(obj=>obj.username == username && obj.pw == pw)
        if(invalidUser){
            document.querySelector("#msg").innerHTML = "Sikeres bejelentkezés!"
            document.querySelector('.logout').title=username
            localStorage.setItem("authUser", username)
            verifyAuth()
            hideInpt()
        }else{
            document.querySelector("#msg").innerHTML = "Hibás felhasználónév vagy jelszó"
        }
        
        
    }
}

function verifyAuth(){
    if(localStorage.getItem("authUser")){
        localStorage.getItem("authUser")
        document.querySelector(".login").classList.add("hidden")
        document.querySelector(".register").classList.add("hidden")
        document.querySelector(".logout").classList.remove("hidden")
        document.querySelector(".logout").addEventListener("click",logoutUser)
    }
}

verifyAuth()

function logoutUser(){
    localStorage.removeItem("authUser")
    document.querySelector(".login").classList.remove("hidden")
    document.querySelector(".register").classList.remove("hidden")
    document.querySelector(".logout").classList.add("hidden")
    document.querySelector("#msg").innerHTML = ""
    hideInpt()
}

function hideInpt(){
    document.querySelectorAll("input").forEach((obj)=>{
        obj.classList.add("hidden")
    })
}