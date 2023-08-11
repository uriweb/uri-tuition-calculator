<?php
/**
 * Plugin Name: URI Courses Calculator
 * Plugin URI: http://www.uri.edu
 * Description: A calculator for courses and fees
 * Version: 0.1.0
 * Author: URI Web Communications
 * Author URI: https://today.uri.edu/
 *
 * @author: Brandon Fuller <bjcfuller@uri.edu>
 * @author: Alexandra Gauss <alexandra_gauss@uri.edu>
 * @package uri-courses-calculator
 */

// Block direct requests
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Include css and js
 */
function uri_courses_calculator_enqueues() {

	wp_register_style( 'uri-courses-calculator-css', plugins_url( '/css/style.built.css', __FILE__ ) );
	wp_enqueue_style( 'uri-courses-calculator-css' );

	wp_register_script( 'uri-courses-calculator-js', plugins_url( '/js/script.built.js', __FILE__ ) );
	wp_enqueue_script( 'uri-courses-calculator-js' );

}
add_action( 'wp_enqueue_scripts', 'uri_courses_calculator_enqueues' );
