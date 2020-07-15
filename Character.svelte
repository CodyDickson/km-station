<script>
    import { CharStore, MainStore, StoryStore, WorldStore } from './store.js';
</script>

<div id="character" class="container">
    {#each $CharStore as char}
        <div class="item">
            <div class="portrait">
                {#if char.health > 0}
                    <img src="{char.pic}.jpg" alt="{char.name}">
                {:else}
                    <img src="{char.pic}b.jpg" alt="{char.name}">
                {/if}
            </div>
            {#if char.gender == 1}
                <h2 class="pink">{char.name}</h2>
            {:else}
                <h2 class="blue">{char.name}</h2>
            {/if}
            {#if char.health > 0}
                <div class="container">
                    <div class="healthBar">
                        <div class="statText">{char.health}</div>
                        <div><img src="art/Icons/health.png" width="50" height="50" alt="Health"></div>
                    </div>
                    <div class="healthBar">
                        <div class="statText">{char.memories}</div>
                        <div><img src="art/Icons/memories.png" width="50" height="50" alt="Memories"></div>    
                    </div>
                </div>
                <div class="stats">
                    <div class="container">
                        <div class="item"><div class="statText">{char.fighting}</div><img src="art/Icons/fighting.png" width="50" height="50" alt="Fighting"></div>
                        <div class="item"><div class="statText">{char.scavenging}</div><img src="art/Icons/scavenging.png" width="50" height="50" alt="Scavenging"></div>
                        <div class="item"><div class="statText">{char.doctoring}</div><img src="art/Icons/doctoring.png" width="50" height="50" alt="Doctoring"></div>
                    </div>
                </div>
                <br>
                <div class="dropdowns">
                    <label for="job">Job</label>
                    <select id="job{char.ID}">
                        <option value="defender">Defender</option>
                        <option value="scavenger">Scavenger</option>
                        <option value="medic">Medic</option>
                    </select>
                </div>
                <br>
                <div class="dropdowns">
                    <label for="activity">Activity</label>
                    <select id="activity{char.ID}">
                        <option>Explore the Collapsed World</option>
                        {#if $StoryStore[0].kms < 2}<option>Search KM-Station</option>{/if}
                        {#if ($MainStore.station == 'Shanty Town') && ($StoryStore[0].kms >= 2) && ($StoryStore[0].kms < 5)}<option>Study KM-Station</option>{/if}
                    </select>
                </div>
            {:else}
                <div>Disintegrated Into the Abstract</div>
            {/if}
        </div>
    {:else}
        <div>No characters to display.</div>
    {/each}
</div>

<style>
    .portrait img {
        border: 1px solid black;
        box-shadow: 3px 3px rgba(0,0,0,0.26);
    }

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
        border-radius: 10px;
        max-width: 300px;
        border: 1px solid black;
    }

    #character h2 {
        font: 26px 'Orbitron', 'Roboto', sans-serif;
        max-width: 300px;
        letter-spacing: 2px;
    }

    .stats .container {
        display: flex;
        flex-wrap: nowrap;
    }

    .stats .item {
        background: #f2f3f4;
        text-align: center;
        box-shadow: 2px 2px 8px rgba(0,0,0,.4);
        margin: .2em 0 0 0;
        border-radius: 0px;
        padding: .5em;
        border: none;
    }

    .statText {
        font: bold 20px 'Roboto', sans-serif;
        padding: .5em;
    }

    .dropdowns {
        box-shadow: 0 2px 8px rgba(0,0,0,.4);
        padding: .5em 0 .5em 0;
        font: bold 18px 'Roboto', sans-serif;
    }

    .dropdowns label {
        padding-bottom: .5em;
    }

    .healthBar {
        box-shadow: 0 2px 8px rgba(0,0,0,.4);
        font: 16px 'Roboto', sans-serif;
    }

    .container .healthBar {
        padding: .5em;
    }

    .healthBar img {
        border-radius: 50%;
        border: 3px solid black;
    }

    .pink {
        color: #eeafde;
    }

    .blue {
        color: #85cde5;
    }
</style>