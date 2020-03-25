'use strict';

var createControls = function (ms) {
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


    play.onclick= () => ms.play();
    pause.onclick= () => ms.pause();
    speedup.onclick = () => ms.to.update({velocity:3.0});
    speednormal.onclick = () => ms.to.update({velocity:1.0});

    return controls;
};


var createFormInput = function(name, options){
	let label = Object.assign(document.createElement('label'), {innerText: name + " "});
	let input = Object.assign(document.createElement('input'), options);
	label.appendChild(input)
	return label;
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
	Keypoint: Keypoint
};

module.exports = util;