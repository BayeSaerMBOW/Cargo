<nav class="h-full w-full  shadow-md p-4">
    <div id="cargaison-header" class="flex justify-center items-center w-full bg-">
        <div id="cargaison-title-container" class="flex items-center h-20 mb-10 w-2/4">
            <h1 id="cargaison-title" class="text-2xl font-bold text-blue-700">Bienvenue dans la page "AJouter
                cargaisons"</h1>
        </div>
    </div>
 
    <tbody id="tbody"></tbody>
</table>

    <div class="flex justify-between items-center w-full">
        <div class="flex items-center justify-between w-full">
            <div class="">
                <input type="text" placeholder="Search" id="search1"
                    class="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <i
                    class="fa-solid fa-magnifying-glass absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 hidden lg:block"></i>
            </div>
            <div class="flex items-center space-x-4">
                <button id="search-button"
                    class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                    <i class="fa-regular fa-square-plus fa-lg"></i>
                </button>

                <button class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                    <i class="fa-solid fa-gear fa-lg" style="color: #ff0000;"></i>
                </button>
                <button id="toggleViewBtn"
                    class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                    <i id="toggleViewIcon" class="fa-solid fa-list fa-lg"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="w-full h-full mt-4" id="cargaison-container">

        <div id="cards-view" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
            <div
                class="card bg-blue-100 hover:text-blue-500 p-4 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200 ease-out">
                <div class="mb-4 flex justify-between">
                    <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">Aérien</span>
                    <span class="px-3 py-1 inline-block rounded-full bg-red-100 text-red-800">En attente</span>
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
            </div>
            <!-- Ajouter d'autres cartes ici -->
        </div>
        <div id="list-view" class="hidden mb-4">
            <!-- Example list view item -->
            <table class="table-auto w-full" id="cargaisonTable">
                <thead>
                    <tr>
                        <th class="px-4 py-2">Titre</th>
                        <th class="px-4 py-2">Type</th>
                        <th class="px-4 py-2">Distance</th>
                        <th class="px-4 py-2">Lieu Départ</th>
                        <th class="px-4 py-2">Lieu d'arrivée</th>
                        <th class="px-4 py-2">État</th>
                        <th class="px-4 py-2">Étapes</th>
                        <th class="px-4 py-2">Progression</th>
                        <th class="px-4 py-2">Date Départ</th>
                        <th class="px-4 py-2">Date de Progression</th>
                        
                    </tr>
                </thead>
                <tbody id="tbody">
                    <tr class="bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
                        <td class="border px-4 py-2 text-purple-600 font-bold">Cargaison Aérienne</td>
                        <td class="border px-4 py-2 text-gray-600">Alimentaire, Fragile</td>
                        <td class="border px-4 py-2">
                            <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full">Aérien</span>
                            <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full">En
                                cours</span>
                        </td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">18/10/2024</td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">21/01/2024</td>
                        <td class="border px-4 py-2">
                            <span
                                class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Ouvert</span>
                        </td>
                        <td class="border px-4 py-2">
                            <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full">En
                                attente</span>
                        </td>
                        <td class="border px-4 py-2">
                            <div class="w-full bg-gray-200 rounded-full h-10 relative">
                                <div class="bg-purple-600 h-10 rounded-full flex justify-center items-center"
                                    style="width: 80%">
                                    <span class="font-bold text-center text-white">80%</span>
                                </div>
                            </div>
                        </td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">18/10/2024</td>
                        <td class="border px-4 py-2 text-purple-600 font-bold">21/01/2024</td>
                    </tr>
                    <!-- Ajouter d'autres éléments de tableau ici -->
                </tbody>
            </table>

            <!-- Ajouter d'autres éléments de liste ici -->
        </div>
        
    </div>
</nav>

