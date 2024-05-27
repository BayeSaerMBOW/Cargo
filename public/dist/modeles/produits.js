"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incassable = exports.Fragile = exports.Chimique = exports.Alimentaire = void 0;
class Alimentaire {
    constructor(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
    info() {
        console.log(`Le poids de ${this.libelle} est de ${this.poids} kg`);
    }
}
exports.Alimentaire = Alimentaire;
class Chimique {
    constructor(libelle, poids, toxicite) {
        this.libelle = libelle;
        this.poids = poids;
        this.toxicite = toxicite;
    }
    info() {
        console.log(`Le poids de ${this.libelle} est de ${this.poids} kg avec une toxicité de ${this.toxicite}`);
    }
}
exports.Chimique = Chimique;
class Fragile {
    constructor(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
    info() {
        console.log(`Le poids de ${this.libelle} est de ${this.poids} kg`);
    }
}
exports.Fragile = Fragile;
class Incassable {
    constructor(libelle, poids) {
        this.libelle = libelle;
        this.poids = poids;
    }
    info() {
        console.log(`Le poids de ${this.libelle} est de ${this.poids} kg`);
    }
}
exports.Incassable = Incassable;
