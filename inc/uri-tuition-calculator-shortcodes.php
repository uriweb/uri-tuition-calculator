<?php

/**
 * URI TUITION CALCULATOR SHORTCODES
 *
 * @package uri-tuition-calculator
 */

/**
 * Create a shortcode for displaying calculator.
 */
function uri_tuition_calculator_shortcode($attributes)
{
	// normalize attribute keys, lowercase
	$attributes = array_change_key_case((array) $attributes, CASE_LOWER);

	// default attributes
	$attributes = shortcode_atts(
		array(
			'calc_name' => null, // Takes 'summer', 'jterm', 'pellgrant' 
			'title' => 'Tuition and Fees Calculator',
			'spreadsheet' => null, // URL of sheet Ex. 'https://docs.google.com/spreadsheets/d/[spreadsheetID]/gviz/tq?tqx=out:csv&sheet=[SheetName]'
			'semester' => null, // ex. "Spring 2025"
		),
		$attributes,
	);

	//localize script for spreadsheet
	$spreadsheet = $attributes['spreadsheet'];
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'spreadsheet',
	   array(
		   'url' => $spreadsheet,
	   )
	   );

	// If summer calculator 
	if( $attributes['calc_name'] == 'summer') {
		$semester = $attributes['semester'];
	//localize scripts 
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'summer',
	   array(
		   'semester' => $semester
	   )
	   );

	   //Include display 
	   ob_start();
	include 'utc-display-summer.php';
	return ob_get_clean();
	}


	// If jterm calculator 
	if( $attributes['calc_name'] == 'jterm') {
		//localize scripts 
		$semester = $attributes['semester'];
	//localize scripts 
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'jterm',
	   array(
		   'semester' => $semester
	   )
	   );

		//Include display
	ob_start();
	include 'utc-display-jterm.php';
	return ob_get_clean();
	}

	// If pellgrant calculator
	if( $attributes['calc_name'] == 'pellgrant') {
		$attributes['title'] == 'Summer Federal Pell Grant Estimator';
		$semester = $attributes['semester'];
	//localize scripts 
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'pellgrant',
	   array(
		   'semester' => $semester
	   )
	   );

// Include display 
ob_start();
	include 'utc-display-pell-grant.php';
	return ob_get_clean();
	}

	
}

add_shortcode('tuition-calculator', 'uri_tuition_calculator_shortcode');


// Pell Grant Calculator Shortcode
/*
function uri_tuition_calculator_pell_grant_shortcode($attributes)
{
	// normalize attribute keys, lowercase
	$attributes = array_change_key_case((array) $attributes, CASE_LOWER);

	// default attributes
	$attributes = shortcode_atts(
		array(
			'title' => 'Summer Federal Pell Grant Estimator',
			'spreadsheet' => null, //URL of sheet Ex. 'https://docs.google.com/spreadsheets/d/[spreadsheetID]/gviz/tq?tqx=out:csv&sheet=[SheetName]'
			'semester' => "Summer", // Ex 'Summer 2025'
		),
		$attributes,
	);

	$spreadsheet = $attributes['spreadsheet'];

	//localize scripts here 
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'pellgrant',
	   array(
		   'spreadsheet' => $spreadsheet,
	   )
	   );

	//include js file here 

	ob_start();
	include 'pell-grant-display.php';
	return ob_get_clean();

}

add_shortcode('pell-grant-calculator', 'uri_tuition_calculator_pell_grant_shortcode');
*/
