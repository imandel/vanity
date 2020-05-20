import noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';

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
        src: '',
        keypoints : [],
        vids: [],
        tags: []
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
        this.speed = 1.0;

        let curKeypoint= new util.Keypoint(key_src= this.model.get('src'), author=this.model.get('author'));
        this.curKeypoint = curKeypoint


        // DOM generation
        let [output, vid_container, data_views_container, annotations, foot, data_views, content, tagbox] = util.createDOM(this);

        this.data_views = data_views;
        this.annotations= annotations;
        
        let vid1 = Object.assign(document.createElement("video"), {id: "mainVid", controls: false, src: this.model.get('src')});
        this.vid1= vid1
        ms.add(vid1);
        content.appendChild(vid1);
       
        let controls = util.createControls(this);//Object.assign(document.createElement("div"), {id:'controlpanel'});
        content.appendChild(controls);

        let pos = Object.assign(document.createElement('p'), {innerText:'time: ', id: 'pos', style: "display:inline"})
        pos.appendChild(this.time)
        controls.appendChild(pos);


        let seeker= Object.assign(document.createElement('input'), {type:'range', id:'seeker', min: 0, max: 1000, value: 0, step: 0.001});
        this.seeker = seeker
        seeker.addEventListener('mouseup', () => {ms.to.update({position: parseFloat(seeker.value), velocity: (this.playing ? this.speed : 0.0)});});
        seeker.addEventListener('mousedown', () => {ms.to.update({velocity: 0.0});});
        seeker.addEventListener('input', () => {this.time.innerHTML = seeker.value;});
        controls.insertBefore(seeker, controls.firstChild);


        noUiSlider.create(slider, {
            start: [20, 80],
            connect: true,
            range: {
                'min': 0,
                'max': 100
            }
        });



        ms.to.on("timeupdate", ()=> {
            let curPos= ms.to.query().position;
            this.time.innerHTML = curPos.toFixed(3);
            seeker.value = curPos;
            if(!curKeypoint.start){
                key_start.firstElementChild.placeholder = curPos.toFixed(3)
            }
            else if(curKeypoint.start && !curKeypoint.end){
                key_end.firstElementChild.placeholder = curPos.toFixed(3)
            }
        });
       
        vid1.onloadedmetadata = () => {
            seeker.max = vid1.duration;
            document.getElementById('title').innerText=this.model.get('src')};

        vid1.onended = () => {ms.to.update({velocity: 0.0});};



        let form = document.createElement('form');
        let key_start = util.createFormInput('start', {type: 'number', id: 'key_start', step:'any', className:'numberInput'});
        form.appendChild(key_start);
        let setStart = Object.assign(document.createElement('button'), { id: 'set_start', innerHTML: "set", className:'tagButton'});
        setStart.onclick = () => {
            let curPos = ms.to.query().position;
            let startval= key_start.firstElementChild

            if (startval.value == ""){
                curKeypoint.start = curPos;
                startval.value = curPos.toFixed(3);
            }
            else {
                curKeypoint.start=parseFloat(startval.value)
            }
        }
        form.appendChild(setStart);
        // form.appendChild(document.createElement('br'))
        let key_end= util.createFormInput('end', {type: 'number', id: 'key_end', step:'any', className:'numberInput'})
        form.appendChild(key_end);
        let setEnd = Object.assign(document.createElement('button'), { id: 'set_end', innerHTML: "set", className:'tagButton'});
        setEnd.onclick = () => {
            let curPos = ms.to.query().position;
            let endval= key_end.firstElementChild

            if (endval.value == ""){
                curKeypoint.end = curPos;
                endval.value = curPos.toFixed(3);
            }
            else {
                curKeypoint.end=parseFloat(endval.value)
            }
        }

        form.appendChild(setEnd);

        form.onsubmit = () => {return false}

        let marktime = Object.assign(document.createElement('button'), {innerHTML: 'Add note', type: "submit"});
        form.appendChild(marktime);

        marktime.onclick = () => {
            let curPos = ms.to.query().position
            let temp_keypoints= this.model.get("keypoints").slice()
            curKeypoint.start = !key_start.firstElementChild.value ? curPos : parseFloat(key_start.firstElementChild.value)
            curKeypoint.end = !key_end.firstElementChild.value ? curPos : parseFloat(key_end.firstElementChild.value)
            curKeypoint.comments= comments.value
            curKeypoint.tags = Array.from(tags_container.getElementsByTagName('input')).filter(n => n.checked).map(m => m.value)
            annotations.insertBefore(util.clickableKeypoint(curKeypoint, this), annotations.firstChild);
            temp_keypoints.push(curKeypoint.values)
            this.model.set({"keypoints": temp_keypoints});
            this.touch();
            curKeypoint.reset();
            form.reset();
            key_end.firstElementChild.placeholder = "";
            annotations.scrollTop = 0;
            this.send({event: 'click'});
        };


        let tags_container = Object.assign(document.createElement('div'), {id: 'tags_container'});
        let tags= this.model.get("tags").slice();
        tags.forEach((tag)=>{
            let tagcheck = util.createFormInput(tag, {value: tag, type: 'checkbox'})
            tagcheck.className= 'tagCheck'
            tags_container.appendChild(tagcheck);
        })

        form.appendChild(tags_container);
        tagbox.appendChild(form);

        let comments = Object.assign(document.createElement('label'), {innerText: "Comments\n"}).appendChild(
            Object.assign(document.createElement('textarea'), {id: 'comments',rows:3}));

        form.appendChild(comments)
        form.appendChild(document.createElement('br'));

        annotations.appendChild(util.loadKeypoints(this.model.get('keypoints'), this))

        
        this.el.appendChild(output); 
        this.el.appendChild(foot)

        this.model.on("change:vids", this.data_views_changed, this);
        this.model.on("change:src", this.src_changed, this);
        this.model.on("change:keypoints", this.keypoints_changed, this)

        //Debug
        window.that=this;
    },

    data_views_changed: function() {
        console.log('changed data view')
        let element = this.data_views
            while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        this.data_views.appendChild(util.createVidDataViews(this.ms, this.model.get("vids").slice()));
        this.annotations.appendChild(util.loadKeypoints(this.model.get('keypoints'), this))
    },

    src_changed: function() {
        console.log('src_changed');
        this.vid1.pause();
        this.vid1.src ='';
        this.vid1.load();
        this.vid1.src =this.model.get('src');
        this.ms.to.update({position: 0.0});
        while (this.data_views.firstChild) {
            this.data_views.removeChild(this.data_views.firstChild);
        }
        this.annotations.appendChild(util.loadKeypoints(this.model.get('keypoints'), this))
        this.curKeypoint.src= this.model.get('src');
    },

    keypoints_changed: function(){
        // console.log('keypoints changed')
        while (this.annotations.firstChild) {
            this.annotations.removeChild(this.annotations.firstChild);
        }
        this.annotations.appendChild(util.loadKeypoints(this.model.get('keypoints'), this))
    }

});


module.exports = {
    MultiviewModel: MultiviewModel,
    MultiviewView: MultiviewView
};
