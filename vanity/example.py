#!/usr/bin/env python
# coding: utf-8

# Copyright (c) ilan.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""

from ipywidgets import DOMWidget
from traitlets import Integer, Unicode, Float, List, observe
from ._frontend import module_name, module_version
from pathlib import Path
import pandas as pd


# todo: take in df, check cols, types, tidy, and null issues. add random ID (python_alksfjao131) if not given
def pandas_validator(df):

    cols = ['start', 'end', 'type', 'value', 'author', 'src']
    for col in cols:
        if col not in df.columns: raise ValueError(f"missing {col} in dataframe columns")

    return df

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
    _keypoints = List([]).tag(sync=True)
    test=Integer(0).tag(sync=True)
    @observe('_keypoints')
    def _observe_keypoints(self, change):
        self.df= pd.DataFrame(self._keypoints)

    # duration = Float(0).tag(sync=True)

    def __init__(self, 
                 src, 
                 author=None,
                 gps=None, 
                 map_style=None,
                 transcript=None,
                 transcript_lang='en',
                 tags = [],
                 views = [],
                 df = None,
                 # duration=None
                 ):
        
        super().__init__()

        self.src = src
        self.tags = tags
        self.views = views
        # self._keypoints=[]
        # self.on_msg(self._handle_keypoint_click)

        
        if gps is not None:
            self.gps = gps
            # with open(gps, 'r') as inf:
            #     self.gps= inf.read()

        if map_style is not None:
            self.map_style = map_style

        if transcript is not None:
            self.transcript=transcript
            self.transcript_lang=transcript_lang

        if author is not None:
            self.author = author

        if df is not None:
            if isinstance(df, pd.DataFrame):
                df = pandas_validator(df)
            else:
                try:
                    df_path = Path(df)
                    if df_path.suffix == 'csv':
                        self.df = pandas_validator(pd.read_csv(df_path))
                    elif df_path.suffix == 'json':
                        with open(df, 'r') as kp:
                            self.df = pandas_validator(kp)
                except Exception as e:
                    print('df must be a Pandas DataFrame, a path to a csv, or a path to a JSON file')
                    raise e
            self._keypoints.extend(self.df.to_dict(orient='records'))
        else:
            self.df = pd.DataFrame(columns=['id','start', 'end', 'type', 'value', 'author', 'src'])


    def update_dataframe(self, new_df):
        self.df = pandas_validator(new_df)
        self._keypoints = self.df.to_dict(orient='records')
        self.send({"method": "custom", "type": "keypoints_updated"})

    # def _handle_keypoint_click(self, _, content, buffers):
    #     self.v=(_, content, buffers)
    #     if content.get('event', '') == 'click':
    #         print(_, content, buffers)


