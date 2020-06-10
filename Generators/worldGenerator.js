import { WorldStore } from '../store.js';

export function worldGenerator() {
    let animal = animalGenerator();
    let color = colorGenerator();
    let creative = creativeGenerator();
    let discovery = 0;
    let emotion = emotionGenerator();
    let family = familyGenerator();
    let material = materialGenerator();
    let worldList = {animal, color, creative, discovery, emotion, family, material};
    WorldStore.update(world => {
        return [...world, worldList];})
}

export function animalGenerator() {
    let animalList = ["cats", "dogs", "owls"];
    let animal = animalList[Math.floor(Math.random() * animalList.length)];
    return animal;
}

export function colorGenerator() {
    let colorList = ["blue", "green", "purple", "red"];
    let color = colorList[Math.floor(Math.random() * colorList.length)];
    return color;
}

export function creativeGenerator() {
    let creativeList = ["Paint", "Write"];
    let creative = creativeList[Math.floor(Math.random() * creativeList.length)];
    return creative;
}

export function emotionGenerator() {
    let emotionList = ["anger", "anticipation", "disgust", "fear", "joy", "sadness", "suffering", "surprise"];
    let emotion = emotionList[Math.floor(Math.random() * emotionList.length)];
    return emotion;
}

export function familyGenerator() {
    let familyList = ["brother", "mother", "father", "grandma", "grandpa", "sister"];
    let family = familyList[Math.floor(Math.random() * familyList.length)];
    return family;
}

export function materialGenerator() {
    let materialList = ["brick", "stone", "wood"];
    let material = materialList[Math.floor(Math.random() * materialList.length)];
    return material;
}