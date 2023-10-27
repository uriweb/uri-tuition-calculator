<?php
/**
 * Plugin Name: URI Tuition Calculator
 * Plugin URI: http://www.uri.edu
 * Description: A calculator for course tuition and fees
 * Version: 1.2.2
 * Author: URI Web Communications
 * Author URI: https://www.uri.edu/
 *
 * @author: Brandon Fuller <bjcfuller@uri.edu>
 * @author: Alexandra Gauss <alexandra_gauss@uri.edu>
 * @author: Sarah Pucino <sarah.pucino@uri.edu>
 * @package uri-tuition-calculator
 */

// Block direct requests
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

define( 'URI_TUITION_CALCULATOR_PATH', plugin_dir_path( __FILE__ ) );
define( 'URI_TUITION_CALCULATOR_URL', str_replace( '/assets', '/', plugins_url( 'assets', __FILE__ ) ) );

/**
 * Returns version from package.json to be used for cache busting
 *
 * @return str
 */
function uri_tuition_calculator_cache_buster() {
	static $cache_buster;
	if ( empty( $cache_buster ) && function_exists( 'get_plugin_data' ) ) {
		$values = get_plugin_data( URI_TUITION_CALCULATOR_PATH . 'uri-tuition-calculator.php', false );
		$cache_buster = $values['Version'];
	} else {
		$cache_buster = gmdate( 'Ymd', strtotime( 'now' ) );
	}
	return $cache_buster;
}

// Include the admin settings screen
include_once( URI_TUITION_CALCULATOR_PATH . 'inc/uri-tuition-calculator-settings.php' );



/**
 * Include css and js
 */
function uri_tuition_calculator_enqueues() {

	wp_register_style( 'uri-tuition-calculator-css', plugins_url( '/css/style.built.css', __FILE__ ), array(), uri_tuition_calculator_cache_buster(), 'all' );
	wp_enqueue_style( 'uri-tuition-calculator-css' );

	wp_register_script( 'uri-tuition-calculator-js', plugins_url( '/js/script.built.js', __FILE__ ), array(), uri_tuition_calculator_cache_buster(), true );
	wp_enqueue_script( 'uri-tuition-calculator-js' );

	$spreadsheet = get_option( 'uri_tuition_calculator_spreadsheet' );
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'spreadsheet',
	   array(
		   'text' => $spreadsheet,
	   )
	   );
	   $term = get_option( 'uri_tuition_calculator_term' );
	wp_localize_script(
		'uri-tuition-calculator-js',
	   'term',
	   array(
		   'text' => $term,
	   )
	   );
}
add_action( 'wp_enqueue_scripts', 'uri_tuition_calculator_enqueues' );

// Include shortcodes
include( URI_TUITION_CALCULATOR_PATH . 'inc/uri-tuition-calculator-shortcodes.php' );
