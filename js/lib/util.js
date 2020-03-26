'use strict';

var createDOM = function(that){
	let output = Object.assign(document.createElement("div"), {id:'output', className: 'outputContainer'});
    let content = Object.assign(document.createElement("div"), {id:'content', className: 'mainCol'});
    let data_views_container = Object.assign( document.createElement('div'), {id: 'data_views_container', className: 'sidebar'});
    let annotations = Object.assign( document.createElement('div'), {id: 'annotations', className: 'sidebar'});
    let foot = Object.assign(document.createElement("div"), {id:'foot', className: 'foot'});

    content.appendChild(Object.assign(document.createElement('h4'), {innerText: 'content: '}));
    data_views_container.appendChild(Object.assign(document.createElement('h4'), {innerText: 'data views'}));
    annotations.appendChild(Object.assign(document.createElement('h4'), {innerText: 'annotations'}));

    let data_views = Object.assign(document.createElement('div'), {id: 'data_views', className: 'sidebar'});
    data_views.appendChild(util.createVidDataViews(that.ms, that.model.get("_vids").slice() ));
    data_views_container.appendChild(data_views);

    return [output, content, data_views_container, annotations, foot, data_views];
}

var createControls = function (that) {
	let controls = Object.assign(document.createElement("div"), {id:'controlpanel'});

    controls.appendChild(document.createElement('br'))

    let play = Object.assign(document.createElement('button'), {innerText: 'play'});
    controls.appendChild(play)

    let pause = Object.assign(document.createElement('button'), {innerText: 'pause'});
    controls.appendChild(pause);

    let speedup = Object.assign(document.createElement('button'), {innerText: '2x>>'});
    controls.appendChild(speedup);

    let speednormal = Object.assign(document.createElement('button'), {innerText: '1x>>'});
    controls.appendChild(speednormal);


    play.onclick= () => {that.ms.play(); that.playing = true;}
    pause.onclick= () => {that.ms.pause(); that.playing = false;}
    speedup.onclick = () => that.ms.to.update({velocity:3.0});
    speednormal.onclick = () => that.ms.to.update({velocity:1.0});



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
	    frag.appendChild(document.createElement('br'));
        });
	return frag;
}

let Keypoint = class {
	constructor(start, end, tags, comments){
	this.start = start;
	this.end = end;
	this.tags = tags;
	this.comments = comments;
	}

	reset(){
		this.start = undefined;
		this.end = undefined;
		this.tags = undefined;
		this.comments = undefined;
	}

	get values(){
		return {
			"start": this.start,
			"end": this.end,
			"tags": this.tags,
			"comments": this.comments
		}
	}
}



var util = {
	createFormInput: createFormInput,
	createControls: createControls,
	createVidDataViews: createVidDataViews,
	Keypoint: Keypoint,
	createDOM: createDOM
};

module.exports = util;