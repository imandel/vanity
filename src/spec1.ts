import type { VisualizationSpec } from 'vega-embed';

export default {
  $schema: 'https://vega.github.io/schema/vega/v5.json',
  width: 400,
  height: 70,

  data: [
    {
      name: 'table',
    },
  ],

  scales: [
    {
      name: 'xscale',
      type: 'time',
      domain: { data: 'table', field: 'idx' },
      range: [0, 2125.48],
    },
    {
      name: 'yscale',
      domain: { data: 'table', field: 'price' },
      nice: true,
      range: 'height',
    },
    {
      name: 'color',
      type: 'ordinal',
      domain: { data: 'table', field: 'symbol', sort: true },
      range: 'category',
    },
  ],
  signals: [
    {
      name: 'barPos',
      value: 90,
    },
  ],

  marks: [
    {
      name: 'pathgroup',
      type: 'group',
      from: {
        facet: {
          data: 'table',
          name: 'series',
          groupby: 'symbol',
        },
      },
      encode: {
        update: {
          width: { field: { group: 'width' } },
          height: { field: { group: 'height' } },
        },
      },
      marks: [
        {
          type: 'line',
          from: { data: 'series' },
          encode: {
            update: {
              stroke: { scale: 'color', field: 'symbol' },
              x: { scale: 'xscale', field: 'idx' },
              y: { scale: 'yscale', field: 'price' },
            },
          },
        },
        {
          type: 'rule',
          from: { data: 'table' },
          encode: {
            update: {
              stroke: { value: 'purple', size: { value: 5 } },
              x: { scale: 'xscale', signal: 'barPos' },
              y: { value: 0 },
              y2: { field: { group: 'height' } },
            },
          },
        },
      ],
    },
  ],
} as VisualizationSpec;
