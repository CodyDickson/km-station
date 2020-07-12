<script>
    import { charGenerator } from "./Generators/charGenerator.js";
    import { enemyGenerator } from "./Generators/enemyGenerator.js";
    import { EnemyStore, MainStore, NextRaid } from './store.js';

    const newGame = () => {
        $MainStore.week = 0;
        $MainStore.resources = 0;
        $MainStore.turrets = 1;
        $MainStore.shelters = 1;
        $MainStore.gameState = true;
        $MainStore.livingCharacters = 1;
        charGenerator(1);
        enemyGenerator(1, 2);
        enemyGenerator(1, 2);
        // Generate the raid list for the next raid
        $NextRaid = [];
        let enemyChoice = Math.floor(Math.random() * $EnemyStore.length);
        let enemyName = $EnemyStore[enemyChoice].name;
        $NextRaid.push(enemyName);
    }
</script>

<button on:click={newGame}>Begin the Journey</button>