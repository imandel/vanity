<script>
  //TODO: nice feature to have https://docs.mapbox.com/mapbox-gl-js/example/using-box-queryrenderedfeatures/
  // highlight a box and grab parts of linestring beneath it https://bl.ocks.org/rveciana/e0565ca3bfcebedb12bbc2d4edb9b6b3
  import { gpx } from "@tmcw/togeojson";
  import mapboxgl from 'mapbox-gl';
  import { onMount } from 'svelte';
  import { curTime } from './stores.ts';
  import { point } from '@turf/helpers';
  import nearestPointOnLine from '@turf/nearest-point-on-line';
  let mapRef;
  let line;
  let container
  let route;
  let start;
  export let gps;
  export let mapStyle;
  $: if (gps && typeof route ==='undefined'){
    route = gpx(new DOMParser().parseFromString(gps, "text/xml"));
    start = Date.parse(route.features[0].properties.time);
    route.features[0].properties.coordinateProperties.times = route.features[0].properties.coordinateProperties.times.map((time)=> Date.parse(time) - start);
    gps=JSON.stringify(route)
  }

  let geojsonPoint = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": []
          }
        }]
      };
  const updatePos = (time) => {
    if( time && mapRef && route.features[0].properties.coordinateProperties.times){
      const times = route.features[0].properties.coordinateProperties.times;
      const line = route.features[0].geometry.coordinates
        let index = times.findIndex(n => n > time);

        // finds next time (ordered)
        let currentJson = line.slice(0,index);
        let center = line[index];
        let movingLine = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": currentJson
                }
            }]
        };
        mapRef.getSource('lineSource').setData(movingLine);
        mapRef.getSource('pointSource').setData(point(center));
      }
  }
  $: updatePos($curTime*1000)

  onMount(async () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaW1hbmRlbCIsImEiOiJjankxdjU4ODMwYTViM21teGFpenpsbmd1In0.IN9K9rp8-I5pTbYTmwRJ4Q';

    // Create the map
    mapRef = new mapboxgl.Map({
      container,
      style: mapStyle || 'mapbox://styles/mapbox/light-v10?optimize=true',
      center: [-74.0059413, 40.7127837],
      zoom: 13
    });
    mapRef.on('load', () => {
      new ResizeObserver(() => mapRef.resize()).observe(container);
      mapRef.resize()      
      const coordinates = route.features[0].geometry.coordinates
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        },
        new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
        );
       mapRef.fitBounds(bounds, {
        padding: 30
      });
      mapRef.addSource('lineSource', {
        "type": "geojson",
        "data": geojsonPoint
    });

      mapRef.addSource('fullLineSource', {
        "type": "geojson",
        "data": route
    });

      mapRef.addLayer({
      "id": "staticLine",
      "type": "line",
      "source": "fullLineSource",
      'paint': {
            'line-opacity': 0.5,
            'line-color': '#eba834',
            'line-width': 4.5
       },
       'layout': {
           // 'visibility': 'none'
       }
    });


    mapRef.addSource('pointSource', {
        "type": "geojson",
        "data": geojsonPoint
    });

    mapRef.addLayer({
      "id": "animatedLine",
      "type": "line",
      "source": "lineSource",
      'paint': {
            'line-opacity': 1,
            'line-color': '#eba834',
            'line-width': 4.5
       },
       'layout': {
           // 'visibility': 'none'
       }
    });

    mapRef.addLayer({
      "id": "animatedPoint",
      "type": "circle",
      "source": "pointSource",
      'paint': {
            'circle-radius': 5,
            'circle-opacity': 1,
            'circle-color': '#eba834'
      },
      'layout': {
           // 'visibility': 'none'
       }
    });

    mapRef.on('mouseenter', 'staticLine', () => {
      mapRef.getCanvasContainer().style.cursor = 'crosshair'
    })

    mapRef.on('mouseleave', 'staticLine', () => {
      mapRef.getCanvasContainer().style.cursor = ''
    })

    const updateLocation = (e) => {
      let nearPoint = nearestPointOnLine(route, Object.values(e.lngLat))
      $curTime = route.features[0].properties.coordinateProperties.times[nearPoint.properties.index] / 1000
    }

    const onUp = (e) => {
      mapRef.off('mousemove', updateLocation)
    }

    mapRef.on('mousedown', 'staticLine', (e) => {
      e.preventDefault();
      updateLocation(e)
      mapRef.on('mousemove', updateLocation)
      mapRef.once('mouseup', onUp)
    })
    mapRef.getSource('pointSource').setData(point(coordinates[0]))
    })
      });
</script>
<div class='map-container'>
<div bind:this={container} class='map'></div>
</div>
<style>
  .map {
    width: 100%;
    height: 100%;
  }
  .map-container {
     flex: 1000 1000;
     width: 100%;
  }
</style>
