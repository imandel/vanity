VANITY
===============================

Video Analysis Ipython Toolkit yeah

Overview
--------

This is a tool to aid in tagging and analyzing video when presented in tandem with multimodal datastreams. 


Installation
------------

To install use pip:

    $ pip install vanity
    $ jupyter nbextension enable --py --sys-prefix vanity


To install for jupyterlab (*not tested in jupyterlab*)

    $ jupyter labextension install vanity

For a development installation (requires npm),

    $ git clone https://github.com/cornell/VANITY.git
    $ cd VANITY
    $ cd js
    $ npm install
    $ cd .. 
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix vanity
    $ jupyter nbextension enable --py --sys-prefix vanity
<!-- $ jupyter labextension install js -->

Development
-----------

* After making Python changes restart notebook kernel to reflect changes
* After making Javascript code changes
    * `cd js`
    * `npm run build`
    * refresh browser to reflect changes
* Automate build whenever there are changes in `js/lib/` with `npm run watch &` in `js/`

TODO
----

- [ ] Get multiple videos synced
- [ ] annotation on a central timeline object

 

<!-- When actively developing extension, build Jupyter Lab with the command:

    $ jupyter lab --watch

This take a minute or so to get started, but then allows you to hot-reload your javascript extension.
To see a change, save your javascript, watch the terminal for an update.

Note on first `jupyter lab --watch`, you may need to touch a file to get Jupyter Lab to open. -->


