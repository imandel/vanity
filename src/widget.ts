// Copyright (c) ilan
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

import App from './App.svelte';

export class MapView extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: MapView.model_name,
      _model_module: MapView.model_module,
      _model_module_version: MapView.model_module_version,
      _view_name: MapView.view_name,
      _view_module: MapView.view_module,
      _view_module_version: MapView.view_module_version,
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'MapView';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ViewMap'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class ViewMap extends DOMWidgetView {
  render() {
    new App({
      target: this.el,
      props: {
        model: this.model,
      },
    });
  }
}
