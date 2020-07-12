<script>
    import { EnemyStore, NextRaid } from './store.js';
</script>

<ul>
    <h3>Next Raid</h3>
    {#each $NextRaid as raid}
        <li>{raid}</li>
    {:else}
        <div>No enemies to display.</div>
    {/each}
</ul>

<ul>
    <h3>The Transfigured</h3>
    {#each $EnemyStore as enemy}
        <li>
            {enemy.name} ({enemy.fighting})
            <br>{enemy.description}
        </li>
    {:else}
        <div>No enemies to display.</div>
    {/each}
</ul>

<style>
    li {
        text-align: left;
        padding: 8px;
    }
</style>