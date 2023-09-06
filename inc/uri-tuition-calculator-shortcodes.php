<?php
/**
 * URI TUITION CALCULATOR SHORTCODES
 *
 * @package uri-tuition-calculator
 */

 /**
  * Create a shortcode for displaying calculator.
  */
function uri_tuition_calculator_shortcode( $attributes ) {

	$attributes = shortcode_atts(
		 array(
			 'title' => 'Tuition & Fees Calculator',
		 ),
		$attributes,
		$shortcode
		);

	ob_start();
		include 'uri-tuition-calculator-display.php';
		return ob_get_clean();

}

  add_shortcode( 'tuition-calculator', 'uri_tuition_calculator_shortcode' );
