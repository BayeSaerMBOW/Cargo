class ChampsRequiseRegle {
    constructor(message = "Le champ est requis") {
        this.message = message;
    }
    valider(value) {
        return typeof value === 'string' && value.trim().length > 0;
    }
    getMessage() {
        return this.message;
    }
}
class RegleNonNumerique {
    constructor(message = "Le champ ne doit pas contenir uniquement des chiffres.") {
        this.message = message;
    }
    getMessage() {
        return this.message;
    }
    valider(value) {
        return typeof value === 'string' && !/^\d+$/.test(value);
    }
}
class RefleLongueurMin {
    constructor(longueurMin, message = "Ce champ est trop court") {
        this.longueurMin = longueurMin;
        this.message = message;
    }
    getMessage() {
        return this.message;
    }
    valider(value) {
        return typeof value === 'string' && value.length >= this.longueurMin;
    }
}
class RefleLongueurMax {
    constructor(longueurMax, message = "Ce champ est trop long") {
        this.longueurMax = longueurMax;
        this.message = message;
    }
    getMessage() {
        return this.message;
    }
    valider(value) {
        return typeof value === 'string' && value.length <= this.longueurMax;
    }
}
class ReglePoids {
    constructor(min, max, message) {
        this.min = min;
        this.max = max;
        this.message = message || `Le poids doit être entre ${min}kg et ${max}kg.`;
    }
    getMessage() {
        return this.message;
    }
    valider(value) {
        const poids = parseFloat(value);
        if (isNaN(poids)) {
            return false;
        }
        return poids >= this.min && poids <= this.max;
    }
}
class RegleNombre {
    constructor(message = "Le champ doit contenir uniquement des chiffres.") {
        this.message = message;
    }
    getMessage() {
        return this.message;
    }
    valider(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
}
class RegleSelect {
    constructor(message = "Veuillez sélectionner une option valide.") {
        this.message = message;
    }
    getMessage() {
        return this.message;
    }
    valider(value) {
        return value !== "default";
    }
}
class Validateur {
    constructor(selector) {
        this.regles = new Map();
        this.erreurs = {};
        this.form = document.querySelector(selector);
        if (!this.form) {
            throw new Error("Le formulaire spécifié n'a pas été trouvé.");
        }
        const boutons = this.form.querySelectorAll('button');
        this.boutonValider = boutons[boutons.length - 1];
        if (!this.boutonValider) {
            throw new Error("Le dernier bouton dans le formulaire n'a pas été trouvé.");
        }
        this.attacherEvenementsFormulaire();
        this.attacherEvenementBouton();
    }
    attacherEvenementsFormulaire() {
        this.form.querySelectorAll('input, select').forEach(input => {
            this.attacherEvenementChamp(input);
        });
    }
    attacherEvenementChamp(input) {
        input.addEventListener('input', () => {
            this.verifierChamp(input);
        });
    }
    attacherEvenementBouton() {
        this.boutonValider.addEventListener('click', (e) => {
            e.preventDefault();
            const validationResult = this.validerEtTraiterFormulaire();
            if (validationResult.isValid) {
                console.log('Données valides:', validationResult.data);
            }
            else {
                console.log('Des erreurs sont détectées, veuillez les corriger.');
            }
        });
    }
    validerEtTraiterFormulaire() {
        const data = this.traiterFormulaire();
        const isValid = this.verifierFormulaireComplet();
        return { isValid, data: isValid ? data : undefined };
    }
    traiterFormulaire() {
        const formData = new FormData(this.form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        // Inclure les champs readonly explicitement
        this.form.querySelectorAll('input[readonly]').forEach(input => {
            if (input instanceof HTMLInputElement) {
                data[input.id] = input.value;
            }
        });
        return data;
    }
    verifierFormulaireComplet() {
        this.form.querySelectorAll('input, select').forEach(input => {
            this.verifierChamp(input);
        });
        return Object.keys(this.erreurs).length === 0;
    }
    ajouterRegle(nomInput, ...regles) {
        if (!this.regles.has(nomInput)) {
            this.regles.set(nomInput, []);
        }
        this.regles.get(nomInput).push(...regles);
    }
    verifierChamp(input) {
        const champErreurs = this.valider({ [input.id]: input.value });
        const errorElement = document.getElementById(`error-${input.id}`);
        if (champErreurs[input.id]) {
            this.erreurs[input.id] = champErreurs[input.id];
            if (errorElement) {
                errorElement.innerText = champErreurs[input.id][0];
            }
        }
        else {
            delete this.erreurs[input.id];
            if (errorElement) {
                errorElement.innerText = '';
            }
        }
        this.mettreAjourEtatButton();
    }
    valider(data) {
        let erreurs = {};
        for (let key in data) {
            let regles = this.regles.get(key);
            let champErreurs = [];
            regles === null || regles === void 0 ? void 0 : regles.forEach(regle => {
                if (!regle.valider(data[key])) {
                    champErreurs.push(regle.getMessage());
                }
            });
            if (champErreurs.length > 0) {
                erreurs[key] = champErreurs;
            }
        }
        return erreurs;
    }
    mettreAjourEtatButton() {
        this.boutonValider.textContent = Object.keys(this.erreurs).length > 0 ? 'Corriger les erreurs' : 'Valider';
    }
}
// Export des classes et des règles
export { Validateur, ChampsRequiseRegle, ReglePoids, RegleSelect, RefleLongueurMin, RefleLongueurMax, RegleNonNumerique, RegleNombre };
