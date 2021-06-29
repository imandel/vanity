<script>
	import { curTime } from './stores';
	import { onMount } from 'svelte';
	let vid;
	let container;
	export let height;
	export let src;
	export let transcript;
	export let transcript_lang;
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()

	onMount(async () => {
		new ResizeObserver(() => height = container.clientHeight).observe(container);
	})

	const setupCues = () => {
		vid.textTracks[0].mode='hidden'
		dispatch('trackLoaded', vid.textTracks[0].cues)
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
	    /*height: 100%;*/
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
	controls>
	{#if transcript}
	<track on:load={setupCues}
	       kind="captions" 
				 src={transcript}
				 srclang={transcript_lang}
				 default
				 >
	{/if}
</video>
</div>
</div>