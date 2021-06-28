<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>
<script>
	import Hoverable from './Hoverable.svelte';
	let a=1;
	let count = true //COUNT=TRUE paused, COUNT = False playing
	
	function increase() {
		count = ! count
		
	}
	function current(e) {
		console.log(e.currentTarget)
	}
</script>

<button
  on:click={increase}
  on:click={current}
>
	{#if count}
			<i class="mi mi-play"><span class="u-sr-only">Play</span></i>
		{:else}
			<i class="mi mi-pause"><span class="u-sr-only">Pause</span></i>
		{/if}
</button>

<Hoverable let:hovering={active}>
	<i class="mi mi-volume-up"><span class="u-sr-only">Volume up</span></i>
	<div class:active>
		{#if active}
			<input type=range bind:value={a} min=0 max=10>
		{:else}
			<p> </p>
		{/if}
	</div>
</Hoverable>


<style>
	div {
		padding: 0;
		margin: 0 0 0em;
	}
	.mi {
		font-size: 2rem;
	}
	.u-sr-only {
		position: absolute;
    left: -100px;
    top: auto;
    width:1px;
    height:1px;
	}
</style>