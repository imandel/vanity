# vanity

A Custom Jupyter Widget Library for multi modal analysis of video. *Only tested on chrome/chromium based browsers*

## Requirements

* Node version 15
* Python 3.8


## Development Installation

```bach 
$ git clone git@github.com:imandel/vanity.git

```
Now install the dependencies:
```bash
$ npm i
$ pip install pandas
```

First install the python package. This will also build the JS packages.

```bash
pip install -e .
```
<!-- 
If this fails, you may need to upgrade your version of node. Check your version with `node -v` and ensure it says `v16.5.0` or higher. -->

Enable the extension

```bash
$ jupyter nbextension install --sys-prefix --symlink --overwrite --py vanity
$ jupyter nbextension enable --sys-prefix --py vanity
```

Run these command in **two separate** windows:
```bash
$ npm run watch
```
and the second command:
```bash
$ jupyter notebook
```

Open your browser by clicking the link provided in the jupyter terminal.
Navigate to "examples" and then click the "introduction.ipynp" link.

### Firefox support

There is a weird bug running this app with firefox. 

```
jupyter notebook --generate-config
```
Edit the config file :
```
vi .jupyter/jupyter_notebook_config.py
```
Change "c.NotebookApp.allow_origin" from "" to "*"

See [this issue](https://github.com/jupyter/notebook/issues/5067) for more information: 

### Windows support

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes

#### Java/Typescript:

To continuously monitor the project for changes and automatically trigger a rebuild, start Jupyter in watch mode:

<!-- ```bash
jupyter lab --watch
```

And in a separate session,  -->
begin watching the source directory for changes:

```bash
npm run watch
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:

If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

#### Example File

The [introduction file](./examples/introduction.ipynb) has a test example you should be able to download and get running.

## TODO
### frontend
- [x] end region on region play (shift click) with timingsrc
- [x] jump to next region
- [x] disable editing saved regions without updating backend
- [x] fn keypoint2region & region2keypoint
- [x] hide saved
- [ ] hide/filter by tag, temp, etc
- [ ] better tracking modality for curkeypoint.id
- [ ] additional views css is driving me crazy
- [ ] UX logix for locked tags?
- [x] mute buttons for additional views
- [ ] mute all others
- [x] fix tagbox for timingsrc
- [x] errors on firefox for vtt files 
- [x] keyboard shprtcuts for timestep
- [x] key binding for moving around video faster
- [ ] switch main vid to using a store tather than passing props and events around?
- [ ] convey when transcript is partially selected
- [x] multiple videos
- [x] style wavesurfer px/sec
- [x] add review points to datatable
- [ ] popup for shorcuts?
- [ ] dynamic assign color to tags?
- [x] fix responseive top row (e.g. no map, no transcript)
- [x] make divs collasible?
- [x] add and remove tags from ui?
- [x] load in potential tags for review
- [x] format times for either s or hh:mm:ss
- [ ] use pandas traittypes https://github.com/jupyter-widgets/traittypes
- [x] pip button? https://svelte.dev/repl/116237b19d094b3f8fd074cee7c00ff1?version=3.38.3
- [ ] convert this to svelte https://www.npmjs.com/package/react-annotation-tool
- [ ] updates from cookiecutter with cruft https://github.com/cruft/cruft
- [ ] stores pollute global namespace, multiple widgets conflict
- [ ] fork wavesurfer and use timingsrc?
- [ ] better datatable? https://vincjo.fr/svelte-simple-datatables/#/
- [ ] user prefs in localstore?
- [ ] collapse cols in datatable

### backend
- [x] python-validator for df
