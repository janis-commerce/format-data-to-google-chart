'use strict';

const BaseChart = require('./base-chart');
const { getTitles, getValues } = require('./helpers');

class BarChart extends BaseChart {

	_parseData() {

		const data = super._parseData();

		const titleValues = getTitles([this._dataHandlingProps.label, ...this._dataHandlingProps.values]);

		const parsedData = [
			this._formatValues(titleValues),
			// Data
			...data.map(row => this._parseRow(row))
		];

		return parsedData;
	}

	_formatValues(values) {
		const [label, value, styles, annotation] = values;

		const currentValues = [label, value];

		if(styles)
			currentValues.push({ role: 'style' });

		if(annotation)
			currentValues.push({ role: 'annotation' });

		return currentValues;
	}

	_parseRow(row) {
		return getValues(row, [
			this._dataHandlingProps.label,
			...this._dataHandlingProps.values
		]);
	}

}

module.exports = BarChart;
