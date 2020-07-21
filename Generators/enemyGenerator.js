import { EnemyStore } from '../store.js';
import { random } from "../random.js";

export function enemyGenerator(min, max, level) {
    let name = nameGenerator();
    let fighting = random(min, max);
    let description = descGenerator(level);
    let enemyList = {name, fighting, description};
    EnemyStore.update(enemies => {
        return [...enemies, enemyList];
    })
}

function nameGenerator() {
    let enemyName = ["Abby", "Anna", "Bill", "Cody", "Debbie", "Derek", "Emily", "Frances", "George", "Henry", "Isabella", "John", "Keith", "Luke", "Mary", "Nancy", "Oscar", "Paul", "Quincy", "Rebecca", "Sarah", "Terry", "Violet", "Walter"];
    let name = enemyName[Math.floor(Math.random() * enemyName.length)];
    return name;
}

function descGenerator(level) {
    let item1;
    let item2;
    let item3;
    let item4;
    let item5;
    let i = 0;
    let desc = '';
    let attribute = ["Abstracted.", "Aggressive.", "Arms like a spider.", "Bug eyed.", "Constantly sprouting fingers.", "Corrupted.", "Covered in flies.", "Crying.", "Deer antlers.", "Disturbingly attractive.", "Dripping.", "Drooling bile.", "Electric zappy.", "Feathers.", "Fetus growing from ribs.", "Fish scales.", "Frantic.", "Glitched.", "Gooey.",  "Hostile to birds.", "Humiliating to fight.", "Insect wings.", "Itchy.", "Jagged scissor limbs.", "Large tongue.", "Mawkish.", "Nonsense inducing.", "Offensively ugly.", "Overwhelming amount of eyes.", "Protruding bones.", "Quick.", "Reminiscent of a loved one.", "Repulsive.", "Rotting.", "Screeching at painful volumes.", "Snarling.", "Sleepy.", "Tentacles.", "Tortured.", "Torturer.", "Twin heads.", "Twitchy.", "Unsettling.", "Violently beating heart.", "Wet.", "Whimpering.", "Wiry", "Hairy.", "Lizard scales.", "Oily skin.", "Rough pig-skin.", "Scarred and flappy skin.", "Shedding thick chunks of dandruff."];
    let size = ["Anorexic.", "Fat.", "Gigantic.", "Little and crippled.", "Massive.", "Miniature.", "Petite.", "Skinny.", "Small.", "Tiny.", "Towering.", "Wiry."];
    if (level >= 1) {
        item1 = attribute[Math.floor(Math.random() * attribute.length)];
        desc = item1;
    }
    if (level >= 2) {
        item2 = attribute[Math.floor(Math.random() * attribute.length)];
        i = 0;
        while (i < 1) {
            if (item2 == item1) {
                item2 = attribute[Math.floor(Math.random() * attribute.length)];
            } else {
                i += 1;
            }
        }
        desc = desc + ' ' + item2;
    }
    if (level >= 3) {
        item3 = attribute[Math.floor(Math.random() * attribute.length)];
        i = 0;
        while (i < 1) {
            if (item3 == item2) {
                item3 = attribute[Math.floor(Math.random() * attribute.length)];
            } else if (item3 == item1) {
                item3 = attribute[Math.floor(Math.random() * attribute.length)];
            } else {
                i += 1;
            }
        }
        desc = desc + ' ' + item3;
    }
    if (level >= 4) {
        item4 = attribute[Math.floor(Math.random() * attribute.length)];
        i = 0;
        while (i < 1) {
            if (item4 == item3) {
                item4 = attribute[Math.floor(Math.random() * attribute.length)];
            } else if (item4 == item2) {
                item4 = attribute[Math.floor(Math.random() * attribute.length)];
            } else if (item4 == item1) {
                item4 = attribute[Math.floor(Math.random() * attribute.length)];
            } else {
                i += 1;
            }
        }
        desc = desc + ' ' + item4;
    }
    if (level >= 5) {
        item5 = attribute[Math.floor(Math.random() * attribute.length)];
        i = 0;
        while (i < 1) {
            if (item5 == item4) {
                item5 = attribute[Math.floor(Math.random() * attribute.length)];
            } else if (item5 == item3) {
                item5 = attribute[Math.floor(Math.random() * attribute.length)];
            } else if (item5 == item2) {
                item5 = attribute[Math.floor(Math.random() * attribute.length)];
            } else if (item5 == item1) {
                item5 = attribute[Math.floor(Math.random() * attribute.length)];
            } else {
                i += 1;
            }
        }
        desc = desc + ' ' + item5;
    }
    return desc;
}