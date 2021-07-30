<script>
	import { onMount } from 'svelte';
	import { curKeypoint, keypointDefined} from './stores';

	// export let activeRegion
	export let locked = new Set();
	export let tags;
	export let velocity;
	export let position;
	let start;
	let end;
	let newLabel;
	let comments;
	// $: console.log($curKeypoint)
	const addLabel = () => {
		if(newLabel){
				tags = [...tags, newLabel]
				newLabel = ''
				shortcuts = "qwerasdfzxcvtyuighjk".slice(0,tags.length)
				}
	}

	const lockTag = (e) => {
		window.getSelection().empty(); 
 		const cBox = e.path[0].closest('div').querySelector('input')
 		if(cBox.disabled){
 			cBox.disabled= false;
 			cBox.checked = true
 			cBox.click()
 			locked.delete(cBox.value)
 			locked = locked;
 		} else {
 			cBox.checked = false
 			cBox.click()
 			cBox.disabled = true;
 			locked.add(cBox.value)
 			locked = locked;
 		}
	}

	export let tagChecks;
	export let quickTag;
	let shortcuts = "qwerasdfzxcvtyuighjk".slice(0,tags.length)

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
/*	.bottom-container {
	    display: grid;
	    grid-template-columns: 1fr 1fr;
	    grid-gap: 10px;
	}*/
	.tagChecks {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
	}
	.hidden {
		visibility: hidden;
	}
	input[type="checkbox"]:disabled+label {
	  color: #1e429f;
	  font-weight: bolder;
	}
	textarea {
		resize: vertical;
	}
	.topRow {
		background-color: #d6d3ff;
		padding-left: 10px;
    	padding-bottom: 2px;
    	padding-top: 8px;
    	margin-bottom: 6px;
	}

</style>

	<div class='tagbox'>
		<div class="topRow">
		{#if $keypointDefined.start}
		 <label>start:
		 	<input bind:value={$curKeypoint.start} type='number' min='0' max={$curKeypoint.end} step='0.01' placeholder={position} />
		 </label>
		 {:else}
		 <label>start<input bind:value={start} type='number' min='0' step='0.01' placeholder={position} /></label>
		 {/if}

		 {#if $keypointDefined.end}
		 <label>end:
		 	<input bind:value={$curKeypoint.end} type='number' min={$curKeypoint.start} step='0.01' placeholder="---"/>
		 </label>
		{:else }
		 <label>end<input bind:value={end} type='number' min='0' step='0.01' placeholder="---"/></label>
		{/if}
		<label>quick tag: <input bind:checked={quickTag} type='checkbox'/></label>
		<slot></slot>
		</div>
		<div class='tagChecks' bind:this={tagChecks} >
		{#each tags as tag, index}
			<div on:dblclick={lockTag}>
		 		<input type='checkbox' bind:group={$curKeypoint.tags} value={tag} id={tag}/>
		 		<label for={tag}>
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