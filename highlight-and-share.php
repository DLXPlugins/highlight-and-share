<?php // phpcs:ignore

/*
Plugin Name: Highlight and Share
Plugin URI: https://mediaron.com/highlight-and-share
Description: Highlight text and share via Twitter or Facebook and many more
Author: MediaRon LLC
Version: 3.3.0
Requires at least: 5.5
Author URI: https://mediaron.com
Contributors: ronalfy
Text Domain: highlight-and-share
Domain Path: /languages
*/

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
	 * Highlight and Share Options
	 *
	 * @var array $options Highlight and Share options.
	 */
	private $options = false;

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
		add_action( 'init', array( $this, 'init' ), 9 );

		add_action( 'wp', array( $this, 'wp_loaded' ), 15 );

		define( 'HIGHLIGHT_AND_SHARE_VERSION', '3.3.0' );

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
		if ( function_exists( 'register_block_type' ) ) {
			include 'has-click-to-share.php';
		}
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
		$options = $this->get_plugin_options();
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
				'choices' => array(
					'off'          => esc_html__( 'Off', 'highligh-and-share' ),
					'default'      => esc_html__( 'Default', 'highlight-and-share' ),
					'brand-colors' => esc_html__( 'Brand Colors (Icons Only)', 'highlight-and-share' ),
					'black'        => esc_html__( 'Black (Icons Only)', 'highlight-and-share' ),
					'white'        => esc_html__( 'White (Icons Only)', 'highlight-and-share' ),
					'cyan'         => esc_html__( 'Cyan (Icons Only)', 'highlight-and-share' ),
					'magenta'      => esc_html__( 'Magenta (Icons Only)', 'highlight-and-share' ),
					'blue'         => esc_html__( 'Blue (Icons Only)', 'highlight-and-share' ),
					'green'        => esc_html__( 'Green (Icons Only)', 'highlight-and-share' ),
				),
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
			new WP_Customize_Control(
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
			new WP_Customize_Control(
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
			new WP_Customize_Control(
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
			new WP_Customize_Control(
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
			new WP_Customize_Control(
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
			new WP_Customize_Control(
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
			new WP_Customize_Control(
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

	/**
	 * Main plugin initialization
	 *
	 * Initialize admin menus, options,and scripts
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see __construct
	 */
	public function init() {
		$settings = $this->get_plugin_options();

		// Admin Settings.
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'init_admin_settings' ) );

		// Plugin settings.
		add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'add_settings_link' ) );

	}

	/**
	 * When WP is loaded, output scripts.
	 */
	public function wp_loaded() {
		// Disable if on a feed.
		if ( is_feed() ) {
			return;
		}

		$settings = $this->get_plugin_options();

		// Skip loading if both twitter/facebook are turned off.
		$show_facebook = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );
		$show_twitter  = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );
		$show_linkedin = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
		$show_email    = (bool) apply_filters( 'has_show_email', $settings['show_email'] );
		$show_copy     = (bool) apply_filters( 'has_show_copy', $settings['show_email'] );
		if ( ! $show_facebook && ! $show_twitter && ! $show_linkedin && ! $show_email && ! $show_copy ) {
			return;
		}

		// Disable if mobile.
		if ( wp_is_mobile() ) {
			if ( (bool) apply_filters( 'has_enable_mobile', true ) ) {
				add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_mobile' ) );
			} else {
				return;
			}
		}

		// Load scripts.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );

		// Load html.
		add_action( 'wp_footer', array( $this, 'add_footer_html' ) );

		// Load content area.
		if ( apply_filters( 'has_enable_content', (bool) $settings['enable_content'] ) ) {
			add_filter( 'the_content', array( $this, 'content_area' ) );
		}
		if ( apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] ) ) {
			add_filter( 'the_excerpt', array( $this, 'excerpt_area' ) );
		}
	}

	public function add_footer_html() {
		$settings       = $this->get_plugin_options();
		$html           = '<div class="highlight-and-share-wrapper">';
		$click_to_share = '<div class="highlight-and-share-wrapper-cts highlight-and-share-wrapper">';
		$inline_share   = '<div class="highlight-and-share-wrapper-inline highlight-and-share-wrapper">';
		if ( $settings['show_twitter'] && '' !== $settings['twitter'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use>&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string         = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html          .= $string;
				$click_to_share .= $string;
				$inline_share  .= $string;
			}
		} elseif ( $settings['show_twitter'] && '' === $settings['twitter'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use>&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}
		if ( $settings['show_facebook'] ) {
			if ( ! $settings['icons'] ) {
				// Note, you must be on a publicly accesible URL to use this button.
				if ( 0 === $settings['facebook_app_id'] ) {
					$html .= '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) ) ) . '</a></div>';
				} else {
					$tring           = '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' . esc_attr( $settings['facebook_app_id'] ) . '&display=popup&amp;quote=%text%&href=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) ) ) . '</a></div>';
					$html           .= $string;
					$click_to_share .= $string;
					$inline_share   .= $string;
				}
			} else {
				if ( 0 === $settings['facebook_app_id'] ) {
					$html .= '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg><span class="has-text">' . esc_html( apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				} else {
					$string          = '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' . esc_attr( $settings['facebook_app_id'] ) . '&display=popup&amp;quote=%text%&href=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
					$html           .= $string;
					$click_to_share .= $string;
					$inline_share   .= $string;
				}
			}
		}
		if ( $settings['show_linkedin'] ) {
			if ( ! $settings['icons'] ) {
				// Note, you must be on a publicly accesible URL to use this button
				$html .= '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-linkedin-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) ) ) . '</a></div>';
			} else {
				$html .= '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-linkedin-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
			}
		}

		if ( $settings['show_xing'] ) {
			if ( ! $settings['icons'] ) {
				$html .= '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-xing-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) ) ) . '</a></div>';
			} else {
				$html .= '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-xing-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
			}
		}

		if ( $settings['show_whatsapp'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="https://wa.me/?text=%text%: ' . '%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-whatsapp-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="https://wa.me/?text=%text%: ' . '%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-whatsapp-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}
		if ( $settings['show_copy'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_copy" style="display: none;" data-type="copy"><a href="#"><svg class="has-icon"><use xlink:href="#has-copy-icon"></use>&nbsp;' . esc_html( apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $tring;
			} else {
				$string          = '<div class="has_copy" style="display: none;" data-type="copy"><a href="#"><svg class="has-icon"><use xlink:href="#has-copy-icon"></use><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}

		if ( $settings['show_email'] ) {
			if ( ! $settings['icons'] ) {
				// Note, you must be on a publicly accesible URL to use this button
				$string          = '<div class="has_email" style="display: none;" data-type="email" data-title="%title%" data-url="%url%"><a href="' . esc_url( admin_url( 'admin-ajax.php' ) ) . '" target="_blank"><svg class="has-icon"><use xlink:href="#has-email-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_email_text', _x( 'E-mail', 'E-mail share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_email" style="display: none;" data-type="email" data-title="%title%" data-url="%url%"><a href="' . esc_url( admin_url( 'admin-ajax.php' ) ) . '" target="_blank"><svg class="has-icon"><use xlink:href="#has-email-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_email_text', _x( 'E-mail', 'E-mail share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}
		$click_to_share .= '</div>';
		$inline_share   .= '</div>';
		$html           .= '</div><!-- #highlight-and-share-wrapper -->';
		echo $inline_share;
		echo $click_to_share;
		echo $html;
		?>
		<svg width="0" height="0" class="hidden">
			<symbol aria-hidden="true" data-prefix="fas" data-icon="twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-twitter-icon">
				<path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="has-facebook-icon">
				<path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="at" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-email-icon">
				<path fill="currentColor" d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="linkedin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-linkedin-icon">
				<path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="xing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" id="has-xing-icon">
				<path fill="currentColor" d="M162.7 210c-1.8 3.3-25.2 44.4-70.1 123.5-4.9 8.3-10.8 12.5-17.7 12.5H9.8c-7.7 0-12.1-7.5-8.5-14.4l69-121.3c.2 0 .2-.1 0-.3l-43.9-75.6c-4.3-7.8.3-14.1 8.5-14.1H100c7.3 0 13.3 4.1 18 12.2l44.7 77.5zM382.6 46.1l-144 253v.3L330.2 466c3.9 7.1.2 14.1-8.5 14.1h-65.2c-7.6 0-13.6-4-18-12.2l-92.4-168.5c3.3-5.8 51.5-90.8 144.8-255.2 4.6-8.1 10.4-12.2 17.5-12.2h65.7c8 0 12.3 6.7 8.5 14.1z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="whatsapp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-whatsapp-icon">
				<path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-copy-icon">
				<path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-share-icon">
				<path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
			</symbol>
		</svg>
		<?php
	}

	/**
	 * Add a class and data attribute around the main content.
	 *
	 * Add a class and data attribute around the main content.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param string $content Main post content.
	 * @return string $content Modified
	 */
	public function content_area( $content ) {
		global $post;
		if ( ! in_the_loop() ) {
			return $content;
		}
		if ( ! is_object( $post ) ) {
			return $content;
		}
		if ( is_admin() ) {
			return $content;
		}

		$post_id = $post->ID;
		$url     = $this->get_content_url( $post_id );
		$title   = get_the_title( $post_id );
		$content = sprintf( '<div class="has-content-area" data-url="%s" data-title="%s">%s</div>', esc_url( $url ), esc_attr( $title ), $content );
		return $content;
	}

	/**
	 * Add a class and data attribute around the main excerpts.
	 *
	 * Add a class and data attribute around the main excerpts.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param string $content Main excerpt content.
	 * @return string $content Modified
	 */
	public function excerpt_area( $content ) {
		global $post;
		if ( ! in_the_loop() ) {
			return $content;
		}
		if ( ! is_object( $post ) ) {
			return $content;
		}
		if ( is_admin() ) {
			return $content;
		}

		$post_id = $post->ID;
		$url     = $this->get_content_url( $post_id );
		$title   = get_the_title( $post_id );
		$content = sprintf( '<div class="has-excerpt-area" data-url="%s" data-title="%s">%s</div>', esc_url( $url ), esc_attr( $title ), $content );
		return $content;
	}

	/**
	 * Retrieve a post's URL
	 *
	 * Retrieve a post's URL (may be shortened)
	 *
	 * @since 1.1
	 *
	 * @access private
	 *
	 * @param int $post_id Post ID to retrieve the URL for.
	 * @return string $url URL to the post
	 */
	private function get_content_url( $post_id ) {
		$settings          = $this->get_plugin_options();
		$enable_shortlinks = isset( $settings['shortlinks'] ) ? (bool) $settings['shortlinks'] : false;
		$url               = get_permalink( $post_id );
		if ( $enable_shortlinks ) {
			$url = wp_get_shortlink( $post_id );
		}
		return apply_filters( 'has_content_url', $url, $post_id );
	}


	/**
	 * Add a settings link to the plugin's options.
	 *
	 * Add a settings link on the WordPress plugin's page.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param array $links Array of plugin options.
	 * @return array $links Array of plugin options
	 */
	public function add_settings_link( $links ) {
		$settings_link = sprintf( '<a href="%s">%s</a>', esc_url( admin_url( 'options-general.php?page=highlight-and-share' ) ), _x( 'Settings', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
			array_unshift( $links, $settings_link );
			return $links;
	}

	/**
	 * Load plugin scripts and styles
	 *
	 * Enqueue scripts/styles and provide localization
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function add_scripts() {
		// Divi compatibility.
		if ( isset( $_GET['et_fb'] ) ) { // phpcs:ignore
			return;
		}
		// Beaver Builder compatibility.
		if ( isset( $_GET['fl_builder'] ) ) { // phpcs:ignore
				return;
		}
		// Elementor compatibility.
		if ( false !== strpos( $_SERVER['REQUEST_URI'], 'elementor' ) ) { // phpcs:ignore
			return;
		}
		$deps = array( 'jquery' );
		if ( wp_is_mobile() && apply_filters( 'has_enable_mobile', true ) ) {
			$deps[] = 'jquery.mobile';
		}
		$sweet_alert_uri = $this->get_plugin_url( 'js/sweetalert2.all.min.js' );
		$deps[]          = 'sweetalert2';
		wp_register_script( 'sweetalert2', $sweet_alert_uri, array( 'jquery' ), '7.28.4', true );
		$main_script_uri = $this->get_plugin_url( 'js/highlight-and-share.js' );
		wp_enqueue_script( 'highlight-and-share', $main_script_uri, $deps, HIGHLIGHT_AND_SHARE_VERSION, true );
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'highlight-and-share', 'highlight-and-share' );
		}

		// Build JSON Objects.
		$settings = $this->get_plugin_options();
		$json_arr = array();

		// Facebook.
		if ( is_customize_preview() ) {
			$maybe_facebook = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_facebook['show_facebook'] ) ) {
				$json_arr['show_facebook'] = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );
			} else {
				$json_arr['show_facebook'] = apply_filters( 'has_show_facebook', $maybe_facebook['show_facebook'] );
			}
		} else {
			$json_arr['show_facebook'] = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );
		}

		// Twitter.
		if ( is_customize_preview() ) {
			$maybe_twitter = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_twitter['show_twitter'] ) ) {
				$json_arr['show_twitter'] = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );
			} else {
				$json_arr['show_twitter'] = apply_filters( 'has_show_twitter', $maybe_twitter['show_twitter'] );
			}
		} else {
			$json_arr['show_twitter'] = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );
		}

		// LinkedIn.
		if ( is_customize_preview() ) {
			$maybe_linkedin = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_linkedin['show_linkedin'] ) ) {
				$json_arr['show_linkedin'] = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
			} else {
				$json_arr['show_linkedin'] = apply_filters( 'has_show_linkedin', $maybe_linkedin['show_linkedin'] );
			}
		} else {
			$json_arr['show_linkedin'] = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
		}

		// Email.
		if ( is_customize_preview() ) {
			$maybe_email = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_email['show_email'] ) ) {
				$json_arr['show_email'] = (bool) apply_filters( 'has_show_email', $settings['show_email'] );
			} else {
				$json_arr['show_email'] = apply_filters( 'has_show_email', $maybe_email['show_email'] );
			}
		} else {
			$json_arr['show_email'] = (bool) apply_filters( 'has_show_email', $settings['show_email'] );
		}

		// Xing.
		if ( is_customize_preview() ) {
			$maybe_xing = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_xing['show_xing'] ) ) {
				$json_arr['show_xing'] = (bool) apply_filters( 'has_show_xing', $settings['show_xing'] );
			} else {
				$json_arr['show_xing'] = apply_filters( 'has_show_xing', $maybe_xing['show_xing'] );
			}
		} else {
			$json_arr['show_xing'] = (bool) apply_filters( 'has_show_xing', $settings['show_xing'] );
		}

		// Copy.
		if ( is_customize_preview() ) {
			$maybe_copy = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_copy['show_copy'] ) ) {
				$json_arr['show_copy'] = (bool) apply_filters( 'has_show_copy', $settings['show_copy'] );
			} else {
				$json_arr['show_copy'] = apply_filters( 'has_show_copy', $maybe_xing['show_copy'] );
			}
		} else {
			$json_arr['show_copy'] = (bool) apply_filters( 'has_show_copy', $settings['show_copy'] );
		}

		// Whatsapp.
		if ( is_customize_preview() ) {
			$maybe_whatsapp = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_whatsapp['show_whatsapp'] ) ) {
				$json_arr['show_whatsapp'] = (bool) apply_filters( 'has_show_whatsapp', $settings['show_whatsapp'] );
			} else {
				$json_arr['show_whatsapp'] = apply_filters( 'has_show_whatsapp', $maybe_whatsapp['show_whatsapp'] );
			}
		} else {
			$json_arr['show_whatsapp'] = (bool) apply_filters( 'has_show_whatsapp', $settings['show_whatsapp'] );
		}

		// Twitter Username.
		$json_arr['twitter_username'] = trim( sanitize_text_field( apply_filters( 'has_twitter_username', $settings['twitter'] ) ) );

		// Twitter FontAwesome Class.
		if ( is_customize_preview() ) {
			$font_awesome = get_option( 'highlight-and-share' );
			if ( ! isset( $font_awesome['twitter_fa_class'] ) ) {
				$json_arr['twitter_fa_class'] = sanitize_text_field( $settings['twitter_fa_class'] );
			} else {
				$json_arr['twitter_fa_class'] = $font_awesome['twitter_fa_class'];
			}
		} else {
			$json_arr['twitter_fa_class'] = sanitize_text_field( $settings['twitter_fa_class'] );
		}

		// Facebook FontAwesome Class.
		if ( is_customize_preview() ) {
			$font_awesome = get_option( 'highlight-and-share' );
			if ( ! isset( $font_awesome['facebook_fa_class'] ) ) {
				$json_arr['facebook_fa_class'] = sanitize_text_field( $settings['facebook_fa_class'] );
			} else {
				$json_arr['facebook_fa_class'] = $font_awesome['facebook_fa_class'];
			}
		} else {
			$json_arr['facebook_fa_class'] = sanitize_text_field( $settings['facebook_fa_class'] );
		}

		// LinkedIn FontAwesome Class.
		if ( is_customize_preview() ) {
			$font_awesome = get_option( 'highlight-and-share' );
			if ( ! isset( $font_awesome['linkedin_fa_class'] ) ) {
				$json_arr['linkedin_fa_class'] = sanitize_text_field( $settings['linkedin_fa_class'] );
			} else {
				$json_arr['linkedin_fa_class'] = $font_awesome['linkedin_fa_class'];
			}
		} else {
			$json_arr['linkedin_fa_class'] = sanitize_text_field( $settings['linkedin_fa_class'] );
		}

		// Xing FontAwesome Class.
		if ( is_customize_preview() ) {
			$font_awesome = get_option( 'highlight-and-share' );
			if ( ! isset( $font_awesome['xing_fa_class'] ) ) {
				$json_arr['xing_fa_class'] = sanitize_text_field( $settings['xing_fa_class'] );
			} else {
				$json_arr['xing_fa_class'] = $font_awesome['xing_fa_class'];
			}
		} else {
			$json_arr['xing_fa_class'] = sanitize_text_field( $settings['xing_fa_class'] );
		}

		// WhatsApp FontAwesome Class.
		if ( is_customize_preview() ) {
			$font_awesome = get_option( 'highlight-and-share' );
			if ( ! isset( $font_awesome['whatsapp_fa_class'] ) ) {
				$json_arr['whatsapp_fa_class'] = sanitize_text_field( $settings['whatsapp_fa_class'] );
			} else {
				$json_arr['whatsapp_fa_class'] = $font_awesome['whatsapp_fa_class'];
			}
		} else {
			$json_arr['whatsapp_fa_class'] = sanitize_text_field( $settings['whatsapp_fa_class'] );
		}

		// Copy FontAwesome Class.
		if ( is_customize_preview() ) {
			$font_awesome = get_option( 'highlight-and-share' );
			if ( ! isset( $font_awesome['copy_fa_class'] ) ) {
				$json_arr['copy_fa_class'] = sanitize_text_field( $settings['copy_fa_class'] );
			} else {
				$json_arr['copy_fa_class'] = $font_awesome['copy_fa_class'];
			}
		} else {
			$json_arr['copy_fa_class'] = sanitize_text_field( $settings['copy_fa_class'] );
		}

		// Email FontAwesome Class.
		if ( is_customize_preview() ) {
			$font_awesome = get_option( 'highlight-and-share' );
			if ( ! isset( $font_awesome['email_fa_class'] ) ) {
				$json_arr['email_fa_class'] = sanitize_text_field( $settings['email_fa_class'] );
			} else {
				$json_arr['email_fa_class'] = $font_awesome['email_fa_class'];
			}
		} else {
			$json_arr['email_fa_class'] = sanitize_text_field( $settings['email_fa_class'] );
		}

		// Override the filter if no username is present for twitter.
		if ( empty( $json_arr['twitter_username'] ) ) {
			$json_arr['twitter_username'] = '';
		}

		// Add mobile.
		if ( wp_is_mobile() ) {
			$json_arr['mobile'] = true;
		} else {
			$json_arr['mobile'] = false;
		}

		// Content areas.
		$classes = apply_filters( 'has_js_classes', $settings['js_content'] ); // Pass comma separated values (e.g., entry-content,type-post,type-page).
		$classes = explode( ',', $classes );
		if ( apply_filters( 'has_enable_content', (bool) $settings['enable_content'] ) ) {
			$classes[] = 'has-content-area';
		}
		if ( apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] ) ) {
			$classes[] = 'has-excerpt-area';
		}
		foreach ( $classes as $index => &$string ) {
			$string = trim( $string ); // Trim.
			if ( empty( $string ) ) {
				unset( $classes[ $index ] );
				continue;
			}
			$string = trim( esc_js( '.' . $string ) ); // Get in class format (.%s) and trim just in case.
		}
		$ids = (array) apply_filters( 'has_js_ids', array() ); // Pass array of jQuery ID elements (without the #).
		foreach ( $ids as $index => &$string ) {
			$string = trim( $string );
			if ( empty( $string ) ) {
				continue;
			}
			$string = trim( esc_js( '#' . $string ) ); // Get in ID format (#%s) and trim just in case.
		}
		$elements = (array) apply_filters( 'has_js_elements', array() ); // Pass array of jQuery HTML elements (e.g., blockquote, article).
		foreach ( $elements as $index => &$string ) {
			$string = trim( $string );
			if ( empty( $string ) ) {
				continue;
			}
			$string = trim( esc_js( $string ) );
		}
		$content             = array_merge( $classes, $ids, $elements );
		$json_arr['content'] = apply_filters( 'has_js_selectors', implode( ',', $content ), $content, $classes, $ids, $elements );

		// Text to display.
		$json_arr['tweet_text']    = apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) );
		$json_arr['facebook_text'] = apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) );
		$json_arr['linkedin_text'] = apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) );
		$json_arr['whatsapp_text'] = apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) );
		$json_arr['xing_text']     = apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) );
		$json_arr['copy_text']     = apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) );
		$json_arr['email_text']    = apply_filters( 'has_email_text', _x( 'E-mail', 'E-mail share text', 'highlight-and-share' ) );

		// Icons.
		if ( is_customize_preview() ) {
			$maybe_icons = get_option( 'highlight-and-share' );
			if ( isset( $maybe_icons['icons'] ) ) {
				$json_arr['icons'] = apply_filters( 'has_icons', $maybe_icons['icons'] );
			} else {
				$json_arr['icons'] = apply_filters( 'has_icons', $settings['icons'] );
			}
		} else {
			$json_arr['icons'] = apply_filters( 'has_icons', $settings['icons'] );
		}

		// Facebook API Key.
		$json_arr['facebook_app_id'] = isset( $settings['facebook_app_id'] ) ? sanitize_text_field( $settings['facebook_app_id'] ) : 0;

		// For emails.
		if ( is_user_logged_in() ) {
			$user                              = wp_get_current_user();
			$json_arr['email_your_name_value'] = $user->display_name;
			$json_arr['email_from_value']      = $user->user_email;
		} else {
			$json_arr['email_your_name_value'] = '';
			$json_arr['email_from_value']      = '';
		}
		$json_arr['nonce']               = wp_create_nonce( 'has_email_nonce' );
		$json_arr['ajax_url']            = admin_url( 'admin-ajax.php' );
		$json_arr['email_share']         = __( 'Share This Post Via Email', 'highlight-and-share' );
		$json_arr['email_subject']       = __( 'Your Subject', 'highlight-and-share' );
		$json_arr['email_your_name']     = __( 'Your Name', 'highlight-and-share' );
		$json_arr['email_send_email']    = __( 'Send to Email Address', 'highlight-and-share' );
		$json_arr['email_subject']       = __( 'Your Subject', 'highlight-and-share' );
		$json_arr['email_subject_text']  = __( '[Shared Post]', 'highlight-and-share' ) . ' %title%';
		$json_arr['email_from']          = __( 'Your Email Address', 'highlight-and-share' );
		$json_arr['email_send']          = __( 'Send Email', 'highlight-and-share' );
		$json_arr['email_cancel']        = __( 'Cancel', 'highlight-and-share' );
		$json_arr['email_close']         = __( 'Close', 'highlight-and-share' );
		$json_arr['email_loading']       = $this->get_plugin_url( 'img/loading.gif' );
		$json_arr['email_subject_error'] = __( 'You must fill in a subject.', 'highlight-and-share' );
		$json_arr['email_email_to']      = __( 'Send to Email Address is blank.', 'highlight-and-share' );
		$json_arr['email_email_from']    = __( 'Your email address is blank.', 'highlight-and-share' );
		$json_arr['email_email_name']    = __( 'Your name is blank.', 'highlight-and-share' );
		$json_arr['email_sending']       = __( 'Sending...', 'highlight-and-share' );
		$json_arr['customizer_preview']  = is_customize_preview();

		// Localize.
		wp_localize_script( 'highlight-and-share', 'highlight_and_share', $json_arr );

		// Add CSS.
		if ( apply_filters( 'has_load_css', true ) ) {
			wp_enqueue_style( 'highlight-and-share-email', $this->get_plugin_url( 'css/highlight-and-share-emails.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
			if ( is_customize_preview() ) {
				$maybe_theme = get_option( 'highlight-and-share' );
				if ( isset( $maybe_theme['theme'] ) ) {
					$this->output_stylesheets( $maybe_theme['theme'] );
				} else {
					$this->output_stylesheets( $settings['theme'] );
				}
			} else {
				$this->output_stylesheets( $settings['theme'] );
			}
		}
	}

	/**
	 * Load stylesheets
	 *
	 * Enqueue styles
	 *
	 * @since 2.4.0
	 * @access private
	 *
	 * @see add_scripts
	 *
	 * @param string $theme The theme to output.
	 */
	private function output_stylesheets( $theme ) {
		switch ( $theme ) {
			case 'off':
				return;
			case 'default':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'brand-colors':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-brand.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'black':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-black.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'white':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-white.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'blue':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-blue.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'green':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-green.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'cyan':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-cyan.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'magenta':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-magenta.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			default:
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
		}
		add_filter( 'body_class', array( $this, 'add_body_class' ), 10, 2 );
	}

	/**
	 * Add a body class for styling.
	 *
	 * @since 3.2.11
	.*
	 * @param array $classes Array of class names.
	 * @param array $class   Array of additional classnaes added to the body.
	 *
	 * @return array Updated classnames.
	 */
	public function add_body_class( $classes, $class ) {
		$classes[] = 'has-body';
		return $classes;
	}

	/**
	 * Load mobile scripts
	 *
	 * Enqueue scripts/styles to enable mobile events
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function add_scripts_mobile() {
		$main_script_uri = $this->get_plugin_url( 'js/jquery.mobile.custom.min.js' );
		if ( defined( 'SCRIPT_DEBUG' ) ) {
			if ( SCRIPT_DEBUG === true ) {
				$main_script_uri = $this->get_plugin_url( 'js/jquery.mobile.custom.js' );
			}
		}
		wp_enqueue_script( 'jquery.mobile', $main_script_uri, array( 'jquery' ), '1.4.5', true );
	}

	/**
	 * Initialize options page
	 *
	 * Create plugin options page and callback
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function add_admin_menu() {
		add_options_page( _x( 'Highlight and Share', 'Plugin Name - Settings Page Title', 'highlight-and-share' ), _x( 'Highlight and Share', 'Plugin Name - Menu Item', 'highlight-and-share' ), 'manage_options', 'highlight-and-share', array( $this, 'options_page' ) );
	}

	/**
	 * Output options page HTML.
	 *
	 * Output option page HTML and fields/sections.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see add_admin_menu
	 */
	public function options_page() {
		?>
		<div class="wrap">
			<h2><?php echo esc_html( _x( 'Highlight and Share', 'Plugin Name - Settings Page Title', 'highlight-and-share' ) ); ?></h2>
			<p class="description"><a href="https://mediaron.com/highlight-and-share/">Support and Documentation</a></p>
			<form action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>" method="POST">
				<?php settings_fields( 'highlight-and-share' ); ?>
				<?php do_settings_sections( 'highlight-and-share' ); ?>
				<?php submit_button(); ?>
			</form>
		</div>
		<?php
	}

	/**
	 * Initialize options
	 *
	 * Initialize page settings, fields, and sections and their callbacks
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function init_admin_settings() {
		register_setting(
			'highlight-and-share',
			'highlight-and-share',
			array( $this, 'sanitization' )
		);
		add_settings_section(
			'has-display',
			_x( 'Display', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);
		add_settings_section(
			'has-config',
			_x( 'Content', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-twitter',
			_x( 'Twitter Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-facebook',
			_x( 'Facebook Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-linkedin',
			_x( 'LinkedIn Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-whatsapp',
			_x( 'WhatsApp Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-xing',
			_x( 'Xing Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-copy',
			_x( 'Copy Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-email',
			_x( 'E-mail Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-shortlink',
			_x( 'Post URL Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-advanced',
			_x( 'Advanced', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_field(
			'hightlight-and-share-display-enable',
			__( 'Show Icons Only', 'highlight-and-share' ),
			array( $this, 'add_settings_field_display_enable' ),
			'highlight-and-share',
			'has-display',
			array(
				'desc' => __( 'Show icons only. Recommended if you choose more than two options to show.', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-display-theme',
			__( 'Choose Theme', 'highlight-and-share' ),
			array( $this, 'add_settings_field_display_theme' ),
			'highlight-and-share',
			'has-display',
			array(
				'desc' => __( 'Choose a theme to display on the front-end. Some themes require Show Icons Only to be enabled.', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-content-enable',
			__( 'Add to Post Content', 'highlight-and-share' ),
			array( $this, 'add_settings_field_content_enable' ),
			'highlight-and-share',
			'has-config',
			array(
				'desc' => __( 'Would you like to add sharing to the main content areas?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-excerpt-enable',
			__( 'Add to Excerpt Content', 'highlight-and-share' ),
			array( $this, 'add_settings_field_excerpt_enable' ),
			'highlight-and-share',
			'has-config',
			array(
				'desc' => __( 'Would you like to add sharing to the excerpts?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-twitter-enable',
			__( 'Show Twitter Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_twitter_enable' ),
			'highlight-and-share',
			'has-twitter',
			array(
				'desc' => __( 'Would you like to enable sharing via Twitter?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-linkedin-enable',
			__( 'Show LinkedIn Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_linkedin_enable' ),
			'highlight-and-share',
			'has-linkedin',
			array(
				'desc' => __( 'Would you like to enable sharing via LinkedIn?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-whatsapp-enable',
			__( 'Show WhatsApp Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_whatsapp_enable' ),
			'highlight-and-share',
			'has-whatsapp',
			array(
				'desc' => __( 'Would you like to enable sharing via WhatsApp?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-xing-enable',
			__( 'Show Xing Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_xing_enable' ),
			'highlight-and-share',
			'has-xing',
			array(
				'desc' => __( 'Would you like to enable sharing via Xing?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-copy-enable',
			__( 'Show Copy Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_copy_enable' ),
			'highlight-and-share',
			'has-copy',
			array(
				'desc' => __( 'Would you like to enable sharing via copying?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-email-enable',
			__( 'Show E-mail Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_email_enable' ),
			'highlight-and-share',
			'has-email',
			array(
				'desc' => __( 'Would you like to enable sharing via E-mail?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-twitter-handle',
			__( 'Twitter Username', 'highlight-and-share' ),
			array( $this, 'add_settings_field_twitter' ),
			'highlight-and-share',
			'has-twitter',
			array(
				'label_for' => 'hightlight-and-share-twitter-handle',
				'desc'      => __( 'Enter Your Twitter Username', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-facebook-enable',
			__( 'Show Facebook Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_facebook_enable' ),
			'highlight-and-share',
			'has-facebook',
			array(
				'desc' => __( 'Would you like to enable sharing via Facebook?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-facebook-api',
			__( 'Facebook App ID', 'highlight-and-share' ),
			array( $this, 'add_settings_field_facebook_api' ),
			'highlight-and-share',
			'has-facebook',
			array(
				'label_for' => 'hightlight-and-share-facebook-api',
				'desc'      => __( 'A Facebook App ID allows you to highlight text and share it.', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-shortlink-enable',
			__( 'Shortlinks', 'highlight-and-share' ),
			array( $this, 'add_settings_field_shortlink_enable' ),
			'highlight-and-share',
			'has-shortlink',
			array(
				'desc' => __( 'Please decide if you would like to use the default post URL or a shortened version.', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-js-content',
			_x( 'jQuery classes', 'Label - Where in the HTML document to search for text to capture', 'highlight-and-share' ),
			array( $this, 'add_settings_field_js_content' ),
			'highlight-and-share',
			'has-advanced',
			array(
				'label_for' => 'hightlight-and-share-js-content',
				'desc'      => __( 'Enter jQuery classes to search for in the HTML.  You must comma-separate classes (e.g., entry-content,post,page).', 'highlight-and-share' ),
			)
		);
	}

	/**
	 * Output settings HTML
	 *
	 * Output any HTML required to go into a settings section
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 */
	public function settings_section() {
	}

	/**
	 * Sanitize options before they are saved.
	 *
	 * Sanitize and prepare error messages when saving options.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $input Input array to sanitize.
	 *
	 * @return array Sanitized array of options
	 */
	public function sanitization( $input = array() ) {
		$output = get_option( 'highlight-and-share' );

		// Check if settings are being initialized for the first time.
		if ( false === $output ) {
			// No settings have been saved yet and we're being supplied with defaults.
			foreach ( $input as $key => &$value ) {
				if ( is_bool( $value ) ) {
					continue;
				}
				$value = sanitize_text_field( $value );
			}
			return $input;
		}
		// Settings are being saved.  Update.
		foreach ( $input as $key => $value ) {
			switch ( $key ) {
				case 'twitter':
					$twitter_username = trim( $value );
					if ( empty( $twitter_username ) ) {
						$output[ $key ] = '';
					} elseif ( ! preg_match( '/^[a-zA-Z0-9_]{1,15}$/', $twitter_username ) ) {
						add_settings_error( 'highlight-and-share', 'invalid_twitter', _x( 'You have entered an incorrect Twitter username', 'Twitter username error', 'highlight-and-share' ) );
					} else {
						$output[ $key ] = sanitize_text_field( $value );
					}
					break;
				case 'facebook_app_id':
					$app_id = sanitize_text_field( $value );

					if ( empty( $app_id ) || 0 === $app_id ) {
						$output[ $key ] = '';
					} else {
						$output[ $key ] = $app_id;
					}
					break;
				case 'js_content':
					$js_content = trim( $value );
					if ( empty( $js_content ) || preg_match( '/[-_0-9a-zA-Z]+(,[-_0-9a-zA-Z]+)*$/', $js_content ) ) {
						$output[ $key ] = sanitize_text_field( $js_content );
					} else {
						add_settings_error( 'highlight-and-share', 'invalid_twitter', _x( 'You must enter valid comma-separated values for the content.', 'Invalid comma-separated values', 'highlight-and-share' ) );
					}
					break;
				case 'theme':
					$output[ $key ] = sanitize_text_field( $value );
					break;
				case 'twitter_fa_class':
				case 'facebook_fa_class':
				case 'linkedin_fa_class':
				case 'xing_fa_class':
				case 'whatsapp_fa_class':
				case 'email_fa_class':
				case 'copy_fa_class':
					$output[ $key ] = sanitize_text_field( $value );
					break;
				case 'show_twitter':
				case 'show_facebook':
				case 'enable_content':
				case 'enable_excerpt':
				case 'shortlinks':
				case 'icons':
				case 'show_email':
				case 'show_xing':
				case 'show_whatsapp':
				case 'show_linkedin':
				case 'show_copy':
					if ( 'on' === $input[ $key ] ) {
						$output[ $key ] = true;
					} else {
						$output[ $key ] = false;
					}
					break;

			}
		}
		return $output;
	}

	/**
	 * Add JavaScript content setting.
	 *
	 * Output text input HTML for JavaScript content classes.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args JS Arguments.
	 */
	public function add_settings_field_js_content( $args = array() ) {
		$settings   = $this->get_plugin_options();
		$js_content = isset( $settings['js_content'] ) ? $settings['js_content'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[js_content]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $js_content ) );
	}

	/**
	 * Add Twitter username setting.
	 *
	 * Output text input HTML for the Twitter username.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_twitter( $args = array() ) {
		$settings   = $this->get_plugin_options();
		$js_content = isset( $settings['twitter'] ) ? $settings['twitter'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[twitter]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $js_content ) );
	}

	/**
	 * Option for displaying icons only
	 *
	 * Output icons only
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_display_enable( $args = array() ) {
		$settings     = $this->get_plugin_options();
		$enable_icons = isset( $settings['icons'] ) ? (bool) $settings['icons'] : false;
		echo '<input name="highlight-and-share[icons]" value="off" type="hidden" />';
		printf( '<input id="has-show-icons" type="checkbox" name="highlight-and-share[icons]" value="on" %s />&nbsp;<label for="has-show-icons">%s</label>', checked( true, $enable_icons, false ), esc_html__( 'Enable Icons Only?', 'highlight-and-share' ) );
		$bfa = sprintf( '<a href="%s">Requires %s or equivalent.</a>', 'https://wordpress.org/plugins/better-font-awesome/', __( 'Better Font Awesome', 'highlight-and-share' ) );
		printf( '<div><em>%s<br />%s</em></div>', $bfa, esc_html( $args['desc'] ) ); // phpcs:ignore
	}

	/**
	 * Option for displaying a theme
	 *
	 * Option for displaying a theme
	 *
	 * @since 2.3.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_display_theme( $args = array() ) {
		$settings = $this->get_plugin_options();
		$theme    = isset( $settings['theme'] ) ? $settings['theme'] : 'default';
		?>
		<select name="highlight-and-share[theme]">
			<option value="off" <?php selected( 'off', $theme, true ); ?>><?php esc_html_e( 'Off', 'highlight-and-share' ); ?></option>
			<option value="default" <?php selected( 'default', $theme, true ); ?>><?php esc_html_e( 'Default', 'highlight-and-share' ); ?></option>
			<option value="brand-colors" <?php selected( 'brand-colors', $theme, true ); ?>><?php esc_html_e( 'Brand Colors (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="black" <?php selected( 'black', $theme, true ); ?>><?php esc_html_e( 'Black (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="white" <?php selected( 'white', $theme, true ); ?>><?php esc_html_e( 'White (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="cyan" <?php selected( 'cyan', $theme, true ); ?>><?php esc_html_e( 'Cyan (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="magenta" <?php selected( 'magenta', $theme, true ); ?>><?php esc_html_e( 'Magenta (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="blue" <?php selected( 'blue', $theme, true ); ?>><?php esc_html_e( 'Blue (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="green" <?php selected( 'green', $theme, true ); ?>><?php esc_html_e( 'Green (Icons Only)', 'highlight-and-share' ); ?></option>
		</select>
		<?php
		printf( '<div><em></em></div>', esc_html( $args['desc'] ) );
	}

	/**
	 * Add Twitter option for sharing.
	 *
	 * Output checkbox for displaying Twitter sharing.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_twitter_enable( $args = array() ) {
		$settings       = $this->get_plugin_options();
		$enable_twitter = isset( $settings['show_twitter'] ) ? (bool) $settings['show_twitter'] : true;
		echo '<input name="highlight-and-share[show_twitter]" value="off" type="hidden" />';
		printf( '<input id="has-show-twitter" type="checkbox" name="highlight-and-share[show_twitter]" value="on" %s />&nbsp;<label for="has-show-twitter">%s</label>', checked( true, $enable_twitter, false ), esc_html__( 'Enable Twitter Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add LinkedIn Option for Sharing
	 *
	 * Output checkbox for displaying LinkedIn sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_linkedin_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$linkedin = isset( $settings['show_linkedin'] ) ? (bool) $settings['show_linkedin'] : true;
		echo '<input name="highlight-and-share[show_linkedin]" value="off" type="hidden" />';
		printf( '<input id="has-show-linkedin" type="checkbox" name="highlight-and-share[show_linkedin]" value="on" %s />&nbsp;<label for="has-show-linkedin">%s</label>', checked( true, $linkedin, false ), esc_html__( 'Enable LinkedIn Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Xing Option for Sharing
	 *
	 * Output checkbox for displaying Xing sharing.
	 *
	 * @since 2.2.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_xing_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$xing     = isset( $settings['show_xing'] ) ? (bool) $settings['show_xing'] : true;
		echo '<input name="highlight-and-share[show_xing]" value="off" type="hidden" />';
		printf( '<input id="has-show-xing" type="checkbox" name="highlight-and-share[show_xing]" value="on" %s />&nbsp;<label for="has-show-xing">%s</label>', checked( true, $xing, false ), esc_html__( 'Enable Xing Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add WhatsApp Option for Sharing
	 *
	 * Output checkbox for displaying WhatsApp sharing.
	 *
	 * @since 2.2.2
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_whatsapp_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$whatsapp = isset( $settings['show_whatsapp'] ) ? (bool) $settings['show_whatsapp'] : true;
		echo '<input name="highlight-and-share[show_whatsapp]" value="off" type="hidden" />';
		printf( '<input id="has-show-whatsapp" type="checkbox" name="highlight-and-share[show_whatsapp]" value="on" %s />&nbsp;<label for="has-show-whatsapp">%s</label>', checked( true, $whatsapp, false ), esc_html__( 'Enable WhatsApp Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add E-mail Option for Sharing
	 *
	 * Output checkbox for displaying E-mail sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_email_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$email    = isset( $settings['show_email'] ) ? (bool) $settings['show_email'] : true;
		echo '<input name="highlight-and-share[show_email]" value="off" type="hidden" />';
		printf( '<input id="has-show-email" type="checkbox" name="highlight-and-share[show_email]" value="on" %s />&nbsp;<label for="has-show-email">%s</label>', checked( true, $email, false ), esc_html__( 'Enable E-mail Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Copy Option for Sharing
	 *
	 * Output checkbox for displaying E-mail sharing.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_copy_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$copy     = isset( $settings['show_copy'] ) ? (bool) $settings['show_copy'] : true;
		echo '<input name="highlight-and-share[show_copy]" value="off" type="hidden" />';
		printf( '<input id="has-show-copy" type="checkbox" name="highlight-and-share[show_copy]" value="on" %s />&nbsp;<label for="has-show-copy">%s</label>', checked( true, $copy, false ), esc_html__( 'Enable Copying', 'highlight-and-share' ) );
	}

	/**
	 * Add Facebook option for sharing.
	 *
	 * Output checkbox for displaying Facebook sharing.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_facebook_enable( $args = array() ) {
		$settings        = $this->get_plugin_options();
		$enable_facebook = isset( $settings['show_facebook'] ) ? (bool) $settings['show_facebook'] : true;
		echo '<input name="highlight-and-share[show_facebook]" value="off" type="hidden" />';
		printf( '<input id="has-show-facebook" type="checkbox" name="highlight-and-share[show_facebook]" value="on" %s />&nbsp;<label for="has-show-facebook">%s</label>', checked( true, $enable_facebook, false ), esc_html__( 'Enable Facebook Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Facebook option for an Application ID.
	 *
	 * Add Facebook option for an Application ID.
	 *
	 * @since 2.1.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_facebook_api( $args = array() ) {
		$settings = $this->get_plugin_options();
		$app_id   = isset( $settings['facebook_app_id'] ) ? sanitize_text_field( $settings['facebook_app_id'] ) : '';
		if ( 0 === $app_id ) {
			$app_id = '';
		}
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<p><a href="%s">%s</a></p>', 'https://developers.facebook.com/apps', esc_html__( 'Requires a Facebook developer application.', 'highlight-and-share' ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[facebook_app_id]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $app_id ) );
	}

	/**
	 * Add Content option for sharing.
	 *
	 * Output checkbox for sharing on main post content
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_content_enable( $args = array() ) {
		$settings       = $this->get_plugin_options();
		$enable_content = isset( $settings['enable_content'] ) ? (bool) $settings['enable_content'] : true;
		echo '<input name="highlight-and-share[enable_content]" value="off" type="hidden" />';
		printf( '<input id="has-enable-content" type="checkbox" name="highlight-and-share[enable_content]" value="on" %s />&nbsp;<label for="has-enable-content">%s</label>', checked( true, $enable_content, false ), esc_html__( 'Enable Content?', 'highlight-and-share' ) );
	}

	/**
	 * Add Content option for sharing.
	 *
	 * Output checkbox for sharing on main post content
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_excerpt_enable( $args = array() ) {
		$settings       = $this->get_plugin_options();
		$enable_excerpt = isset( $settings['enable_excerpt'] ) ? (bool) $settings['enable_excerpt'] : true;
		echo '<input name="highlight-and-share[enable_excerpt]" value="off" type="hidden" />';
		printf( '<input id="has-enable-excerpt" type="checkbox" name="highlight-and-share[enable_excerpt]" value="on" %s />&nbsp;<label for="has-enable-excerpt">%s</label>', checked( true, $enable_excerpt, false ), esc_html__( 'Enable Excerpt?', 'highlight-and-share' ) );
	}

	/**
	 * Add Shortlink Option for Sharing.
	 *
	 * Output checkbox for shortlinks.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_shortlink_enable( $args = array() ) {
		$settings          = $this->get_plugin_options();
		$enable_shortlinks = isset( $settings['shortlinks'] ) ? (bool) $settings['shortlinks'] : false;
		echo '<input name="highlight-and-share[shortlinks]" value="off" type="hidden" />';
		printf( '<input id="has-shortlinks" type="checkbox" name="highlight-and-share[shortlinks]" value="on" %s />&nbsp;<label for="has-shortlinks">%s</label>', checked( true, $enable_shortlinks, false ), esc_html__( 'Enable Shortlinks?', 'highlight-and-share' ) );
	}

	/**
	 * Initialize and return plugin options.
	 *
	 * Return an array of plugin options.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @return array Plugin options
	 */
	public function get_plugin_options() {
		if ( false === $this->options ) {
			$settings = get_option( 'highlight-and-share' );
		} else {
			$settings = $this->options;
		}

		$defaults = array(
			'js_content'     => '',
			'twitter'        => '',
			'show_twitter'   => true,
			'show_facebook'  => true,
			'show_linkedin'  => false,
			'show_email'     => false,
			'show_copy'      => false,
			'show_whatsapp'  => false,
			'show_xing'      => false,
			'enable_content' => true,
			'enable_excerpt' => true,
			'shortlinks'     => false,
			'icons'          => false,
			'theme'          => 'default',
		);

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share', $defaults );
			return $defaults;
		} else {
			$settings = wp_parse_args( $settings, $defaults );
		}
		$this->options = $settings;
		return $settings;
	}

	/**
	 * Return a plugin path relative to the file system
	 *
	 * Return a plugin path string relative to the file system.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $path Relative file path to plugin asset.
	 * @return string Full file path to plugin asset
	 */
	public function get_plugin_dir( $path = '' ) {
		$dir = rtrim( plugin_dir_path( __FILE__ ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Return a plugin path relative to the plugin URL
	 *
	 * Return a plugin path string relative to the plugin's URL.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $path Relative URL to plugin asset.
	 * @return string Full URL to plugin asset
	 */
	public function get_plugin_url( $path = '' ) {
		$dir = rtrim( plugin_dir_url( __FILE__ ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}


}

add_action( 'plugins_loaded', 'highlightshare_instantiate' );
/**
 * Instantiate the HAS class.
 */
function highlightshare_instantiate() {
	Highlight_And_Share::get_instance();
}
