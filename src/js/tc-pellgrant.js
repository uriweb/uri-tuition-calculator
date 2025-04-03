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
		document.getElementById( 'addCourse' ).addEventListener( 'click', addCoursesPellGrant );

		//Calculate cost when button is clicked
		document.getElementById( 'calc' ).addEventListener( 'click', checkFirstPG );

		//Make sure residency status is checked
		function checkFirstPG() {
			if ( document.getElementById( 'resi' ).value === 'disabled' ) {
				// eslint-disable-next-line no-alert
				alert( 'Please select your residency status.' );
			} else {
				calculateCostPG( data );
			}
		}
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

	function calculateCostPG( data ) {
		//set variables
		const csvData = data.data;
		const dropDownValues = [ courseNumber.value, courseNumber2.value, courseNumber3.value, courseNumber4.value ];
		//Set empty array to collect selected course cost data
		const courseDataSet = [];

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

		displayCostsPG( courseDataSet );

		document.querySelector( '.yourCourses' ).textContent = 'Estimated Costs for: ' + selectedCourses.join( ', ' );

		//Replace "Calculate Cost" button with "Reset Calculator"
		document.getElementById( 'reload' ).style.display = 'block';
		document.getElementById( 'calc' ).style.display = 'none';

		function displayCostsPG( courseData ) {
			let techFee = 0,
				courseFee = 0,
				inStateT = 0,
				regTuition = 0,
				oos = 0,
				summerCredits = 0;

			const registrationFee = 30;
			const pellAward = document.getElementById( 'p-award' ).value;
			const springCredits = Number( document.getElementById( 'c-amount' ).value );
			const intensityMap = new Map( [
				[ 12, 1 ],
				[ 11, .92 ],
				[ 10, .83 ],
				[ 9, .75 ],
				[ 8, .67 ],
				[ 7, .58 ],
				[ 6, .50 ],
				[ 5, .42 ],
				[ 4, .33 ],
				[ 3, .25 ],
				[ 2, .17 ],
				[ 1, .08 ],
			] );

			//Loop through the courses selected and add their cost data
			for ( let i = 0; i < courseData.length; i++ ) {
				for ( let x = 0; x < courseData[ i ].length; x++ ) {
					techFee += Number( courseData[ i ][ x ][ 'Technology Fee' ] );
					inStateT += Number( courseData[ i ][ x ][ 'Instate Tuition' ] );
					regTuition += Number( courseData[ i ][ x ][ 'Reg. Tuition' ] );
					oos += Number( courseData[ i ][ x ][ 'OOS Tuition' ] );
					courseFee += Number( courseData[ i ][ x ][ 'Course Fee' ] );
					summerCredits += Number( courseData[ i ][ x ][ 'Min Units' ] );
				}
			}

			//Percentage for Spring credit total
			const pellSpringPercent = intensityMap.get( springCredits );

			//Divide Pell Award amount by percentage for Spring credit total
			const springAwardAmount = pellAward / pellSpringPercent;

			//Get percentage for Summer credit total 
			const pellSummerPercent = intensityMap.get( summerCredits );

			//Multiply Spring Award Amount by summer percentage
			const estimatedSummerPellAward = Math.round(springAwardAmount * pellSummerPercent);


			//Display breakdown of tuition cost
			if ( document.getElementById( 'resi' ).value === 'instate' ) {
				document.getElementById( 'instateTuition' ).textContent = 'In-State Tuition: $' + inStateT.toLocaleString() + '.00';
			}
			if ( document.getElementById( 'resi' ).value === 'regional' ) {
				document.getElementById( 'regionalTuition' ).textContent = 'Regional Tuition: $' + regTuition.toLocaleString() + '.00';
			}
			if ( document.getElementById( 'resi' ).value === 'out-of-state' ) {
				document.getElementById( 'out-of-state' ).textContent = 'Out-of-State Tuition: $' + oos.toLocaleString() + '.00';
			}

			//Display fees
			if ( courseFee !== 0 ) {
				document.getElementById( 'course-fee' ).textContent = 'Course Fee: $' + courseFee + '.00';
			}
			if ( techFee !== 0 ) {
				document.getElementById( 'techFee' ).textContent = 'Technology Fee: $' + techFee + '.00';
			}
			document.getElementById( 'registration-fee' ).textContent = 'Registration Fee: $' + registrationFee + '.00';

			//Display Pell Award
			document.getElementById( 'award-amount' ).textContent = 'Estimated Federal Pell Grant Award for Summer: $' + estimatedSummerPellAward + '.00';

			document.getElementById( 'summer-credit-total' ).textContent = 'Total Summer Credits: ' + summerCredits;

			//create total array
			const totalArray = [ techFee, courseFee, registrationFee ];
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
		}
	}

	function resetCalc() {
		location.reload();
	}
}() );
