<script>
	import { curTime, curKeypoint, keypointDefined } from './stores';
	import WaveSurfer from "wavesurfer.js";
	// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
	import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
	import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
	import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';
	import { onMount, onDestroy } from "svelte";
	import Tagbox from './Tagbox.svelte';

	let wavesurfer={regions:{list:[]}}
	let waveform;
	let vid;
	let timeline;
	let slider;
	let sliderVal=0;
	let activeRegion;
	let previousRegion;
	let keepRegions = false;
	let regions = []
	export let tags;
	export const onDataLoad = async (viddata) => {
		vid = viddata
		wavesurfer.load(vid)
	}

	$: if(activeRegion && (activeRegion.start !== $curKeypoint.start || activeRegion.end !== $curKeypoint.end) ){ 
		activeRegion.update({start: $curKeypoint.start, end: $curKeypoint.end})
		// https://svelte.dev/tutorial/updating-arrays-and-objects
		activeRegion = activeRegion;
		previousRegion = activeRegion;

	}
	$: if(!activeRegion && $curKeypoint.start){
		activeRegion = wavesurfer.addRegion({
								start: $curKeypoint.start,
								end: $curKeypoint.end,
								color: 'rgba(255, 255, 0, 0.4)'});
	}
	const resetPreviousRegion = () => {if( previousRegion){ previousRegion.update({color: 'rgba(0, 0, 0, 0.1)'}) }}
	
	onMount(async () => {
	    wavesurfer = WaveSurfer.create({
	      container: waveform,
	      waveColor: "#76a9fa",
	      progressColor: "#1e429f",
	      cursorColor: "#1e429f",
	      height: 30,
	      responsive: true,
	      normalize: true,
	      backend: 'MediaElement',
	      partialRender: true,
	      zoomDebounce: 100,
	      plugins: [
	      CursorPlugin.create({
	      	showTime: true,
            opacity: 1,
            customShowTimeStyle: {
                'background-color': '#000',
                color: '#fff',
                padding: '2px',
                'font-size': '10px'
            }
	      }),
	      // MinimapPlugin.create(
	      // 	{
       //      container: timeline,
       //      waveColor: '#777',
       //      progressColor: '#222',
       //      height: 20
       //  }),
	      RegionsPlugin.create({dragSelection:true,
	      						color: 'rgba(255, 255, 0, 0.4)' })
	      	]
	    });
		wavesurfer.on('loading', (e)=>{console.log(e)})
		wavesurfer.on('waveform-ready', ()=>{
			console.log('ready')
			// TODO: this is a hacky fix, do better
			sliderVal = 1;
			// slider.min= wavesurfer.params.minPxPerSec;
			wavesurfer.zoom(sliderVal)
		})
		wavesurfer.on('error', (err)=>{console.log(err)})

		wavesurfer.on('region-click', (region, e) => {
			resetPreviousRegion() 
			region.update({color: 'rgba(255, 255, 0, 0.4)'})
			activeRegion = region;
			$curKeypoint.start = region.start;
			$curKeypoint.end = region.end;
			previousRegion = region
			if(e.shiftKey){ 
				e.stopPropagation();
				region.play();
			}
		});

		wavesurfer.on('region-updated', (region) => {
			if (region === activeRegion){
				$curKeypoint.start = region.start;
				$curKeypoint.end = region.end;
			}
			// activeRegion = region;
		});

		wavesurfer.on('region-update-end', (region) => {
			previousRegion = activeRegion;})

		wavesurfer.on('region-created', (region) => { 
			resetPreviousRegion() 
			activeRegion = region;

		})
	})
</script>
<div>
<div bind:this={waveform} style="position: relative;"/>
<div bind:this={timeline}></div>
<input on:mouseup={()=> wavesurfer.zoom(sliderVal)} type="range" min="0" max="500" bind:value={sliderVal} style="width: 100%" bind:this={slider}/>
<span>px/sec: {sliderVal}</span>
</div>
<Tagbox tags={tags} activeRegion={activeRegion}/>

<!-- <button on:click={()=>{console.log($keypointDefined)}}> here</button>
 --><button on:click={()=>{curKeypoint.resetKeypoint(); wavesurfer.clearRegions(); activeRegion = null}}> reset</button>
<button on:click={()=>{console.log(wavesurfer.regions, curKeypoint.getValues(), activeRegion, previousRegion) }}> vals</button>
<!-- <span>{$keypointDefined.end ? "set": "notset"}</span> -->