<script>
    import EndTurn from './EndTurn.svelte';
    import { MainStore } from './store.js';
    import TestButtons from './TestButtons.svelte';
</script>

<header>
	<h1>KM-Station</h1>
    <div id="top" class="container">
        <EndTurn />
    </div>

    <div>
        <TestButtons />
    </div>

    <div class="container">
        <div class="item">
            Week {$MainStore.week}
        </div>
        <div class="item">
            {$MainStore.livingCharacters} Living Characters
        </div>
        <div class="item">
            {$MainStore.resources} Resources
        </div>
    </div>
</header>

<style>
	h1 {
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

    .container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

    .item {
        background: rgb(194, 194, 194);
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        margin: 1em;
        padding: 1rem;
        border-radius: 5px;
        max-width: 300px;
    }

    header {
        background-color: #907988;
    }
</style>