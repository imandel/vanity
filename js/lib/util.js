'use strict';

var createDOM = function(that){
    let output = Object.assign(document.createElement("div"), {id:'output', className: 'outputContainer'});
    let content = Object.assign(document.createElement("div"), {id:'content'});
    let vid_container= Object.assign( document.createElement('div'), {id: 'vid_container', className: 'srcVid'});
    let data_views_container = Object.assign( document.createElement('div'), {id: 'data_views_container', className: 'sidebar'});
    let annotations_container = Object.assign( document.createElement('div'), {id: 'annotations_container', className: 'mainCol'});
    let annotations = Object.assign( document.createElement('div'), {id: 'annotations', className: 'scrollbox'});
    let foot = Object.assign(document.createElement("div"), {id:'foot', className: 'foot'});

    let titleblock=Object.assign(document.createElement('h4'), {innerText: 'content: '});
    titleblock.appendChild(Object.assign(document.createElement('span'), {innerText: that.model.get('src'), id:'title'}));
    vid_container.appendChild(titleblock);
    vid_container.appendChild(content)
    
    data_views_container.appendChild(Object.assign(document.createElement('h4'), {innerText: 'data views'}));
    annotations_container.appendChild(Object.assign(document.createElement('h4'), {innerText: 'annotations'}));

    annotations_container.appendChild(annotations)

    let data_views = Object.assign(document.createElement('div'), {id: 'data_views'});
    data_views.appendChild(util.createVidDataViews(that.ms, that.model.get("vids").slice() ));
    data_views_container.appendChild(data_views);

    // content.appendChild(controls);
    output.appendChild(vid_container);
    if(that.model.get("vids").slice().length===0){
        vid_container.style.width = "100%";

    }
    else{
         vid_container.style.width = "50%";
         output.appendChild(data_views_container);
    }
    
    // output.appendChild(annotations);

    let tagbox = Object.assign(document.createElement('div'), {id: 'tagbox'});
    foot.appendChild(tagbox);
    foot.appendChild(annotations_container)

    return [output, vid_container, data_views_container, annotations, foot, data_views, content, tagbox];
}

var createControls = function (that) {

    // strange behavior without this function but should look into timingsrc for
    const _setspeed = function(val){
        that.ms.to.update({velocity: 1})
        setTimeout(() => {that.ms.to.update({velocity: val})}, 1)
    }

    const controls = Object.assign(document.createElement("div"), {id:'controlpanel'});

    const nouislider = Object.assign(document.createElement('div'), {id:'nouiSlider'})
    controls.appendChild(nouislider)
    //const pause = Object.assign(document.createElement('button'), {innerText: 'Pause', className: 'controlButton'});
    //controls.appendChild(pause);

    const playPause = Object.assign(document.createElement('button'), {innerText: '▶️', className: 'controlButton', title: 'play'});
    controls.appendChild(playPause)
    const rewind = Object.assign(document.createElement('button'), {innerText: ' ↺ 5s', className: 'controlButton', title: 'rewind five seconds'});
	controls.appendChild(rewind);
    const prevFrame = Object.assign(document.createElement('button'), {innerText: '<', className: 'controlButton', title: 'previous frame'});
    controls.appendChild(prevFrame);
    const nextFrame = Object.assign(document.createElement('button'), {innerText: '>', className: 'controlButton', title: 'next frame'});
    controls.appendChild(nextFrame);
	
	const startover = Object.assign(document.createElement('button'), {innerText: 'Start Over', className: 'controlButton', title: 'start from beginning'});
	controls.appendChild(startover);

    const speedList = Object.assign(document.createElement('datalist'), {id:'speedlist'});
    const speeds=[0.25, 0.5, 1, 1.5, 2];
    speeds.forEach((speedVal) => {
        speedList.appendChild(Object.assign(document.createElement('option'), {value: speedVal}))
    })
    controls.appendChild(speedList)
    const speedInput = Object.assign(document.createElement('input'), {type: 'range',  min: speeds[0], max: speeds[speeds.length-1], step: 0.05, value: 1, className:'speedRange',id:'speedRange', style: 'width: 20%;' })
    speedInput.setAttribute('list', 'speedlist')
    controls.appendChild(speedInput);
    const speedOut = Object.assign(document.createElement('output'), {for:'speedRange', innerHTML:'1'})
    controls.appendChild(speedOut)
    speedInput.onchange = () => {
         let closest = getClosest(speeds, speedInput.value);
         speedInput.value=closest;
         that.speed = closest;
         speedOut.value= closest;
         if(that.playing){
            _setspeed(closest)
         } 
    }

    //pause.onclick= () => {that.ms.to.update({velocity: 0.0}); that.playing = false;}
    //play.onclick= () => {_setspeed(that.speed); that.playing = true;}
	playPause.onclick = () => {
		if(!that.playing){
		_setspeed(that.speed);
		playPause.innerText = "⏸"; 
		that.playing = true;
		} else {
		that.ms.to.update({velocity: 0.0}); 
		that.playing = false;
		playPause.innerText = "▶️";
		}
	}
	rewind.onclick = () => {that.ms.to.update({position: that.ms.to.pos - 5.0});}
    prevFrame.onclick = () => {that.ms.to.update({position: that.ms.to.pos - (1/24)});}
    nextFrame.onclick = () => {that.ms.to.update({position: that.ms.to.pos + (1/24)});}
	startover.onclick = () => {that.ms.to.update({velocity: 0.0, position: 0.0});}





    return controls;
};


var createFormInput = function(name, options){
    let label = Object.assign(document.createElement('label'), {innerText: name + " "});
    let input = Object.assign(document.createElement('input'), options);
    label.appendChild(input)
    return label;
}

var createVidDataViews = function(ms, vids){
    var frag = document.createDocumentFragment()
    vids.forEach( (vid_src) => {
        var vid = Object.assign( document.createElement('video'), {className: "dataView", muted: true, controls: false, src: vid_src, className: 'dataView'});
        ms.add(vid);
        frag.appendChild(vid)
        // frag.appendChild(document.createElement('br'));
        });
    return frag;
}

let Keypoint = class {
    constructor(key_src, author, start, end, tags, comments){
    this.start = start;
    this.end = end;
    this.tags = tags;
    this.comments = comments;
    this.src = key_src
    this.author=author
    }

    reset(){
        this.start = undefined;
        this.end = undefined;
        this.tags = undefined;
        this.comments = undefined;
        // this.src = undefined;
    }

    get values(){
        return {
            "src": this.src,
            "start": this.start,
            "end": this.end,
            "tags": this.tags,
            "comments": this.comments,
            "author": this.author

        }
    }
}

let loadKeypoints = function(keypoints, that){
    let frag = document.createDocumentFragment();
    let src = that.model.get('src');
    keypoints.filter(n => n.src==src).forEach((keypoint)=> {
        frag.insertBefore(util.clickableKeypoint(keypoint, that), frag.firstChild);
    })
    return frag;
}

let clickableKeypoint = function(keypoint, that){
    let start =keypoint.start
    let keyP = Object.assign(document.createElement('p'), {className:"note"})
    keyP.innerText="Start: "+ keypoint.start.toFixed(2) + ", comments: "+ keypoint.comments + ", tags: "+ keypoint.tags.toString();
    keyP.onclick = () => {that.ms.seek(start)}; 
    return keyP;
}

function getClosest(arr, val) {
    return arr.reduce(function (prev, curr) {
    return (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
  });
}


var util = {
    createFormInput: createFormInput,
    createControls: createControls,
    createVidDataViews: createVidDataViews,
    Keypoint: Keypoint,
    createDOM: createDOM,
    loadKeypoints: loadKeypoints,
    clickableKeypoint: clickableKeypoint
};

module.exports = util;
