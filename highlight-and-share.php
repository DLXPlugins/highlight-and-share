<?php // phpcs:ignore

/*
 * Plugin Name: Highlight and Share
 * Plugin URI: https://dlxplugins.com/plugins/highlight-and-share/
 * Description: Allows you to highlight text and enable social sharing to share with services including Twitter,  * Facebook, LinkedIn, Xing, Telegram, Reddit, WhatsApp, email, and others.
 * Author: DLX Plugins
 * Version: 3.6.9
 * Requires at least: 5.1
 * Requires PHP: 7.2
 * Author URI: https://dlxplugins.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: highlight-and-share
 * Contributors: ronalfy
 */

namespace DLXPlugins\HAS;

define( 'HIGHLIGHT_AND_SHARE_VERSION', '3.6.9' );
define( 'HIGHLIGHT_AND_SHARE_FILE', __FILE__ );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * Highlight and Share Main Class
 */
class Highlight_And_Share {
	/**
	 * Highlight and Share instance.
	 *
	 * @var Highlight_And_Share $instance Instance of Highlight and Share class.
	 */
	private static $instance = null;

	/**
	 * Highlight and Share Errors
	 *
	 * @var array $errors Highlight and Share errors.
	 */
	private $errors = false;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the Highlight and Share Class.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return Highlight_And_Share class instance.
	 */
	public static function get_instance() {
		if ( null == self::$instance ) { // phpcs:ignore
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class constructor.
	 *
	 * Initialize plugin and load text domain for internationalization
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function __construct() {

		// Get errors for email.
		$this->errors['could_not_send'] = esc_html__( 'Could not send the e-mail', 'highlight-and-share' );
		$this->errors['invalid_email']  = esc_html__( 'Not a valid e-mail address', 'highlight-and-share' );
		$this->errors['email_sent']     = esc_html__( 'Your email has been sent', 'highlight-and-share' );
		$this->errors['nonce_invalid']  = esc_html__( 'Could not process your request', 'highlight-and-share' );
		$this->errors['name']           = esc_html__( 'You must supply a name', 'highlight-and-share' );

		// i18n initialization.
		load_plugin_textdomain( 'highlight-and-share', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

		// Ajax for form submissions.
		add_action( 'wp_ajax_has_form_submission', array( $this, 'ajax_send_has_email' ) );
		add_action( 'wp_ajax_nopriv_has_form_submission', array( $this, 'ajax_send_has_email' ) );

		// For the icons.
		$this->maybe_migrate_icons();

		// Customizer.
		add_action( 'customize_register', array( $this, 'customizer' ) );

		// Gutenberg block.
		$blocks = new Blocks();
		$blocks->run();
	}

	/**
	 * Migrates icon variable to be positive
	 *
	 * Migrates icon variable to be positive
	 *
	 * @since 2.4.0
	 * @access public
	 */
	private function maybe_migrate_icons() {
		$migrated_option = get_option( 'has_icons_migrated', false );
		if ( false === $migrated_option ) {
			$options = get_option( 'highlight-and-share', false );
			if ( false !== $options && isset( $options['icons'] ) && false === $options['icons'] ) {
				$options['icons'] = true;
				update_option( 'highlight-and-share', $options );
				$this->options = $options;
				update_option( 'has_icons_migrated', 'true' );
			}
		}
	}

	/**
	 * Adds HAS to the customizer
	 *
	 * Adds HAS to the customizer
	 *
	 * @since 2.4.0
	 * @access public
	 *
	 * @param  WP_Customize_Manager $customizer Customizer object.
	 */
	public function customizer( $customizer ) {
		$options = Options::get_plugin_options();
		$customizer->add_section(
			'highlight-and-share',
			array(
				'title'      => __( 'Highlight and Share', 'highlight-and-share' ),
				'priority'   => 120,
				'capability' => 'edit_theme_options',
			)
		);
		// Icons.
		$customizer->add_setting(
			'highlight-and-share[icons]',
			array(
				'capability'        => 'edit_theme_options',
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			'highlight-and-share[icons]',
			array(
				'type'        => 'checkbox',
				'label'       => __( 'Icons Only', 'highlight-and-share' ),
				'section'     => 'highlight-and-share',
				'settings'    => 'highlight-and-share[icons]',
				'priority'    => 10,
				'description' => 'Requires <a href="https://wordpress.org/plugins/better-font-awesome/">Better Font Awesome plugin</a> or equivalent',
			)
		);

		// Themes.
		$customizer->add_setting(
			'highlight-and-share[theme]',
			array(
				'default'           => 'default',
				'sanitize_callback' => array( $this, 'customizer_sanitize_theme_select' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			'highlight-and-share[theme]',
			array(
				'label'   => esc_html__( 'Choose a Theme', 'highlight-and-share' ),
				'section' => 'highlight-and-share',
				'type'    => 'select',
				'choices' => Themes::get_main_themes(),
			)
		);

		// Show Twitter.
		$customizer->add_setting(
			'highlight-and-share[show_twitter]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_twitter'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_twitter]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Twitter Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_twitter]',
					'priority' => 10,
				)
			)
		);

		// Show Facebook.
		$customizer->add_setting(
			'highlight-and-share[show_facebook]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_facebook'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_facebook]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Facebook Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_facebook]',
					'priority' => 10,
				)
			)
		);

		// Show LinkedIn.
		$customizer->add_setting(
			'highlight-and-share[show_linkedin]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_linkedin'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_linkedin]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable LinkedIn Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_linkedin]',
					'priority' => 10,
				)
			)
		);

		// Show OK.
		$customizer->add_setting(
			'highlight-and-share[show_ok]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_ok'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_ok]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Odnoklassniki (Однокла́ссники) Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_ok]',
					'priority' => 10,
				)
			)
		);

		// Show VKontakte.
		$customizer->add_setting(
			'highlight-and-share[show_vk]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_vk'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_vk]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable VKontakte Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_vk]',
					'priority' => 10,
				)
			)
		);

		// Show Xing.
		$customizer->add_setting(
			'highlight-and-share[show_xing]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_xing'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_xing]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Xing Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_xing]',
					'priority' => 10,
				)
			)
		);

		// Show Whatsapp.
		$customizer->add_setting(
			'highlight-and-share[show_whatsapp]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_whatsapp'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_whatsapp]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable WhatsApp Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_whatsapp]',
					'priority' => 10,
				)
			)
		);

		// Show Email.
		$customizer->add_setting(
			'highlight-and-share[show_email]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_email'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_email]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Email Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_email]',
					'priority' => 10,
				)
			)
		);

		// Show Copy.
		$customizer->add_setting(
			'highlight-and-share[show_copy]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_copy'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_copy]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Copy', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_copy]',
					'priority' => 10,
				)
			)
		);
	}

	/**
	 * Sanitizes an input variable
	 *
	 * Sanitizes an input variable
	 *
	 * @since 2.4.0
	 * @access public
	 *
	 * @param bool $input Whether the input is checked or not.
	 *
	 * @return bool Whether the input is checked or not
	 */
	public function customizer_sanitize_checkbox( $input ) {

		// returns true if checkbox is checked.
		return ( $input ) ? true : false;
	}

	/**
	 * Sanitizes a select variable
	 *
	 * Sanitizes a select variable
	 *
	 * @since 2.4.0
	 * @access public
	 *
	 * @param string               $input Value of the settings.
	 * @param WP_Customize_Setting $setting Customizer setting object.
	 *
	 * @return bool Whether the input is checked or not
	 */
	public function customizer_sanitize_theme_select( $input, $setting ) {

		// input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only.
		$input = sanitize_key( $input );

		// get the list of possible select options.
		$choices = $setting->manager->get_control( $setting->id )->choices;

		// return input if valid or return default option.
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );

	}

	/**
	 * Processes an Ajax Request for emails
	 *
	 * Processes an Ajax Request for emails
	 *
	 * @since 2.3.5
	 * @access public
	 */
	public function ajax_send_has_email() {

		// Get Ajax data.
		parse_str( filter_input( INPUT_POST, 'data' ), $ajax_data );

		// Set up initial return array.
		$return = array(
			'errors' => false,
		);

		// Check the nonce.
		if ( ! wp_verify_nonce( $ajax_data['has_email_nonce'], 'has_email_nonce' ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'Nonce could not be verified.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Set Email Variables.
		$email_to            = trim( sanitize_text_field( $ajax_data['has_target_email'] ) );
		$email_from          = trim( sanitize_text_field( $ajax_data['has_source_email'] ) );
		$email_name          = trim( urldecode( $ajax_data['has_source_name'] ) );
		$email_subject       = trim( urldecode( $ajax_data['has_email_subject'] ) );
		$email_selected_text = trim( urldecode( $ajax_data['has_selected_text'] ) );

		// Set title and url variables.
		$title = trim( urldecode( $ajax_data['has_source_title'] ) );
		$url   = trim( urldecode( $ajax_data['has_source_url'] ) );

		// Check emails to destination.
		if ( ! is_email( $email_to ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'The Send email address is not a valid email address.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check emails from destination.
		if ( ! is_email( $email_from ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'Your email address is not a valid email address.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check emails from destination.
		if ( empty( $email_name ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'Your name cannot be empty.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check Subject.
		if ( empty( $email_subject ) ) {
			$email_subject = __( '[Shared Post]', 'highlight-and-share' ) . ' ' . $title;
		}

		// Translators %s is the name, and %s is the email address.
		$message  = sprintf( __( '%s (%s) wants to share a link with you.', 'highlight-and-share' ), esc_html( $email_name ), esc_html( $email_from ) ) . "\r\n\n"; // phpcs:ignore
		$message .= sprintf( '"%s"', esc_html( $email_selected_text ) ) . "\r\n\r\n";
		$message .= sprintf( '%s', esc_html( $title ) ) . "\r\n";
		$message .= sprintf( '%s', esc_url( $url ) ) . "\r\n\r\n";

		$headers   = array();
		$headers[] = sprintf( 'From: %s <%s>', $email_name, $email_from );

		wp_mail( $email_to, $email_subject, $message, $headers );

		$return['message_title']        = __( 'This post has been shared!', 'highlight-and-share' );
		$return['message_body']         = sprintf( __( 'You have shared this post with %s', 'highlight-and-share' ), $email_to ); // phpcs:ignore
		$return['message_subject']      = __( '[Shared Post]', 'highlight-and-share' ) . ' ' . $title;
		$return['message_source_name']  = $email_name;
		$return['message_source_email'] = $email_from;
		wp_send_json( $return );
	}


	/**
	 * Get an error message
	 *
	 * Get an error message based on a passed key
	 *
	 * @since 6.0.0
	 * @access public
	 *
	 * @param  string $key Key to retrieve.
	 * @return string key value
	 */
	public function get_error( $key ) {
		if ( isset( $this->errors[ $key ] ) ) {
			return $this->errors[ $key ];
		} else {
			return '';
		}
	}

	

	
}

add_action( 'plugins_loaded', 'DLXPlugins\HAS\highlightshare_instantiate' );
/**
 * Instantiate the HAS class.
 */
function highlightshare_instantiate() {
	Highlight_And_Share::get_instance();

	// Init admin panel settings.
	$admin_panel = new Admin();
	$admin_panel->run();

	// Register hashtags taxonomy.
	$hashtags = new Hashtags();
	$hashtags->run();

	// Frontend scripts/actions.
	$frontend = new Frontend();
	$frontend->run();
}
