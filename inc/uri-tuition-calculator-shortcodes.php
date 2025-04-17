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
			'calc_name' => '', // Takes 'summer', 'jterm', 'pellgrant' 
			'title' => 'Tuition and Fees Calculator',
			'spreadsheet_id' => '', // id of the spreadsheet
			'semester' => '', // ex. "Spring 2025"
			'sheet_name' => '',
				),
		$attributes,
	);


	// If summer calculator 
	if( $attributes['calc_name'] == 'summer') {
		$semester = $attributes['semester'];
		$spreadsheet = esc_url('https://docs.google.com/spreadsheets/d/'. $attributes['spreadsheet_id'] . '/gviz/tq?tqx=out:csv&sheet='. $attributes['sheet_name']);
	//localize scripts 
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'summer',
	   array(
		   'semester' => $semester,
		   'spreadsheet' => $spreadsheet
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
		$spreadsheet = esc_url('https://docs.google.com/spreadsheets/d/'. $attributes['spreadsheet_id'] . '/gviz/tq?tqx=out:csv&sheet='. $attributes['sheet_name']);
	//localize scripts 
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'jterm',
	   array(
		   'semester' => $semester,
		   'spreadsheet' => $spreadsheet
	   )
	   );

		//Include display
	ob_start();
	include 'utc-display-jterm.php';
	return ob_get_clean();
	}

	// If pellgrant calculator
	if( $attributes['calc_name'] == 'pellgrant') {
		$attributes['title'] = 'Summer Federal Pell Grant Estimator';
		$semester = $attributes['semester'];
		$spreadsheet = esc_url('https://docs.google.com/spreadsheets/d/'. $attributes['spreadsheet_id'] . '/gviz/tq?tqx=out:csv&sheet='. $attributes['sheet_name']);
	//localize scripts 
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'pellgrant',
	   array(
		   'semester' => $semester,
		   'spreadsheet' => $spreadsheet
	   )
	   );

// Include display 
ob_start();
	include 'utc-display-pell-grant.php';
	return ob_get_clean();
	}

	
}

add_shortcode('tuition-calculator', 'uri_tuition_calculator_shortcode');

