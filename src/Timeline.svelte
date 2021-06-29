<script>
	//TODO: handle get frame rate
	import { curTime, curKeypoint, keypointDefined } from './stores';
	import DoubleRangeSlider from './DoubleRangeSlider'
	import Icon from 'svelte-awesome';
  	import { stepBackward, stepForward, play, pause, rotateLeft, volumeUp } from 'svelte-awesome/icons';

	let duration;
	let start;
	let end;
	let vid = document.createElement('video')
	let paused = true
	let frameRate = 1/25;
	let showVolume = false

	// $: console.log($keypointDefined)

	export const onDataLoad = async (viddata) => {
		vid = viddata
		duration = viddata.duration
	}

	let speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]
	let speed = 1
	vid.PlaybackRate=1


	// https://svelte.dev/tutorial/media-elements
	// TODO: format for more than an hour
	const format = (seconds) => {
		if (isNaN(seconds)) return '...';

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);
		if (seconds < 10) seconds = '0' + seconds;

		return `${minutes}:${seconds}`;
	}

	const pausePlay = () => {
		paused ? vid.play() : vid.pause()
		paused = !paused
	}

	const changeFrame = (direction) => {
		direction>0 ? $curTime+=frameRate : $curTime-=frameRate
	}

</script>

<style>
	.controls{
		height: 40px;
		margin: 10px;
		display: flex;
		align-items: center;
	}

	.dropdown{
	    width: 3.6em;
	}

	.container{
		height: 30px;
		display: inline-flex;
		align-items: center;
		width: 20%;
	}

	.child{
		height: 100%;
	}

	.volume{
		width: 70px;
		display: none;
	}
	.showVolume{
		display: inline-block;
	}
	label{
		margin: 0;
	}


</style>

<div class='controls'>
	<div style="width: 80%; margin: 5px;">
		<DoubleRangeSlider 
		bind:start 
		bind:end
		bind:duration
		/>
	</div>
	<div style="width: 30%; margin: 5px">
		
		<div class='container'> 
			<div>{`${format($curTime)} / ${format(duration)}`}</div>
			<button class='child' on:click={()=> changeFrame(-1)}><Icon class='icon' data={stepBackward}/></button>
			<button class='child' on:click={pausePlay}><Icon class='icon' data={paused ? play : pause}/></button>
			<button class='child' on:click={()=> changeFrame(1)}><Icon class='icon' data={stepBackward}/></button>
			<button class='child' disabled={!$keypointDefined.full}><Icon class='icon' data={rotateLeft}/></button>
			<select class='dropdown child' bind:value={vid.playbackRate}>
				<option hidden>Speed</option>
				{#each speeds as speedLevel, i}
				<option value={speedLevel}>
						{speedLevel}
				</option>
				{/each}
			</select>
			<div style='display: flex; align-items: center;'
				 on:mouseenter={()=> showVolume=!showVolume}
				 on:mouseleave={()=> showVolume=!showVolume}>
				<label>
					<Icon class='icon' data={volumeUp}/>
					<input class='volume' class:showVolume min='0' max='1' step='0.01' type="range" bind:value={vid.volume}>
				</label>
			</div>
		</div>
	</div>
</div>