import ipywidgets as widgets
from traitlets import Unicode, Float, List

# See js/lib/example.js for the frontend counterpart to this file.

@widgets.register
class HelloWorld(widgets.DOMWidget):
    """An example widget."""

    # Name of the widget view class in front-end
    _view_name = Unicode('HelloView').tag(sync=True)

    # Name of the widget model class in front-end
    _model_name = Unicode('HelloModel').tag(sync=True)

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
    _value = Float(0.0).tag(sync=True)
    _src= Unicode("").tag(sync=True)
    _keypoints = List([]).tag(sync=True)
    _vids = List([]).tag(sync=True)
