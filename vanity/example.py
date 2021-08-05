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
from warnings import warn
import pandas as pd
import json


# todo: take in df, check cols, types, tidy, and null issues. add random ID (python_alksfjao131) if not given
def pandas_validator(df, src):

    optional_cols = ['author', 'src']
    if 'author' not in df.columns:
        warn(f'Author not specified. Marking author as "unknown".')
        df['author'] = 'unknown'

    if 'src' not in df.columns:
        warn(f'Source not specified. Saving with value from inputs: {src}')
        df['src'] = src

    cols = ['start', 'end', 'type', 'value', 'id']
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
    review =  List([]).tag(sync=True)
    _keypoints = List([]).tag(sync=True)
    @observe('_keypoints')
    def _observe_keypoints(self, change):
        self.df= pd.DataFrame(self._keypoints)
        if self.update_callback:
            self.update_callback(change, *self.args, **self.kwargs)
        if self._out_file:
            if '.csv' in self._out_file.suffix:
                self.df.to_csv(self._out_file, index=False)
            elif  '.json' in self._out_file.suffix:
                self.df.to_json(self._out_file, orient='records')

    def _handle_custom_msg(self, content, buffers):
        if content['event'] == 'map_loaded':
            if not self.save_tempfiles:
                tempPath = Path(content['value'])
                tempPath.unlink()

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
                 data = None,
                 save_tempfiles = False,
                 update_callback= None,
                 autosave = False,
                 review =None,
                 *args,
                 **kwargs
                 ):
        
        super().__init__()
        self.on_msg(self._handle_custom_msg)


        self.src = src
        self.tags = tags
        self.views = views
        self.save_tempfiles = save_tempfiles
        self.update_callback=update_callback
        self.args=args
        self.kwargs=kwargs
        self.df = pd.DataFrame(columns=['id','start', 'end', 'type', 'value', 'author', 'src'])
        self._out_file = False

        if data is not None:
            self.data = data
        if gps is not None:
            if type(gps) == str:
                self.gps = gps
            elif type(gps) == dict:
                self.gps = self._data_df_2_geojson(gps)

        if map_style is not None:
            self.map_style = map_style

        if transcript is not None:
            self.transcript=transcript
            self.transcript_lang=transcript_lang

        if author is not None:
            self.author = author

        if df is not None:
            if isinstance(df, pd.DataFrame):
                self.df = pandas_validator(df, self.src)
            elif Path(df).is_file():
                df_path = Path(df)
                if  '.csv' in df_path.suffix:
                    self.df = pandas_validator(pd.read_csv(df_path, na_values=['nan'], keep_default_na=False), self.src)
                elif '.json' in df_path.suffix:
                    self.df = pandas_validator(pd.read_json(df_path), self.src)
            self._keypoints= self.df.to_dict(orient='records')
        else:
            self._keypoints = []


        if autosave:
            if autosave == True:
                self._out_file = Path('./keypoints.json')
            else:
                self._out_file = Path(autosave)
            if self._out_file.is_file():
                if df and self._out_file != Path(df):
                    warn(f"autosave file already exits and will be overwritten. This warning can be supressed by setting df=\'{self._out_file}\' or autosave=\'{df}\'",stacklevel=2)
                if not df:
                    warn(f"autosave file already exits and will be overwritten. This warning can be supressed by setting df=\'{self._out_file}\'",stacklevel=2)
                # if self._out_file.suffix == '.csv':
                #     temp_df = pd.read_csv(self._out_file, na_values=['nan'], keep_default_na=False)
                # elif self._out_file.suffix == '.json':
                #     temp_df = pd.read_json(self._out_file)
                # self.update_dataframe(temp_df)

        if review is not None:
            if isinstance(review, pd.DataFrame):
                self.review = pandas_validator(review, self.src)
            elif Path(review).is_file():
                review_path = Path(review)
                if  '.csv' in review_path.suffix:
                    self.review = pandas_validator(pd.read_csv(review_path, na_values=['nan'], keep_default_na=False), self.src).to_dict(orient='records')
                elif '.json' in review_path.suffix:
                    self.review = pandas_validator(pd.read_json(review_path), self.src).to_dict(orient='records')



    def update_dataframe(self, new_df):
        self.df = pandas_validator(new_df, self.src)
        self._keypoints = self.df.to_dict(orient='records')
        self.kp = self.df.to_dict(orient='records')
        self.send({"method": "custom", "type": "keypoints_updated"})

    def _data_df_2_geojson(self, column_dict):
        wide = self.data.pivot(index='timestamp', columns='variable', values='value').reset_index()
        geojson = {'type': 'FeatureCollection',
                    'features': [{'type': 'Feature',
                                   'properties': {'time': 0, 'coordinateProperties': {'times': wide['timestamp'].tolist()}},
                                    'geometry': {'type': 'LineString', 'coordinates': wide[[column_dict['lng'], column_dict['lat']]].values.tolist()}}]}
        temp_file = './temp_gps.geojson'
        with open(temp_file, 'w') as of:
            json.dump(geojson, of)
            self.temp_gps_path = temp_file
        return self.temp_gps_path




    # def _handle_keypoint_click(self, _, content, buffers):
    #     self.v=(_, content, buffers)
    #     if content.get('event', '') == 'click':
    #         print(_, content, buffers)


