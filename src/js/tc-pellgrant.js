/* eslint-disable no-undef */
/**
 * Pell Grant Calculator
 */

( function() {
	'use strict';

	/*
	document.getElementById( 'pell-grant-calc' ).addEventListener( 'load', function() {
		uriPellGrantInit();
	} );
     */

	window.addEventListener( 'load', function() {
		if ( document.getElementById( 'pell-grant-calc' ) ) {
			uriPellGrantInit();
		}
	} );

	function uriPellGrantInit() {
		const urlSpreadsheet = spreadsheet.url;

		parseDataPellGrant( urlSpreadsheet, dropDownsPellGrant );

		// eslint-disable-next-line no-shadow
		function parseDataPellGrant( urlSpreadsheet, courseData ) {
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

	function dropDownsPellGrant( data ) {
		//Populate dropdowns
		const coursesList = data.data.map( ( { Course } ) => Course );
		//const csvData = data.data;
		const dropDownIds = [ 'courseNumber', 'courseNumber2', 'courseNumber3', 'courseNumber4' ];

		let options = '';
		const selectOptions = '<option disabled selected value>Select Courses</option>';
		coursesList.map( ( op, i ) => {
			return options += `<option value="${ op }" id="${ i }">${ op }</option>`;
		}, {} );
		for ( let i = 0; i < dropDownIds.length; i++ ) {
			document.getElementById( dropDownIds[ i ] ).innerHTML = selectOptions + options;
		}

		//Populate other dropdowns
		creditDropdown();
		awardDropdown();

		//functionality to add another course
		document.getElementById( 'addCourse' ).addEventListener( 'click', addCoursesPellGrant);
	
	}

	function creditDropdown() {
		const creditOptions = document.getElementById( 'c-amount' );

		for ( let i = 1; i <= 12; i++ ) {
			const option = document.createElement( 'option' );
			option.value = i;
			option.text = i;
			creditOptions.add( option );
		}
	}

	function awardDropdown() {
		const awardOptions = document.getElementById( 'p-award' );

		for ( let i = 370; i <= 3697; i++ ) {
			const option = document.createElement( 'option' );
			option.value = i;
			option.text = i;
			awardOptions.add( option );
		}
	}

	function addCoursesPellGrant() {
		if ( document.getElementById( 'courseoption3' ).style.display === 'block' ) {
			document.getElementById( 'courseoption4' ).style.display = 'block';
			document.getElementById( 'addCourse' ).style.display = 'none';
		}
		if ( document.getElementById( 'courseoption2' ).style.display === 'block' ) {
			document.getElementById( 'courseoption3' ).style.display = 'block';
		} else {
			document.getElementById( 'courseoption2' ).style.display = 'block';
		}
	}
}() );
