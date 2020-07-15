<script>
    import { CharStore, LogStore } from './store.js';
</script>

<div class="container" id="eventLog">
    <div class="item">
        <h2>Event Log</h2>
    </div>
        {#each $LogStore as log}
            <div class="item">
                <h2>{log.title}</h2>
                {#each log.charContent as char}
                    <div class="item inner content">
                        {#if char.gender == 1}
                            <h3 class="pink">{char.name}</h3>
                        {:else}
                            <h3 class="blue">{char.name}</h3>
                        {/if}
                        <p class="italics">{char.job}</p>
                        <p>{char.jobContent}</p>
                        <p class="italics">{char.activity}</p>
                        <p>{char.activityContent}</p>
                    </div>
                {/each}
                {#each log.raidContent as raid}
                <div class="item inner content">
                    <h3>Raid</h3>
                    <div class="combat">KM-Station ({raid.defense}) vs. The Transfigured ({raid.raid})</div>
                    <div class="combat">{raid.raidText}</div>
                </div>
                {/each}
            </div>
        {/each}
    <div class="item">
        <h2>Week 0, Unknown Year</h2>
        <div class="item inner content">
            {#if $CharStore[0].gender == 1}
                <h3 class="pink">{$CharStore[0].name}</h3>
            {:else}
                <h3 class="blue">{$CharStore[0].name}</h3>
            {/if}
            <p><i>Arrival at KM-Station</i></p>
            <p>I can still hear the MACHINE, churning somewhere just outside existence. It gnaws at the back of my mind. I don't know what the MACHINE really is, or what it even does. I just know that for an incomprehensible period of time I was caught between the normal world and a nightmare of ever-expanding fractals.</p><p>I was thrown from that churning abyss and collided with the satellite at the center of KM-Station. That was a few hours ago; I figured a journal was a good way to keep track of my thoughts. I remember hearing the screams of other people who were thrown from the storm but I worry they were not as fortunate as me.</p>
        </div>
    </div>
</div>

<style>
    .container {
        background: #f2f3f4;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
        align-items: center;
        margin: 3em;
        border: 1px solid black;
        border-radius: 10px;
	}

    .item {
        background: #f2f3f4;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        margin: 1em;
        padding: 1rem;
        border-radius: 5px;
        width: 80%;
        font: 16px Arial, sans-serif;
        line-height: 1.5;
    }

    .content {
        padding: 15px;
        text-align: left;
    }

    .combat {
        text-align: center;
    }

    .inner {
        margin: 1em auto;
        width: 80%;
    }

    h2 {
        font: bold 26px 'Orbitron', 'Roboto', sans-serif;
    }

    h3 {
        font: bold 18px 'Orbitron', 'Roboto', sans-serif;
    }

    .pink {
        color: #eeafde;
    }

    .blue {
        color: #85cde5;
    }

    .italics {
        font-style: italic;
    }
</style>