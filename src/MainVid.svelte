<script>
	import { curTime } from './stores';
	import { onMount } from 'svelte';
	let vid;
	let container;
	export let height;
	export let src;
	export let transcript;
	export let transcript_lang;
	export const togglePlay = () => {vid.paused? vid.play(): vid.pause()}
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()

	onMount(async () => {
		new ResizeObserver(() => height = container.clientHeight).observe(container);
		// this is a weird hack and should probably be done correctly
		container.style.width="500px"
	})

	const setupCues = () => {
		vid.textTracks[0].mode='hidden'
		dispatch('trackLoaded', vid)
	}

	const vidData = () => { 
		dispatch('durationLoaded', vid) 
	}

</script>
<style>
	video {
			height: 100%;
			width: 100%;
	    max-width: none;
    }
    .mainVid{
	    resize: horizontal;
	    overflow: auto;
	    /*height: 30vh;*/
	    /*width: 50%;*/
	    flex: 1000 1000 auto;
	    background-color: #dbdbdb;
  }
</style>
<div>
<div class='mainVid' bind:this={container}>
 <video
  bind:currentTime={$curTime}
  bind:this={vid} 
  on:loadedmetadata|once={vidData}
	src={src}
	>
	{#if transcript}
	<track on:load={setupCues}
	     kind="captions"
	     type="text/vtt"
	     crossorigin="anonymous"
		 src={transcript}
		 srclang={transcript_lang}
		 default
		 >
	{/if}
</video>
</div>
</div>