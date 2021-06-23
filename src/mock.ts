import type { DOMWidgetModel } from '@jupyter-widgets/base';
import App from './App.svelte';

class MockModel {
  set() {}
  undo() {}
  // https://github.com/cabreraalex/widget-svelte-cookiecutter/pull/7/commits/a63f0151b198b86c7a4a9c533f4cb22a03b65f54
  get(name: string) {
    if(name === 'src'){
      return './GMT20201216-141014_Interview-_640x360.8cc97a33.mp4'
    }
    else if (name === 'gps'){
      return './16-Dec-2020-0945.gpx'
    }
    else if(name =='transcript'){
      return './GMT20201216-141014_Interview-.transcript.vtt'
    }
  }
  on(variableName: string, callback: () => void, context: any) {}
  save_changes() {}
}

const app = new App({
  target: document.body,
  props: {
    model: new MockModel() as unknown as DOMWidgetModel,
  },
});

export default app;
