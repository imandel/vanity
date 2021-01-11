import ipywidgets as widgets
from traitlets import Unicode, Float, List, observe
from pathlib import Path
import pandas as pd

# See js/lib/example.js for the frontend counterpart to this file.

@widgets.register
class Multiview(widgets.DOMWidget):
    '''
    This is a multiviewer for watching and tagging videos while viewing synced video data.

    Parameters
    ----------

    src : `str`
        String with path to the main video file to display. This is required.
    vids : `list` [`str`]
        A list of paths to videos to display in sync with src
    tags : `list` [`str`]
        A list of tags to apply to video notes
    subtitles : `str`
        String with Path to subtitles
    keypoints : `list` [`dict`]
        An optional list of keypoint dictionaries with keys:
        ``"src"``
            The video source the keypoint originates with (`str`)
        ``"start"``
            The start time in the source video for the keypoint (`float`)
        ``"end"``
            The end time in the source video for the keypoint (`float`)
        ``"tags"``
            A list of strings for tags that are applied to the keypoint (`list`)
        ``"comments"``
            Comments made associated with the keypoint (`str`)
    callback : `function`
        Function applied each time a new keypoint is added
    callbackArgs : any
        list or dict of args to be applied as *args or *kwargs to your callback function

    Attributes
    ----------

    src : `str`
        String with path to the main video file to display. This is required.
    vids : `list` [`str`]
        A list of paths to videos to display in sync with src
    tags : `list` [`str`]
        A list of tags to apply to video notes
    keypoints : `list` [`dict`]
        The most up to date keypoints marked with the format :
        ``"src"``
            The video source the keypoint originates with (`str`)
        ``"start"``
            The start time in the source video for the keypoint (`float`)
        ``"end"``
            The end time in the source video for the keypoint (`float`)
        ``"tags"``
            A list of strings for tags that are applied to the keypoint (`list`)
        ``"comments"``
            Comments made associated with the keypoint (`str`)
    callback : `function`
        Function applied each time a new keypoint is added
    callbackArgs : any
        list or dict of args to be applied as *args or *kwargs to your callback function

    df : ``Pandas DataFrame``
        An up to date dataframe with the current keypoints





   '''
    #TODO apply video offsets to source and vids
    #TODO there is a slight delay when you click an annotation while it is playing
    #TODO make ot possible to add checkboxs after watching

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
    src= Unicode("").tag(sync=True)
    subtitles= Unicode("").tag(sync=True)
    vids = List([]).tag(sync=True)
    keypoints = List([]).tag(sync=True)
    tags = List([]).tag(sync=True)
    author = Unicode("").tag(sync=True)

    @observe('keypoints')
    def _observe_keys(self, change):
        # print(change['old'])
        # print(change['new'])
        self.df= pd.DataFrame(self.keypoints)
        # pd.DataFrame(a.keypoints)

        # if self.callback is not None:
        
        #     if self.callbackArgs is not None:
        #         if type(self.callbackArgs) is list:
        #             self.callback(*self.callbackArgs)
        #         if type(self.callbackArgs) is dict:
        #             self.callback(**self.callbackArgs)
        #     else:
        #         self.callback()


    def __init__(self, src, vids=None, tags=None, subtitles= None, keypoints= None, author=None, callback=None, callbackArgs=None, callbackKwargs=None, **kwargs):

        self.on_msg(self._handle_keypoint_click)
        # self._click_handlers = CallbackDispatcher()

        super().__init__(**kwargs)
        self.src=src
        self.df = pd.DataFrame()

        if vids is not None:
            self.vids=vids

        if subtitles is not None:
            self.subtitles = subtitles

        if tags is not None:
            self.tags=tags

        if keypoints is not None:
            self.keypoints=keypoints
            self.df.append(keypoints)
        if author is not None:
            self.author=author

        self.callback = callback
        if callbackArgs is not None:
            self.callbackArgs=callbackArgs
        else:
            self.callbackArgs=[]
        if callbackKwargs is not None:
            self.callbackKwargs=callbackKwargs
        else:
            self.callbackKwargs={}

    def _handle_keypoint_click(self, _, content, buffers):
        self.v=(_, content, buffers)
        if content.get('event', '') == 'click':
            if self.callback is not None:
                self.callback(*self.callbackArgs, **self.callbackKwargs)






