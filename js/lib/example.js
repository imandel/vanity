var widgets = require('@jupyter-widgets/base');
var _ = require('lodash');
const MediaSync = require('mediasync').MediaSync

// See example.py for the kernel counterpart to this file.


// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.

// When serialiazing the entire widget state for embedding, only values that
// differ from the defaults will be specified.
var HelloModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'HelloModel',
        _view_name : 'HelloView',
        _model_module : 'vanity',
        _view_module : 'vanity',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        _src: '',
        _value: 0.0,
        _keypoints : [],
        _vids: [],
    })
});


// Custom View. Renders the widget model.
var HelloView = widgets.DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function() {
        const ms= new MediaSync({duration: Infinity});
        // this.value_changed();
        var content = document.createElement("div");
        content.id= "content";
        var vid1 = document.createElement("video");
        vid1.width =400;
        vid1.muted = true;
        vid1.src= this.model.get('_src');
        vid1.controls =false;

        ms.add(vid1);

        var vid2 = document.createElement("video");
        vid2.width =400;
        vid2.muted=true;
        vid2.src= this.model.get('_src');
        vid2.controls =false;
        ms.add(vid2);
        
        content.appendChild(vid1);
        content.appendChild(document.createElement('br'));
        content.appendChild(vid2)
        content.appendChild(document.createElement('br'));


        var vids= this.model.get('_vids').slice()

        vids.forEach((vid_src)=> {
            console.log(vid_src)
            var vid = document.createElement('video');
            vid.width=200;
            vid.muted=true;
            vid.src = vid_src;
            vid.controls = false;
            ms.add(vid);
            content.appendChild(vid)
            content.appendChild(document.createElement('br'));
        });

        var controls =document.createElement("div");
        controls.id ='controlpanel'

        seeker_options={
            type:'range',
            id:'seeker',//document.getElementById('seeker');
            min: 0,
            max: 1000,
            value: 0,
            step: 0.001
        }

        var seeker= Object.assign(document.createElement('input'), seeker_options);
        seeker.style.width="400px";
        seeker.style.margin="5px";
        seeker.id = "seeker";
        controls.appendChild(seeker);
        controls.appendChild(document.createElement('br'))

        var play = document.createElement('button');
        play.innerHTML ='play'
        controls.appendChild(play)
        // var pause = document.getElementById('pause');
        var pause = document.createElement('button');
        pause.innerHTML ='pause';
        controls.appendChild(pause);

        var speedup = document.createElement('button');
        speedup.innerHTML ='2x>>';
        controls.appendChild(speedup);

        var speednormal = document.createElement('button');
        speednormal.innerHTML ='1x>>';
        controls.appendChild(speednormal);

        var marktime = document.createElement('button');
        marktime.innerHTML ='mark key point';
        controls.appendChild(marktime);

        pos= document.createElement('p')
        pos.innerText = "Position: ";
        var posTime = document.createElement('span');
        posTime.innerText = "0.0"
        pos.appendChild(posTime)
        controls.appendChild(pos);

        ms.to.on("timeupdate", function () {
            var curPos= ms.to.query().position;
            posTime.innerHTML = curPos;
            seeker.value = curPos;
        });

        play.onclick= () => ms.play();
        pause.onclick= () => ms.pause();
        speedup.onclick = () => ms.to.update({velocity:3.0});
        speednormal.onclick = () => ms.to.update({velocity:1.0});
        marktime.onclick = () => {
            console.log("this works!")
            var keypoints= this.model.get("_keypoints").slice()
            console.log(keypoints)
            keypoints.push(ms.to.query().position)
            this.model.set({"_keypoints": keypoints});
            this.touch();
        };

        vid1.onloadedmetadata = (event) => {seeker.max = vid1.duration;};

        vid1.onended = (event) => {
            console.log('ended');
            ms.to.update({velocity: 0.0});
        };

        seeker.addEventListener('mouseup', (event) => {
            ms.to.update({position: parseFloat(seeker.value), velocity: 1.0});
        });
        seeker.addEventListener('mousedown', (event) => {
            ms.to.update({velocity: 0.0});
        });
        seeker.addEventListener('input', (event) => {
            posTime.innerHTML = seeker.value;
        });

        this.el.appendChild(content); 
        this.el.appendChild(controls); 

        // Observe changes in the value traitlet in Python, and define
        // a custom callback.
        // this.model.on('change:value', this.value_changed, this);
    },

    // value_changed: function() {
    //     this.el.textContent = this.model.get('value');
    // }
});


module.exports = {
    HelloModel: HelloModel,
    HelloView: HelloView
};
