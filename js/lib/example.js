let widgets = require('@jupyter-widgets/base');
let _ = require('lodash');
const MediaSync = require('mediasync').MediaSync
let util=require('./util');
require('./style.css')

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
let MultiviewModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
        _model_name : 'MultiviewModel',
        _view_name : 'MultiviewView',
        _model_module : 'vanity',
        _view_module : 'vanity',
        _model_module_version : '0.1.0',
        _view_module_version : '0.1.0',
        _src: '',
        _value: 'Hello World',
        _keypoints : [],
        _vids: [],
        _tags: []
    })
});


// Custom View. Renders the widget model.
let MultiviewView = widgets.DOMWidgetView.extend({
    // Defines how the widget gets rendered into the DOM
    render: function() {

        // Sync and annotation utilitites 
        const ms= new MediaSync({duration: Infinity});
        this.ms=ms;
        this.time= Object.assign(document.createElement('span'), {innerText: '0.0', id:'posTime'});
        this.playing = false;

        let curKeypoint= new util.Keypoint();

        // DOM generation
        let [output, vid_container, data_views_container, annotations, foot, data_views, content, tagbox] = util.createDOM(this);

        this.data_views = data_views;
        
        let vid1 = Object.assign(document.createElement("video"), {id: "mainVid", muted: true, controls: false, src:this.model.get('_src')});
        
        ms.add(vid1);
        content.appendChild(vid1);
       
        let controls =  util.createControls(this);//Object.assign(document.createElement("div"), {id:'controlpanel'});
        
   
        content.appendChild(controls);

        let pos = Object.assign(document.createElement('p'), {innerText:'time: ', id: 'pos', style: "display:inline"})
        pos.appendChild(this.time)
        controls.appendChild(pos);

        // let pos = Object.assign(document.createElement('p'), {innerText:'time: '})
        // document.getElementById('pos').appendChild(this.time);
        // controls.insertBefore(pos, controls.firstChild);

        let seeker= Object.assign(document.createElement('input'), {type:'range', id:'seeker', min: 0, max: 1000, value: 0, step: 0.001});
        seeker.addEventListener('mouseup', (event) => {ms.to.update({position: parseFloat(seeker.value), velocity: (this.playing ? 1.0 : 0.0)});});
        seeker.addEventListener('mousedown', (event) => {ms.to.update({velocity: 0.0});});
        seeker.addEventListener('input', (event) => {this.time.innerHTML = seeker.value;});
        controls.insertBefore(seeker, controls.firstChild);



        ms.to.on("timeupdate", ()=> {
            let curPos= ms.to.query().position;
            this.time.innerHTML = curPos.toFixed(3);
            seeker.value = curPos;
            if(!curKeypoint.start){
                document.getElementById('key_start').placeholder = curPos.toFixed(3)
            }
            else if(curKeypoint.start && !curKeypoint.end){
                document.getElementById('key_end').placeholder = curPos.toFixed(3)
            }
        });
       
        vid1.onloadedmetadata = (event) => {seeker.max = vid1.duration;};

        vid1.onended = (event) => {ms.to.update({velocity: 0.0});};



        let form = document.createElement('form');
        let key_start = util.createFormInput('start', {type: 'number', id: 'key_start', step:'any', className:'numberInput'});
        form.appendChild(key_start);
        let setStart = Object.assign(document.createElement('button'), { id: 'set_start', innerHTML: "set"});
        setStart.onclick = () => {
            let curPos = ms.to.query().position;
            let startval= document.getElementById('key_start')

            if (startval.value == ""){
                curKeypoint.start = curPos;
                startval.value = curPos.toFixed(3);
            }
            else {
                curKeypoint.start=startval.value
            }
            console.log(curKeypoint)
        }
        form.appendChild(setStart);
        // form.appendChild(document.createElement('br'))

        form.appendChild(util.createFormInput('end', {type: 'number', id: 'key_end', step:'any', className:'numberInput'}));
        let setEnd = Object.assign(document.createElement('button'), { id: 'set_end', innerHTML: "set"});
        setEnd.onclick = () => {
            let curPos = ms.to.query().position;
            let endval= document.getElementById('key_end')

            if (endval.value == ""){
                curKeypoint.end = curPos;
                endval.value = curPos.toFixed(3);
            }
            else {
                curKeypoint.end=endval.value
            }
            console.log(curKeypoint)
        }

        form.appendChild(setEnd);

        form.onsubmit = () => {return false}

        let marktime = document.createElement('button');
        marktime.innerHTML ='Add note';
        form.appendChild(marktime);

        marktime.onclick = () => {
            let keypoints= this.model.get("_keypoints").slice()
            console.log(keypoints)
            keypoints.push(
                {
                    "start": ms.to.query().position,
                    "end": 100,
                    "comments": "hello"
                });
            this.model.set({"_keypoints": keypoints});
            this.touch();
        };


        let tags_container = document.createElement('div');
        let tags= this.model.get("_tags").slice();
        tags.forEach((tag)=>{
            tags_container.appendChild(util.createFormInput(tag, {value: tag, type: 'checkbox'}));
            // tags_container.appendChild(document.createElement('br'));
        })

        form.appendChild(tags_container);

        
        tagbox.appendChild(form);

        let comments = Object.assign(document.createElement('label'), {innerText: "Comments\n"}).appendChild(
            Object.assign(document.createElement('textarea'), {id: 'comments',rows:3}));

        form.appendChild(comments)
        form.appendChild(document.createElement('br'));

        //debug
        for (let step = 0; step < 15; step++) {
            annotations.appendChild(Object.assign(document.createElement('p'), {innerText: "Hello"}));
        }

        

        // foot.appendChild(annotations)




        
        this.el.appendChild(output); 
        this.el.appendChild(foot)

        this.model.on("change:_vids", this.data_views_changed, this);

        //Debug
        window.that=this;
    },

    data_views_changed: function() {
        console.log('changed data view')
        let element = this.data_views
            while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

        this.data_views.appendChild(util.createVidDataViews(this.ms, this.model.get("_vids").slice()));
    }
});


module.exports = {
    MultiviewModel: MultiviewModel,
    MultiviewView: MultiviewView
};
