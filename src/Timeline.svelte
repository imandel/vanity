<script>
	//TODO: handle get frame rate
	import { curTime, curKeypoint, keypointDefined } from './stores';
	import DoubleRangeSlider from './DoubleRangeSlider'

	let duration;
	let start;
	let end;
	let vid = document.createElement('video')
	let paused = true
	let frameRate = 1/25;

	$: console.log($keypointDefined)

	export const onDataLoad = async (viddata) => {
		vid = viddata
		duration = viddata.duration
	}

	let speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]
	let speed = 1
	vid.PlaybackRate=1


	// https://svelte.dev/tutorial/media-elements
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
	}
	
</style>

<div class='controls'>
	<DoubleRangeSlider 
	bind:start 
	bind:end
	bind:duration
	/>
	<span>{format($curTime)}</span>
	<button on:click={()=> changeFrame(-1)}>Previous Frame</button>
	<button on:click={pausePlay}>{paused ? 'play' : 'pause'}</button>
	<button on:click={()=> changeFrame(1)}>Next Frame</button>
	<button disabled={!$keypointDefined}>Loop Selection</button>
	<select bind:value={vid.playbackRate}>
		<option hidden>Speed</option>
		{#each speeds as speedLevel, i}
		<option value={speedLevel}>
				{speedLevel}
		</option>
		{/each}
	</select>
</div>