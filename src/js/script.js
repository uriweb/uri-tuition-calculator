/* eslint-disable no-shadow */
/* eslint-disable no-mixed-spaces-and-tabs */
/**
 * SCRIPTS
 *
 * @package
 */

( function() {
	'use strict';

	window.addEventListener( 'load', function() {
		uriTuitionCalcInit();
	} );

	function uriTuitionCalcInit() {
		const urlSpreadsheet = spreadsheet.text;
			//set empty array to collect courses selected from dropdown
			//selectedCourses = [],
			//set empty array to collect selected courses' data sets
			//courseDataSet = [];
			//let coursesList = [];

		parseData( urlSpreadsheet, doStuff );

		function parseData( urlSpreadsheet, courseData ) {
			Papa.parse( urlSpreadsheet, {
				download: true,
				header: true,
				dynamicTyping: true, //convert string to numbers
				complete( results ) {
					courseData( results );
				},
			}
			);
		}
	}

	function doStuff( data ) {
	//Populate dropdowns
		const coursesList = data.data.map( ( { Course } ) => Course );
		// eslint-disable-next-line no-undef
		const csvData = data.data;
		const dropDownIds = [ 'courseNumber', 'courseNumber2', 'courseNumber3', 'courseNumber4' ];

		let options = '';
		const selectOptions = '<option disabled selected value>--</option>';
		// eslint-disable-next-line array-callback-return
		coursesList.map( ( op, i ) => {
			options += `<option value="${ op }" id="${ i }"style="border-radius: 5px;"">${ op }</option>`;
		 } );
		 for ( let i = 0; i < dropDownIds.length; i++ ) {
			document.getElementById( dropDownIds[ i ] ).innerHTML = selectOptions + options;
		 }
	}
}() );
