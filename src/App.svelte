<script lang="typescript">
  // Creates a Svelte store (https://svelte.dev/tutorial/writable-stores) that syncs with the named Traitlet in widget.ts and example.py.
  import { createValue, curTime, curKeypoint, tags} from './stores';
  import { onMount } from 'svelte';
  import Map from './Map.svelte';
  import MainVid from './MainVid.svelte';
  import Transcript from './Transcript.svelte'
  import WaveSurferControler from './WaveSurferControler.svelte'
  
  export let model;

  let gps = createValue(model, 'gps', '')
  let vidSrc= createValue(model, 'src', '')
  let transcriptSrc = createValue(model, 'transcript', '');
  let transcriptLang = createValue(model, 'transcript_lang', '')
  let mapStyle = createValue(model, 'map_style', '')
  let duration = createValue(model, 'duration', '')

  let tagChecks;
  let quickTag;
  let shortcuts = "qwerasdfzxcvtyuighjk".slice(0,$tags.length)
  
  // hacky way of making python tag store acessible to all components and still reactive
  let tgs = createValue(model, 'tags', [])
  $tags = [...$tgs]
  $: {
    $tgs = [...$tags]
    // could othewise do "qwertasdfgzxcvb" or "qwerasdfzxcvtgbyhn..."
    shortcuts = "qwerasdfzxcvtyuighjk".slice(0,$tags.length)
  }

  // for async passing data to componenents when video loads
  let onCuesLoad;
  let onTimelineDataLoad;
  let onMapDataLoad;
  let selectNextTag
  let selectPreviousTag

  let map;
  let height;
  let topRow;

  // TODO: this is hacky and should be done properly with css?
  $:if (topRow){ topRow.style.height =`${height}px` }
  let transcript;
  let timeline;
  let widget;
  
  const handleTranscript = (vid) => {
    onCuesLoad(vid.detail) 

  }

  const handleTimeline = (vid) => {
    onTimelineDataLoad(vid.detail)
    if($gps){onMapDataLoad(vid.detail)}
  }

  // i think this is the best way to handle keyboard shortcuts when the widget is in focus
  // I could be totally wrong about that but it seems like you want to capture keypresses at then pass them to the relevent componenets?
  let onKeypress = (e) => {
      console.log(e)
      if(e.ctrlKey){
        switch (e.key) {
          case "q":
            quickTag = !quickTag
            break;
          default:
            break;
        }
      } else if( e.key == 'Tab'){
        e.preventDefault()
        e.shiftKey ? selectPreviousTag() : selectNextTag()
      }

      else{
        const idx = shortcuts.indexOf(e.key)
        if (quickTag && idx >=0){
          tagChecks.children[idx].firstElementChild.click()
            }
          }
    }

  onMount(() => {widget.onkeydown =  e => onKeypress(e) })
  
</script>


<style>
  .widget:focus {
    outline-width: 0;
    /*height: 90vh;*/
  }
  .container {
    display: flex;
    flex-direction: row;
    overflow: auto;
    min-height: 25vh;
  }

</style>

<div class="widget" bind:this={widget} tabindex="-1">
 <div class="container" bind:this={topRow}>
  <div>
      <MainVid src={$vidSrc}
               transcript={$transcriptSrc}
               transcript_lang={$transcriptLang}
               bind:height 
               on:trackLoaded={handleTranscript}
               on:durationLoaded|once={handleTimeline}/>
    </div>
    {#if $transcriptSrc}
      <Transcript bind:onCuesLoad/>
    {/if}
    {#if $gps}
      <Map gps={$gps} mapStyle={$mapStyle} bind:onMapDataLoad/>
    {/if}
  </div>
  <WaveSurferControler bind:onTimelineDataLoad 
                       tags={$tags} 
                       bind:tagChecks 
                       bind:quickTag 
                       bind:selectNextTag
                       bind:selectPreviousTag/>
</div>
