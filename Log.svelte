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
                        <p class="strong">{char.activity}</p>
                        <p>{@html char.activityContent}</p>
                    </div>
                {/each}
                {#each log.raidContent as raid}
                <div class="item inner content containerSmall">
                    <div class="itemSmall">
                        <h3>Raid</h3>
                        <div><img src="art/Icons/fighting.png" width="50" height="50" alt="Fighting"></div>
                        <div class="combat">KM-Station ({raid.fighting}) vs. The Transfigured ({raid.raid})</div>
                        <div class="combat">{raid.raidText}</div>
                    </div>
                    <div class="itemSmall">
                        <h3>Scavenging</h3>
                        <div><img src="art/Icons/scavenging.png" width="50" height="50" alt="Scavenging"></div>
                        <div>+{log.scavenging} Resources</div>
                    </div>
                    <div class="itemSmall">
                        <h3>Doctoring</h3>
                        <div><img src="art/Icons/doctoring.png" width="50" height="50" alt="Doctoring"></div>
                        <div>+{log.doctoring} Health</div>
                    </div>
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
            <p class="strong">Arrival at KM-Station</p>
            <p>I can still hear the <strong>MACHINE</strong> churning in the background of existence. I don't know what the <strong>MACHINE</strong> is. What it looks like. What it does. I just know that I was in the waking world and then suddenly I was in a nightmare of expanding and collapsing fractals. For days, weeks, years...an incomprehensible amount of time.</p><p>I snapped back to existence while I was falling through the air. I crashed into the sand a few hundred feet away from an old satellite dish. That was a few hours ago; I found this scrap paper in a shack next to the satellite. Hopefully this journal is enough to keep my sanity in this forsaken place.</p><p>Those poor people. Thousands of them hurtling through the air alongside me but they were not fortunate enough to hit the ground. I saw them passing through clouds of radiation and transforming. Transfiguring. Corrupting...</p><p>They're somewhere out beyond KM-Station now. I hear them weeping. Will they try to come for me?</p>
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

    .strong {
        font-weight: bold;
    }

    .containerSmall {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
        align-items: center;
	}

    .itemSmall {
        background: #f2f3f4;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        margin: 1em;
        padding: 1rem;
        border-radius: 10px;
        max-width: 300px;
        border: 1px solid black;
    }
</style>