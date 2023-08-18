<?php
/**
 * Create admin settings menu for the URI Tuition Calculator Plugin
 *
 * @package uri-tuition-calculator
 */


/**
 * Register settings
 */
function uri_tuition_calculator_register_settings() {

	register_setting(
	   'uri_tuition_calculator',
	   'uri_tuition_calculator_spreadsheet',
	   'uri_tuition_calculator_sanitize_url'
	);

	add_settings_section(
	   'uri_tuition_calculator_settings',
	   __( 'URI Tuition Calculator Settings', 'uri' ),
	  'uri_tuition_calculator_settings_section',
	  'uri_tuition_calculator'
	);

	// register field
	add_settings_field(
	   'uri_tuition_calculator_spreadsheet', // id: as of WP 4.6 this value is used only internally
	  __( 'URL of Spreadsheet', 'uri' ), // title
	  'uri_tuition_calculator_spreadsheet_field', // callback
	  'uri_tuition_calculator', // page
	  'uri_tuition_calculator_settings', // section
	  array( // args
		  'label_for' => 'uri-tuition-calculator-field-spreadsheet',
		  'class' => 'uri_tuition_calculator_row',
	  )
	  );
}

 add_action( 'admin_init', 'uri_tuition_calculator_register_settings' );

 /**
  * Callback for a settings section
  *
  * @param arr $args has the following keys defined: title, id, callback.
  * @see add_settings_section()
  */
function uri_tuition_calculator_settings_section( $args ) {
	$intro = 'URI Tuition Calculator calculates course tuition and fees.';
	echo '<p id="' . esc_attr( $args['id'] ) . '">' . esc_html_e( $intro, 'uri' ) . '</p>';
}

/**
 * Add the settings page to the settings menu
 *
 * @see https://developer.wordpress.org/reference/functions/add_options_page/
 */
function uri_tuition_calculator_settings_page() {
	add_options_page(
		__( 'URI Tuition Calculator Settings', 'uri' ),
		__( 'URI Tuition Calculator', 'uri' ),
		'manage_options',
		'uri-tuition-calculator-settings',
		'uri_tuition_calculator_settings_page_html'
	);
}
add_action( 'admin_menu', 'uri_tuition_calculator_settings_page' );

/**
 * Callback to render the HTML of the settings page.
 * Renders the HTML on the settings page
 */
function uri_tuition_calculator_settings_page_html() {
	// check user capabilities
	// on web.uri, we have to leave this pretty loose
	// because web com doesn't have admin privileges.
	if ( ! current_user_can( 'manage_options' ) ) {
		echo '<div id="setting-message-denied" class="updated settings-error notice is-dismissible"> 
<p><strong>You do not have permission to save this form.</strong></p>
<button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>';
		return;
	}
	?>
		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
			<form action="options.php" method="post">
				<?php
					// output security fields for the registered setting "uri_tuition_calculator"
					settings_fields( 'uri_tuition_calculator' );
					// output setting sections and their fields
					// (sections are registered for "uri_tuition_calculator", each field is registered to a specific section)
					do_settings_sections( 'uri_tuition_calculator' );
					// output save settings button
					submit_button( 'Save Settings' );
				?>
			</form>
		</div>
	<?php
}

/**
 * Field callback
 * outputs the field
 *
 * @see add_settings_field()
 * @see uri_today_field_domain_callback()
 */
function uri_tuition_calculator_spreadsheet_field( $args ) {
	// get the value of the setting we've registered with register_setting()
	$setting = get_option( 'uri_tuition_calculator_spreadsheet' );
	// output the field
	?>
		<input type="text" class="regular-text" aria-describedby="uri-tuition-calculator-field-spreadsheet" name="uri_tuition_calculator_spreadsheet" id="uri-tuition-calculator-field-spreadsheet" value="<?php print ( $setting !== false ) ? esc_attr( $setting ) : ''; ?>">
		<p class="uri-tuition-calculator-field-spreadsheet">
			<?php
				esc_html_e( 'Provide the URL for the spreadsheet.', 'uri' );
				echo '<br />';
				esc_html_e( 'For example: https://docs.google.com/spreadsheets/d/[spreadsheetID]/pub?output=csv', 'uri' );
			?>
		</p>
	<?php
}
