var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: 'vanity',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'vanity',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

