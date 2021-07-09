<script lang="typescript">
  // Creates a Svelte store (https://svelte.dev/tutorial/writable-stores) that syncs with the named Traitlet in widget.ts and example.py.
  import { createValue, curTime, curKeypoint } from './stores';
  import Map from './Map.svelte';
  import MainVid from './MainVid.svelte';
  import Transcript from './Transcript.svelte'
  // import Timeline from './Timeline.svelte'
  import WaveSurferControler from './WaveSurferControler.svelte'
  
  export let model;

  let gps = createValue(model, 'gps', '')
  let vidSrc= createValue(model, 'src', '')
  let transcriptSrc = createValue(model, 'transcript', '');
  let transcriptLang = createValue(model, 'transcript_lang', '')
  let mapStyle = createValue(model, 'map_style', '')
  let duration = createValue(model, 'duration', '')


  let map;
  let height;
  let topRow;
  $:if (topRow){ topRow.style.height =`${height}px` }
  let transcript;
  let timeline;
  
  const handleTranscript = (vid) => {
    transcript.onDataLoad(vid.detail) 

  }

  const handleTimeline = (vid) => {
    timeline.onDataLoad(vid.detail)
    map.onDataLoad(vid.detail)
  }

</script>
<svelte:head>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css' rel='stylesheet' />
</svelte:head>
<style>
  .widget {
    /*height: 90vh;*/
  }
  .container {
    display: flex;
    flex-direction: row;
    overflow: auto;
    min-height: 25vh;
  }

</style>
<div class="widget">
 <div class="container" bind:this={topRow}>
  <div>
      <MainVid src={$vidSrc}
               transcript={$transcriptSrc}
               transcript_lang={$transcriptLang}
               bind:height 
               on:trackLoaded={handleTranscript}
               on:durationLoaded|once={handleTimeline}/>
    </div>
    {#if transcriptSrc}
      <Transcript bind:this={transcript}/>
    {/if}
    {#if $gps}
      <Map gps={$gps} mapStyle={$mapStyle} bind:this={map}/>
    {/if}
  </div>
  <WaveSurferControler bind:this={timeline}/>
<!-- <button on:click={()=>{curKeypoint.resetKeypoint();}}> reset</button> -->
<!-- <button on:click={()=>{console.log(curKeypoint.getValues()) }}> vals</button> -->
  <!-- <Timeline bind:this={timeline} />
  <button on:click={()=> $curKeypoint.start= $curTime}> start</button>
  <button on:click={()=> $curKeypoint.end= $curTime}> end</button>
  <button on:click={()=> curKeypoint.resetKeypoint()}>reset</button>
  <span>{$curKeypoint.start}</span>
  <span>{$curKeypoint.end}</span> -->
</div>

