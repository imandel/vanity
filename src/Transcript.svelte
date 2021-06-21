<script>
	import { onMount, tick } from 'svelte';
	import { curTime } from './stores';
	let cueData;
	let transcriptBox;
	let currentCue;
	export const onDataLoad = async (cues) => {
		cueData = [...cues]
		await tick()
		cueData.forEach((cue)=> {
			const activeNode = transcriptBox.childNodes[cue.id -1]
			cue.onenter = () => {
				currentCue= cue.id -1

				const middleOffset = transcriptBox.getBoundingClientRect().height / 2;
				transcriptBox.scrollTo({left: 0, top: activeNode.offsetTop - middleOffset, behavior: 'smooth' })
			}
		})
	}

	const selection = (e) => {
		if(window.getSelection().toString()){
			const selected = window.getSelection();
			const nodes = [selected.anchorNode.parentNode.closest('p').dataset, 
						   selected.focusNode.parentNode.closest('p').dataset]
			const start = Math.min(...nodes.map(node=> parseFloat(node.starttime)))
			const end = Math.max(...nodes.map(node=> parseFloat(node.endtime)))
			console.log(start, end)
			$curTime = start
		}
	}

</script>
<style>
	.transcript_container {
		flex: 1000 1000;
		padding: 0.5em;
		display: block;
		overflow: auto;
	}
	.activeLine {
		font-size: 1.2em;
		background-color: yellow;
}

</style>
<div class='transcript_container'
	 bind:this={transcriptBox}
	 on:mouseup={selection}
	 >

	 {#if cueData}
	 {#each cueData as cue, index}
	 <p on:click={(e) => $curTime = parseFloat(e.path[0].dataset.starttime)} 
	 	class:activeLine={index===currentCue}
	 	data-startTime={cue.startTime}
	 	data-endTime={cue.endTime}
	 >
	 	<b>{new Date(cue.startTime * 1000).toISOString().substr(11, 8)}-{new Date(cue.endTime * 1000).toISOString().substr(11, 8)}</b>: {cue.text};
	 </p>
	 {/each}
	 {/if}
</div>