<script>
	import { curTime, curKeypoint, keypointDefined, timingObject } from './stores';
	import WaveSurfer from "wavesurfer.js";
	import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
	import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
	import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';
	import { onMount, onDestroy } from "svelte";
	import Tagbox from './Tagbox.svelte';

	let wavesurfer;//={regions:{list:[]}}
	let waveform;
	let vid;
	let regionPlayed;

	let pxSec=0;
	export let activeRegion;
	let previousRegion;
	let mouseover = false;

	export let tags
	export let tagChecks;
	export let quickTag;
	export let keypoints
	export let locked;

	$: console.log(activeRegion)

	export const onTimelineDataLoad = async (viddata) => {
		vid = viddata
		wavesurfer.load(vid)
	}

	export const updateZoom = (pxSec) => {wavesurfer.zoom(pxSec)}

	export const selectNextTag = () => {
		const sorted = Object.values(wavesurfer.regions.list).sort((a,b)=>{return a.start-b.start})
		curKeypoint.resetKeypoint();
		const tempKeypoint = sorted.find(region => region.start > previousRegion.start) || sorted[0]
		previousRegion = activeRegion;
		activeRegion = tempKeypoint;
		resetPreviousRegion()
		activeRegion.update({color: 'rgba(255, 255, 0, 0.4)'})
		previousRegion = activeRegion;
		// $curTime = activeRegion.start
		$timingObject.update({position:activeRegion.start})
	}

	export const selectPreviousTag = () => {
		const sorted = Object.values(wavesurfer.regions.list).sort((a,b)=>{return b.start-a.start})
		curKeypoint.resetKeypoint();
		const tempKeypoint = sorted.find(region => region.start < previousRegion.start) || sorted[0]
		previousRegion = activeRegion;
		activeRegion = tempKeypoint;
		resetPreviousRegion()
		activeRegion.update({color: 'rgba(255, 255, 0, 0.4)'})
		previousRegion = activeRegion;
		// $curTime = activeRegion.start
		$timingObject.update({position:activeRegion.start})
	}

	// const keypointsToRegions = (keypointsList) => {
	// 	keypointsList.forEach((keypoint)=>{
	// 		if(keypoint.id in wavesurfer.regions.list){

	// 		}
	// 	})

	// }

	const updateData = (keypoint, region) => {
		if(keypoint.type=='tag'){
			region.data.tags=[...region.data.tags, keypoint.value]
		} else if (keypoint.type=='comment'){
			region.data.comments = keypoint.value
		}
	}

	export const syncKeypoints = () => {
		wavesurfer.clearRegions()
		keypoints.forEach((keypoint)=>{
			if(keypoint.id in wavesurfer.regions.list){
				const region= wavesurfer.regions.list[keypoint.id]
				updateData(keypoint, region)
			} else{
				const region = wavesurfer.addRegion({
									start: keypoint.start,
									end: keypoint.end,
									color: 'rgba(255, 200, 0, 0.4)',
									id: keypoint.id,
									data: {
										color: 'rgba(255, 200, 0, 0.4)',
										saved: true,
										tags: [],
										comments:''
									}
								});
				updateData(region)
			}
		})
	}

	const regionsToKeypoints = (regions) => {
		return Object.entries(regions).filter(([id,region]) => region.data && region.data.saved)
									  .flatMap(([id,region])=>{
											const { start, end, data:{tags=[]},data:{comments} } = region
											const shared = {id, start, end, src:$curKeypoint.src, author:$curKeypoint.author}
											const tagValues = tags.map(tag => Object.assign({value:tag, type:'tag'}, shared))
											return [...tagValues, Object.assign({value:comments, type:'comment'}, shared)]
										})
	}

	// $: if(wavesurfer && activeRegion && (activeRegion.start !== $curKeypoint.start || activeRegion.end !== $curKeypoint.end) ){ 
	// 	console.log('here')
	// 	activeRegion.update({start: $curKeypoint.start, end: $curKeypoint.end})
	// 	// https://svelte.dev/tutorial/updating-arrays-and-objects
	// 	activeRegion = activeRegion;
	// 	previousRegion = activeRegion;

	// }
	$: if(wavesurfer && !activeRegion && $curKeypoint.start){
		console.log('here2')
		activeRegion = wavesurfer.addRegion({
								start: $curKeypoint.start,
								end: $curKeypoint.end,
								color: 'rgba(255, 255, 0, 0.4)',
								id: $curKeypoint.id});
	}

	export const deleteTag = () => {
		// if(locked.size){
			// curKeypoint.resetKeypointTimes()
		// } else {
			curKeypoint.resetKeypoint()
		// }
		 const temp = activeRegion
		 temp.remove();
		 activeRegion=null;
		 keypoints = regionsToKeypoints(wavesurfer.regions.list)
	}

	export const saveTag = () => {
		activeRegion.update({
			color:'rgba(255, 200, 0, 0.4)',
			id: $curKeypoint.id || activeRegion.id,
			data: {
				color: 'rgba(255, 200, 0, 0.4)',
				tags:  $curKeypoint.tags,
				comments: $curKeypoint.comments,
				saved: true
			}
		})
		// console.log(wavesurfer.regions.list)
		activeRegion = null
		keypoints = regionsToKeypoints(wavesurfer.regions.list)
		// keypoints = [...keypoints, Object.assign({},$curKeypoint)]
		// if(locked.size){
			// curKeypoint.resetKeypointTimes()
		// } else {
			curKeypoint.resetKeypoint()
		// }
		activeRegion = null

	}
		

	const resetPreviousRegion = () => {
		if(previousRegion){ 
			previousRegion.update({color: previousRegion.data.color || 'rgba(0, 0, 0, 0.1)'}) 
		}
	}
	
	onDestroy(async () => {
		console.log('here')
		wavesurfer.destroy()
		curKeypoint.resetKeypoint()
		activeRegion = null;
	})

	onMount(async () => {
		curKeypoint.resetKeypoint()
		activeRegion=null
		console.log('mounted')
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
	      RegionsPlugin.create({dragSelection:true, color: 'rgba(255, 255, 0, 0.4)' })
	      	]
	    });
		// wavesurfer.on('loading', (e)=>{console.log(e)})
		wavesurfer.on('waveform-ready', ()=>{
			console.log('ready')
			window.wavesurfer = wavesurfer
			// TODO: this is a hacky fix, do better
			pxSec = 1;
			// slider.min= wavesurfer.params.minPxPerSec;
			wavesurfer.zoom(pxSec)
		})
		wavesurfer.on('error', (err)=>{console.log(err)})

		wavesurfer.on('region-click', (region, e) => {
			resetPreviousRegion() 
			region.update({color: 'rgba(255, 255, 0, 0.4)'})
			activeRegion = region;
			$curKeypoint.start = region.start;
			$curKeypoint.end = region.end;
			if(region.data){
				$curKeypoint.tags = region.data.tags || [];

				$curKeypoint.comments = region.data.comments	
			}
			previousRegion = region
			// TODO have stop at end or region now that using timingsrc
			if(e.shiftKey){ 
				e.stopPropagation();
				$timingObject.update({position: region.start, velocity: 1})
				regionPlayed = region;

			}
		});

		wavesurfer.on('region-updated', (region) => {
			if (region === activeRegion){
				$curKeypoint.start = region.start;
				$curKeypoint.end = region.end;
				// hacky way to ensure id from interaction with wavesurfer
				if(mouseover){
					$curKeypoint.id = region.id
				}
			}
			// activeRegion = region;
		});

		wavesurfer.on('region-update-end', (region) => {
			keypoints = regionsToKeypoints(wavesurfer.regions.list)
			previousRegion = activeRegion;})

		wavesurfer.on('region-created', (region) => { 
			
			resetPreviousRegion()
			// if(locked.size){
				// do think to handle locked kps
			// } else {
				$curKeypoint.tags=[]
			// }
			activeRegion = region;
			$curKeypoint.id  = $curKeypoint.id || region.id
		})

		wavesurfer.on('region-out', (region) => {
			if(region == regionPlayed){$timingObject.update({velocity:0})}
			regionPlayed=null;
		})
		wavesurfer.on('seek', (pos)=>{ $timingObject.update({ position: pos * wavesurfer.getDuration()}) })
		wavesurfer.on('region-mouseenter', (e)=>{mouseover=true})
		wavesurfer.on('region-mouseleave', (e)=>{mouseover=false})
		// wavesurfer.drawer.on('click', (e) => { console.log(e) })
	})
</script>

<style>

</style>

<div>
<div bind:this={waveform} style="position: relative;"/>
<!-- <input on:mouseup={()=> wavesurfer.zoom(pxSec)} type="range" min="0" max="500" bind:value={pxSec} style="width: 100%"/>
<span>px/sec: {pxSec}</span> -->
</div>


<!-- <button on:click={()=>{console.log(wavesurfer.regions, curKeypoint.getValues(), activeRegion, previousRegion) }}> vals</button> -->

