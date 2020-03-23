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
        src: '',
        value: 0.0
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
        vid1.src= this.model.get('src');
        vid1.controls =false;
        ms.add(vid1);

        var vid2 = document.createElement("video");
        vid2.width =400;
        vid2.src= this.model.get('src');
        vid2.controls =false;
        ms.add(vid2)
        
        content.appendChild(vid1);
        content.appendChild(document.createElement('br'));
        content.appendChild(vid2)

        var controls =document.createElement("div");
        controls.id ='controlpanel'

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

        pos= document.createElement('p')
        pos.innerText = "Position: ";
        var posTime = document.createElement('span');
        posTime.innerText = "0.0"
        pos.appendChild(posTime)
        controls.appendChild(pos);

        ms.to.on("timeupdate", function () {
            var curPos= ms.to.query().position;
            console.log(curPos);

          // posTime.innerHTML = curPos
          // seeker.value = curPos
        });

        play.onclick= function() {ms.play()};
        pause.onclick= function() {ms.pause()};
        speedup.onclick = function() {ms.to.update({velocity:3.0})};
        speednormal.onclick = function() {ms.to.update({velocity:1.0});}





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
