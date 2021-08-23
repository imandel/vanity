// Import packages
const {writeFileSync, promises} = require('fs');
const {
  createReadStream,
} = require('fs');
const luxon = require('luxon');
const gjv = require("geojson-validation");

async function adjustTimestamps(data) {
    const startTime = luxon.DateTime.fromISO(data[Object.keys(data).length - 1].date).minus(data[Object.keys(data).length - 1].cts);
    const finalLat = data[Object.keys(data).length - 1].value[0];
    const finalLon = data[Object.keys(data).length - 1].value[1];

    var isBad = true;
    var i = 0;
    var badCount = 0;
    while (isBad) {
      if (Math.abs(finalLat - data[i].value[0]) > 1) {
        badCount++;
      } else if (Math.abs(finalLon - data[i].value[1]) > 1) {
          badCount++;
      } else {
          const firstLat = data[i].value[0];
          const firstLon = data[i].value[1];
          isBad = false;
      }
      i++;
    }

    const adjusted = data.map((sample) => {
        sample.date = startTime.plus(sample.cts).toUTC().toString();
        if ((Math.abs(finalLat - data[i].value[0]) > 1) | (Math.abs(finalLon - data[i].value[1]) > 1)) {
            sample.value[0] = firstLat;
            sample.value[1] = firstLon;
        }
        return sample;
    });
    return adjusted;
}

async function run(gpsFile) {
    var data = JSON.parse(await promises.readFile(gpsFile, 'utf8'));
    data['1'].streams.GPS5.samples = await adjustTimestamps(data['1'].streams.GPS5.samples);
    var secondsFromStart = 0;
    const frameDur = 1 / data['frames/second'];
    var newFormat = {"type": "FeatureCollection",
                     "features": [
                        {
                            "type": "Feature",
                            "properties":
                            {
                                "time": data['1'].streams.GPS5.samples[0].date,
                                "coordinateProperties":
                                {
                                    "times": [
                                    ]
                                }
                            },
                            "geometry": {
                                "type": "LineString",
                                "coordinates": [
                                ]
                            } 
                        }
                     ]        
                    };
    for (const sample of data['1'].streams.GPS5.samples) {
      newFormat.features[0].properties.coordinateProperties.times.push(Math.round(secondsFromStart));
      newFormat.features[0].geometry.coordinates.push([sample.value[1], sample.value[0], sample.value[2]]);
      secondsFromStart = secondsFromStart + frameDur;
    }

    if(gjv.valid(newFormat)){
        console.log("this is valid GeoJSON!");
    } else {
        console.log('format is invalid');
    }

    await writeFileSync(`test_geojson.geojson`, JSON.stringify(newFormat));

}

const args = process.argv.slice(2);
const gpsFile = args[0];
run(gpsFile);