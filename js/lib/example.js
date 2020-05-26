const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
const { MediaSync } = require('mediasync');
const util = require('./util');
const noUiSlider = require('nouislider');
require('nouislider/distribute/nouislider.css');
require('./style.css');

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

const MultiviewModel = widgets.DOMWidgetModel.extend({
  defaults: _.extend(widgets.DOMWidgetModel.prototype.defaults(), {
    _model_name: 'MultiviewModel',
    _view_name: 'MultiviewView',
    _model_module: 'vanity',
    _view_module: 'vanity',
    _model_module_version: '0.1.0',
    _view_module_version: '0.1.0',
    src: '',
    keypoints: [],
    vids: [],
    tags: [],
  }),
});


// Custom View. Renders the widget model.
const MultiviewView = widgets.DOMWidgetView.extend({
  // Defines how the widget gets rendered into the DOM
  render() {
    // Sync and annotation utilitites
    const ms = new MediaSync({ duration: Infinity });
    this.ms = ms;
    this.time = Object.assign(document.createElement('span'), { innerText: '0.0', id: 'posTime' });
    this.speed = 1.0;

    const curKeypoint = new util.Keypoint(key_src = this.model.get('src'), author = this.model.get('author'));
    this.curKeypoint = curKeypoint;


    // DOM generation
    util.createDOM(this);


    this.mainVid.onloadedmetadata = () => {
      // seeker.max = this.mainVid.duration;
      document.getElementById('title').innerText = this.model.get('src');
      slider = document.getElementById('nouiSlider');

      slider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: this.mainVid.duration,
        },
      });
    };

    this.mainVid.onended = () => { ms.to.update({ velocity: 0.0 }); };

    this.model.on('change:vids', this.data_views_changed, this);
    this.model.on('change:src', this.src_changed, this);
    this.model.on('change:keypoints', this.keypoints_changed, this);

    // Debug
    window.that = this;
  },

  data_views_changed() {
    console.log('changed data view');
    const element = this.data_views;
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    this.data_views.appendChild(util.createVidDataViews(this.ms, this.model.get('vids').slice()));
    this.annotations.appendChild(util.loadKeypoints(this.model.get('keypoints'), this));
  },

  src_changed() {
    console.log('src_changed');
    this.this.mainVid.pause();
    this.this.mainVid.src = '';
    this.this.mainVid.load();
    this.this.mainVid.src = this.model.get('src');
    this.ms.to.update({ position: 0.0 });
    while (this.data_views.firstChild) {
      this.data_views.removeChild(this.data_views.firstChild);
    }
    this.annotations.appendChild(util.loadKeypoints(this.model.get('keypoints'), this));
    this.curKeypoint.src = this.model.get('src');
  },

  keypoints_changed() {
    // console.log('keypoints changed')
    while (this.annotations.firstChild) {
      this.annotations.removeChild(this.annotations.firstChild);
    }
    this.annotations.appendChild(util.loadKeypoints(this.model.get('keypoints'), this));
  },

});


module.exports = {
  MultiviewModel,
  MultiviewView,
};
