import type { Writable } from 'svelte/store';
import { writable, get, derived } from 'svelte/store';

import { TimingObject } from 'timing-object';
export const timingObject: Writable<any> = writable(new TimingObject());

interface pt {
  src: string;
  author: string;
  id: string | null |undefined;
  start: number | null | undefined;
  end: number | null | undefined;
  tags: Array<string>;
  comments: string | null | undefined;

}
function Keypoint(){
  const store: Writable<pt> = writable({src:'', author:'',id:'', start:null, end:null, tags:[], comments:''})
  return{
    set: store.set,
    subscribe: store.subscribe,    
    resetKeypoint: () => {
        store.update((state: pt)=> {
          state.start = null
          state.end = null
          state.tags = []
          state.id = null
          state.comments = null
        return state
      })},
    resetKeypointTimes: () => {
      store.update((state: pt)=> {
        console.log(state)
        state.start = null
        state.end = null
        state.id = null
        console.log(state)
        return state
      })},
    getValues: () => {return get(store)}, //i can delete this?
  }
}
export const curKeypoint = Keypoint();
export const keypointDefined = derived(curKeypoint, ($curKeypoint) => {
  return {start:($curKeypoint.start || $curKeypoint.start ===0) ? true : false,
          end: ($curKeypoint.end || $curKeypoint.end ===0) ? true : false,
          full:($curKeypoint.start || $curKeypoint.start ===0) && ($curKeypoint.end || $curKeypoint.end ===0) ? true : false
    }
  })
export function createValue(model: any, name_: string, value_: any) {
  const name: string = name_;
  // const curVal: Writable<any> = writable(value_);
  const modelValue = model.get(name);
  // https://github.com/cabreraalex/widget-svelte-cookiecutter/pull/7/commits/a63f0151b198b86c7a4a9c533f4cb22a03b65f54
  const curVal: Writable<any> = writable(
    modelValue === undefined ? value_ : modelValue
  );

  model.on('change:' + name, () => curVal.set(model.get(name)), null);

  return {
    set: (v: any) => {
      curVal.set(v);
      model.set(name, v);
      model.save_changes();
    },
    subscribe: curVal.subscribe,
    update: (func: any) => {
      curVal.update((v: any) => {
        const out = func(v);
        model.set(name, out);
        model.save_changes();
        return out;
      });
    },
  };
}

export const curTime: Writable<any> = writable(0);
export const tags: Writable<any> = writable([]);
// export const activeRegion: Writable<any> = writable({});
