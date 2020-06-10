import { EnemyStore } from '../store.js';
import { random } from "../random.js";

export function enemyGenerator(min, max) {
    let name = nameGenerator();
    let fighting = random(min, max);        
    let description = descGenerator();
    let enemyList = {name, fighting, description};
    EnemyStore.update(enemies => {
        return [...enemies, enemyList];
    })}

function nameGenerator() {
    let firstPart;
    let secondPart;
    let thirdPart;
    let fourthPart;
    let randLength = random(3,5);
    let rand1 = random(1,3);
    if (rand1 == 1) {
        firstPart = ["Aa", "A", "E", "Ee", "I", "Oo", "O", "Oy", "U", "Un", "Y", "Yi"];
        secondPart = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
        thirdPart = ["a", "e", "ee", "i", "oo", "o", "u"];
        if (randLength > 3) {
            fourthPart = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "th", "v", "w", "x", "y", "z"];
        }
    } else if (rand1 == 2) {
        firstPart = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];
        secondPart = ["a", "e", "ee", "i", "oo", "o", "u"];
        thirdPart = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"];
        if (randLength > 3) {
            fourthPart = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "th", "v", "w", "x", "y", "z"];
        }
    }
    let name = firstPart[Math.floor(Math.random() * firstPart.length)] + secondPart[Math.floor(Math.random() * secondPart.length)] + thirdPart[Math.floor(Math.random() * thirdPart.length)];
    if (randLength > 3) {
        name = name + fourthPart[Math.floor(Math.random() * fourthPart.length)];
    }
    return name;
}

function descGenerator() {
    let attribute = ["Abstracted.", "Aggressive.", "Bug eyed.", "Corrupted.", "Covered in flies.", "Deer antlers.", "Disturbingly attractive.", "Dripping.", "Drooling bile.", "Electric zappy.", "Frantic.", "Glitched.", "Gooey.",  "Hostile.", "Humiliating to fight.", "Insect wings.", "Jagged scissor limbs.", "Large tongue.", "Mawkish.", "Nonsense inducing.", "Offensively ugly.", "Overwhelming amount of eyes.", "Protruding bones.", "Quick.", "Repulsive.", "Rotting.", "Snarling.", "Sleepy.", "Tentacles.", "Tortured.", "Torturer.", "Twin heads.", "Twitchy.", "Unsettling.", "Wet."];
    let skin = ["Feathers.", "Fish scales.", "Hairy.", "Lizard scales.", "Oily skin.", "Rough pig-skin.", "Scarred and flappy skin."];
    let size = ["Fat.", "Gigantic.", "Massive.", "Miniature.", "Petite.", "Skinny.", "Small.", "Tiny.", "Towering."];
    let item1 = '';
    let item2 = '';
    let i = 0;
    if (random(1,3) > 1) {
        item1 = size[Math.floor(Math.random() * size.length)];
    } else {
        item1 = attribute[Math.floor(Math.random() * attribute.length)];
    }
    if (random(1,3) > 1) {
        item2 = skin[Math.floor(Math.random() * skin.length)];
    } else {
        item2 = attribute[Math.floor(Math.random() * attribute.length)];
        while (i = 0) {
            if (item2 == item1) {
                item2 = attribute[Math.floor(Math.random() * attribute.length)];
            } else if (item2 != item1) {
                i = 1;
            }
        }
    }
    let item3 = attribute[Math.floor(Math.random() * attribute.length)];
    i = 0;
    while (i = 0) {
        if ((item3 == item1 || item3 == item2)) {
            item3 = attribute[Math.floor(Math.random() * attribute.length)];
        } else if (item3 != item1 && item3 != item2) {
            i = 1;
        }
    }
    let desc = item1 + " " + item2 + " " + item3;
    return desc;
}