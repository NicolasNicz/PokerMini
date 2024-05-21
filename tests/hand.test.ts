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

const main2 = { //Suite
    carte1 : [carte_J, famille_C],
    carte2 : [carte_Q, famille_P],
    carte3 : [carte_K, famille_C]
}

const main3 = { //Flush
    carte1 : [carte_9, famille_C],
    carte2 : [carte_K, famille_C],
    carte3 : [carte_J, famille_C]
}

const main4 = { //Paire
    carte1 : [carte_9, famille_C],
    carte2 : [carte_9, famille_P],
    carte3 : [carte_K, famille_C]
}

const main5 = { //Carte haute
    carte1 : [carte_9, famille_C],
    carte2 : [carte_T, famille_P],
    carte3 : [carte_K, famille_C]
}


describe('test Suite-Flush', () => {

    it('cette main est une suite-flush ', () =>{
        expect(HandName(main1)).toBe("Suite-Flush")
    }) 

    it('cette main est une suite ', () =>{
        expect(HandName(main2)).toBe("Suite")
    }) 

    it('cette main est une flush ', () =>{
        expect(HandName(main3)).toBe("Flush")
    }) 

    it('cette main est une Paire ', () =>{
        expect(HandName(main4)).toBe("Paire")
    }) 

    it('cette main est une Carte haute ', () =>{
        expect(HandName(main5)).toBe("Carte haute")
    }) 
})