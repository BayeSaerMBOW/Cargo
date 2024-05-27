// Test de l'application
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("hey");
// recuperer formdata cargaisons
const form = document.getElementById("cargaisonForm");
const submit = document.getElementById("Enregistrer");
console.log(form);
/*  console.log(form); */
/* const Enregistrer=document.getElementById("Enregistrer"); */
submit.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    console.log("this is a test");
    const formData = new FormData(form);
    const cargaison = {
        numero: formData.get("numero"),
        poidsMax: Number(formData.get("poidsMax")),
        produits: formData.get("produits"),
        prixTotal: Number(formData.get("prixTotal")),
        lieuDepart: formData.get("lieuDepart"),
        lieuArrivee: formData.get("lieuArrivee"),
        distance: Number(formData.get("distance")),
        typeCargaison: formData.get("typeCargaison"),
        etatAvancement: formData.get("etatAvancement"),
        etatGlobal: formData.get("etatGlobal"),
        DateDepart: formData.get("DateDepart"),
        DateArrivee: formData.get("DateArrivee"),
    };
    console.log(form);
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
                        <td class="border px-4 py-2 text-purple-600 font-bold">${cargaison.numero}</td>
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
                    </tr>`;
    console.log(cardModel);
    let cardView = document.querySelector("#cards-view");
    let listView = document.querySelector("#tbody");
    listView.innerHTML += listModel;
    cardView.innerHTML += cardModel;
    console.log(JSON.stringify(cargaison));
    const response = yield fetch("./dist/data.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cargaison),
    });
    if (!response.ok) {
        throw new Error(`Erreur: ${response.statusText}`);
    }
    const result = yield response.json();
    console.log("Succès:", result);
}));
export {};

