<script>
	import Base from './Base.svelte';
	import Character from './Character.svelte';
	import Header from './Header.svelte';
	import Log from './Log.svelte';
	import { MainStore } from './store.js';
	import NewGame from './NewGame.svelte';
	import Tabs from './Tabs.svelte';

	let tabs = ['Characters', 'Base', 'Log'];
	let activeTab = 'Characters';
	const tabChange = (e) => {
		activeTab = e.detail;
	}
</script>

<main>
	<Header />
	<Tabs {tabs} {activeTab} on:tabChange={tabChange} />

	{#if $MainStore.gameState}
		{#if activeTab === 'Characters'}
			<Character />
		{:else if activeTab === 'Base'}
			<Base />
		{:else if activeTab === 'Log'}
			<Log />
		{/if}
	{/if}
	
	<!---{:else}
		<NewGame />
	{/if}--->

</main>

<style>
	main {
		text-align: center;
		margin: 0;
		padding: 0;
	}
</style>