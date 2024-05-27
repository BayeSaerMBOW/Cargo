export class Produit {
    protected libelle: string;
    protected poids: number;

    constructor(libelle: string, poids: number) {
        this.libelle = libelle;
        this.poids = poids;
    }

    calculerPrix(): number {
        // Implémentation spécifique pour chaque type de produit
        return 0;
    }



    info(): string {
        return `Libelle: ${this.libelle}, Poids: ${this.poids}`;
    }
}

export class ProduitAlimentaire extends Produit {
    calculerPrix(): number {
        return this.poids * 100;
    }
}

export class ProduitChimique extends Produit {
    private degToxicite: string;

    constructor(libelle: string, poids: number, degToxicite: string) {
        super(libelle, poids);
        this.degToxicite = degToxicite;
    }

    calculerPrix(): number {
        return this.poids * 300;
    }

    info(): string {
        return `${super.info()}, Degré de toxicité: ${this.degToxicite}`;
    }
}

export class ProduitMateriel extends Produit {
    private typeMateriel: string;

    constructor(libelle: string, poids: number, typeMateriel: string) {
        super(libelle, poids);
        this.typeMateriel = typeMateriel;
    }

    calculerPrix(): number {
        return this.poids * 200;
    }

    info(): string {
        return `${super.info()}, Type de matériel: ${this.typeMateriel}`;
    }
}

export class Cargaison {
    protected numero: string;
    protected poidsMax: number;
    protected produits: Produit[] = [];
    protected prixTotal: number;
    protected trajet: string;
    protected distance: number;
    protected type: string;
    protected etatAvancement: string;
    protected etatGlobal: string;

    constructor(numero: string, poidsMax: number, trajet: string, distance: number, type: string) {
        this.numero = numero;
        this.poidsMax = poidsMax;
        this.trajet = trajet;
        this.distance = distance;
        this.type = type;
        this.prixTotal = 0;
        this.etatAvancement = 'En attente';
        this.etatGlobal = 'Ouvert';
    }
    get getprixTotal(): number {
        return this.prixTotal;
    }
    get getProduits(): Produit[] {
        return this.produits;
    }

    ajouterProduit(produit: Produit): void {
        if (this.produits.length < 10 && this.etatGlobal === 'Ouvert') {
            this.produits.push(produit);
            this.prixTotal += produit.calculerPrix();
        } else {
            console.log("Impossible d'ajouter le produit. Cargaison pleine ou fermée.");
        }
    }

    fermerCargaison(): void {
        this.etatGlobal = 'Fermé';
    }

    reouvrirCargaison(): void {
        if (this.etatAvancement === 'En attente') {
            this.etatGlobal = 'Ouvert';
        } else {
            console.log("Impossible de réouvrir la cargaison.");
        }
    }

    // Méthodes supplémentaires : calculerFrais, sommetotaleC, nbProduit, etc.
}

export class CargaisonAerienne extends Cargaison {
    constructor(numero: string, poidsMax: number, trajet: string, distance: number) {
        super(numero, poidsMax, trajet, distance, 'Aerienne');
    }
}

export class CargaisonMaritime extends Cargaison {
    constructor(numero: string, poidsMax: number, trajet: string, distance: number) {
        super(numero, poidsMax, trajet, distance, 'Maritime');
    }
}

export class CargaisonRoutiere extends Cargaison {
    constructor(numero: string, poidsMax: number, trajet: string, distance: number) {
        super(numero, poidsMax, trajet, distance, 'Routiere');
    }
}

