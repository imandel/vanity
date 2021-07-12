<script>
	import { onMount } from 'svelte';
	import { curTime, curKeypoint, keypointDefined, tags} from './stores';

	export let activeRegion
	import Toggle from "svelte-toggle";
	let start;
	let end;
	let container;
	let newLabel;
	let comments
	$: console.log($curKeypoint.comments)

	const addLabel = () => {
		if(newLabel){
				$tags = [...$tags, newLabel]
				newLabel = ''
				shortcuts = "qwerasdfzxcvtyuighjk".slice(0,$tags.length)
				}
	}

	const lockTag = (e) => {
		window.getSelection().empty(); 
 		e.path[0].click();
 		e.path[0].previousElementSibling.disabled= !e.path[0].previousElementSibling.disabled
 		e.path[0].click();
	}
	export let tagChecks;
	export let quickTag;
	let shortcuts = "qwerasdfzxcvtyuighjk".slice(0,$tags.length)

// the if for inputs is kinda hacky but ¯\_(°ペ)_/¯ 
</script>
<style>
	input[type="number"] { width: 90px; }
	textarea { width: 100%; }
	input[type="checkbox"]{ 
		vertical-align: middle;
		margin-bottom: 0px;
		margin-top: 0px;
	}
	input { 
		margin-right: 3px;
		margin-left: 3px; 
	}
	.bottom-container {
	    display: grid;
	    grid-template-columns: 1fr 1fr;
	    grid-gap: 10px;
	}
	.tagChecks {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
	}
	.hidden {
		visibility: hidden;
	}

</style>
<div class='bottom-container' bind:this={container}>
	<div class='keypoints'></div>
	<div class='tagbox'>
		{#if $keypointDefined.start}
		 <label>start:
		 	<input bind:value={$curKeypoint.start} type='number' min='0' max={$curKeypoint.end} step='0.01' placeholder={$curTime} />
		 </label>
		 {:else}
		 <label>start<input bind:value={start} type='number' min='0' step='0.01' placeholder={$curTime} /></label>
		 {/if}

		 {#if $keypointDefined.end}
		 <label>end:
		 	<input bind:value={$curKeypoint.end} type='number' min={$curKeypoint.start} step='0.01' placeholder="---"/>
		 </label>
		{:else }
		 <label>end<input bind:value={end} type='number' min='0' step='0.01' placeholder="---"/></label>
		{/if}
		<label>quick tag: <input bind:checked={quickTag} type='checkbox'/></label>
		<button>Save Tag</button>
		<button>Delete Tag</button>
		<div class='tagChecks' bind:this={tagChecks} >
		{#each $tags as tag, index}
			<div>
		 		<input type='checkbox' bind:group={$curKeypoint.tags} value={tag} id={tag}/>
		 		<label for={tag} on:dblclick={lockTag}>
		 			{tag} {quickTag? `[${[shortcuts[index]]}]`: ''}
			 	</label>
		 	</div>
		{/each}
			<div class:hidden={quickTag}>
				<input type="text" placeholder="new label" bind:value={newLabel} style="width:70px" /><button on:click={addLabel}>+</button>
			</div>
		</div>
		 	<textarea bind:value={$curKeypoint.comments} class:hidden={quickTag}></textarea>
		 
	</div>
</div>