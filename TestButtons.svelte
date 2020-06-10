<script>
    import { charGenerator } from "./Generators/charGenerator.js";
    import { enemyGenerator } from "./Generators/enemyGenerator.js";
    import { MainStore } from "./store.js";
    import NewGame from './NewGame.svelte';

    const newCharacter = () => {
        charGenerator($MainStore.livingCharacters);
        $MainStore.livingCharacters++;
	}
</script>

<button on:click={newCharacter}>Add Character</button>
<button on:click={enemyGenerator}>Add Enemy</button>
<NewGame />