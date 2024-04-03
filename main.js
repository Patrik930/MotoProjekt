import { getData } from "./getData.js"
import { fetchMotorcycles } from "./fetch-moto-api.js";

let page=1
let pageSize=6
let totalPage=1
let Motorcycles;
document.querySelector('.pagination').addEventListener('click',handlePagination)

const project = ()=>{
    console.log("ok");
      const url = "https://raw.githubusercontent.com/Patrik930/MotoProjektImages/main/MotoImages"
      getData(url,renderData,renderMotorcycles)
      let row = document.querySelector(".sor")
      function renderData(data){
          console.log(data);
          data.forEach(e => {
          row.innerHTML += `<div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img class="w-full" src="${e.img}">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">${e.model}</div>
            <p class="text-gray-700 text-base"></p>
          </div>
      </div>`

        
          })
      renderPagination(Motorcycles.length)
    }
}
project()

function renderMotorcycles(data){
  Motorcycles = data
}

function renderPagination(totalItems){
  totalPage=Math.ceil(totalItems/pageSize)
  document.querySelector('.pagination').innerHTML=''
  for(let i=1;i<totalPage;i++){
      let button = document.createElement('button')
      button.textContent=i
      button.classList.add('page-btn')
      if(i==page){
          button.classList.add('bg-indigo-600') 
      }
      document.querySelector('.pagination').appendChild(button)
  }
}

function handlePagination(e){
  if(e.target.classList.contains('page-btn')){
      page=+e.target.textContent
  }
  renderData()
}
