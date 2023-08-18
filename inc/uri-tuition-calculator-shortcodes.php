<?php
/**
 * URI TUITION CALCULATOR SHORTCODES
 *
 * @package uri-tuition-calculator
 */

 /**
  * Create a shortcode for displaying calculator.
  */

function uri_tuition_calculator_shortcode ( $attributes ) {

	$attributes = shortcode_atts(
		 array(
			 'width' => '',
			 'height' => '',
		 ),
		$attributes,
		$shortcode
		);

ob_start();
		include 'uri-tuition-calculator-display.php';
		ob_end_flush();
}

  add_shortcode( 'tuition-calculator', 'uri_tuition_calculator_shortcode' );