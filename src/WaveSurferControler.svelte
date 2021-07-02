<script>
	import { curTime, curKeypoint, keypointDefined } from './stores';
	import WaveSurfer from "wavesurfer.js";
	// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';
	import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
	import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
	import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';
	import { onMount, onDestroy } from "svelte";

	let wavesurfer={regions:{list:[]}}
	let waveform;
	let vid;
	let timeline;
	let slider;
	let sliderVal=1;
	let activeRegion;
	let keepRegions = false;
	let regions = []


	export const onDataLoad = async (viddata) => {
		vid = viddata
		wavesurfer.load(vid)
	}

	// $: if($keypointDefined.end){
	// 		activeRegion = wavesurfer.addRegion({
	// 							start: $curKeypoint.start,
	// 							end: $curKeypoint.end
	// 						 });
	// 		// console.log(activeRegion)
	// }

	$: console.log(activeRegion)


	// $: console.log($curKeypoint, $keypointDefined.end)
	// $: console.log(wavesurfer.regions.list);

	// $: if(wavesurfer && !wavesurfer.regions && keypointDefined.start){
	// 	console.log(wavesurfer.regions.list)
	// 	let r  = wavesurfer.addRegion({start: $curKeypoint.start,
	// 						  end: $curKeypoint.end})
	// 		console.log(r)
	// }
	// $: if(wavesurfer && !$keypointDefined.start){
	// 		console.log('here')
	// 		console.log($curKeypoint)
			// let r  = wavesurfer.addRegion({start: $curKeypoint.start,
			// 				  end: $curKeypoint.end})
			// console.log(r)
	// 	}


	onMount(async () => {
	    wavesurfer = WaveSurfer.create({
	      container: waveform,
	      waveColor: "#76a9fa",
	      progressColor: "#1e429f",
	      cursorColor: "#1e429f",
	      height: 50,
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
	      MinimapPlugin.create(
	      	{
            container: timeline,
            waveColor: '#777',
            progressColor: '#222',
            height: 20
        }),
	      RegionsPlugin.create({dragSelection:true})
	      	]
	    });
		wavesurfer.on('loading', (e)=>{console.log(e)})
		wavesurfer.on('waveform-ready', ()=>{
			console.log('ready')
			sliderVal = 1;
			// slider.min= wavesurfer.params.minPxPerSec;
			wavesurfer.zoom(sliderVal)
		})
		wavesurfer.on('error', (err)=>{console.log(err)})

		wavesurfer.on('region-click', (region, e) => {
			if(e.shiftKey){ 
				e.stopPropagation();
				region.play();
				activeRegion = region;
			}
		});

		wavesurfer.on('region-updated', (region) => {
			$curKeypoint.start = region.start;
			$curKeypoint.end = region.end;
			console.log('updated')
		});

		wavesurfer.on('region-update-end', (region) => {
			activeRegion = region;
			console.log('end')

		})
		
	})

</script>
<div>
<div bind:this={waveform} style="position: relative;"/>
<div bind:this={timeline}></div>
<input on:mouseup={()=> wavesurfer.zoom(sliderVal)} type="range" min="0" max="500" bind:value={sliderVal} style="width: 100%" bind:this={slider}/>
<span>px/sec: {sliderVal}</span>
</div>
<button on:click={()=>{console.log($keypointDefined)}}> here</button>
<button on:click={()=>{curKeypoint.resetKeypoint(); wavesurfer.clearRegions()}}> reset</button>
<button on:click={()=>{console.log(wavesurfer.regions); console.log(curKeypoint.getValues()) }}> vals</button>
<button on:click={()=>{console.log(wavesurfer.regions); console.log(curKeypoint.getValues()) }}> vals</button>
<span>{$keypointDefined.end ? "set": "notset"}</span>