import { animalGenerator, colorGenerator, creativeGenerator, emotionGenerator } from './worldGenerator.js';
import { CharStore } from '../store.js';
import { random } from '../random.js';

export function charGenerator(ID) {
    let pic = '';
    let gender = random(1,3);
    if (gender == 1) {
        pic = 'art/female' + (random(1, 58));
    } else {
        pic = 'art/male' + (random(1, 59));
    }
    let rand = random(1,11);
    let name = nameGenerator();
    let health = 10;
    let fighting = random(0, 2);
    let scavenging = random(0, 2);
    let doctoring = random(0,2);
    rand = random(1,5);
    let obsession = '';
    if (rand == 1) {
        obsession = creativeGenerator();
    } else if (rand == 2) {
        obsession = animalGenerator();
    } else if (rand == 3) {
        obsession = colorGenerator();
    } else if (rand == 4) {
        obsession = emotionGenerator();
    }
    let memories = 0;
    let level = 0;
    let traits = 'Human. ';
    let storylines = '';
    let charList = {ID, pic, name, health, fighting, scavenging, doctoring, obsession, level, gender, traits, storylines, memories};
    CharStore.update(characters => {
        return [...characters, charList];})
}

export function nameGenerator() {
    let firstPart = ["Absurd", "Acute", "Agile", "Anti", "Basic", "Beloved", "Big", "Brave", "Bronze", "Cold", "Comfort", "Complete", "Creepy", "Crying", "Cursed", "Dead-Eyed", "Delicate", "Demi", "Desolate", "Desperate", "Devout", "Dirty", "Divine", "Drunk", "Easy", "Elusive", "Empathetic", "Empty", "Energetic", "Exaggerated", "Floating", "Fragile", "Golden", "Grand", "Great", "Guilty", "Happy", "Holy", "Honest", "Indigo", "Invasive", "Inverted", "Joyful", "Killer", "Kind", "Left-Handed", "Little", "Lucky", "Mighty", "Nervous", "Nosy", "Obtuse", "Odd", "Painful", "Peppermint", "Powerful", "Quack", "Quick", "Rabid", "Scary", "Shifty", "Shiny", "Silent", "Simple", "Sleepy", "Smoky", "Stone", "Sunset", "Surprised", "Tough", "Ugly", "Ultra", "Violent", "Virtual", "Weak", "Weeping", "Wide", "Wicked", "Wild"];
    let secondPart = ["Alien", "Anonymous", "Avocado", "Baggage", "Beach", "Beer", "Bone", "Boolean", "Bug", "Calamity", "Carolina", "Celebrity", "Chicken", "Chimera", "Clapper", "Clone", "Cocaine", "Color", "Comedy", "Corona", "Crate", "Criminal", "Deceiver", "Diamond", "Dilemma", "Earth", "Elbow", "Elvis", "Emu", "Exile", "Fantasy", "Fawn", "Foot", "Game", "Gemini", "Georgia", "Goat", "Guitar", "Gun", "Hacker", "Heart", "Holland", "Hotel", "Humming", "Jaw", "Jelly", "Jet", "Kennedy", "Knees", "Laughter", "Lemon", "Lizard", "Mazatlan", "Monroe", "Mouse", "Night", "Nostalgia", "Nut", "Octopus", "Other", "Outlaw", "Past", "Planet", "Plant", "Politician", "Potato", "President", "Pretzel", "Rain", "Renegade", "Rifle", "Ruby", "Rum", "Rummy", "Runner", "Saturn", "Seed", "Self", "Shark", "Shoes", "Soldier", "Snake", "Spiral", "Swamp", "Thief", "Torch", "Tortoise", "Traitor", "Unicorn", "Vacation", "Visitor", "Vodka", "Wallaby", "Whiskey", "Wood"];
    let name = firstPart[Math.floor(Math.random() * firstPart.length)] + " " + secondPart[Math.floor(Math.random() * secondPart.length)];
    return name;
}