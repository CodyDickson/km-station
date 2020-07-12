import { writable } from 'svelte/store';

export const CharStore = writable ([]);

export const EnemyStore = writable ([]);

export const LogStore = writable ([]);

export const MainStore = writable ({
    week: 1,
    livingCharacters: 0,
    deadCharacters: 0,
    resources: 15,
    memories: 0,
    turrets: 0,
    shelters: 2,
    enemyPower: 3,
    gameState: true
});

export const NextRaid = writable ([]);

export const StoryStore = writable ([
    {bird: 0, character: 0},
    {voice: 0, character: 0},
    {river: 0, character: 0},
    {alligator: 0, character: 0}
]);

export const WorldStore = writable ([]);