<script>
	import { curTime, curKeypoint, keypointDefined } from './stores';
	export let tags;
	export let activeRegion
	let selected = [];
	let comments;
	let start;
	let end;

	$: console.log(selected)
	$ :console.log(comments)
	// $:{
	// 	start = +($curKeypoint.start || $curTime).toFixed(4)
	// 	end = +($curKeypoint.end || $curTime).toFixed(4)
	// }


// the if for inputs is kinda hacky but ¯\_(°ペ)_/¯ 
</script>

<style>
	input[type="number"] { width: 90px; }
	textarea { width: 100%; }
/*	.keypoints{

	}*/
	.bottom-container {
	    display: grid;
	    grid-template-columns: 1fr 1fr;
	    grid-gap: 10px;
	}
</style>
<div class='bottom-container'>
	<div class='keypoints'></div>
	<div class='tagbox'>
		{#if $keypointDefined.start}
		 <label>start:
		 	<input bind:value={$curKeypoint.start} type='number' min='0' max={$curKeypoint.end} step='0.01' placeholder={$curTime} />
		 </label>
		 <label>end:
		 	<input bind:value={$curKeypoint.end} type='number' min={$curKeypoint.start} step='0.01' placeholder="---"/>
		 </label>
		{:else }
		 <label>start<input bind:value={start} type='number' min='0' step='0.01' placeholder={$curTime} /></label>
		 <label>end<input bind:value={end} type='number' min='0' step='0.01' placeholder="---"/></label>
		{/if}
		<div class='tags' >
		{#each tags as tag}
		 	<label>
		 		<input type='checkbox' bind:group={selected} value={tag}/>
		 		{tag}
		 	</label>
		{/each}
		</div>
		 	<textarea bind:value={comments}></textarea>
		 <div>
			 <button>Save Tag</button>
			 <button>Delete Tag</button>
		 </div>
	</div>
</div>