import { getData } from "./getData.js"
import { fetchMotorcycles } from "./fetch-moto-api.js";

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

