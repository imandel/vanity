# vanity

A Custom Jupyter Widget Library

## Installation

You can install using `pip`:

```bash
pip install vanity
```

Or if you use jupyterlab:

```bash
pip install vanity
jupyter labextension install @jupyter-widgets/jupyterlab-manager
```

If you are using Jupyter Notebook 5.2 or earlier, you may also need to enable
the nbextension:

```bash
jupyter nbextension enable --py [--sys-prefix|--user|--system] vanity
```

## Development Installation

```bash
# First install the python package. This will also build the JS packages.
pip install -e .
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension install @jupyter-widgets/jupyterlab-manager --no-build
jupyter labextension install .
```

For classic notebook, you can run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py vanity
jupyter nbextension enable --sys-prefix --py vanity
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

### How to see your changes

#### Typescript:

To continuously monitor the project for changes and automatically trigger a rebuild, start Jupyter in watch mode:

```bash
jupyter lab --watch
```

And in a separate session, begin watching the source directory for changes:

```bash
npm run watch
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:

If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

## TODO

[ ] errors on firefox for vtt files 
[ ] pip button? https://svelte.dev/repl/116237b19d094b3f8fd074cee7c00ff1?version=3.38.3
[ ] convert this to svelte https://www.npmjs.com/package/react-annotation-tool
[ ] switch main vid to using a store tather than passing props and events around
[ ] convey when ttranscript is partially selected
[ ] multiple videos
[ ] style wavesurfer px/sec
[ ] key binding for moving around video faster
[ ] dynamic assign color to tags?
[ ] fix responseive top row (e.g. no map, no transcript)
[ ] make divs collasible?
[ ] add and remove tags from ui?
[ ] load in potential tags for review
[ ] format times for either s or hh:mm:ss
[ ] keyboard shprtcuts for timestep?
[ ] region coloring on update bug ugh
