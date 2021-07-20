<script lang="typescript">
  // Creates a Svelte store (https://svelte.dev/tutorial/writable-stores) that syncs with the named Traitlet in widget.ts and example.py.
  import { createValue, curKeypoint, tags, timingObject } from './stores';
  import { onMount } from 'svelte';
  import Map from './Map.svelte';
  import MainVid from './MainVid.svelte';
  import Transcript from './Transcript.svelte'
  import WaveSurferControler from './WaveSurferControler.svelte'
  import Views from './Views.svelte'

  export let model;

  let gps = createValue(model, 'gps', '')
  let vidSrc= createValue(model, 'src', '')
  let transcriptSrc = createValue(model, 'transcript', '');
  let transcriptLang = createValue(model, 'transcript_lang', '')
  let mapStyle = createValue(model, 'map_style', '')
  let duration = createValue(model, 'duration', '')
  let views = createValue(model, 'views', [])
  let author = createValue(model, 'author', '')

  let vid;
  const togglePlay = () => {
    console.log($timingObject.query().velocity)
    $timingObject.query().velocity ? $timingObject.update({velocity:0}): $timingObject.update({velocity:1})
  }

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

  $: console.log($curKeypoint)

  // for async passing data to componenents when video loads
  let onCuesLoad;
  let onTimelineDataLoad;
  let onMapDataLoad;
  let selectNextTag
  let selectPreviousTag
  let saveTag;
  let deleteTag;

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
  // do we want to "take up" the tab key like this?
  let onKeypress = (e) => {
      console.log(e)
      if(e.ctrlKey){
        switch (e.code) {
          case "KeyQ":
            quickTag = !quickTag
            break;
          case "KeyS":
            saveTag()
            break;
          case "Backspace":
            deleteTag()
          default:
            break;
        }
      } else if(e.shiftKey){
        switch(e.key){
          case " ":
            e.preventDefault()
            togglePlay() 
            break;
          case "Tab":
            e.preventDefault();
            selectPreviousTag()
            break;
          default: 
            break;
        }
      }
      else{
        const idx = shortcuts.indexOf(e.key)
        if(e.key == "Tab") {e.preventDefault(); selectNextTag() }
        
        else if (quickTag && idx >=0){ tagChecks.children[idx].firstElementChild.click() }
          }
    }

  onMount(() => {
    widget.onkeydown =  e => onKeypress(e) 
    // setup static values of curKeypoint
    curKeypoint.src = $vidSrc;
    curKeypoint.author = $author;
  })
  
</script>


<style>
  .widget:focus {
    outline-width: 0;
    /*height: 90vh;*/
  }
  .container {
    display: flex;
    flex-direction: row;
    /*overflow: auto;*/
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
    {#if $views[0]}
      <Views views={$views} />
    {/if}
    {#if $transcriptSrc}
      <Transcript bind:onCuesLoad/>
    {/if}
    {#if $gps}
      <Map gps={$gps} mapStyle={$mapStyle} bind:onMapDataLoad/>
    {/if}
  </div>
  <WaveSurferControler tags={$tags} 
                       bind:onTimelineDataLoad 
                       bind:tagChecks 
                       bind:quickTag 
                       bind:selectNextTag
                       bind:selectPreviousTag
                       bind:saveTag
                       bind:deleteTag/>
</div>
