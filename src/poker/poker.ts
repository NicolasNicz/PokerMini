function findHighestValue(var1: number, var2: number, var3: number) {
    if (var1 >= var2 && var1 >= var3) {
        return var1;
    } else if (var2 >= var1 && var2 >= var3) {
        return var2;
    } else {
        return var3;
    }
}

function findMiddleValue(var1: number, var2: number, var3: number): number {
    const sortedValues = [var1, var2, var3].sort((a, b) => a - b); // Tri des valeurs dans l'ordre croissant
    return sortedValues[1]; // La valeur du milieu est à l'index 1 après le tri
}

function findLowestValue(var1: number, var2: number, var3: number): number {
    const sortedValues = [var1, var2, var3].sort((a, b) => a - b); // Tri des valeurs dans l'ordre croissant
    return sortedValues[0]; // La valeur la plus basse est à l'index 0 après le tri
}

function findUniqueValue(var1: number, var2: number, var3: number): number | null {
    if (var1 !== var2 && var1 !== var3) {
        return var1;
    } else if (var2 !== var1 && var2 !== var3) {
        return var2;
    } else if (var3 !== var1 && var3 !== var2) {
        return var3;
    } else {
        return null;
    }
}

function HandName(main: { carte1: any; carte2: any; carte3: any; }){
    const lesSuites = ["9+T+J", "T+J+Q", "J+Q+K", "Q+K+A"]

    const carte1 = main.carte1;
    const carte2 = main.carte2;
    const carte3 = main.carte3;

    const famille1 = carte1[1].name;
    const famille2 = carte2[1].name;
    const famille3 = carte3[1].name;

    const carte_name1 = carte1[0].name;
    const carte_name2 = carte2[0].name;
    const carte_name3 = carte3[0].name;

    const lasuite = carte_name1 + '+' + carte_name2 + '+' + carte_name3

    const carte_value1 = carte1[0].importance;
    const carte_value2 = carte2[0].importance;
    const carte_value3 = carte3[0].importance;

    if (carte_name1 === carte_name2 || carte_name2 === carte_name3 || carte_name1 === carte_name3){
        return "Paire";
    }
    else if (famille1 === famille2 && famille1 === famille3 && lesSuites.includes(lasuite)){
        return "Suite-Flush";
    }
    else if (famille1 === famille2 && famille1 === famille3){
        return "Flush";
    }
    else if (lesSuites.includes(lasuite)){
        return "Suite";
    }
    else {
        return "Carte haute";
    }
}

export { HandName }

function theBestHandIs(nameMain1: string, nameMain2: string, main1: { carte1: any; carte2: any; carte3: any; }, main2: { carte1: any; carte2: any; carte3: any; }){

    const handOrder: {[key: string]: number} = {
        "Carte haute": 0,
        "Paire": 1,
        "Flush": 2,
        "Suite": 3,
        "Suite-Flush": 4
    }

    const mainValue1 = handOrder[nameMain1];
    const mainValue2 = handOrder[nameMain2];

    if (mainValue1 > mainValue2){
        return "main1";
    }
    else if (mainValue1 < mainValue2){
        return "main2";
    }
    else{
        //Si les types de mains sont les mêmes:
        const M1carte1 = main1.carte1;
        const M1carte2 = main1.carte2;
        const M1carte3 = main1.carte3;

        const M2carte1 = main2.carte1;
        const M2carte2 = main2.carte2;
        const M2carte3 = main2.carte3;

        const M1carte_value1 = M1carte1[0].importance;
        const M1carte_value2 = M1carte2[0].importance;
        const M1carte_value3 = M1carte3[0].importance;

        const M2carte_value1 = M2carte1[0].importance;
        const M2carte_value2 = M2carte2[0].importance;
        const M2carte_value3 = M2carte3[0].importance;

        const M1highestCarte = findHighestValue(M1carte_value1, M1carte_value2, M1carte_value3);
        const M2highestCarte = findHighestValue(M2carte_value1, M2carte_value2, M2carte_value3);

        const M1MiddleCarte = findMiddleValue(M1carte_value1, M1carte_value2, M1carte_value3);
        const M2MiddleCarte = findMiddleValue(M2carte_value1, M2carte_value2, M2carte_value3);

        const M1LowestCarte = findLowestValue(M1carte_value1, M1carte_value2, M1carte_value3);
        const M2LowestCarte = findLowestValue(M2carte_value1, M2carte_value2, M2carte_value3);

        if (nameMain1 === 'Suite' || nameMain1 === 'Suite-Flush'){

            if (M1highestCarte > M2highestCarte){
                return 'main1'
            }
            else if (M1highestCarte < M2highestCarte){
                return 'main2'
            }
            else {
                return 'égalité'
            }
        }
        else if(nameMain1 === 'Paire'){
            const M1hauter3emeCarte = findUniqueValue(M1carte_value1, M1carte_value2, M1carte_value3);
            const M2hauter3emeCarte = findUniqueValue(M2carte_value1, M2carte_value2, M2carte_value3);
            if (M1hauter3emeCarte !== null && M2hauter3emeCarte !== null) {
                if (M1hauter3emeCarte > M2hauter3emeCarte) {
                    return 'main1'
                } else if (M1hauter3emeCarte < M2hauter3emeCarte) {
                    return 'main2'
                } else {
                    return 'égalité'
                }
            }
        }
        else{
            //En cas de carte haute ou de flush
            if (M1highestCarte > M2highestCarte){
                return 'main1'
            }
            else if (M1highestCarte < M2highestCarte){
                return 'main2'
            }
            else {
                if (M1MiddleCarte > M2MiddleCarte){
                    return 'main1'
                }
                else if (M1MiddleCarte < M2MiddleCarte){
                    return 'main2'
                }
                else{
                    if (M1LowestCarte > M2LowestCarte){
                        return 'main1'
                    }
                    else if (M1LowestCarte < M2LowestCarte){
                        return 'main2'
                    }
                    else{
                        return 'égalité'
                    }
                }
            }
        }

    }
}

export { theBestHandIs }

