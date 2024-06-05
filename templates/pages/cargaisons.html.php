<nav class="h-full w-full  shadow-md p-4">
    <div id="cargaison-header" class="flex justify-center items-center w-full bg-">
        <div id="cargaison-title-container" class="flex items-center h-20 mb-10 w-2/4">
            <h1 id="cargaison-title" class="text-2xl font-bold text-blue-700">Bienvenue "AJouter
                cargaisons"</h1>
        </div>
        <div class="filter-container">
            <input class="filter" type="text" id="searchNumero" placeholder="Numéro de Cargaison">
            <input class="filter" type="text" id="searchType" placeholder="Type de Cargaison">
            <input class="filter" type="text" id="searchDepart" placeholder="Lieu de Départ">
            <input class="filter" type="text" id="searchArrivee" placeholder="Lieu d'Arrivée">
            <input class="filter" type="date" id="searchDateDepart" placeholder="Date de Départ">
            <input class="filter" type="date" id="searchDateArrivee" placeholder="Date d'Arrivée">
            <!--  <button id="filterButton">Filtrer</button> -->
            <style>
                .filter-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                    margin-bottom: 20px;
                }

                .filter-container input[type="text"],
                .filter-container input[type="date"],
                .filter-container select {
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    flex: 1 1 calc(33.333% - 20px);
                    /* Flex-grow, flex-shrink, flex-basis */
                }

                .filter-container button {

                    background-color: #007bff;
                    color: white;
                    padding: 10px 20px;
                    font-size: 16px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    width: 80px;
                    margin-left: 420px;
                }

                .filter-container button:hover {
                    background-color: #0056b3;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                }

                th,
                td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }

                th {
                    background-color: #f4f4f4;
                }

                .table-container {
                    overflow-x: auto;
                }
            </style>
        </div>
    </div>

    <tbody id="tbody"></tbody>
    </table>

    <div class="flex justify-between items-center w-full">
        <div class="flex items-center justify-between w-full">
            <div class="">
                <input type="text" placeholder="search" id="search1" class="pl-10 pr-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500">
                <i class="fa-solid fa-magnifying-glass absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 hidden lg:block"></i>
            </div>
            <div class="flex items-center space-x-4">
                <button id="search-button" class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                    <i class="fa-regular fa-square-plus fa-lg"></i>
                </button>

                <button class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                    <i class="fa-solid fa-gear fa-lg" style="color: #ff0000;"></i>
                </button>
                <button id="toggleViewBtn" class="h-6 cursor-pointer hover:scale-125 transition-transform duration-200 ease-out">
                    <i id="toggleViewIcon" class="fa-solid fa-list fa-lg"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="w-full h-full mt-4" id="cargaison-container">

        <div id="cards-view" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-4">
            <div class="card bg-blue-100 hover:text-blue-500 p-4 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200 ease-out">
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
                        <th class="px-4 py-2">Code</th>
                        <th class="px-4 py-2">Type</th>
                        <th class="px-4 py-2">Distance</th>
                        <th class="px-4 py-2">Lieu Départ</th>
                        <th class="px-4 py-2">Lieu d'arrivée</th>
                        <th class="px-4 py-2">État</th>
                        <th class="px-4 py-2">Étapes</th>
                        <th class="px-4 py-2">Progression</th>
                        <th class="px-4 py-2">Date Départ</th>
                        <th class="px-4 py-2">Date de Progression</th>
                        <th class="px-4 py-2">Action</th>

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
                            <span class="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">Ouvert</span>
                        </td>
                        <td class="border px-4 py-2">
                            <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full">En
                                attente</span>
                        </td>
                        <td class="border px-4 py-2">
                            <div class="w-full bg-gray-200 rounded-full h-10 relative">
                                <div class="bg-purple-600 h-10 rounded-full flex justify-center items-center" style="width: 80%">
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



        <div class="pagination" style="margin-left: 1320px;">
            <a id="prevButton" class="page-link prev">
                <i class="fas fa-angle-left"></i></a>

            <a id="next"><i class="fas fa-angle-right"></i></a>
        </div>

        <!-- MODAL HTML -->
        <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            details cargaison
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-4 md:p-5 space-y-4 w-full " id="detailsModal">
                      
                    </div>
                    <!-- Modal footer -->
                    <!-- <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </div> -->
                </div>
            </div>
        </div>




        <!-- <script>
    // Variable pour stocker les cargaisons
    let cargos = [];
        const pageSize = 4; // Nombre de cargaisons par page
        let currentPage = 1; // Page actuelle

        // Fonction pour charger les cargaisons depuis le fichier JSON
        function loadCargos() {
            fetch('../../public/data.json')
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Erreur lors de la récupération des cargaisons');
                    }
                })
                .then(data => {
                    cargos = data; // Stocker les cargaisons récupérées
                    updateCargos(); // Mettre à jour le tableau des cargaisons
                })
                .catch(error => console.log('Error:', error));
        }
</script> -->