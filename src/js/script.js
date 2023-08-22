/**
 * SCRIPTS
 *
 * @package uri-plugin-template
 */

( function() {
	'use strict';

	window.addEventListener( 'load', function() {
		uriTuitionCalcInit();
	} );

	function uriTuitionCalcInit() {
		let url = spreadsheet.text;

		//set empty array to collect courses selected from dropdown
		let selectedCourses = [];

		//set empty array to collect selected courses' data sets
		let courseDataSet = [];

		function parseData( url, courseData ) {
			Papa.parse( url, {
				download: true,
				header: true,
				dynamicTyping: true,
				complete( results ) {
					courseData( results );
				},
			}
			);
		}
	}

	function doStuff( data ) {
		// eslint-disable-next-line no-undef
		coursesList = data.data.map( ( { Course } ) => Course );
		// eslint-disable-next-line no-undef
		csvData = data.data;

		let options = '';
		let selectOptions = '<option disabled selected value>--</option>';
		coursesList.map( ( op, i ) => {
			options += `<option value="${ op }" id="${ i }"style="border-radius: 5px;"">${ op }</option>`;
		} );
		document.getElementById( 'courseNumber' ).innerHTML = selectOptions + options;
	}

	parseData( url, doStuff );
}() );
