'use strict';

const assert = require('assert');

const sampleData = require('../sample-data/line-chart');
const { ColumnChart } = require('../../lib');

describe('Column Chart', () => {
	it('Should parse the data and options property', () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date'
			},
			values: [
				{
					source: 'quantity'
				}
			]
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

	it('Should parse the data with multiple lines/values', () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date'
			},
			values: [
				{
					source: 'quantity'
				},
				{
					source: 'double'
				}
			]
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity', 'double'],
			['2020-04-15', 10, 20],
			['2020-04-16', 20, 40],
			['2020-04-17', 60, 120]
		]);
	});

	it('Should use label and values titles if present', () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date',
				title: 'Date'
			},
			values: [
				{
					source: 'quantity',
					title: 'Quantity'
				}
			]
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['Date', 'Quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

	it('Should pass-through pie chart properties', () => {
		const columnChart = new ColumnChart(
			{
				label: {
					source: 'date'
				},
				values: [
					{
						source: 'quantity'
					}
				]
			},
			{
				title: 'My chart title',
				curveType: 'function',
				enableInteractivity: false,
				pointsVisible: true
			}
		);

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {
			title: 'My chart title',
			curveType: 'function',
			enableInteractivity: false,
			pointsVisible: true
		});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

	it("Should map a value by it's given valueMapper", () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date'
			},
			values: [
				{
					source: 'quantity',
					valueMapper: v => v * 10
				}
			]
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-15', 100],
			['2020-04-16', 200],
			['2020-04-17', 600]
		]);
	});

	it("Should map a label by it's given valueMapper", () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date',
				valueMapper: d => new Date(d)
			},
			values: [
				{
					source: 'quantity'
				}
			]
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			[new Date('2020-04-15'), 10],
			[new Date('2020-04-16'), 20],
			[new Date('2020-04-17'), 60]
		]);
	});

	it("Should map a title by it's given titleMapper", () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date',
				titleMapper: s => `The ${s}`
			},
			values: [
				{
					source: 'quantity'
				}
			]
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['The date', 'quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

	it("Should sort the data by it's key", () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date'
			},
			values: [
				{
					source: 'quantity'
				}
			],
			sortData: (key1, key2) => key2.localeCompare(key1)
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-17', 60],
			['2020-04-16', 20],
			['2020-04-15', 10]
		]);
	});

	it('Should not sort the titles', () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date'
			},
			values: [
				{
					source: 'quantity'
				}
			],
			sortData: (key1, key2) => key1.localeCompare(key2)
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});

	it("Should ignore sort if it's not a function", () => {
		const columnChart = new ColumnChart({
			label: {
				source: 'date'
			},
			values: [
				{
					source: 'quantity'
				}
			],
			sortData: 'someInvalidSort'
		});

		columnChart.setData(sampleData);

		const { data, options } = columnChart.parse();

		assert.deepStrictEqual(options, {});

		assert.deepStrictEqual(data, [
			['date', 'quantity'],
			['2020-04-15', 10],
			['2020-04-16', 20],
			['2020-04-17', 60]
		]);
	});
});
