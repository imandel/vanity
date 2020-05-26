VANITY
===============================

Video Analysis Ipython Toolkit yeah.  

[![forthebadge](https://forthebadge.com/images/badges/gluten-free.svg)](https://forthebadge.com)

Overview
--------

This is a tool to aid in tagging and analyzing video when presented in tandem with multimodal datastreams. 


Installation
------------

<!--To install use pip:

    $ pip install vanity
    $ jupyter nbextension enable --py --sys-prefix vanity


To install for jupyterlab (*not tested in jupyterlab*)

    $ jupyter labextension install vanity
-->
For a development installation (requires npm),

#### Mac or Linux
    $ git clone https://github.com/imandel/vanity.git
    $ cd vanity
    $ cd js
    $ npm install
    $ cd .. 
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix vanity
    $ jupyter nbextension enable --py --sys-prefix vanity

#### Windows
    $ git clone https://github.com/imandel/vanity.git
    $ cd vanity
    $ cd js
    $ npm install
    $ cd .. 
    $ pip install -e .
    $ jupyter nbextension install --py --sys-prefix vanity
    $ jupyter nbextension enable --py --sys-prefix vanity
<!-- $ jupyter labextension install js -->

Development
-----------

* After making Python changes restart notebook kernel to reflect changes
* After making Javascript code changes

#### Mac or Linux
    * `cd js`
    * `npm run watch`
    * refresh browser to reflect changes
* Automate build whenever there are changes in `js/lib/` with `npm run watch &` in `js/`

#### Windows
    * `cd js`
    * `npm run watch_win`
    * refresh browser to reflect changes
* Automate build whenever there are changes in `js/lib/` with `npm run watch_win &` in `js/`

TODO
----

- [x] Get multiple videos synced
- [x] Mark keypoints
- [x] Mark key spans
- [x] Add namespace to keypoints object for collaborative annotation
- [x] Make the UI nice
- [ ] Annotation on a central timeline object
- [ ] Wrap a js plotting library (Highcharts?)
- [ ] allow youtube or vimeo video inputs
- [ ] parse uploaded keypoints and give different authors different colors and update tags
- [ ] allow updated tags.
- [ ] show how much has [loaded](https://stackoverflow.com/questions/5029519/html5-video-percentage-loaded)

David TODO
- [x] half speed playback
- [x] next frame interface
- [ ] fix the memeory leak
- [ ] make disabled until loaded
- [ ] style when set or unset
 

<!-- When actively developing extension, build Jupyter Lab with the command:

    $ jupyter lab --watch

This take a minute or so to get started, but then allows you to hot-reload your javascript extension.
To see a change, save your javascript, watch the terminal for an update.

Note on first `jupyter lab --watch`, you may need to touch a file to get Jupyter Lab to open. -->

