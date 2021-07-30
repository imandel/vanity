<script>
	import { onMount } from 'svelte';
	import { curKeypoint, keypointDefined, timingObject } from './stores';

	export let velocity;
	export let position;
	export let volume=1;
	export let hideSaved;
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
		margin-top: 12px;
		margin-left: -12px;
		cursor: pointer;
	    width: 100px !important;
	    -webkit-appearance: none;
	    z-index: 9000;
	    width:50px;
	    border: 1px solid #e6e6e6;
	    background-color: #e6e6e6;
	    background-image: -webkit-gradient(linear, 0% 0%, 0% 100%,from(#e6e6e6), to(#d2d2d2));
	    background-image: -webkit-linear-gradient(right, #e6e6e6, #d2d2d2);
	    background-image: -moz-linear-gradient(right, #e6e6e6, #d2d2d2);
	    background-image: -ms-linear-gradient(right, #e6e6e6, #d2d2d2);
	    background-image: -o-linear-gradient(right, #e6e6e6, #d2d2d2);
	    -webkit-border-radius: 20px;
     	-moz-border-radius: 20px;
     	border-radius: 20px;
     	overflow: hidden;
		/*position: absolute;*/
	 }

	 input[type="range"]:focus {
	 	border: 0 !imporant;
		outline: none !important;
	 }
	 input[type=range]::-webkit-slider-runnable-track {
	    box-shadow: none;
	    border: none;
	    background: transparent;
	    -webkit-appearance: none;
}

	input[type="range"].range::-webkit-slider-thumb {
     -webkit-appearance: none;
    	width: 10px;
    	height: 10px;
		background-color: #555;
    	background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#4DDBFF), to(#00CCFF));
    	background-image: -webkit-linear-gradient(right, #4DDBFF, #00CCFF);
    	background-image: -moz-linear-gradient(right, #4DDBFF, #00CCFF);
    	background-image: -ms-linear-gradient(right, #4DDBFF, #00CCFF);
    	background-image: -o-linear-gradient(right, #4DDBFF, #00CCFF);
    	-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
        -o-border-radius: 5px;
    }

	input[type="checkbox"]{ 
		vertical-align: middle;
		margin-bottom: 0px;
		margin-top: 0px;
	}
	 .popup {
	 	position: absolute;
	 	display: inline-block;
	 	z-index: 9000;
	 }
</style>
<div class='container'>
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
	<label>hide saved: <input type="checkbox" bind:checked={hideSaved}></label>

</div>
