</main>
<footer class="w-full h-16 bg-white flex justify-center items-center">
    <h2 class="text-blue-600 text-3xl">®MBOW NGALLA</h2>
</footer>
</div>
</div>

<style>
#cargaisonForm {
            max-width: 600px;
            margin: 0 auto;
        }

        .mb-4, .mb-2 {
            margin-bottom: 16px;
        }

        label {
            font-weight: bold;
        }

        input, select, button {
            width: 100%;
            padding: 10px;
            /* border: 1px solid #ccc; */
            border-radius: 4px;
        }

        button {
           /*  background-color: #007bff; */
            /* color: white; */
            cursor: pointer;
        }

        button:hover {
          /*   background-color: #0056b3; */
        }

        #mapContainer {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            align-items: center;
            justify-content: center;
        }

        #map {
            height: 400px;
            width: 80%;
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 4px;
            background: white;
        }
    </style>

<!-- Popup Form -->
<div class="overlay" id="overlay"></div>
<div class="popup-form" id="popupForm">
    <h3 class="text-3xl text-blue-600 font-bold mb-6">Détails de la Cargaison</h3>
    <form id="cargaisonForm">
                    <div class="mb-4">
                        <label class="block text-black mb-2">Libellé</label>
                        <input type="text" name="numero" class="w-full p-2 border rounded-md" />
                    </div>
                    <div class="mb-2">
            <label class="block text-black mb-2">Lieu de Départ</label>
            <input type="text" name="lieuDepart" class="w-full p-2 border rounded-md" readonly />
            <button type="button" id="selectDepart" class="w-full bg-blue-500 text-white p-2 rounded-lg mt-2">Sélectionner sur la carte</button>
        </div>
        <div class="mb-2">
            <label class="block text-black mb-2">Lieu d'Arrivée</label>
            <input type="text" name="lieuArrivee" class="w-full p-2 border rounded-md" readonly />
            <button type="button" id="selectArrivee" class="w-full bg-blue-500 text-white p-2 rounded-lg mt-2">Sélectionner sur la carte</button>
        </div>
        <div class="mb-2">
            <label class="block text-black mb-2">Distance (en Km)</label>
            <input type="number" name="distance" class="w-full p-2 border rounded-md" />
        </div>
        <div id="map"  style="display:none;"></div>
                    <div class="mb-2">
                        <label class="block text-black mb-2">Type de Cargaison</label>
                        <select name="typeCargaison" id="typeCargaison" class="w-full p-2 border rounded-md">
                            <option value="Maritime">Maritime</option>
                            <option value="Aérienne">Aérienne</option>
                            <option value="Routière">Routière</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label class="block text-black mb-2">État d'Avancement</label>
                        <select name="etatAvancement" class="w-full p-2 border rounded-md">
                           <!--  <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option> -->
                            <option value="En attente">En attente</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label class="block text-black mb-2">État Global</label>
                        <select name="etatGlobal" class="w-full p-2 border rounded-md">
                           <!--  <option value="Fermé">Fermé</option> -->
                            <option value="Ouvert">Ouvert</option>
                        </select>
                    </div>
                    <div class="mb-2">
            <label class="block text-black mb-2">date de Départ</label>
            <input type="date" name="DateDepart" class="w-full p-2 border rounded-md"  />
            
        </div>
        <div class="mb-2">
            <label class="block text-black mb-2">date d'Arrivée</label>
            <input type="date" name="DateArrivee" class="w-full p-2 border rounded-md"  />
            
        </div>
                    <div class="col-span-2">
                        <button id="Enregistrer" class="w-full bg-blue-500 text-white p-2 rounded-lg">Enregistrer</button>
                    </div>
                </form>
</div>


<!-- Popup Form -->
<div class="overlaye" id="hover"></div>
<div class="popup-forme" id="popupForme">
    <div class="flex justify-between items-center">
    <h3 id="form-title" class="text-3xl font-bold mb-6">Ajouter produits</h3>
    <button id="closeFormButton" class="bg-red-500 text-white p-2 rounded-full self-end">
        <i class="fa-solid fa-times"></i>
    </button>
    </div>
    <form id="produits-form" action="#">
        <div class="mb-4">
            <label for="produits-type-select" class="block text-blue-700">Choisie Cargaisons disponible</label>
            <select id="produits-type-select" class="w-full p-2 border rounded-md">
            </select>
        </div>
        <div class="mb-4">
            <label for="type-produit" class="block text-blue-700">Type de produits</label>
            <select id="type-produit" class="w-full p-2 border rounded-md" aria-placeholder="choisissez une produits">
                <option value="alimentaire">Alimentaire</option>
                <option value="materielle">Materielles</option>
                <option value="chimique">Chimique</option>
            </select>
        </div>
        <div id="form-discount-container" class="mb-4">
            <label id="form-toxicity-label" class="block text-blue-700">Pourcentage de réduction</label>
            <input id="form-toxicity-input" type="number" min="1" max="100" class="w-full p-2 border rounded-md" />
        </div>
        <div id="form-toxicity-container" class="mb-4 hidden">
            <label id="form-discount-label" class="block text-blue-700">Taux de toxicite</label>
            <input id="form-discount-input" type="number" min="1" max="10" class="w-full p-2 border rounded-md" />
        </div>
        <div class="mb-4 hidden" id="materiel">
            <label for="type-materiel" class="block text-blue-700">Type de produits</label>
            <select id="type-materiel" class="w-full p-2 border rounded-md" aria-placeholder="choisissez une produits">
                <option value="fragile">Fragile</option>
                <option value="incassable">Incassable</option>
            </select>
        </div>
        <div id="form-validity-container" class="mb-4">
            <label id="form-validity-label" class="block text-blue-700">Validité (jours)</label>
            <input id="form-validity-input" type="number" min="1" max="365" class="w-full p-2 border rounded-md" />
        </div>
        <div id="form-submit-container" class="mt-6">
            <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md">Ajouter produits</button>
        </div>
    </form>
</div>

<script type="module" src="./dist/test.js"></script>

<script>
    // partie produits 

    document.getElementById('type-produit').addEventListener('change', function () {
        const toxiciteField = document.getElementById('form-toxicity-container');
        if (this.value === 'chimique') {
            toxiciteField.style.display = 'block';
        } else {
            toxiciteField.style.display = 'none';
        }
    });
    document.getElementById('type-produit').addEventListener('change', function () {
        const materielField = document.getElementById('materiel');
        if (this.value === 'materielle') {
            materielField.style.display = 'block';
        } else {
            materielField.style.display = 'none';
        }
    });

    document.getElementById('sidebarToggle').addEventListener('click', function () {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('w-20')) {
            sidebar.classList.remove('w-20');
            sidebar.classList.add('w-80');
        } else {
            sidebar.classList.remove('w-80');
            sidebar.classList.add('w-20');
        }
    });

    document.getElementById('openFormButton').addEventListener('click', function () {
        document.getElementById('hover').style.display = 'block';
        document.getElementById('popupForme').style.display = 'block';
    });

    document.getElementById('closeFormButton').addEventListener('click', function () {
        document.getElementById('hover').style.display = 'none';
        document.getElementById('popupForme').style.display = 'none';
    });

    document.getElementById('hover').addEventListener('click', function () {
        document.getElementById('popupForme').style.display = 'none';
        document.getElementById('hover').style.display = 'none';
    });

    document.getElementById('type-produit').addEventListener('change', function () {
        const toxiciteField = document.getElementById('form-toxicity-container');
        if (this.value === 'chimique') {
            toxiciteField.style.display = 'block';
        } else {
            toxiciteField.style.display = 'none';
        }
    });
    document.getElementById('type-produit').addEventListener('change', function () {
        const materielField = document.getElementById('materiel');
        if (this.value === 'materielle') {
            materielField.style.display = 'block';
        } else {
            materielField.style.display = 'none';
        }
    });
</script>
<script>
    // partie cargaisons
    document.getElementById('search-button')?.addEventListener('click', function () {
        document.getElementById('popupForm').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    });

    document.getElementById('overlay').addEventListener('click', function () {
        document.getElementById('popupForm').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    document.getElementById('toggleViewBtn')?.addEventListener('click', function () {
        document.getElementById('cards-view').classList.toggle('hidden');
        document.getElementById('list-view').classList.toggle('hidden');
        document.getElementById('toggleViewIcon').classList.toggle('fa-list');
        document.getElementById('toggleViewIcon').classList.toggle('fa-th');
    });

</script> 
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", () => {
        const map = L.map('map').setView([0, 0], 2); // Default to Dakar, Senegal
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        let startPoint = null;
        let endPoint = null;

        document.getElementById('selectDepart').addEventListener('click', () => {
            document.getElementById('map').style.display = 'block';
        });

        document.getElementById('selectArrivee').addEventListener('click', () => {
            document.getElementById('map').style.display = 'block';
        });

        map.on('click', async function (e) {
            const latlng = e.latlng;
            const locationName = await getCityName(latlng.lat, latlng.lng);

            if (!startPoint) {
                startPoint = latlng;
                document.querySelector(`input[name=lieuDepart]`).value = `${locationName} (${latlng.lat}, ${latlng.lng})`;
            } else if (!endPoint) {
                endPoint = latlng;
                document.querySelector(`input[name=lieuArrivee]`).value = `${locationName} (${latlng.lat}, ${latlng.lng})`;

                // Calculate distance and update distance input
                const distance = calculateDistance(startPoint, endPoint);
                document.querySelector(`input[name=distance]`).value = distance;

                // Reset startPoint and endPoint for next calculation
                startPoint = null;
                endPoint = null;

                // Hide map after selecting both points
                document.getElementById('map').style.display = 'none';
            }
        });

        async function getCityName(lat, lng) {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            return data.address.city || data.address.town || data.address.village || 'Lieu inconnu';
        }

        function calculateDistance(start, end) {
            const distance = L.latLng(start).distanceTo(L.latLng(end)) / 1000; // Convert to km
            return distance.toFixed(2);
        }
    });
</script>
