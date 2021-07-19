#!/usr/bin/env python
# coding: utf-8

# Copyright (c) ilan.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Integer, Unicode, Float, List
from ._frontend import module_name, module_version
from pathlib import Path

class MapView(DOMWidget):
    """TODO: Add docstring here
    """
    _model_name = Unicode('ExampleModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _view_name = Unicode('ExampleView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)

    src = Unicode("").tag(sync=True)
    gps = Unicode("").tag(sync=True)
    map_style = Unicode("").tag(sync=True)
    transcript = Unicode("").tag(sync=True)
    transcript_lang = Unicode("").tag(sync=True)
    tags = List([]).tag(sync=True)
    views = List([]).tag(sync=True)
    author = Unicode("").tag(sync=True)
    
    # duration = Float(0).tag(sync=True)

    def __init__(self, 
                 src, 
                 author=None,
                 gps=None, 
                 map_style=None,
                 transcript=None,
                 transcript_lang='en',
                 tags = [],
                 views = []
                 # duration=None
                 ):
        super().__init__()

        self.src = src
        self.tags = tags
        self.views = views
        
        if gps is not None:
            with open(gps, 'r') as inf:
                self.gps= inf.read()

        if map_style is not None:
            self.map_style = map_style

        if transcript is not None:
            self.transcript=transcript
            self.transcript_lang=transcript_lang

        if author is not None:
            self.author = author
