<script>
    import { charGenerator } from "./Generators/charGenerator.js";
    import { enemyGenerator } from "./Generators/enemyGenerator.js";
    import { EnemyStore, MainStore, NextRaid } from './store.js';

    const newGame = () => {
        $MainStore.week = 1;
		$MainStore.resources = 15;
        $MainStore.shelters = 2;
        $MainStore.gameState = true;
        $MainStore.livingCharacters = 2;
        charGenerator(1);
        charGenerator(2);
        enemyGenerator(1, 3);
        enemyGenerator(1, 3);
        enemyGenerator(1, 3);
        // Generate the raid list for the next raid
        $NextRaid = [];
        let enemyChoice = Math.floor(Math.random() * $EnemyStore.length);
        let enemyName = $EnemyStore[enemyChoice].name;
        $NextRaid.push(enemyName);
    }
</script>

<button on:click={newGame}>Begin the Journey</button>