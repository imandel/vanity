const noUiSlider = require('nouislider');
const wNumb = require('wnumb');

const createDOM = function (that) {
  const output = Object.assign(document.createElement('div'), { id: 'output', className: 'outputContainer' });
  const content = Object.assign(document.createElement('div'), { id: 'content' });
  const vid_container = Object.assign(document.createElement('div'), { id: 'vid_container', className: 'srcVid' });
  const data_views_container = Object.assign(document.createElement('div'), { id: 'data_views_container', className: 'sidebar' });
  const annotations_container = Object.assign(document.createElement('div'), { id: 'annotations_container', className: 'mainCol' });

  const annotations = Object.assign(document.createElement('div'), { id: 'annotations', className: 'scrollbox' });
  that.annotations = annotations;
  annotations.appendChild(loadKeypoints(that.model.get('keypoints'), that));
  const foot = Object.assign(document.createElement('div'), { id: 'foot', className: 'foot' });

  data_views_container.appendChild(Object.assign(document.createElement('h4'), { innerText: 'data views' }));
  annotations_container.appendChild(Object.assign(document.createElement('h4'), { innerText: 'annotations' }));

  annotations_container.appendChild(annotations);


  const data_views = Object.assign(document.createElement('div'), { id: 'data_views' });
  data_views.appendChild(createVidDataViews(that.ms, that.model.get('vids').slice()));
  data_views_container.appendChild(data_views);

  that.data_views = data_views;

  output.appendChild(vid_container);

  vid_container.appendChild(Object.assign(document.createElement('h4'), { innerText: 'content: ' }).appendChild(Object.assign(document.createElement('span'), { innerText: that.model.get('src'), id: 'title' })).parentNode);
  const controls = vid_container.appendChild(createControls(that));
  const mainVid = vid_container.appendChild(Object.assign(document.createElement('video'), { id: 'mainVid', controls: false, src: that.model.get('src') }));
  that.mainVid = mainVid;
  that.ms.add(mainVid);

  if (that.model.get('vids').slice().length === 0) {
    vid_container.style.width = '65%';
    vid_container.style.margin = '0 auto';
    output.style.backgroundColor = '#cbe4cb';

  } else {
    vid_container.style.width = '50%';
    output.appendChild(data_views_container);
  }

  const tagbox = createTagbox(that);
  foot.appendChild(tagbox);
  foot.appendChild(annotations_container);

  vid_container.appendChild(controls);

  that.el.appendChild(output);
  that.el.appendChild(foot);
};

const createControls = function (that) {
  // strange behavior without this function but should look into timingsrc for
  const _setspeed = function (val) {
    that.ms.to.update({ velocity: 1 });
    setTimeout(() => { that.ms.to.update({ velocity: val }); }, 1);
  };

  const controls = Object.assign(document.createElement('div'), { id: 'controlpanel', className:'disabledpanel' });

  const slider = controls.appendChild(Object.assign(document.createElement('div'), { id: 'nouiSlider' }));
  that.slider = slider;
  noUiSlider.create(that.slider, {
    start: [0, 0],
    behaviour: 'drag-unconstrained',
    connect: true,
    animate: false,
    range: {
      min: 0,
      max: 1000,
    },
    format: wNumb({
      decimals: 3,
    }),
  });

  that.slider.noUiSlider.on('start', () => {
    that.ms.to.update({ velocity: 0 });
  });
  that.slider.noUiSlider.on('end', (values) => {
    that.ms.to.update({ velocity: that.state.playing ? that.speed : 0, position: parseFloat(values[1])});

  });

  that.slider.noUiSlider.on('slide', (values, handle, unencoded) => {
    if (!that.curKeypoint.start && !that.curKeypoint.end) {
      if (values[1] !== values[0]) {
        that.slider.noUiSlider.set([values[1], null]);
        that.ms.to.update({ position: parseFloat(values[1]) });
      }
    } else if (that.curKeypoint.start && !that.curKeypoint.end) {
      that.curKeypoint.start = values[0];
      that.tagbox.start.input.value = values[0];
    } else if (that.curKeypoint.start && that.curKeypoint.end) {
      that.curKeypoint.start = values[0];
      that.tagbox.start.input.value = values[0];
      that.curKeypoint.end = values[1];
      that.tagbox.end.input.value = values[1];
    }
  });

  // debug



  that.ms.to.on('timeupdate', () => {
    const curPos = that.ms.to.query().position;
    that.time.innerHTML = curPos.toFixed(3);
    // seeker.value = curPos;
    slider.noUiSlider.set([that.curKeypoint.start || curPos, that.curKeypoint.end || curPos]);
    if (!that.curKeypoint.start) {
      that.tagbox.start.input.placeholder = curPos.toFixed(3);
    } else if (that.curKeypoint.start && !that.curKeypoint.end) {
      that.tagbox.end.input.placeholder = curPos.toFixed(3);
    }
  });




  const playPause = controls.appendChild(Object.assign(document.createElement('button'), { innerText: '▶️', className: 'controlButton', title: 'play' }));
  const rewind = controls.appendChild(Object.assign(document.createElement('button'), { innerText: ' ↺ 5s', className: 'controlButton', title: 'rewind five seconds' }));
  const prevFrame = controls.appendChild(Object.assign(document.createElement('button'), { innerText: '<', className: 'controlButton', title: 'previous frame' }));
  const nextFrame = controls.appendChild(Object.assign(document.createElement('button'), { innerText: '>', className: 'controlButton', title: 'next frame' }));
  const startover = controls.appendChild(Object.assign(document.createElement('button'), { innerText: '◼', className: 'controlButton', title: 'start from beginning' }));


  const handler = {
    set(target, key, value) {
      console.log(`Setting value ${key} as ${value}`);
      if (key === 'playing') {
        if (value === true) {
          playPause.innerText = '⏸';
          _setspeed(that.speed);
        } else {
          playPause.innerText = '▶️';
          that.ms.to.update({ velocity: 0.0 });
        }
        target[key] = value;
      }
    },
    get(target, key) {
      return target[key];
    },
  };
  that.state = new Proxy({}, handler);
  that.state.playing = false;

  rewind.onclick = () => { that.ms.to.update({ position: that.ms.to.pos - 5.0 }); };
  prevFrame.onclick = () => { that.ms.to.update({ position: that.ms.to.pos - (1 / 24) }); };
  nextFrame.onclick = () => { that.ms.to.update({ position: that.ms.to.pos + (1 / 24) }); };
  startover.onclick = () => { that.ms.to.update({ position: 0.0 }); that.state.playing = false; };
  const speedList = controls.appendChild(Object.assign(document.createElement('datalist'), { id: 'speedlist' }));
  const speeds = [0.25, 0.5, 1, 1.5, 2];
  speeds.forEach((speedVal) => {
    speedList.appendChild(Object.assign(document.createElement('option'), { value: speedVal }));
  });

  const speedInput = controls.appendChild(Object.assign(document.createElement('input'), {
    type: 'range', min: speeds[0], max: speeds[speeds.length - 1], step: 0.05, value: 1, className: 'speedRange', id: 'speedRange',
  }));
  speedInput.setAttribute('list', 'speedlist');

  const speedOut = controls.appendChild(Object.assign(document.createElement('output'), { for: 'speedRange', innerHTML: '1', id: 'outputnum' }));

  speedInput.onchange = () => {
    const closest = getClosest(speeds, speedInput.value);
    speedInput.value = closest;
    that.speed = closest;
    speedOut.value = closest;
    if (that.state.playing) {
      _setspeed(closest);
    }
  };

  playPause.onclick = () => {
    that.state.playing = !that.state.playing;
    // if (!that.state.playing) {
    //   _setspeed(that.speed);
    //   playPause.innerText = '⏸';
    //   that.state.playing = true;
    // } else {
    //   that.ms.to.update({ velocity: 0.0 });
    //   that.state.playing = false;
    //   playPause.innerText = '▶️';
    // }
  };

  controls.appendChild(Object.assign(document.createElement('p'), { innerText: 'Time: ', id: 'pos', style: 'display:block' }).appendChild(that.time).parentNode);

  return controls;
};


const createFormInput = function (name, options) {
  const label = Object.assign(document.createElement('label'), { innerText: `${name} ` });
  const input = Object.assign(document.createElement('input'), options);
  label.appendChild(input);
  return label;
};

const insertAfter = function (newNode, prevSibling) {
  prevSibling.after(newNode);
  return newNode;
};

const createTagbox = function (that) {
  const tagDiv = Object.assign(document.createElement('div'), { id: 'tagbox' });
  const form = tagDiv.appendChild(document.createElement('form'));
  const keyStartForm = form.appendChild(createFormInput('Start:', {
    type: 'number', id: 'key_start', step: 'any', className: 'numberInput',
  }));
  const keyEndForm = form.appendChild(createFormInput('End:', {
    type: 'number', id: 'key_end', step: 'any', className: 'numberInput',
  }));

  const tagbox = {
    start: {
      input: keyStartForm.firstElementChild,
      button: insertAfter(Object.assign(document.createElement('button'), { id: 'set_start', innerHTML: 'Set', className: 'tagButton' }), keyStartForm),
    },
    end: {
      input: keyEndForm.firstElementChild,
      button: insertAfter(Object.assign(document.createElement('button'), { id: 'set_end', innerHTML: 'Set', className: 'tagButton', disabled: true }), keyEndForm),
    },
    marktime: Object.assign(document.createElement('button'), { innerHTML: 'Add Note', type: 'submit', id: 'addnotebutton' }),
    tags_container: Object.assign(document.createElement('div'), { id: 'tags_container' }),
    comments: Object.assign(document.createElement('label'), { innerText: 'Comments\n' }).appendChild(Object.assign(document.createElement('textarea'), { id: 'comments', rows: 3 })),
  };

  tagbox.end.button.after(tagbox.marktime);
  tagbox.marktime.after(tagbox.tags_container);
  tagbox.tags_container.after(tagbox.comments);

  that.model.get('tags').slice().forEach((tag) => {
    const tagcheck = createFormInput(tag, { value: tag, type: 'checkbox' });
    tagcheck.className = 'tagCheck';
    tagbox.tags_container.appendChild(tagcheck);
  });

  tagbox.start.button.onclick = () => {
    if (!that.curKeypoint.start) {
      const curPos = that.ms.to.query().position;
      tagbox.end.button.disabled = false;
      if (tagbox.start.input.value === '') {
        that.curKeypoint.start = curPos;
        tagbox.start.input.value = curPos.toFixed(3);
      } else {
        that.curKeypoint.start = parseFloat(tagbox.start.input.value);
      }
      document.querySelector('#nouiSlider > div > div:nth-child(2) > div').style.pointerEvents = 'auto';
    } else {
      tagbox.end.button.disabled = true;
      that.curKeypoint.start = undefined;
      tagbox.start.input.value = '';
      tagbox.end.input.placeholder = '';
      document.querySelector('#nouiSlider > div > div:nth-child(2) > div').style.pointerEvents = 'none';
    }
  };

  tagbox.end.button.onclick = () => {
    const curPos = that.ms.to.query().position;
    if (!that.curKeypoint.end) {
      if (tagbox.end.input.value === '') {
        that.curKeypoint.end = curPos;
        tagbox.end.input.value = curPos.toFixed(3);
        that.state.playing = false;
        // that.ms.to.update({ velocity: 0 });
      } else {
        that.curKeypoint.end = parseFloat(tagbox.end.input.value);
      }
    } else {
      that.curKeypoint.end = undefined;
      tagbox.end.input.value = '';
      tagbox.end.input.placeholder = '';
      that.ms.to.update({ velocity: that.state.playing ? that.speed : 0, position: parseFloat(values[1])});

    }
  };

  $("#set_start").click(function () {
    var startclick = document.getElementById("set_start")
    if (startclick.classList.contains("tb-clicked")) {
        $('#set_start').removeClass("tb-clicked")
    }
    else {
        $('#set_start').addClass("tb-clicked")
        // $('#set_start').innerHTML("Unset")
    }
});

$("#set_end").click(function () {
    var endclick = document.getElementById("set_end")
    if (endclick.classList.contains("tb-clicked")) {
        $('#set_end').removeClass("tb-clicked")
    }
    else {
        $('#set_end').addClass("tb-clicked")
        // $('#set_end').innerHTML("Unset")
    }
});


  form.onsubmit = () => false;


  tagbox.marktime.onclick = () => {
    const curPos = that.ms.to.query().position;
    const tempKeypoints = that.model.get('keypoints').slice();
    that.curKeypoint.start = parseFloat(tagbox.start.input.value) || curPos;
    that.curKeypoint.end = parseFloat(tagbox.end.input.value) || curPos;
    that.curKeypoint.comments = tagbox.comments.value;
    that.curKeypoint.tags = Array.from(tagbox.tags_container.getElementsByTagName('input')).filter((n) => n.checked).map((m) => m.value);
    that.annotations.insertBefore(
      clickableKeypoint(that.curKeypoint, that),
      that.annotations.firstChild,
    );
    tempKeypoints.push(that.curKeypoint.values);
    that.model.set({ keypoints: tempKeypoints });
    that.touch();
    that.curKeypoint.reset();
    form.reset();
    tagbox.end.input.placeholder = '';
    that.annotations.scrollTop = 0;
    that.send({ event: 'click' });
    document.querySelector('#nouiSlider > div > div:nth-child(2) > div').style.pointerEvents = 'none';
  };

  that.tagbox = tagbox;
  return tagDiv;
};

const createVidDataViews = function (ms, vids) {
  const frag = document.createDocumentFragment();
  vids.forEach((vid_src) => {
    const vid = Object.assign(document.createElement('video'), {
      className: 'dataView', muted: true, controls: false, src: vid_src, className: 'dataView', style: 'width: 60%;',
    });
    ms.add(vid);
    frag.appendChild(vid);
    // frag.appendChild(document.createElement('br'));
  });

  return frag;
};

const Keypoint = class {
  constructor(key_src, author, start, end, tags, comments) {
    this.start = start;
    this.end = end;
    this.tags = tags;
    this.comments = comments;
    this.src = key_src;
    this.author = author;
  }

  reset() {
    this.start = undefined;
    this.end = undefined;
    this.tags = undefined;
    this.comments = undefined;
    // this.src = undefined;
  }

  get values() {
    return {
      src: this.src,
      start: this.start,
      end: this.end,
      tags: this.tags,
      comments: this.comments,
      author: this.author,

    };
  }
};

const loadKeypoints = function (keypoints, that) {
  const frag = document.createDocumentFragment();
  const src = that.model.get('src');
  keypoints.filter((n) => n.src == src).forEach((keypoint) => {
    frag.insertBefore(util.clickableKeypoint(keypoint, that), frag.firstChild);
  });
  return frag;
};

const clickableKeypoint = function (keypoint, that) {
  const { start } = keypoint;
  const keyP = Object.assign(document.createElement('p'), { className: 'note', title: keypoint.author|| "no author"});
  keyP.innerText = `start: ${keypoint.start.toFixed(2)}, comments: ${keypoint.comments}, tags: ${keypoint.tags.toString()}`;
  keyP.onclick = () => { that.ms.seek(start); };
  return keyP;
};

function getClosest(arr, val) {
  return arr.reduce((prev, curr) => (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev));
}


const util = {
  createFormInput,
  createControls,
  createVidDataViews,
  Keypoint,
  createDOM,
  loadKeypoints,
  clickableKeypoint,
};

module.exports = util;
