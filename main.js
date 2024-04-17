import { getData } from "./getData.js"
import { fetchMotorcycles } from "./fetch-moto-api.js"
import { verifyAttribute } from "./verifyAttribute.js"

let images = []


const project = async ()=>{
      let url = "https://raw.githubusercontent.com/Patrik930/MotoProjektImages/main/MotoImages"
      await getData(url, renderImages)
      await fetchMotorcycles(renderData, "kawasaki", "ninja")
      
}


function renderImages(data){
  /* console.log(data);
  */
   images = data
//    console.log(images);
//    fetchMotorcycles(renderData, "kawasaki", "ninja")
   /*
   */
}



project()

function renderData(data){
  console.log(data);
  console.log(images);

  let row = document.querySelector(".sor")
  row.innerHTML = ""
  data.forEach(e => {
    let imgObj = images.find(obj => obj.model.trim().includes(e.model.trim()))
    row.insertAdjacentHTML("beforeend", 
        `<div class="max-w-sm rounded overflow-hidden shadow-lg text-center">
        <img class="w-full aspect-square object-contain" src="${imgObj?.img}" alt="${e.model}">
        <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-center text-lime-700">${e.model}</div>
        <button class="myBtn">More Info</button>
        <p class="text-gray-700 text-base"></p>
        </div>
        </div>`)
   })
}


document.querySelectorAll('.log').forEach(obj=>{
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

document.querySelectorAll(".Brand").forEach(obj=>{
    obj.addEventListener('click',ShowMoreBrand)
})
let h1 = document.querySelector("h1")
async function ShowMoreBrand(e){
    if(e.target.classList.contains("Yamaha")){
        h1.textContent = "Yamaha YZF-R"
        h1.style.color = "rgb(2, 2, 174)"
        await getData("https://raw.githubusercontent.com/Patrik930/MotoImagesYamaha/main/MotoImagesYamaha", renderImages)
        await fetchMotorcycles(renderData, "yamaha", "yzf-r")
    }
    if(e.target.classList.contains("Suzuki")){
        h1.textContent = "Suzuki GSX-R"
        h1.style.color = "rgb(0, 102, 255)"
    }
    if(e.target.classList.contains("Honda")){
        h1.textContent = "Honda CBR"
        h1.style.color = "rgb(255, 0, 0)"
    }
    if(e.target.classList.contains("Kawasaki")){
        h1.textContent = "Kawasaki Ninja"
        h1.style.color = "rgb(4, 150, 16)"
    }
}