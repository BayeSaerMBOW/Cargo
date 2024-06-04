import {
  Validateur,
  RegleSelect,
  ChampsRequiseRegle,
  RegleNonNumerique,
  RefleLongueurMin,
  RefleLongueurMax,
  RegleNombre,
  ReglePoids,
} from "./Validator.js";

/* let currentPage :number = 1; */
// Test de l'application
const nbItems = 3;

import {
  Cargaison,
  CargaisonAerienne,
  CargaisonMaritime,
  CargaisonRoutiere,
  ProduitAlimentaire,
  ProduitChimique,
  ProduitMateriel,
} from "./modeles/cargaisons.js";
// console.log("hey");
let db: any[] = [];
let BDB: any[];

function getBDB(): Promise<any> {
  return fetch("../public/json.php")
    .then((response) => response.json())
    .then((data) => {
      BDB = data;
      db = [...BDB];
      console.log(BDB); // Vous pouvez afficher les données ici après les avoir récupérées
      return data; // Assurez-vous de renvoyer les données pour que la promesse soit résolue avec ces données
    });
}

(async () => {
  BDB = await getBDB();
  console.log(BDB); // Vous pouvez également accéder aux données ici après les avoir récupérées
})();

// recuperer formdata cargaisons
const form = document.getElementById("cargaisonForm") as HTMLFormElement;
const submit = document.getElementById("Enregistrer") as HTMLElement;

function showError(elementId: string, message: string) {
  const errorElement = document.getElementById("error" + elementId);
  if (errorElement) {
    errorElement.textContent = message;
  }
}
/*  console.log(form); */
/* const Enregistrer=document.getElementById("Enregistrer"); */
submit.addEventListener("click", async (event) => {
  const numero = (document.getElementById("numero") as HTMLInputElement).value;
  const lieuDepart = (document.getElementById("lieuDepart") as HTMLInputElement)
    .value;
  /* console.log(lieuDepart, numero); */

  event.preventDefault();
  // console.log("this is a test")

  const formData = new FormData(form);
  const valider = new Validateur("#cargaisonForm");
  valider.ajouterRegle(
    "numero",
    new ChampsRequiseRegle("Le libellé de la cargaison est requis"),
    new RegleNonNumerique(),
    new RefleLongueurMin(5),
    new RefleLongueurMax(50)
  );
  valider.ajouterRegle(
    "lieuDepart",
    new ChampsRequiseRegle("Le lieu de départ est requis")
  );
  valider.ajouterRegle(
    "distance",
    new ChampsRequiseRegle("La distance est requise")
  );
  valider.ajouterRegle(
    "lieuArrivee",
    new ChampsRequiseRegle("Le lieu de départ est requis")
  );
  valider.ajouterRegle(
    "DateDepart",
    new ChampsRequiseRegle("Le lieu d'arrivée est requis")
  );
  valider.ajouterRegle(
    "DateArrivee",
    new ChampsRequiseRegle("Le lieu d'arrivée est requis")
  );
  /*   valider.ajouterRegle('coordonneD', new ChampsRequiseRegle("Les coordonnées de départ sont requises"));
        valider.ajouterRegle('coordonneA', new ChampsRequiseRegle("Les coordonnées d'arrivée sont requises"));
        valider.ajouterRegle('poids', new RegleNombre(), new ReglePoids(1, 999999));
        valider.ajouterRegle('quantite', new RegleNombre(), new ReglePoids(1, 99999)); */

  valider.validerEtTraiterFormulaire;

  const cargaison = {
    poidsMax: Number(formData.get("poidsMax")),
    produits: [],
    prixTotal: Number(formData.get("prixTotal")),
    lieuDepart: formData.get("lieuDepart") as string,
    lieuArrivee: formData.get("lieuArrivee") as string,
    distance: Number(formData.get("distance")),
    typeCargaison: formData.get("typeCargaison") as string,
    etatAvancement: formData.get("etatAvancement") as string,
    etatGlobal: formData.get("etatGlobal") as string,
    DateDepart: formData.get("DateDepart") as string,
    DateArrivee: formData.get("DateArrivee") as string,
    codeCargo: "SAER" + Math.floor(Math.random() * 100),
  };

  if (!numero) {
    showError("numero", "Veuillez saisir un numéro de cargaison");
    return;
  }
  if (!lieuDepart) {
    showError("lieuDepart", "Veuillez saisir un lieu de départ");
    return;
  }
  let cardModel = `<div
    class="card bg-blue-100 hover:text-blue-500 p-4 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200 ease-out">
    <div class="mb-4 flex justify-between">
    <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">${cargaison.typeCargaison}</span>
    <span class="px-3 py-1 inline-block rounded-full bg-red-100 text-red-800">${cargaison.etatAvancement}</span>
    </div>
    <div class="w-full h-44 mb-2 border border-solid border-gray-200 rounded-2xl overflow-hidden">
    <img src="Sans titre.jpeg" class="rounded-2xl w-full h-full object-cover" alt="avion">
    </div>
    <div class="mb-2">
    <span class="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Alimentaire</span>
    <span class="inline-block bg-orange-100 text-orange-600 px-2 py-1 rounded-full ml-1">Fragile</span>
    </div>
    <div class="flex justify-between items-center w-full h-10 flex-wrap">
    <p class="text-blue-600 font-bold text-sm ml-2">18/10/2024</p>
    <p class="text-blue-600 font-bold text-sm mr-2">21/01/2024</p>
    </div>
    <div class="flex h-10 w-full items-center justify-between">
    <p class="text-blue-600 font-bold text-sm">Poids restant:</p>
        <div class="w-7/12 bg-gray-200 rounded-full h-10">
            <div class="bg-blue-600 h-10 rounded-full flex justify-center items-center" style="width: 80%">
                <span class="font-bold text-center text-white">80%</span>
            </div>
        </div>
    </div>
</div>`;
  let listModel = `
<tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.codeCargo}</td>
                        <td class="border px-4 py-2 text-gray-600">${cargaison.typeCargaison}</td>
                        <td class="border px-4 py-2">
                        <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">${cargaison.distance}</span>
                        <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full"></span>
                        </td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.lieuDepart}</td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.lieuArrivee}</td>
                        <td class="border px-4 py-2">
                        <span
                        class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">${cargaison.etatGlobal}</span>
                        </td>
                        <td class="border px-4 py-2">
                        <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full">${cargaison.etatAvancement}</span>
                        </td>
                        <td class="border px-4 py-2">
                        <div class="w-full bg-gray-200 rounded-full h-10 relative">
                                <div class="bg-purple-600 h-10 rounded-full flex justify-center items-center"
                                    style="width: 80%">
                                    <span class="font-bold text-center text-white">80%</span>
                                    </div>
                                    </div>
                        </td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.DateDepart}</td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.DateArrivee}</td>
                        <td class="border px-4 py-2">
                        <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded saer" data-id="${cargaison.codeCargo}">
                            Ajouter
                        </button>
                    </td>
                    
                    </tr>`;

  let cardView = document.querySelector("#cards-view") as HTMLDivElement;
  let listView = document.querySelector("#tbody") as HTMLDivElement;
  listView.innerHTML += listModel;

  cardView.innerHTML += cardModel;
  // console.log("Avant");
  submitCargaison(cargaison);

  const recupButton = document.querySelectorAll(".saer");
  recupButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      document.getElementById("hover")!.style.display = "block";
      document.getElementById("popupForme")!.style.display = "block";
    });
  });
  
});
async function submitCargaison(cargaison: any) {
  console.log(cargaison);
  db.push(cargaison);
 /*  console.log(db); */
  try {
    const response = await fetch("../public/dist/data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(db),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

const save = (data: any) => {
  fetch("../php/data.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Traitez les données renvoyées par PHP
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};


function createListModel(cargaison: any) {
  let listModel = `
<tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.codeCargo}</td>
                        <td class="border px-4 py-2 text-gray-600">${cargaison.typeCargaison}</td>
                        <td class="border px-4 py-2">
                        <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">${cargaison.distance}</span>
                        <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full"></span>
                        </td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.lieuDepart}</td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.lieuArrivee}</td>
                        <td class="border px-4 py-2">
                        <span
                        class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">${cargaison.etatGlobal}</span>
                        </td>
                        <td class="border px-4 py-2">
                        <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full">${cargaison.etatAvancement}</span>
                        </td>
                        <td class="border px-4 py-2">
                        <div class="w-full bg-gray-200 rounded-full h-10 relative">
                                <div class="bg-purple-600 h-10 rounded-full flex justify-center items-center"
                                    style="width: 80%">
                                    <span class="font-bold text-center text-white">80%</span>
                                    </div>
                                    </div>
                        </td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.DateDepart}</td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.DateArrivee}</td>
                        <td class="border px-4 py-2">
    <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded saer" data-id="${cargaison.codeCargo}">
        Ajouter 
    </button>
</td>

                    </tr>`;
  const recupButton = document.querySelectorAll(".saer");
  recupButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      document.getElementById("hover")!.style.display = "block";
      document.getElementById("popupForme")!.style.display = "block";
    });
  });
  return listModel;
}
let pageActuel = 0;
function paginer(page: number, data: Cargaison[]) {
  const longeur = Math.floor(page / nbItems);

  const start = pageActuel * nbItems;
  const end = start + nbItems;
  const tbody = document.getElementById("tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  data.slice(start, end).forEach((cargaison) => {
    tbody.innerHTML += createListModel(cargaison);
  });
}

/*  // Exemple d'utilisation
    const data:any[] = [
      // Insérez ici les objets cargaison
    ]; */

document.addEventListener("DOMContentLoaded", () => {
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("next");

  // console.log(db,"dtylikujh");

  prevButton?.addEventListener("click", () => {
    if (pageActuel > 0) {
      pageActuel--;
    }
    paginer(pageActuel, db);
  });
  nextButton?.addEventListener("click", () => {
    if (pageActuel < db.length / nbItems + 1) {
      pageActuel++;
    }
    paginer(pageActuel, db);
  });

  // Initialiser la première page
  // paginer(0, db);
});

// Votre code existant ici...
document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = document.querySelectorAll(".filter");
  console.log(BDB);
  searchInputs.forEach((input) => {
    input.addEventListener("input", () => {
      const numero = (
        document.getElementById("searchNumero") as HTMLInputElement
      ).value.toLowerCase();
      const type = (
        document.getElementById("searchType") as HTMLInputElement
      ).value.toLowerCase();
      const depart = (
        document.getElementById("searchDepart") as HTMLInputElement
      ).value.toLowerCase();
      const arrivee = (
        document.getElementById("searchArrivee") as HTMLInputElement
      ).value.toLowerCase();
      const dateDepart = (
        document.getElementById("searchDateDepart") as HTMLInputElement
      ).value;
      const dateArrivee = (
        document.getElementById("searchDateArrivee") as HTMLInputElement
      ).value;

      const filteredCargaisons = BDB.filter((cargaison) => {
        return (
          (numero === "" || cargaison.codeCargo.toLowerCase().includes(numero)) &&
          (type === "" ||
            cargaison.typeCargaison.toLowerCase().includes(type)) &&
          (depart === "" ||
            cargaison.lieuDepart.toLowerCase().includes(depart)) &&
          (arrivee === "" ||
            cargaison.lieuArrivee.toLowerCase().includes(arrivee)) &&
          (dateDepart === "" || cargaison.DateDepart === dateDepart) &&
          (dateArrivee === "" || cargaison.DateArrivee === dateArrivee)
        );
      });
      console.log(filteredCargaisons);
      displayCargos(filteredCargaisons);
      afficherDetails();

      // const tbody = document.getElementById('tbody');
      // if (tbody) {
      //   tbody.innerHTML = '';
      //   filteredCargaisons.forEach(cargaison => {
      //     tbody.innerHTML += `
      //     <tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
      //     <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.numero}</td>
      //     <td class="border px-4 py-2 text-gray-600">${cargaison.typeCargaison}</td>
      //     <td class="border px-4 py-2">
      //     <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">${cargaison.distance}</span>
      //     <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full"></span>
      //     </td>
      //     <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.lieuDepart}</td>
      //     <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.lieuArrivee}</td>
      //     <td class="border px-4 py-2">
      //     <span
      //     class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">${cargaison.etatGlobal}</span>
      //     </td>
      //     <td class="border px-4 py-2">
      //     <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full">${cargaison.etatAvancement}</span>
      //     </td>
      //     <td class="border px-4 py-2">
      //     <div class="w-full bg-gray-200 rounded-full h-10 relative">
      //             <div class="bg-purple-600 h-10 rounded-full flex justify-center items-center"
      //                 style="width: 80%">
      //                 <span class="font-bold text-center text-white">80%</span>
      //                 </div>
      //                 </div>
      //     </td>
      //     <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.DateDepart}</td>
      //     <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.DateArrivee}</td>
      // </tr>
      //     `;
      //   });
      // }
    });
  });

  // Initially display all cargaisons
  const tbody = document.getElementById("tbody");
  if (tbody) {
    tbody.innerHTML = "";
    db.forEach((cargaison) => {
      tbody.innerHTML += `
        <tr>
          <td>${cargaison.codeCargo}</td>
          <td>${cargaison.typeCargaison}</td>
          <td>${cargaison.lieuDepart}</td>
          <td>${cargaison.lieuArrivee}</td>
          <td>${cargaison.DateDepart}</td>
          <td>${cargaison.DateArrivee}</td>
          <td class="border px-4 py-2">
          <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded saer" data-id="${cargaison.codeCargo}">
              Ajouter 
          </button>
          <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded saer" data-id="${cargaison.codeCargo}">
          ouvert
      </button>
      </td>

      
        </tr>
        
      `;
      const recupButton = document.querySelectorAll(".saer");
      recupButton.forEach((button) => {
        button.addEventListener("click", (event) => {
          id = button.getAttribute("data-id")!;
          console.log(id);

          document.getElementById("hover")!.style.display = "block";
          document.getElementById("popupForme")!.style.display = "block";
        });
      });
    });
  }
});

let id: string;
// Define the Cargo interface for TypeScript
interface Cargo {
  numero: string;
  typeCargaison: string;
  distance: number;
  lieuDepart: string;
  lieuArrivee: string;
  etatGlobal: string;
  etatAvancement: string;
  DateDepart: string;
  DateArrivee: string;
  codeCargo: string;
}

let cargaisons: Cargo[];

// Function to load cargos from a JSON file
// function loadCargos(): void {
//   fetch("/gestionCargo/public/json.php") // Assurez-vous que ce chemin est correct
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Erreur lors de la récupération des cargaisons");
//       }
//     })
//     .then((data: Cargo[]) => {
//       cargaisons = data; // Store the fetched cargos
//       console.log(data);
//       displayCargos(cargaisons); // Display cargos initially
//     })
//     .catch((error) => console.error("Error:", error));
// }
// Fonction pour afficher les cargaisons dans le tableau
interface Cargo {
  codeCargo: string;
  typeCargaison: string;
  distance: number;
  lieuDepart: string;
  lieuArrivee: string;
  etatGlobal: string;
  etatAvancement: string;
  DateDepart: string;
  DateArrivee: string;
}

function displayCargos(cargaisons: Cargo[]): void {
  const tableBody = document.getElementById("tbody") as HTMLTableSectionElement;
  tableBody.innerHTML = ""; // Clear existing table content

  cargaisons.forEach((cargo) => {
    const row = document.createElement("tr");
    row.className = "bg-white hover:bg-gray-100 transition duration-300 ease-in-out";
    row.innerHTML = `
      <td class="border px-4 py-2 text-purple-600 font-bold">${cargo.codeCargo}</td>
      <td class="border px-4 py-2 text-gray-600">${cargo.typeCargaison}</td>
      <td class="border px-4 py-2">
        <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">${cargo.distance}</span>
      </td>
      <td class="border px-4 py-2 text-purple-600 font-bold">${cargo.lieuDepart}</td>
      <td class="border px-4 py-2 text-purple-600 font-bold">${cargo.lieuArrivee}</td>
      <td class="border px-4 py-2">
        <span class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">${cargo.etatGlobal}</span>
      </td>
      <td class="border px-4 py-2">
        <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full">${cargo.etatAvancement}</span>
      </td>
      <td class="border px-4 py-2">
        <div class="w-full bg-gray-200 rounded-full h-10 relative">
          <div class="bg-purple-600 h-10 rounded-full flex justify-center items-center" style="width: 80%">
            <span class="font-bold text-center text-white">80%</span>
          </div>
        </div>
      </td>
      <td class="border px-4 py-2 text-purple-600 font-bold">${cargo.DateDepart}</td>
      <td class="border px-4 py-2 text-purple-600 font-bold">${cargo.DateArrivee}</td>
      <td class="border px-4 py-2">
        <div style="display:flex; gap:2;">
          <button class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded saer" data-id="${cargo.codeCargo}">
            Ajouter produit
          </button>
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4" onclick="updateEtat('${cargo.codeCargo}', 'Ouvert')">
            Ouvert
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4" onclick="updateEtat('${cargo.codeCargo}', 'Ferme')">
            Ferme
          </button>
          <button id="details" data-modal-target="default-modal" data-code="${cargo.codeCargo}" data-modal-toggle="default-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          DETAILS
    </button>

        </div>
      </td>
     
    `;
    tableBody.appendChild(row);
     
  });

  const recupButton = document.querySelectorAll(".saer");
  recupButton.forEach((button) => {
    button.addEventListener("click", (event) => {
      id = button.getAttribute("data-id")!;
      console.log(id);
      document.getElementById("hover")!.style.display = "block";
      document.getElementById("popupForme")!.style.display = "block";
    });
  });
}

function afficherDetails() {
  let details = document.querySelectorAll('#details');

  details.forEach(el => {
    el.addEventListener('click', () => {
      let codeCargo = el.getAttribute('data-code');
      let cargo:any;

      db.forEach(data => {
        if (data.codeCargo === codeCargo) {
          cargo = data;
        }
      });

      if ((cargo)) {
        let produitsHtml = '';
        cargo.produits.forEach((produit:any) => {
          console.log(produit.typeproduit,produit.quantite);
          produitsHtml += `<span>Produit: ${produit.typeproduit}, Quantité: ${produitsHtml}</span> <br/>`;
        });

        let modal = `
          <div class="flex justify-between w-full text-red-700">
            <p>Type cargaison: ${cargo.typeCargaison}</p>
            <p>Distance cargaison: ${cargo.distance} km</p>
          </div>
          <div class="flex justify-between w-full text-red-700">
            <p>Lieu de départ: ${cargo.lieuDepart}</p>
            <p>Lieu d'arrivée: ${cargo.lieuArrivee}</p>
          </div>
          <div class="flex justify-between w-full text-red-700">
            <p>Date de départ: ${cargo.DateDepart}</p>
            <p>Date d'arrivée: ${cargo.DateArrivee}</p>
          </div>
          <div class="flex justify-between w-full text-red-700">
            <p>Étapes de la Cargaison: ${cargo.etatAvancement}</p>
            <p>État global: ${cargo.etatGlobal}</p>
          </div>
          <div class="flex justify-between w-full text-red-700">
            <p>Produits dans la cargaison:</p>
            ${produitsHtml}
          </div>
        `;
        console.log(produitsHtml)
        let detailsModal = document.getElementById('detailsModal');
        detailsModal!.innerHTML = modal;
      } else {
        console.log('Cargaison non trouvée');
      }
    });
  });
}


// Fonction pour mettre à jour l'état de la cargaison
function updateEtat(codeCargo: string, etatGlobal: string) {
  const payload = {
    codeCargo: codeCargo,
    etatGlobal: etatGlobal,
  };

  fetch('../public/json.php', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    loadCargos(); // Mettre à jour la liste des cargaisons
  })
  .catch(error => console.log('Error:', error));
}

// Charger les cargaisons lors du chargement initial de la page
document.addEventListener("DOMContentLoaded", loadCargos);

// Fonction pour obtenir et afficher les cargaisons
function loadCargos() {
  fetch('../public/json.php')
    .then(response => response.json())
    .then(data => {
      displayCargos(data);
      afficherDetails();
    })
    .catch(error => console.log('Error:', error));
}

// Rendre updateEtat disponible globalement
(window as any).updateEtat = updateEtat; 

// Ajout de produit
async function getProduct() {
  const form = document.getElementById("produits-form") as HTMLFormElement;

  if (form) {
    const formData = new FormData(form);
    const formDataObj: { [key: string]: any } = {};
    console.log(formData);
    
    formData.forEach((value, key) => {
      if (key in formDataObj) {
        if (Array.isArray(formDataObj[key])) {
          formDataObj[key].push(value);
        } else {
          formDataObj[key] = [formDataObj[key], value];
        }
      } else {
        formDataObj[key] = value;
      }
    });
    console.log(formDataObj);

    console.log(id);
    
    let index = db.findIndex((el: any) => el.codeCargo === id);
    console.log(index);
    if (index !== -1) {
      db[index].produits.push(formDataObj);
    }

    console.log(db);

    try {
      const response = await fetch("../public/dist/data.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(db),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

let formSubmtContainer = document.querySelector("#form-submit-container") as HTMLElement;
formSubmtContainer.addEventListener("click", (e) => {
  e.preventDefault();
  getProduct();
});

// Load cargos on initial page load
document.addEventListener("DOMContentLoaded", loadCargos);

let filterType = document.getElementById("searchType");

filterType?.addEventListener("input", function () {});
//validation du formulaire
// Récupère une référence au bouton "Suivant"
const nextButton: HTMLElement | null = document.getElementById("nextButton");

// Récupère une référence aux champs supplémentaires
const clientFields: NodeListOf<Element> =
  document.querySelectorAll(".additional-fields");

// Cache initialement les champs supplémentaires
clientFields.forEach((field: Element) => {
  field.classList.add("hidden");
});

// Ajoute un écouteur d'événements pour le clic sur le bouton "Suivant"
if (nextButton) {
  nextButton.addEventListener("click", () => {
    // Affiche les champs supplémentaires lorsque le bouton est cliqué
    clientFields.forEach((field: Element) => {
      field.classList.remove("hidden");
    });
  });
}

//ajouter produit

// let formSubmtContainer = document.querySelector(
//   "#form-submit-container"
// ) as HTMLElement;
// console.log(formSubmtContainer);

// formSubmtContainer.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log("dajk");

//   getProduct();
// });