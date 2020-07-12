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
    let enemyName = ["Abby", "Anna", "Bill", "Cody", "Debbie", "Derek", "Emily", "Frances", "George", "Henry", "Isabella", "John", "Keith", "Luke", "Mary", "Nancy", "Oscar", "Paul", "Quincy", "Rebecca", "Sarah", "Terry", "Violet", "Walter"];
    let name = enemyName[Math.floor(Math.random() * enemyName.length)];
    return name;
}

function descGenerator() {
    let attribute = ["Abstracted.", "Aggressive.", "Arms like a spider.", "Bug eyed.", "Constantly sprouting fingers.", "Corrupted.", "Covered in flies.", "Crying.", "Deer antlers.", "Disturbingly attractive.", "Dripping.", "Drooling bile.", "Electric zappy.", "Fetus growing from ribs.", "Frantic.", "Glitched.", "Gooey.",  "Hostile to birds.", "Humiliating to fight.", "Insect wings.", "Itchy.", "Jagged scissor limbs.", "Large tongue.", "Mawkish.", "Nonsense inducing.", "Offensively ugly.", "Overwhelming amount of eyes.", "Protruding bones.", "Quick.", "Reminiscent of a loved one.", "Repulsive.", "Rotting.", "Screeching at painful volumes.", "Snarling.", "Sleepy.", "Tentacles.", "Tortured.", "Torturer.", "Twin heads.", "Twitchy.", "Unsettling.", "Violently beating heart.", "Wet.", "Whimpering."];
    let skin = ["Feathers.", "Fish scales.", "Hairy.", "Lizard scales.", "Oily skin.", "Rough pig-skin.", "Scarred and flappy skin.", "Shedding thick chunks of dandruff."];
    let size = ["Anorexic.", "Fat.", "Gigantic.", "Little and crippled.", "Massive.", "Miniature.", "Petite.", "Skinny.", "Small.", "Tiny.", "Towering.", "Wiry."];
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