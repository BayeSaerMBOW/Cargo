interface IRegleValidation {
    valider(value: any): boolean;

    getMessage(): string;
}

class ChampsRequiseRegle implements IRegleValidation {
    private message: string;

    constructor(message: string = "Le champ est requis") {
        this.message = message;
    }

    valider(value: any): boolean {
        return typeof value === 'string' && value.trim().length > 0;
    }

    getMessage(): string {
        return this.message;
    }
}

class RegleNonNumerique implements IRegleValidation {
    private message: string;

    constructor(message: string = "Le champ ne doit pas contenir uniquement des chiffres.") {
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    valider(value: any): boolean {
        return typeof value === 'string' && !/^\d+$/.test(value);
    }
}

class RefleLongueurMin implements IRegleValidation {
    private longueurMin: number;
    private message: string;

    constructor(longueurMin: number, message: string = "Ce champ est trop court") {
        this.longueurMin = longueurMin;
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    valider(value: any): boolean {
        return typeof value === 'string' && value.length >= this.longueurMin;
    }
}

class RefleLongueurMax implements IRegleValidation {
    private longueurMax: number;
    private message: string;

    constructor(longueurMax: number, message: string = "Ce champ est trop long") {
        this.longueurMax = longueurMax;
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    valider(value: any): boolean {
        return typeof value === 'string' && value.length <= this.longueurMax;
    }
}

class ReglePoids implements IRegleValidation {
    private min: number;
    private max: number;
    private message: string;

    constructor(min: number, max: number, message?: string) {
        this.min = min;
        this.max = max;
        this.message = message || `Le poids doit être entre ${min}kg et ${max}kg.`;
    }

    getMessage(): string {
        return this.message;
    }

    valider(value: any): boolean {
        const poids = parseFloat(value);
        if (isNaN(poids)) {
            return false;
        }
        return poids >= this.min && poids <= this.max;
    }
}

class RegleNombre implements IRegleValidation {
    private message: string;

    constructor(message: string = "Le champ doit contenir uniquement des chiffres.") {
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    valider(value: any): boolean {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
}

class RegleSelect implements IRegleValidation {
    private message: string;

    constructor(message: string = "Veuillez sélectionner une option valide.") {
        this.message = message;
    }

    getMessage(): string {
        return this.message;
    }

    valider(value: any): boolean {
        return value !== "default";
    }
}


class Validateur {
    private form: HTMLFormElement;
    private boutonValider: HTMLButtonElement;
    private regles: Map<string, IRegleValidation[]> = new Map();
    private erreurs: { [key: string]: string[] } = {};

    constructor(selector: string) {
        this.form = document.querySelector(selector) as HTMLFormElement;
        if (!this.form) {
            throw new Error("Le formulaire spécifié n'a pas été trouvé.");
        }
        const boutons = this.form.querySelectorAll('button');
        this.boutonValider = boutons[boutons.length - 1] as HTMLButtonElement;
        if (!this.boutonValider) {
            throw new Error("Le dernier bouton dans le formulaire n'a pas été trouvé.");
        }
        
        this.attacherEvenementsFormulaire();
        this.attacherEvenementBouton();
    }

    private attacherEvenementsFormulaire(): void {
        this.form.querySelectorAll('input, select').forEach(input => {
            this.attacherEvenementChamp(input as HTMLInputElement | HTMLSelectElement);
        });
    }

    private attacherEvenementChamp(input: HTMLInputElement | HTMLSelectElement): void {
        input.addEventListener('input', () => {
            this.verifierChamp(input);
        });
    }

    private attacherEvenementBouton(): void {
        this.boutonValider.addEventListener('click', (e) => {
            e.preventDefault();
            const validationResult = this.validerEtTraiterFormulaire();
            if (validationResult.isValid) {
                console.log('Données valides:', validationResult.data);
            } else {
                console.log('Des erreurs sont détectées, veuillez les corriger.');
            }
        });
    }

    public validerEtTraiterFormulaire(): { isValid: boolean, data?: { [key: string]: any } } {
        const data = this.traiterFormulaire();
        const isValid = this.verifierFormulaireComplet();
        return { isValid, data: isValid ? data : undefined };
    }

    private traiterFormulaire(): { [key: string]: any } {
        const formData = new FormData(this.form);
        const data: { [key: string]: any } = {};
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


    private verifierFormulaireComplet(): boolean {
        this.form.querySelectorAll('input, select').forEach(input => {
            this.verifierChamp(input as HTMLInputElement | HTMLSelectElement);
        });
        return Object.keys(this.erreurs).length === 0;
    }

    public ajouterRegle(nomInput: string, ...regles: IRegleValidation[]) {
        if (!this.regles.has(nomInput)) {
            this.regles.set(nomInput, []);
        }
        this.regles.get(nomInput)!.push(...regles);
    }

    private verifierChamp(input: HTMLInputElement | HTMLSelectElement) {
        const champErreurs = this.valider({[input.id]: input.value});
        const errorElement = document.getElementById(`error-${input.id}`) as HTMLElement;

        if (champErreurs[input.id]) {
            this.erreurs[input.id] = champErreurs[input.id];
            if (errorElement) {
                errorElement.innerText = champErreurs[input.id][0];
            }
        } else {
            delete this.erreurs[input.id];
            if (errorElement) {
                errorElement.innerText = '';
            }
        }

        this.mettreAjourEtatButton();
    }

    private valider(data: { [key: string]: any }): { [key: string]: string[] } {
        let erreurs: { [key: string]: string[] } = {};
        for (let key in data) {
            let regles = this.regles.get(key);
            let champErreurs: string[] = [];
            regles?.forEach(regle => {
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

    private mettreAjourEtatButton() {
        this.boutonValider.textContent = Object.keys(this.erreurs).length > 0 ? 'Corriger les erreurs' : 'Valider';
    }
}

// Export des classes et des règles
export { Validateur, ChampsRequiseRegle, ReglePoids, RegleSelect, RefleLongueurMin, RefleLongueurMax, RegleNonNumerique, RegleNombre };
//!§§§
