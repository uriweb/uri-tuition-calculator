/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
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
			options += `<option value="${ op }" id="${ i }">${ op }</option>`;
		 } );
		 for ( let i = 0; i < dropDownIds.length; i++ ) {
			document.getElementById( dropDownIds[ i ] ).innerHTML = selectOptions + options;
		 }

		 //Add additional course dropdowns when button is clicked
		 document.getElementById( 'addCourse' ).addEventListener( 'click', function() {
			if ( document.getElementById( 'courseoption3' ).style.display == 'block' ) {
				document.getElementById( 'courseoption4' ).style.display = 'block';
				document.getElementById( 'addCourse' ).style.display = 'none';
			}
			if ( document.getElementById( 'courseoption2' ).style.display == 'block' ) {
				document.getElementById( 'courseoption3' ).style.display = 'block';
			} else {
				document.getElementById( 'courseoption2' ).style.display = 'block';
			}
		} );

		// Reveal 2nd radio question if first is checked
		document.getElementById( 'q2' ).addEventListener( 'change', function() {
			document.getElementById( 'q3' ).style.display = 'block';
		} );

		 //Calculate cost when button is clicked
		 document.getElementById( 'calc' ).addEventListener( 'click', checkFirst );

		 function checkFirst() {
			if ( document.getElementById( 'resi' ).value == 'disabled' ) {
			   alert( 'Please select your residency status.' );
			} else {
			   calculateCost();
			}
		 }

		 function calculateCost() {
			const dropDownValues = [ courseNumber.value, courseNumber2.value, courseNumber3.value, courseNumber4.value ];
			//Set empty array to collect selected course cost data
			const courseDataSet = [];
			//const selectedCourses = [];
			console.log( 'Drop Down Values: ' + dropDownValues );

			//Filter dropDownValues array to only selected courses from dropdowns
			const selectedCourses = dropDownValues.filter( checkForValue );
			function checkForValue( course ) {
				return course.length > 0;
			}
			console.log( 'selectedCourses: ' + selectedCourses );

			//For each course selected, get cost data and add to courseDataSet array
			for ( const val of dropDownValues ) {
				const courseResults = csvData.filter( function( item ) {
				   return item.Course === val;
				} );

				courseDataSet.push( courseResults );
			   }
			   console.log( 'CourseDataSet: ' + courseDataSet );
			let techFee = 0,
				courseFee = 0,
				inStateT = 0,
				regTuition = 0,
				oos = 0,
				registrationFee = 0,
				studentActFee = 0,
				transcriptFee = 0,
				documentFee = 0;
			if ( document.getElementById( 'firstclass' ).checked ) {
				registrationFee = 30; studentActFee = 20; transcriptFee = 50;
			}
			if ( document.getElementById( 'matriculating' ).checked ) {
				documentFee = 115;
			}

			//Display text that shows the courses selected
			document.querySelector( '.yourCourses' ).textContent = 'Estimated Costs for: ' + selectedCourses.join( ' & ' );

			//Loop through the courses selected and add their cost data
			for ( let i = 0; i < courseDataSet.length; i++ ) {
				console.log( `Sub-array ${ i }: ${ courseDataSet[ i ] }` );
				for ( let x = 0; x < courseDataSet[ i ].length; x++ ) {
					techFee += Number( courseDataSet[ i ][ x ][ 'Technology Fee' ] );
					inStateT += Number( courseDataSet[ i ][ x ][ 'Instate Tuition' ] );
					regTuition += Number( courseDataSet[ i ][ x ][ 'Reg. Tuition' ] );
					oos += Number( courseDataSet[ i ][ x ][ 'OOS Tuition' ] );
					courseFee += Number( courseDataSet[ i ][ x ][ 'Course Fee' ] );
				}
				console.log( 'Refined Array:' + courseDataSet );
				console.log( 'Reg Tuition:' + regTuition );
				console.log( 'Out of State:' + oos );
				console.log( 'Instate:' + inStateT );
			}
			//Display breakdown of cost
			document.getElementById( 'techFee' ).textContent = 'Technology Fee: $' + techFee + '.00';
			if ( document.getElementById( 'resi' ).value == 'instate' ) {
				document.getElementById( 'instateTuition' ).textContent = 'In-State Tuition: $' + inStateT.toLocaleString() + '.00';
			}
			if ( document.getElementById( 'resi' ).value == 'regional' ) {
				document.getElementById( 'regionalTuition' ).textContent = 'Regional Tuition: $' + regTuition.toLocaleString() + '.00';
			}
			if ( document.getElementById( 'resi' ).value == 'out-of-state' ) {
				document.getElementById( 'out-of-state' ).textContent = 'Out-of-State Tuition: $' + oos.toLocaleString() + '.00';
			}
			document.getElementById( 'registration-fee' ).textContent = 'Registration Fee: $' + registrationFee + '.00';
			document.getElementById( 'transcript-fee' ).textContent = 'Transcript Fee: $' + transcriptFee + '.00';
			document.getElementById( 'student-act-fee' ).textContent = 'Student Activity Fee: $' + studentActFee + '.00';
			document.getElementById( 'document-fee' ).textContent = 'Document Fee: $' + documentFee + '.00';
			document.getElementById( 'course-fee' ).textContent = 'Course Fee: $' + courseFee + '.00';

			//create total array
			const totalArray = [ techFee, registrationFee, studentActFee, transcriptFee, documentFee, courseFee ];
			if ( document.getElementById( 'resi' ).value == 'instate' ) {
				totalArray.push( inStateT );
			}
			if ( document.getElementById( 'resi' ).value == 'regional' ) {
				totalArray.push( regTuition );
			}
			if ( document.getElementById( 'resi' ).value == 'out-of-state' ) {
				totalArray.push( oos );
			}

			console.log( 'Total Array:' + totalArray );
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
	}
}() );
