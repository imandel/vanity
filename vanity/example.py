import ipywidgets as widgets
from traitlets import Unicode, Float, List, observe
from pathlib import Path
import pandas as pd

# See js/lib/example.js for the frontend counterpart to this file.

@widgets.register
class Multiview(widgets.DOMWidget):
    """An example widget."""

    # Name of the widget view class in front-end
    _view_name = Unicode('MultiviewView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('MultiviewModel').tag(sync=True)

    # Name of the front-end module containing widget view
    _view_module = Unicode('vanity').tag(sync=True)

    # Name of the front-end module containing widget model
    _model_module = Unicode('vanity').tag(sync=True)

    # Version of the front-end module containing widget view
    _view_module_version = Unicode('^0.1.0').tag(sync=True)
    # Version of the front-end module containing widget model
    _model_module_version = Unicode('^0.1.0').tag(sync=True)

    # Widget specific property.
    # Widget properties are defined as traitlets. Any property tagged with `sync=True`
    # is automatically synced to the frontend *any* time it changes in Python.
    # It is synced back to Python from the frontend *any* time the model is touched.
    _value = Unicode("Hello WOrld").tag(sync=True)
    _src= Unicode("").tag(sync=True)
    _vids = List([]).tag(sync=True)
    _keypoints = List([]).tag(sync=True)
    _tags = List([]).tag(sync=True)

    @observe('_keypoints')
    def _observe_keys(self, change):
        # print(change['old'])
        # print(change['new'])
        self.df= pd.DataFrame(self._keypoints)
        # pd.DataFrame(a._keypoints)
        if self.callbackArgs is not None:
            if type(self.callbackArgs) is list:
                self.callback(*self.callbackArgs)
            if type(self.callbackArgs) is dict:
                self.callback(**self.callbackArgs)
        else:
            self.callback()

        # return "thingy"

    def __init__(self, _src, _vids=None, _tags=None, _keypoints= None, callback=None, callbackArgs=None, **kwargs):
        super().__init__(**kwargs)
        self._src=_src
        self.df = pd.DataFrame()

        if _vids is not None:
            self._vids=_vids

        if _tags is not None:
            self._tags=_tags

        if _keypoints is not None:
            self._keypoints=_keypoints
            self.df.append(_keypoints)

        if callback is not None:
            self.callback= callback
            self.callbackArgs=callbackArgs

