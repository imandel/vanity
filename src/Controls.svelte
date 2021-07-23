<script>
	import { onMount } from 'svelte';
	import { curTime, curKeypoint, keypointDefined, timingObject } from './stores';


	export let velocity;
	export let position;
	export let volume=1;
	export let updateZoom;

	export const updatePos = (timeDelta) => {
		const newTime = Math.max($timingObject.query().position + timeDelta, 0)
		$timingObject.update({position: newTime})
	}
	let pxSec=0;
	let previousVelocity=1;
	let speeds = [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2, 4, 8]
	let volHidden = true;
	let zoomHidden = true;
	


</script>

<style>
	.hidden {
		display: none;
	}
	input[type="range"] { 
		transform: rotate(90deg);
		transform-origin: left;
		width: 70px;
		/*position: absolute;*/
	 }

	 .popup {
	 	position: absolute;
	 	display: inline-block;
	 }
</style>
<button on:click={()=>{updatePos(-10)}}> &lt&lt </button>
<button on:click={()=>{updatePos(-0.03333333333)}}> &lt </button>
<button on:click={()=>{velocity ? $timingObject.update({velocity:0}) : $timingObject.update({velocity:previousVelocity})}}>{velocity ? 'pause' : 'play'}</button>
<button on:click={()=>{updatePos(0.03333333333)}}> &gt; </button>
<button on:click={()=>{updatePos(10)}}> &gt;&gt; </button>
<select bind:value={previousVelocity} on:change={()=>{if(velocity){$timingObject.update({velocity:previousVelocity})}}}>
	{#each speeds as speed}
		<option value={speed}>{speed}</option>
	{/each}
</select>
<span>{new Date(position*1000).toISOString().substr(11, 8)}</span>
<div style="display: inline-block;" on:mouseover={()=>{volHidden=false;}} on:mouseout={()=>{volHidden=true;}}>🔈 <div class="popup" class:hidden={volHidden}><input type="range" min="0" max="1" step="0.01" bind:value={volume}><span>{volume}</span></div></div>
<div style="display: inline-block;" on:mouseover={()=>{zoomHidden=false;}} on:mouseout={()=>{zoomHidden=true;}}>🔍 <div class="popup" class:hidden={zoomHidden}><input on:mouseup={()=>{updateZoom(pxSec)}} type="range" min="0" max="500" step="1" bind:value={pxSec}><span>{pxSec}</span></div></div>
