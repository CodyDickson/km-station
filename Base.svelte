<script>
    import { MainStore } from './store.js';
    import RaidList from './RaidList.svelte';

    const buildShelter = () => {
		$MainStore.shelters += 1;
		$MainStore.resources -= 15;
	}

	const buildTurret = () => {
		$MainStore.turrets += 1;
        $MainStore.resources -= 15;
	}
</script>

<div id="station" class="container">
    <div class="item">
        <h2>Buildings</h2>
        <button>Construct</button>
    </div>
    <div class="item defenses">
        <h2>Defenses</h2>
        <div><img src="art/Icons/turrets.png" width="75" height="75" alt="Turret"><img src="art/Icons/turrets.png" width="75" height="75" alt="Turret"></div>
        {#if $MainStore.resources >= 15}
            <button on:click={buildTurret}>Build Turret</button>
        {:else}
            <button>Build Turret</button>
        {/if}
    </div>
    <div class="item">
        <h2>Shelters</h2>
        <div>{$MainStore.shelters} Bunks</div>
        {#if $MainStore.resources >= 15}
            <button on:click={buildShelter}>Build Shelter</button>
        {:else}
            <button>Build Shelter</button>
        {/if}
    </div>
    <div class="item">
        <h2>Desolation</h2>
        <button>Upgrade KM-Station</button>
    </div>
</div>

<div class="container">
    <div id="nextRaid" class="item">
        <RaidList />
    </div>
</div>

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

    .item {
        background: #f2f3f4;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        margin: 1em;
        padding: 1rem;
        border-radius: 5px;
        max-width: 300px;
    }

    #nextRaid {
        min-width: 500px;
    }

    .defenses img {
        border: 3px solid black;
    }
</style>