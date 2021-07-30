<script>
  // Creates a Svelte store (https://svelte.dev/tutorial/writable-stores) that syncs with the named Traitlet in widget.ts and example.py.
  import {
    createValue,
    curKeypoint,
    timingObject,
    keypointDefined,
  } from './stores';
  import { onMount } from 'svelte';
  import Map from './componenets/Map.sveltes/Map.svelte';
  import MainVid from './componenets/MainVid.svelte';
  import Transcript from './componenets/Transcript.svelte';
  import WaveSurferControler from './componenets/WaveSurferControler.svelte';
  import Tagbox from './componenets/Tagbox.svelte';
  import Controls from './componenets/Controls.svelte';
  import DataTable from './componenets/DataTable.svelte';

  import Views from './componenets/Views.svelte';

  export let model;
  $: console.log(setActiveRegion);

  let gps = createValue(model, 'gps', '');
  let vidSrc = createValue(model, 'src', '');
  let transcriptSrc = createValue(model, 'transcript', '');
  let transcriptLang = createValue(model, 'transcript_lang', '');
  let mapStyle = createValue(model, 'map_style', '');
  let duration = createValue(model, 'duration', '');
  let views = createValue(model, 'views', []);
  let author = createValue(model, 'author', '');
  let keypoints = createValue(model, '_keypoints', []);

  // setup static values of curKeypoint
  $curKeypoint.src = $vidSrc;
  $curKeypoint.author = $author;

  let vid;
  const togglePlay = () => {
    $timingObject.query().velocity
      ? $timingObject.update({ velocity: 0 })
      : $timingObject.update({ velocity: 1 });
  };

  let tagChecks;
  let quickTag;
  let shortcuts;
  let activeRegion;
  let locked;
  let updatePos;
  let velocity;
  let position = 0;
  let volume;
  let updateZoom;
  const updateTiming = (timestamp) => {
    ({ velocity, position } = $timingObject.query());
    // console.log(timeString)

    requestAnimationFrame(updateTiming);
  };

  $: if ($tags.length) {
    shortcuts = 'qwerasdfzxcvtyuighjk'.slice(0, $tags.length);
  }
  let tags = createValue(model, 'tags', []);

  // for async passing data to componenents when video loads
  let onCuesLoad;
  let onTimelineDataLoad;
  let onMapDataLoad;
  let selectNextTag;
  let tagAction;
  let syncKeypoints;
  let hideSaved;
  let setActiveRegion;

  let map;
  let height;
  let topRow;

  // TODO: this is hacky and should be done properly with css?
  $: if (topRow) {
    topRow.style.height = `${height}px`;
  }
  let transcript;
  let timeline;
  let widget;

  const handleTranscript = (vid) => {
    onCuesLoad(vid.detail);
  };

  const handleTimeline = (vid) => {
    onTimelineDataLoad(vid.detail);
    if ($gps) {
      onMapDataLoad(vid.detail);
    }
  };

  const handleBackendMsg = (e) => {
    switch (e.type) {
      case 'keypoints_updated':
        syncKeypoints();
        break;
      default:
        break;
    }
  };

  // i think this is the best way to handle keyboard shortcuts when the widget is in focus
  // I could be totally wrong about that but it seems like you want to capture keypresses at then pass them to the relevent componenets?
  // do we want to "take up" the tab key like this?
  let onKeypress = (e) => {
    console.log(e);
    if (e.ctrlKey) {
      switch (e.code) {
        case 'KeyQ':
          quickTag = !quickTag;
          break;
        case 'KeyS':
          tagAction('save');
          break;
        case 'Backspace':
          tagAction('delete');
        case 'KeyH':
          toggleHideSaved();
        default:
          break;
      }
    } else if (e.shiftKey) {
      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'Tab':
          e.preventDefault();
          selectNextTag('reverse');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          updatePos(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          updatePos(10);
          break;
        default:
          break;
      }
    } else {
      const idx = shortcuts.indexOf(e.key);
      if (e.key == 'Tab') {
        e.preventDefault();
        selectNextTag('forward');
      } else if (quickTag && idx >= 0) {
        tagChecks.children[idx].firstElementChild.click();
      }
    }
  };

  onMount(() => {
    widget.onkeydown = (e) => onKeypress(e);
    model.on('msg:custom', handleBackendMsg);
    requestAnimationFrame(updateTiming);
  });
</script>

<div class="widget" bind:this={widget} tabindex="-1">
  <div class="container" bind:this={topRow}>
    <div>
      <MainVid
        src={$vidSrc}
        transcript={$transcriptSrc}
        transcript_lang={$transcriptLang}
        bind:height
        bind:volume
        on:trackLoaded={handleTranscript}
        on:durationLoaded|once={handleTimeline}
      />
    </div>
    {#if $views[0]}
      <Views views={$views} />
    {/if}
    {#if $transcriptSrc}
      <Transcript bind:onCuesLoad />
    {/if}
    {#if $gps}
      <Map gps={$gps} mapStyle={$mapStyle} bind:onMapDataLoad bind:position />
    {/if}
  </div>
  <WaveSurferControler
    bind:keypoints={$keypoints}
    bind:onTimelineDataLoad
    bind:selectNextTag
    bind:tagAction
    bind:syncKeypoints
    bind:updateZoom
    bind:hideSaved
    bind:setActiveRegion
  />
  <Controls
    bind:velocity
    bind:position
    bind:volume
    bind:updateZoom
    bind:updatePos
    bind:hideSaved
  />
  <div class="bottom-row">
    <div>
      <DataTable bind:keypoints={$keypoints} bind:setActiveRegion />
    </div>
    <Tagbox
      bind:tags={$tags}
      bind:activeRegion
      bind:tagChecks
      bind:quickTag
      bind:locked
      bind:position
    >
      {#if $keypointDefined.start}
        <button
          on:click={() => {
            tagAction('delete');
          }}
        >
          Delete Tag
        </button>
        <button
          on:click={() => {
            tagAction('save');
          }}
        >
          Save Tag
        </button>
      {/if}
    </Tagbox>
  </div>
</div>

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

  .bottom-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
</style>
