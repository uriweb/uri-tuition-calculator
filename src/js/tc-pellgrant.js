/* eslint-disable no-alert */
/* eslint-disable no-undef */
/**
 * Pell Grant Calculator
 */

( function() {
	'use strict';

	window.addEventListener( 'DOMContentLoaded', function() {
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
			const allSelectIds = [ 'resi', 'p-award', 'c-amount', 'courseNumber' ];

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
					calculateCostPG( data );
				} else {
					alert( 'Please select all options.' );
				}
			}
		}
	}

	function creditDropdown() {
		const creditOptions = document.getElementById( 'c-amount' );

		for ( let i = 1; i <= 11; i++ ) {
			const option = document.createElement( 'option' );
			option.value = i;
			option.text = i;
			creditOptions.add( option );
		}
		const lastOption = document.createElement( 'option' );
		lastOption.value = 12;
		lastOption.text = '12 or more';
		creditOptions.add( lastOption );
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

		//hook up analytics
		const e = {
			event: 'tuitionCalculatorSubmit',
			term: 'pellgrant',
			courses: dropDownValues,
			residency: document.getElementById( 'resi' ).value,
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
			//Cap spring credits at 12
			const springCredits = Math.min( 12, document.getElementById( 'c-amount' ).value );

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

			//Get percentage for Spring credit total using intensity map
			const pellSpringPercent = Number( intensityMap.get( springCredits ) );

			//Divide Pell Award amount by percentage for Spring credit total. Cap it at 3697
			const springAwardAmount = Math.min( Math.round( pellAward / pellSpringPercent ), 3697 );

			//Cap summer credit total at 12 for formula
			const summerCreditTotal = Math.min( 12, summerCredits );

			//Get percentage for Summer credit total
			const pellSummerPercent = Math.min( 1, intensityMap.get( summerCreditTotal ) );

			//Multiply Spring Award Amount by summer percentage. Not to exceed 3697
			const calcSummerAward = Math.round( springAwardAmount * pellSummerPercent );
			const estimatedSummerPellAward = Math.min( calcSummerAward, 3697 );


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

			document.getElementById( 'summer-credit-total' ).textContent = 'Summer Credits: ' + summerCredits;

			document.getElementById( 'max-award' ).textContent = 'Estimated Maximum Federal Pell Grant Eligibility: $' + springAwardAmount.toLocaleString() + '.00 *';

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

			const totalCost = totalArray.reduce( totalFinal );

			//Cost with award, but not less than 0
			const totalWithPG = Number( Math.max( 0, totalCost - estimatedSummerPellAward ) );

			//Display total
			document.getElementById( 'tuition-total' ).style.display = 'block';
			document.getElementById( 'tuition-total' ).textContent = 'Tuition and Fees Subtotal: $' + totalCost.toLocaleString() + '.00';
			//Display Pell Award
			document.getElementById( 'max-note' ).textContent = '*If taking 12 or more credits for the summer semester.';
			//document.getElementById( 'max-note' ).textContent = '*Estimated Summer Federal Pell Grant eligibility if taking 12+ summer credits: $' + springAwardAmount.toLocaleString() + '.00';
			document.getElementById( 'summer-award' ).textContent = 'Estimated Federal Pell Grant Award for ' + summerCredits + ' Summer Credit(s): $' + estimatedSummerPellAward.toLocaleString() + '.00';
			document.getElementById( 'new-total' ).textContent = 'Estimated Summer Semester Cost: $' + totalWithPG.toLocaleString() + '.00';

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
