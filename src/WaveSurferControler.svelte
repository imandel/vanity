<script>
	import { curKeypoint, keypointDefined, timingObject } from './stores';
	import WaveSurfer from "wavesurfer.js";
	import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
	import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
	import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.js';
	import { onMount, onDestroy } from "svelte";
	import Tagbox from './Tagbox.svelte';

	let wavesurfer
	let waveform;
	let vid;
	let regionPlayed;

	let pxSec=0;
	export let activeRegion;
	let previousRegion;
	let mouseover = false;
	export let hideSaved = false;
	export let keypoints
	export let review
	let actionState = false;
	// todo fix this
	// export let locked;
	let toggleHideSaved = () => {}

	$: toggleHideSaved(hideSaved)

	$: if(wavesurfer && $curKeypoint.start){
		if(activeRegion && (activeRegion.start !== $curKeypoint.start || activeRegion.end !== $curKeypoint.end) ){
				activeRegion.update({start: $curKeypoint.start, end: $curKeypoint.end})
			} else if(!activeRegion){
				activeRegion = wavesurfer.addRegion({
							start: $curKeypoint.start,
							end: $curKeypoint.end,
							color: 'rgba(255, 255, 0, 0.4)',
							id: $curKeypoint.id});
				activeRegion = activeRegion;
				previousRegion = activeRegion;
			}
		}

	export const onTimelineDataLoad = async (viddata) => {
		vid = viddata
		wavesurfer.load(vid)
	}

	export const updateZoom = (pxSec) => {wavesurfer.zoom(pxSec)}

	export const selectNextTag = (direction) => {
		let sorted;
		let nextRegion;
		let visible = Object.values(wavesurfer.regions.list).filter(region => region.element.style.visibility !== 'hidden');
		if(direction === 'forward') {
			sorted = visible.sort((a,b)=>{return a.start-b.start})
			nextRegion = sorted.find(region => region.start > previousRegion.start) || sorted[0]
		} else if (direction==='reverse') {
			sorted = visible.sort((a,b)=>{return b.start-a.start})
			nextRegion = sorted.find(region => region.start < previousRegion.start) || sorted[0]
		}
		setActiveRegion(nextRegion)
		$timingObject.update({position:activeRegion.start})
	}

	const updateData = (keypoint, region) => {
		if(keypoint.type=='tag'){
			region.data.tags=[...region.data.tags, keypoint.value]
		} else if (keypoint.type=='comment'){
			region.data.comments = keypoint.value
		}
	}

	export const syncKeypoints = () => {
		wavesurfer.clearRegions()
		window.review = review
		const tempKeypoints = Object.values(keypointsToRegions(keypoints, true))
		const tempReview = Object.values(keypointsToRegions(review, false))
		const combined = [...tempKeypoints, ...tempReview]
		combined.forEach((keypoint)=>{
			const region = wavesurfer.addRegion(keypoint)
			region.update({drag: false, resize: false})
			activeRegion=null
			curKeypoint.resetKeypoint()
		})
	}

	const keypointsToRegions = (keypointArray, saved) =>{
		const outObj = {}
		const color = saved? 'rgba(255, 200, 0, 0.4)' : 'rgba(0, 0, 0, 0.1)'
		keypointArray.forEach((keypoint)=>{
			let region;
			if(keypoint.id in outObj){
				region= outObj[keypoint.id]
			} else {
				region = {  start: keypoint.start,
							end: keypoint.end,
							color: color,
							id: keypoint.id,
							data: {
								color: color,
								saved: saved,
								tags: [],
								comments:'',
								author: keypoint.author || ''

							}
						};
				outObj[keypoint.id]=region
			}
			updateData(keypoint, region)
		})
		return outObj;
	}

	const regionsToKeypoints = (regions) => {
		return Object.entries(regions).filter(([id,region]) => region.data && region.data.saved)
									  .flatMap(([id,region])=>{
											const { start, end, data:{tags=[]},data:{comments},data:{author=''} } = region
											const shared = {id, start, end, author, src:$curKeypoint.src}
											const tagValues = tags.map(tag => Object.assign({value:tag, type:'tag'}, shared))
											return [...tagValues, Object.assign({value:comments, type:'comment'}, shared)]
										})
	}

	export const tagAction = (action) => {
		actionState=true;
		switch(action){
			case 'save':
				saveTag()
				break;
			case 'delete':
				deleteTag()
				break;
			default:
				break;
		}
		actionState = false;
	}

	export const setActiveRegion = (region) => {
		if(typeof region === 'string'){
			// allow for id or region
			region= wavesurfer.regions.list[region]
		}
		resetPreviousRegion() 
		region.update({color: 'rgba(255, 255, 0, 0.4)', drag:true, resize:true})
		activeRegion = region;
		$curKeypoint.start = region.start;
		$curKeypoint.end = region.end;
		$curKeypoint.id = region.id;
		if(region.data){
			$curKeypoint.tags = region.data.tags || [];

			$curKeypoint.comments = region.data.comments	
		}
		previousRegion = region
		return activeRegion
	}

	const deleteTag = () => {

		review = review.filter( kp  =>  kp.id !== activeRegion.id);
		// if(locked.size){
			// curKeypoint.resetKeypointTimes()
		// } else {
			curKeypoint.resetKeypoint()
		// }
		 const temp = activeRegion
		 temp.remove();
		 // activeRegion=null;
		 keypoints = regionsToKeypoints(wavesurfer.regions.list)
		 activeRegion=null;
	}

	const saveTag = () => {
		review = review.filter( kp  =>  kp.id !== activeRegion.id);
		activeRegion.update({
			color:'rgba(255, 200, 0, 0.4)',
			id: $curKeypoint.id || activeRegion.id,
			drag: false,
			resize: false,
			data: {
				color: 'rgba(255, 200, 0, 0.4)',
				tags:  $curKeypoint.tags,
				comments: $curKeypoint.comments,
				saved: true,
				author: $curKeypoint.author || ''
			}
		})
		if(hideSaved){activeRegion.element.style.visibility='hidden'}
		activeRegion = null
		keypoints = regionsToKeypoints(wavesurfer.regions.list)
		// keypoints = [...keypoints, Object.assign({},$curKeypoint)]
		// if(locked.size){
			// curKeypoint.resetKeypointTimes()
		// } else {
			curKeypoint.resetKeypoint()
		// }
		// activeRegion = null

	}
		

	const resetPreviousRegion = () => {
		if(previousRegion?.data?.saved){ 
			previousRegion.update({color: previousRegion.data.color, drag:false, resize:false}) 
		} else if(previousRegion){
			previousRegion.update({color: 'rgba(0, 0, 0, 0.1)'})
		}
	}

	onMount(async () => {
		curKeypoint.resetKeypoint()
		activeRegion=null
		wavesurfer = null
	    wavesurfer = WaveSurfer.create({
	      container: waveform,
	      waveColor: "#bab5ff",
	      progressColor: "#1e429f",
	      cursorColor: "#1e429f",
	      height: 30,
	      responsive: true,
	      normalize: true,
	      backend: 'MediaElement',
	      partialRender: true,
	      zoomDebounce: 100,
	      // hideScrollbar: true,
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

		wavesurfer.on('waveform-ready', ()=>{
			console.log('ready')
			syncKeypoints()
			activeRegion=null
			// TODO: this is a hacky fix, do better
			wavesurfer.zoom(1)
			wavesurfer.zoom(0)
			toggleHideSaved = (shown) => {
				if(shown){
					Object.values(wavesurfer.regions.list).filter((region) => region?.data?.saved && region!==activeRegion).forEach((region)=>region.element.style.visibility='hidden')
				} else {
					Object.values(wavesurfer.regions.list).forEach((region) => region.element.style.visibility='visible')
				}
			}
		})
		wavesurfer.on('error', (err)=>{console.log(err)})

		wavesurfer.on('region-click', (region, e) => {
			setActiveRegion(region);
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

	})
</script>

<style>
</style>

<div bind:this={waveform} style="position: relative;"/>