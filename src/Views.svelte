<script>
	import { curTime } from './stores';
	export let views;
	let hidden = false;
	let height;
	switch(views.length){
		case 1:
			height=50;
			break;
		case 2:
			height=50;
			break;
		case 3:
			height=33;

	}
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
		/*flex: 1000 1000;*/
		/*padding: 0.5em;*/
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
	video{
		max-width: 100%; 
	  	max-height: 100%;
	  	width: auto;
	  	height: auto;
	}
</style>

<div class="bar" on:click={()=>{hidden=!hidden}}></div>
<div class="views-container" class:hidden>
	<div class="vids-container">
	{#each views as src}
		
			<video bind:currentTime={$curTime}
				   src={src} 
			></video>
	{/each}
	</div>
</div>