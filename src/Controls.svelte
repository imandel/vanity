<script>
	import { curTime } from './stores';
	import { onMount } from 'svelte';
	import DoubleRangeSlider from './DoubleRangeSlider'

	let start;
	let end;
	let vid;
	let duration

	export const onDataLoad = async (viddata) => {
		vid = viddata
	}


</script>

<style>
	.controls{
		/*width: 100%;*/
		height: 40px;
		background-color: #d6a6a3;
		position: relative;
	}
	.selected{
		height: 110%;
		background-color: green;

	}
	
</style>

<div class='controls'>
<DoubleRangeSlider 
	bind:start 
	bind:end
	bind:duration={vid.duration}
	/>
</div>