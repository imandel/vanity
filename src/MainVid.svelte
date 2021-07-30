<script>
	import { curTime, timingObject } from './stores';
	import { onMount } from 'svelte';
	import { setTimingsrc } from 'timingsrc';
	let vid;
	let container;
	export let height;
	export let src;
	export let transcript;
	export let transcript_lang;
	export let volume=1;

	// export let timeSource;
	import {createEventDispatcher} from 'svelte'
	const dispatch = createEventDispatcher()

	onMount(async () => {
		new ResizeObserver(() => height = container.clientHeight).observe(container);
		// this is a weird hack and should probably be done correctly
		container.style.width="500px"
	})

	const setupCues = () => {
		console.log('cues loaded')
		// vid.textTracks[0].mode='hidden'
		dispatch('trackLoaded', vid)
	}

	const vidData = () => { 
		console.log('vid loaded')
		dispatch('durationLoaded', vid)
		setTimingsrc(vid, $timingObject);
		vid.textTracks[0].mode='hidden'

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
	    background-color: black;
  }
</style>
<div>
<div class='mainVid' bind:this={container}>
	 <video
		  bind:this={vid}
		  bind:volume
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