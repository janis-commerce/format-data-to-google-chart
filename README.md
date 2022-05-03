# format-data-to-google-chart

![Build Status](https://github.com/janis-commerce/format-data-to-google-chart/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/format-data-to-google-chart/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/format-data-to-google-chart?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fformat-data-to-google-chart.svg)](https://www.npmjs.com/package/@janiscommerce/format-data-to-google-chart)

A package for format an array of object for create the data for many Google Charts.

## Installation

```sh
npm install @janiscommerce/format-data-to-google-chart
```

## Usage

```js
const { LineChart } = require('@janiscommerce/format-data-to-google-chart');

const lineChart = new LineChart({
	label: {
		source: 'date'
	},
	values: [{
		source: 'quantity'
	}, {
		source: 'double'
	}]
});

lineChart.setData(sampleData);

const { data } = lineChart.parse();

```

## Label and Values items properties

| Property    | type     | description                           | required |
|-------------|----------|---------------------------------------|----------|
| source      | string   | Field name for find value in the data | true     |
| title       | string   | Title for view in chart labels        | false    |
| valueMapper | function | function for modify value to show     | false    |
| titleMapper | function | function for modify title to show     | false    |

## Examples

### LineChart

```js
const { LineChart } = require('@janiscommerce/format-data-to-google-chart');

const sampleData = [
	{
		id: 1,
		date: '2020-04-15',
		name: 'First element',
		quantity: 10,
		double: 20
	},
	{
		id: 2,
		date: '2020-04-16',
		name: 'Second element',
		quantity: 20,
		double: 40
	},
	{
		id: 3,
		date: '2020-04-17',
		name: 'Third element',
		quantity: 60,
		double: 120
	}
];

const lineChart = new LineChart({
	label: {
		source: 'date'
	},
	values: [{
		source: 'quantity'
	}, {
		source: 'double'
	}]
});

lineChart.setData(sampleData);

const { data } = lineChart.parse();

// data preview

[
	['date', 'quantity', 'double'],
	['2020-04-15', 10, 20],
	['2020-04-16', 20, 40],
	['2020-04-17', 60, 120]
]
```

### PieChart

```js
const { PieChart } = require('@janiscommerce/format-data-to-google-chart');

const sampleData = [
	{
		id: 1,
		name: 'First element',
		quantity: 10
	},
	{
		id: 2,
		name: 'Second element',
		quantity: 20
	},
	{
		id: 3,
		name: 'Third element',
		quantity: 60
	}
];

const pieChart = new PieChart({
	label: {
		source: 'name'
	},
	values: [{
		source: 'quantity'
	}]
});

pieChart.setData(sampleData);

const { data } = pieChart.parse();

// data preview

[
	['name', 'quantity'],
	['First element', 10],
	['Second element', 20],
	['Third element', 60]
]
```


### TableChart

```js
const { TableChart } = require('@janiscommerce/format-data-to-google-chart');

const sampleData = [
	{
		id: 1,
		name: 'First element',
		quantity: 10
	},
	{
		id: 2,
		name: 'Second element',
		quantity: 20
	},
	{
		id: 3,
		name: 'Third element',
		quantity: 60
	}
];

const tableChart = new TableChart({
	values: [
		{ source: 'id' },
		{ source: 'name' },
		{ source: 'quantity' }
	]
});

tableChart.setData(sampleData);

const { data } = tableChart.parse();

// data preview

[
	[{ label: 'id' }, { label: 'name' }, { label: 'quantity' }],
	[1, 'First element', 10],
	[2, 'Second element', 20],
	[3, 'Third element', 60]
]
```

### BarChart

```js
const { BarChart } = require('@janiscommerce/format-data-to-google-chart');

const sampleData = [
	{
		id: 1,
		name: 'First element',
		quantity: 10,
		color: 'red',
		key: 'A1'
	},
	{
		id: 2,
		name: 'Second element',
		quantity: 20,
		color: 'blue',
		key: 'A2'
	},
	{
		id: 3,
		name: 'Third element',
		quantity: 60,
		color: 'black',
		key: 'A3'
	}
];
```

#### With label and value


```js
const barChart = new BarChart({
	label: {
		source: 'name'
	},
	values: [{ source: 'quantity' }]
});

barChart.setData(sampleData);

const { data } = barChart.parse();

// data preview

[
	['name', 'quantity'],
	['First element', 10],
	['Second element', 20],
	['Third element', 60]
]

```

#### With label, value, styles and annotation


```js
const barChart = new BarChart({
	label: {
		source: 'name'
	},
	values: [
		{ source: 'quantity' },
		{ source: 'color' },
		{ source: 'key' }
	]
});

barChart.setData(sampleData);

const { data } = barChart.parse();

// data preview

[
	['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
	['First element', 10, 'red', 'A1'],
	['Second element', 20, 'blue', 'A2'],
	['Third element', 60, 'black', 'A3']
]

```


