import { getData } from "./getData.js"
import { fetchMotorcycles } from "./fetch-moto-api.js";

const project = ()=>{
    console.log("ok");
      const url = "https://raw.githubusercontent.com/Patrik930/MotoProjektImages/main/MotoImages"
      getData(url,renderData)
      let row = document.querySelector(".sor")
      function renderData(data){
          console.log(data);
          data.forEach(e => {
          row.innerHTML += `<div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img class="w-full" src="${e.img}">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 center">${e.model}</div>
            <p class="text-gray-700 text-base"></p>
          </div>
      </div>`

        
          })
    }
}
project()
