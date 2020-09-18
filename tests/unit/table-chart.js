'use strict';

const assert = require('assert');

const sampleData = require('../sample-data/table-chart');
const { TableChart } = require('../../lib');

describe('Table Chart', () => {

	it('Should parse the data and options properly', () => {

		const tableChart = new TableChart({
			values: [
				{ source: 'id' },
				{ source: 'name' },
				{ source: 'quantity' }
			]
		});

		tableChart.setData(sampleData);

		const {
			data,
			options
		} = tableChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			[{ label: 'id' }, { label: 'name' }, { label: 'quantity' }],
			[1, 'First element', 10],
			[2, 'Second element', 20],
			[3, 'Third element', 60]
		]);
	});

	it('Should use label and value titles if present', () => {

		const tableChart = new TableChart({
			values: [
				{ source: 'id' },
				{ source: 'name', title: 'Name' },
				{ source: 'quantity', title: 'Quantity' }
			]
		});

		tableChart.setData(sampleData);

		const {
			data,
			options
		} = tableChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			[{ label: 'id' }, { label: 'Name' }, { label: 'Quantity' }],
			[1, 'First element', 10],
			[2, 'Second element', 20],
			[3, 'Third element', 60]
		]);
	});

	it('Should pass-through pie chart properties', () => {

		const tableChart = new TableChart({
			values: [
				{ source: 'id' },
				{ source: 'name' },
				{ source: 'quantity' }
			]
		}, {
			showRowNumber: true
		});

		tableChart.setData(sampleData);

		const {
			data,
			options
		} = tableChart.parse();

		assert.deepStrictEqual(options, {
			showRowNumber: true
		});

		assert.deepStrictEqual(data, [
			[{ label: 'id' }, { label: 'name' }, { label: 'quantity' }],
			[1, 'First element', 10],
			[2, 'Second element', 20],
			[3, 'Third element', 60]
		]);
	});

	it('Should map a value by it\'s given valueMapper', () => {

		const tableChart = new TableChart({
			values: [
				{ source: 'id', valueMapper: v => `#${v}` },
				{ source: 'name', title: 'name' },
				{ source: 'quantity', title: 'quantity' }
			]
		});

		tableChart.setData(sampleData);

		const {
			data,
			options
		} = tableChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			[{ label: 'id' }, { label: 'name' }, { label: 'quantity' }],
			['#1', 'First element', 10],
			['#2', 'Second element', 20],
			['#3', 'Third element', 60]
		]);
	});

	it('Should map a title by it\'s given titleMapper', () => {

		const tableChart = new TableChart({
			values: [
				{ source: 'id', titleMapper: v => `The ${v}` },
				{ source: 'name', title: 'name' },
				{ source: 'quantity', title: 'quantity' }
			]
		});

		tableChart.setData(sampleData);

		const {
			data,
			options
		} = tableChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			[{ label: 'The id' }, { label: 'name' }, { label: 'quantity' }],
			[1, 'First element', 10],
			[2, 'Second element', 20],
			[3, 'Third element', 60]
		]);
	});

	it('Should aggregate data by it\'s given pipeline with the default aggregationOperation', () => {

		const tableChart = new TableChart({
			pipeline: [
				{
					map: ({ quantity, ...row }) => ({ ...row, quantity: quantity + 1 })
				}
			],
			values: [
				{ source: 'id' },
				{ source: 'name', title: 'name' },
				{ source: 'quantity', title: 'quantity' }
			]
		});

		tableChart.setData(sampleData);

		const {
			data,
			options
		} = tableChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			[{ label: 'id' }, { label: 'name' }, { label: 'quantity' }],
			[1, 'First element', 11],
			[2, 'Second element', 21],
			[3, 'Third element', 61]
		]);
	});

});
