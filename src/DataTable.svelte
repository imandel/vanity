<script>
    //ideas taken from https://adamlynch.com/flexible-data-tables-with-css-grid/
    export let setActiveRegion
    export let keypoints
    let rows;
    let hoverIdx;
    $: if(keypoints){rows = keypointsToRows(keypoints);}

    const keypointsToRows = (keypointsArray) => {
        return keypoints.reduce((acc, keypoint) => {
        const key = keypoint.id;
        if(!acc[keypoint.id]){
            const { start, end, id, author, src} = keypoint
            acc[keypoint.id]={start, end, id, author, src, tags:[], comments:''}
        }
        if(keypoint.type==='tag') {
            acc[keypoint.id].tags = [...acc[keypoint.id].tags, keypoint.value]
        } else if (keypoint.type === 'comment'){
            acc[keypoint.id].comments = keypoint.value || ''
        }
        return acc    
        }, {})
    }

</script>
<style>
    .container {
        overflow: auto;
        height: 400px;
    }

table {
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  grid-template-columns: 
    repeat(4, 1fr)
    3fr
    4fr;
}

thead,
tbody,
tr {
  display: contents;
}

th,
td {
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

th {
  position: sticky;
  top: 0;
  background: #d6d3ff;
  text-align: left;
  padding-top: 19px;
  padding-bottom: 2px;
  padding-left: 2px;
  font-weight: normal;
}

th:last-child {
  border: 0;
}

td {
  padding-top: 5px;
  padding-bottom: 5px;
  color: #505050;
}

.even{
  background: #eaeaea;
}
.hover-idx{
    white-space: normal;
    overflow-wrap: break-word;
}
</style>
<div class="container">
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>author</th>
      <th>start</th>
      <th>end</th>
      <th>tags</th>
      <th>comments</th>
    </tr>
  </thead>
  <tbody>
    {#each Object.values(rows) as row, index}
     <tr on:mouseover={()=>{hoverIdx=index}} on:mouseout={()=>{hoverIdx=null}} on:click={()=>{setActiveRegion(row.id)}}>
      <td class:hover-idx={hoverIdx===index} class:even={index%2===0}>{row.id}}</td>
      <td class:hover-idx={hoverIdx===index} class:even={index%2===0}>{row.author}</td>
      <td class:hover-idx={hoverIdx===index} class:even={index%2===0}>{row.start}</td>
      <td class:hover-idx={hoverIdx===index} class:even={index%2===0}>{row.end}</td>
      <td class:hover-idx={hoverIdx===index} class:even={index%2===0}>
        {#each row.tags as tag}
            <span> {tag+''} </span>
        {/each}
        </td>
      <td class:hover-idx={hoverIdx===index} class:even={index%2===0}>{row.comments}</td>
    </tr>
    {/each}
  </tbody>
</table>
</div>