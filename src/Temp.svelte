<!-- By default there are no controls so let's turn them on. -->
<script >
  import { Player, Video } from '@vime/svelte';
</script>

<style>
  div{
    width: 100%;
  }
</style>

<div>
<Player controls>
  <video crossorigin="" poster="https://media.vimejs.com/poster.png">
    <!-- These are passed directly to the underlying HTML5 `<video>` element. -->
    <!-- Why `data-src`? Lazy loading, you can always use `src` if you prefer.  -->
    <source data-src="https://media.vimejs.com/720p.mp4" type="video/mp4" />
    <track
      default
      kind="subtitles"
      src="https://media.vimejs.com/subs/english.vtt"
      srclang="en"
      label="English"
    />
  </video>

  <!-- ... -->
</Player>
</div>