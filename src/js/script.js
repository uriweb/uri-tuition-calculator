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
		/*
		const urlSpreadsheet = spreadsheet.text,
			//set empty array to collect courses selected from dropdown
			selectedCourses = [],
			//set empty array to collect selected courses' data sets
			courseDataSet = [];
			*/

		parseData( spreadsheet.text, doStuff );

		function parseData( url, courseData ) {
			// eslint-disable-next-line no-undef
			Papa.parse( url, {
				download: true,
				header: true,
				dynamicTyping: true,
				complete( results ) {
					courseData( results );
					console.log( results );
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

		//let options = '';
		let selectOptions = '<option disabled selected value>--</option>';
		document.getElementById( 'courseNumber' ).innerHTML = selectOptions;
	}
}() );
