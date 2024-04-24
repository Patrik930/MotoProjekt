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





function renderData(data){
  console.log(data);
  console.log(images);

  let row = document.querySelector(".sor")
  row.innerHTML = ""
  let models = []
  data.forEach(e => {
    let imgObj = images.find(obj => obj.model.trim().includes(e.model.trim()))
    if (!imgObj || models.includes(e.model)) return
    models.push(e.model)
    row.insertAdjacentHTML("beforeend", 
        `<div class="max-w-sm min-w-72 flex-1 rounded overflow-hidden shadow-lg text-center">
        <img class="w-full aspect-square object-contain" src="${imgObj?.img}" alt="${e.model}">
        <div class="px-6 py-4">
        <div class="Name font-bold text-xl mb-2 text-center text-lime-700">${e.model}</div>
        <button data-modal-target="default-modal" id="toggle-modal" data-modal-toggle="default-modal" type="button" class="MoreInfo KawasakimyBtn">More Info</button>
        <p class="text-gray-700 text-base"></p>
        </div>
        <!-- Main modal -->
        <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div class="relative p-4 w-full max-w-2xl max-h-full">
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <!-- Modal header -->
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          ${e.make} ${e.model}
                      </h3>
                      
                  </div>
                  <!-- Modal body -->
                  <div class="p-4 md:p-5 space-y-4">
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.year} 
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.type}
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.displacement}
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.engine} 
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.valves_per_cylinder}
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.fuel_system} 
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.fuel_control} 
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.cooling}  
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.gearbox} 
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.total_weight}  
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.seat_height}  
                      </p>
                      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        ${e.fuel_capacity}  
                      </p>
                  </div>
                  <!-- Modal footer -->
                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button id="close" data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Close</button>
                  </div>
              </div>
          </div>
      </div>
        </div>


   `)
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
            document.querySelectorAll(".Brand").forEach((e)=>{
                e.removeAttribute("disabled")
            })
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
    document.querySelectorAll(".Brand").forEach((e)=>{
        e.setAttribute("disabled", "")
    })
    document.querySelector(".sor").innerHTML = ""
    document.querySelector("h1").textContent = ""
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
let MoreInfoBtn = document.querySelectorAll(".MoreInfo")
let Brand = document.querySelectorAll(".Name")
async function ShowMoreBrand(e){
    if(e.target.classList.contains("Yamaha")){
        h1.textContent = "Yamaha YZF-R"
        h1.style.color = "rgb(2, 2, 174)"
        await getData("https://raw.githubusercontent.com/Patrik930/MotoImagesYamaha/main/MotoImagesYamaha", renderImages)
        await fetchMotorcycles(renderData, "yamaha", "yzf-r")
        MoreInfoBtn.classList = ""
        MoreInfoBtn.classList.add("YamahamyBtn")
        Brand.classList.textContent.color = "blue"
    }
    if(e.target.classList.contains("Suzuki")){
        h1.textContent = "Suzuki GSX-R"
        h1.style.color = "rgb(0, 102, 255)"
        await getData("https://raw.githubusercontent.com/Patrik930/MotoProjektImagesSuzuki/main/MotoProjektImagesSuzuki", renderImages)
        await fetchMotorcycles(renderData, "suzuki", "gsx-r")
        MoreInfoBtn.classList = ""
        MoreInfoBtn.classList.add("SuzukimyBtn")
        Brand.classList.textContent.color = "blue"
    }
    if(e.target.classList.contains("Honda")){
        h1.textContent = "Honda CBR"
        h1.style.color = "rgb(255, 0, 0)"
        await getData("https://raw.githubusercontent.com/Patrik930/MotoProjektImagesHonda/main/MotorProjektImagesHonda", renderImages)
        await fetchMotorcycles(renderData, "honda", "cbr")
        MoreInfoBtn.classList = ""
        MoreInfoBtn.classList.add("HondamyBtn")
        Brand.classList.textContent.color = "red"
    }
    if(e.target.classList.contains("Kawasaki")){
        h1.textContent = "Kawasaki Ninja"
        h1.style.color = "rgb(4, 150, 16)"
        await getData("https://raw.githubusercontent.com/Patrik930/MotoProjektImages/main/MotoImages",renderImages)
        await fetchMotorcycles(renderData, "kawasaki", "ninja")
        MoreInfoBtn.classList = ""
        MoreInfoBtn.classList.add("KawasakimyBtn")
        Brand.classList.textContent.color = "lime"
    }
}

window.onload=function(){
    let toggle_modal = document.getElementById("toggle-modal")
    console.log(toggle_modal);
    toggle_modal.addEventListener("click",ShowModal)
    let close_button = document.getElementById("close")
    close_button.addEventListener("click",HideModal)
}
let modal = document.getElementById("default-modal")
function ShowModal(){
    modal.classList.remove("hidden")
    
}

function HideModal(){
    modal.classList.add("hidden")
}
