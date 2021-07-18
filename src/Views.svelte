<script>
	import { curTime, timingObject } from './stores';
	import { onMount } from 'svelte';
	import View from './View.svelte'
	export let views;
	let hidden = false;

	// import { setTimingsrc } from 'timingsrc';
	// // export let $timingObject;
	// onMount(async () => {
	// 	vids.forEach((vid) => {
	// 		setTimingsrc(vid, $timingObject); 
	// 	})
	// })
</script>
<style>
	.bar {
		width: 8px;
		background-color: gray;
		border-left: 2px solid;
	}

	.hidden {
		display: none;
	}

	.views-container {
		/*flex: auto;*/
		/*padding: 0.5em;*/
		width: fit-content;
	}
	.vids-container {
		display:inline-grid;
		grid-template-rows: repeat(2,minmax(0, 1fr));
		grid-auto-flow: column;
/*   	grid-auto-columns: minmax(250px, auto); */
		height:100%;
	}
	.vid-container {
		width:100%;
		height:100%;
	}
/*	video{
		max-width: 100%; 
	  	max-height: 100%;
	  	width: auto;
	  	height: auto;
	}*/
</style>

<div class="bar" on:click={()=>{hidden=!hidden}}></div>
<div class="views-container" class:hidden>
	<div class="vids-container">
	{#each views as src, i}
			<View class='view' src={src} timingSrc={$timingObject}/>
	{/each}
	</div>
</div>