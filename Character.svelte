<script>
    import { CharStore, MainStore, StoryStore, WorldStore } from './store.js';
</script>

<div id="character" class="container">
    {#each $CharStore as char}
        <div class="item">
            <div>
                {#if char.health > 0}
                    <img src="{char.pic}.jpg" alt="{char.name}">
                {:else}
                    <img src="{char.pic}b.jpg" alt="{char.name}">
                {/if}
            </div>
            <h2>{char.name}</h2>
            {#if char.health > 0}
                <div>Alive ({char.health} Health)</div>
                <br>
                <div>Fighting: {char.fighting} | Scavenging: {char.scavenging} | Doctoring: {char.doctoring}</div>
                <br>
                <div>Level: {char.level}</div>
                <br>
                <div>
                    <label for="job">Job</label>
                    <select id="job{char.ID}">
                        <option value="defender">Defender</option>
                        <option value="scavenger">Scavenger</option>
                        <option value="medic">Medic</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <br>
                <div>
                    <label for="activity">Activity</label>
                    <select id="activity{char.ID}">
                        <option>Explore the Unknown World</option>
                        {#if $StoryStore[1].voice == 1 && $StoryStore[1].character == char.ID}<option>Listen to the Mysterious Voice</option>{/if}
                        {#if $StoryStore[1].voice >= 2 && $StoryStore[1].voice < 4 && $StoryStore[1].character == char.ID}<option>Listen to the Mysterious Voice</option>{/if}
                        {#if $StoryStore[1].voice == 1 && $StoryStore[1].character == char.ID}<option>Resist the Mysterious Voice</option>{/if}
                        {#if $StoryStore[1].voice >= 5 && $StoryStore[1].voice < 7 && $StoryStore[1].character == char.ID}<option>Resist the Mysterious Voice</option>{/if}
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
    img {
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
        background: rgb(194, 194, 194);
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        margin: 1em;
        padding: 1rem;
        border-radius: 1px;
        max-width: 300px;
    }
</style>