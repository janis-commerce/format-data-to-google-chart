'use strict';

const BaseChart = require('./base-chart');
const { getTitles, getValues } = require('./helpers');

class TableChart extends BaseChart {

	_parseData() {
		const data = super._parseData();

		const titles = getTitles(this._dataHandlingProps.values);

		return [
			titles.map(label => ({ label })),
			...data.map(row => this._parseRow(row))
		];
	}

	_parseRow(row) {
		return getValues(row, this._dataHandlingProps.values);
	}
}

module.exports = TableChart;
