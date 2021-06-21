<script>
	import { curTime } from './stores';
	import nouislider from '@woden/svelte-nouislider'
	let selected=false
	let progress;
	let duration;
	export const onDataLoad = async (viddata) => {
		console.log(viddata)
		duration = viddata.duration
	}



	// $:if(progress) {updatePos($curTime)
	// const updatePos = (time) => {
	// 	console.log($curTime/duration)
	// 	progress.style.left=$curTime/duration
	// }
	// }

	
</script>

<style>
	.timeline{
		width: 100%;
		height: 40px;
		background-color: #d6a6a3;
		position: relative;
	}
	.progress{
		width: 3px;
		height: 100%;
		background-color: black;
		position: absolute;
		/*right:  0%;*/
	}
	.selected{
		height: 110%;
		background-color: green;

	}
	
</style>

<div class='timeline'>
	<div class='progress' 
		 class:selected 
		 bind:this={progress} 
		 ></div>
</div>