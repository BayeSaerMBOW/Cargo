<nav class="h-full w-full">
    <div id="content-wrapper" class="w-full h-full">
        <div id="produits-container" class="w-full mx-auto">
            <div id="produits-header" class="flex justify-between items-center">
                <div id="produits-title-container" class="flex items-center h-20">
                    <span id="produits-title" class="text-2xl font-bold text-blue-700">Ajouter Produits</span>
                </div>
                <button id="openFormButton" class="px-4 py-2 bg-blue-700 text-white rounded-md">Ajouter produits</button>
            </div>
            <div id="produits-grid"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 w-full">
                <div id="produits-item-1" class="card bg-blue-300 p-4 rounded-lg border-2 border-blue-500">
                    <div id="produits-item-1-header" class="flex justify-between items-center mb-4">
                        <span id="produits-item-1-title" class="text-lg font-semibold text-blue-600">Produits
                            Aérienne</span>
                        <span id="produits-item-1-discount"
                            class="text-sm bg-red-200 text-red-600 px-2 py-1 rounded-md">-20%</span>
                    </div>
                    <div id="produits-item-1-image-container"
                        class="w-full h-44 mb-4 border border-solid border-black rounded-2xl">
                        <img id="produits-item-1-image" src="Sans titre.jpeg"
                            class="rounded-2xl w-full h-full object-cover" alt="produits">
                    </div>
                    <div id="produits-item-1-details" class="flex justify-between items-center mb-4">
                        <span id="produits-item-1-category"
                            class="text-sm bg-blue-200 text-blue-600 px-2 py-1 rounded-md">Aérien</span>
                        <span id="produits-item-1-validity" class="text-lg font-semibold text-blue-600">Validité:
                            30 jours</span>
                    </div>
                    <div id="produits-item-1-footer" class="mt-4">
                        <div id="produits-item-1-price-container" class="flex justify-between">
                            <p id="produits-item-1-price-label" class="text-lg">Prix original: </p>
                            <span id="produits-item-1-price-value" class="text-blue-600 font-bold">50.000 F
                                cfa</span>
                        </div>
                        <div id="produits-item-1-discounted-price-container" class="flex justify-between mt-2">
                            <p id="produits-item-1-discounted-price-label" class="text-lg">Prix Total: </p>
                            <span id="produits-item-1-discounted-price-value" class="text-red-600 font-bold">40.000
                                F cfa</span>
                        </div>
                    </div>
                    <button id="produits-item-1-button"
                        class="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md">Appliquer</button>
                </div>
                <!-- Ajouter d'autres produits ici, en suivant la même structure -->
            </div>
        </div>
    </div>
</nav>