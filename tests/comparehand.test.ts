import { describe, expect, it } from "vitest";
import { HandName } from "../src/poker/poker";
import { theBestHandIs } from "../src/poker/poker";


const famille_P = {
    name : "P"
}

const famille_C = {
    name : "C"
}

const carte_9 = {
    name : "9",
    importance : 0
}

const carte_T = {
    name : "T",
    importance : 1
}

const carte_J = {
    name : "J",
    importance : 2
}

const carte_Q = {
    name : "Q",
    importance : 3
}

const carte_K = {
    name : "K",
    importance : 4
}

const carte_A = {
    name : "A",
    importance : 5
}


const main1 = { //Suite-Flush
    carte1 : [carte_9, famille_C],
    carte2 : [carte_T, famille_C],
    carte3 : [carte_J, famille_C]
}

const main1b = { //Suite-Flush (Plus forte)
    carte1 : [carte_Q, famille_C],
    carte2 : [carte_K, famille_C],
    carte3 : [carte_A, famille_C]
}

const main1c = { //Suite-Flush (Égalité)
    carte1 : [carte_9, famille_P],
    carte2 : [carte_T, famille_P],
    carte3 : [carte_J, famille_P]
}


const main2 = { //Suite
    carte1 : [carte_J, famille_C],
    carte2 : [carte_Q, famille_P],
    carte3 : [carte_K, famille_C]
}

const main2b = { //Suite (Plus forte)
    carte1 : [carte_Q, famille_C],
    carte2 : [carte_K, famille_P],
    carte3 : [carte_A, famille_C]
}

const main2c = { //Suite (Égalité)
    carte1 : [carte_J, famille_P],
    carte2 : [carte_Q, famille_C],
    carte3 : [carte_K, famille_P]
}


const main3 = { //Flush
    carte1 : [carte_9, famille_C],
    carte2 : [carte_K, famille_C],
    carte3 : [carte_J, famille_C]
}

const main3b = { //Flush (Plus forte)
    carte1 : [carte_9, famille_C],
    carte2 : [carte_A, famille_C],
    carte3 : [carte_J, famille_C]
}

const main3c = { //Flush (Égalité)
    carte1 : [carte_9, famille_P],
    carte2 : [carte_K, famille_P],
    carte3 : [carte_J, famille_P]
}


const main4 = { //Paire
    carte1 : [carte_9, famille_C],
    carte2 : [carte_9, famille_P],
    carte3 : [carte_K, famille_C]
}

const main4b = { //Paire (Plus forte)
    carte1 : [carte_T, famille_C],
    carte2 : [carte_T, famille_P],
    carte3 : [carte_A, famille_C]
}

const main4c = { //Paire (Égalité)
    carte1 : [carte_T, famille_C],
    carte2 : [carte_T, famille_P],
    carte3 : [carte_K, famille_P]
}


const main5 = { //Carte haute
    carte1 : [carte_9, famille_C],
    carte2 : [carte_T, famille_P],
    carte3 : [carte_K, famille_C]
}

const nameMain1 = HandName(main1);
const nameMain1b = HandName(main1b);
const nameMain1c = HandName(main1c);

const nameMain2 = HandName(main2);
const nameMain2b = HandName(main2b);
const nameMain2c = HandName(main2c);

const nameMain3 = HandName(main3);
const nameMain3b = HandName(main3b);
const nameMain3c = HandName(main3c);

const nameMain4 = HandName(main4);
const nameMain4b = HandName(main4b);
const nameMain4c = HandName(main4c);

const nameMain5 = HandName(main5);


describe('test Suite-Flush', () => {
    it('la main 1 : ' + nameMain1 + ' est meilleure que la main 2 : ' + nameMain2, () =>{
        expect(theBestHandIs(nameMain1, nameMain2, main1, main2)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain1 + ' est meilleure que la main 2 : ' + nameMain3, () =>{
        expect(theBestHandIs(nameMain1, nameMain3, main1, main3)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain1 + ' est meilleure que la main 2 : ' + nameMain4, () =>{
        expect(theBestHandIs(nameMain1, nameMain4, main1, main4)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain1 + ' est meilleure que la main 2 : ' + nameMain5, () =>{
        expect(theBestHandIs(nameMain1, nameMain5, main1, main5)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain1b + ' est meilleure que la main 2 : ' + nameMain1, () =>{
        expect(theBestHandIs(nameMain1b, nameMain1, main1b, main1)).toBe("main1")
    }) 
})


describe('test Suite', () => {
    it('la main 1 : ' + nameMain2 + ' est moins forte que la main 2 : ' + nameMain2, () =>{
        expect(theBestHandIs(nameMain2, nameMain1, main2, main1)).toBe("main2")
    }) 

    it('la main 1 : ' + nameMain2 + ' est meilleure que la main 2 : ' + nameMain3, () =>{
        expect(theBestHandIs(nameMain2, nameMain3, main2, main3)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain2 + ' est meilleure que la main 2 : ' + nameMain4, () =>{
        expect(theBestHandIs(nameMain2, nameMain4, main2, main4)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain2 + ' est meilleure que la main 2 : ' + nameMain5, () =>{
        expect(theBestHandIs(nameMain2, nameMain5, main2, main5)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain2 + ' est moins forte que la main 2 : ' + nameMain2b, () =>{
        expect(theBestHandIs(nameMain2, nameMain2b, main2, main2b)).toBe("main2")
    }) 
})

describe('test Flush', () => {
    it('la main 1 : ' + nameMain3 + ' est moins forte que la main 2 : ' + nameMain2, () =>{
        expect(theBestHandIs(nameMain3, nameMain2, main3, main2)).toBe("main2")
    }) 

    it('la main 1 : ' + nameMain1 + ' est meilleure que la main 2 : ' + nameMain3, () =>{
        expect(theBestHandIs(nameMain1, nameMain3, main1, main3)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain3 + ' est meilleure que la main 2 : ' + nameMain4, () =>{
        expect(theBestHandIs(nameMain1, nameMain4, main3, main4)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain3 + ' est meilleure que la main 2 : ' + nameMain5, () =>{
        expect(theBestHandIs(nameMain1, nameMain5, main3, main5)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain3 + ' est moins forte que la main 2 : ' + nameMain3b, () =>{
        expect(theBestHandIs(nameMain3, nameMain3b, main3, main3b)).toBe("main2")
    }) 
})

describe('test Paire', () => {
    it('la main 1 : ' + nameMain4 + ' est moins forte que la main 2 : ' + nameMain2, () =>{
        expect(theBestHandIs(nameMain4, nameMain2, main4, main2)).toBe("main2")
    }) 

    it('la main 1 : ' + nameMain4 + ' est moins forte la main 2 : ' + nameMain3, () =>{
        expect(theBestHandIs(nameMain4, nameMain3, main4, main3)).toBe("main2")
    }) 

    it('la main 1 : ' + nameMain4 + ' est moins forte la main 2 : ' + nameMain4b, () =>{
        expect(theBestHandIs(nameMain4, nameMain4b, main4, main4b)).toBe("main2")
    }) 

    it('la main 1 : ' + nameMain4 + ' est meilleure que la main 2 : ' + nameMain5, () =>{
        expect(theBestHandIs(nameMain4, nameMain5, main4, main5)).toBe("main1")
    }) 

    it('la main 1 : ' + nameMain4 + ' est moins forte la main 2 : ' + nameMain1, () =>{
        expect(theBestHandIs(nameMain4, nameMain1, main4, main1)).toBe("main2")
    }) 
})

describe('test Égalité', () => {
    it('la main 1 : ' + nameMain1 + ' est égale à la main 2 : ' + nameMain1c, () =>{
        expect(theBestHandIs(nameMain1, nameMain1c, main1, main1c)).toBe("égalité")
    }) 

    it('la main 1 : ' + nameMain2 + ' est égale à la main 2 : ' + nameMain2c, () =>{
        expect(theBestHandIs(nameMain2, nameMain2c, main2, main2c)).toBe("égalité")
    }) 

    it('la main 1 : ' + nameMain3 + ' est égale à la main 2 : ' + nameMain3c, () =>{
        expect(theBestHandIs(nameMain3, nameMain3c, main3, main3c)).toBe("égalité")
    }) 

    it('la main 1 : ' + nameMain4 + ' est égale à la main 2 : ' + nameMain4c, () =>{
        expect(theBestHandIs(nameMain4, nameMain4c, main4, main4c)).toBe("égalité")
    }) 
})
