'use strict';

const identity = x => x;

const getMappedValue = (mapper, value, ...args) => {
	const mapperFn = mapper || identity;
	return mapperFn(value, ...args);
};

const getTitle = ({ source, title, titleMapper }) => getMappedValue(titleMapper, title || source);

const getValue = (row, { source, valueMapper }) => getMappedValue(valueMapper, row[source], row);

/**
 * Maps an array of source definitions to an array of strings representing the titles.
 * A source definition is an object with the following properties:
 * - title {string}
 * - source {string}
 * - mapper {callable}. Receives a string and must return another
 *
 * @param {array<object>} sources The source definitions
 * @return {array<string>} The titles.
 */
const getTitles = sources => sources.map(getTitle);

/**
 * Maps a row and an array of source definitions to an array of values.
 * A source definition is an object with the following properties:
 * - source {string}
 * - valueMapper {callable}. Receives a string and must return another
 *
 * @param {object} row The row with all the data
 * @param {array<object>} sources The source definitions
 * @return {array<any>} The values.
 */
const getValues = (row, sources) => sources.map(source => getValue(row, source));

module.exports = {
	getTitles,
	getValues
};
