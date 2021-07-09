<script>
	import { curTime, curKeypoint, keypointDefined } from './stores';
	export let tags;
	export let activeRegion
	let selected = [];
	let start;
	let end;

	// $:{
	// 	start = +($curKeypoint.start || $curTime).toFixed(4)
	// 	end = +($curKeypoint.end || $curTime).toFixed(4)
	// }


</script>
{#if $keypointDefined.start}
 <label>start<input bind:value={$curKeypoint.start} type='number' min='0' max={$curKeypoint.end} step='0.01' placeholder={$curTime} /></label>
 <label>end<input bind:value={$curKeypoint.end} type='number' min={$curKeypoint.start} step='0.01' placeholder="---"/></label>
{:else }
 <label>start<input bind:value={start} type='number' min='0' step='0.00001' placeholder={$curTime} /></label>
 <label>end<input bind:value={end} type='number' min='0' step='0.00001' placeholder="---"/></label>
{/if}

{#each tags as tag}
 	<label><input type='checkbox' bind:group={selected} value={tag}/>{tag}</label>
{/each}
 <label>comments<textarea></textarea></label>
 <button>Save Tag</button>
 <button>Delete Tag</button>