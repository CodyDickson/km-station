<script>
    import { MainStore, StoryStore } from "../store.js";

    const upgradeStation = () => {
        if ((MainStore.station == 'Desolation') && (StoryStore.kms == 3)) {
            MainStore.station = 'Shanty Town';
        } else if ((MainStore.station == 'Shanty Town') && (StoryStore.kms == 6)) {
            MainStore.station = 'Techno Station';
        } else if ((MainStore.station == 'Techno Station') && (StoryStore.kms == 9)) {
            MainStore.station = 'Satellite Compound';
        } else if ((MainStore.station == 'Satellite Compound') && (StoryStore.kms == 12)) {
            MainStore.station = 'Indomitable Fortress';
        }
	}
</script>

<button on:click={upgradeStation}>Upgrade KM-Station</button>