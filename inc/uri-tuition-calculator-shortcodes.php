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
			'title' => 'Tuition & Fees Calculator',
		),
		$attributes,
	);

	ob_start();
	include 'uri-tuition-calculator-display.php';
	return ob_get_clean();
}

add_shortcode('tuition-calculator', 'uri_tuition_calculator_shortcode');


// Pell Grant Calculator Shortcode
function uri_tuition_calculator_pell_grant_shortcode($attributes)
{
	// normalize attribute keys, lowercase
	$attributes = array_change_key_case((array) $attributes, CASE_LOWER);

	// default attributes
	$attributes = shortcode_atts(
		array(
			'title' => 'Summer Federal Pell Grant Estimator',
			'spreadsheet' => null, //URL of sheet Ex. 'https://docs.google.com/spreadsheets/d/[spreadsheetID]/gviz/tq?tqx=out:csv&sheet=[SheetName]'
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
