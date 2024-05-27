export class Produit {
    constructor(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
    calculerPrix() {
        // Implémentation spécifique pour chaque type de produit
        return 0;
    }
    info() {
        return `Libelle: ${this.libelle}, Poids: ${this.poids}`;
    }
}
export class ProduitAlimentaire extends Produit {
    calculerPrix() {
        return this.poids * 100;
    }
}
export class ProduitChimique extends Produit {
    constructor(libelle, poids, degToxicite) {
        super(libelle, poids);
        this.degToxicite = degToxicite;
    }
    calculerPrix() {
        return this.poids * 300;
    }
    info() {
        return `${super.info()}, Degré de toxicité: ${this.degToxicite}`;
    }
}
export class ProduitMateriel extends Produit {
    constructor(libelle, poids, typeMateriel) {
        super(libelle, poids);
        this.typeMateriel = typeMateriel;
    }
    calculerPrix() {
        return this.poids * 200;
    }
    info() {
        return `${super.info()}, Type de matériel: ${this.typeMateriel}`;
    }
}
export class Cargaison {
    constructor(numero, poidsMax, trajet, distance, type) {
        this.produits = [];
        this.numero = numero;
        this.poidsMax = poidsMax;
        this.trajet = trajet;
        this.distance = distance;
        this.type = type;
        this.prixTotal = 0;
        this.etatAvancement = 'En attente';
        this.etatGlobal = 'Ouvert';
    }
    get getprixTotal() {
        return this.prixTotal;
    }
    get getProduits() {
        return this.produits;
    }
    ajouterProduit(produit) {
        if (this.produits.length < 10 && this.etatGlobal === 'Ouvert') {
            this.produits.push(produit);
            this.prixTotal += produit.calculerPrix();
        }
        else {
            console.log("Impossible d'ajouter le produit. Cargaison pleine ou fermée.");
        }
    }
    fermerCargaison() {
        this.etatGlobal = 'Fermé';
    }
    reouvrirCargaison() {
        if (this.etatAvancement === 'En attente') {
            this.etatGlobal = 'Ouvert';
        }
        else {
            console.log("Impossible de réouvrir la cargaison.");
        }
    }
}
export class CargaisonAerienne extends Cargaison {
    constructor(numero, poidsMax, trajet, distance) {
        super(numero, poidsMax, trajet, distance, 'Aerienne');
    }
}
export class CargaisonMaritime extends Cargaison {
    constructor(numero, poidsMax, trajet, distance) {
        super(numero, poidsMax, trajet, distance, 'Maritime');
    }
}
export class CargaisonRoutiere extends Cargaison {
    constructor(numero, poidsMax, trajet, distance) {
        super(numero, poidsMax, trajet, distance, 'Routiere');
    }
}
