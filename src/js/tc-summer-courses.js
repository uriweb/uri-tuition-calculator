/* eslint-disable no-alert */
/* eslint-disable no-undef */
/**
 * SUMMER CALCULATOR SCRIPT
 *
 * @package
 */

( function() {
	'use strict';

	window.addEventListener( 'DOMContentLoaded', function() {
		if ( document.getElementById( 'summer-calc' ) ) {
			Papa.parse( summer.spreadsheet, {
				download: true,
				header: true,
				dynamicTyping: true, //convert string to numbers
				complete( results ) {
					dropDownsSummer( results );
				},
			}
			);
		}
	} );

	function dropDownsSummer( data ) {
	//Populate dropdowns
		const coursesList = data.data.map( ( { Course } ) => Course );
		//const csvData = data.data;
		const dropDownIds = [ 'courseNumber', 'courseNumber2', 'courseNumber3', 'courseNumber4' ];

		let options = '';
		const selectOptions = '<option disabled selected value>Select Course</option>';
		coursesList.map( ( op, i ) => {
			return options += `<option value="${ op }" id="${ i }">${ op }</option>`;
		}, {} );
		for ( let i = 0; i < dropDownIds.length; i++ ) {
			document.getElementById( dropDownIds[ i ] ).innerHTML = selectOptions + options;
		}

		//Add additional course dropdowns when button is clicked
		document.getElementById( 'addCourse' ).addEventListener( 'click', function() {
			if ( document.getElementById( 'courseoption3' ).style.display === 'block' ) {
				document.getElementById( 'courseoption4' ).style.display = 'block';
				document.getElementById( 'addCourse' ).style.display = 'none';
			}
			if ( document.getElementById( 'courseoption2' ).style.display === 'block' ) {
				document.getElementById( 'courseoption3' ).style.display = 'block';
			} else {
				document.getElementById( 'courseoption2' ).style.display = 'block';
			}
		} );

		// Cancel additional course dropdwons functionality
		const cancelCourse = document.querySelectorAll( '.ico-times' );

		cancelCourse.forEach( ( exIcon ) => {
			exIcon.addEventListener( 'click', () => {
			//Get select dropdown
				const selectBefore = exIcon.previousElementSibling;
				//Clear select value
				selectBefore.innerHTML = selectOptions + options;
				//Get div
				const courseDiv = exIcon.parentNode;
				courseDiv.style.display = 'none';
			} );
		} );

		// Reveal 2nd radio question if first is checked
		document.getElementById( 'q2' ).addEventListener( 'change', function() {
			document.getElementById( 'q3' ).style.display = 'block';
		} );

		//Calculate cost when button is clicked
		document.getElementById( 'calc' ).addEventListener( 'click', checkFirstSummer );

		//Make sure residency status is checked
		function checkFirstSummer() {
			const allSelectIds = [ 'resi', 'courseNumber' ];

			checkDisabledSelects();

			function checkDisabledSelects() {
				let checkCleared = true;

				// Iterate over the array of select IDs
				allSelectIds.forEach( ( id ) => {
					const selectElement = document.getElementById( id );

					if ( selectElement ) {
						// Check if the select is disabled or does not have a selected value
						if ( selectElement.disabled || selectElement.value === 'disabled' || selectElement.value === '' ) {
							checkCleared = false; // Mark as false if any select is disabled or not selected
						}
					}
				} );

				if ( checkCleared ) {
					calculateCost( data );
				} else {
					alert( 'Please select all options.' );
				}
			}
		}
	}

	function calculateCost( data ) {
	//set variables
		const csvData = data.data;
		const dropDownValues = [ courseNumber.value, courseNumber2.value, courseNumber3.value, courseNumber4.value ];
		//Set empty array to collect selected course cost data
		const courseDataSet = [];
		//hook up analytics
		const e = {
			event: 'tuitionCalculatorSubmit',
			term: 'summer',
			courses: dropDownValues,
			residency: document.getElementById( 'resi' ).value,
			firstclass: document.getElementById( 'firstclass' ).checked,
			matriculating: document.getElementById( 'matriculating' ).checked,
		};
		//console.log(e);
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push( e );

		//Remove form content
		document.querySelector( '.form-content' ).style.display = 'none';

		//Filter dropDownValues array to only selected courses from dropdowns
		const selectedCourses = dropDownValues.filter( checkForValue );
		function checkForValue( course ) {
			return course.length > 0;
		}

		//For each course selected, get cost data and add to courseDataSet array
		for ( const val of dropDownValues ) {
			const courseResults = csvData.filter( function( item ) {
				return item.Course === val;
			} );

			courseDataSet.push( courseResults );
		}

		let techFee = 0,
			courseFee = 0,
			inStateT = 0,
			regTuition = 0,
			oos = 0,
			registrationFee = 0,
			transcriptFee = 0,
			documentFee = 0,
			inclAccessFee = 0;
		registrationFee = 30;

		if ( document.getElementById( 'firstclass' ).checked ) {
			transcriptFee = 50;
		}
		if ( document.getElementById( 'matriculating' ).checked ) {
			documentFee = 0;
		}

		//Display text that shows the courses selected
		document.querySelector( '.yourCourses' ).textContent = 'Estimated Costs for: ' + selectedCourses.join( ', ' );

		//Loop through the courses selected and add their cost data
		for ( let i = 0; i < courseDataSet.length; i++ ) {
			for ( let x = 0; x < courseDataSet[ i ].length; x++ ) {
				techFee += Number( courseDataSet[ i ][ x ][ 'Technology Fee' ] );
				inStateT += Number( courseDataSet[ i ][ x ][ 'Instate Tuition' ] );
				regTuition += Number( courseDataSet[ i ][ x ][ 'Reg. Tuition' ] );
				oos += Number( courseDataSet[ i ][ x ][ 'OOS Tuition' ] );
				courseFee += Number( courseDataSet[ i ][ x ][ 'Course Fee' ] );
				inclAccessFee += Number( courseDataSet[ i ][ x ][ 'Inclusive Access Fee' ] );
			}
		}

		//Display breakdown of cost
		if ( document.getElementById( 'resi' ).value === 'instate' ) {
			document.getElementById( 'instateTuition' ).textContent = 'In-State Tuition: $' + inStateT.toLocaleString() + '.00';
		}
		if ( document.getElementById( 'resi' ).value === 'regional' ) {
			document.getElementById( 'regionalTuition' ).textContent = 'Regional Tuition: $' + regTuition.toLocaleString() + '.00';
		}
		if ( document.getElementById( 'resi' ).value === 'out-of-state' ) {
			document.getElementById( 'out-of-state' ).textContent = 'Out-of-State Tuition: $' + oos.toLocaleString() + '.00';
		}
		if ( inclAccessFee !== 0 ) {
			document.getElementById( 'inclusive-access-fee' ).textContent = 'Inclusive Access Fee*: $' + inclAccessFee + '.00';
			document.getElementById( 'access-note' ).textContent = '*Inclusive Access is a course material affordability program designed by institutions and guided by the Department of Education to deliver digital learning resources to students at a significantly reduced cost on or before the first day of class.';
		}
		//Display Summer fees
		document.getElementById( 'registration-fee' ).textContent = 'Registration Fee: $' + registrationFee + '.00';
		if ( transcriptFee !== 0 ) {
			document.getElementById( 'transcript-fee' ).textContent = 'Transcript Fee: $' + transcriptFee + '.00';
		}
		if ( courseFee !== 0 ) {
			document.getElementById( 'course-fee' ).textContent = 'Course Fee: $' + courseFee + '.00';
		}
		if ( techFee !== 0 ) {
			document.getElementById( 'techFee' ).textContent = 'Technology Fee: $' + techFee + '.00';
		}

		//create total array
		const totalArray = [ techFee, registrationFee, transcriptFee, documentFee, courseFee, inclAccessFee ];
		if ( document.getElementById( 'resi' ).value === 'instate' ) {
			totalArray.push( inStateT );
		}
		if ( document.getElementById( 'resi' ).value === 'regional' ) {
			totalArray.push( regTuition );
		}
		if ( document.getElementById( 'resi' ).value === 'out-of-state' ) {
			totalArray.push( oos );
		}

		//Display total
		document.getElementById( 'total' ).style.display = 'block';
		document.getElementById( 'total' ).textContent = 'Estimated Total: $' + totalArray.reduce( totalFinal ).toLocaleString() + '.00';

		//Add total array elements together
		function totalFinal( total, num ) {
			return total + num;
		}

		//Refresh calculator with button
		document.getElementById( 'reload' ).addEventListener( 'click', resetCalc );

		function resetCalc() {
			location.reload();
		}

		//Replace "Calculate Cost" button with "Reset Calculator"
		document.getElementById( 'reload' ).style.display = 'block';
		document.getElementById( 'calc' ).style.display = 'none';
	}
}() );

