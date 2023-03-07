const griglia = document.getElementById("griglia");
const gioca = document.getElementById("gioca");
const rigioca = document.getElementById("Rigioca");
const layover = document.getElementById("layover");
let bombe = [];
let numeroBombe = 16;
let contatore = document.getElementById('contatore');
let c = 0;

gioca.addEventListener('click', 
   function () {

      const difficoltaDom = document.getElementById('difficolta').value;
      let difficoltà;

      if (difficoltaDom == "Easy") {
         difficoltà = 100;
         griglia.className = `d-flex flex-wrap griglia-${difficoltà}`;
      } else if (difficoltaDom == "Hard") {
         difficoltà = 81;
         griglia.className = `d-flex flex-wrap griglia-${difficoltà}`;
      } else if (difficoltaDom == "Impossible") {
         difficoltà = 49;
         griglia.className = `d-flex flex-wrap griglia-${difficoltà}`;
      }

      for(let b = 1; b <= numeroBombe; b++) {
         bombe.push(generateUniqueRandomNumber(bombe, 1, difficoltà));
      }

      console.log(bombe);

      creaQuadrati(difficoltà,griglia);
   }
)

rigioca.addEventListener('click', 
   function () {

      location.reload(); 

   }
)




function creaQuadrati(difficoltà,destinazione) {

   destinazione.innerHTML = "";
   for(let i = 1; i <= difficoltà; i++) {

      const div = document.createElement("div");
      if (bombe.includes(i)) {
         div.className = `bomba`;
      }  
      div.append(i);   
      destinazione.append(div);
      cliccato(div);
   }      
}

function cliccato(div) {

   div.addEventListener('click', 
      function () {
         if (div.className == `bomba`) {
            let clickedBomba = document.getElementsByClassName(`bomba`);
            for(let x = 0; x < numeroBombe; x++) {
               clickedBomba[x].classList.add("clicked");
               layover.classList.remove("d-none");
            }
         } else {
            div.classList.toggle("clicked");
         }
         c++;
         contatore.innerText = c;
      }
   )
}

function generaNumeroRandom(min, max) {
   const numeroRandom = Math.floor( Math.random() * (max - min + 1) ) + min;
   return numeroRandom;
}

function generateUniqueRandomNumber(bombe, min, max) {

   let isValidNumber = false;
   let randomNumber;

   while (!isValidNumber) {
      randomNumber = generaNumeroRandom(min, max);
      if (!bombe.includes(randomNumber)) {
         isValidNumber = true;
      }
   }
   return randomNumber;
}