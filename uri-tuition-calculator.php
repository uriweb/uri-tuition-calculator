<?php
/**
 * Plugin Name: URI Tuition Calculator
 * Plugin URI: http://www.uri.edu
 * Description: A calculator for course tuition and fees
 * Version: 0.1.0
 * Author: URI Web Communications
 * Author URI: https://today.uri.edu/
 *
 * @author: Brandon Fuller <bjcfuller@uri.edu>
 * @author: Alexandra Gauss <alexandra_gauss@uri.edu>
 * @package uri-tuition-calculator
 */

// Block direct requests
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Include css and js
 */
function uri_tuition_calculator_enqueues() {

	wp_register_style( 'uri-tuition-calculator-css', plugins_url( '/css/style.built.css', __FILE__ ) );
	wp_enqueue_style( 'uri-tuition-calculator-css' );

	wp_register_script( 'uri-tuition-calculator-js', plugins_url( '/js/script.built.js', __FILE__ ) );
	wp_enqueue_script( 'uri-tuition-calculator-js' );

}
add_action( 'wp_enqueue_scripts', 'uri_tuition_calculator_enqueues' );
