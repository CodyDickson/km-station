<script>
    import { CharStore, LogStore } from './store.js';
</script>

<div class="container" id="eventLog">
    <div class="item">
        <h2>Event Log</h2>
    </div>
    <div class="item">
        {#each $LogStore as log}
            <div class="entry">
                <h3>{log.title}</h3>
                {#each log.logContent as content}
                    <div class="content">{@html content}</div>
                {/each}
                <h4>Raid</h4>
                <div class="combat">KM-Station ({log.defense}) vs. The Transfigured ({log.raid})</div>
                <div class="combat">{log.raidText}</div>
            </div>
            <div class="combat"></div>
        {/each}
    </div>
    <div class="item">
        <h3>Week 0, Unknown Year</h3>
        <div class="content">
            <p>Somewhere to the left of existence, the <strong>MACHINE</strong> churned. One human being was thrown from the black hole and collided with the satellite at the center of KM-Station. Others were launched but they were not fortunate enough to hit something solid -  instead they passed through rapidly twitching quarks and boiling clouds of radiation. Most of these unlucky souls retained their original names but were unrecognizable as people. They were in a state of flux; of transfiguration. They were becoming what they really were.</p>
            <p><strong>{$CharStore[0].name}</strong> slowly opened their eyes.</p>
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
</style>