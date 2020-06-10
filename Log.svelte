<script>
    import { CharStore, LogStore } from './store.js';
</script>

<div class="container">
    <div class="item" id="eventLog">
        <h2>Event Log</h2>
        {#each $LogStore as log}
            <div>
                <h3>{log.title}</h3>
                {#each log.logContent as content}
                    <div class="content">{content}</div>
                {/each}
                <h4>Raid</h4>
                <div class="combat">KM-Station ({log.defense}) vs. The Monsters ({log.raid})</div>
                <div class="combat">{log.raidText}</div>
            </div>
            <div class="combat"><h4>--------</h4></div>
        {/each}
        <div>
            <h3>Week 1, Unknown Year</h3>
            <div class="content">Out of the abstract destruction of the world, two figures crawled toward KM-Station: {$CharStore[0].name} and {$CharStore[1].name}. The MACHINE continued to hum in the background of all existence, pulsing every eight weeks.</div>
        </div>
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
        background: rgb(194, 194, 194);
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.26);
        margin: 1em;
        padding: 1rem;
        border-radius: 5px;
        min-width: 600px;
    }

    .content {
        padding: 15px;
        text-align: left;
    }

    .combat {
        text-align: center;
    }
</style>