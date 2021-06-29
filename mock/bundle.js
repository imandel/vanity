/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@tmcw/togeojson/dist/togeojson.umd.js":
/*!************************************************************!*\
  !*** ./node_modules/@tmcw/togeojson/dist/togeojson.umd.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports) {

!function(e,t){ true?t(exports):0}(this,(function(e){"use strict";function t(e){return e&&e.normalize&&e.normalize(),e&&e.textContent||""}function n(e,t){const n=e.getElementsByTagName(t);return n.length?n[0]:null}function o(e){const o={};if(e){const s=n(e,"line");if(s){const e=t(n(s,"color")),r=parseFloat(t(n(s,"opacity"))),i=parseFloat(t(n(s,"width")));e&&(o.stroke=e),isNaN(r)||(o["stroke-opacity"]=r),isNaN(i)||(o["stroke-width"]=96*i/25.4)}}return o}function s(e,o){const s={};let r,i;for(i=0;i<o.length;i++)r=n(e,o[i]),r&&(s[o[i]]=t(r));return s}function r(e){const n=s(e,["name","cmt","desc","type","time","keywords"]),o=e.getElementsByTagNameNS("http://www.garmin.com/xmlschemas/GpxExtensions/v3","*");for(let s=0;s<o.length;s++){const r=o[s];r.parentNode.parentNode===e&&(n[r.tagName.replace(":","_")]=t(r))}const r=e.getElementsByTagName("link");r.length&&(n.links=[]);for(let e=0;e<r.length;e++)n.links.push(Object.assign({href:r[e].getAttribute("href")},s(r[e],["text","type"])));return n}function i(e){const o=[parseFloat(e.getAttribute("lon")),parseFloat(e.getAttribute("lat"))],s=n(e,"ele"),r=n(e,"gpxtpx:hr")||n(e,"hr"),i=n(e,"time");let l;s&&(l=parseFloat(t(s)),isNaN(l)||o.push(l));const a={coordinates:o,time:i?t(i):null,extendedValues:[]};r&&a.extendedValues.push(["heart",parseFloat(t(r))]);const c=n(e,"extensions");if(null!==c)for(const e of["speed","course","hAcc","vAcc"]){const o=parseFloat(t(n(c,e)));isNaN(o)||a.extendedValues.push([e,o])}return a}function l(e){const t=a(e,"rtept");if(t)return{type:"Feature",properties:Object.assign(r(e),o(n(e,"extensions")),{_gpxType:"rte"}),geometry:{type:"LineString",coordinates:t.line}}}function a(e,t){const n=e.getElementsByTagName(t);if(n.length<2)return;const o=[],s=[],r={};for(let e=0;e<n.length;e++){const t=i(n[e]);o.push(t.coordinates),t.time&&s.push(t.time);for(let o=0;o<t.extendedValues.length;o++){const[s,i]=t.extendedValues[o],l="heart"===s?s:s+"s";r[l]||(r[l]=Array(n.length).fill(null)),r[l][e]=i}}return{line:o,times:s,extendedValues:r}}function c(e){const t=e.getElementsByTagName("trkseg"),s=[],i=[],l=[];for(let e=0;e<t.length;e++){const n=a(t[e],"trkpt");n&&(l.push(n),n.times&&n.times.length&&i.push(n.times))}if(0===l.length)return;const c=l.length>1,g=Object.assign(r(e),o(n(e,"extensions")),{_gpxType:"trk"},i.length?{coordinateProperties:{times:c?i:i[0]}}:{});for(let e=0;e<l.length;e++){const t=l[e];s.push(t.line);for(const[n,o]of Object.entries(t.extendedValues)){let t=g;"heart"===n&&(g.coordinateProperties||(g.coordinateProperties={}),t=g.coordinateProperties),c?(t[n]||(t[n]=l.map((e=>new Array(e.line.length).fill(null)))),t[n][e]=o):t[n]=o}}return{type:"Feature",properties:g,geometry:c?{type:"MultiLineString",coordinates:s}:{type:"LineString",coordinates:s[0]}}}function*g(e){const t=e.getElementsByTagName("trk"),n=e.getElementsByTagName("rte"),o=e.getElementsByTagName("wpt");for(let e=0;e<t.length;e++){const n=c(t[e]);n&&(yield n)}for(let e=0;e<n.length;e++){const t=l(n[e]);t&&(yield t)}for(let e=0;e<o.length;e++)yield(a=o[e],{type:"Feature",properties:Object.assign(r(a),s(a,["sym"])),geometry:{type:"Point",coordinates:i(a).coordinates}});var a}const u=[["heartRate","heartRates"],["Cadence","cadences"],["Speed","speeds"],["Watts","watts"]],p=[["TotalTimeSeconds","totalTimeSeconds"],["DistanceMeters","distanceMeters"],["MaximumSpeed","maxSpeed"],["AverageHeartRateBpm","avgHeartRate"],["MaximumHeartRateBpm","maxHeartRate"],["AvgSpeed","avgSpeed"],["AvgWatts","avgWatts"],["MaxWatts","maxWatts"]];function m(e,o){const s=[];for(const[r,i]of o){let o=n(e,r);if(!o){const t=e.getElementsByTagNameNS("http://www.garmin.com/xmlschemas/ActivityExtension/v2",r);t.length&&(o=t[0])}const l=parseFloat(t(o));isNaN(l)||s.push([i,l])}return s}function h(e){const o=t(n(e,"LongitudeDegrees")),s=t(n(e,"LatitudeDegrees"));if(!o.length||!s.length)return null;const r=[parseFloat(o),parseFloat(s)],i=n(e,"AltitudeMeters"),l=n(e,"HeartRateBpm"),a=n(e,"Time");let c;return i&&(c=parseFloat(t(i)),isNaN(c)||r.push(c)),{coordinates:r,time:a?t(a):null,heartRate:l?parseFloat(t(l)):null,extensions:m(e,u)}}function f(e,t){const n=e.getElementsByTagName(t),o=[],s=[],r=[];if(n.length<2)return null;const i={extendedProperties:{}};for(let e=0;e<n.length;e++){const t=h(n[e]);if(null!==t){o.push(t.coordinates),t.time&&s.push(t.time),t.heartRate&&r.push(t.heartRate);for(const[o,s]of t.extensions)i.extendedProperties[o]||(i.extendedProperties[o]=Array(n.length).fill(null)),i.extendedProperties[o][e]=s}}return Object.assign(i,{line:o,times:s,heartRates:r})}function d(e){const t=e.getElementsByTagName("Track"),n=[],o=[],s=[],r=[];let i;const l=function(e){const t={};for(const[n,o]of e)t[n]=o;return t}(m(e,p));for(let e=0;e<t.length;e++)i=f(t[e],"Trackpoint"),i&&(n.push(i.line),i.times.length&&o.push(i.times),i.heartRates.length&&s.push(i.heartRates),r.push(i.extendedProperties));for(let e=0;e<r.length;e++){const o=r[e];for(const s in o)1===t.length?l[s]=i.extendedProperties[s]:(l[s]||(l[s]=n.map((e=>Array(e.length).fill(null)))),l[s][e]=o[s])}if(0!==n.length)return(o.length||s.length)&&(l.coordinateProperties=Object.assign(o.length?{times:1===n.length?o[0]:o}:{},s.length?{heart:1===n.length?s[0]:s}:{})),{type:"Feature",properties:l,geometry:{type:1===n.length?"LineString":"MultiLineString",coordinates:1===n.length?n[0]:n}}}function*y(e){const t=e.getElementsByTagName("Lap");for(let e=0;e<t.length;e++){const n=d(t[e]);n&&(yield n)}}const N=/\s*/g,x=/^\s*|\s*$/g,T=/\s+/;function b(e){if(!e||!e.length)return 0;let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n)|0;return t}function S(e){return e.replace(N,"").split(",").map(parseFloat)}function k(e){return e.replace(x,"").split(T).map(S)}function A(e){if(void 0!==e.xml)return e.xml;if(e.tagName){let t=e.tagName;for(let n=0;n<e.attributes.length;n++)t+=e.attributes[n].name+e.attributes[n].value;for(let n=0;n<e.childNodes.length;n++)t+=A(e.childNodes[n]);return t}return"#text"===e.nodeName?(e.nodeValue||e.value||"").trim():"#cdata-section"===e.nodeName?e.nodeValue:""}const B=["Polygon","LineString","Point","Track","gx:Track"];function E(e,o,s){let r=t(n(o,"color"))||"";const i="stroke"==s||"fill"===s?s:s+"-color";"#"===r.substr(0,1)&&(r=r.substr(1)),6===r.length||3===r.length?e[i]=r:8===r.length&&(e[s+"-opacity"]=parseInt(r.substr(0,2),16)/255,e[i]="#"+r.substr(6,2)+r.substr(4,2)+r.substr(2,2))}function F(e,o,s,r){const i=parseFloat(t(n(o,s)));isNaN(i)||(e[r]=i)}function P(e){let n=e.getElementsByTagName("coord");const o=[],s=[];0===n.length&&(n=e.getElementsByTagName("gx:coord"));for(let e=0;e<n.length;e++)o.push(t(n[e]).split(" ").map(parseFloat));const r=e.getElementsByTagName("when");for(let e=0;e<r.length;e++)s.push(t(r[e]));return{coords:o,times:s}}function v(e){let o,s,r,i,l;const a=[],c=[];if(n(e,"MultiGeometry"))return v(n(e,"MultiGeometry"));if(n(e,"MultiTrack"))return v(n(e,"MultiTrack"));if(n(e,"gx:MultiTrack"))return v(n(e,"gx:MultiTrack"));for(r=0;r<B.length;r++)if(s=e.getElementsByTagName(B[r]),s)for(i=0;i<s.length;i++)if(o=s[i],"Point"===B[r])a.push({type:"Point",coordinates:S(t(n(o,"coordinates")))});else if("LineString"===B[r])a.push({type:"LineString",coordinates:k(t(n(o,"coordinates")))});else if("Polygon"===B[r]){const e=o.getElementsByTagName("LinearRing"),s=[];for(l=0;l<e.length;l++)s.push(k(t(n(e[l],"coordinates"))));a.push({type:"Polygon",coordinates:s})}else if("Track"===B[r]||"gx:Track"===B[r]){const e=P(o);a.push({type:"LineString",coordinates:e.coords}),e.times.length&&c.push(e.times)}return{geoms:a,coordTimes:c}}function L(e,o,s,r){const i=v(e);let l;const a={},c=t(n(e,"name")),g=t(n(e,"address"));let u=t(n(e,"styleUrl"));const p=t(n(e,"description")),m=n(e,"TimeSpan"),h=n(e,"TimeStamp"),f=n(e,"ExtendedData");let d=n(e,"IconStyle"),y=n(e,"LabelStyle"),N=n(e,"LineStyle"),x=n(e,"PolyStyle");const T=n(e,"visibility");if(c&&(a.name=c),g&&(a.address=g),u){"#"!==u[0]&&(u="#"+u),a.styleUrl=u,o[u]&&(a.styleHash=o[u]),s[u]&&(a.styleMapHash=s[u],a.styleHash=o[s[u].normal]);const e=r[a.styleHash];e&&(d||(d=n(e,"IconStyle")),y||(y=n(e,"LabelStyle")),N||(N=n(e,"LineStyle")),x||(x=n(e,"PolyStyle")))}if(p&&(a.description=p),m){const e=t(n(m,"begin")),o=t(n(m,"end"));a.timespan={begin:e,end:o}}if(h&&(a.timestamp=t(n(h,"when"))),d){E(a,d,"icon"),F(a,d,"scale","icon-scale"),F(a,d,"heading","icon-heading");const e=n(d,"hotSpot");if(e){const t=parseFloat(e.getAttribute("x")),n=parseFloat(e.getAttribute("y"));isNaN(t)||isNaN(n)||(a["icon-offset"]=[t,n])}const o=n(d,"Icon");if(o){const e=t(n(o,"href"));e&&(a.icon=e)}}if(y&&(E(a,y,"label"),F(a,y,"scale","label-scale")),N&&(E(a,N,"stroke"),F(a,N,"width","stroke-width")),x){E(a,x,"fill");const e=t(n(x,"fill")),o=t(n(x,"outline"));e&&(a["fill-opacity"]="1"===e?a["fill-opacity"]||1:0),o&&(a["stroke-opacity"]="1"===o?a["stroke-opacity"]||1:0)}if(f){const e=f.getElementsByTagName("Data"),o=f.getElementsByTagName("SimpleData");for(l=0;l<e.length;l++)a[e[l].getAttribute("name")]=t(n(e[l],"value"));for(l=0;l<o.length;l++)a[o[l].getAttribute("name")]=t(o[l])}T&&(a.visibility=t(T)),i.coordTimes.length&&(a.coordinateProperties={times:1===i.coordTimes.length?i.coordTimes[0]:i.coordTimes});const b={type:"Feature",geometry:0===i.geoms.length?null:1===i.geoms.length?i.geoms[0]:{type:"GeometryCollection",geometries:i.geoms},properties:a};return e.getAttribute("id")&&(b.id=e.getAttribute("id")),b}function*M(e){const o={},s={},r={},i=e.getElementsByTagName("Placemark"),l=e.getElementsByTagName("Style"),a=e.getElementsByTagName("StyleMap");for(let e=0;e<l.length;e++){const t=b(A(l[e])).toString(16);o["#"+l[e].getAttribute("id")]=t,s[t]=l[e]}for(let e=0;e<a.length;e++){o["#"+a[e].getAttribute("id")]=b(A(a[e])).toString(16);const s=a[e].getElementsByTagName("Pair"),i={};for(let e=0;e<s.length;e++)i[t(n(s[e],"key"))]=t(n(s[e],"styleUrl"));r["#"+a[e].getAttribute("id")]=i}for(let e=0;e<i.length;e++){const t=L(i[e],o,r,s);t&&(yield t)}}e.gpx=function(e){return{type:"FeatureCollection",features:Array.from(g(e))}},e.gpxGen=g,e.kml=function(e){return{type:"FeatureCollection",features:Array.from(M(e))}},e.kmlGen=M,e.tcx=function(e){return{type:"FeatureCollection",features:Array.from(y(e))}},e.tcxGen=y,Object.defineProperty(e,"__esModule",{value:!0})}));


/***/ }),

/***/ 480:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
var meta_1 = __webpack_require__(993);
/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @name bbox
 * @param {GeoJSON} geojson any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = turf.bbox(line);
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [line, bboxPolygon]
 */
function bbox(geojson) {
    var result = [Infinity, Infinity, -Infinity, -Infinity];
    meta_1.coordEach(geojson, function (coord) {
        if (result[0] > coord[0]) {
            result[0] = coord[0];
        }
        if (result[1] > coord[1]) {
            result[1] = coord[1];
        }
        if (result[2] < coord[0]) {
            result[2] = coord[0];
        }
        if (result[3] < coord[1]) {
            result[3] = coord[1];
        }
    });
    return result;
}
bbox["default"] = bbox;
exports.Z = bbox;


/***/ }),

/***/ 562:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.37,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius / 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.37,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1 / 1.0936,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    hectares: 0.0001,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, _options) {
    if (_options === void 0) { _options = {}; }
    switch (type) {
        case "Point":
            return point(coordinates).geometry;
        case "LineString":
            return lineString(coordinates).geometry;
        case "Polygon":
            return polygon(coordinates).geometry;
        case "MultiPoint":
            return multiPoint(coordinates).geometry;
        case "MultiLineString":
            return multiLineString(coordinates).geometry;
        case "MultiPolygon":
            return multiPolygon(coordinates).geometry;
        default:
            throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return (degrees * 180) / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return (radians * Math.PI) / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches, hectares
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted area
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return !!input && input.constructor === Object;
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;


/***/ }),

/***/ 993:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var helpers = __webpack_require__(562);

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
  var previousValue = initialValue;
  coordEach(
    geojson,
    function (
      currentCoord,
      coordIndex,
      featureIndex,
      multiFeatureIndex,
      geometryIndex
    ) {
      if (coordIndex === 0 && initialValue === undefined)
        previousValue = currentCoord;
      else
        previousValue = callback(
          previousValue,
          currentCoord,
          coordIndex,
          featureIndex,
          multiFeatureIndex,
          geometryIndex
        );
    },
    excludeWrapCoord
  );
  return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
  var i;
  switch (geojson.type) {
    case "FeatureCollection":
      for (i = 0; i < geojson.features.length; i++) {
        if (callback(geojson.features[i].properties, i) === false) break;
      }
      break;
    case "Feature":
      callback(geojson.properties, 0);
      break;
  }
}

/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  propEach(geojson, function (currentProperties, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentProperties;
    else
      previousValue = callback(previousValue, currentProperties, featureIndex);
  });
  return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  featureEach(geojson, function (currentFeature, featureIndex) {
    if (featureIndex === 0 && initialValue === undefined)
      previousValue = currentFeature;
    else previousValue = callback(previousValue, currentFeature, featureIndex);
  });
  return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function (coord) {
    coords.push(coord);
  });
  return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
  var i,
    j,
    g,
    geometry,
    stopG,
    geometryMaybeCollection,
    isGeometryCollection,
    featureProperties,
    featureBBox,
    featureId,
    featureIndex = 0,
    isFeatureCollection = geojson.type === "FeatureCollection",
    isFeature = geojson.type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[i].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    featureProperties = isFeatureCollection
      ? geojson.features[i].properties
      : isFeature
      ? geojson.properties
      : {};
    featureBBox = isFeatureCollection
      ? geojson.features[i].bbox
      : isFeature
      ? geojson.bbox
      : undefined;
    featureId = isFeatureCollection
      ? geojson.features[i].id
      : isFeature
      ? geojson.id
      : undefined;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (g = 0; g < stopG; g++) {
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[g]
        : geometryMaybeCollection;

      // Handle null Geometry
      if (geometry === null) {
        if (
          callback(
            null,
            featureIndex,
            featureProperties,
            featureBBox,
            featureId
          ) === false
        )
          return false;
        continue;
      }
      switch (geometry.type) {
        case "Point":
        case "LineString":
        case "MultiPoint":
        case "Polygon":
        case "MultiLineString":
        case "MultiPolygon": {
          if (
            callback(
              geometry,
              featureIndex,
              featureProperties,
              featureBBox,
              featureId
            ) === false
          )
            return false;
          break;
        }
        case "GeometryCollection": {
          for (j = 0; j < geometry.geometries.length; j++) {
            if (
              callback(
                geometry.geometries[j],
                featureIndex,
                featureProperties,
                featureBBox,
                featureId
              ) === false
            )
              return false;
          }
          break;
        }
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
    // Only increase `featureIndex` per each feature
    featureIndex++;
  }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  geomEach(
    geojson,
    function (
      currentGeometry,
      featureIndex,
      featureProperties,
      featureBBox,
      featureId
    ) {
      if (featureIndex === 0 && initialValue === undefined)
        previousValue = currentGeometry;
      else
        previousValue = callback(
          previousValue,
          currentGeometry,
          featureIndex,
          featureProperties,
          featureBBox,
          featureId
        );
    }
  );
  return previousValue;
}

/***/ "./node_modules/geojson-rbush/index.js":
/*!*********************************************!*\
  !*** ./node_modules/geojson-rbush/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

    for (
      var multiFeatureIndex = 0;
      multiFeatureIndex < geometry.coordinates.length;
      multiFeatureIndex++
    ) {
      var coordinate = geometry.coordinates[multiFeatureIndex];
      var geom = {
        type: geomType,
        coordinates: coordinate,
      };
      if (
        callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) ===
        false
      )
        return false;
    }
  });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
  var previousValue = initialValue;
  flattenEach(
    geojson,
    function (currentFeature, featureIndex, multiFeatureIndex) {
      if (
        featureIndex === 0 &&
        multiFeatureIndex === 0 &&
        initialValue === undefined
      )
        previousValue = currentFeature;
      else
        previousValue = callback(
          previousValue,
          currentFeature,
          featureIndex,
          multiFeatureIndex
        );
    }
  );
  return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
  flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
    var segmentIndex = 0;

    // Exclude null Geometries
    if (!feature.geometry) return;
    // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
    var type = feature.geometry.type;
    if (type === "Point" || type === "MultiPoint") return;

/***/ "./node_modules/rbush/index.js":
/*!*************************************!*\
  !*** ./node_modules/rbush/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var rbush = __webpack_require__(464);
var helpers = __webpack_require__(562);
var meta = __webpack_require__(993);
var turfBBox = __webpack_require__(480)/* .default */ .Z;
var featureEach = meta.featureEach;
var coordEach = meta.coordEach;
var polygon = helpers.polygon;
var featureCollection = helpers.featureCollection;

/**
 * GeoJSON implementation of [RBush](https://github.com/mourner/rbush#rbush) spatial index.
 *
 * @name rbush
 * @param {number} [maxEntries=9] defines the maximum number of entries in a tree node. 9 (used by default) is a
 * reasonable choice for most applications. Higher value means faster insertion and slower search, and vice versa.
 * @returns {RBush} GeoJSON RBush
 * @example
 * var geojsonRbush = require('geojson-rbush').default;
 * var tree = geojsonRbush();
 */
function geojsonRbush(maxEntries) {
    var tree = rbush(maxEntries);
    /**
     * [insert](https://github.com/mourner/rbush#data-format)
     *
     * @param {Feature} feature insert single GeoJSON Feature
     * @returns {RBush} GeoJSON RBush
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     * tree.insert(poly)
     */
    tree.insert = function (feature) {
        if (feature.type !== 'Feature') throw new Error('invalid feature');
        feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
        return rbush.prototype.insert.call(this, feature);
    };

    /**
     * [load](https://github.com/mourner/rbush#bulk-inserting-data)
     *
     * @param {FeatureCollection|Array<Feature>} features load entire GeoJSON FeatureCollection
     * @returns {RBush} GeoJSON RBush
     * @example
     * var polys = turf.polygons([
     *     [[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]],
     *     [[[-93, 32], [-83, 32], [-83, 39], [-93, 39], [-93, 32]]]
     * ]);
     * tree.load(polys);
     */
    tree.load = function (features) {
        var load = [];
        // Load an Array of Features
        if (Array.isArray(features)) {
            features.forEach(function (feature) {
                if (feature.type !== 'Feature') throw new Error('invalid features');
                feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
                load.push(feature);
            });
        } else {
            // Load a FeatureCollection
            featureEach(features, function (feature) {
                if (feature.type !== 'Feature') throw new Error('invalid features');
                feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
                load.push(feature);
            });
        }
        return rbush.prototype.load.call(this, load);
    };

    /**
     * [remove](https://github.com/mourner/rbush#removing-data)
     *
     * @param {Feature} feature remove single GeoJSON Feature
     * @param {Function} equals Pass a custom equals function to compare by value for removal.
     * @returns {RBush} GeoJSON RBush
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     *
     * tree.remove(poly);
     */
    tree.remove = function (feature, equals) {
        if (feature.type !== 'Feature') throw new Error('invalid feature');
        feature.bbox = feature.bbox ? feature.bbox : turfBBox(feature);
        return rbush.prototype.remove.call(this, feature, equals);
    };

    /**
     * [clear](https://github.com/mourner/rbush#removing-data)
     *
     * @returns {RBush} GeoJSON Rbush
     * @example
     * tree.clear()
     */
    tree.clear = function () {
        return rbush.prototype.clear.call(this);
    };

    /**
     * [search](https://github.com/mourner/rbush#search)
     *
     * @param {BBox|FeatureCollection|Feature} geojson search with GeoJSON
     * @returns {FeatureCollection} all features that intersects with the given GeoJSON.
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     *
     * tree.search(poly);
     */
    tree.search = function (geojson) {
        var features = rbush.prototype.search.call(this, this.toBBox(geojson));
        return featureCollection(features);
    };

    /**
     * [collides](https://github.com/mourner/rbush#collisions)
     *
     * @param {BBox|FeatureCollection|Feature} geojson collides with GeoJSON
     * @returns {boolean} true if there are any items intersecting the given GeoJSON, otherwise false.
     * @example
     * var poly = turf.polygon([[[-78, 41], [-67, 41], [-67, 48], [-78, 48], [-78, 41]]]);
     *
     * tree.collides(poly);
     */
    tree.collides = function (geojson) {
        return rbush.prototype.collides.call(this, this.toBBox(geojson));
    };

    /**
     * [all](https://github.com/mourner/rbush#search)
     *
     * @returns {FeatureCollection} all the features in RBush
     * @example
     * tree.all()
     */
    tree.all = function () {
        var features = rbush.prototype.all.call(this);
        return featureCollection(features);
    };

    /**
     * [toJSON](https://github.com/mourner/rbush#export-and-import)
     *
     * @returns {any} export data as JSON object
     * @example
     * var exported = tree.toJSON()
     */
    tree.toJSON = function () {
        return rbush.prototype.toJSON.call(this);
    };

    /**
     * [fromJSON](https://github.com/mourner/rbush#export-and-import)
     *
     * @param {any} json import previously exported data
     * @returns {RBush} GeoJSON RBush
     * @example
     * var exported = {
     *   "children": [
     *     {
     *       "type": "Feature",
     *       "geometry": {
     *         "type": "Point",
     *         "coordinates": [110, 50]
     *       },
     *       "properties": {},
     *       "bbox": [110, 50, 110, 50]
     *     }
     *   ],
     *   "height": 1,
     *   "leaf": true,
     *   "minX": 110,
     *   "minY": 50,
     *   "maxX": 110,
     *   "maxY": 50
     * }
     * tree.fromJSON(exported)
     */
    tree.fromJSON = function (json) {
        return rbush.prototype.fromJSON.call(this, json);
    };

    /**
     * Converts GeoJSON to {minX, minY, maxX, maxY} schema
     *
     * @private
     * @param {BBox|FeatureCollection|Feature} geojson feature(s) to retrieve BBox from
     * @returns {Object} converted to {minX, minY, maxX, maxY}
     */
    tree.toBBox = function (geojson) {
        var bbox;
        if (geojson.bbox) bbox = geojson.bbox;
        else if (Array.isArray(geojson) && geojson.length === 4) bbox = geojson;
        else if (Array.isArray(geojson) && geojson.length === 6) bbox = [geojson[0], geojson[1], geojson[3], geojson[4]];
        else if (geojson.type === 'Feature') bbox = turfBBox(geojson);
        else if (geojson.type === 'FeatureCollection') bbox = turfBBox(geojson);
        else throw new Error('invalid geojson')

        return {
            minX: bbox[0],
            minY: bbox[1],
            maxX: bbox[2],
            maxY: bbox[3]
        };
    };
    return tree;
}

module.exports = geojsonRbush;
module.exports.default = geojsonRbush;


/***/ }),

/***/ 94:
/***/ (function(module) {

/* Mapbox GL JS is Copyright © 2020 Mapbox and subject to the Mapbox Terms of Service ((https://www.mapbox.com/legal/tos/). */
(function (global, factory) {
 true ? module.exports = factory() :
0;
}(this, (function () { 'use strict';

/* eslint-disable */

/***/ "./node_modules/wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js":
/*!*************************************************************************!*\
  !*** ./node_modules/wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js ***!
  \*************************************************************************/
/***/ (function(module) {

eval("/*!\n * wavesurfer.js cursor plugin 5.1.0 (2021-06-20)\n * https://wavesurfer-js.org\n * @license BSD-3-Clause\n */\n!function(e,t){ true?module.exports=t():0}(this,(function(){return(()=>{\"use strict\";var e={178:(e,t)=>{function i(e,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,\"value\"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}Object.defineProperty(t,\"__esModule\",{value:!0}),t.default=void 0;var s=function(){function e(t,i){var s=this;!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,e),this.defaultParams={hideOnBlur:!0,width:\"1px\",color:\"black\",opacity:\"0.25\",style:\"solid\",zIndex:4,customStyle:{},customShowTimeStyle:{},showTime:!1,followCursorY:!1,formatTimeCallback:null},this._onMousemove=function(e){var t=s.wavesurfer.container.getBoundingClientRect(),i=0,r=e.clientX-t.left,o=t.right<e.clientX+s.outerWidth(s.displayTime);s.params.showTime&&s.params.followCursorY&&(i=e.clientY-(t.top+t.height/2)),s.updateCursorPosition(r,i,o)},this._onMouseenter=function(){return s.showCursor()},this._onMouseleave=function(){return s.hideCursor()},this.wavesurfer=i,this.style=i.util.style,this.cursor=null,this.showTime=null,this.displayTime=null,this.params=Object.assign({},this.defaultParams,t)}var t,s,r;return t=e,r=[{key:\"create\",value:function(t){return{name:\"cursor\",deferInit:!(!t||!t.deferInit)&&t.deferInit,params:t,staticProps:{},instance:e}}}],(s=[{key:\"init\",value:function(){this.wrapper=this.wavesurfer.container,this.cursor=this.wrapper.appendChild(this.style(document.createElement(\"cursor\"),Object.assign({position:\"absolute\",zIndex:this.params.zIndex,left:0,top:0,bottom:0,width:\"0\",display:\"flex\",borderRightStyle:this.params.style,borderRightWidth:this.params.width,borderRightColor:this.params.color,opacity:this.params.opacity,pointerEvents:\"none\"},this.params.customStyle))),this.params.showTime&&(this.showTime=this.wrapper.appendChild(this.style(document.createElement(\"showTitle\"),Object.assign({position:\"absolute\",zIndex:this.params.zIndex,left:0,top:0,bottom:0,width:\"auto\",display:\"flex\",opacity:this.params.opacity,pointerEvents:\"none\",height:\"100%\"},this.params.customStyle))),this.displayTime=this.showTime.appendChild(this.style(document.createElement(\"div\"),Object.assign({display:\"inline\",pointerEvents:\"none\",margin:\"auto\",visibility:\"hidden\"},this.params.customShowTimeStyle))),this.displayTime.innerHTML=this.formatTime(0)),this.wrapper.addEventListener(\"mousemove\",this._onMousemove),this.params.hideOnBlur&&(this.hideCursor(),this.wrapper.addEventListener(\"mouseenter\",this._onMouseenter),this.wrapper.addEventListener(\"mouseleave\",this._onMouseleave))}},{key:\"destroy\",value:function(){this.params.showTime&&this.cursor.parentNode.removeChild(this.showTime),this.cursor.parentNode.removeChild(this.cursor),this.wrapper.removeEventListener(\"mousemove\",this._onMousemove),this.params.hideOnBlur&&(this.wrapper.removeEventListener(\"mouseenter\",this._onMouseenter),this.wrapper.removeEventListener(\"mouseleave\",this._onMouseleave))}},{key:\"updateCursorPosition\",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(this.style(this.cursor,{left:\"\".concat(e,\"px\")}),this.params.showTime){var s=this.wavesurfer.getDuration(),r=this.wavesurfer.drawer.width/this.wavesurfer.params.pixelRatio,o=this.wavesurfer.drawer.getScrollX(),a=s/this.wavesurfer.drawer.width*o,n=Math.max(0,e/r*s)+a,h=this.formatTime(n);if(i){var u=this.outerWidth(this.displayTime);e-=u}this.style(this.showTime,{left:\"\".concat(e,\"px\"),top:\"\".concat(t,\"px\")}),this.style(this.displayTime,{visibility:\"visible\"}),this.displayTime.innerHTML=\"\".concat(h)}}},{key:\"showCursor\",value:function(){this.style(this.cursor,{display:\"flex\"}),this.params.showTime&&this.style(this.showTime,{display:\"flex\"})}},{key:\"hideCursor\",value:function(){this.style(this.cursor,{display:\"none\"}),this.params.showTime&&this.style(this.showTime,{display:\"none\"})}},{key:\"formatTime\",value:function(e){return e=isNaN(e)?0:e,this.params.formatTimeCallback?this.params.formatTimeCallback(e):[e].map((function(e){return[Math.floor(e%3600/60),(\"00\"+Math.floor(e%60)).slice(-2),(\"000\"+Math.floor(e%1*1e3)).slice(-3)].join(\":\")}))}},{key:\"outerWidth\",value:function(e){if(!e)return 0;var t=e.offsetWidth,i=getComputedStyle(e);return t+=parseInt(i.marginLeft+i.marginRight)}}])&&i(t.prototype,s),r&&i(t,r),e}();t.default=s,e.exports=t.default}},t={};return function i(s){var r=t[s];if(void 0!==r)return r.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,i),o.exports}(178)})()}));\n\n\n//# sourceURL=webpack://vanity/./node_modules/wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js?");

/***/ }),

/***/ "./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js":
/*!**************************************************************************!*\
  !*** ./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js ***!
  \**************************************************************************/
/***/ (function(module) {

eval("/*!\n * wavesurfer.js regions plugin 5.1.0 (2021-06-20)\n * https://wavesurfer-js.org\n * @license BSD-3-Clause\n */\n!function(e,t){ true?module.exports=t():0}(this,(function(){return(()=>{\"use strict\";var e={23:(e,t,r)=>{Object.defineProperty(t,\"__esModule\",{value:!0}),t.default=void 0;var i=r(638);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,\"value\"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var l=function(){function e(t,r){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,e),this.params=t,this.wavesurfer=r,this.util=s(s({},r.util),{},{getRegionSnapToGridValue:function(e){return n.getRegionSnapToGridValue(e,t)}}),this.maxRegions=t.maxRegions,this.regionsMinLength=t.regionsMinLength||null,Object.getOwnPropertyNames(this.util.Observer.prototype).forEach((function(e){i.Region.prototype[e]=n.util.Observer.prototype[e]})),this.wavesurfer.Region=i.Region;this._onBackendCreated=function(){n.wrapper=n.wavesurfer.drawer.wrapper,n.orientation=n.wavesurfer.drawer.orientation,n.params.regions&&n.params.regions.forEach((function(e){e.edgeScrollWidth=n.params.edgeScrollWidth||.05*n.wrapper.clientWidth,n.add(e)}))},this.list={},this._onReady=function(){n.wrapper=n.wavesurfer.drawer.wrapper,n.vertical=n.wavesurfer.drawer.params.vertical,n.params.dragSelection&&n.enableDragSelection(n.params),Object.keys(n.list).forEach((function(e){n.list[e].updateRender()}))}}var t,r,n;return t=e,n=[{key:\"create\",value:function(t){return{name:\"regions\",deferInit:!(!t||!t.deferInit)&&t.deferInit,params:t,staticProps:{addRegion:function(e){return this.initialisedPluginList.regions||this.initPlugin(\"regions\"),this.regions.add(e)},clearRegions:function(){this.regions&&this.regions.clear()},enableDragSelection:function(e){this.initialisedPluginList.regions||this.initPlugin(\"regions\"),this.regions.enableDragSelection(e)},disableDragSelection:function(){this.regions.disableDragSelection()}},instance:e}}}],(r=[{key:\"init\",value:function(){this.wavesurfer.isReady?(this._onBackendCreated(),this._onReady()):(this.wavesurfer.once(\"ready\",this._onReady),this.wavesurfer.once(\"backend-created\",this._onBackendCreated))}},{key:\"destroy\",value:function(){this.wavesurfer.un(\"ready\",this._onReady),this.wavesurfer.un(\"backend-created\",this._onBackendCreated),this.disableDragSelection(),this.clear()}},{key:\"wouldExceedMaxRegions\",value:function(){return this.maxRegions&&Object.keys(this.list).length>=this.maxRegions}},{key:\"add\",value:function(e){var t=this;if(this.wouldExceedMaxRegions())return null;!e.minLength&&this.regionsMinLength&&(e=s(s({},e),{},{minLength:this.regionsMinLength}));var r=new this.wavesurfer.Region(e,this.util,this.wavesurfer);return this.list[r.id]=r,r.on(\"remove\",(function(){delete t.list[r.id]})),r}},{key:\"clear\",value:function(){var e=this;Object.keys(this.list).forEach((function(t){e.list[t].remove()}))}},{key:\"enableDragSelection\",value:function(e){var t=this;this.disableDragSelection();var r,i,n,s,a,o,l,h=e.slop||2,u=this.wavesurfer.drawer.container,d=!1!==e.scroll&&this.wavesurfer.params.scrollParent,c=e.scrollSpeed||1,v=e.scrollThreshold||10,f=this.wavesurfer.getDuration(),g=0,p=function e(r){if(s&&o){var a=t.wrapper.scrollLeft+c*o;t.wrapper.scrollLeft=a=Math.min(i,Math.max(0,a));var l=t.wavesurfer.drawer.handleEvent(r);s.update({start:Math.min(l*f,n*f),end:Math.max(l*f,n*f)}),a<i&&a>0&&window.requestAnimationFrame((function(){e(r)}))}},m=function(e){e.touches&&e.touches.length>1||(f=t.wavesurfer.getDuration(),a=e.targetTouches?e.targetTouches[0].identifier:null,i=t.wrapper.scrollWidth-t.wrapper.clientWidth,l=t.util.withOrientation(t.wrapper.getBoundingClientRect(),t.vertical),r=!0,n=t.wavesurfer.drawer.handleEvent(e,!0),s=null,o=null)};this.wrapper.addEventListener(\"mousedown\",m),this.wrapper.addEventListener(\"touchstart\",m),this.on(\"disable-drag-selection\",(function(){t.wrapper.removeEventListener(\"touchstart\",m),t.wrapper.removeEventListener(\"mousedown\",m)}));var w=function(e){e.touches&&e.touches.length>1||(r=!1,g=0,o=null,s&&(t.util.preventClick(),s.fireEvent(\"update-end\",e),t.wavesurfer.fireEvent(\"region-update-end\",s,e)),s=null)};this.wrapper.addEventListener(\"mouseleave\",w),this.wrapper.addEventListener(\"mouseup\",w),this.wrapper.addEventListener(\"touchend\",w),document.body.addEventListener(\"mouseup\",w),document.body.addEventListener(\"touchend\",w),this.on(\"disable-drag-selection\",(function(){document.body.removeEventListener(\"mouseup\",w),document.body.removeEventListener(\"touchend\",w),t.wrapper.removeEventListener(\"touchend\",w),t.wrapper.removeEventListener(\"mouseup\",w),t.wrapper.removeEventListener(\"mouseleave\",w)}));var b=function(i){if(r&&!(++g<=h)&&!(i.touches&&i.touches.length>1)&&(!i.targetTouches||i.targetTouches[0].identifier==a)&&(s||(s=t.add(e||{})))){var c=t.wavesurfer.drawer.handleEvent(i),m=t.wavesurfer.regions.util.getRegionSnapToGridValue(n*f),w=t.wavesurfer.regions.util.getRegionSnapToGridValue(c*f);s.update({start:Math.min(w,m),end:Math.max(w,m)});var b=t.util.withOrientation(i,t.vertical);if(d&&u.clientWidth<t.wrapper.scrollWidth){var y=b.clientX-l.left;(o=y<=v?-1:y>=l.right-v?1:null)&&p(i)}}};this.wrapper.addEventListener(\"mousemove\",b),this.wrapper.addEventListener(\"touchmove\",b),this.on(\"disable-drag-selection\",(function(){t.wrapper.removeEventListener(\"touchmove\",b),t.wrapper.removeEventListener(\"mousemove\",b)})),this.wavesurfer.on(\"region-created\",(function(e){t.regionsMinLength&&(e.minLength=t.regionsMinLength)}))}},{key:\"disableDragSelection\",value:function(){this.fireEvent(\"disable-drag-selection\")}},{key:\"getCurrentRegion\",value:function(){var e=this,t=this.wavesurfer.getCurrentTime(),r=null;return Object.keys(this.list).forEach((function(i){var n=e.list[i];n.start<=t&&n.end>=t&&(!r||n.end-n.start<r.end-r.start)&&(r=n)})),r}},{key:\"getRegionSnapToGridValue\",value:function(e,t){if(t.snapToGridInterval){var r=t.snapToGridOffset||0;return Math.round((e-r)/t.snapToGridInterval)*t.snapToGridInterval+r}return e}}])&&o(t.prototype,r),n&&o(t,n),e}();t.default=l,e.exports=t.default},638:(e,t)=>{function r(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,\"value\"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}Object.defineProperty(t,\"__esModule\",{value:!0}),t.Region=void 0;var i=function(){function e(t,r,i){var n,s=this;!function(e,t){if(!(e instanceof t))throw new TypeError(\"Cannot call a class as a function\")}(this,e),this.wavesurfer=i,this.wrapper=i.drawer.wrapper,this.util=i.util,this.style=this.util.style,this.regionsUtil=r,this.vertical=i.drawer.params.vertical,this.id=null==t.id?i.util.getId():t.id,this.start=Number(t.start)||0,this.end=null==t.end?this.start+4/this.wrapper.scrollWidth*this.wavesurfer.getDuration():Number(t.end),this.resize=void 0===t.resize||Boolean(t.resize),this.drag=void 0===t.drag||Boolean(t.drag),this.isResizing=!1,this.isDragging=!1,this.loop=Boolean(t.loop),this.color=t.color||\"rgba(0, 0, 0, 0.1)\",this.handleStyle=t.handleStyle||{left:{},right:{}},this.handleLeftEl=null,this.handleRightEl=null,this.data=t.data||{},this.attributes=t.attributes||{},this.showTooltip=null===(n=t.showTooltip)||void 0===n||n,this.maxLength=t.maxLength,this.minLength=t.minLength,this._onRedraw=function(){return s.updateRender()},this.scroll=!1!==t.scroll&&i.params.scrollParent,this.scrollSpeed=t.scrollSpeed||1,this.scrollThreshold=t.scrollThreshold||10,this.preventContextMenu=void 0!==t.preventContextMenu&&Boolean(t.preventContextMenu);var a=null==t.channelIdx?-1:parseInt(t.channelIdx);if(this.regionHeight=\"100%\",this.marginTop=\"0px\",-1!==a){var o=null!=this.wavesurfer.backend.buffer?this.wavesurfer.backend.buffer.numberOfChannels:-1;o>=0&&a<o&&(this.regionHeight=Math.floor(1/o*100)+\"%\",this.marginTop=this.wavesurfer.getHeight()*a+\"px\")}this.formatTimeCallback=t.formatTimeCallback,this.edgeScrollWidth=t.edgeScrollWidth,this.bindInOut(),this.render(),this.wavesurfer.on(\"zoom\",this._onRedraw),this.wavesurfer.on(\"redraw\",this._onRedraw),this.wavesurfer.fireEvent(\"region-created\",this)}var t,i,n;return t=e,(i=[{key:\"update\",value:function(e){null!=e.start&&(this.start=Number(e.start)),null!=e.end&&(this.end=Number(e.end)),null!=e.loop&&(this.loop=Boolean(e.loop)),null!=e.color&&(this.color=e.color),null!=e.handleStyle&&(this.handleStyle=e.handleStyle),null!=e.data&&(this.data=e.data),null!=e.resize&&(this.resize=Boolean(e.resize),this.updateHandlesResize(this.resize)),null!=e.drag&&(this.drag=Boolean(e.drag)),null!=e.maxLength&&(this.maxLength=Number(e.maxLength)),null!=e.minLength&&(this.minLength=Number(e.minLength)),null!=e.attributes&&(this.attributes=e.attributes),this.updateRender(),this.fireEvent(\"update\"),this.wavesurfer.fireEvent(\"region-updated\",this)}},{key:\"remove\",value:function(){this.element&&(this.wrapper.removeChild(this.element.domElement),this.element=null,this.fireEvent(\"remove\"),this.wavesurfer.un(\"zoom\",this._onRedraw),this.wavesurfer.un(\"redraw\",this._onRedraw),this.wavesurfer.fireEvent(\"region-removed\",this))}},{key:\"play\",value:function(e){var t=e||this.start;this.wavesurfer.play(t,this.end),this.fireEvent(\"play\"),this.wavesurfer.fireEvent(\"region-play\",this)}},{key:\"playLoop\",value:function(e){this.loop=!0,this.play(e)}},{key:\"setLoop\",value:function(e){this.loop=e}},{key:\"render\",value:function(){for(var e in this.element=this.util.withOrientation(this.wrapper.appendChild(document.createElement(\"region\")),this.vertical),this.element.className=\"wavesurfer-region\",this.showTooltip&&(this.element.title=this.formatTime(this.start,this.end)),this.element.setAttribute(\"data-id\",this.id),this.attributes)this.element.setAttribute(\"data-region-\"+e,this.attributes[e]);if(this.style(this.element,{position:\"absolute\",zIndex:2,height:this.regionHeight,top:this.marginTop}),this.resize){this.handleLeftEl=this.util.withOrientation(this.element.appendChild(document.createElement(\"handle\")),this.vertical),this.handleRightEl=this.util.withOrientation(this.element.appendChild(document.createElement(\"handle\")),this.vertical),this.handleLeftEl.className=\"wavesurfer-handle wavesurfer-handle-start\",this.handleRightEl.className=\"wavesurfer-handle wavesurfer-handle-end\";var t={cursor:this.vertical?\"row-resize\":\"col-resize\",position:\"absolute\",top:\"0px\",width:\"2px\",height:\"100%\",backgroundColor:\"rgba(0, 0, 0, 1)\"},r=\"none\"!==this.handleStyle.left?Object.assign({left:\"0px\"},t,this.handleStyle.left):null,i=\"none\"!==this.handleStyle.right?Object.assign({right:\"0px\"},t,this.handleStyle.right):null;r&&this.style(this.handleLeftEl,r),i&&this.style(this.handleRightEl,i)}this.updateRender(),this.bindEvents()}},{key:\"formatTime\",value:function(e,t){return this.formatTimeCallback?this.formatTimeCallback(e,t):(e==t?[e]:[e,t]).map((function(e){return[Math.floor(e%3600/60),(\"00\"+Math.floor(e%60)).slice(-2)].join(\":\")})).join(\"-\")}},{key:\"getWidth\",value:function(){return this.wavesurfer.drawer.width/this.wavesurfer.params.pixelRatio}},{key:\"updateRender\",value:function(){var e=this.wavesurfer.getDuration(),t=this.getWidth(),r=this.start,i=this.end;if(r<0&&(i-=r=0),i>e&&(r=e-((i=e)-r)),null!=this.minLength&&(i=Math.max(r+this.minLength,i)),null!=this.maxLength&&(i=Math.min(r+this.maxLength,i)),null!=this.element){var n=Math.round(r/e*t),s=Math.round(i/e*t)-n;for(var a in this.style(this.element,{left:n+\"px\",width:s+\"px\",backgroundColor:this.color,cursor:this.drag?\"move\":\"default\"}),this.attributes)this.element.setAttribute(\"data-region-\"+a,this.attributes[a]);this.showTooltip&&(this.element.title=this.formatTime(this.start,this.end))}}},{key:\"bindInOut\",value:function(){var e=this;this.firedIn=!1,this.firedOut=!1;var t=function(t){var r=Math.round(10*e.start)/10,i=Math.round(10*e.end)/10;t=Math.round(10*t)/10,!e.firedOut&&e.firedIn&&(r>t||i<=t)&&(e.firedOut=!0,e.firedIn=!1,e.fireEvent(\"out\"),e.wavesurfer.fireEvent(\"region-out\",e)),!e.firedIn&&r<=t&&i>t&&(e.firedIn=!0,e.firedOut=!1,e.fireEvent(\"in\"),e.wavesurfer.fireEvent(\"region-in\",e))};this.wavesurfer.backend.on(\"audioprocess\",t),this.on(\"remove\",(function(){e.wavesurfer.backend.un(\"audioprocess\",t)})),this.on(\"out\",(function(){if(e.loop){var t=e.wavesurfer.getCurrentTime();t>=e.start&&t<=e.end&&e.wavesurfer.play(e.start)}}))}},{key:\"bindEvents\",value:function(){var e=this,t=this.preventContextMenu;this.element.addEventListener(\"mouseenter\",(function(t){e.fireEvent(\"mouseenter\",t),e.wavesurfer.fireEvent(\"region-mouseenter\",e,t)})),this.element.addEventListener(\"mouseleave\",(function(t){e.fireEvent(\"mouseleave\",t),e.wavesurfer.fireEvent(\"region-mouseleave\",e,t)})),this.element.addEventListener(\"click\",(function(t){t.preventDefault(),e.fireEvent(\"click\",t),e.wavesurfer.fireEvent(\"region-click\",e,t)})),this.element.addEventListener(\"dblclick\",(function(t){t.stopPropagation(),t.preventDefault(),e.fireEvent(\"dblclick\",t),e.wavesurfer.fireEvent(\"region-dblclick\",e,t)})),this.element.addEventListener(\"contextmenu\",(function(r){t&&r.preventDefault(),e.fireEvent(\"contextmenu\",r),e.wavesurfer.fireEvent(\"region-contextmenu\",e,r)})),(this.drag||this.resize)&&this.bindDragEvents()}},{key:\"bindDragEvents\",value:function(){var e,t,r,i,n,s,a,o,l,h=this,u=this.wavesurfer.drawer.container,d=this.scrollSpeed,c=(this.scrollThreshold,!1),v=function t(u){var c=h.util.withOrientation(u,h.vertical),v=h.wavesurfer.getDuration();if(s&&(r||n)){var f=c.clientX,g=0,p=0,m=0,w=h.regionsUtil.getRegionSnapToGridValue(h.wavesurfer.drawer.handleEvent(u)*v);if(r)-1===s?(p=o*h.wavesurfer.params.minPxPerSec,g=f-a.left):(p=l*h.wavesurfer.params.minPxPerSec,g=a.right-f);else{var b=h.minLength;b||(b=0),\"start\"===n?(w>h.end-b&&(w=h.end-b,m=d*s),w<0&&(w=0)):\"end\"===n&&(w<h.start+b&&(w=h.start+b,m=d*s),w>v&&(w=v))}var y=h.wrapper.scrollLeft;if(-1===s){if(0===Math.round(y))return;if(Math.round(y-p+g)<=0)return}else{if(Math.round(y)===i)return;if(Math.round(y+p-g)>=i)return}var E=y-m+d*s;if(-1===s){var L=Math.max(0+p-g,E);h.wrapper.scrollLeft=E=L}else{var k=Math.min(i-p+g,E);h.wrapper.scrollLeft=E=k}var R=w-e;e=w,r?h.onDrag(R):h.onResize(R,n),window.requestAnimationFrame((function(){t(u)}))}},f=function(s){var u=h.wavesurfer.getDuration();s.touches&&s.touches.length>1||(t=s.targetTouches?s.targetTouches[0].identifier:null,(h.drag||h.resize)&&s.stopPropagation(),e=h.regionsUtil.getRegionSnapToGridValue(h.wavesurfer.drawer.handleEvent(s,!0)*u),o=e-h.start,l=h.end-e,i=h.wrapper.scrollWidth-h.wrapper.clientWidth,a=h.util.withOrientation(h.wrapper.getBoundingClientRect(),h.vertical),h.isResizing=!1,h.isDragging=!1,\"handle\"===s.target.tagName.toLowerCase()?(h.isResizing=!0,n=s.target.classList.contains(\"wavesurfer-handle-start\")?\"start\":\"end\"):(h.isDragging=!0,r=!0,n=!1))},g=function(e){e.touches&&e.touches.length>1||((r||n)&&(h.isDragging=!1,h.isResizing=!1,r=!1,s=null,n=!1),c&&(c=!1,h.util.preventClick(),h.fireEvent(\"update-end\",e),h.wavesurfer.fireEvent(\"region-update-end\",h,e)))},p=function(i){var d=h.wavesurfer.getDuration(),f=h.util.withOrientation(i,h.vertical);if(!(i.touches&&i.touches.length>1)&&(!i.targetTouches||i.targetTouches[0].identifier==t)&&(r||n)){var g=h.regionsUtil.getRegionSnapToGridValue(h.wavesurfer.drawer.handleEvent(i)*d);if(r){var p=h.wavesurfer.getDuration();g>p-l&&(g=p-l),g-o<0&&(g=o)}if(n){var m=h.minLength;m||(m=0),\"start\"===n?(g>h.end-m&&(g=h.end-m),g<0&&(g=0)):\"end\"===n&&(g<h.start+m&&(g=h.start+m),g>d&&(g=d))}var w=g-e;if(e=g,h.drag&&r&&(c=c||!!w,h.onDrag(w)),h.resize&&n&&(c=c||!!w,h.onResize(w,n)),h.scroll&&u.clientWidth<h.wrapper.scrollWidth){var b=f.clientX;(s=b<a.left+h.edgeScrollWidth?-1:b>a.right-h.edgeScrollWidth?1:null)&&v(i)}}};this.element.addEventListener(\"mousedown\",f),this.element.addEventListener(\"touchstart\",f),document.body.addEventListener(\"mousemove\",p),document.body.addEventListener(\"touchmove\",p,{passive:!1}),document.addEventListener(\"mouseup\",g),document.body.addEventListener(\"touchend\",g),this.on(\"remove\",(function(){document.removeEventListener(\"mouseup\",g),document.body.removeEventListener(\"touchend\",g),document.body.removeEventListener(\"mousemove\",p),document.body.removeEventListener(\"touchmove\",p)})),this.wavesurfer.on(\"destroy\",(function(){document.removeEventListener(\"mouseup\",g),document.body.removeEventListener(\"touchend\",g)}))}},{key:\"onDrag\",value:function(e){var t=this.wavesurfer.getDuration();this.end+e>t&&(e=t-this.end),this.start+e<0&&(e=-1*this.start),this.update({start:this.start+e,end:this.end+e})}},{key:\"onResize\",value:function(e,t){var r=this.wavesurfer.getDuration();\"start\"===t?(e>0&&this.end-(this.start+e)<this.minLength&&(e=this.end-this.minLength-this.start),e<0&&this.start+e<0&&(e=-1*this.start),this.update({start:Math.min(this.start+e,this.end),end:Math.max(this.start+e,this.end)})):(e<0&&this.end+e-this.start<this.minLength&&(e=this.start+this.minLength-this.end),e>0&&this.end+e>r&&(e=r-this.end),this.update({start:Math.min(this.end+e,this.start),end:Math.max(this.end+e,this.start)}))}},{key:\"updateHandlesResize\",value:function(e){var t;t=e?this.vertical?\"row-resize\":\"col-resize\":\"auto\",this.handleLeftEl&&this.style(this.handleLeftEl,{cursor:t}),this.handleRightEl&&this.style(this.handleRightEl,{cursor:t})}}])&&r(t.prototype,i),n&&r(t,n),e}();t.Region=i}},t={};return function r(i){var n=t[i];if(void 0!==n)return n.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,r),s.exports}(23)})()}));\n\n\n//# sourceURL=webpack://vanity/./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js?");

/***/ }),

/***/ "./node_modules/wavesurfer.js/dist/wavesurfer.js":
/*!*******************************************************!*\
  !*** ./node_modules/wavesurfer.js/dist/wavesurfer.js ***!
  \*******************************************************/
/***/ (function(module) {

eval("/*!\n * wavesurfer.js 5.1.0 (2021-06-20)\n * https://wavesurfer-js.org\n * @license BSD-3-Clause\n */\n(function webpackUniversalModuleDefinition(root, factory) {\n\tif(true)\n\t\tmodule.exports = factory();\n\telse {}\n})(this, function() {\nreturn /******/ (() => { // webpackBootstrap\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./src/drawer.canvasentry.js\":\n/*!***********************************!*\\\n  !*** ./src/drawer.canvasentry.js ***!\n  \\***********************************/\n/***/ ((module, exports, __nested_webpack_require_747__) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar _style = _interopRequireDefault(__nested_webpack_require_747__(/*! ./util/style */ \"./src/util/style.js\"));\n\nvar _getId = _interopRequireDefault(__nested_webpack_require_747__(/*! ./util/get-id */ \"./src/util/get-id.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\n * The `CanvasEntry` class represents an element consisting of a wave `canvas`\n * and an (optional) progress wave `canvas`.\n *\n * The `MultiCanvas` renderer uses one or more `CanvasEntry` instances to\n * render a waveform, depending on the zoom level.\n */\nvar CanvasEntry = /*#__PURE__*/function () {\n  function CanvasEntry() {\n    _classCallCheck(this, CanvasEntry);\n\n    /**\n     * The wave node\n     *\n     * @type {HTMLCanvasElement}\n     */\n    this.wave = null;\n    /**\n     * The wave canvas rendering context\n     *\n     * @type {CanvasRenderingContext2D}\n     */\n\n    this.waveCtx = null;\n    /**\n     * The (optional) progress wave node\n     *\n     * @type {HTMLCanvasElement}\n     */\n\n    this.progress = null;\n    /**\n     * The (optional) progress wave canvas rendering context\n     *\n     * @type {CanvasRenderingContext2D}\n     */\n\n    this.progressCtx = null;\n    /**\n     * Start of the area the canvas should render, between 0 and 1\n     *\n     * @type {number}\n     */\n\n    this.start = 0;\n    /**\n     * End of the area the canvas should render, between 0 and 1\n     *\n     * @type {number}\n     */\n\n    this.end = 1;\n    /**\n     * Unique identifier for this entry\n     *\n     * @type {string}\n     */\n\n    this.id = (0, _getId.default)(typeof this.constructor.name !== 'undefined' ? this.constructor.name.toLowerCase() + '_' : 'canvasentry_');\n    /**\n     * Canvas 2d context attributes\n     *\n     * @type {object}\n     */\n\n    this.canvasContextAttributes = {};\n  }\n  /**\n   * Store the wave canvas element and create the 2D rendering context\n   *\n   * @param {HTMLCanvasElement} element The wave `canvas` element.\n   */\n\n\n  _createClass(CanvasEntry, [{\n    key: \"initWave\",\n    value: function initWave(element) {\n      this.wave = element;\n      this.waveCtx = this.wave.getContext('2d', this.canvasContextAttributes);\n    }\n    /**\n     * Store the progress wave canvas element and create the 2D rendering\n     * context\n     *\n     * @param {HTMLCanvasElement} element The progress wave `canvas` element.\n     */\n\n  }, {\n    key: \"initProgress\",\n    value: function initProgress(element) {\n      this.progress = element;\n      this.progressCtx = this.progress.getContext('2d', this.canvasContextAttributes);\n    }\n    /**\n     * Update the dimensions\n     *\n     * @param {number} elementWidth Width of the entry\n     * @param {number} totalWidth Total width of the multi canvas renderer\n     * @param {number} width The new width of the element\n     * @param {number} height The new height of the element\n     */\n\n  }, {\n    key: \"updateDimensions\",\n    value: function updateDimensions(elementWidth, totalWidth, width, height) {\n      // where the canvas starts and ends in the waveform, represented as a\n      // decimal between 0 and 1\n      this.start = this.wave.offsetLeft / totalWidth || 0;\n      this.end = this.start + elementWidth / totalWidth; // set wave canvas dimensions\n\n      this.wave.width = width;\n      this.wave.height = height;\n      var elementSize = {\n        width: elementWidth + 'px'\n      };\n      (0, _style.default)(this.wave, elementSize);\n\n      if (this.hasProgressCanvas) {\n        // set progress canvas dimensions\n        this.progress.width = width;\n        this.progress.height = height;\n        (0, _style.default)(this.progress, elementSize);\n      }\n    }\n    /**\n     * Clear the wave and progress rendering contexts\n     */\n\n  }, {\n    key: \"clearWave\",\n    value: function clearWave() {\n      // wave\n      this.waveCtx.clearRect(0, 0, this.waveCtx.canvas.width, this.waveCtx.canvas.height); // progress\n\n      if (this.hasProgressCanvas) {\n        this.progressCtx.clearRect(0, 0, this.progressCtx.canvas.width, this.progressCtx.canvas.height);\n      }\n    }\n    /**\n     * Set the fill styles for wave and progress\n     *\n     * @param {string} waveColor Fill color for the wave canvas\n     * @param {?string} progressColor Fill color for the progress canvas\n     */\n\n  }, {\n    key: \"setFillStyles\",\n    value: function setFillStyles(waveColor, progressColor) {\n      this.waveCtx.fillStyle = waveColor;\n\n      if (this.hasProgressCanvas) {\n        this.progressCtx.fillStyle = progressColor;\n      }\n    }\n    /**\n     * Set the canvas transforms for wave and progress\n     *\n     * @param {boolean} vertical Whether to render vertically\n     */\n\n  }, {\n    key: \"applyCanvasTransforms\",\n    value: function applyCanvasTransforms(vertical) {\n      if (vertical) {\n        // Reflect the waveform across the line y = -x\n        this.waveCtx.setTransform(0, 1, 1, 0, 0, 0);\n\n        if (this.hasProgressCanvas) {\n          this.progressCtx.setTransform(0, 1, 1, 0, 0, 0);\n        }\n      }\n    }\n    /**\n     * Draw a rectangle for wave and progress\n     *\n     * @param {number} x X start position\n     * @param {number} y Y start position\n     * @param {number} width Width of the rectangle\n     * @param {number} height Height of the rectangle\n     * @param {number} radius Radius of the rectangle\n     */\n\n  }, {\n    key: \"fillRects\",\n    value: function fillRects(x, y, width, height, radius) {\n      this.fillRectToContext(this.waveCtx, x, y, width, height, radius);\n\n      if (this.hasProgressCanvas) {\n        this.fillRectToContext(this.progressCtx, x, y, width, height, radius);\n      }\n    }\n    /**\n     * Draw the actual rectangle on a `canvas` element\n     *\n     * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas\n     * @param {number} x X start position\n     * @param {number} y Y start position\n     * @param {number} width Width of the rectangle\n     * @param {number} height Height of the rectangle\n     * @param {number} radius Radius of the rectangle\n     */\n\n  }, {\n    key: \"fillRectToContext\",\n    value: function fillRectToContext(ctx, x, y, width, height, radius) {\n      if (!ctx) {\n        return;\n      }\n\n      if (radius) {\n        this.drawRoundedRect(ctx, x, y, width, height, radius);\n      } else {\n        ctx.fillRect(x, y, width, height);\n      }\n    }\n    /**\n     * Draw a rounded rectangle on Canvas\n     *\n     * @param {CanvasRenderingContext2D} ctx Canvas context\n     * @param {number} x X-position of the rectangle\n     * @param {number} y Y-position of the rectangle\n     * @param {number} width Width of the rectangle\n     * @param {number} height Height of the rectangle\n     * @param {number} radius Radius of the rectangle\n     *\n     * @return {void}\n     * @example drawRoundedRect(ctx, 50, 50, 5, 10, 3)\n     */\n\n  }, {\n    key: \"drawRoundedRect\",\n    value: function drawRoundedRect(ctx, x, y, width, height, radius) {\n      if (height === 0) {\n        return;\n      } // peaks are float values from -1 to 1. Use absolute height values in\n      // order to correctly calculate rounded rectangle coordinates\n\n\n      if (height < 0) {\n        height *= -1;\n        y -= height;\n      }\n\n      ctx.beginPath();\n      ctx.moveTo(x + radius, y);\n      ctx.lineTo(x + width - radius, y);\n      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);\n      ctx.lineTo(x + width, y + height - radius);\n      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);\n      ctx.lineTo(x + radius, y + height);\n      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);\n      ctx.lineTo(x, y + radius);\n      ctx.quadraticCurveTo(x, y, x + radius, y);\n      ctx.closePath();\n      ctx.fill();\n    }\n    /**\n     * Render the actual wave and progress lines\n     *\n     * @param {number[]} peaks Array with peaks data\n     * @param {number} absmax Maximum peak value (absolute)\n     * @param {number} halfH Half the height of the waveform\n     * @param {number} offsetY Offset to the top\n     * @param {number} start The x-offset of the beginning of the area that\n     * should be rendered\n     * @param {number} end The x-offset of the end of the area that\n     * should be rendered\n     */\n\n  }, {\n    key: \"drawLines\",\n    value: function drawLines(peaks, absmax, halfH, offsetY, start, end) {\n      this.drawLineToContext(this.waveCtx, peaks, absmax, halfH, offsetY, start, end);\n\n      if (this.hasProgressCanvas) {\n        this.drawLineToContext(this.progressCtx, peaks, absmax, halfH, offsetY, start, end);\n      }\n    }\n    /**\n     * Render the actual waveform line on a `canvas` element\n     *\n     * @param {CanvasRenderingContext2D} ctx Rendering context of target canvas\n     * @param {number[]} peaks Array with peaks data\n     * @param {number} absmax Maximum peak value (absolute)\n     * @param {number} halfH Half the height of the waveform\n     * @param {number} offsetY Offset to the top\n     * @param {number} start The x-offset of the beginning of the area that\n     * should be rendered\n     * @param {number} end The x-offset of the end of the area that\n     * should be rendered\n     */\n\n  }, {\n    key: \"drawLineToContext\",\n    value: function drawLineToContext(ctx, peaks, absmax, halfH, offsetY, start, end) {\n      if (!ctx) {\n        return;\n      }\n\n      var length = peaks.length / 2;\n      var first = Math.round(length * this.start); // use one more peak value to make sure we join peaks at ends -- unless,\n      // of course, this is the last canvas\n\n      var last = Math.round(length * this.end) + 1;\n      var canvasStart = first;\n      var canvasEnd = last;\n      var scale = this.wave.width / (canvasEnd - canvasStart - 1); // optimization\n\n      var halfOffset = halfH + offsetY;\n      var absmaxHalf = absmax / halfH;\n      ctx.beginPath();\n      ctx.moveTo((canvasStart - first) * scale, halfOffset);\n      ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart] || 0) / absmaxHalf));\n      var i, peak, h;\n\n      for (i = canvasStart; i < canvasEnd; i++) {\n        peak = peaks[2 * i] || 0;\n        h = Math.round(peak / absmaxHalf);\n        ctx.lineTo((i - first) * scale + this.halfPixel, halfOffset - h);\n      } // draw the bottom edge going backwards, to make a single\n      // closed hull to fill\n\n\n      var j = canvasEnd - 1;\n\n      for (j; j >= canvasStart; j--) {\n        peak = peaks[2 * j + 1] || 0;\n        h = Math.round(peak / absmaxHalf);\n        ctx.lineTo((j - first) * scale + this.halfPixel, halfOffset - h);\n      }\n\n      ctx.lineTo((canvasStart - first) * scale, halfOffset - Math.round((peaks[2 * canvasStart + 1] || 0) / absmaxHalf));\n      ctx.closePath();\n      ctx.fill();\n    }\n    /**\n     * Destroys this entry\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.waveCtx = null;\n      this.wave = null;\n      this.progressCtx = null;\n      this.progress = null;\n    }\n    /**\n     * Return image data of the wave `canvas` element\n     *\n     * When using a `type` of `'blob'`, this will return a `Promise` that\n     * resolves with a `Blob` instance.\n     *\n     * @param {string} format='image/png' An optional value of a format type.\n     * @param {number} quality=0.92 An optional value between 0 and 1.\n     * @param {string} type='dataURL' Either 'dataURL' or 'blob'.\n     * @return {string|Promise} When using the default `'dataURL'` `type` this\n     * returns a data URL. When using the `'blob'` `type` this returns a\n     * `Promise` that resolves with a `Blob` instance.\n     */\n\n  }, {\n    key: \"getImage\",\n    value: function getImage(format, quality, type) {\n      var _this = this;\n\n      if (type === 'blob') {\n        return new Promise(function (resolve) {\n          _this.wave.toBlob(resolve, format, quality);\n        });\n      } else if (type === 'dataURL') {\n        return this.wave.toDataURL(format, quality);\n      }\n    }\n  }]);\n\n  return CanvasEntry;\n}();\n\nexports.default = CanvasEntry;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/drawer.js\":\n/*!***********************!*\\\n  !*** ./src/drawer.js ***!\n  \\***********************/\n/***/ ((module, exports, __nested_webpack_require_13686__) => {\n\n\"use strict\";\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar util = _interopRequireWildcard(__nested_webpack_require_13686__(/*! ./util */ \"./src/util/index.js\"));\n\nfunction _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== \"function\") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }\n\nfunction _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== \"default\" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n/**\n * Parent class for renderers\n *\n * @extends {Observer}\n */\nvar Drawer = /*#__PURE__*/function (_util$Observer) {\n  _inherits(Drawer, _util$Observer);\n\n  var _super = _createSuper(Drawer);\n\n  /**\n   * @param {HTMLElement} container The container node of the wavesurfer instance\n   * @param {WavesurferParams} params The wavesurfer initialisation options\n   */\n  function Drawer(container, params) {\n    var _this;\n\n    _classCallCheck(this, Drawer);\n\n    _this = _super.call(this);\n    _this.container = util.withOrientation(container, params.vertical);\n    /**\n     * @type {WavesurferParams}\n     */\n\n    _this.params = params;\n    /**\n     * The width of the renderer\n     * @type {number}\n     */\n\n    _this.width = 0;\n    /**\n     * The height of the renderer\n     * @type {number}\n     */\n\n    _this.height = params.height * _this.params.pixelRatio;\n    _this.lastPos = 0;\n    /**\n     * The `<wave>` element which is added to the container\n     * @type {HTMLElement}\n     */\n\n    _this.wrapper = null;\n    return _this;\n  }\n  /**\n   * Alias of `util.style`\n   *\n   * @param {HTMLElement} el The element that the styles will be applied to\n   * @param {Object} styles The map of propName: attribute, both are used as-is\n   * @return {HTMLElement} el\n   */\n\n\n  _createClass(Drawer, [{\n    key: \"style\",\n    value: function style(el, styles) {\n      return util.style(el, styles);\n    }\n    /**\n     * Create the wrapper `<wave>` element, style it and set up the events for\n     * interaction\n     */\n\n  }, {\n    key: \"createWrapper\",\n    value: function createWrapper() {\n      this.wrapper = util.withOrientation(this.container.appendChild(document.createElement('wave')), this.params.vertical);\n      this.style(this.wrapper, {\n        display: 'block',\n        position: 'relative',\n        userSelect: 'none',\n        webkitUserSelect: 'none',\n        height: this.params.height + 'px'\n      });\n\n      if (this.params.fillParent || this.params.scrollParent) {\n        this.style(this.wrapper, {\n          width: '100%',\n          overflowX: this.params.hideScrollbar ? 'hidden' : 'auto',\n          overflowY: 'hidden'\n        });\n      }\n\n      this.setupWrapperEvents();\n    }\n    /**\n     * Handle click event\n     *\n     * @param {Event} e Click event\n     * @param {?boolean} noPrevent Set to true to not call `e.preventDefault()`\n     * @return {number} Playback position from 0 to 1\n     */\n\n  }, {\n    key: \"handleEvent\",\n    value: function handleEvent(e, noPrevent) {\n      !noPrevent && e.preventDefault();\n      var clientX = util.withOrientation(e.targetTouches ? e.targetTouches[0] : e, this.params.vertical).clientX;\n      var bbox = this.wrapper.getBoundingClientRect();\n      var nominalWidth = this.width;\n      var parentWidth = this.getWidth();\n      var progressPixels = this.getProgressPixels(bbox, clientX);\n      var progress;\n\n      if (!this.params.fillParent && nominalWidth < parentWidth) {\n        progress = progressPixels * (this.params.pixelRatio / nominalWidth) || 0;\n      } else {\n        progress = (progressPixels + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0;\n      }\n\n      return util.clamp(progress, 0, 1);\n    }\n  }, {\n    key: \"getProgressPixels\",\n    value: function getProgressPixels(wrapperBbox, clientX) {\n      if (this.params.rtl) {\n        return wrapperBbox.right - clientX;\n      } else {\n        return clientX - wrapperBbox.left;\n      }\n    }\n  }, {\n    key: \"setupWrapperEvents\",\n    value: function setupWrapperEvents() {\n      var _this2 = this;\n\n      this.wrapper.addEventListener('click', function (e) {\n        var orientedEvent = util.withOrientation(e, _this2.params.vertical);\n        var scrollbarHeight = _this2.wrapper.offsetHeight - _this2.wrapper.clientHeight;\n\n        if (scrollbarHeight !== 0) {\n          // scrollbar is visible.  Check if click was on it\n          var bbox = _this2.wrapper.getBoundingClientRect();\n\n          if (orientedEvent.clientY >= bbox.bottom - scrollbarHeight) {\n            // ignore mousedown as it was on the scrollbar\n            return;\n          }\n        }\n\n        if (_this2.params.interact) {\n          _this2.fireEvent('click', e, _this2.handleEvent(e));\n        }\n      });\n      this.wrapper.addEventListener('dblclick', function (e) {\n        if (_this2.params.interact) {\n          _this2.fireEvent('dblclick', e, _this2.handleEvent(e));\n        }\n      });\n      this.wrapper.addEventListener('scroll', function (e) {\n        return _this2.fireEvent('scroll', e);\n      });\n    }\n    /**\n     * Draw peaks on the canvas\n     *\n     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays\n     * for split channel rendering\n     * @param {number} length The width of the area that should be drawn\n     * @param {number} start The x-offset of the beginning of the area that\n     * should be rendered\n     * @param {number} end The x-offset of the end of the area that should be\n     * rendered\n     */\n\n  }, {\n    key: \"drawPeaks\",\n    value: function drawPeaks(peaks, length, start, end) {\n      if (!this.setWidth(length)) {\n        this.clearWave();\n      }\n\n      this.params.barWidth ? this.drawBars(peaks, 0, start, end) : this.drawWave(peaks, 0, start, end);\n    }\n    /**\n     * Scroll to the beginning\n     */\n\n  }, {\n    key: \"resetScroll\",\n    value: function resetScroll() {\n      if (this.wrapper !== null) {\n        this.wrapper.scrollLeft = 0;\n      }\n    }\n    /**\n     * Recenter the view-port at a certain percent of the waveform\n     *\n     * @param {number} percent Value from 0 to 1 on the waveform\n     */\n\n  }, {\n    key: \"recenter\",\n    value: function recenter(percent) {\n      var position = this.wrapper.scrollWidth * percent;\n      this.recenterOnPosition(position, true);\n    }\n    /**\n     * Recenter the view-port on a position, either scroll there immediately or\n     * in steps of 5 pixels\n     *\n     * @param {number} position X-offset in pixels\n     * @param {boolean} immediate Set to true to immediately scroll somewhere\n     */\n\n  }, {\n    key: \"recenterOnPosition\",\n    value: function recenterOnPosition(position, immediate) {\n      var scrollLeft = this.wrapper.scrollLeft;\n      var half = ~~(this.wrapper.clientWidth / 2);\n      var maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;\n      var target = position - half;\n      var offset = target - scrollLeft;\n\n      if (maxScroll == 0) {\n        // no need to continue if scrollbar is not there\n        return;\n      } // if the cursor is currently visible...\n\n\n      if (!immediate && -half <= offset && offset < half) {\n        // set rate at which waveform is centered\n        var rate = this.params.autoCenterRate; // make rate depend on width of view and length of waveform\n\n        rate /= half;\n        rate *= maxScroll;\n        offset = Math.max(-rate, Math.min(rate, offset));\n        target = scrollLeft + offset;\n      } // limit target to valid range (0 to maxScroll)\n\n\n      target = Math.max(0, Math.min(maxScroll, target)); // no use attempting to scroll if we're not moving\n\n      if (target != scrollLeft) {\n        this.wrapper.scrollLeft = target;\n      }\n    }\n    /**\n     * Get the current scroll position in pixels\n     *\n     * @return {number} Horizontal scroll position in pixels\n     */\n\n  }, {\n    key: \"getScrollX\",\n    value: function getScrollX() {\n      var x = 0;\n\n      if (this.wrapper) {\n        var pixelRatio = this.params.pixelRatio;\n        x = Math.round(this.wrapper.scrollLeft * pixelRatio); // In cases of elastic scroll (safari with mouse wheel) you can\n        // scroll beyond the limits of the container\n        // Calculate and floor the scrollable extent to make sure an out\n        // of bounds value is not returned\n        // Ticket #1312\n\n        if (this.params.scrollParent) {\n          var maxScroll = ~~(this.wrapper.scrollWidth * pixelRatio - this.getWidth());\n          x = Math.min(maxScroll, Math.max(0, x));\n        }\n      }\n\n      return x;\n    }\n    /**\n     * Get the width of the container\n     *\n     * @return {number} The width of the container\n     */\n\n  }, {\n    key: \"getWidth\",\n    value: function getWidth() {\n      return Math.round(this.container.clientWidth * this.params.pixelRatio);\n    }\n    /**\n     * Set the width of the container\n     *\n     * @param {number} width The new width of the container\n     * @return {boolean} Whether the width of the container was updated or not\n     */\n\n  }, {\n    key: \"setWidth\",\n    value: function setWidth(width) {\n      if (this.width == width) {\n        return false;\n      }\n\n      this.width = width;\n\n      if (this.params.fillParent || this.params.scrollParent) {\n        this.style(this.wrapper, {\n          width: ''\n        });\n      } else {\n        var newWidth = ~~(this.width / this.params.pixelRatio) + 'px';\n        this.style(this.wrapper, {\n          width: newWidth\n        });\n      }\n\n      this.updateSize();\n      return true;\n    }\n    /**\n     * Set the height of the container\n     *\n     * @param {number} height The new height of the container.\n     * @return {boolean} Whether the height of the container was updated or not\n     */\n\n  }, {\n    key: \"setHeight\",\n    value: function setHeight(height) {\n      if (height == this.height) {\n        return false;\n      }\n\n      this.height = height;\n      this.style(this.wrapper, {\n        height: ~~(this.height / this.params.pixelRatio) + 'px'\n      });\n      this.updateSize();\n      return true;\n    }\n    /**\n     * Called by wavesurfer when progress should be rendered\n     *\n     * @param {number} progress From 0 to 1\n     */\n\n  }, {\n    key: \"progress\",\n    value: function progress(_progress) {\n      var minPxDelta = 1 / this.params.pixelRatio;\n      var pos = Math.round(_progress * this.width) * minPxDelta;\n\n      if (pos < this.lastPos || pos - this.lastPos >= minPxDelta) {\n        this.lastPos = pos;\n\n        if (this.params.scrollParent && this.params.autoCenter) {\n          var newPos = ~~(this.wrapper.scrollWidth * _progress);\n          this.recenterOnPosition(newPos, this.params.autoCenterImmediately);\n        }\n\n        this.updateProgress(pos);\n      }\n    }\n    /**\n     * This is called when wavesurfer is destroyed\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.unAll();\n\n      if (this.wrapper) {\n        if (this.wrapper.parentNode == this.container.domElement) {\n          this.container.removeChild(this.wrapper.domElement);\n        }\n\n        this.wrapper = null;\n      }\n    }\n    /* Renderer-specific methods */\n\n    /**\n     * Called after cursor related params have changed.\n     *\n     * @abstract\n     */\n\n  }, {\n    key: \"updateCursor\",\n    value: function updateCursor() {}\n    /**\n     * Called when the size of the container changes so the renderer can adjust\n     *\n     * @abstract\n     */\n\n  }, {\n    key: \"updateSize\",\n    value: function updateSize() {}\n    /**\n     * Draw a waveform with bars\n     *\n     * @abstract\n     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel\n     * rendering\n     * @param {number} channelIndex The index of the current channel. Normally\n     * should be 0\n     * @param {number} start The x-offset of the beginning of the area that\n     * should be rendered\n     * @param {number} end The x-offset of the end of the area that should be\n     * rendered\n     */\n\n  }, {\n    key: \"drawBars\",\n    value: function drawBars(peaks, channelIndex, start, end) {}\n    /**\n     * Draw a waveform\n     *\n     * @abstract\n     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for split channel\n     * rendering\n     * @param {number} channelIndex The index of the current channel. Normally\n     * should be 0\n     * @param {number} start The x-offset of the beginning of the area that\n     * should be rendered\n     * @param {number} end The x-offset of the end of the area that should be\n     * rendered\n     */\n\n  }, {\n    key: \"drawWave\",\n    value: function drawWave(peaks, channelIndex, start, end) {}\n    /**\n     * Clear the waveform\n     *\n     * @abstract\n     */\n\n  }, {\n    key: \"clearWave\",\n    value: function clearWave() {}\n    /**\n     * Render the new progress\n     *\n     * @abstract\n     * @param {number} position X-Offset of progress position in pixels\n     */\n\n  }, {\n    key: \"updateProgress\",\n    value: function updateProgress(position) {}\n  }]);\n\n  return Drawer;\n}(util.Observer);\n\nexports.default = Drawer;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/drawer.multicanvas.js\":\n/*!***********************************!*\\\n  !*** ./src/drawer.multicanvas.js ***!\n  \\***********************************/\n/***/ ((module, exports, __nested_webpack_require_30704__) => {\n\n\"use strict\";\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar _drawer = _interopRequireDefault(__nested_webpack_require_30704__(/*! ./drawer */ \"./src/drawer.js\"));\n\nvar util = _interopRequireWildcard(__nested_webpack_require_30704__(/*! ./util */ \"./src/util/index.js\"));\n\nvar _drawer2 = _interopRequireDefault(__nested_webpack_require_30704__(/*! ./drawer.canvasentry */ \"./src/drawer.canvasentry.js\"));\n\nfunction _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== \"function\") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }\n\nfunction _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== \"default\" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n/**\n * MultiCanvas renderer for wavesurfer. Is currently the default and sole\n * builtin renderer.\n *\n * A `MultiCanvas` consists of one or more `CanvasEntry` instances, depending\n * on the zoom level.\n */\nvar MultiCanvas = /*#__PURE__*/function (_Drawer) {\n  _inherits(MultiCanvas, _Drawer);\n\n  var _super = _createSuper(MultiCanvas);\n\n  /**\n   * @param {HTMLElement} container The container node of the wavesurfer instance\n   * @param {WavesurferParams} params The wavesurfer initialisation options\n   */\n  function MultiCanvas(container, params) {\n    var _this;\n\n    _classCallCheck(this, MultiCanvas);\n\n    _this = _super.call(this, container, params);\n    /**\n     * @type {number}\n     */\n\n    _this.maxCanvasWidth = params.maxCanvasWidth;\n    /**\n     * @type {number}\n     */\n\n    _this.maxCanvasElementWidth = Math.round(params.maxCanvasWidth / params.pixelRatio);\n    /**\n     * Whether or not the progress wave is rendered. If the `waveColor`\n     * and `progressColor` are the same color it is not.\n     *\n     * @type {boolean}\n     */\n\n    _this.hasProgressCanvas = params.waveColor != params.progressColor;\n    /**\n     * @type {number}\n     */\n\n    _this.halfPixel = 0.5 / params.pixelRatio;\n    /**\n     * List of `CanvasEntry` instances.\n     *\n     * @type {Array}\n     */\n\n    _this.canvases = [];\n    /**\n     * @type {HTMLElement}\n     */\n\n    _this.progressWave = null;\n    /**\n     * Class used to generate entries.\n     *\n     * @type {function}\n     */\n\n    _this.EntryClass = _drawer2.default;\n    /**\n     * Canvas 2d context attributes.\n     *\n     * @type {object}\n     */\n\n    _this.canvasContextAttributes = params.drawingContextAttributes;\n    /**\n     * Overlap added between entries to prevent vertical white stripes\n     * between `canvas` elements.\n     *\n     * @type {number}\n     */\n\n    _this.overlap = 2 * Math.ceil(params.pixelRatio / 2);\n    /**\n     * The radius of the wave bars. Makes bars rounded\n     *\n     * @type {number}\n     */\n\n    _this.barRadius = params.barRadius || 0;\n    /**\n     * Whether to render the waveform vertically. Defaults to false.\n     *\n     * @type {boolean}\n     */\n\n    _this.vertical = params.vertical;\n    return _this;\n  }\n  /**\n   * Initialize the drawer\n   */\n\n\n  _createClass(MultiCanvas, [{\n    key: \"init\",\n    value: function init() {\n      this.createWrapper();\n      this.createElements();\n    }\n    /**\n     * Create the canvas elements and style them\n     *\n     */\n\n  }, {\n    key: \"createElements\",\n    value: function createElements() {\n      this.progressWave = util.withOrientation(this.wrapper.appendChild(document.createElement('wave')), this.params.vertical);\n      this.style(this.progressWave, {\n        position: 'absolute',\n        zIndex: 3,\n        left: 0,\n        top: 0,\n        bottom: 0,\n        overflow: 'hidden',\n        width: '0',\n        display: 'none',\n        boxSizing: 'border-box',\n        borderRightStyle: 'solid',\n        pointerEvents: 'none'\n      });\n      this.addCanvas();\n      this.updateCursor();\n    }\n    /**\n     * Update cursor style\n     */\n\n  }, {\n    key: \"updateCursor\",\n    value: function updateCursor() {\n      this.style(this.progressWave, {\n        borderRightWidth: this.params.cursorWidth + 'px',\n        borderRightColor: this.params.cursorColor\n      });\n    }\n    /**\n     * Adjust to the updated size by adding or removing canvases\n     */\n\n  }, {\n    key: \"updateSize\",\n    value: function updateSize() {\n      var _this2 = this;\n\n      var totalWidth = Math.round(this.width / this.params.pixelRatio);\n      var requiredCanvases = Math.ceil(totalWidth / (this.maxCanvasElementWidth + this.overlap)); // add required canvases\n\n      while (this.canvases.length < requiredCanvases) {\n        this.addCanvas();\n      } // remove older existing canvases, if any\n\n\n      while (this.canvases.length > requiredCanvases) {\n        this.removeCanvas();\n      }\n\n      var canvasWidth = this.maxCanvasWidth + this.overlap;\n      var lastCanvas = this.canvases.length - 1;\n      this.canvases.forEach(function (entry, i) {\n        if (i == lastCanvas) {\n          canvasWidth = _this2.width - _this2.maxCanvasWidth * lastCanvas;\n        }\n\n        _this2.updateDimensions(entry, canvasWidth, _this2.height);\n\n        entry.clearWave();\n      });\n    }\n    /**\n     * Add a canvas to the canvas list\n     *\n     */\n\n  }, {\n    key: \"addCanvas\",\n    value: function addCanvas() {\n      var entry = new this.EntryClass();\n      entry.canvasContextAttributes = this.canvasContextAttributes;\n      entry.hasProgressCanvas = this.hasProgressCanvas;\n      entry.halfPixel = this.halfPixel;\n      var leftOffset = this.maxCanvasElementWidth * this.canvases.length; // wave\n\n      var wave = util.withOrientation(this.wrapper.appendChild(document.createElement('canvas')), this.params.vertical);\n      this.style(wave, {\n        position: 'absolute',\n        zIndex: 2,\n        left: leftOffset + 'px',\n        top: 0,\n        bottom: 0,\n        height: '100%',\n        pointerEvents: 'none'\n      });\n      entry.initWave(wave); // progress\n\n      if (this.hasProgressCanvas) {\n        var progress = util.withOrientation(this.progressWave.appendChild(document.createElement('canvas')), this.params.vertical);\n        this.style(progress, {\n          position: 'absolute',\n          left: leftOffset + 'px',\n          top: 0,\n          bottom: 0,\n          height: '100%'\n        });\n        entry.initProgress(progress);\n      }\n\n      this.canvases.push(entry);\n    }\n    /**\n     * Pop single canvas from the list\n     *\n     */\n\n  }, {\n    key: \"removeCanvas\",\n    value: function removeCanvas() {\n      var lastEntry = this.canvases[this.canvases.length - 1]; // wave\n\n      lastEntry.wave.parentElement.removeChild(lastEntry.wave.domElement); // progress\n\n      if (this.hasProgressCanvas) {\n        lastEntry.progress.parentElement.removeChild(lastEntry.progress.domElement);\n      } // cleanup\n\n\n      if (lastEntry) {\n        lastEntry.destroy();\n        lastEntry = null;\n      }\n\n      this.canvases.pop();\n    }\n    /**\n     * Update the dimensions of a canvas element\n     *\n     * @param {CanvasEntry} entry Target entry\n     * @param {number} width The new width of the element\n     * @param {number} height The new height of the element\n     */\n\n  }, {\n    key: \"updateDimensions\",\n    value: function updateDimensions(entry, width, height) {\n      var elementWidth = Math.round(width / this.params.pixelRatio);\n      var totalWidth = Math.round(this.width / this.params.pixelRatio); // update canvas dimensions\n\n      entry.updateDimensions(elementWidth, totalWidth, width, height); // style element\n\n      this.style(this.progressWave, {\n        display: 'block'\n      });\n    }\n    /**\n     * Clear the whole multi-canvas\n     */\n\n  }, {\n    key: \"clearWave\",\n    value: function clearWave() {\n      var _this3 = this;\n\n      util.frame(function () {\n        _this3.canvases.forEach(function (entry) {\n          return entry.clearWave();\n        });\n      })();\n    }\n    /**\n     * Draw a waveform with bars\n     *\n     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays\n     * for split channel rendering\n     * @param {number} channelIndex The index of the current channel. Normally\n     * should be 0. Must be an integer.\n     * @param {number} start The x-offset of the beginning of the area that\n     * should be rendered\n     * @param {number} end The x-offset of the end of the area that should be\n     * rendered\n     * @returns {void}\n     */\n\n  }, {\n    key: \"drawBars\",\n    value: function drawBars(peaks, channelIndex, start, end) {\n      var _this4 = this;\n\n      return this.prepareDraw(peaks, channelIndex, start, end, function (_ref) {\n        var absmax = _ref.absmax,\n            hasMinVals = _ref.hasMinVals,\n            height = _ref.height,\n            offsetY = _ref.offsetY,\n            halfH = _ref.halfH,\n            peaks = _ref.peaks,\n            ch = _ref.channelIndex;\n\n        // if drawBars was called within ws.empty we don't pass a start and\n        // don't want anything to happen\n        if (start === undefined) {\n          return;\n        } // Skip every other value if there are negatives.\n\n\n        var peakIndexScale = hasMinVals ? 2 : 1;\n        var length = peaks.length / peakIndexScale;\n        var bar = _this4.params.barWidth * _this4.params.pixelRatio;\n        var gap = _this4.params.barGap === null ? Math.max(_this4.params.pixelRatio, ~~(bar / 2)) : Math.max(_this4.params.pixelRatio, _this4.params.barGap * _this4.params.pixelRatio);\n        var step = bar + gap;\n        var scale = length / _this4.width;\n        var first = start;\n        var last = end;\n        var i = first;\n\n        for (i; i < last; i += step) {\n          var peak = peaks[Math.floor(i * scale * peakIndexScale)] || 0;\n          var h = Math.round(peak / absmax * halfH);\n          /* in case of silences, allow the user to specify that we\n           * always draw *something* (normally a 1px high bar) */\n\n          if (h == 0 && _this4.params.barMinHeight) {\n            h = _this4.params.barMinHeight;\n          }\n\n          _this4.fillRect(i + _this4.halfPixel, halfH - h + offsetY, bar + _this4.halfPixel, h * 2, _this4.barRadius, ch);\n        }\n      });\n    }\n    /**\n     * Draw a waveform\n     *\n     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays\n     * for split channel rendering\n     * @param {number} channelIndex The index of the current channel. Normally\n     * should be 0\n     * @param {number?} start The x-offset of the beginning of the area that\n     * should be rendered (If this isn't set only a flat line is rendered)\n     * @param {number?} end The x-offset of the end of the area that should be\n     * rendered\n     * @returns {void}\n     */\n\n  }, {\n    key: \"drawWave\",\n    value: function drawWave(peaks, channelIndex, start, end) {\n      var _this5 = this;\n\n      return this.prepareDraw(peaks, channelIndex, start, end, function (_ref2) {\n        var absmax = _ref2.absmax,\n            hasMinVals = _ref2.hasMinVals,\n            height = _ref2.height,\n            offsetY = _ref2.offsetY,\n            halfH = _ref2.halfH,\n            peaks = _ref2.peaks,\n            channelIndex = _ref2.channelIndex;\n\n        if (!hasMinVals) {\n          var reflectedPeaks = [];\n          var len = peaks.length;\n          var i = 0;\n\n          for (i; i < len; i++) {\n            reflectedPeaks[2 * i] = peaks[i];\n            reflectedPeaks[2 * i + 1] = -peaks[i];\n          }\n\n          peaks = reflectedPeaks;\n        } // if drawWave was called within ws.empty we don't pass a start and\n        // end and simply want a flat line\n\n\n        if (start !== undefined) {\n          _this5.drawLine(peaks, absmax, halfH, offsetY, start, end, channelIndex);\n        } // always draw a median line\n\n\n        _this5.fillRect(0, halfH + offsetY - _this5.halfPixel, _this5.width, _this5.halfPixel, _this5.barRadius, channelIndex);\n      });\n    }\n    /**\n     * Tell the canvas entries to render their portion of the waveform\n     *\n     * @param {number[]} peaks Peaks data\n     * @param {number} absmax Maximum peak value (absolute)\n     * @param {number} halfH Half the height of the waveform\n     * @param {number} offsetY Offset to the top\n     * @param {number} start The x-offset of the beginning of the area that\n     * should be rendered\n     * @param {number} end The x-offset of the end of the area that\n     * should be rendered\n     * @param {channelIndex} channelIndex The channel index of the line drawn\n     */\n\n  }, {\n    key: \"drawLine\",\n    value: function drawLine(peaks, absmax, halfH, offsetY, start, end, channelIndex) {\n      var _this6 = this;\n\n      var _ref3 = this.params.splitChannelsOptions.channelColors[channelIndex] || {},\n          waveColor = _ref3.waveColor,\n          progressColor = _ref3.progressColor;\n\n      this.canvases.forEach(function (entry, i) {\n        _this6.setFillStyles(entry, waveColor, progressColor);\n\n        _this6.applyCanvasTransforms(entry, _this6.params.vertical);\n\n        entry.drawLines(peaks, absmax, halfH, offsetY, start, end);\n      });\n    }\n    /**\n     * Draw a rectangle on the multi-canvas\n     *\n     * @param {number} x X-position of the rectangle\n     * @param {number} y Y-position of the rectangle\n     * @param {number} width Width of the rectangle\n     * @param {number} height Height of the rectangle\n     * @param {number} radius Radius of the rectangle\n     * @param {channelIndex} channelIndex The channel index of the bar drawn\n     */\n\n  }, {\n    key: \"fillRect\",\n    value: function fillRect(x, y, width, height, radius, channelIndex) {\n      var startCanvas = Math.floor(x / this.maxCanvasWidth);\n      var endCanvas = Math.min(Math.ceil((x + width) / this.maxCanvasWidth) + 1, this.canvases.length);\n      var i = startCanvas;\n\n      for (i; i < endCanvas; i++) {\n        var entry = this.canvases[i];\n        var leftOffset = i * this.maxCanvasWidth;\n        var intersection = {\n          x1: Math.max(x, i * this.maxCanvasWidth),\n          y1: y,\n          x2: Math.min(x + width, i * this.maxCanvasWidth + entry.wave.width),\n          y2: y + height\n        };\n\n        if (intersection.x1 < intersection.x2) {\n          var _ref4 = this.params.splitChannelsOptions.channelColors[channelIndex] || {},\n              waveColor = _ref4.waveColor,\n              progressColor = _ref4.progressColor;\n\n          this.setFillStyles(entry, waveColor, progressColor);\n          this.applyCanvasTransforms(entry, this.params.vertical);\n          entry.fillRects(intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1, radius);\n        }\n      }\n    }\n    /**\n     * Returns whether to hide the channel from being drawn based on params.\n     *\n     * @param {number} channelIndex The index of the current channel.\n     * @returns {bool} True to hide the channel, false to draw.\n     */\n\n  }, {\n    key: \"hideChannel\",\n    value: function hideChannel(channelIndex) {\n      return this.params.splitChannels && this.params.splitChannelsOptions.filterChannels.includes(channelIndex);\n    }\n    /**\n     * Performs preparation tasks and calculations which are shared by `drawBars`\n     * and `drawWave`\n     *\n     * @param {number[]|Number.<Array[]>} peaks Can also be an array of arrays for\n     * split channel rendering\n     * @param {number} channelIndex The index of the current channel. Normally\n     * should be 0\n     * @param {number?} start The x-offset of the beginning of the area that\n     * should be rendered. If this isn't set only a flat line is rendered\n     * @param {number?} end The x-offset of the end of the area that should be\n     * rendered\n     * @param {function} fn The render function to call, e.g. `drawWave`\n     * @param {number} drawIndex The index of the current channel after filtering.\n     * @param {number?} normalizedMax Maximum modulation value across channels for use with relativeNormalization. Ignored when undefined\n     * @returns {void}\n     */\n\n  }, {\n    key: \"prepareDraw\",\n    value: function prepareDraw(peaks, channelIndex, start, end, fn, drawIndex, normalizedMax) {\n      var _this7 = this;\n\n      return util.frame(function () {\n        // Split channels and call this function with the channelIndex set\n        if (peaks[0] instanceof Array) {\n          var channels = peaks;\n\n          if (_this7.params.splitChannels) {\n            var filteredChannels = channels.filter(function (c, i) {\n              return !_this7.hideChannel(i);\n            });\n\n            if (!_this7.params.splitChannelsOptions.overlay) {\n              _this7.setHeight(Math.max(filteredChannels.length, 1) * _this7.params.height * _this7.params.pixelRatio);\n            }\n\n            var overallAbsMax;\n\n            if (_this7.params.splitChannelsOptions && _this7.params.splitChannelsOptions.relativeNormalization) {\n              // calculate maximum peak across channels to use for normalization\n              overallAbsMax = util.max(channels.map(function (channelPeaks) {\n                return util.absMax(channelPeaks);\n              }));\n            }\n\n            return channels.forEach(function (channelPeaks, i) {\n              return _this7.prepareDraw(channelPeaks, i, start, end, fn, filteredChannels.indexOf(channelPeaks), overallAbsMax);\n            });\n          }\n\n          peaks = channels[0];\n        } // Return and do not draw channel peaks if hidden.\n\n\n        if (_this7.hideChannel(channelIndex)) {\n          return;\n        } // calculate maximum modulation value, either from the barHeight\n        // parameter or if normalize=true from the largest value in the peak\n        // set\n\n\n        var absmax = 1 / _this7.params.barHeight;\n\n        if (_this7.params.normalize) {\n          absmax = normalizedMax === undefined ? util.absMax(peaks) : normalizedMax;\n        } // Bar wave draws the bottom only as a reflection of the top,\n        // so we don't need negative values\n\n\n        var hasMinVals = [].some.call(peaks, function (val) {\n          return val < 0;\n        });\n        var height = _this7.params.height * _this7.params.pixelRatio;\n        var halfH = height / 2;\n        var offsetY = height * drawIndex || 0; // Override offsetY if overlay is true\n\n        if (_this7.params.splitChannelsOptions && _this7.params.splitChannelsOptions.overlay) {\n          offsetY = 0;\n        }\n\n        return fn({\n          absmax: absmax,\n          hasMinVals: hasMinVals,\n          height: height,\n          offsetY: offsetY,\n          halfH: halfH,\n          peaks: peaks,\n          channelIndex: channelIndex\n        });\n      })();\n    }\n    /**\n     * Set the fill styles for a certain entry (wave and progress)\n     *\n     * @param {CanvasEntry} entry Target entry\n     * @param {string} waveColor Wave color to draw this entry\n     * @param {string} progressColor Progress color to draw this entry\n     */\n\n  }, {\n    key: \"setFillStyles\",\n    value: function setFillStyles(entry) {\n      var waveColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.params.waveColor;\n      var progressColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.params.progressColor;\n      entry.setFillStyles(waveColor, progressColor);\n    }\n    /**\n     * Set the canvas transforms for a certain entry (wave and progress)\n     *\n     * @param {CanvasEntry} entry Target entry\n     * @param {boolean} vertical Whether to render the waveform vertically\n     */\n\n  }, {\n    key: \"applyCanvasTransforms\",\n    value: function applyCanvasTransforms(entry) {\n      var vertical = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n      entry.applyCanvasTransforms(vertical);\n    }\n    /**\n     * Return image data of the multi-canvas\n     *\n     * When using a `type` of `'blob'`, this will return a `Promise`.\n     *\n     * @param {string} format='image/png' An optional value of a format type.\n     * @param {number} quality=0.92 An optional value between 0 and 1.\n     * @param {string} type='dataURL' Either 'dataURL' or 'blob'.\n     * @return {string|string[]|Promise} When using the default `'dataURL'`\n     * `type` this returns a single data URL or an array of data URLs,\n     * one for each canvas. When using the `'blob'` `type` this returns a\n     * `Promise` that resolves with an array of `Blob` instances, one for each\n     * canvas.\n     */\n\n  }, {\n    key: \"getImage\",\n    value: function getImage(format, quality, type) {\n      if (type === 'blob') {\n        return Promise.all(this.canvases.map(function (entry) {\n          return entry.getImage(format, quality, type);\n        }));\n      } else if (type === 'dataURL') {\n        var images = this.canvases.map(function (entry) {\n          return entry.getImage(format, quality, type);\n        });\n        return images.length > 1 ? images : images[0];\n      }\n    }\n    /**\n     * Render the new progress\n     *\n     * @param {number} position X-offset of progress position in pixels\n     */\n\n  }, {\n    key: \"updateProgress\",\n    value: function updateProgress(position) {\n      this.style(this.progressWave, {\n        width: position + 'px'\n      });\n    }\n  }]);\n\n  return MultiCanvas;\n}(_drawer.default);\n\nexports.default = MultiCanvas;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/mediaelement-webaudio.js\":\n/*!**************************************!*\\\n  !*** ./src/mediaelement-webaudio.js ***!\n  \\**************************************/\n/***/ ((module, exports, __nested_webpack_require_55897__) => {\n\n\"use strict\";\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar _mediaelement = _interopRequireDefault(__nested_webpack_require_55897__(/*! ./mediaelement */ \"./src/mediaelement.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n/**\n * MediaElementWebAudio backend: load audio via an HTML5 audio tag, but playback with the WebAudio API.\n * The advantage here is that the html5 <audio> tag can perform range requests on the server and not\n * buffer the entire file in one request, and you still get the filtering and scripting functionality\n * of the webaudio API.\n * Note that in order to use range requests and prevent buffering, you must provide peak data.\n *\n * @since 3.2.0\n */\nvar MediaElementWebAudio = /*#__PURE__*/function (_MediaElement) {\n  _inherits(MediaElementWebAudio, _MediaElement);\n\n  var _super = _createSuper(MediaElementWebAudio);\n\n  /**\n   * Construct the backend\n   *\n   * @param {WavesurferParams} params Wavesurfer parameters\n   */\n  function MediaElementWebAudio(params) {\n    var _this;\n\n    _classCallCheck(this, MediaElementWebAudio);\n\n    _this = _super.call(this, params);\n    /** @private */\n\n    _this.params = params;\n    /** @private */\n\n    _this.sourceMediaElement = null;\n    return _this;\n  }\n  /**\n   * Initialise the backend, called in `wavesurfer.createBackend()`\n   */\n\n\n  _createClass(MediaElementWebAudio, [{\n    key: \"init\",\n    value: function init() {\n      this.setPlaybackRate(this.params.audioRate);\n      this.createTimer();\n      this.createVolumeNode();\n      this.createScriptNode();\n      this.createAnalyserNode();\n    }\n    /**\n     * Private method called by both `load` (from url)\n     * and `loadElt` (existing media element) methods.\n     *\n     * @param {HTMLMediaElement} media HTML5 Audio or Video element\n     * @param {number[]|Number.<Array[]>} peaks Array of peak data\n     * @param {string} preload HTML 5 preload attribute value\n     * @private\n     */\n\n  }, {\n    key: \"_load\",\n    value: function _load(media, peaks, preload) {\n      _get(_getPrototypeOf(MediaElementWebAudio.prototype), \"_load\", this).call(this, media, peaks, preload);\n\n      this.createMediaElementSource(media);\n    }\n    /**\n     * Create MediaElementSource node\n     *\n     * @since 3.2.0\n     * @param {HTMLMediaElement} mediaElement HTML5 Audio to load\n     */\n\n  }, {\n    key: \"createMediaElementSource\",\n    value: function createMediaElementSource(mediaElement) {\n      this.sourceMediaElement = this.ac.createMediaElementSource(mediaElement);\n      this.sourceMediaElement.connect(this.analyser);\n    }\n  }, {\n    key: \"play\",\n    value: function play(start, end) {\n      this.resumeAudioContext();\n      return _get(_getPrototypeOf(MediaElementWebAudio.prototype), \"play\", this).call(this, start, end);\n    }\n    /**\n     * This is called when wavesurfer is destroyed\n     *\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      _get(_getPrototypeOf(MediaElementWebAudio.prototype), \"destroy\", this).call(this);\n\n      this.destroyWebAudio();\n    }\n  }]);\n\n  return MediaElementWebAudio;\n}(_mediaelement.default);\n\nexports.default = MediaElementWebAudio;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/mediaelement.js\":\n/*!*****************************!*\\\n  !*** ./src/mediaelement.js ***!\n  \\*****************************/\n/***/ ((module, exports, __nested_webpack_require_62911__) => {\n\n\"use strict\";\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar _webaudio = _interopRequireDefault(__nested_webpack_require_62911__(/*! ./webaudio */ \"./src/webaudio.js\"));\n\nvar util = _interopRequireWildcard(__nested_webpack_require_62911__(/*! ./util */ \"./src/util/index.js\"));\n\nfunction _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== \"function\") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }\n\nfunction _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== \"default\" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _get(target, property, receiver) { if (typeof Reflect !== \"undefined\" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }\n\nfunction _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n/**\n * MediaElement backend\n */\nvar MediaElement = /*#__PURE__*/function (_WebAudio) {\n  _inherits(MediaElement, _WebAudio);\n\n  var _super = _createSuper(MediaElement);\n\n  /**\n   * Construct the backend\n   *\n   * @param {WavesurferParams} params Wavesurfer parameters\n   */\n  function MediaElement(params) {\n    var _this;\n\n    _classCallCheck(this, MediaElement);\n\n    _this = _super.call(this, params);\n    /** @private */\n\n    _this.params = params;\n    /**\n     * Initially a dummy media element to catch errors. Once `_load` is\n     * called, this will contain the actual `HTMLMediaElement`.\n     * @private\n     */\n\n    _this.media = {\n      currentTime: 0,\n      duration: 0,\n      paused: true,\n      playbackRate: 1,\n      play: function play() {},\n      pause: function pause() {},\n      volume: 0\n    };\n    /** @private */\n\n    _this.mediaType = params.mediaType.toLowerCase();\n    /** @private */\n\n    _this.elementPosition = params.elementPosition;\n    /** @private */\n\n    _this.peaks = null;\n    /** @private */\n\n    _this.playbackRate = 1;\n    /** @private */\n\n    _this.volume = 1;\n    /** @private */\n\n    _this.isMuted = false;\n    /** @private */\n\n    _this.buffer = null;\n    /** @private */\n\n    _this.onPlayEnd = null;\n    /** @private */\n\n    _this.mediaListeners = {};\n    return _this;\n  }\n  /**\n   * Initialise the backend, called in `wavesurfer.createBackend()`\n   */\n\n\n  _createClass(MediaElement, [{\n    key: \"init\",\n    value: function init() {\n      this.setPlaybackRate(this.params.audioRate);\n      this.createTimer();\n    }\n    /**\n     * Attach event listeners to media element.\n     */\n\n  }, {\n    key: \"_setupMediaListeners\",\n    value: function _setupMediaListeners() {\n      var _this2 = this;\n\n      this.mediaListeners.error = function () {\n        _this2.fireEvent('error', 'Error loading media element');\n      };\n\n      this.mediaListeners.canplay = function () {\n        _this2.fireEvent('canplay');\n      };\n\n      this.mediaListeners.ended = function () {\n        _this2.fireEvent('finish');\n      }; // listen to and relay play, pause and seeked events to enable\n      // playback control from the external media element\n\n\n      this.mediaListeners.play = function () {\n        _this2.fireEvent('play');\n      };\n\n      this.mediaListeners.pause = function () {\n        _this2.fireEvent('pause');\n      };\n\n      this.mediaListeners.seeked = function (event) {\n        _this2.fireEvent('seek');\n      };\n\n      this.mediaListeners.volumechange = function (event) {\n        _this2.isMuted = _this2.media.muted;\n\n        if (_this2.isMuted) {\n          _this2.volume = 0;\n        } else {\n          _this2.volume = _this2.media.volume;\n        }\n\n        _this2.fireEvent('volume');\n      }; // reset event listeners\n\n\n      Object.keys(this.mediaListeners).forEach(function (id) {\n        _this2.media.removeEventListener(id, _this2.mediaListeners[id]);\n\n        _this2.media.addEventListener(id, _this2.mediaListeners[id]);\n      });\n    }\n    /**\n     * Create a timer to provide a more precise `audioprocess` event.\n     */\n\n  }, {\n    key: \"createTimer\",\n    value: function createTimer() {\n      var _this3 = this;\n\n      var onAudioProcess = function onAudioProcess() {\n        if (_this3.isPaused()) {\n          return;\n        }\n\n        _this3.fireEvent('audioprocess', _this3.getCurrentTime()); // Call again in the next frame\n\n\n        util.frame(onAudioProcess)();\n      };\n\n      this.on('play', onAudioProcess); // Update the progress one more time to prevent it from being stuck in\n      // case of lower framerates\n\n      this.on('pause', function () {\n        _this3.fireEvent('audioprocess', _this3.getCurrentTime());\n      });\n    }\n    /**\n     * Create media element with url as its source,\n     * and append to container element.\n     *\n     * @param {string} url Path to media file\n     * @param {HTMLElement} container HTML element\n     * @param {number[]|Number.<Array[]>} peaks Array of peak data\n     * @param {string} preload HTML 5 preload attribute value\n     * @throws Will throw an error if the `url` argument is not a valid media\n     * element.\n     */\n\n  }, {\n    key: \"load\",\n    value: function load(url, container, peaks, preload) {\n      var media = document.createElement(this.mediaType);\n      media.controls = this.params.mediaControls;\n      media.autoplay = this.params.autoplay || false;\n      media.preload = preload == null ? 'auto' : preload;\n      media.src = url;\n      media.style.width = '100%';\n      var prevMedia = container.querySelector(this.mediaType);\n\n      if (prevMedia) {\n        container.removeChild(prevMedia);\n      }\n\n      container.appendChild(media);\n\n      this._load(media, peaks, preload);\n    }\n    /**\n     * Load existing media element.\n     *\n     * @param {HTMLMediaElement} elt HTML5 Audio or Video element\n     * @param {number[]|Number.<Array[]>} peaks Array of peak data\n     */\n\n  }, {\n    key: \"loadElt\",\n    value: function loadElt(elt, peaks) {\n      elt.controls = this.params.mediaControls;\n      elt.autoplay = this.params.autoplay || false;\n\n      this._load(elt, peaks, elt.preload);\n    }\n    /**\n     * Method called by both `load` (from url)\n     * and `loadElt` (existing media element) methods.\n     *\n     * @param {HTMLMediaElement} media HTML5 Audio or Video element\n     * @param {number[]|Number.<Array[]>} peaks Array of peak data\n     * @param {string} preload HTML 5 preload attribute value\n     * @throws Will throw an error if the `media` argument is not a valid media\n     * element.\n     * @private\n     */\n\n  }, {\n    key: \"_load\",\n    value: function _load(media, peaks, preload) {\n      // verify media element is valid\n      if (!(media instanceof HTMLMediaElement) || typeof media.addEventListener === 'undefined') {\n        throw new Error('media parameter is not a valid media element');\n      } // load must be called manually on iOS, otherwise peaks won't draw\n      // until a user interaction triggers load --> 'ready' event\n      //\n      // note that we avoid calling media.load here when given peaks and preload == 'none'\n      // as this almost always triggers some browser fetch of the media.\n\n\n      if (typeof media.load == 'function' && !(peaks && preload == 'none')) {\n        // Resets the media element and restarts the media resource. Any\n        // pending events are discarded. How much media data is fetched is\n        // still affected by the preload attribute.\n        media.load();\n      }\n\n      this.media = media;\n\n      this._setupMediaListeners();\n\n      this.peaks = peaks;\n      this.onPlayEnd = null;\n      this.buffer = null;\n      this.isMuted = media.muted;\n      this.setPlaybackRate(this.playbackRate);\n      this.setVolume(this.volume);\n    }\n    /**\n     * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`\n     *\n     * @return {boolean} Media paused or not\n     */\n\n  }, {\n    key: \"isPaused\",\n    value: function isPaused() {\n      return !this.media || this.media.paused;\n    }\n    /**\n     * Used by `wavesurfer.getDuration()`\n     *\n     * @return {number} Duration\n     */\n\n  }, {\n    key: \"getDuration\",\n    value: function getDuration() {\n      if (this.explicitDuration) {\n        return this.explicitDuration;\n      }\n\n      var duration = (this.buffer || this.media).duration;\n\n      if (duration >= Infinity) {\n        // streaming audio\n        duration = this.media.seekable.end(0);\n      }\n\n      return duration;\n    }\n    /**\n     * Returns the current time in seconds relative to the audio-clip's\n     * duration.\n     *\n     * @return {number} Current time\n     */\n\n  }, {\n    key: \"getCurrentTime\",\n    value: function getCurrentTime() {\n      return this.media && this.media.currentTime;\n    }\n    /**\n     * Get the position from 0 to 1\n     *\n     * @return {number} Current position\n     */\n\n  }, {\n    key: \"getPlayedPercents\",\n    value: function getPlayedPercents() {\n      return this.getCurrentTime() / this.getDuration() || 0;\n    }\n    /**\n     * Get the audio source playback rate.\n     *\n     * @return {number} Playback rate\n     */\n\n  }, {\n    key: \"getPlaybackRate\",\n    value: function getPlaybackRate() {\n      return this.playbackRate || this.media.playbackRate;\n    }\n    /**\n     * Set the audio source playback rate.\n     *\n     * @param {number} value Playback rate\n     */\n\n  }, {\n    key: \"setPlaybackRate\",\n    value: function setPlaybackRate(value) {\n      this.playbackRate = value || 1;\n      this.media.playbackRate = this.playbackRate;\n    }\n    /**\n     * Used by `wavesurfer.seekTo()`\n     *\n     * @param {number} start Position to start at in seconds\n     */\n\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(start) {\n      if (start != null) {\n        this.media.currentTime = start;\n      }\n\n      this.clearPlayEnd();\n    }\n    /**\n     * Plays the loaded audio region.\n     *\n     * @param {number} start Start offset in seconds, relative to the beginning\n     * of a clip.\n     * @param {number} end When to stop, relative to the beginning of a clip.\n     * @emits MediaElement#play\n     * @return {Promise} Result\n     */\n\n  }, {\n    key: \"play\",\n    value: function play(start, end) {\n      this.seekTo(start);\n      var promise = this.media.play();\n      end && this.setPlayEnd(end);\n      return promise;\n    }\n    /**\n     * Pauses the loaded audio.\n     *\n     * @emits MediaElement#pause\n     * @return {Promise} Result\n     */\n\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      var promise;\n\n      if (this.media) {\n        promise = this.media.pause();\n      }\n\n      this.clearPlayEnd();\n      return promise;\n    }\n    /**\n     * Set the play end\n     *\n     * @param {number} end Where to end\n     */\n\n  }, {\n    key: \"setPlayEnd\",\n    value: function setPlayEnd(end) {\n      var _this4 = this;\n\n      this.clearPlayEnd();\n\n      this._onPlayEnd = function (time) {\n        if (time >= end) {\n          _this4.pause();\n\n          _this4.seekTo(end);\n        }\n      };\n\n      this.on('audioprocess', this._onPlayEnd);\n    }\n    /** @private */\n\n  }, {\n    key: \"clearPlayEnd\",\n    value: function clearPlayEnd() {\n      if (this._onPlayEnd) {\n        this.un('audioprocess', this._onPlayEnd);\n        this._onPlayEnd = null;\n      }\n    }\n    /**\n     * Compute the max and min value of the waveform when broken into\n     * <length> subranges.\n     *\n     * @param {number} length How many subranges to break the waveform into.\n     * @param {number} first First sample in the required range.\n     * @param {number} last Last sample in the required range.\n     * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of\n     * arrays of peaks consisting of (max, min) values for each subrange.\n     */\n\n  }, {\n    key: \"getPeaks\",\n    value: function getPeaks(length, first, last) {\n      if (this.buffer) {\n        return _get(_getPrototypeOf(MediaElement.prototype), \"getPeaks\", this).call(this, length, first, last);\n      }\n\n      return this.peaks || [];\n    }\n    /**\n     * Set the sink id for the media player\n     *\n     * @param {string} deviceId String value representing audio device id.\n     * @returns {Promise} A Promise that resolves to `undefined` when there\n     * are no errors.\n     */\n\n  }, {\n    key: \"setSinkId\",\n    value: function setSinkId(deviceId) {\n      if (deviceId) {\n        if (!this.media.setSinkId) {\n          return Promise.reject(new Error('setSinkId is not supported in your browser'));\n        }\n\n        return this.media.setSinkId(deviceId);\n      }\n\n      return Promise.reject(new Error('Invalid deviceId: ' + deviceId));\n    }\n    /**\n     * Get the current volume\n     *\n     * @return {number} value A floating point value between 0 and 1.\n     */\n\n  }, {\n    key: \"getVolume\",\n    value: function getVolume() {\n      return this.volume;\n    }\n    /**\n     * Set the audio volume\n     *\n     * @param {number} value A floating point value between 0 and 1.\n     */\n\n  }, {\n    key: \"setVolume\",\n    value: function setVolume(value) {\n      this.volume = value; // no need to change when it's already at that volume\n\n      if (this.media.volume !== this.volume) {\n        this.media.volume = this.volume;\n      }\n    }\n    /**\n     * Enable or disable muted audio\n     *\n     * @since 4.0.0\n     * @param {boolean} muted Specify `true` to mute audio.\n     */\n\n  }, {\n    key: \"setMute\",\n    value: function setMute(muted) {\n      // This causes a volume change to be emitted too through the\n      // volumechange event listener.\n      this.isMuted = this.media.muted = muted;\n    }\n    /**\n     * This is called when wavesurfer is destroyed\n     *\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      var _this5 = this;\n\n      this.pause();\n      this.unAll();\n      this.destroyed = true; // cleanup media event listeners\n\n      Object.keys(this.mediaListeners).forEach(function (id) {\n        if (_this5.media) {\n          _this5.media.removeEventListener(id, _this5.mediaListeners[id]);\n        }\n      });\n\n      if (this.params.removeMediaElementOnDestroy && this.media && this.media.parentNode) {\n        this.media.parentNode.removeChild(this.media);\n      }\n\n      this.media = null;\n    }\n  }]);\n\n  return MediaElement;\n}(_webaudio.default);\n\nexports.default = MediaElement;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/peakcache.js\":\n/*!**************************!*\\\n  !*** ./src/peakcache.js ***!\n  \\**************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\n * Caches the decoded peaks data to improve rendering speed for large audio\n *\n * Is used if the option parameter `partialRender` is set to `true`\n */\nvar PeakCache = /*#__PURE__*/function () {\n  /**\n   * Instantiate cache\n   */\n  function PeakCache() {\n    _classCallCheck(this, PeakCache);\n\n    this.clearPeakCache();\n  }\n  /**\n   * Empty the cache\n   */\n\n\n  _createClass(PeakCache, [{\n    key: \"clearPeakCache\",\n    value: function clearPeakCache() {\n      /**\n       * Flat array with entries that are always in pairs to mark the\n       * beginning and end of each subrange.  This is a convenience so we can\n       * iterate over the pairs for easy set difference operations.\n       * @private\n       */\n      this.peakCacheRanges = [];\n      /**\n       * Length of the entire cachable region, used for resetting the cache\n       * when this changes (zoom events, for instance).\n       * @private\n       */\n\n      this.peakCacheLength = -1;\n    }\n    /**\n     * Add a range of peaks to the cache\n     *\n     * @param {number} length The length of the range\n     * @param {number} start The x offset of the start of the range\n     * @param {number} end The x offset of the end of the range\n     * @return {Number.<Array[]>} Array with arrays of numbers\n     */\n\n  }, {\n    key: \"addRangeToPeakCache\",\n    value: function addRangeToPeakCache(length, start, end) {\n      if (length != this.peakCacheLength) {\n        this.clearPeakCache();\n        this.peakCacheLength = length;\n      } // Return ranges that weren't in the cache before the call.\n\n\n      var uncachedRanges = [];\n      var i = 0; // Skip ranges before the current start.\n\n      while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] < start) {\n        i++;\n      } // If |i| is even, |start| falls after an existing range.  Otherwise,\n      // |start| falls between an existing range, and the uncached region\n      // starts when we encounter the next node in |peakCacheRanges| or\n      // |end|, whichever comes first.\n\n\n      if (i % 2 == 0) {\n        uncachedRanges.push(start);\n      }\n\n      while (i < this.peakCacheRanges.length && this.peakCacheRanges[i] <= end) {\n        uncachedRanges.push(this.peakCacheRanges[i]);\n        i++;\n      } // If |i| is even, |end| is after all existing ranges.\n\n\n      if (i % 2 == 0) {\n        uncachedRanges.push(end);\n      } // Filter out the 0-length ranges.\n\n\n      uncachedRanges = uncachedRanges.filter(function (item, pos, arr) {\n        if (pos == 0) {\n          return item != arr[pos + 1];\n        } else if (pos == arr.length - 1) {\n          return item != arr[pos - 1];\n        }\n\n        return item != arr[pos - 1] && item != arr[pos + 1];\n      }); // Merge the two ranges together, uncachedRanges will either contain\n      // wholly new points, or duplicates of points in peakCacheRanges.  If\n      // duplicates are detected, remove both and extend the range.\n\n      this.peakCacheRanges = this.peakCacheRanges.concat(uncachedRanges);\n      this.peakCacheRanges = this.peakCacheRanges.sort(function (a, b) {\n        return a - b;\n      }).filter(function (item, pos, arr) {\n        if (pos == 0) {\n          return item != arr[pos + 1];\n        } else if (pos == arr.length - 1) {\n          return item != arr[pos - 1];\n        }\n\n        return item != arr[pos - 1] && item != arr[pos + 1];\n      }); // Push the uncached ranges into an array of arrays for ease of\n      // iteration in the functions that call this.\n\n      var uncachedRangePairs = [];\n\n      for (i = 0; i < uncachedRanges.length; i += 2) {\n        uncachedRangePairs.push([uncachedRanges[i], uncachedRanges[i + 1]]);\n      }\n\n      return uncachedRangePairs;\n    }\n    /**\n     * For testing\n     *\n     * @return {Number.<Array[]>} Array with arrays of numbers\n     */\n\n  }, {\n    key: \"getCacheRanges\",\n    value: function getCacheRanges() {\n      var peakCacheRangePairs = [];\n      var i;\n\n      for (i = 0; i < this.peakCacheRanges.length; i += 2) {\n        peakCacheRangePairs.push([this.peakCacheRanges[i], this.peakCacheRanges[i + 1]]);\n      }\n\n      return peakCacheRangePairs;\n    }\n  }]);\n\n  return PeakCache;\n}();\n\nexports.default = PeakCache;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/absMax.js\":\n/*!****************************!*\\\n  !*** ./src/util/absMax.js ***!\n  \\****************************/\n/***/ ((module, exports, __nested_webpack_require_86694__) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = absMax;\n\nvar _max = _interopRequireDefault(__nested_webpack_require_86694__(/*! ./max */ \"./src/util/max.js\"));\n\nvar _min = _interopRequireDefault(__nested_webpack_require_86694__(/*! ./min */ \"./src/util/min.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\r\n * Get the largest absolute value in an array\r\n *\r\n * @param   {Array} values Array of numbers\r\n * @returns {Number} Largest number found\r\n * @example console.log(max([-3, 2, 1]), max([-3, 2, 4])); // logs 3 4\r\n * @since 4.3.0\r\n */\nfunction absMax(values) {\n  var max = (0, _max.default)(values);\n  var min = (0, _min.default)(values);\n  return -min > max ? -min : max;\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/clamp.js\":\n/*!***************************!*\\\n  !*** ./src/util/clamp.js ***!\n  \\***************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = clamp;\n\n/**\n * Returns a number limited to the given range.\n *\n * @param {number} val The number to be limited to a range\n * @param {number} min The lower boundary of the limit range\n * @param {number} max The upper boundary of the limit range\n * @returns {number} A number in the range [min, max]\n */\nfunction clamp(val, min, max) {\n  return Math.min(Math.max(min, val), max);\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/fetch.js\":\n/*!***************************!*\\\n  !*** ./src/util/fetch.js ***!\n  \\***************************/\n/***/ ((module, exports, __nested_webpack_require_88372__) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = fetchFile;\n\nvar _observer = _interopRequireDefault(__nested_webpack_require_88372__(/*! ./observer */ \"./src/util/observer.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ProgressHandler = /*#__PURE__*/function () {\n  /**\n   * Instantiate ProgressHandler\n   *\n   * @param {Observer} instance The `fetchFile` observer instance.\n   * @param {Number} contentLength Content length.\n   * @param {Response} response Response object.\n   */\n  function ProgressHandler(instance, contentLength, response) {\n    _classCallCheck(this, ProgressHandler);\n\n    this.instance = instance;\n    this.instance._reader = response.body.getReader();\n    this.total = parseInt(contentLength, 10);\n    this.loaded = 0;\n  }\n  /**\n   * A method that is called once, immediately after the `ReadableStream``\n   * is constructed.\n   *\n   * @param {ReadableStreamDefaultController} controller Controller instance\n   *     used to control the stream.\n   */\n\n\n  _createClass(ProgressHandler, [{\n    key: \"start\",\n    value: function start(controller) {\n      var _this = this;\n\n      var read = function read() {\n        // instance._reader.read() returns a promise that resolves\n        // when a value has been received\n        _this.instance._reader.read().then(function (_ref) {\n          var done = _ref.done,\n              value = _ref.value;\n\n          // result objects contain two properties:\n          // done  - true if the stream has already given you all its data.\n          // value - some data. Always undefined when done is true.\n          if (done) {\n            // ensure onProgress called when content-length=0\n            if (_this.total === 0) {\n              _this.instance.onProgress.call(_this.instance, {\n                loaded: _this.loaded,\n                total: _this.total,\n                lengthComputable: false\n              });\n            } // no more data needs to be consumed, close the stream\n\n\n            controller.close();\n            return;\n          }\n\n          _this.loaded += value.byteLength;\n\n          _this.instance.onProgress.call(_this.instance, {\n            loaded: _this.loaded,\n            total: _this.total,\n            lengthComputable: !(_this.total === 0)\n          }); // enqueue the next data chunk into our target stream\n\n\n          controller.enqueue(value);\n          read();\n        }).catch(function (error) {\n          controller.error(error);\n        });\n      };\n\n      read();\n    }\n  }]);\n\n  return ProgressHandler;\n}();\n/**\n * Load a file using `fetch`.\n *\n * @param {object} options Request options to use. See example below.\n * @returns {Observer} Observer instance\n * @example\n * // default options\n * let options = {\n *     url: undefined,\n *     method: 'GET',\n *     mode: 'cors',\n *     credentials: 'same-origin',\n *     cache: 'default',\n *     responseType: 'json',\n *     requestHeaders: [],\n *     redirect: 'follow',\n *     referrer: 'client'\n * };\n *\n * // override some options\n * options.url = '../media/demo.wav';\n\n * // available types: 'arraybuffer', 'blob', 'json' or 'text'\n * options.responseType = 'arraybuffer';\n *\n * // make fetch call\n * let request = util.fetchFile(options);\n *\n * // listen for events\n * request.on('progress', e => {\n *     console.log('progress', e);\n * });\n *\n * request.on('success', data => {\n *     console.log('success!', data);\n * });\n *\n * request.on('error', e => {\n *     console.warn('fetchFile error: ', e);\n * });\n */\n\n\nfunction fetchFile(options) {\n  if (!options) {\n    throw new Error('fetch options missing');\n  } else if (!options.url) {\n    throw new Error('fetch url missing');\n  }\n\n  var instance = new _observer.default();\n  var fetchHeaders = new Headers();\n  var fetchRequest = new Request(options.url); // add ability to abort\n\n  instance.controller = new AbortController(); // check if headers have to be added\n\n  if (options && options.requestHeaders) {\n    // add custom request headers\n    options.requestHeaders.forEach(function (header) {\n      fetchHeaders.append(header.key, header.value);\n    });\n  } // parse fetch options\n\n\n  var responseType = options.responseType || 'json';\n  var fetchOptions = {\n    method: options.method || 'GET',\n    headers: fetchHeaders,\n    mode: options.mode || 'cors',\n    credentials: options.credentials || 'same-origin',\n    cache: options.cache || 'default',\n    redirect: options.redirect || 'follow',\n    referrer: options.referrer || 'client',\n    signal: instance.controller.signal\n  };\n  fetch(fetchRequest, fetchOptions).then(function (response) {\n    // store response reference\n    instance.response = response;\n    var progressAvailable = true;\n\n    if (!response.body) {\n      // ReadableStream is not yet supported in this browser\n      // see https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream\n      progressAvailable = false;\n    } // Server must send CORS header \"Access-Control-Expose-Headers: content-length\"\n\n\n    var contentLength = response.headers.get('content-length');\n\n    if (contentLength === null) {\n      // Content-Length server response header missing.\n      // Don't evaluate download progress if we can't compare against a total size\n      // see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Access-Control-Expose-Headers\n      progressAvailable = false;\n    }\n\n    if (!progressAvailable) {\n      // not able to check download progress so skip it\n      return response;\n    } // fire progress event when during load\n\n\n    instance.onProgress = function (e) {\n      instance.fireEvent('progress', e);\n    };\n\n    return new Response(new ReadableStream(new ProgressHandler(instance, contentLength, response)), fetchOptions);\n  }).then(function (response) {\n    var errMsg;\n\n    if (response.ok) {\n      switch (responseType) {\n        case 'arraybuffer':\n          return response.arrayBuffer();\n\n        case 'json':\n          return response.json();\n\n        case 'blob':\n          return response.blob();\n\n        case 'text':\n          return response.text();\n\n        default:\n          errMsg = 'Unknown responseType: ' + responseType;\n          break;\n      }\n    }\n\n    if (!errMsg) {\n      errMsg = 'HTTP error status: ' + response.status;\n    }\n\n    throw new Error(errMsg);\n  }).then(function (response) {\n    instance.fireEvent('success', response);\n  }).catch(function (error) {\n    instance.fireEvent('error', error);\n  }); // return the fetch request\n\n  instance.fetchRequest = fetchRequest;\n  return instance;\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/frame.js\":\n/*!***************************!*\\\n  !*** ./src/util/frame.js ***!\n  \\***************************/\n/***/ ((module, exports, __nested_webpack_require_95877__) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = frame;\n\nvar _requestAnimationFrame = _interopRequireDefault(__nested_webpack_require_95877__(/*! ./request-animation-frame */ \"./src/util/request-animation-frame.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Create a function which will be called at the next requestAnimationFrame\n * cycle\n *\n * @param {function} func The function to call\n *\n * @return {func} The function wrapped within a requestAnimationFrame\n */\nfunction frame(func) {\n  return function () {\n    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return (0, _requestAnimationFrame.default)(function () {\n      return func.apply(void 0, args);\n    });\n  };\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/get-id.js\":\n/*!****************************!*\\\n  !*** ./src/util/get-id.js ***!\n  \\****************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = getId;\n\n/**\n * Get a random prefixed ID\n *\n * @param {String} prefix Prefix to use. Default is `'wavesurfer_'`.\n * @returns {String} Random prefixed ID\n * @example\n * console.log(getId()); // logs 'wavesurfer_b5pors4ru6g'\n *\n * let prefix = 'foo-';\n * console.log(getId(prefix)); // logs 'foo-b5pors4ru6g'\n */\nfunction getId(prefix) {\n  if (prefix === undefined) {\n    prefix = 'wavesurfer_';\n  }\n\n  return prefix + Math.random().toString(32).substring(2);\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/index.js\":\n/*!***************************!*\\\n  !*** ./src/util/index.js ***!\n  \\***************************/\n/***/ ((__unused_webpack_module, exports, __nested_webpack_require_97759__) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nObject.defineProperty(exports, \"getId\", ({\n  enumerable: true,\n  get: function get() {\n    return _getId.default;\n  }\n}));\nObject.defineProperty(exports, \"max\", ({\n  enumerable: true,\n  get: function get() {\n    return _max.default;\n  }\n}));\nObject.defineProperty(exports, \"min\", ({\n  enumerable: true,\n  get: function get() {\n    return _min.default;\n  }\n}));\nObject.defineProperty(exports, \"absMax\", ({\n  enumerable: true,\n  get: function get() {\n    return _absMax.default;\n  }\n}));\nObject.defineProperty(exports, \"Observer\", ({\n  enumerable: true,\n  get: function get() {\n    return _observer.default;\n  }\n}));\nObject.defineProperty(exports, \"style\", ({\n  enumerable: true,\n  get: function get() {\n    return _style.default;\n  }\n}));\nObject.defineProperty(exports, \"requestAnimationFrame\", ({\n  enumerable: true,\n  get: function get() {\n    return _requestAnimationFrame.default;\n  }\n}));\nObject.defineProperty(exports, \"frame\", ({\n  enumerable: true,\n  get: function get() {\n    return _frame.default;\n  }\n}));\nObject.defineProperty(exports, \"debounce\", ({\n  enumerable: true,\n  get: function get() {\n    return _debounce.default;\n  }\n}));\nObject.defineProperty(exports, \"preventClick\", ({\n  enumerable: true,\n  get: function get() {\n    return _preventClick.default;\n  }\n}));\nObject.defineProperty(exports, \"fetchFile\", ({\n  enumerable: true,\n  get: function get() {\n    return _fetch.default;\n  }\n}));\nObject.defineProperty(exports, \"clamp\", ({\n  enumerable: true,\n  get: function get() {\n    return _clamp.default;\n  }\n}));\nObject.defineProperty(exports, \"withOrientation\", ({\n  enumerable: true,\n  get: function get() {\n    return _orientation.default;\n  }\n}));\n\nvar _getId = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./get-id */ \"./src/util/get-id.js\"));\n\nvar _max = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./max */ \"./src/util/max.js\"));\n\nvar _min = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./min */ \"./src/util/min.js\"));\n\nvar _absMax = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./absMax */ \"./src/util/absMax.js\"));\n\nvar _observer = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./observer */ \"./src/util/observer.js\"));\n\nvar _style = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./style */ \"./src/util/style.js\"));\n\nvar _requestAnimationFrame = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./request-animation-frame */ \"./src/util/request-animation-frame.js\"));\n\nvar _frame = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./frame */ \"./src/util/frame.js\"));\n\nvar _debounce = _interopRequireDefault(__nested_webpack_require_97759__(/*! debounce */ \"./node_modules/debounce/index.js\"));\n\nvar _preventClick = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./prevent-click */ \"./src/util/prevent-click.js\"));\n\nvar _fetch = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./fetch */ \"./src/util/fetch.js\"));\n\nvar _clamp = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./clamp */ \"./src/util/clamp.js\"));\n\nvar _orientation = _interopRequireDefault(__nested_webpack_require_97759__(/*! ./orientation */ \"./src/util/orientation.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/***/ }),\n\n/***/ \"./src/util/max.js\":\n/*!*************************!*\\\n  !*** ./src/util/max.js ***!\n  \\*************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = max;\n\n/**\n * Get the largest value\n *\n * @param   {Array} values Array of numbers\n * @returns {Number} Largest number found\n * @example console.log(max([1, 2, 3])); // logs 3\n */\nfunction max(values) {\n  var largest = -Infinity;\n  Object.keys(values).forEach(function (i) {\n    if (values[i] > largest) {\n      largest = values[i];\n    }\n  });\n  return largest;\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/min.js\":\n/*!*************************!*\\\n  !*** ./src/util/min.js ***!\n  \\*************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = min;\n\n/**\n * Get the smallest value\n *\n * @param   {Array} values Array of numbers\n * @returns {Number} Smallest number found\n * @example console.log(min([1, 2, 3])); // logs 1\n */\nfunction min(values) {\n  var smallest = Number(Infinity);\n  Object.keys(values).forEach(function (i) {\n    if (values[i] < smallest) {\n      smallest = values[i];\n    }\n  });\n  return smallest;\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/observer.js\":\n/*!******************************!*\\\n  !*** ./src/util/observer.js ***!\n  \\******************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\n * @typedef {Object} ListenerDescriptor\n * @property {string} name The name of the event\n * @property {function} callback The callback\n * @property {function} un The function to call to remove the listener\n */\n\n/**\n * Observer class\n */\nvar Observer = /*#__PURE__*/function () {\n  /**\n   * Instantiate Observer\n   */\n  function Observer() {\n    _classCallCheck(this, Observer);\n\n    /**\n     * @private\n     * @todo Initialise the handlers here already and remove the conditional\n     * assignment in `on()`\n     */\n    this._disabledEventEmissions = [];\n    this.handlers = null;\n  }\n  /**\n   * Attach a handler function for an event.\n   *\n   * @param {string} event Name of the event to listen to\n   * @param {function} fn The callback to trigger when the event is fired\n   * @return {ListenerDescriptor} The event descriptor\n   */\n\n\n  _createClass(Observer, [{\n    key: \"on\",\n    value: function on(event, fn) {\n      var _this = this;\n\n      if (!this.handlers) {\n        this.handlers = {};\n      }\n\n      var handlers = this.handlers[event];\n\n      if (!handlers) {\n        handlers = this.handlers[event] = [];\n      }\n\n      handlers.push(fn); // Return an event descriptor\n\n      return {\n        name: event,\n        callback: fn,\n        un: function un(e, fn) {\n          return _this.un(e, fn);\n        }\n      };\n    }\n    /**\n     * Remove an event handler.\n     *\n     * @param {string} event Name of the event the listener that should be\n     * removed listens to\n     * @param {function} fn The callback that should be removed\n     */\n\n  }, {\n    key: \"un\",\n    value: function un(event, fn) {\n      if (!this.handlers) {\n        return;\n      }\n\n      var handlers = this.handlers[event];\n      var i;\n\n      if (handlers) {\n        if (fn) {\n          for (i = handlers.length - 1; i >= 0; i--) {\n            if (handlers[i] == fn) {\n              handlers.splice(i, 1);\n            }\n          }\n        } else {\n          handlers.length = 0;\n        }\n      }\n    }\n    /**\n     * Remove all event handlers.\n     */\n\n  }, {\n    key: \"unAll\",\n    value: function unAll() {\n      this.handlers = null;\n    }\n    /**\n     * Attach a handler to an event. The handler is executed at most once per\n     * event type.\n     *\n     * @param {string} event The event to listen to\n     * @param {function} handler The callback that is only to be called once\n     * @return {ListenerDescriptor} The event descriptor\n     */\n\n  }, {\n    key: \"once\",\n    value: function once(event, handler) {\n      var _this2 = this;\n\n      var fn = function fn() {\n        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n          args[_key] = arguments[_key];\n        }\n\n        /*  eslint-disable no-invalid-this */\n        handler.apply(_this2, args);\n        /*  eslint-enable no-invalid-this */\n\n        setTimeout(function () {\n          _this2.un(event, fn);\n        }, 0);\n      };\n\n      return this.on(event, fn);\n    }\n    /**\n     * Disable firing a list of events by name. When specified, event handlers for any event type\n     * passed in here will not be called.\n     *\n     * @since 4.0.0\n     * @param {string[]} eventNames an array of event names to disable emissions for\n     * @example\n     * // disable seek and interaction events\n     * wavesurfer.setDisabledEventEmissions(['seek', 'interaction']);\n     */\n\n  }, {\n    key: \"setDisabledEventEmissions\",\n    value: function setDisabledEventEmissions(eventNames) {\n      this._disabledEventEmissions = eventNames;\n    }\n    /**\n     * plugins borrow part of this class without calling the constructor,\n     * so we have to be careful about _disabledEventEmissions\n     */\n\n  }, {\n    key: \"_isDisabledEventEmission\",\n    value: function _isDisabledEventEmission(event) {\n      return this._disabledEventEmissions && this._disabledEventEmissions.includes(event);\n    }\n    /**\n     * Manually fire an event\n     *\n     * @param {string} event The event to fire manually\n     * @param {...any} args The arguments with which to call the listeners\n     */\n\n  }, {\n    key: \"fireEvent\",\n    value: function fireEvent(event) {\n      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {\n        args[_key2 - 1] = arguments[_key2];\n      }\n\n      if (!this.handlers || this._isDisabledEventEmission(event)) {\n        return;\n      }\n\n      var handlers = this.handlers[event];\n      handlers && handlers.forEach(function (fn) {\n        fn.apply(void 0, args);\n      });\n    }\n  }]);\n\n  return Observer;\n}();\n\nexports.default = Observer;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/orientation.js\":\n/*!*********************************!*\\\n  !*** ./src/util/orientation.js ***!\n  \\*********************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = withOrientation;\nvar verticalPropMap = {\n  width: 'height',\n  height: 'width',\n  overflowX: 'overflowY',\n  overflowY: 'overflowX',\n  clientWidth: 'clientHeight',\n  clientHeight: 'clientWidth',\n  clientX: 'clientY',\n  clientY: 'clientX',\n  scrollWidth: 'scrollHeight',\n  scrollLeft: 'scrollTop',\n  offsetLeft: 'offsetTop',\n  offsetTop: 'offsetLeft',\n  offsetHeight: 'offsetWidth',\n  offsetWidth: 'offsetHeight',\n  left: 'top',\n  right: 'bottom',\n  top: 'left',\n  bottom: 'right',\n  borderRightStyle: 'borderBottomStyle',\n  borderRightWidth: 'borderBottomWidth',\n  borderRightColor: 'borderBottomColor'\n};\n/**\n * Convert a horizontally-oriented property name to a vertical one.\n *\n * @param {string} prop A property name\n * @param {bool} vertical Whether the element is oriented vertically\n * @returns {string} prop, converted appropriately\n */\n\nfunction mapProp(prop, vertical) {\n  if (Object.prototype.hasOwnProperty.call(verticalPropMap, prop)) {\n    return vertical ? verticalPropMap[prop] : prop;\n  } else {\n    return prop;\n  }\n}\n\nvar isProxy = Symbol(\"isProxy\");\n/**\n * Returns an appropriately oriented object based on vertical.\n * If vertical is true, attribute getting and setting will be mapped through\n * verticalPropMap, so that e.g. getting the object's .width will give its\n * .height instead.\n * Certain methods of an oriented object will return oriented objects as well.\n * Oriented objects can't be added to the DOM directly since they are Proxy objects\n * and thus fail typechecks. Use domElement to get the actual element for this.\n *\n * @param {object} target The object to be wrapped and oriented\n * @param {bool} vertical Whether the element is oriented vertically\n * @returns {Proxy} An oriented object with attr translation via verticalAttrMap\n * @since 5.0.0\n */\n\nfunction withOrientation(target, vertical) {\n  if (target[isProxy]) {\n    return target;\n  } else {\n    return new Proxy(target, {\n      get: function get(obj, prop, receiver) {\n        if (prop === isProxy) {\n          return true;\n        } else if (prop === 'domElement') {\n          return obj;\n        } else if (prop === 'style') {\n          return withOrientation(obj.style, vertical);\n        } else if (prop === 'canvas') {\n          return withOrientation(obj.canvas, vertical);\n        } else if (prop === 'getBoundingClientRect') {\n          return function () {\n            return withOrientation(obj.getBoundingClientRect.apply(obj, arguments), vertical);\n          };\n        } else if (prop === 'getContext') {\n          return function () {\n            return withOrientation(obj.getContext.apply(obj, arguments), vertical);\n          };\n        } else {\n          var value = obj[mapProp(prop, vertical)];\n          return typeof value == 'function' ? value.bind(obj) : value;\n        }\n      },\n      set: function set(obj, prop, value) {\n        obj[mapProp(prop, vertical)] = value;\n        return true;\n      }\n    });\n  }\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/prevent-click.js\":\n/*!***********************************!*\\\n  !*** ./src/util/prevent-click.js ***!\n  \\***********************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = preventClick;\n\n/**\n * Stops propagation of click event and removes event listener\n *\n * @private\n * @param {object} event The click event\n */\nfunction preventClickHandler(event) {\n  event.stopPropagation();\n  document.body.removeEventListener('click', preventClickHandler, true);\n}\n/**\n * Starts listening for click event and prevent propagation\n *\n * @param {object} values Values\n */\n\n\nfunction preventClick(values) {\n  document.body.addEventListener('click', preventClickHandler, true);\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/request-animation-frame.js\":\n/*!*********************************************!*\\\n  !*** ./src/util/request-animation-frame.js ***!\n  \\*********************************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\n/* eslint-disable valid-jsdoc */\n\n/**\n * Returns the `requestAnimationFrame` function for the browser, or a shim with\n * `setTimeout` if the function is not found\n *\n * @return {function} Available `requestAnimationFrame` function for the browser\n */\nvar _default = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {\n  return setTimeout(callback, 1000 / 60);\n}).bind(window);\n\nexports.default = _default;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/util/style.js\":\n/*!***************************!*\\\n  !*** ./src/util/style.js ***!\n  \\***************************/\n/***/ ((module, exports) => {\n\n\"use strict\";\n\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = style;\n\n/**\n * Apply a map of styles to an element\n *\n * @param {HTMLElement} el The element that the styles will be applied to\n * @param {Object} styles The map of propName: attribute, both are used as-is\n *\n * @return {HTMLElement} el\n */\nfunction style(el, styles) {\n  Object.keys(styles).forEach(function (prop) {\n    if (el.style[prop] !== styles[prop]) {\n      el.style[prop] = styles[prop];\n    }\n  });\n  return el;\n}\n\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/wavesurfer.js\":\n/*!***************************!*\\\n  !*** ./src/wavesurfer.js ***!\n  \\***************************/\n/***/ ((module, exports, __nested_webpack_require_113904__) => {\n\n\"use strict\";\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar util = _interopRequireWildcard(__nested_webpack_require_113904__(/*! ./util */ \"./src/util/index.js\"));\n\nvar _drawer = _interopRequireDefault(__nested_webpack_require_113904__(/*! ./drawer.multicanvas */ \"./src/drawer.multicanvas.js\"));\n\nvar _webaudio = _interopRequireDefault(__nested_webpack_require_113904__(/*! ./webaudio */ \"./src/webaudio.js\"));\n\nvar _mediaelement = _interopRequireDefault(__nested_webpack_require_113904__(/*! ./mediaelement */ \"./src/mediaelement.js\"));\n\nvar _peakcache = _interopRequireDefault(__nested_webpack_require_113904__(/*! ./peakcache */ \"./src/peakcache.js\"));\n\nvar _mediaelementWebaudio = _interopRequireDefault(__nested_webpack_require_113904__(/*! ./mediaelement-webaudio */ \"./src/mediaelement-webaudio.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== \"function\") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }\n\nfunction _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== \"default\" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n * This work is licensed under a BSD-3-Clause License.\n */\n\n/** @external {HTMLElement} https://developer.mozilla.org/en/docs/Web/API/HTMLElement */\n\n/** @external {OfflineAudioContext} https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext */\n\n/** @external {File} https://developer.mozilla.org/en-US/docs/Web/API/File */\n\n/** @external {Blob} https://developer.mozilla.org/en-US/docs/Web/API/Blob */\n\n/** @external {CanvasRenderingContext2D} https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D */\n\n/** @external {MediaStreamConstraints} https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints */\n\n/** @external {AudioNode} https://developer.mozilla.org/de/docs/Web/API/AudioNode */\n\n/**\n * @typedef {Object} WavesurferParams\n * @property {AudioContext} audioContext=null Use your own previously\n * initialized AudioContext or leave blank.\n * @property {number} audioRate=1 Speed at which to play audio. Lower number is\n * slower.\n * @property {ScriptProcessorNode} audioScriptProcessor=null Use your own previously\n * initialized ScriptProcessorNode or leave blank.\n * @property {boolean} autoCenter=true If a scrollbar is present, center the\n * waveform on current progress\n * @property {number} autoCenterRate=5 If autoCenter is active, rate at which the\n * waveform is centered\n * @property {boolean} autoCenterImmediately=false If autoCenter is active, immediately\n * center waveform on current progress\n * @property {string} backend='WebAudio' `'WebAudio'|'MediaElement'|'MediaElementWebAudio'` In most cases\n * you don't have to set this manually. MediaElement is a fallback for unsupported browsers.\n * MediaElementWebAudio allows to use WebAudio API also with big audio files, loading audio like with\n * MediaElement backend (HTML5 audio tag). You have to use the same methods of MediaElement backend for loading and\n * playback, giving also peaks, so the audio data are not decoded. In this way you can use WebAudio features, like filters,\n * also with audio with big duration. For example:\n * ` wavesurfer.load(url | HTMLMediaElement, peaks, preload, duration);\n *   wavesurfer.play();\n *   wavesurfer.setFilter(customFilter);\n * `\n * @property {string} backgroundColor=null Change background color of the\n * waveform container.\n * @property {number} barHeight=1 The height of the wave bars.\n * @property {number} barRadius=0 The radius of the wave bars. Makes bars rounded\n * @property {number} barGap=null The optional spacing between bars of the wave,\n * if not provided will be calculated in legacy format.\n * @property {number} barWidth=null Draw the waveform using bars.\n * @property {number} barMinHeight=null If specified, draw at least a bar of this height,\n * eliminating waveform gaps\n * @property {boolean} closeAudioContext=false Close and nullify all audio\n * contexts when the destroy method is called.\n * @property {!string|HTMLElement} container CSS selector or HTML element where\n * the waveform should be drawn. This is the only required parameter.\n * @property {string} cursorColor='#333' The fill color of the cursor indicating\n * the playhead position.\n * @property {number} cursorWidth=1 Measured in pixels.\n * @property {object} drawingContextAttributes={desynchronized: false} Drawing context\n * attributes.\n * @property {number} duration=null Optional audio length so pre-rendered peaks\n * can be display immediately for example.\n * @property {boolean} fillParent=true Whether to fill the entire container or\n * draw only according to `minPxPerSec`.\n * @property {boolean} forceDecode=false Force decoding of audio using web audio\n * when zooming to get a more detailed waveform.\n * @property {number} height=128 The height of the waveform. Measured in\n * pixels.\n * @property {boolean} hideScrollbar=false Whether to hide the horizontal\n * scrollbar when one would normally be shown.\n * @property {boolean} interact=true Whether the mouse interaction will be\n * enabled at initialization. You can switch this parameter at any time later\n * on.\n * @property {boolean} loopSelection=true (Use with regions plugin) Enable\n * looping of selected regions\n * @property {number} maxCanvasWidth=4000 Maximum width of a single canvas in\n * pixels, excluding a small overlap (2 * `pixelRatio`, rounded up to the next\n * even integer). If the waveform is longer than this value, additional canvases\n * will be used to render the waveform, which is useful for very large waveforms\n * that may be too wide for browsers to draw on a single canvas.\n * @property {boolean} mediaControls=false (Use with backend `MediaElement` or `MediaElementWebAudio`)\n * this enables the native controls for the media element\n * @property {string} mediaType='audio' (Use with backend `MediaElement` or `MediaElementWebAudio`)\n * `'audio'|'video'` ('video' only for `MediaElement`)\n * @property {number} minPxPerSec=20 Minimum number of pixels per second of\n * audio.\n * @property {boolean} normalize=false If true, normalize by the maximum peak\n * instead of 1.0.\n * @property {boolean} partialRender=false Use the PeakCache to improve\n * rendering speed of large waveforms\n * @property {number} pixelRatio=window.devicePixelRatio The pixel ratio used to\n * calculate display\n * @property {PluginDefinition[]} plugins=[] An array of plugin definitions to\n * register during instantiation, they will be directly initialised unless they\n * are added with the `deferInit` property set to true.\n * @property {string} progressColor='#555' The fill color of the part of the\n * waveform behind the cursor. When `progressColor` and `waveColor` are the same\n * the progress wave is not rendered at all.\n * @property {boolean} removeMediaElementOnDestroy=true Set to false to keep the\n * media element in the DOM when the player is destroyed. This is useful when\n * reusing an existing media element via the `loadMediaElement` method.\n * @property {Object} renderer=MultiCanvas Can be used to inject a custom\n * renderer.\n * @property {boolean|number} responsive=false If set to `true` resize the\n * waveform, when the window is resized. This is debounced with a `100ms`\n * timeout by default. If this parameter is a number it represents that timeout.\n * @property {boolean} rtl=false If set to `true`, renders waveform from\n * right-to-left.\n * @property {boolean} scrollParent=false Whether to scroll the container with a\n * lengthy waveform. Otherwise the waveform is shrunk to the container width\n * (see fillParent).\n * @property {number} skipLength=2 Number of seconds to skip with the\n * skipForward() and skipBackward() methods.\n * @property {boolean} splitChannels=false Render with separate waveforms for\n * the channels of the audio\n * @property {SplitChannelOptions} splitChannelsOptions={} Options for splitChannel rendering\n * @property {boolean} vertical=false Render the waveform vertically instead of horizontally.\n * @property {string} waveColor='#999' The fill color of the waveform after the\n * cursor.\n * @property {object} xhr={} XHR options. For example:\n * `let xhr = {\n *     cache: 'default',\n *     mode: 'cors',\n *     method: 'GET',\n *     credentials: 'same-origin',\n *     redirect: 'follow',\n *     referrer: 'client',\n *     requestHeaders: [\n *         {\n *             key: 'Authorization',\n *             value: 'my-token'\n *         }\n *     ]\n * };`\n */\n\n/**\n * @typedef {Object} PluginDefinition\n * @desc The Object used to describe a plugin\n * @example wavesurfer.addPlugin(pluginDefinition);\n * @property {string} name The name of the plugin, the plugin instance will be\n * added as a property to the wavesurfer instance under this name\n * @property {?Object} staticProps The properties that should be added to the\n * wavesurfer instance as static properties\n * @property {?boolean} deferInit Don't initialise plugin\n * automatically\n * @property {Object} params={} The plugin parameters, they are the first parameter\n * passed to the plugin class constructor function\n * @property {PluginClass} instance The plugin instance factory, is called with\n * the dependency specified in extends. Returns the plugin class.\n */\n\n/**\n * @typedef {Object} SplitChannelOptions\n * @desc parameters applied when splitChannels option is true\n * @property {boolean} overlay=false determines whether channels are rendered on top of each other or on separate tracks\n * @property {object} channelColors={} object describing color for each channel. Example:\n * {\n *     0: {\n *         progressColor: 'green',\n *         waveColor: 'pink'\n *     },\n *     1: {\n *         progressColor: 'orange',\n *         waveColor: 'purple'\n *     }\n * }\n * @property {number[]} filterChannels=[] indexes of channels to be hidden from rendering\n * @property {boolean} relativeNormalization=false determines whether\n * normalization is done per channel or maintains proportionality between\n * channels. Only applied when normalize and splitChannels are both true.\n * @since 4.3.0\n */\n\n/**\n * @interface PluginClass\n *\n * @desc This is the interface which is implemented by all plugin classes. Note\n * that this only turns into an observer after being passed through\n * `wavesurfer.addPlugin`.\n *\n * @extends {Observer}\n */\nvar PluginClass = /*#__PURE__*/function () {\n  /**\n   * Construct the plugin\n   *\n   * @param {Object} params={} The plugin params (specific to the plugin)\n   * @param {Object} ws The wavesurfer instance\n   */\n  function PluginClass(params, ws) {\n    _classCallCheck(this, PluginClass);\n  }\n  /**\n   * Initialise the plugin\n   *\n   * Start doing something. This is called by\n   * `wavesurfer.initPlugin(pluginName)`\n   */\n\n\n  _createClass(PluginClass, [{\n    key: \"create\",\n    value:\n    /**\n     * Plugin definition factory\n     *\n     * This function must be used to create a plugin definition which can be\n     * used by wavesurfer to correctly instantiate the plugin.\n     *\n     * It returns a `PluginDefinition` object representing the plugin.\n     *\n     * @param {Object} params={} The plugin params (specific to the plugin)\n     */\n    function create(params) {}\n  }, {\n    key: \"init\",\n    value: function init() {}\n    /**\n     * Destroy the plugin instance\n     *\n     * Stop doing something. This is called by\n     * `wavesurfer.destroyPlugin(pluginName)`\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {}\n  }]);\n\n  return PluginClass;\n}();\n/**\n * WaveSurfer core library class\n *\n * @extends {Observer}\n * @example\n * const params = {\n *   container: '#waveform',\n *   waveColor: 'violet',\n *   progressColor: 'purple'\n * };\n *\n * // initialise like this\n * const wavesurfer = WaveSurfer.create(params);\n *\n * // or like this ...\n * const wavesurfer = new WaveSurfer(params);\n * wavesurfer.init();\n *\n * // load audio file\n * wavesurfer.load('example/media/demo.wav');\n */\n\n\nvar WaveSurfer = /*#__PURE__*/function (_util$Observer) {\n  _inherits(WaveSurfer, _util$Observer);\n\n  var _super = _createSuper(WaveSurfer);\n\n  /**\n   * Initialise wavesurfer instance\n   *\n   * @param {WavesurferParams} params Instantiation options for wavesurfer\n   * @example\n   * const wavesurfer = new WaveSurfer(params);\n   * @returns {this} Wavesurfer instance\n   */\n  function WaveSurfer(params) {\n    var _this;\n\n    _classCallCheck(this, WaveSurfer);\n\n    _this = _super.call(this);\n    /**\n     * Extract relevant parameters (or defaults)\n     * @private\n     */\n\n    _this.defaultParams = {\n      audioContext: null,\n      audioScriptProcessor: null,\n      audioRate: 1,\n      autoCenter: true,\n      autoCenterRate: 5,\n      autoCenterImmediately: false,\n      backend: 'WebAudio',\n      backgroundColor: null,\n      barHeight: 1,\n      barRadius: 0,\n      barGap: null,\n      barMinHeight: null,\n      container: null,\n      cursorColor: '#333',\n      cursorWidth: 1,\n      dragSelection: true,\n      drawingContextAttributes: {\n        // Boolean that hints the user agent to reduce the latency\n        // by desynchronizing the canvas paint cycle from the event\n        // loop\n        desynchronized: false\n      },\n      duration: null,\n      fillParent: true,\n      forceDecode: false,\n      height: 128,\n      hideScrollbar: false,\n      interact: true,\n      loopSelection: true,\n      maxCanvasWidth: 4000,\n      mediaContainer: null,\n      mediaControls: false,\n      mediaType: 'audio',\n      minPxPerSec: 20,\n      normalize: false,\n      partialRender: false,\n      pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,\n      plugins: [],\n      progressColor: '#555',\n      removeMediaElementOnDestroy: true,\n      renderer: _drawer.default,\n      responsive: false,\n      rtl: false,\n      scrollParent: false,\n      skipLength: 2,\n      splitChannels: false,\n      splitChannelsOptions: {\n        overlay: false,\n        channelColors: {},\n        filterChannels: [],\n        relativeNormalization: false\n      },\n      vertical: false,\n      waveColor: '#999',\n      xhr: {}\n    };\n    _this.backends = {\n      MediaElement: _mediaelement.default,\n      WebAudio: _webaudio.default,\n      MediaElementWebAudio: _mediaelementWebaudio.default\n    };\n    _this.util = util;\n    _this.params = Object.assign({}, _this.defaultParams, params);\n    _this.params.splitChannelsOptions = Object.assign({}, _this.defaultParams.splitChannelsOptions, params.splitChannelsOptions);\n    /** @private */\n\n    _this.container = 'string' == typeof params.container ? document.querySelector(_this.params.container) : _this.params.container;\n\n    if (!_this.container) {\n      throw new Error('Container element not found');\n    }\n\n    if (_this.params.mediaContainer == null) {\n      /** @private */\n      _this.mediaContainer = _this.container;\n    } else if (typeof _this.params.mediaContainer == 'string') {\n      /** @private */\n      _this.mediaContainer = document.querySelector(_this.params.mediaContainer);\n    } else {\n      /** @private */\n      _this.mediaContainer = _this.params.mediaContainer;\n    }\n\n    if (!_this.mediaContainer) {\n      throw new Error('Media Container element not found');\n    }\n\n    if (_this.params.maxCanvasWidth <= 1) {\n      throw new Error('maxCanvasWidth must be greater than 1');\n    } else if (_this.params.maxCanvasWidth % 2 == 1) {\n      throw new Error('maxCanvasWidth must be an even number');\n    }\n\n    if (_this.params.rtl === true) {\n      if (_this.params.vertical === true) {\n        util.style(_this.container, {\n          transform: 'rotateX(180deg)'\n        });\n      } else {\n        util.style(_this.container, {\n          transform: 'rotateY(180deg)'\n        });\n      }\n    }\n\n    if (_this.params.backgroundColor) {\n      _this.setBackgroundColor(_this.params.backgroundColor);\n    }\n    /**\n     * @private Used to save the current volume when muting so we can\n     * restore once unmuted\n     * @type {number}\n     */\n\n\n    _this.savedVolume = 0;\n    /**\n     * @private The current muted state\n     * @type {boolean}\n     */\n\n    _this.isMuted = false;\n    /**\n     * @private Will hold a list of event descriptors that need to be\n     * canceled on subsequent loads of audio\n     * @type {Object[]}\n     */\n\n    _this.tmpEvents = [];\n    /**\n     * @private Holds any running audio downloads\n     * @type {Observer}\n     */\n\n    _this.currentRequest = null;\n    /** @private */\n\n    _this.arraybuffer = null;\n    /** @private */\n\n    _this.drawer = null;\n    /** @private */\n\n    _this.backend = null;\n    /** @private */\n\n    _this.peakCache = null; // cache constructor objects\n\n    if (typeof _this.params.renderer !== 'function') {\n      throw new Error('Renderer parameter is invalid');\n    }\n    /**\n     * @private The uninitialised Drawer class\n     */\n\n\n    _this.Drawer = _this.params.renderer;\n    /**\n     * @private The uninitialised Backend class\n     */\n    // Back compat\n\n    if (_this.params.backend == 'AudioElement') {\n      _this.params.backend = 'MediaElement';\n    }\n\n    if ((_this.params.backend == 'WebAudio' || _this.params.backend === 'MediaElementWebAudio') && !_webaudio.default.prototype.supportsWebAudio.call(null)) {\n      _this.params.backend = 'MediaElement';\n    }\n\n    _this.Backend = _this.backends[_this.params.backend];\n    /**\n     * @private map of plugin names that are currently initialised\n     */\n\n    _this.initialisedPluginList = {};\n    /** @private */\n\n    _this.isDestroyed = false;\n    /**\n     * Get the current ready status.\n     *\n     * @example const isReady = wavesurfer.isReady;\n     * @return {boolean}\n     */\n\n    _this.isReady = false; // responsive debounced event listener. If this.params.responsive is not\n    // set, this is never called. Use 100ms or this.params.responsive as\n    // timeout for the debounce function.\n\n    var prevWidth = 0;\n    _this._onResize = util.debounce(function () {\n      if (prevWidth != _this.drawer.wrapper.clientWidth && !_this.params.scrollParent) {\n        prevWidth = _this.drawer.wrapper.clientWidth;\n\n        _this.drawer.fireEvent('redraw');\n      }\n    }, typeof _this.params.responsive === 'number' ? _this.params.responsive : 100);\n    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));\n  }\n  /**\n   * Initialise the wave\n   *\n   * @example\n   * var wavesurfer = new WaveSurfer(params);\n   * wavesurfer.init();\n   * @return {this} The wavesurfer instance\n   */\n\n\n  _createClass(WaveSurfer, [{\n    key: \"init\",\n    value: function init() {\n      this.registerPlugins(this.params.plugins);\n      this.createDrawer();\n      this.createBackend();\n      this.createPeakCache();\n      return this;\n    }\n    /**\n     * Add and initialise array of plugins (if `plugin.deferInit` is falsey),\n     * this function is called in the init function of wavesurfer\n     *\n     * @param {PluginDefinition[]} plugins An array of plugin definitions\n     * @emits {WaveSurfer#plugins-registered} Called with the array of plugin definitions\n     * @return {this} The wavesurfer instance\n     */\n\n  }, {\n    key: \"registerPlugins\",\n    value: function registerPlugins(plugins) {\n      var _this2 = this;\n\n      // first instantiate all the plugins\n      plugins.forEach(function (plugin) {\n        return _this2.addPlugin(plugin);\n      }); // now run the init functions\n\n      plugins.forEach(function (plugin) {\n        // call init function of the plugin if deferInit is falsey\n        // in that case you would manually use initPlugins()\n        if (!plugin.deferInit) {\n          _this2.initPlugin(plugin.name);\n        }\n      });\n      this.fireEvent('plugins-registered', plugins);\n      return this;\n    }\n    /**\n     * Get a map of plugin names that are currently initialised\n     *\n     * @example wavesurfer.getPlugins();\n     * @return {Object} Object with plugin names\n     */\n\n  }, {\n    key: \"getActivePlugins\",\n    value: function getActivePlugins() {\n      return this.initialisedPluginList;\n    }\n    /**\n     * Add a plugin object to wavesurfer\n     *\n     * @param {PluginDefinition} plugin A plugin definition\n     * @emits {WaveSurfer#plugin-added} Called with the name of the plugin that was added\n     * @example wavesurfer.addPlugin(WaveSurfer.minimap());\n     * @return {this} The wavesurfer instance\n     */\n\n  }, {\n    key: \"addPlugin\",\n    value: function addPlugin(plugin) {\n      var _this3 = this;\n\n      if (!plugin.name) {\n        throw new Error('Plugin does not have a name!');\n      }\n\n      if (!plugin.instance) {\n        throw new Error(\"Plugin \".concat(plugin.name, \" does not have an instance property!\"));\n      } // staticProps properties are applied to wavesurfer instance\n\n\n      if (plugin.staticProps) {\n        Object.keys(plugin.staticProps).forEach(function (pluginStaticProp) {\n          /**\n           * Properties defined in a plugin definition's `staticProps` property are added as\n           * staticProps properties of the WaveSurfer instance\n           */\n          _this3[pluginStaticProp] = plugin.staticProps[pluginStaticProp];\n        });\n      }\n\n      var Instance = plugin.instance; // turn the plugin instance into an observer\n\n      var observerPrototypeKeys = Object.getOwnPropertyNames(util.Observer.prototype);\n      observerPrototypeKeys.forEach(function (key) {\n        Instance.prototype[key] = util.Observer.prototype[key];\n      });\n      /**\n       * Instantiated plugin classes are added as a property of the wavesurfer\n       * instance\n       * @type {Object}\n       */\n\n      this[plugin.name] = new Instance(plugin.params || {}, this);\n      this.fireEvent('plugin-added', plugin.name);\n      return this;\n    }\n    /**\n     * Initialise a plugin\n     *\n     * @param {string} name A plugin name\n     * @emits WaveSurfer#plugin-initialised\n     * @example wavesurfer.initPlugin('minimap');\n     * @return {this} The wavesurfer instance\n     */\n\n  }, {\n    key: \"initPlugin\",\n    value: function initPlugin(name) {\n      if (!this[name]) {\n        throw new Error(\"Plugin \".concat(name, \" has not been added yet!\"));\n      }\n\n      if (this.initialisedPluginList[name]) {\n        // destroy any already initialised plugins\n        this.destroyPlugin(name);\n      }\n\n      this[name].init();\n      this.initialisedPluginList[name] = true;\n      this.fireEvent('plugin-initialised', name);\n      return this;\n    }\n    /**\n     * Destroy a plugin\n     *\n     * @param {string} name A plugin name\n     * @emits WaveSurfer#plugin-destroyed\n     * @example wavesurfer.destroyPlugin('minimap');\n     * @returns {this} The wavesurfer instance\n     */\n\n  }, {\n    key: \"destroyPlugin\",\n    value: function destroyPlugin(name) {\n      if (!this[name]) {\n        throw new Error(\"Plugin \".concat(name, \" has not been added yet and cannot be destroyed!\"));\n      }\n\n      if (!this.initialisedPluginList[name]) {\n        throw new Error(\"Plugin \".concat(name, \" is not active and cannot be destroyed!\"));\n      }\n\n      if (typeof this[name].destroy !== 'function') {\n        throw new Error(\"Plugin \".concat(name, \" does not have a destroy function!\"));\n      }\n\n      this[name].destroy();\n      delete this.initialisedPluginList[name];\n      this.fireEvent('plugin-destroyed', name);\n      return this;\n    }\n    /**\n     * Destroy all initialised plugins. Convenience function to use when\n     * wavesurfer is removed\n     *\n     * @private\n     */\n\n  }, {\n    key: \"destroyAllPlugins\",\n    value: function destroyAllPlugins() {\n      var _this4 = this;\n\n      Object.keys(this.initialisedPluginList).forEach(function (name) {\n        return _this4.destroyPlugin(name);\n      });\n    }\n    /**\n     * Create the drawer and draw the waveform\n     *\n     * @private\n     * @emits WaveSurfer#drawer-created\n     */\n\n  }, {\n    key: \"createDrawer\",\n    value: function createDrawer() {\n      var _this5 = this;\n\n      this.drawer = new this.Drawer(this.container, this.params);\n      this.drawer.init();\n      this.fireEvent('drawer-created', this.drawer);\n\n      if (this.params.responsive !== false) {\n        window.addEventListener('resize', this._onResize, true);\n        window.addEventListener('orientationchange', this._onResize, true);\n      }\n\n      this.drawer.on('redraw', function () {\n        _this5.drawBuffer();\n\n        _this5.drawer.progress(_this5.backend.getPlayedPercents());\n      }); // Click-to-seek\n\n      this.drawer.on('click', function (e, progress) {\n        setTimeout(function () {\n          return _this5.seekTo(progress);\n        }, 0);\n      }); // Relay the scroll event from the drawer\n\n      this.drawer.on('scroll', function (e) {\n        if (_this5.params.partialRender) {\n          _this5.drawBuffer();\n        }\n\n        _this5.fireEvent('scroll', e);\n      });\n    }\n    /**\n     * Create the backend\n     *\n     * @private\n     * @emits WaveSurfer#backend-created\n     */\n\n  }, {\n    key: \"createBackend\",\n    value: function createBackend() {\n      var _this6 = this;\n\n      if (this.backend) {\n        this.backend.destroy();\n      }\n\n      this.backend = new this.Backend(this.params);\n      this.backend.init();\n      this.fireEvent('backend-created', this.backend);\n      this.backend.on('finish', function () {\n        _this6.drawer.progress(_this6.backend.getPlayedPercents());\n\n        _this6.fireEvent('finish');\n      });\n      this.backend.on('play', function () {\n        return _this6.fireEvent('play');\n      });\n      this.backend.on('pause', function () {\n        return _this6.fireEvent('pause');\n      });\n      this.backend.on('audioprocess', function (time) {\n        _this6.drawer.progress(_this6.backend.getPlayedPercents());\n\n        _this6.fireEvent('audioprocess', time);\n      }); // only needed for MediaElement and MediaElementWebAudio backend\n\n      if (this.params.backend === 'MediaElement' || this.params.backend === 'MediaElementWebAudio') {\n        this.backend.on('seek', function () {\n          _this6.drawer.progress(_this6.backend.getPlayedPercents());\n        });\n        this.backend.on('volume', function () {\n          var newVolume = _this6.getVolume();\n\n          _this6.fireEvent('volume', newVolume);\n\n          if (_this6.backend.isMuted !== _this6.isMuted) {\n            _this6.isMuted = _this6.backend.isMuted;\n\n            _this6.fireEvent('mute', _this6.isMuted);\n          }\n        });\n      }\n    }\n    /**\n     * Create the peak cache\n     *\n     * @private\n     */\n\n  }, {\n    key: \"createPeakCache\",\n    value: function createPeakCache() {\n      if (this.params.partialRender) {\n        this.peakCache = new _peakcache.default();\n      }\n    }\n    /**\n     * Get the duration of the audio clip\n     *\n     * @example const duration = wavesurfer.getDuration();\n     * @return {number} Duration in seconds\n     */\n\n  }, {\n    key: \"getDuration\",\n    value: function getDuration() {\n      return this.backend.getDuration();\n    }\n    /**\n     * Get the current playback position\n     *\n     * @example const currentTime = wavesurfer.getCurrentTime();\n     * @return {number} Playback position in seconds\n     */\n\n  }, {\n    key: \"getCurrentTime\",\n    value: function getCurrentTime() {\n      return this.backend.getCurrentTime();\n    }\n    /**\n     * Set the current play time in seconds.\n     *\n     * @param {number} seconds A positive number in seconds. E.g. 10 means 10\n     * seconds, 60 means 1 minute\n     */\n\n  }, {\n    key: \"setCurrentTime\",\n    value: function setCurrentTime(seconds) {\n      if (seconds >= this.getDuration()) {\n        this.seekTo(1);\n      } else {\n        this.seekTo(seconds / this.getDuration());\n      }\n    }\n    /**\n     * Starts playback from the current position. Optional start and end\n     * measured in seconds can be used to set the range of audio to play.\n     *\n     * @param {?number} start Position to start at\n     * @param {?number} end Position to end at\n     * @emits WaveSurfer#interaction\n     * @return {Promise} Result of the backend play method\n     * @example\n     * // play from second 1 to 5\n     * wavesurfer.play(1, 5);\n     */\n\n  }, {\n    key: \"play\",\n    value: function play(start, end) {\n      var _this7 = this;\n\n      this.fireEvent('interaction', function () {\n        return _this7.play(start, end);\n      });\n      return this.backend.play(start, end);\n    }\n    /**\n     * Set a point in seconds for playback to stop at.\n     *\n     * @param {number} position Position (in seconds) to stop at\n     * @version 3.3.0\n     */\n\n  }, {\n    key: \"setPlayEnd\",\n    value: function setPlayEnd(position) {\n      this.backend.setPlayEnd(position);\n    }\n    /**\n     * Stops and pauses playback\n     *\n     * @example wavesurfer.pause();\n     * @return {Promise} Result of the backend pause method\n     */\n\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      if (!this.backend.isPaused()) {\n        return this.backend.pause();\n      }\n    }\n    /**\n     * Toggle playback\n     *\n     * @example wavesurfer.playPause();\n     * @return {Promise} Result of the backend play or pause method\n     */\n\n  }, {\n    key: \"playPause\",\n    value: function playPause() {\n      return this.backend.isPaused() ? this.play() : this.pause();\n    }\n    /**\n     * Get the current playback state\n     *\n     * @example const isPlaying = wavesurfer.isPlaying();\n     * @return {boolean} False if paused, true if playing\n     */\n\n  }, {\n    key: \"isPlaying\",\n    value: function isPlaying() {\n      return !this.backend.isPaused();\n    }\n    /**\n     * Skip backward\n     *\n     * @param {?number} seconds Amount to skip back, if not specified `skipLength`\n     * is used\n     * @example wavesurfer.skipBackward();\n     */\n\n  }, {\n    key: \"skipBackward\",\n    value: function skipBackward(seconds) {\n      this.skip(-seconds || -this.params.skipLength);\n    }\n    /**\n     * Skip forward\n     *\n     * @param {?number} seconds Amount to skip back, if not specified `skipLength`\n     * is used\n     * @example wavesurfer.skipForward();\n     */\n\n  }, {\n    key: \"skipForward\",\n    value: function skipForward(seconds) {\n      this.skip(seconds || this.params.skipLength);\n    }\n    /**\n     * Skip a number of seconds from the current position (use a negative value\n     * to go backwards).\n     *\n     * @param {number} offset Amount to skip back or forwards\n     * @example\n     * // go back 2 seconds\n     * wavesurfer.skip(-2);\n     */\n\n  }, {\n    key: \"skip\",\n    value: function skip(offset) {\n      var duration = this.getDuration() || 1;\n      var position = this.getCurrentTime() || 0;\n      position = Math.max(0, Math.min(duration, position + (offset || 0)));\n      this.seekAndCenter(position / duration);\n    }\n    /**\n     * Seeks to a position and centers the view\n     *\n     * @param {number} progress Between 0 (=beginning) and 1 (=end)\n     * @example\n     * // seek and go to the middle of the audio\n     * wavesurfer.seekTo(0.5);\n     */\n\n  }, {\n    key: \"seekAndCenter\",\n    value: function seekAndCenter(progress) {\n      this.seekTo(progress);\n      this.drawer.recenter(progress);\n    }\n    /**\n     * Seeks to a position\n     *\n     * @param {number} progress Between 0 (=beginning) and 1 (=end)\n     * @emits WaveSurfer#interaction\n     * @emits WaveSurfer#seek\n     * @example\n     * // seek to the middle of the audio\n     * wavesurfer.seekTo(0.5);\n     */\n\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(progress) {\n      var _this8 = this;\n\n      // return an error if progress is not a number between 0 and 1\n      if (typeof progress !== 'number' || !isFinite(progress) || progress < 0 || progress > 1) {\n        throw new Error('Error calling wavesurfer.seekTo, parameter must be a number between 0 and 1!');\n      }\n\n      this.fireEvent('interaction', function () {\n        return _this8.seekTo(progress);\n      });\n      var isWebAudioBackend = this.params.backend === 'WebAudio';\n      var paused = this.backend.isPaused();\n\n      if (isWebAudioBackend && !paused) {\n        this.backend.pause();\n      } // avoid small scrolls while paused seeking\n\n\n      var oldScrollParent = this.params.scrollParent;\n      this.params.scrollParent = false;\n      this.backend.seekTo(progress * this.getDuration());\n      this.drawer.progress(progress);\n\n      if (isWebAudioBackend && !paused) {\n        this.backend.play();\n      }\n\n      this.params.scrollParent = oldScrollParent;\n      this.fireEvent('seek', progress);\n    }\n    /**\n     * Stops and goes to the beginning.\n     *\n     * @example wavesurfer.stop();\n     */\n\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      this.pause();\n      this.seekTo(0);\n      this.drawer.progress(0);\n    }\n    /**\n     * Sets the ID of the audio device to use for output and returns a Promise.\n     *\n     * @param {string} deviceId String value representing underlying output\n     * device\n     * @returns {Promise} `Promise` that resolves to `undefined` when there are\n     * no errors detected.\n     */\n\n  }, {\n    key: \"setSinkId\",\n    value: function setSinkId(deviceId) {\n      return this.backend.setSinkId(deviceId);\n    }\n    /**\n     * Set the playback volume.\n     *\n     * @param {number} newVolume A value between 0 and 1, 0 being no\n     * volume and 1 being full volume.\n     * @emits WaveSurfer#volume\n     */\n\n  }, {\n    key: \"setVolume\",\n    value: function setVolume(newVolume) {\n      this.backend.setVolume(newVolume);\n      this.fireEvent('volume', newVolume);\n    }\n    /**\n     * Get the playback volume.\n     *\n     * @return {number} A value between 0 and 1, 0 being no\n     * volume and 1 being full volume.\n     */\n\n  }, {\n    key: \"getVolume\",\n    value: function getVolume() {\n      return this.backend.getVolume();\n    }\n    /**\n     * Set the playback rate.\n     *\n     * @param {number} rate A positive number. E.g. 0.5 means half the normal\n     * speed, 2 means double speed and so on.\n     * @example wavesurfer.setPlaybackRate(2);\n     */\n\n  }, {\n    key: \"setPlaybackRate\",\n    value: function setPlaybackRate(rate) {\n      this.backend.setPlaybackRate(rate);\n    }\n    /**\n     * Get the playback rate.\n     *\n     * @return {number} The current playback rate.\n     */\n\n  }, {\n    key: \"getPlaybackRate\",\n    value: function getPlaybackRate() {\n      return this.backend.getPlaybackRate();\n    }\n    /**\n     * Toggle the volume on and off. If not currently muted it will save the\n     * current volume value and turn the volume off. If currently muted then it\n     * will restore the volume to the saved value, and then rest the saved\n     * value.\n     *\n     * @example wavesurfer.toggleMute();\n     */\n\n  }, {\n    key: \"toggleMute\",\n    value: function toggleMute() {\n      this.setMute(!this.isMuted);\n    }\n    /**\n     * Enable or disable muted audio\n     *\n     * @param {boolean} mute Specify `true` to mute audio.\n     * @emits WaveSurfer#volume\n     * @emits WaveSurfer#mute\n     * @example\n     * // unmute\n     * wavesurfer.setMute(false);\n     * console.log(wavesurfer.getMute()) // logs false\n     */\n\n  }, {\n    key: \"setMute\",\n    value: function setMute(mute) {\n      // ignore all muting requests if the audio is already in that state\n      if (mute === this.isMuted) {\n        this.fireEvent('mute', this.isMuted);\n        return;\n      }\n\n      if (this.backend.setMute) {\n        // Backends such as the MediaElement backend have their own handling\n        // of mute, let them handle it.\n        this.backend.setMute(mute);\n        this.isMuted = mute;\n      } else {\n        if (mute) {\n          // If currently not muted then save current volume,\n          // turn off the volume and update the mute properties\n          this.savedVolume = this.backend.getVolume();\n          this.backend.setVolume(0);\n          this.isMuted = true;\n          this.fireEvent('volume', 0);\n        } else {\n          // If currently muted then restore to the saved volume\n          // and update the mute properties\n          this.backend.setVolume(this.savedVolume);\n          this.isMuted = false;\n          this.fireEvent('volume', this.savedVolume);\n        }\n      }\n\n      this.fireEvent('mute', this.isMuted);\n    }\n    /**\n     * Get the current mute status.\n     *\n     * @example const isMuted = wavesurfer.getMute();\n     * @return {boolean} Current mute status\n     */\n\n  }, {\n    key: \"getMute\",\n    value: function getMute() {\n      return this.isMuted;\n    }\n    /**\n     * Get the list of current set filters as an array.\n     *\n     * Filters must be set with setFilters method first\n     *\n     * @return {array} List of enabled filters\n     */\n\n  }, {\n    key: \"getFilters\",\n    value: function getFilters() {\n      return this.backend.filters || [];\n    }\n    /**\n     * Toggles `scrollParent` and redraws\n     *\n     * @example wavesurfer.toggleScroll();\n     */\n\n  }, {\n    key: \"toggleScroll\",\n    value: function toggleScroll() {\n      this.params.scrollParent = !this.params.scrollParent;\n      this.drawBuffer();\n    }\n    /**\n     * Toggle mouse interaction\n     *\n     * @example wavesurfer.toggleInteraction();\n     */\n\n  }, {\n    key: \"toggleInteraction\",\n    value: function toggleInteraction() {\n      this.params.interact = !this.params.interact;\n    }\n    /**\n     * Get the fill color of the waveform after the cursor.\n     *\n     * @return {string} A CSS color string.\n     */\n\n  }, {\n    key: \"getWaveColor\",\n    value: function getWaveColor() {\n      return this.params.waveColor;\n    }\n    /**\n     * Set the fill color of the waveform after the cursor.\n     *\n     * @param {string} color A CSS color string.\n     * @example wavesurfer.setWaveColor('#ddd');\n     */\n\n  }, {\n    key: \"setWaveColor\",\n    value: function setWaveColor(color) {\n      this.params.waveColor = color;\n      this.drawBuffer();\n    }\n    /**\n     * Get the fill color of the waveform behind the cursor.\n     *\n     * @return {string} A CSS color string.\n     */\n\n  }, {\n    key: \"getProgressColor\",\n    value: function getProgressColor() {\n      return this.params.progressColor;\n    }\n    /**\n     * Set the fill color of the waveform behind the cursor.\n     *\n     * @param {string} color A CSS color string.\n     * @example wavesurfer.setProgressColor('#400');\n     */\n\n  }, {\n    key: \"setProgressColor\",\n    value: function setProgressColor(color) {\n      this.params.progressColor = color;\n      this.drawBuffer();\n    }\n    /**\n     * Get the background color of the waveform container.\n     *\n     * @return {string} A CSS color string.\n     */\n\n  }, {\n    key: \"getBackgroundColor\",\n    value: function getBackgroundColor() {\n      return this.params.backgroundColor;\n    }\n    /**\n     * Set the background color of the waveform container.\n     *\n     * @param {string} color A CSS color string.\n     * @example wavesurfer.setBackgroundColor('#FF00FF');\n     */\n\n  }, {\n    key: \"setBackgroundColor\",\n    value: function setBackgroundColor(color) {\n      this.params.backgroundColor = color;\n      util.style(this.container, {\n        background: this.params.backgroundColor\n      });\n    }\n    /**\n     * Get the fill color of the cursor indicating the playhead\n     * position.\n     *\n     * @return {string} A CSS color string.\n     */\n\n  }, {\n    key: \"getCursorColor\",\n    value: function getCursorColor() {\n      return this.params.cursorColor;\n    }\n    /**\n     * Set the fill color of the cursor indicating the playhead\n     * position.\n     *\n     * @param {string} color A CSS color string.\n     * @example wavesurfer.setCursorColor('#222');\n     */\n\n  }, {\n    key: \"setCursorColor\",\n    value: function setCursorColor(color) {\n      this.params.cursorColor = color;\n      this.drawer.updateCursor();\n    }\n    /**\n     * Get the height of the waveform.\n     *\n     * @return {number} Height measured in pixels.\n     */\n\n  }, {\n    key: \"getHeight\",\n    value: function getHeight() {\n      return this.params.height;\n    }\n    /**\n     * Set the height of the waveform.\n     *\n     * @param {number} height Height measured in pixels.\n     * @example wavesurfer.setHeight(200);\n     */\n\n  }, {\n    key: \"setHeight\",\n    value: function setHeight(height) {\n      this.params.height = height;\n      this.drawer.setHeight(height * this.params.pixelRatio);\n      this.drawBuffer();\n    }\n    /**\n     * Hide channels from being drawn on the waveform if splitting channels.\n     *\n     * For example, if we want to draw only the peaks for the right stereo channel:\n     *\n     * const wavesurfer = new WaveSurfer.create({...splitChannels: true});\n     * wavesurfer.load('stereo_audio.mp3');\n     *\n     * wavesurfer.setFilteredChannel([0]); <-- hide left channel peaks.\n     *\n     * @param {array} channelIndices Channels to be filtered out from drawing.\n     * @version 4.0.0\n     */\n\n  }, {\n    key: \"setFilteredChannels\",\n    value: function setFilteredChannels(channelIndices) {\n      this.params.splitChannelsOptions.filterChannels = channelIndices;\n      this.drawBuffer();\n    }\n    /**\n     * Get the correct peaks for current wave view-port and render wave\n     *\n     * @private\n     * @emits WaveSurfer#redraw\n     */\n\n  }, {\n    key: \"drawBuffer\",\n    value: function drawBuffer() {\n      var nominalWidth = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio);\n      var parentWidth = this.drawer.getWidth();\n      var width = nominalWidth; // always start at 0 after zooming for scrolling : issue redraw left part\n\n      var start = 0;\n      var end = Math.max(start + parentWidth, width); // Fill container\n\n      if (this.params.fillParent && (!this.params.scrollParent || nominalWidth < parentWidth)) {\n        width = parentWidth;\n        start = 0;\n        end = width;\n      }\n\n      var peaks;\n\n      if (this.params.partialRender) {\n        var newRanges = this.peakCache.addRangeToPeakCache(width, start, end);\n        var i;\n\n        for (i = 0; i < newRanges.length; i++) {\n          peaks = this.backend.getPeaks(width, newRanges[i][0], newRanges[i][1]);\n          this.drawer.drawPeaks(peaks, width, newRanges[i][0], newRanges[i][1]);\n        }\n      } else {\n        peaks = this.backend.getPeaks(width, start, end);\n        this.drawer.drawPeaks(peaks, width, start, end);\n      }\n\n      this.fireEvent('redraw', peaks, width);\n    }\n    /**\n     * Horizontally zooms the waveform in and out. It also changes the parameter\n     * `minPxPerSec` and enables the `scrollParent` option. Calling the function\n     * with a falsey parameter will reset the zoom state.\n     *\n     * @param {?number} pxPerSec Number of horizontal pixels per second of\n     * audio, if none is set the waveform returns to unzoomed state\n     * @emits WaveSurfer#zoom\n     * @example wavesurfer.zoom(20);\n     */\n\n  }, {\n    key: \"zoom\",\n    value: function zoom(pxPerSec) {\n      if (!pxPerSec) {\n        this.params.minPxPerSec = this.defaultParams.minPxPerSec;\n        this.params.scrollParent = false;\n      } else {\n        this.params.minPxPerSec = pxPerSec;\n        this.params.scrollParent = true;\n      }\n\n      this.drawBuffer();\n      this.drawer.progress(this.backend.getPlayedPercents());\n      this.drawer.recenter(this.getCurrentTime() / this.getDuration());\n      this.fireEvent('zoom', pxPerSec);\n    }\n    /**\n     * Decode buffer and load\n     *\n     * @private\n     * @param {ArrayBuffer} arraybuffer Buffer to process\n     */\n\n  }, {\n    key: \"loadArrayBuffer\",\n    value: function loadArrayBuffer(arraybuffer) {\n      var _this9 = this;\n\n      this.decodeArrayBuffer(arraybuffer, function (data) {\n        if (!_this9.isDestroyed) {\n          _this9.loadDecodedBuffer(data);\n        }\n      });\n    }\n    /**\n     * Directly load an externally decoded AudioBuffer\n     *\n     * @private\n     * @param {AudioBuffer} buffer Buffer to process\n     * @emits WaveSurfer#ready\n     */\n\n  }, {\n    key: \"loadDecodedBuffer\",\n    value: function loadDecodedBuffer(buffer) {\n      this.backend.load(buffer);\n      this.drawBuffer();\n      this.isReady = true;\n      this.fireEvent('ready');\n    }\n    /**\n     * Loads audio data from a Blob or File object\n     *\n     * @param {Blob|File} blob Audio data\n     * @example\n     */\n\n  }, {\n    key: \"loadBlob\",\n    value: function loadBlob(blob) {\n      var _this10 = this;\n\n      // Create file reader\n      var reader = new FileReader();\n      reader.addEventListener('progress', function (e) {\n        return _this10.onProgress(e);\n      });\n      reader.addEventListener('load', function (e) {\n        return _this10.loadArrayBuffer(e.target.result);\n      });\n      reader.addEventListener('error', function () {\n        return _this10.fireEvent('error', 'Error reading file');\n      });\n      reader.readAsArrayBuffer(blob);\n      this.empty();\n    }\n    /**\n     * Loads audio and re-renders the waveform.\n     *\n     * @param {string|HTMLMediaElement} url The url of the audio file or the\n     * audio element with the audio\n     * @param {number[]|Number.<Array[]>} peaks Wavesurfer does not have to decode\n     * the audio to render the waveform if this is specified\n     * @param {?string} preload (Use with backend `MediaElement` and `MediaElementWebAudio`)\n     * `'none'|'metadata'|'auto'` Preload attribute for the media element\n     * @param {?number} duration The duration of the audio. This is used to\n     * render the peaks data in the correct size for the audio duration (as\n     * befits the current `minPxPerSec` and zoom value) without having to decode\n     * the audio.\n     * @returns {void}\n     * @throws Will throw an error if the `url` argument is empty.\n     * @example\n     * // uses fetch or media element to load file (depending on backend)\n     * wavesurfer.load('http://example.com/demo.wav');\n     *\n     * // setting preload attribute with media element backend and supplying\n     * // peaks\n     * wavesurfer.load(\n     *   'http://example.com/demo.wav',\n     *   [0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888],\n     *   true\n     * );\n     */\n\n  }, {\n    key: \"load\",\n    value: function load(url, peaks, preload, duration) {\n      if (!url) {\n        throw new Error('url parameter cannot be empty');\n      }\n\n      this.empty();\n\n      if (preload) {\n        // check whether the preload attribute will be usable and if not log\n        // a warning listing the reasons why not and nullify the variable\n        var preloadIgnoreReasons = {\n          \"Preload is not 'auto', 'none' or 'metadata'\": ['auto', 'metadata', 'none'].indexOf(preload) === -1,\n          'Peaks are not provided': !peaks,\n          \"Backend is not of type 'MediaElement' or 'MediaElementWebAudio'\": ['MediaElement', 'MediaElementWebAudio'].indexOf(this.params.backend) === -1,\n          'Url is not of type string': typeof url !== 'string'\n        };\n        var activeReasons = Object.keys(preloadIgnoreReasons).filter(function (reason) {\n          return preloadIgnoreReasons[reason];\n        });\n\n        if (activeReasons.length) {\n          // eslint-disable-next-line no-console\n          console.warn('Preload parameter of wavesurfer.load will be ignored because:\\n\\t- ' + activeReasons.join('\\n\\t- ')); // stop invalid values from being used\n\n          preload = null;\n        }\n      } // loadBuffer(url, peaks, duration) requires that url is a string\n      // but users can pass in a HTMLMediaElement to WaveSurfer\n\n\n      if (this.params.backend === 'WebAudio' && url instanceof HTMLMediaElement) {\n        url = url.src;\n      }\n\n      switch (this.params.backend) {\n        case 'WebAudio':\n          return this.loadBuffer(url, peaks, duration);\n\n        case 'MediaElement':\n        case 'MediaElementWebAudio':\n          return this.loadMediaElement(url, peaks, preload, duration);\n      }\n    }\n    /**\n     * Loads audio using Web Audio buffer backend.\n     *\n     * @private\n     * @emits WaveSurfer#waveform-ready\n     * @param {string} url URL of audio file\n     * @param {number[]|Number.<Array[]>} peaks Peaks data\n     * @param {?number} duration Optional duration of audio file\n     * @returns {void}\n     */\n\n  }, {\n    key: \"loadBuffer\",\n    value: function loadBuffer(url, peaks, duration) {\n      var _this11 = this;\n\n      var load = function load(action) {\n        if (action) {\n          _this11.tmpEvents.push(_this11.once('ready', action));\n        }\n\n        return _this11.getArrayBuffer(url, function (data) {\n          return _this11.loadArrayBuffer(data);\n        });\n      };\n\n      if (peaks) {\n        this.backend.setPeaks(peaks, duration);\n        this.drawBuffer();\n        this.fireEvent('waveform-ready');\n        this.tmpEvents.push(this.once('interaction', load));\n      } else {\n        return load();\n      }\n    }\n    /**\n     * Either create a media element, or load an existing media element.\n     *\n     * @private\n     * @emits WaveSurfer#waveform-ready\n     * @param {string|HTMLMediaElement} urlOrElt Either a path to a media file, or an\n     * existing HTML5 Audio/Video Element\n     * @param {number[]|Number.<Array[]>} peaks Array of peaks. Required to bypass web audio\n     * dependency\n     * @param {?boolean} preload Set to true if the preload attribute of the\n     * audio element should be enabled\n     * @param {?number} duration Optional duration of audio file\n     */\n\n  }, {\n    key: \"loadMediaElement\",\n    value: function loadMediaElement(urlOrElt, peaks, preload, duration) {\n      var _this12 = this;\n\n      var url = urlOrElt;\n\n      if (typeof urlOrElt === 'string') {\n        this.backend.load(url, this.mediaContainer, peaks, preload);\n      } else {\n        var elt = urlOrElt;\n        this.backend.loadElt(elt, peaks); // If peaks are not provided,\n        // url = element.src so we can get peaks with web audio\n\n        url = elt.src;\n      }\n\n      this.tmpEvents.push(this.backend.once('canplay', function () {\n        // ignore when backend was already destroyed\n        if (!_this12.backend.destroyed) {\n          _this12.drawBuffer();\n\n          _this12.isReady = true;\n\n          _this12.fireEvent('ready');\n        }\n      }), this.backend.once('error', function (err) {\n        return _this12.fireEvent('error', err);\n      })); // If peaks are provided, render them and fire the `waveform-ready` event.\n\n      if (peaks) {\n        this.backend.setPeaks(peaks, duration);\n        this.drawBuffer();\n        this.fireEvent('waveform-ready');\n      } // If no pre-decoded peaks are provided, or are provided with\n      // forceDecode flag, attempt to download the audio file and decode it\n      // with Web Audio.\n\n\n      if ((!peaks || this.params.forceDecode) && this.backend.supportsWebAudio()) {\n        this.getArrayBuffer(url, function (arraybuffer) {\n          _this12.decodeArrayBuffer(arraybuffer, function (buffer) {\n            _this12.backend.buffer = buffer;\n\n            _this12.backend.setPeaks(null);\n\n            _this12.drawBuffer();\n\n            _this12.fireEvent('waveform-ready');\n          });\n        });\n      }\n    }\n    /**\n     * Decode an array buffer and pass data to a callback\n     *\n     * @private\n     * @param {Object} arraybuffer The array buffer to decode\n     * @param {function} callback The function to call on complete\n     */\n\n  }, {\n    key: \"decodeArrayBuffer\",\n    value: function decodeArrayBuffer(arraybuffer, callback) {\n      var _this13 = this;\n\n      this.arraybuffer = arraybuffer;\n      this.backend.decodeArrayBuffer(arraybuffer, function (data) {\n        // Only use the decoded data if we haven't been destroyed or\n        // another decode started in the meantime\n        if (!_this13.isDestroyed && _this13.arraybuffer == arraybuffer) {\n          callback(data);\n          _this13.arraybuffer = null;\n        }\n      }, function () {\n        return _this13.fireEvent('error', 'Error decoding audiobuffer');\n      });\n    }\n    /**\n     * Load an array buffer using fetch and pass the result to a callback\n     *\n     * @param {string} url The URL of the file object\n     * @param {function} callback The function to call on complete\n     * @returns {util.fetchFile} fetch call\n     * @private\n     */\n\n  }, {\n    key: \"getArrayBuffer\",\n    value: function getArrayBuffer(url, callback) {\n      var _this14 = this;\n\n      var options = Object.assign({\n        url: url,\n        responseType: 'arraybuffer'\n      }, this.params.xhr);\n      var request = util.fetchFile(options);\n      this.currentRequest = request;\n      this.tmpEvents.push(request.on('progress', function (e) {\n        _this14.onProgress(e);\n      }), request.on('success', function (data) {\n        callback(data);\n        _this14.currentRequest = null;\n      }), request.on('error', function (e) {\n        _this14.fireEvent('error', e);\n\n        _this14.currentRequest = null;\n      }));\n      return request;\n    }\n    /**\n     * Called while the audio file is loading\n     *\n     * @private\n     * @param {Event} e Progress event\n     * @emits WaveSurfer#loading\n     */\n\n  }, {\n    key: \"onProgress\",\n    value: function onProgress(e) {\n      var percentComplete;\n\n      if (e.lengthComputable) {\n        percentComplete = e.loaded / e.total;\n      } else {\n        // Approximate progress with an asymptotic\n        // function, and assume downloads in the 1-3 MB range.\n        percentComplete = e.loaded / (e.loaded + 1000000);\n      }\n\n      this.fireEvent('loading', Math.round(percentComplete * 100), e.target);\n    }\n    /**\n     * Exports PCM data into a JSON array and optionally opens in a new window\n     * as valid JSON Blob instance.\n     *\n     * @param {number} length=1024 The scale in which to export the peaks\n     * @param {number} accuracy=10000\n     * @param {?boolean} noWindow Set to true to disable opening a new\n     * window with the JSON\n     * @param {number} start Start index\n     * @param {number} end End index\n     * @return {Promise} Promise that resolves with array of peaks\n     */\n\n  }, {\n    key: \"exportPCM\",\n    value: function exportPCM(length, accuracy, noWindow, start, end) {\n      length = length || 1024;\n      start = start || 0;\n      accuracy = accuracy || 10000;\n      noWindow = noWindow || false;\n      var peaks = this.backend.getPeaks(length, start, end);\n      var arr = [].map.call(peaks, function (val) {\n        return Math.round(val * accuracy) / accuracy;\n      });\n      return new Promise(function (resolve, reject) {\n        if (!noWindow) {\n          var blobJSON = new Blob([JSON.stringify(arr)], {\n            type: 'application/json;charset=utf-8'\n          });\n          var objURL = URL.createObjectURL(blobJSON);\n          window.open(objURL);\n          URL.revokeObjectURL(objURL);\n        }\n\n        resolve(arr);\n      });\n    }\n    /**\n     * Save waveform image as data URI.\n     *\n     * The default format is `'image/png'`. Other supported types are\n     * `'image/jpeg'` and `'image/webp'`.\n     *\n     * @param {string} format='image/png' A string indicating the image format.\n     * The default format type is `'image/png'`.\n     * @param {number} quality=1 A number between 0 and 1 indicating the image\n     * quality to use for image formats that use lossy compression such as\n     * `'image/jpeg'`` and `'image/webp'`.\n     * @param {string} type Image data type to return. Either 'dataURL' (default)\n     * or 'blob'.\n     * @return {string|string[]|Promise} When using `'dataURL'` type this returns\n     * a single data URL or an array of data URLs, one for each canvas. When using\n     * `'blob'` type this returns a `Promise` resolving with an array of `Blob`\n     * instances, one for each canvas.\n     */\n\n  }, {\n    key: \"exportImage\",\n    value: function exportImage(format, quality, type) {\n      if (!format) {\n        format = 'image/png';\n      }\n\n      if (!quality) {\n        quality = 1;\n      }\n\n      if (!type) {\n        type = 'dataURL';\n      }\n\n      return this.drawer.getImage(format, quality, type);\n    }\n    /**\n     * Cancel any fetch request currently in progress\n     */\n\n  }, {\n    key: \"cancelAjax\",\n    value: function cancelAjax() {\n      if (this.currentRequest && this.currentRequest.controller) {\n        // If the current request has a ProgressHandler, then its ReadableStream might need to be cancelled too\n        // See: Wavesurfer issue #2042\n        // See Firefox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1583815\n        if (this.currentRequest._reader) {\n          // Ignoring exceptions thrown by call to cancel()\n          this.currentRequest._reader.cancel().catch(function (err) {});\n        }\n\n        this.currentRequest.controller.abort();\n        this.currentRequest = null;\n      }\n    }\n    /**\n     * @private\n     */\n\n  }, {\n    key: \"clearTmpEvents\",\n    value: function clearTmpEvents() {\n      this.tmpEvents.forEach(function (e) {\n        return e.un();\n      });\n    }\n    /**\n     * Display empty waveform.\n     */\n\n  }, {\n    key: \"empty\",\n    value: function empty() {\n      if (!this.backend.isPaused()) {\n        this.stop();\n        this.backend.disconnectSource();\n      }\n\n      this.isReady = false;\n      this.cancelAjax();\n      this.clearTmpEvents(); // empty drawer\n\n      this.drawer.progress(0);\n      this.drawer.setWidth(0);\n      this.drawer.drawPeaks({\n        length: this.drawer.getWidth()\n      }, 0);\n    }\n    /**\n     * Remove events, elements and disconnect WebAudio nodes.\n     *\n     * @emits WaveSurfer#destroy\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.destroyAllPlugins();\n      this.fireEvent('destroy');\n      this.cancelAjax();\n      this.clearTmpEvents();\n      this.unAll();\n\n      if (this.params.responsive !== false) {\n        window.removeEventListener('resize', this._onResize, true);\n        window.removeEventListener('orientationchange', this._onResize, true);\n      }\n\n      if (this.backend) {\n        this.backend.destroy(); // clears memory usage\n\n        this.backend = null;\n      }\n\n      if (this.drawer) {\n        this.drawer.destroy();\n      }\n\n      this.isDestroyed = true;\n      this.isReady = false;\n      this.arraybuffer = null;\n    }\n  }], [{\n    key: \"create\",\n    value:\n    /** @private */\n\n    /** @private */\n\n    /**\n     * Instantiate this class, call its `init` function and returns it\n     *\n     * @param {WavesurferParams} params The wavesurfer parameters\n     * @return {Object} WaveSurfer instance\n     * @example const wavesurfer = WaveSurfer.create(params);\n     */\n    function create(params) {\n      var wavesurfer = new WaveSurfer(params);\n      return wavesurfer.init();\n    }\n    /**\n     * The library version number is available as a static property of the\n     * WaveSurfer class\n     *\n     * @type {String}\n     * @example\n     * console.log('Using wavesurfer.js ' + WaveSurfer.VERSION);\n     */\n\n  }]);\n\n  return WaveSurfer;\n}(util.Observer);\n\nexports.default = WaveSurfer;\nWaveSurfer.VERSION = \"5.1.0\";\nWaveSurfer.util = util;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./src/webaudio.js\":\n/*!*************************!*\\\n  !*** ./src/webaudio.js ***!\n  \\*************************/\n/***/ ((module, exports, __nested_webpack_require_176600__) => {\n\n\"use strict\";\n\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.default = void 0;\n\nvar util = _interopRequireWildcard(__nested_webpack_require_176600__(/*! ./util */ \"./src/util/index.js\"));\n\nfunction _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== \"function\") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }\n\nfunction _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== \"object\" && typeof obj !== \"function\") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== \"default\" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n// using constants to prevent someone writing the string wrong\nvar PLAYING = 'playing';\nvar PAUSED = 'paused';\nvar FINISHED = 'finished';\n/**\n * WebAudio backend\n *\n * @extends {Observer}\n */\n\nvar WebAudio = /*#__PURE__*/function (_util$Observer) {\n  _inherits(WebAudio, _util$Observer);\n\n  var _super = _createSuper(WebAudio);\n\n  /**\n   * Construct the backend\n   *\n   * @param {WavesurferParams} params Wavesurfer parameters\n   */\n  function WebAudio(params) {\n    var _this$stateBehaviors, _this$states;\n\n    var _this;\n\n    _classCallCheck(this, WebAudio);\n\n    _this = _super.call(this);\n    /** @private */\n\n    _this.audioContext = null;\n    _this.offlineAudioContext = null;\n    _this.stateBehaviors = (_this$stateBehaviors = {}, _defineProperty(_this$stateBehaviors, PLAYING, {\n      init: function init() {\n        this.addOnAudioProcess();\n      },\n      getPlayedPercents: function getPlayedPercents() {\n        var duration = this.getDuration();\n        return this.getCurrentTime() / duration || 0;\n      },\n      getCurrentTime: function getCurrentTime() {\n        return this.startPosition + this.getPlayedTime();\n      }\n    }), _defineProperty(_this$stateBehaviors, PAUSED, {\n      init: function init() {\n        this.removeOnAudioProcess();\n      },\n      getPlayedPercents: function getPlayedPercents() {\n        var duration = this.getDuration();\n        return this.getCurrentTime() / duration || 0;\n      },\n      getCurrentTime: function getCurrentTime() {\n        return this.startPosition;\n      }\n    }), _defineProperty(_this$stateBehaviors, FINISHED, {\n      init: function init() {\n        this.removeOnAudioProcess();\n        this.fireEvent('finish');\n      },\n      getPlayedPercents: function getPlayedPercents() {\n        return 1;\n      },\n      getCurrentTime: function getCurrentTime() {\n        return this.getDuration();\n      }\n    }), _this$stateBehaviors);\n    _this.params = params;\n    /** ac: Audio Context instance */\n\n    _this.ac = params.audioContext || (_this.supportsWebAudio() ? _this.getAudioContext() : {});\n    /**@private */\n\n    _this.lastPlay = _this.ac.currentTime;\n    /** @private */\n\n    _this.startPosition = 0;\n    /** @private */\n\n    _this.scheduledPause = null;\n    /** @private */\n\n    _this.states = (_this$states = {}, _defineProperty(_this$states, PLAYING, Object.create(_this.stateBehaviors[PLAYING])), _defineProperty(_this$states, PAUSED, Object.create(_this.stateBehaviors[PAUSED])), _defineProperty(_this$states, FINISHED, Object.create(_this.stateBehaviors[FINISHED])), _this$states);\n    /** @private */\n\n    _this.buffer = null;\n    /** @private */\n\n    _this.filters = [];\n    /** gainNode: allows to control audio volume */\n\n    _this.gainNode = null;\n    /** @private */\n\n    _this.mergedPeaks = null;\n    /** @private */\n\n    _this.offlineAc = null;\n    /** @private */\n\n    _this.peaks = null;\n    /** @private */\n\n    _this.playbackRate = 1;\n    /** analyser: provides audio analysis information */\n\n    _this.analyser = null;\n    /** scriptNode: allows processing audio */\n\n    _this.scriptNode = null;\n    /** @private */\n\n    _this.source = null;\n    /** @private */\n\n    _this.splitPeaks = [];\n    /** @private */\n\n    _this.state = null;\n    /** @private */\n\n    _this.explicitDuration = params.duration;\n    /**\n     * Boolean indicating if the backend was destroyed.\n     */\n\n    _this.destroyed = false;\n    return _this;\n  }\n  /**\n   * Initialise the backend, called in `wavesurfer.createBackend()`\n   */\n\n\n  _createClass(WebAudio, [{\n    key: \"supportsWebAudio\",\n    value:\n    /** scriptBufferSize: size of the processing buffer */\n\n    /** audioContext: allows to process audio with WebAudio API */\n\n    /** @private */\n\n    /** @private */\n\n    /**\n     * Does the browser support this backend\n     *\n     * @return {boolean} Whether or not this browser supports this backend\n     */\n    function supportsWebAudio() {\n      return !!(window.AudioContext || window.webkitAudioContext);\n    }\n    /**\n     * Get the audio context used by this backend or create one\n     *\n     * @return {AudioContext} Existing audio context, or creates a new one\n     */\n\n  }, {\n    key: \"getAudioContext\",\n    value: function getAudioContext() {\n      if (!window.WaveSurferAudioContext) {\n        window.WaveSurferAudioContext = new (window.AudioContext || window.webkitAudioContext)();\n      }\n\n      return window.WaveSurferAudioContext;\n    }\n    /**\n     * Get the offline audio context used by this backend or create one\n     *\n     * @param {number} sampleRate The sample rate to use\n     * @return {OfflineAudioContext} Existing offline audio context, or creates\n     * a new one\n     */\n\n  }, {\n    key: \"getOfflineAudioContext\",\n    value: function getOfflineAudioContext(sampleRate) {\n      if (!window.WaveSurferOfflineAudioContext) {\n        window.WaveSurferOfflineAudioContext = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 2, sampleRate);\n      }\n\n      return window.WaveSurferOfflineAudioContext;\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      this.createVolumeNode();\n      this.createScriptNode();\n      this.createAnalyserNode();\n      this.setState(PAUSED);\n      this.setPlaybackRate(this.params.audioRate);\n      this.setLength(0);\n    }\n    /** @private */\n\n  }, {\n    key: \"disconnectFilters\",\n    value: function disconnectFilters() {\n      if (this.filters) {\n        this.filters.forEach(function (filter) {\n          filter && filter.disconnect();\n        });\n        this.filters = null; // Reconnect direct path\n\n        this.analyser.connect(this.gainNode);\n      }\n    }\n    /**\n     * @private\n     *\n     * @param {string} state The new state\n     */\n\n  }, {\n    key: \"setState\",\n    value: function setState(state) {\n      if (this.state !== this.states[state]) {\n        this.state = this.states[state];\n        this.state.init.call(this);\n      }\n    }\n    /**\n     * Unpacked `setFilters()`\n     *\n     * @param {...AudioNode} filters One or more filters to set\n     */\n\n  }, {\n    key: \"setFilter\",\n    value: function setFilter() {\n      for (var _len = arguments.length, filters = new Array(_len), _key = 0; _key < _len; _key++) {\n        filters[_key] = arguments[_key];\n      }\n\n      this.setFilters(filters);\n    }\n    /**\n     * Insert custom Web Audio nodes into the graph\n     *\n     * @param {AudioNode[]} filters Packed filters array\n     * @example\n     * const lowpass = wavesurfer.backend.ac.createBiquadFilter();\n     * wavesurfer.backend.setFilter(lowpass);\n     */\n\n  }, {\n    key: \"setFilters\",\n    value: function setFilters(filters) {\n      // Remove existing filters\n      this.disconnectFilters(); // Insert filters if filter array not empty\n\n      if (filters && filters.length) {\n        this.filters = filters; // Disconnect direct path before inserting filters\n\n        this.analyser.disconnect(); // Connect each filter in turn\n\n        filters.reduce(function (prev, curr) {\n          prev.connect(curr);\n          return curr;\n        }, this.analyser).connect(this.gainNode);\n      }\n    }\n    /** Create ScriptProcessorNode to process audio */\n\n  }, {\n    key: \"createScriptNode\",\n    value: function createScriptNode() {\n      if (this.params.audioScriptProcessor) {\n        this.scriptNode = this.params.audioScriptProcessor;\n      } else {\n        if (this.ac.createScriptProcessor) {\n          this.scriptNode = this.ac.createScriptProcessor(WebAudio.scriptBufferSize);\n        } else {\n          this.scriptNode = this.ac.createJavaScriptNode(WebAudio.scriptBufferSize);\n        }\n      }\n\n      this.scriptNode.connect(this.ac.destination);\n    }\n    /** @private */\n\n  }, {\n    key: \"addOnAudioProcess\",\n    value: function addOnAudioProcess() {\n      var _this2 = this;\n\n      this.scriptNode.onaudioprocess = function () {\n        var time = _this2.getCurrentTime();\n\n        if (time >= _this2.getDuration()) {\n          _this2.setState(FINISHED);\n\n          _this2.fireEvent('pause');\n        } else if (time >= _this2.scheduledPause) {\n          _this2.pause();\n        } else if (_this2.state === _this2.states[PLAYING]) {\n          _this2.fireEvent('audioprocess', time);\n        }\n      };\n    }\n    /** @private */\n\n  }, {\n    key: \"removeOnAudioProcess\",\n    value: function removeOnAudioProcess() {\n      this.scriptNode.onaudioprocess = null;\n    }\n    /** Create analyser node to perform audio analysis */\n\n  }, {\n    key: \"createAnalyserNode\",\n    value: function createAnalyserNode() {\n      this.analyser = this.ac.createAnalyser();\n      this.analyser.connect(this.gainNode);\n    }\n    /**\n     * Create the gain node needed to control the playback volume.\n     *\n     */\n\n  }, {\n    key: \"createVolumeNode\",\n    value: function createVolumeNode() {\n      // Create gain node using the AudioContext\n      if (this.ac.createGain) {\n        this.gainNode = this.ac.createGain();\n      } else {\n        this.gainNode = this.ac.createGainNode();\n      } // Add the gain node to the graph\n\n\n      this.gainNode.connect(this.ac.destination);\n    }\n    /**\n     * Set the sink id for the media player\n     *\n     * @param {string} deviceId String value representing audio device id.\n     * @returns {Promise} A Promise that resolves to `undefined` when there\n     * are no errors.\n     */\n\n  }, {\n    key: \"setSinkId\",\n    value: function setSinkId(deviceId) {\n      if (deviceId) {\n        /**\n         * The webaudio API doesn't currently support setting the device\n         * output. Here we create an HTMLAudioElement, connect the\n         * webaudio stream to that element and setSinkId there.\n         */\n        var audio = new window.Audio();\n\n        if (!audio.setSinkId) {\n          return Promise.reject(new Error('setSinkId is not supported in your browser'));\n        }\n\n        audio.autoplay = true;\n        var dest = this.ac.createMediaStreamDestination();\n        this.gainNode.disconnect();\n        this.gainNode.connect(dest);\n        audio.srcObject = dest.stream;\n        return audio.setSinkId(deviceId);\n      } else {\n        return Promise.reject(new Error('Invalid deviceId: ' + deviceId));\n      }\n    }\n    /**\n     * Set the audio volume\n     *\n     * @param {number} value A floating point value between 0 and 1.\n     */\n\n  }, {\n    key: \"setVolume\",\n    value: function setVolume(value) {\n      this.gainNode.gain.setValueAtTime(value, this.ac.currentTime);\n    }\n    /**\n     * Get the current volume\n     *\n     * @return {number} value A floating point value between 0 and 1.\n     */\n\n  }, {\n    key: \"getVolume\",\n    value: function getVolume() {\n      return this.gainNode.gain.value;\n    }\n    /**\n     * Decode an array buffer and pass data to a callback\n     *\n     * @private\n     * @param {ArrayBuffer} arraybuffer The array buffer to decode\n     * @param {function} callback The function to call on complete.\n     * @param {function} errback The function to call on error.\n     */\n\n  }, {\n    key: \"decodeArrayBuffer\",\n    value: function decodeArrayBuffer(arraybuffer, callback, errback) {\n      if (!this.offlineAc) {\n        this.offlineAc = this.getOfflineAudioContext(this.ac && this.ac.sampleRate ? this.ac.sampleRate : 44100);\n      }\n\n      if ('webkitAudioContext' in window) {\n        // Safari: no support for Promise-based decodeAudioData enabled\n        // Enable it in Safari using the Experimental Features > Modern WebAudio API option\n        this.offlineAc.decodeAudioData(arraybuffer, function (data) {\n          return callback(data);\n        }, errback);\n      } else {\n        this.offlineAc.decodeAudioData(arraybuffer).then(function (data) {\n          return callback(data);\n        }).catch(function (err) {\n          return errback(err);\n        });\n      }\n    }\n    /**\n     * Set pre-decoded peaks\n     *\n     * @param {number[]|Number.<Array[]>} peaks Peaks data\n     * @param {?number} duration Explicit duration\n     */\n\n  }, {\n    key: \"setPeaks\",\n    value: function setPeaks(peaks, duration) {\n      if (duration != null) {\n        this.explicitDuration = duration;\n      }\n\n      this.peaks = peaks;\n    }\n    /**\n     * Set the rendered length (different from the length of the audio)\n     *\n     * @param {number} length The rendered length\n     */\n\n  }, {\n    key: \"setLength\",\n    value: function setLength(length) {\n      // No resize, we can preserve the cached peaks.\n      if (this.mergedPeaks && length == 2 * this.mergedPeaks.length - 1 + 2) {\n        return;\n      }\n\n      this.splitPeaks = [];\n      this.mergedPeaks = []; // Set the last element of the sparse array so the peak arrays are\n      // appropriately sized for other calculations.\n\n      var channels = this.buffer ? this.buffer.numberOfChannels : 1;\n      var c;\n\n      for (c = 0; c < channels; c++) {\n        this.splitPeaks[c] = [];\n        this.splitPeaks[c][2 * (length - 1)] = 0;\n        this.splitPeaks[c][2 * (length - 1) + 1] = 0;\n      }\n\n      this.mergedPeaks[2 * (length - 1)] = 0;\n      this.mergedPeaks[2 * (length - 1) + 1] = 0;\n    }\n    /**\n     * Compute the max and min value of the waveform when broken into <length> subranges.\n     *\n     * @param {number} length How many subranges to break the waveform into.\n     * @param {number} first First sample in the required range.\n     * @param {number} last Last sample in the required range.\n     * @return {number[]|Number.<Array[]>} Array of 2*<length> peaks or array of arrays of\n     * peaks consisting of (max, min) values for each subrange.\n     */\n\n  }, {\n    key: \"getPeaks\",\n    value: function getPeaks(length, first, last) {\n      if (this.peaks) {\n        return this.peaks;\n      }\n\n      if (!this.buffer) {\n        return [];\n      }\n\n      first = first || 0;\n      last = last || length - 1;\n      this.setLength(length);\n\n      if (!this.buffer) {\n        return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;\n      }\n      /**\n       * The following snippet fixes a buffering data issue on the Safari\n       * browser which returned undefined It creates the missing buffer based\n       * on 1 channel, 4096 samples and the sampleRate from the current\n       * webaudio context 4096 samples seemed to be the best fit for rendering\n       * will review this code once a stable version of Safari TP is out\n       */\n\n\n      if (!this.buffer.length) {\n        var newBuffer = this.createBuffer(1, 4096, this.sampleRate);\n        this.buffer = newBuffer.buffer;\n      }\n\n      var sampleSize = this.buffer.length / length;\n      var sampleStep = ~~(sampleSize / 10) || 1;\n      var channels = this.buffer.numberOfChannels;\n      var c;\n\n      for (c = 0; c < channels; c++) {\n        var peaks = this.splitPeaks[c];\n        var chan = this.buffer.getChannelData(c);\n        var i = void 0;\n\n        for (i = first; i <= last; i++) {\n          var start = ~~(i * sampleSize);\n          var end = ~~(start + sampleSize);\n          /**\n           * Initialize the max and min to the first sample of this\n           * subrange, so that even if the samples are entirely\n           * on one side of zero, we still return the true max and\n           * min values in the subrange.\n           */\n\n          var min = chan[start];\n          var max = min;\n          var j = void 0;\n\n          for (j = start; j < end; j += sampleStep) {\n            var value = chan[j];\n\n            if (value > max) {\n              max = value;\n            }\n\n            if (value < min) {\n              min = value;\n            }\n          }\n\n          peaks[2 * i] = max;\n          peaks[2 * i + 1] = min;\n\n          if (c == 0 || max > this.mergedPeaks[2 * i]) {\n            this.mergedPeaks[2 * i] = max;\n          }\n\n          if (c == 0 || min < this.mergedPeaks[2 * i + 1]) {\n            this.mergedPeaks[2 * i + 1] = min;\n          }\n        }\n      }\n\n      return this.params.splitChannels ? this.splitPeaks : this.mergedPeaks;\n    }\n    /**\n     * Get the position from 0 to 1\n     *\n     * @return {number} Position\n     */\n\n  }, {\n    key: \"getPlayedPercents\",\n    value: function getPlayedPercents() {\n      return this.state.getPlayedPercents.call(this);\n    }\n    /** @private */\n\n  }, {\n    key: \"disconnectSource\",\n    value: function disconnectSource() {\n      if (this.source) {\n        this.source.disconnect();\n      }\n    }\n    /**\n     * Destroy all references with WebAudio, disconnecting audio nodes and closing Audio Context\n     */\n\n  }, {\n    key: \"destroyWebAudio\",\n    value: function destroyWebAudio() {\n      this.disconnectFilters();\n      this.disconnectSource();\n      this.gainNode.disconnect();\n      this.scriptNode.disconnect();\n      this.analyser.disconnect(); // close the audioContext if closeAudioContext option is set to true\n\n      if (this.params.closeAudioContext) {\n        // check if browser supports AudioContext.close()\n        if (typeof this.ac.close === 'function' && this.ac.state != 'closed') {\n          this.ac.close();\n        } // clear the reference to the audiocontext\n\n\n        this.ac = null; // clear the actual audiocontext, either passed as param or the\n        // global singleton\n\n        if (!this.params.audioContext) {\n          window.WaveSurferAudioContext = null;\n        } else {\n          this.params.audioContext = null;\n        } // clear the offlineAudioContext\n\n\n        window.WaveSurferOfflineAudioContext = null;\n      }\n    }\n    /**\n     * This is called when wavesurfer is destroyed\n     */\n\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      if (!this.isPaused()) {\n        this.pause();\n      }\n\n      this.unAll();\n      this.buffer = null;\n      this.destroyed = true;\n      this.destroyWebAudio();\n    }\n    /**\n     * Loaded a decoded audio buffer\n     *\n     * @param {Object} buffer Decoded audio buffer to load\n     */\n\n  }, {\n    key: \"load\",\n    value: function load(buffer) {\n      this.startPosition = 0;\n      this.lastPlay = this.ac.currentTime;\n      this.buffer = buffer;\n      this.createSource();\n    }\n    /** @private */\n\n  }, {\n    key: \"createSource\",\n    value: function createSource() {\n      this.disconnectSource();\n      this.source = this.ac.createBufferSource(); // adjust for old browsers\n\n      this.source.start = this.source.start || this.source.noteGrainOn;\n      this.source.stop = this.source.stop || this.source.noteOff;\n      this.setPlaybackRate(this.playbackRate);\n      this.source.buffer = this.buffer;\n      this.source.connect(this.analyser);\n    }\n    /**\n     * @private\n     *\n     * some browsers require an explicit call to #resume before they will play back audio\n     */\n\n  }, {\n    key: \"resumeAudioContext\",\n    value: function resumeAudioContext() {\n      if (this.ac.state == 'suspended') {\n        this.ac.resume && this.ac.resume();\n      }\n    }\n    /**\n     * Used by `wavesurfer.isPlaying()` and `wavesurfer.playPause()`\n     *\n     * @return {boolean} Whether or not this backend is currently paused\n     */\n\n  }, {\n    key: \"isPaused\",\n    value: function isPaused() {\n      return this.state !== this.states[PLAYING];\n    }\n    /**\n     * Used by `wavesurfer.getDuration()`\n     *\n     * @return {number} Duration of loaded buffer\n     */\n\n  }, {\n    key: \"getDuration\",\n    value: function getDuration() {\n      if (this.explicitDuration) {\n        return this.explicitDuration;\n      }\n\n      if (!this.buffer) {\n        return 0;\n      }\n\n      return this.buffer.duration;\n    }\n    /**\n     * Used by `wavesurfer.seekTo()`\n     *\n     * @param {number} start Position to start at in seconds\n     * @param {number} end Position to end at in seconds\n     * @return {{start: number, end: number}} Object containing start and end\n     * positions\n     */\n\n  }, {\n    key: \"seekTo\",\n    value: function seekTo(start, end) {\n      if (!this.buffer) {\n        return;\n      }\n\n      this.scheduledPause = null;\n\n      if (start == null) {\n        start = this.getCurrentTime();\n\n        if (start >= this.getDuration()) {\n          start = 0;\n        }\n      }\n\n      if (end == null) {\n        end = this.getDuration();\n      }\n\n      this.startPosition = start;\n      this.lastPlay = this.ac.currentTime;\n\n      if (this.state === this.states[FINISHED]) {\n        this.setState(PAUSED);\n      }\n\n      return {\n        start: start,\n        end: end\n      };\n    }\n    /**\n     * Get the playback position in seconds\n     *\n     * @return {number} The playback position in seconds\n     */\n\n  }, {\n    key: \"getPlayedTime\",\n    value: function getPlayedTime() {\n      return (this.ac.currentTime - this.lastPlay) * this.playbackRate;\n    }\n    /**\n     * Plays the loaded audio region.\n     *\n     * @param {number} start Start offset in seconds, relative to the beginning\n     * of a clip.\n     * @param {number} end When to stop relative to the beginning of a clip.\n     */\n\n  }, {\n    key: \"play\",\n    value: function play(start, end) {\n      if (!this.buffer) {\n        return;\n      } // need to re-create source on each playback\n\n\n      this.createSource();\n      var adjustedTime = this.seekTo(start, end);\n      start = adjustedTime.start;\n      end = adjustedTime.end;\n      this.scheduledPause = end;\n      this.source.start(0, start);\n      this.resumeAudioContext();\n      this.setState(PLAYING);\n      this.fireEvent('play');\n    }\n    /**\n     * Pauses the loaded audio.\n     */\n\n  }, {\n    key: \"pause\",\n    value: function pause() {\n      this.scheduledPause = null;\n      this.startPosition += this.getPlayedTime();\n      this.source && this.source.stop(0);\n      this.setState(PAUSED);\n      this.fireEvent('pause');\n    }\n    /**\n     * Returns the current time in seconds relative to the audio-clip's\n     * duration.\n     *\n     * @return {number} The current time in seconds\n     */\n\n  }, {\n    key: \"getCurrentTime\",\n    value: function getCurrentTime() {\n      return this.state.getCurrentTime.call(this);\n    }\n    /**\n     * Returns the current playback rate. (0=no playback, 1=normal playback)\n     *\n     * @return {number} The current playback rate\n     */\n\n  }, {\n    key: \"getPlaybackRate\",\n    value: function getPlaybackRate() {\n      return this.playbackRate;\n    }\n    /**\n     * Set the audio source playback rate.\n     *\n     * @param {number} value The playback rate to use\n     */\n\n  }, {\n    key: \"setPlaybackRate\",\n    value: function setPlaybackRate(value) {\n      this.playbackRate = value || 1;\n      this.source && this.source.playbackRate.setValueAtTime(this.playbackRate, this.ac.currentTime);\n    }\n    /**\n     * Set a point in seconds for playback to stop at.\n     *\n     * @param {number} end Position to end at\n     * @version 3.3.0\n     */\n\n  }, {\n    key: \"setPlayEnd\",\n    value: function setPlayEnd(end) {\n      this.scheduledPause = end;\n    }\n  }]);\n\n  return WebAudio;\n}(util.Observer);\n\nexports.default = WebAudio;\nWebAudio.scriptBufferSize = 256;\nmodule.exports = exports.default;\n\n/***/ }),\n\n/***/ \"./node_modules/debounce/index.js\":\n/*!****************************************!*\\\n  !*** ./node_modules/debounce/index.js ***!\n  \\****************************************/\n/***/ ((module) => {\n\n/**\n * Returns a function, that, as long as it continues to be invoked, will not\n * be triggered. The function will be called after it stops being called for\n * N milliseconds. If `immediate` is passed, trigger the function on the\n * leading edge, instead of the trailing. The function also has a property 'clear' \n * that is a function which will clear the timer to prevent previously scheduled executions. \n *\n * @source underscore.js\n * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/\n * @param {Function} function to wrap\n * @param {Number} timeout in ms (`100`)\n * @param {Boolean} whether to execute at the beginning (`false`)\n * @api public\n */\nfunction debounce(func, wait, immediate){\n  var timeout, args, context, timestamp, result;\n  if (null == wait) wait = 100;\n\n  function later() {\n    var last = Date.now() - timestamp;\n\n    if (last < wait && last >= 0) {\n      timeout = setTimeout(later, wait - last);\n    } else {\n      timeout = null;\n      if (!immediate) {\n        result = func.apply(context, args);\n        context = args = null;\n      }\n    }\n  };\n\n  var debounced = function(){\n    context = this;\n    args = arguments;\n    timestamp = Date.now();\n    var callNow = immediate && !timeout;\n    if (!timeout) timeout = setTimeout(later, wait);\n    if (callNow) {\n      result = func.apply(context, args);\n      context = args = null;\n    }\n\n    return result;\n  };\n\n  debounced.clear = function() {\n    if (timeout) {\n      clearTimeout(timeout);\n      timeout = null;\n    }\n  };\n  \n  debounced.flush = function() {\n    if (timeout) {\n      result = func.apply(context, args);\n      context = args = null;\n      \n      clearTimeout(timeout);\n      timeout = null;\n    }\n  };\n\n  return debounced;\n};\n\n// Adds compatibility for ES modules\ndebounce.debounce = debounce;\n\nmodule.exports = debounce;\n\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __nested_webpack_require_206272__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_206272__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t\n/******/ \t// startup\n/******/ \t// Load entry module and return exports\n/******/ \t// This entry module is referenced by other modules so it can't be inlined\n/******/ \tvar __webpack_exports__ = __nested_webpack_require_206272__(\"./src/wavesurfer.js\");\n/******/ \t\n/******/ \treturn __webpack_exports__;\n/******/ })()\n;\n});\n\n\n//# sourceURL=webpack://vanity/./node_modules/wavesurfer.js/dist/wavesurfer.js?");

function rbush(maxEntries, format) {
    if (!(this instanceof rbush)) return new rbush(maxEntries, format);

    // max entries in a node is 9 by default; min node fill is 40% for best performance
    this._maxEntries = Math.max(4, maxEntries || 9);
    this._minEntries = Math.max(2, Math.ceil(this._maxEntries * 0.4));

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ \"./node_modules/svelte/internal/index.mjs\");\n/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stores */ \"./src/stores.ts\");\n/* harmony import */ var _Map_svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Map.svelte */ \"./src/Map.svelte\");\n/* harmony import */ var _MainVid_svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainVid.svelte */ \"./src/MainVid.svelte\");\n/* harmony import */ var _Transcript_svelte__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transcript.svelte */ \"./src/Transcript.svelte\");\n/* harmony import */ var _WaveSurferControler_svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./WaveSurferControler.svelte */ \"./src/WaveSurferControler.svelte\");\n/* src/App.svelte generated by Svelte v3.38.2 */\n\n\n\n\n\n\n\n\nfunction add_css() {\n\tvar style = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"style\");\n\tstyle.id = \"svelte-82fgr9-style\";\n\tstyle.textContent = \".widget.svelte-82fgr9{height:90vh}.container.svelte-82fgr9{display:flex;flex-direction:row;overflow:auto;min-height:25vh}\";\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(document.head, style);\n}\n\n// (52:4) {#if transcriptSrc}\nfunction create_if_block_1(ctx) {\n\tlet transcript_1;\n\tlet current;\n\tlet transcript_1_props = {};\n\ttranscript_1 = new _Transcript_svelte__WEBPACK_IMPORTED_MODULE_4__.default({ props: transcript_1_props });\n\t/*transcript_1_binding*/ ctx[18](transcript_1);\n\n\treturn {\n\t\tc() {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(transcript_1.$$.fragment);\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(transcript_1, target, anchor);\n\t\t\tcurrent = true;\n\t\t},\n\t\tp(ctx, dirty) {\n\t\t\tconst transcript_1_changes = {};\n\t\t\ttranscript_1.$set(transcript_1_changes);\n\t\t},\n\t\ti(local) {\n\t\t\tif (current) return;\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(transcript_1.$$.fragment, local);\n\t\t\tcurrent = true;\n\t\t},\n\t\to(local) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(transcript_1.$$.fragment, local);\n\t\t\tcurrent = false;\n\t\t},\n\t\td(detaching) {\n\t\t\t/*transcript_1_binding*/ ctx[18](null);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(transcript_1, detaching);\n\t\t}\n\t};\n}\n\n// (55:4) {#if $gps}\nfunction create_if_block(ctx) {\n\tlet map;\n\tlet current;\n\n\tmap = new _Map_svelte__WEBPACK_IMPORTED_MODULE_2__.default({\n\t\t\tprops: {\n\t\t\t\tgps: /*$gps*/ ctx[7],\n\t\t\t\tmapStyle: /*$mapStyle*/ ctx[8]\n\t\t\t}\n\t\t});\n\n\treturn {\n\t\tc() {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(map.$$.fragment);\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(map, target, anchor);\n\t\t\tcurrent = true;\n\t\t},\n\t\tp(ctx, dirty) {\n\t\t\tconst map_changes = {};\n\t\t\tif (dirty & /*$gps*/ 128) map_changes.gps = /*$gps*/ ctx[7];\n\t\t\tif (dirty & /*$mapStyle*/ 256) map_changes.mapStyle = /*$mapStyle*/ ctx[8];\n\t\t\tmap.$set(map_changes);\n\t\t},\n\t\ti(local) {\n\t\t\tif (current) return;\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(map.$$.fragment, local);\n\t\t\tcurrent = true;\n\t\t},\n\t\to(local) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(map.$$.fragment, local);\n\t\t\tcurrent = false;\n\t\t},\n\t\td(detaching) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(map, detaching);\n\t\t}\n\t};\n}\n\nfunction create_fragment(ctx) {\n\tlet link;\n\tlet t0;\n\tlet div2;\n\tlet div1;\n\tlet div0;\n\tlet mainvid;\n\tlet updating_height;\n\tlet t1;\n\tlet t2;\n\tlet t3;\n\tlet wavesurfercontroler;\n\tlet current;\n\n\tfunction mainvid_height_binding(value) {\n\t\t/*mainvid_height_binding*/ ctx[17](value);\n\t}\n\n\tlet mainvid_props = {\n\t\tsrc: /*$vidSrc*/ ctx[4],\n\t\ttranscript: /*$transcriptSrc*/ ctx[5],\n\t\ttranscript_lang: /*$transcriptLang*/ ctx[6]\n\t};\n\n\tif (/*height*/ ctx[0] !== void 0) {\n\t\tmainvid_props.height = /*height*/ ctx[0];\n\t}\n\n\tmainvid = new _MainVid_svelte__WEBPACK_IMPORTED_MODULE_3__.default({ props: mainvid_props });\n\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks.push(() => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.bind)(mainvid, \"height\", mainvid_height_binding));\n\tmainvid.$on(\"trackLoaded\", /*handleTranscript*/ ctx[14]);\n\tmainvid.$on(\"durationLoaded\", (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.once)(/*handleTimeline*/ ctx[15]));\n\tlet if_block0 = /*transcriptSrc*/ ctx[11] && create_if_block_1(ctx);\n\tlet if_block1 = /*$gps*/ ctx[7] && create_if_block(ctx);\n\tlet wavesurfercontroler_props = {};\n\twavesurfercontroler = new _WaveSurferControler_svelte__WEBPACK_IMPORTED_MODULE_5__.default({ props: wavesurfercontroler_props });\n\t/*wavesurfercontroler_binding*/ ctx[20](wavesurfercontroler);\n\n\treturn {\n\t\tc() {\n\t\t\tlink = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"link\");\n\t\t\tt0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tdiv2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tdiv1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tdiv0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(mainvid.$$.fragment);\n\t\t\tt1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tif (if_block0) if_block0.c();\n\t\t\tt2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tif (if_block1) if_block1.c();\n\t\t\tt3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.create_component)(wavesurfercontroler.$$.fragment);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(link, \"href\", \"https://api.mapbox.com/mapbox-gl-js/v2.3.0/mapbox-gl.css\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(link, \"rel\", \"stylesheet\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, \"class\", \"container svelte-82fgr9\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div2, \"class\", \"widget svelte-82fgr9\");\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(document.head, link);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t0, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div2, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, div1);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(mainvid, div0, null);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t1);\n\t\t\tif (if_block0) if_block0.m(div1, null);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t2);\n\t\t\tif (if_block1) if_block1.m(div1, null);\n\t\t\t/*div1_binding*/ ctx[19](div1);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div2, t3);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.mount_component)(wavesurfercontroler, div2, null);\n\t\t\tcurrent = true;\n\t\t},\n\t\tp(ctx, [dirty]) {\n\t\t\tconst mainvid_changes = {};\n\t\t\tif (dirty & /*$vidSrc*/ 16) mainvid_changes.src = /*$vidSrc*/ ctx[4];\n\t\t\tif (dirty & /*$transcriptSrc*/ 32) mainvid_changes.transcript = /*$transcriptSrc*/ ctx[5];\n\t\t\tif (dirty & /*$transcriptLang*/ 64) mainvid_changes.transcript_lang = /*$transcriptLang*/ ctx[6];\n\n\t\t\tif (!updating_height && dirty & /*height*/ 1) {\n\t\t\t\tupdating_height = true;\n\t\t\t\tmainvid_changes.height = /*height*/ ctx[0];\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.add_flush_callback)(() => updating_height = false);\n\t\t\t}\n\n\t\t\tmainvid.$set(mainvid_changes);\n\t\t\tif (/*transcriptSrc*/ ctx[11]) if_block0.p(ctx, dirty);\n\n\t\t\tif (/*$gps*/ ctx[7]) {\n\t\t\t\tif (if_block1) {\n\t\t\t\t\tif_block1.p(ctx, dirty);\n\n\t\t\t\t\tif (dirty & /*$gps*/ 128) {\n\t\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1, 1);\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tif_block1 = create_if_block(ctx);\n\t\t\t\t\tif_block1.c();\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1, 1);\n\t\t\t\t\tif_block1.m(div1, null);\n\t\t\t\t}\n\t\t\t} else if (if_block1) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.group_outros)();\n\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block1, 1, 1, () => {\n\t\t\t\t\tif_block1 = null;\n\t\t\t\t});\n\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.check_outros)();\n\t\t\t}\n\n\t\t\tconst wavesurfercontroler_changes = {};\n\t\t\twavesurfercontroler.$set(wavesurfercontroler_changes);\n\t\t},\n\t\ti(local) {\n\t\t\tif (current) return;\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(mainvid.$$.fragment, local);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block0);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(if_block1);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_in)(wavesurfercontroler.$$.fragment, local);\n\t\t\tcurrent = true;\n\t\t},\n\t\to(local) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(mainvid.$$.fragment, local);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block0);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(if_block1);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.transition_out)(wavesurfercontroler.$$.fragment, local);\n\t\t\tcurrent = false;\n\t\t},\n\t\td(detaching) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(link);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t0);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div2);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(mainvid);\n\t\t\tif (if_block0) if_block0.d();\n\t\t\tif (if_block1) if_block1.d();\n\t\t\t/*div1_binding*/ ctx[19](null);\n\t\t\t/*wavesurfercontroler_binding*/ ctx[20](null);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_component)(wavesurfercontroler);\n\t\t}\n\t};\n}\n\nfunction instance($$self, $$props, $$invalidate) {\n\tlet $vidSrc;\n\tlet $transcriptSrc;\n\tlet $transcriptLang;\n\tlet $gps;\n\tlet $mapStyle;\n\tlet { model } = $$props;\n\tlet gps = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.createValue)(model, \"gps\", \"\");\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, gps, value => $$invalidate(7, $gps = value));\n\tlet vidSrc = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.createValue)(model, \"src\", \"\");\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, vidSrc, value => $$invalidate(4, $vidSrc = value));\n\tlet transcriptSrc = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.createValue)(model, \"transcript\", \"\");\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, transcriptSrc, value => $$invalidate(5, $transcriptSrc = value));\n\tlet transcriptLang = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.createValue)(model, \"transcript_lang\", \"\");\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, transcriptLang, value => $$invalidate(6, $transcriptLang = value));\n\tlet mapStyle = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.createValue)(model, \"map_style\", \"\");\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, mapStyle, value => $$invalidate(8, $mapStyle = value));\n\tlet duration = (0,_stores__WEBPACK_IMPORTED_MODULE_1__.createValue)(model, \"duration\", \"\");\n\tlet height;\n\tlet topRow;\n\tlet transcript;\n\tlet timeline;\n\n\tconst handleTranscript = cues => {\n\t\ttranscript.onDataLoad(cues.detail);\n\t};\n\n\tconst handleTimeline = vid => {\n\t\ttimeline.onDataLoad(vid.detail);\n\t};\n\n\tfunction mainvid_height_binding(value) {\n\t\theight = value;\n\t\t$$invalidate(0, height);\n\t}\n\n\tfunction transcript_1_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\ttranscript = $$value;\n\t\t\t$$invalidate(2, transcript);\n\t\t});\n\t}\n\n\tfunction div1_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\ttopRow = $$value;\n\t\t\t($$invalidate(1, topRow), $$invalidate(0, height));\n\t\t});\n\t}\n\n\tfunction wavesurfercontroler_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\ttimeline = $$value;\n\t\t\t$$invalidate(3, timeline);\n\t\t});\n\t}\n\n\t$$self.$$set = $$props => {\n\t\tif (\"model\" in $$props) $$invalidate(16, model = $$props.model);\n\t};\n\n\t$$self.$$.update = () => {\n\t\tif ($$self.$$.dirty & /*topRow, height*/ 3) {\n\t\t\t$: if (topRow) {\n\t\t\t\t$$invalidate(1, topRow.style.height = `${height}px`, topRow);\n\t\t\t}\n\t\t}\n\t};\n\n\treturn [\n\t\theight,\n\t\ttopRow,\n\t\ttranscript,\n\t\ttimeline,\n\t\t$vidSrc,\n\t\t$transcriptSrc,\n\t\t$transcriptLang,\n\t\t$gps,\n\t\t$mapStyle,\n\t\tgps,\n\t\tvidSrc,\n\t\ttranscriptSrc,\n\t\ttranscriptLang,\n\t\tmapStyle,\n\t\thandleTranscript,\n\t\thandleTimeline,\n\t\tmodel,\n\t\tmainvid_height_binding,\n\t\ttranscript_1_binding,\n\t\tdiv1_binding,\n\t\twavesurfercontroler_binding\n\t];\n}\n\nclass App extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {\n\tconstructor(options) {\n\t\tsuper();\n\t\tif (!document.getElementById(\"svelte-82fgr9-style\")) add_css();\n\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { model: 16 });\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n//# sourceURL=webpack://vanity/./src/App.svelte?");

    this.clear();
}

rbush.prototype = {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ \"./node_modules/svelte/internal/index.mjs\");\n/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stores */ \"./src/stores.ts\");\n/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! svelte */ \"./node_modules/svelte/index.mjs\");\n/* src/MainVid.svelte generated by Svelte v3.38.2 */\n\n\n\n\n\n\nfunction add_css() {\n\tvar style = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"style\");\n\tstyle.id = \"svelte-1sh9p9w-style\";\n\tstyle.textContent = \"video.svelte-1sh9p9w{height:100%;width:100%;max-width:none}.mainVid.svelte-1sh9p9w{resize:horizontal;overflow:auto;flex:1000 1000 auto;background-color:#dbdbdb}\";\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(document.head, style);\n}\n\n// (49:1) {#if transcript}\nfunction create_if_block(ctx) {\n\tlet track;\n\tlet track_src_value;\n\tlet mounted;\n\tlet dispose;\n\n\treturn {\n\t\tc() {\n\t\t\ttrack = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"track\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(track, \"kind\", \"captions\");\n\t\t\tif (track.src !== (track_src_value = /*transcript*/ ctx[1])) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(track, \"src\", track_src_value);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(track, \"srclang\", /*transcript_lang*/ ctx[2]);\n\t\t\ttrack.default = true;\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, track, anchor);\n\n\t\t\tif (!mounted) {\n\t\t\t\tdispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(track, \"load\", /*setupCues*/ ctx[6]);\n\t\t\t\tmounted = true;\n\t\t\t}\n\t\t},\n\t\tp(ctx, dirty) {\n\t\t\tif (dirty & /*transcript*/ 2 && track.src !== (track_src_value = /*transcript*/ ctx[1])) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(track, \"src\", track_src_value);\n\t\t\t}\n\n\t\t\tif (dirty & /*transcript_lang*/ 4) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(track, \"srclang\", /*transcript_lang*/ ctx[2]);\n\t\t\t}\n\t\t},\n\t\td(detaching) {\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(track);\n\t\t\tmounted = false;\n\t\t\tdispose();\n\t\t}\n\t};\n}\n\nfunction create_fragment(ctx) {\n\tlet div1;\n\tlet div0;\n\tlet video;\n\tlet video_src_value;\n\tlet video_updating = false;\n\tlet video_animationframe;\n\tlet mounted;\n\tlet dispose;\n\tlet if_block = /*transcript*/ ctx[1] && create_if_block(ctx);\n\n\tfunction video_timeupdate_handler() {\n\t\tcancelAnimationFrame(video_animationframe);\n\n\t\tif (!video.paused) {\n\t\t\tvideo_animationframe = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.raf)(video_timeupdate_handler);\n\t\t\tvideo_updating = true;\n\t\t}\n\n\t\t/*video_timeupdate_handler*/ ctx[9].call(video);\n\t}\n\n\treturn {\n\t\tc() {\n\t\t\tdiv1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tdiv0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tvideo = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"video\");\n\t\t\tif (if_block) if_block.c();\n\t\t\tif (video.src !== (video_src_value = /*src*/ ctx[0])) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(video, \"src\", video_src_value);\n\t\t\tvideo.controls = true;\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(video, \"class\", \"svelte-1sh9p9w\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, \"class\", \"mainVid svelte-1sh9p9w\");\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div0, video);\n\t\t\tif (if_block) if_block.m(video, null);\n\t\t\t/*video_binding*/ ctx[10](video);\n\t\t\t/*div0_binding*/ ctx[11](div0);\n\n\t\t\tif (!mounted) {\n\t\t\t\tdispose = [\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(video, \"timeupdate\", video_timeupdate_handler),\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(video, \"loadedmetadata\", /*vidData*/ ctx[7], { once: true })\n\t\t\t\t];\n\n\t\t\t\tmounted = true;\n\t\t\t}\n\t\t},\n\t\tp(ctx, [dirty]) {\n\t\t\tif (/*transcript*/ ctx[1]) {\n\t\t\t\tif (if_block) {\n\t\t\t\t\tif_block.p(ctx, dirty);\n\t\t\t\t} else {\n\t\t\t\t\tif_block = create_if_block(ctx);\n\t\t\t\t\tif_block.c();\n\t\t\t\t\tif_block.m(video, null);\n\t\t\t\t}\n\t\t\t} else if (if_block) {\n\t\t\t\tif_block.d(1);\n\t\t\t\tif_block = null;\n\t\t\t}\n\n\t\t\tif (dirty & /*src*/ 1 && video.src !== (video_src_value = /*src*/ ctx[0])) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(video, \"src\", video_src_value);\n\t\t\t}\n\n\t\t\tif (!video_updating && dirty & /*$curTime*/ 32 && !isNaN(/*$curTime*/ ctx[5])) {\n\t\t\t\tvideo.currentTime = /*$curTime*/ ctx[5];\n\t\t\t}\n\n\t\t\tvideo_updating = false;\n\t\t},\n\t\ti: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\to: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\td(detaching) {\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);\n\t\t\tif (if_block) if_block.d();\n\t\t\t/*video_binding*/ ctx[10](null);\n\t\t\t/*div0_binding*/ ctx[11](null);\n\t\t\tmounted = false;\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);\n\t\t}\n\t};\n}\n\nfunction instance($$self, $$props, $$invalidate) {\n\tlet $curTime;\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores__WEBPACK_IMPORTED_MODULE_1__.curTime, $$value => $$invalidate(5, $curTime = $$value));\n\tlet vid;\n\tlet container;\n\tlet { height } = $$props;\n\tlet { src } = $$props;\n\tlet { transcript } = $$props;\n\tlet { transcript_lang } = $$props;\n\tconst dispatch = (0,svelte__WEBPACK_IMPORTED_MODULE_2__.createEventDispatcher)();\n\n\t(0,svelte__WEBPACK_IMPORTED_MODULE_2__.onMount)(async () => {\n\t\tnew ResizeObserver(() => $$invalidate(8, height = container.clientHeight)).observe(container);\n\t});\n\n\tconst setupCues = () => {\n\t\t$$invalidate(3, vid.textTracks[0].mode = \"hidden\", vid);\n\t\tdispatch(\"trackLoaded\", vid.textTracks[0].cues);\n\t};\n\n\tconst vidData = () => {\n\t\tdispatch(\"durationLoaded\", vid);\n\t};\n\n\tfunction video_timeupdate_handler() {\n\t\t$curTime = this.currentTime;\n\t\t_stores__WEBPACK_IMPORTED_MODULE_1__.curTime.set($curTime);\n\t}\n\n\tfunction video_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\tvid = $$value;\n\t\t\t$$invalidate(3, vid);\n\t\t});\n\t}\n\n\tfunction div0_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\tcontainer = $$value;\n\t\t\t$$invalidate(4, container);\n\t\t});\n\t}\n\n\t$$self.$$set = $$props => {\n\t\tif (\"height\" in $$props) $$invalidate(8, height = $$props.height);\n\t\tif (\"src\" in $$props) $$invalidate(0, src = $$props.src);\n\t\tif (\"transcript\" in $$props) $$invalidate(1, transcript = $$props.transcript);\n\t\tif (\"transcript_lang\" in $$props) $$invalidate(2, transcript_lang = $$props.transcript_lang);\n\t};\n\n\treturn [\n\t\tsrc,\n\t\ttranscript,\n\t\ttranscript_lang,\n\t\tvid,\n\t\tcontainer,\n\t\t$curTime,\n\t\tsetupCues,\n\t\tvidData,\n\t\theight,\n\t\tvideo_timeupdate_handler,\n\t\tvideo_binding,\n\t\tdiv0_binding\n\t];\n}\n\nclass MainVid extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {\n\tconstructor(options) {\n\t\tsuper();\n\t\tif (!document.getElementById(\"svelte-1sh9p9w-style\")) add_css();\n\n\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, {\n\t\t\theight: 8,\n\t\t\tsrc: 0,\n\t\t\ttranscript: 1,\n\t\t\ttranscript_lang: 2\n\t\t});\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainVid);\n\n//# sourceURL=webpack://vanity/./src/MainVid.svelte?");

    search: function (bbox) {

        var node = this.data,
            result = [],
            toBBox = this.toBBox;

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ \"./node_modules/svelte/internal/index.mjs\");\n/* harmony import */ var _tmcw_togeojson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tmcw/togeojson */ \"./node_modules/@tmcw/togeojson/dist/togeojson.umd.js\");\n/* harmony import */ var _tmcw_togeojson__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tmcw_togeojson__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mapbox-gl */ \"./node_modules/mapbox-gl/dist/mapbox-gl.js\");\n/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! svelte */ \"./node_modules/svelte/index.mjs\");\n/* harmony import */ var _stores_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stores.ts */ \"./src/stores.ts\");\n/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @turf/helpers */ \"./node_modules/@turf/helpers/dist/es/index.js\");\n/* harmony import */ var _turf_nearest_point_on_line__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @turf/nearest-point-on-line */ \"./node_modules/@turf/nearest-point-on-line/dist/es/index.js\");\n/* src/Map.svelte generated by Svelte v3.38.2 */\n\n\n\n\n\n\n\n\n\nfunction add_css() {\n\tvar style = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"style\");\n\tstyle.id = \"svelte-1032u7r-style\";\n\tstyle.textContent = \".map.svelte-1032u7r{width:100%;height:100%}.map-container.svelte-1032u7r{flex:1000 1000;width:100%}\";\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(document.head, style);\n}\n\nfunction create_fragment(ctx) {\n\tlet div1;\n\tlet div0;\n\n\treturn {\n\t\tc() {\n\t\t\tdiv1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tdiv0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div0, \"class\", \"map svelte-1032u7r\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div1, \"class\", \"map-container svelte-1032u7r\");\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);\n\t\t\t/*div0_binding*/ ctx[6](div0);\n\t\t},\n\t\tp: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\ti: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\to: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\td(detaching) {\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);\n\t\t\t/*div0_binding*/ ctx[6](null);\n\t\t}\n\t};\n}\n\nfunction instance($$self, $$props, $$invalidate) {\n\tlet $curTime;\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores_ts__WEBPACK_IMPORTED_MODULE_4__.curTime, $$value => $$invalidate(5, $curTime = $$value));\n\tlet mapRef;\n\tlet line;\n\tlet container;\n\tlet route;\n\tlet start;\n\tlet { gps } = $$props;\n\tlet { mapStyle } = $$props;\n\n\tlet geojsonPoint = {\n\t\t\"type\": \"FeatureCollection\",\n\t\t\"features\": [\n\t\t\t{\n\t\t\t\t\"type\": \"Feature\",\n\t\t\t\t\"geometry\": { \"type\": \"LineString\", \"coordinates\": [] }\n\t\t\t}\n\t\t]\n\t};\n\n\tconst updatePos = time => {\n\t\tif (time && mapRef && route.features[0].properties.coordinateProperties.times) {\n\t\t\tconst times = route.features[0].properties.coordinateProperties.times;\n\t\t\tconst line = route.features[0].geometry.coordinates;\n\t\t\tlet index = times.findIndex(n => n > time);\n\n\t\t\t// finds next time (ordered)\n\t\t\tlet currentJson = line.slice(0, index);\n\n\t\t\tlet center = line[index];\n\n\t\t\tlet movingLine = {\n\t\t\t\t\"type\": \"FeatureCollection\",\n\t\t\t\t\"features\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"type\": \"Feature\",\n\t\t\t\t\t\t\"geometry\": {\n\t\t\t\t\t\t\t\"type\": \"LineString\",\n\t\t\t\t\t\t\t\"coordinates\": currentJson\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t};\n\n\t\t\tmapRef.getSource(\"lineSource\").setData(movingLine);\n\t\t\tmapRef.getSource(\"pointSource\").setData((0,_turf_helpers__WEBPACK_IMPORTED_MODULE_5__.point)(center));\n\t\t}\n\t};\n\n\t(0,svelte__WEBPACK_IMPORTED_MODULE_3__.onMount)(async () => {\n\t\t(mapbox_gl__WEBPACK_IMPORTED_MODULE_2___default().accessToken) = \"pk.eyJ1IjoiaW1hbmRlbCIsImEiOiJjankxdjU4ODMwYTViM21teGFpenpsbmd1In0.IN9K9rp8-I5pTbYTmwRJ4Q\";\n\n\t\t// Create the map\n\t\tmapRef = new (mapbox_gl__WEBPACK_IMPORTED_MODULE_2___default().Map)({\n\t\t\t\tcontainer,\n\t\t\t\tstyle: mapStyle || \"mapbox://styles/mapbox/light-v10?optimize=true\",\n\t\t\t\tcenter: [-74.0059413, 40.7127837],\n\t\t\t\tzoom: 13\n\t\t\t});\n\n\t\tmapRef.on(\"load\", () => {\n\t\t\tnew ResizeObserver(() => mapRef.resize()).observe(container);\n\t\t\tmapRef.resize();\n\t\t\tconst coordinates = route.features[0].geometry.coordinates;\n\n\t\t\tconst bounds = coordinates.reduce(\n\t\t\t\t(bounds, coord) => {\n\t\t\t\t\treturn bounds.extend(coord);\n\t\t\t\t},\n\t\t\t\tnew (mapbox_gl__WEBPACK_IMPORTED_MODULE_2___default().LngLatBounds)(coordinates[0], coordinates[0])\n\t\t\t);\n\n\t\t\tmapRef.fitBounds(bounds, { padding: 30 });\n\t\t\tmapRef.addSource(\"lineSource\", { \"type\": \"geojson\", \"data\": geojsonPoint });\n\t\t\tmapRef.addSource(\"fullLineSource\", { \"type\": \"geojson\", \"data\": route });\n\n\t\t\tmapRef.addLayer({\n\t\t\t\t\"id\": \"staticLine\",\n\t\t\t\t\"type\": \"line\",\n\t\t\t\t\"source\": \"fullLineSource\",\n\t\t\t\t\"paint\": {\n\t\t\t\t\t\"line-opacity\": 0.5,\n\t\t\t\t\t\"line-color\": \"#eba834\",\n\t\t\t\t\t\"line-width\": 4.5\n\t\t\t\t},\n\t\t\t\t\"layout\": {}, // 'visibility': 'none'\n\t\t\t\t\n\t\t\t});\n\n\t\t\tmapRef.addSource(\"pointSource\", { \"type\": \"geojson\", \"data\": geojsonPoint });\n\n\t\t\tmapRef.addLayer({\n\t\t\t\t\"id\": \"animatedLine\",\n\t\t\t\t\"type\": \"line\",\n\t\t\t\t\"source\": \"lineSource\",\n\t\t\t\t\"paint\": {\n\t\t\t\t\t\"line-opacity\": 1,\n\t\t\t\t\t\"line-color\": \"#eba834\",\n\t\t\t\t\t\"line-width\": 4.5\n\t\t\t\t},\n\t\t\t\t\"layout\": {}, // 'visibility': 'none'\n\t\t\t\t\n\t\t\t});\n\n\t\t\tmapRef.addLayer({\n\t\t\t\t\"id\": \"animatedPoint\",\n\t\t\t\t\"type\": \"circle\",\n\t\t\t\t\"source\": \"pointSource\",\n\t\t\t\t\"paint\": {\n\t\t\t\t\t\"circle-radius\": 5,\n\t\t\t\t\t\"circle-opacity\": 1,\n\t\t\t\t\t\"circle-color\": \"#eba834\"\n\t\t\t\t},\n\t\t\t\t\"layout\": {}, // 'visibility': 'none'\n\t\t\t\t\n\t\t\t});\n\n\t\t\tmapRef.on(\"mouseenter\", \"staticLine\", () => {\n\t\t\t\tmapRef.getCanvasContainer().style.cursor = \"crosshair\";\n\t\t\t});\n\n\t\t\tmapRef.on(\"mouseleave\", \"staticLine\", () => {\n\t\t\t\tmapRef.getCanvasContainer().style.cursor = \"\";\n\t\t\t});\n\n\t\t\tconst updateLocation = e => {\n\t\t\t\tlet nearPoint = (0,_turf_nearest_point_on_line__WEBPACK_IMPORTED_MODULE_6__.default)(route, Object.values(e.lngLat));\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores_ts__WEBPACK_IMPORTED_MODULE_4__.curTime, $curTime = route.features[0].properties.coordinateProperties.times[nearPoint.properties.index] / 1000, $curTime);\n\t\t\t};\n\n\t\t\tconst onUp = e => {\n\t\t\t\tmapRef.off(\"mousemove\", updateLocation);\n\t\t\t};\n\n\t\t\tmapRef.on(\"mousedown\", \"staticLine\", e => {\n\t\t\t\te.preventDefault();\n\t\t\t\tupdateLocation(e);\n\t\t\t\tmapRef.on(\"mousemove\", updateLocation);\n\t\t\t\tmapRef.once(\"mouseup\", onUp);\n\t\t\t});\n\n\t\t\tmapRef.getSource(\"pointSource\").setData((0,_turf_helpers__WEBPACK_IMPORTED_MODULE_5__.point)(coordinates[0]));\n\t\t});\n\t});\n\n\tfunction div0_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\tcontainer = $$value;\n\t\t\t$$invalidate(0, container);\n\t\t});\n\t}\n\n\t$$self.$$set = $$props => {\n\t\tif (\"gps\" in $$props) $$invalidate(1, gps = $$props.gps);\n\t\tif (\"mapStyle\" in $$props) $$invalidate(2, mapStyle = $$props.mapStyle);\n\t};\n\n\t$$self.$$.update = () => {\n\t\tif ($$self.$$.dirty & /*gps, route, start*/ 26) {\n\t\t\t$: if (gps && typeof route === \"undefined\") {\n\t\t\t\t$$invalidate(3, route = (0,_tmcw_togeojson__WEBPACK_IMPORTED_MODULE_1__.gpx)(new DOMParser().parseFromString(gps, \"text/xml\")));\n\t\t\t\t$$invalidate(4, start = Date.parse(route.features[0].properties.time));\n\t\t\t\t$$invalidate(3, route.features[0].properties.coordinateProperties.times = route.features[0].properties.coordinateProperties.times.map(time => Date.parse(time) - start), route);\n\t\t\t\t$$invalidate(1, gps = JSON.stringify(route));\n\t\t\t}\n\t\t}\n\n\t\tif ($$self.$$.dirty & /*$curTime*/ 32) {\n\t\t\t$: updatePos($curTime * 1000);\n\t\t}\n\t};\n\n\treturn [container, gps, mapStyle, route, start, $curTime, div0_binding];\n}\n\nclass Map extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {\n\tconstructor(options) {\n\t\tsuper();\n\t\tif (!document.getElementById(\"svelte-1032u7r-style\")) add_css();\n\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { gps: 1, mapStyle: 2 });\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);\n\n//# sourceURL=webpack://vanity/./src/Map.svelte?");

/***/ }),

/***/ "./src/Transcript.svelte":
/*!*******************************!*\
  !*** ./src/Transcript.svelte ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ \"./node_modules/svelte/internal/index.mjs\");\n/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! svelte */ \"./node_modules/svelte/index.mjs\");\n/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stores */ \"./src/stores.ts\");\n/* src/Transcript.svelte generated by Svelte v3.38.2 */\n\n\n\n\n\nfunction add_css() {\n\tvar style = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"style\");\n\tstyle.id = \"svelte-1u8roqd-style\";\n\tstyle.textContent = \".transcript_container.svelte-1u8roqd{flex:1000 1000;padding:0.5em;display:block;overflow:auto}.activeLine.svelte-1u8roqd{font-size:1.2em;background-color:yellow}\";\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(document.head, style);\n}\n\nfunction get_each_context(ctx, list, i) {\n\tconst child_ctx = ctx.slice();\n\tchild_ctx[9] = list[i];\n\tchild_ctx[11] = i;\n\treturn child_ctx;\n}\n\n// (54:2) {#if cueData}\nfunction create_if_block(ctx) {\n\tlet each_1_anchor;\n\tlet each_value = /*cueData*/ ctx[0];\n\tlet each_blocks = [];\n\n\tfor (let i = 0; i < each_value.length; i += 1) {\n\t\teach_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));\n\t}\n\n\treturn {\n\t\tc() {\n\t\t\tfor (let i = 0; i < each_blocks.length; i += 1) {\n\t\t\t\teach_blocks[i].c();\n\t\t\t}\n\n\t\t\teach_1_anchor = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.empty)();\n\t\t},\n\t\tm(target, anchor) {\n\t\t\tfor (let i = 0; i < each_blocks.length; i += 1) {\n\t\t\t\teach_blocks[i].m(target, anchor);\n\t\t\t}\n\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, each_1_anchor, anchor);\n\t\t},\n\t\tp(ctx, dirty) {\n\t\t\tif (dirty & /*cueData, currentCue, $curTime, parseFloat, Date*/ 13) {\n\t\t\t\teach_value = /*cueData*/ ctx[0];\n\t\t\t\tlet i;\n\n\t\t\t\tfor (i = 0; i < each_value.length; i += 1) {\n\t\t\t\t\tconst child_ctx = get_each_context(ctx, each_value, i);\n\n\t\t\t\t\tif (each_blocks[i]) {\n\t\t\t\t\t\teach_blocks[i].p(child_ctx, dirty);\n\t\t\t\t\t} else {\n\t\t\t\t\t\teach_blocks[i] = create_each_block(child_ctx);\n\t\t\t\t\t\teach_blocks[i].c();\n\t\t\t\t\t\teach_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tfor (; i < each_blocks.length; i += 1) {\n\t\t\t\t\teach_blocks[i].d(1);\n\t\t\t\t}\n\n\t\t\t\teach_blocks.length = each_value.length;\n\t\t\t}\n\t\t},\n\t\td(detaching) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.destroy_each)(each_blocks, detaching);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(each_1_anchor);\n\t\t}\n\t};\n}\n\n// (55:2) {#each cueData as cue, index}\nfunction create_each_block(ctx) {\n\tlet p;\n\tlet b;\n\tlet t0_value = new Date(/*cue*/ ctx[9].startTime * 1000).toISOString().substr(11, 8) + \"\";\n\tlet t0;\n\tlet t1;\n\tlet t2_value = new Date(/*cue*/ ctx[9].endTime * 1000).toISOString().substr(11, 8) + \"\";\n\tlet t2;\n\tlet t3;\n\tlet t4_value = /*cue*/ ctx[9].text + \"\";\n\tlet t4;\n\tlet t5;\n\tlet p_data_starttime_value;\n\tlet p_data_endtime_value;\n\tlet mounted;\n\tlet dispose;\n\n\treturn {\n\t\tc() {\n\t\t\tp = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"p\");\n\t\t\tb = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"b\");\n\t\t\tt0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t0_value);\n\t\t\tt1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(\"-\");\n\t\t\tt2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t2_value);\n\t\t\tt3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(\": \");\n\t\t\tt4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(t4_value);\n\t\t\tt5 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(\";\\n\\t \");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p, \"data-starttime\", p_data_starttime_value = /*cue*/ ctx[9].startTime);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p, \"data-endtime\", p_data_endtime_value = /*cue*/ ctx[9].endTime);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p, \"class\", \"svelte-1u8roqd\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(p, \"activeLine\", /*index*/ ctx[11] === /*currentCue*/ ctx[2]);\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, p, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p, b);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(b, t0);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(b, t1);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(b, t2);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p, t3);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p, t4);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(p, t5);\n\n\t\t\tif (!mounted) {\n\t\t\t\tdispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(p, \"click\", /*click_handler*/ ctx[6]);\n\t\t\t\tmounted = true;\n\t\t\t}\n\t\t},\n\t\tp(ctx, dirty) {\n\t\t\tif (dirty & /*cueData*/ 1 && t0_value !== (t0_value = new Date(/*cue*/ ctx[9].startTime * 1000).toISOString().substr(11, 8) + \"\")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t0, t0_value);\n\t\t\tif (dirty & /*cueData*/ 1 && t2_value !== (t2_value = new Date(/*cue*/ ctx[9].endTime * 1000).toISOString().substr(11, 8) + \"\")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t2, t2_value);\n\t\t\tif (dirty & /*cueData*/ 1 && t4_value !== (t4_value = /*cue*/ ctx[9].text + \"\")) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t4, t4_value);\n\n\t\t\tif (dirty & /*cueData*/ 1 && p_data_starttime_value !== (p_data_starttime_value = /*cue*/ ctx[9].startTime)) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p, \"data-starttime\", p_data_starttime_value);\n\t\t\t}\n\n\t\t\tif (dirty & /*cueData*/ 1 && p_data_endtime_value !== (p_data_endtime_value = /*cue*/ ctx[9].endTime)) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(p, \"data-endtime\", p_data_endtime_value);\n\t\t\t}\n\n\t\t\tif (dirty & /*currentCue*/ 4) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.toggle_class)(p, \"activeLine\", /*index*/ ctx[11] === /*currentCue*/ ctx[2]);\n\t\t\t}\n\t\t},\n\t\td(detaching) {\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(p);\n\t\t\tmounted = false;\n\t\t\tdispose();\n\t\t}\n\t};\n}\n\nfunction create_fragment(ctx) {\n\tlet div;\n\tlet mounted;\n\tlet dispose;\n\tlet if_block = /*cueData*/ ctx[0] && create_if_block(ctx);\n\n\treturn {\n\t\tc() {\n\t\t\tdiv = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tif (if_block) if_block.c();\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(div, \"class\", \"transcript_container svelte-1u8roqd\");\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div, anchor);\n\t\t\tif (if_block) if_block.m(div, null);\n\t\t\t/*div_binding*/ ctx[7](div);\n\n\t\t\tif (!mounted) {\n\t\t\t\tdispose = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(div, \"mouseup\", /*selection*/ ctx[4]);\n\t\t\t\tmounted = true;\n\t\t\t}\n\t\t},\n\t\tp(ctx, [dirty]) {\n\t\t\tif (/*cueData*/ ctx[0]) {\n\t\t\t\tif (if_block) {\n\t\t\t\t\tif_block.p(ctx, dirty);\n\t\t\t\t} else {\n\t\t\t\t\tif_block = create_if_block(ctx);\n\t\t\t\t\tif_block.c();\n\t\t\t\t\tif_block.m(div, null);\n\t\t\t\t}\n\t\t\t} else if (if_block) {\n\t\t\t\tif_block.d(1);\n\t\t\t\tif_block = null;\n\t\t\t}\n\t\t},\n\t\ti: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\to: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\td(detaching) {\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div);\n\t\t\tif (if_block) if_block.d();\n\t\t\t/*div_binding*/ ctx[7](null);\n\t\t\tmounted = false;\n\t\t\tdispose();\n\t\t}\n\t};\n}\n\nfunction instance($$self, $$props, $$invalidate) {\n\tlet $curKeypoint;\n\tlet $curTime;\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores__WEBPACK_IMPORTED_MODULE_2__.curKeypoint, $$value => $$invalidate(8, $curKeypoint = $$value));\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores__WEBPACK_IMPORTED_MODULE_2__.curTime, $$value => $$invalidate(3, $curTime = $$value));\n\tlet cueData;\n\tlet transcriptBox;\n\tlet currentCue;\n\n\tconst onDataLoad = async cues => {\n\t\t$$invalidate(0, cueData = [...cues]);\n\t\tawait (0,svelte__WEBPACK_IMPORTED_MODULE_1__.tick)();\n\n\t\tcueData.forEach(cue => {\n\t\t\tconst activeNode = transcriptBox.childNodes[cue.id - 1];\n\n\t\t\tcue.onenter = () => {\n\t\t\t\t$$invalidate(2, currentCue = cue.id - 1);\n\t\t\t\tconst middleOffset = transcriptBox.getBoundingClientRect().height / 2;\n\n\t\t\t\ttranscriptBox.scrollTo({\n\t\t\t\t\tleft: 0,\n\t\t\t\t\ttop: activeNode.offsetTop - middleOffset,\n\t\t\t\t\tbehavior: \"smooth\"\n\t\t\t\t});\n\t\t\t};\n\t\t});\n\t};\n\n\tconst selection = e => {\n\t\tif (window.getSelection().toString()) {\n\t\t\tconst selected = window.getSelection();\n\n\t\t\tconst nodes = [\n\t\t\t\tselected.anchorNode.parentNode.closest(\"p\").dataset,\n\t\t\t\tselected.focusNode.parentNode.closest(\"p\").dataset\n\t\t\t];\n\n\t\t\tconst start = Math.min(...nodes.map(node => parseFloat(node.starttime)));\n\t\t\tconst end = Math.max(...nodes.map(node => parseFloat(node.endtime)));\n\t\t\tconsole.log(start, end);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores__WEBPACK_IMPORTED_MODULE_2__.curKeypoint, $curKeypoint.start = start, $curKeypoint);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores__WEBPACK_IMPORTED_MODULE_2__.curKeypoint, $curKeypoint.end = end, $curKeypoint);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores__WEBPACK_IMPORTED_MODULE_2__.curTime, $curTime = start, $curTime);\n\t\t}\n\t};\n\n\tconst click_handler = e => (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores__WEBPACK_IMPORTED_MODULE_2__.curTime, $curTime = parseFloat(e.path[0].dataset.starttime), $curTime);\n\n\tfunction div_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\ttranscriptBox = $$value;\n\t\t\t$$invalidate(1, transcriptBox);\n\t\t});\n\t}\n\n\treturn [\n\t\tcueData,\n\t\ttranscriptBox,\n\t\tcurrentCue,\n\t\t$curTime,\n\t\tselection,\n\t\tonDataLoad,\n\t\tclick_handler,\n\t\tdiv_binding\n\t];\n}\n\nclass Transcript extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {\n\tconstructor(options) {\n\t\tsuper();\n\t\tif (!document.getElementById(\"svelte-1u8roqd-style\")) add_css();\n\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { onDataLoad: 5 });\n\t}\n\n\tget onDataLoad() {\n\t\treturn this.$$.ctx[5];\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Transcript);\n\n//# sourceURL=webpack://vanity/./src/Transcript.svelte?");

/***/ }),

/***/ "./src/WaveSurferControler.svelte":
/*!****************************************!*\
  !*** ./src/WaveSurferControler.svelte ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var svelte_internal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/internal */ \"./node_modules/svelte/internal/index.mjs\");\n/* harmony import */ var _stores__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stores */ \"./src/stores.ts\");\n/* harmony import */ var wavesurfer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! wavesurfer.js */ \"./node_modules/wavesurfer.js/dist/wavesurfer.js\");\n/* harmony import */ var wavesurfer_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(wavesurfer_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var wavesurfer_js_dist_plugin_wavesurfer_cursor_min_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js */ \"./node_modules/wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js\");\n/* harmony import */ var wavesurfer_js_dist_plugin_wavesurfer_cursor_min_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(wavesurfer_js_dist_plugin_wavesurfer_cursor_min_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var wavesurfer_js_dist_plugin_wavesurfer_regions_min_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! wavesurfer.js/dist/plugin/wavesurfer.regions.min.js */ \"./node_modules/wavesurfer.js/dist/plugin/wavesurfer.regions.min.js\");\n/* harmony import */ var wavesurfer_js_dist_plugin_wavesurfer_regions_min_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(wavesurfer_js_dist_plugin_wavesurfer_regions_min_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var svelte__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! svelte */ \"./node_modules/svelte/index.mjs\");\n/* src/WaveSurferControler.svelte generated by Svelte v3.38.2 */\n\n\n\n\n\n// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js';\n\n\n\n\n\nfunction create_fragment(ctx) {\n\tlet div1;\n\tlet div0;\n\tlet t0;\n\tlet input;\n\tlet t1;\n\tlet span;\n\tlet t2;\n\tlet t3;\n\tlet t4;\n\tlet button0;\n\tlet t6;\n\tlet button1;\n\tlet t8;\n\tlet button2;\n\tlet mounted;\n\tlet dispose;\n\n\treturn {\n\t\tc() {\n\t\t\tdiv1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tdiv0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"div\");\n\t\t\tt0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tinput = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"input\");\n\t\t\tt1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tspan = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"span\");\n\t\t\tt2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(\"px/sec: \");\n\t\t\tt3 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.text)(/*sliderVal*/ ctx[4]);\n\t\t\tt4 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tbutton0 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"button\");\n\t\t\tbutton0.textContent = \"here\";\n\t\t\tt6 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tbutton1 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"button\");\n\t\t\tbutton1.textContent = \"reset\";\n\t\t\tt8 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.space)();\n\t\t\tbutton2 = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.element)(\"button\");\n\t\t\tbutton2.textContent = \"vals\";\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(div0, \"position\", \"relative\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, \"type\", \"range\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, \"min\", \"0\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.attr)(input, \"max\", \"500\");\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_style)(input, \"width\", \"100%\");\n\t\t},\n\t\tm(target, anchor) {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, div1, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, div0);\n\t\t\t/*div0_binding*/ ctx[7](div0);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t0);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, input);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*sliderVal*/ ctx[4]);\n\t\t\t/*input_binding*/ ctx[10](input);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, t1);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(div1, span);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span, t2);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.append)(span, t3);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t4, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, button0, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t6, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, button1, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, t8, anchor);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.insert)(target, button2, anchor);\n\n\t\t\tif (!mounted) {\n\t\t\t\tdispose = [\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input, \"mouseup\", /*mouseup_handler*/ ctx[8]),\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input, \"change\", /*input_change_input_handler*/ ctx[9]),\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(input, \"input\", /*input_change_input_handler*/ ctx[9]),\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button0, \"click\", /*click_handler*/ ctx[11]),\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button1, \"click\", /*click_handler_1*/ ctx[12]),\n\t\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.listen)(button2, \"click\", /*click_handler_2*/ ctx[13])\n\t\t\t\t];\n\n\t\t\t\tmounted = true;\n\t\t\t}\n\t\t},\n\t\tp(ctx, [dirty]) {\n\t\t\tif (dirty & /*sliderVal*/ 16) {\n\t\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_input_value)(input, /*sliderVal*/ ctx[4]);\n\t\t\t}\n\n\t\t\tif (dirty & /*sliderVal*/ 16) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_data)(t3, /*sliderVal*/ ctx[4]);\n\t\t},\n\t\ti: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\to: svelte_internal__WEBPACK_IMPORTED_MODULE_0__.noop,\n\t\td(detaching) {\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(div1);\n\t\t\t/*div0_binding*/ ctx[7](null);\n\t\t\t/*input_binding*/ ctx[10](null);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t4);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(button0);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t6);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(button1);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(t8);\n\t\t\tif (detaching) (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.detach)(button2);\n\t\t\tmounted = false;\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.run_all)(dispose);\n\t\t}\n\t};\n}\n\nfunction instance($$self, $$props, $$invalidate) {\n\tlet $curKeypoint;\n\tlet $keypointDefined;\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores__WEBPACK_IMPORTED_MODULE_1__.curKeypoint, $$value => $$invalidate(6, $curKeypoint = $$value));\n\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.component_subscribe)($$self, _stores__WEBPACK_IMPORTED_MODULE_1__.keypointDefined, $$value => $$invalidate(1, $keypointDefined = $$value));\n\tlet wavesurfer;\n\tlet waveform;\n\tlet vid;\n\tlet timeline;\n\tlet slider;\n\tlet sliderVal = 1;\n\n\tconst onDataLoad = async viddata => {\n\t\tvid = viddata;\n\t\twavesurfer.load(vid);\n\t};\n\n\tconsole.log(_stores__WEBPACK_IMPORTED_MODULE_1__.curKeypoint);\n\tconsole.log($curKeypoint);\n\n\t// $: if(wavesurfer && !$keypointDefined.start){\n\t// \t\tconsole.log('here')\n\t// \t\tconsole.log($curKeypoint)\n\t// let r  = wavesurfer.addRegion({start: $curKeypoint.start,\n\t// \t\t\t\t  end: $curKeypoint.end})\n\t// console.log(r)\n\t// \t}\n\t(0,svelte__WEBPACK_IMPORTED_MODULE_5__.onMount)(async () => {\n\t\t$$invalidate(0, wavesurfer = wavesurfer_js__WEBPACK_IMPORTED_MODULE_2___default().create({\n\t\t\tcontainer: waveform,\n\t\t\twaveColor: \"#76a9fa\",\n\t\t\tprogressColor: \"#1e429f\",\n\t\t\tcursorColor: \"#1e429f\",\n\t\t\theight: 50,\n\t\t\tresponsive: true,\n\t\t\tnormalize: true,\n\t\t\tbackend: \"MediaElement\",\n\t\t\tpartialRender: true,\n\t\t\tzoomDebounce: 100,\n\t\t\tplugins: [\n\t\t\t\twavesurfer_js_dist_plugin_wavesurfer_cursor_min_js__WEBPACK_IMPORTED_MODULE_3___default().create({\n\t\t\t\t\tshowTime: true,\n\t\t\t\t\topacity: 1,\n\t\t\t\t\tcustomShowTimeStyle: {\n\t\t\t\t\t\t\"background-color\": \"#000\",\n\t\t\t\t\t\tcolor: \"#fff\",\n\t\t\t\t\t\tpadding: \"2px\",\n\t\t\t\t\t\t\"font-size\": \"10px\"\n\t\t\t\t\t}\n\t\t\t\t}),\n\t\t\t\twavesurfer_js_dist_plugin_wavesurfer_regions_min_js__WEBPACK_IMPORTED_MODULE_4___default().create({ dragSelection: true })\n\t\t\t]\n\t\t}));\n\n\t\twavesurfer.on(\"loading\", e => {\n\t\t\tconsole.log(e);\n\t\t});\n\n\t\twavesurfer.on(\"waveform-ready\", () => {\n\t\t\tconsole.log(\"ready\");\n\t\t\t$$invalidate(4, sliderVal = 1);\n\n\t\t\t// slider.min= wavesurfer.params.minPxPerSec;\n\t\t\twavesurfer.zoom(sliderVal);\n\t\t});\n\n\t\twavesurfer.on(\"error\", err => {\n\t\t\tconsole.log(err);\n\t\t});\n\n\t\twavesurfer.on(\"region-click\", (region, e) => {\n\t\t\tif (e.shiftKey) {\n\t\t\t\t// region.play();\n\t\t\t\te.stopPropagation();\n\t\t\t}\n\t\t});\n\n\t\twavesurfer.on(\"region-updated\", region => {\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores__WEBPACK_IMPORTED_MODULE_1__.curKeypoint, $curKeypoint.start = region.start, $curKeypoint);\n\t\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.set_store_value)(_stores__WEBPACK_IMPORTED_MODULE_1__.curKeypoint, $curKeypoint.end = region.end, $curKeypoint);\n\t\t});\n\t});\n\n\tfunction div0_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\twaveform = $$value;\n\t\t\t$$invalidate(2, waveform);\n\t\t});\n\t}\n\n\tconst mouseup_handler = () => wavesurfer.zoom(sliderVal);\n\n\tfunction input_change_input_handler() {\n\t\tsliderVal = (0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.to_number)(this.value);\n\t\t$$invalidate(4, sliderVal);\n\t}\n\n\tfunction input_binding($$value) {\n\t\tsvelte_internal__WEBPACK_IMPORTED_MODULE_0__.binding_callbacks[$$value ? \"unshift\" : \"push\"](() => {\n\t\t\tslider = $$value;\n\t\t\t$$invalidate(3, slider);\n\t\t});\n\t}\n\n\tconst click_handler = () => {\n\t\tconsole.log($keypointDefined);\n\t};\n\n\tconst click_handler_1 = () => {\n\t\t_stores__WEBPACK_IMPORTED_MODULE_1__.curKeypoint.resetKeypoint();\n\t};\n\n\tconst click_handler_2 = () => {\n\t\tconsole.log(wavesurfer.regions);\n\t};\n\n\t$$self.$$.update = () => {\n\t\tif ($$self.$$.dirty & /*$curKeypoint, $keypointDefined*/ 66) {\n\t\t\t$: console.log($curKeypoint, $keypointDefined.end);\n\t\t}\n\n\t\tif ($$self.$$.dirty & /*wavesurfer, $curKeypoint*/ 65) {\n\t\t\t$: if (wavesurfer && !wavesurfer.regions && _stores__WEBPACK_IMPORTED_MODULE_1__.keypointDefined.start) {\n\t\t\t\tconsole.log(wavesurfer.regions.list);\n\n\t\t\t\tlet r = wavesurfer.addRegion({\n\t\t\t\t\tstart: $curKeypoint.start,\n\t\t\t\t\tend: $curKeypoint.end\n\t\t\t\t});\n\n\t\t\t\tconsole.log(r);\n\t\t\t}\n\t\t}\n\t};\n\n\treturn [\n\t\twavesurfer,\n\t\t$keypointDefined,\n\t\twaveform,\n\t\tslider,\n\t\tsliderVal,\n\t\tonDataLoad,\n\t\t$curKeypoint,\n\t\tdiv0_binding,\n\t\tmouseup_handler,\n\t\tinput_change_input_handler,\n\t\tinput_binding,\n\t\tclick_handler,\n\t\tclick_handler_1,\n\t\tclick_handler_2\n\t];\n}\n\nclass WaveSurferControler extends svelte_internal__WEBPACK_IMPORTED_MODULE_0__.SvelteComponent {\n\tconstructor(options) {\n\t\tsuper();\n\t\t(0,svelte_internal__WEBPACK_IMPORTED_MODULE_0__.init)(this, options, instance, create_fragment, svelte_internal__WEBPACK_IMPORTED_MODULE_0__.safe_not_equal, { onDataLoad: 5 });\n\t}\n\n\tget onDataLoad() {\n\t\treturn this.$$.ctx[5];\n\t}\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaveSurferControler);\n\n//# sourceURL=webpack://vanity/./src/WaveSurferControler.svelte?");

        var node = this.data,
            toBBox = this.toBBox;

        if (!intersects(bbox, node)) return false;

        var nodesToSearch = [],
            i, len, child, childBBox;

        while (node) {
            for (i = 0, len = node.children.length; i < len; i++) {

                child = node.children[i];
                childBBox = node.leaf ? toBBox(child) : child;

                if (intersects(bbox, childBBox)) {
                    if (node.leaf || contains(bbox, childBBox)) return true;
                    nodesToSearch.push(child);
                }
            }
            node = nodesToSearch.pop();
        }

        return false;
    },

    load: function (data) {
        if (!(data && data.length)) return this;

        if (data.length < this._minEntries) {
            for (var i = 0, len = data.length; i < len; i++) {
                this.insert(data[i]);
            }
            return this;
        }

        // recursively build the tree with the given data from scratch using OMT algorithm
        var node = this._build(data.slice(), 0, data.length - 1, 0);

        if (!this.data.children.length) {
            // save as is if tree is empty
            this.data = node;

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _App_svelte__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.svelte */ \"./src/App.svelte\");\n\nclass MockModel {\n    set() { }\n    undo() { }\n    // https://github.com/cabreraalex/widget-svelte-cookiecutter/pull/7/commits/a63f0151b198b86c7a4a9c533f4cb22a03b65f54\n    get(name) {\n        if (name === 'src') {\n            return './GMT20201216-141014_Interview-_640x360.8cc97a33.mp4';\n        }\n        else if (name === 'gps') {\n            return './16-Dec-2020-0945.gpx';\n        }\n        else if (name == 'transcript') {\n            return './GMT20201216-141014_Interview-.transcript.vtt';\n        }\n    }\n    on(variableName, callback, context) { }\n    save_changes() { }\n}\nconst app = new _App_svelte__WEBPACK_IMPORTED_MODULE_0__.default({\n    target: document.body,\n    props: {\n        model: new MockModel(),\n    },\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n\n//# sourceURL=webpack://vanity/./src/mock.ts?");

        } else {
            if (this.data.height < node.height) {
                // swap trees if inserted one is bigger
                var tmpNode = this.data;
                this.data = node;
                node = tmpNode;
            }

            // insert the small tree into the large tree at appropriate level
            this._insert(node, this.data.height - node.height - 1, true);
        }

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"curKeypoint\": () => (/* binding */ curKeypoint),\n/* harmony export */   \"keypointDefined\": () => (/* binding */ keypointDefined),\n/* harmony export */   \"createValue\": () => (/* binding */ createValue),\n/* harmony export */   \"curTime\": () => (/* binding */ curTime)\n/* harmony export */ });\n/* harmony import */ var svelte_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! svelte/store */ \"./node_modules/svelte/store/index.mjs\");\n\nfunction Keypoint(src = '', author = '') {\n    const store = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)({ src, author, start: null, end: null, tags: [], comments: null });\n    return {\n        set: store.set,\n        subscribe: store.subscribe,\n        resetKeypoint: () => {\n            store.update((state) => {\n                state.start = null;\n                state.end = null;\n                state.tags = [];\n                state.comments = null;\n                return state;\n            });\n        },\n        getValues: () => { return (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.get)(store); }, //i can delete this?\n    };\n}\nconst curKeypoint = Keypoint();\nconst keypointDefined = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.derived)(curKeypoint, ($curKeypoint) => {\n    return { start: ($curKeypoint.start || $curKeypoint.start === 0) ? true : false,\n        end: ($curKeypoint.end || $curKeypoint.end === 0) ? true : false,\n        full: ($curKeypoint.start || $curKeypoint.start === 0) && ($curKeypoint.end || $curKeypoint.end === 0) ? true : false\n    };\n});\nfunction createValue(model, name_, value_) {\n    const name = name_;\n    // const curVal: Writable<any> = writable(value_);\n    const modelValue = model.get(name);\n    // https://github.com/cabreraalex/widget-svelte-cookiecutter/pull/7/commits/a63f0151b198b86c7a4a9c533f4cb22a03b65f54\n    const curVal = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(modelValue === undefined ? value_ : modelValue);\n    model.on('change:' + name, () => curVal.set(model.get(name)), null);\n    return {\n        set: (v) => {\n            curVal.set(v);\n            model.set(name, v);\n            model.save_changes();\n        },\n        subscribe: curVal.subscribe,\n        update: (func) => {\n            curVal.update((v) => {\n                const out = func(v);\n                model.set(name, out);\n                model.save_changes();\n                return out;\n            });\n        },\n    };\n}\nconst curTime = (0,svelte_store__WEBPACK_IMPORTED_MODULE_0__.writable)(0);\n\n\n//# sourceURL=webpack://vanity/./src/stores.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/mock.ts");
/******/ 	
/******/ })()
;
