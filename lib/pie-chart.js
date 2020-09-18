'use strict';

const BaseChart = require('./base-chart');
const { getTitles, getValues } = require('./helpers');

class PieChart extends BaseChart {

	_parseData() {

		const data = super._parseData();

		return [
			getTitles([
				this._dataHandlingProps.label,
				this._dataHandlingProps.value
			]),
			// Data
			...data.map(row => this._parseRow(row))
		];
	}

	_parseRow(row) {
		return getValues(row, [
			this._dataHandlingProps.label,
			this._dataHandlingProps.value
		]);
	}

}

module.exports = PieChart;
