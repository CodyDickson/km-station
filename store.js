import { writable } from 'svelte/store';

export const CharStore = writable ([]);

export const EnemyStore = writable ([]);

export const LogStore = writable ([]);

export const MainStore = writable ({
    enemyPower: 3,
    gameState: true,
    livingCharacters: 0,
    resources: 15,
    shelters: 1,
    station: 'Desolation',
    turrets: 1,
    week: 0
});

export const NextRaid = writable ([]);

export const StoryStore = writable ([
    {kms: 0},
    {bird: 0, character: 0},
    {voice: 0, character: 0},
    {river: 0, character: 0},
    {alligator: 0, character: 0}
]);

export const WorldStore = writable ([]);