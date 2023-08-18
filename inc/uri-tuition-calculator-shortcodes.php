<?php
/**
 * URI TUITION CALCULATOR SHORTCODES
 *
 * @package uri-tuition-calculator
 */

 /**
  * Create a shortcode for displaying calculator.
  */

function uri_tuition_calculator_shortcode ($attributes) {
 
// default attributes
$attributes = shortcode_atts( array(
    'before' => '<div class="uri-tuition-calculator">',
    'after' => '</div>',
), $attributes, $shortcode );

ob_start();
		include 'inc/uri-tuition-calculator-display.php';
		ob_end_flush();
}

  add_shortcode( 'tuition-calculator', 'uri_tuition_calculator_shortcode' );