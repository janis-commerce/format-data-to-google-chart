'use strict';

const assert = require('assert');

const sampleData = require('../sample-data/bar-chart');
const { BarChart } = require('../../lib');

describe('Bar Chart', () => {

	it('Should parse the data and options property', () => {

		const barChart = new BarChart({
			label: {
				source: 'name'
			},
			values: [
				{ source: 'quantity' }
			]
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity'],
			['First element', 10],
			['Second element', 20],
			['Third element', 60]
		]);
	});

	it('Should parse the data and options property with styles and annotation', () => {

		const barChart = new BarChart({
			label: {
				source: 'name'
			},
			values: [
				{ source: 'quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			]
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['First element', 10, 'red', 'A1'],
			['Second element', 20, 'blue', 'A2'],
			['Third element', 60, 'black', 'A3']
		]);
	});

	it('Should use label and values titles if present', () => {

		const barChart = new BarChart({
			label: {
				source: 'name',
				title: 'Name'
			},
			values: [
				{ source: 'quantity', title: 'Quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			]
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['Name', 'Quantity', { role: 'style' }, { role: 'annotation' }],
			['First element', 10, 'red', 'A1'],
			['Second element', 20, 'blue', 'A2'],
			['Third element', 60, 'black', 'A3']
		]);
	});

	it('Should pass-through pie chart properties', () => {

		const barChart = new BarChart({
			label: {
				source: 'name'
			},
			values: [
				{ source: 'quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			]
		}, {
			title: 'Density of Precious Metals, in g/cm^3',
			bar: { groupWidth: '95%' },
			legend: { position: 'none' }
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {
			title: 'Density of Precious Metals, in g/cm^3',
			bar: { groupWidth: '95%' },
			legend: { position: 'none' }
		});

		assert.deepStrictEqual(data, [
			['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['First element', 10, 'red', 'A1'],
			['Second element', 20, 'blue', 'A2'],
			['Third element', 60, 'black', 'A3']
		]);
	});

	it('Should map a value by it\'s given valueMapper', () => {

		const barChart = new BarChart({
			label: {
				source: 'name'
			},
			values: [
				{ source: 'quantity', valueMapper: v => v * 10 },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			]
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['First element', 100, 'red', 'A1'],
			['Second element', 200, 'blue', 'A2'],
			['Third element', 600, 'black', 'A3']
		]);
	});

	it('Should map a label by it\'s given valueMapper', () => {

		const barChart = new BarChart({
			label: {
				source: 'name',
				valueMapper: v => `(${v})`
			},
			values: [
				{ source: 'quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			]
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['(First element)', 10, 'red', 'A1'],
			['(Second element)', 20, 'blue', 'A2'],
			['(Third element)', 60, 'black', 'A3']
		]);
	});

	it('Should map a title by it\'s given titleMapper', () => {

		const barChart = new BarChart({
			label: {
				source: 'name',
				titleMapper: v => `The ${v}`
			},
			values: [
				{ source: 'quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			]
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['The name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['First element', 10, 'red', 'A1'],
			['Second element', 20, 'blue', 'A2'],
			['Third element', 60, 'black', 'A3']
		]);
	});

	it('Should sort the data by it\'s key', () => {

		const barChart = new BarChart({
			label: {
				source: 'name'
			},
			values: [
				{ source: 'quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			],
			sortData: (key1, key2) => key2.localeCompare(key1)
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['Third element', 60, 'black', 'A3'],
			['Second element', 20, 'blue', 'A2'],
			['First element', 10, 'red', 'A1']
		]);
	});

	it('Should not sort the titles', () => {

		const barChart = new BarChart({
			label: {
				source: 'name'
			},
			values: [
				{ source: 'quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			],
			sortData: (key1, key2) => key1.localeCompare(key2)
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['First element', 10, 'red', 'A1'],
			['Second element', 20, 'blue', 'A2'],
			['Third element', 60, 'black', 'A3']
		]);
	});

	it('Should ignore sort if it\'s not a function', () => {

		const barChart = new BarChart({
			label: {
				source: 'name'
			},
			values: [
				{ source: 'quantity' },
				{
					source: 'color',
					attributes: { role: 'style' }
				},
				{
					source: 'key',
					attributes: { role: 'annotation' }
				}
			],
			sortData: 'someInvalidSort'
		});

		barChart.setData(sampleData);

		const {
			data,
			options
		} = barChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['name', 'quantity', { role: 'style' }, { role: 'annotation' }],
			['First element', 10, 'red', 'A1'],
			['Second element', 20, 'blue', 'A2'],
			['Third element', 60, 'black', 'A3']
		]);
	});

});
