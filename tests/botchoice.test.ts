import { describe, expect, it } from "vitest";
import { BotAction } from "../src/poker/poker";

const randomChoice1 = 0; //attendre
const randomChoice2 = 1; //suivre
const randomChoice3 = 2; //relance

const amount = 2;



describe('test choix du bot', () => {

    it('le bot attend, il joue 0 jetons', () =>{
        expect(BotAction(randomChoice1, amount)).toBe(0)
    }) 

    it('le bot suit, il joue la même quantité que le joueur', () =>{
        expect(BotAction(randomChoice2, amount)).toBe(2)
    }) 

    it('le bot relance, il joue la même quantité que le joueur + 2', () =>{
        expect(BotAction(randomChoice3, amount)).toBe(4)
    })  
})