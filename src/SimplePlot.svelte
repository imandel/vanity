<script lang="ts">
  import { Vega } from "svelte-vega";
  import data from "./temp_data_0.json";
  import spec1 from "./spec1.ts";
  import type { View } from "svelte-vega";
  import { onDestroy, onMount } from "svelte";

  export let width;
  let viewV: View;

  $: console.log(width)
  $: spec = {
    ...spec1,
    width,
  };
let i = 0
const t =() => {
  setInterval(()=>{
    viewV.signal("barPos", i)
    viewV.runAsync()
    i+=0.5
  }, 100)

  console.log(viewV)
}
</script>
<div style="display:block;">
  <div style="overflow: auto hidden;">
    <Vega {data} {spec} bind:view={viewV} on:onNewView={(v)=> {}} />
  </div>
</div>
  <!-- <input type="range" min="1" max="4000" bind:value={width} > -->
<!-- <button on:click={t}>ttt</button> -->
