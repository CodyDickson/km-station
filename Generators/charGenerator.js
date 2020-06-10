import { animalGenerator, colorGenerator, creativeGenerator, emotionGenerator } from './worldGenerator.js';
import { CharStore } from '../store.js';
import { random } from '../random.js';

export function charGenerator(ID) {
    let pic = '';
    let gender = random(1,3);
    if (gender == 1) {
        pic = 'art/female' + (random(1, 21));
    } else {
        pic = 'art/male' + (random(1, 22));
    }
    let rand = random(1,11);
    let name = nameGenerator();
    let health = random(20, 25);
    let fighting = random(0, 6);
    let scavenging = random(0, 6);
    let doctoring = random(0,5);
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
    let level = 0;
    let charList = {ID, pic, name, health, fighting, scavenging, doctoring, obsession, level, gender};
    CharStore.update(characters => {
        return [...characters, charList];})
}

export function nameGenerator() {
    let firstPart = ["Absurd", "Acute", "Agile", "Anti", "Basic", "Beloved", "Big", "Brave", "Bronze", "Cold", "Comfort", "Complete", "Creepy", "Cursed", "Dead-Eyed", "Delicate", "Demi", "Desolate", "Desperate", "Devout", "Dirty", "Divine", "Drunk", "Easy", "Elusive", "Energetic", "Exaggerated", "Floating", "Fragile", "Golden", "Grand", "Great", "Guilty", "Happy", "Holy", "Honest", "Indigo", "Invasive", "Joyful", "Killer", "Kind", "Little", "Lucky", "Mighty", "Nervous", "Nosy", "Obtuse", "Odd", "Peppermint", "Powerful", "Quack", "Quick", "Rabid", "Scary", "Shifty", "Shiny", "Simple", "Smoky", "Stone", "Sunset", "Tough", "Ugly", "Ultra", "Violent", "Weak", "Wide", "Wicked", "Wild"];
    let secondPart = ["Alien", "Anonymous", "Avocado", "Baggage", "Beach", "Beer", "Bone", "Boolean", "Bug", "Calamity", "Carolina", "Celebrity", "Chicken", "Chimera", "Clapper", "Clone", "Color", "Corona", "Crate", "Deceiver", "Diamond", "Dilemma", "Earth", "Elbow",  "Emu", "Fantasy", "Fawn", "Foot", "Gemini", "Georgia", "Goat", "Gun", "Heart", "Holland", "Humming", "Jaw", "Jelly", "Jet", "Kennedy", "Knees", "Laughter", "Leaf", "Lizard", "Mazatlan", "Monroe", "Mouse", "Night", "Nostalgia", "Nut", "Octopus", "Other", "Outlaw", "Planet", "Plant", "Politician", "Potato", "President", "Rain", "Renegade", "Rifle", "Ruby", "Rum", "Rummy", "Runner", "Saturn", "Seed", "Self", "Shark", "Shoe", "Snake", "Spiral", "Swamp", "Thief", "Torch", "Traitor", "Vacation", "Visitor", "Vodka", "Wallaby", "Whiskey", "Wood"];
    let name = firstPart[Math.floor(Math.random() * firstPart.length)] + " " + secondPart[Math.floor(Math.random() * secondPart.length)];
    return name;
}