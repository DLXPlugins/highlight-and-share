<?php
/*
Plugin Name: Highlight and Share
Plugin URI: https://wordpress.org/plugins/highlight-and-share/
Description: Highlight text and share via Twitter or Facebook and many more
Author: Ronald Huereca
Version: 2.4.8
Requires at least: 4.7
Author URI: https://mediaron.com
Contributors: ronalfy
Text Domain: highlight-and-share
Domain Path: /languages

Recommended pre-requisite plugin - https://wordpress.org/plugins/better-font-awesome/
WordPress SEO - Twitter/Facebook OpenGraph data - https://wordpress.org/plugins/wordpress-seo/
*/

class Highlight_And_Share {
	private static $instance = null;
	private $options = false;
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
		if ( null == self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;
	} //end get_instance

	/**
	 * Class constructor.
	 *
	 * Initialize plugin and load text domain for internationalization
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'init' ), 9 );

		add_action( 'wp', array( $this, 'wp_loaded' ), 15 );

		define( 'HIGHLIGHT_AND_SHARE_VERSION', '2.4.7=8');

		// Get errors for email
		$this->errors[ 'could_not_send' ] = esc_html__( 'Could not send the e-mail', 'highlight-and-share' );
		$this->errors[ 'invalid_email' ] = esc_html__( 'Not a valid e-mail address', 'highlight-and-share' );
		$this->errors[ 'email_sent' ] = esc_html__( 'Your email has been sent', 'highlight-and-share' );
		$this->errors[ 'nonce_invalid' ] = esc_html__( 'Could not process your request', 'highlight-and-share' );
		$this->errors[ 'name' ] = esc_html__( 'You must supply a name', 'highlight-and-share' );

		//* Localization Code */
		load_plugin_textdomain( 'highlight-and-share', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

		// Ajax for form submissions
		add_action( 'wp_ajax_has_form_submission', array( $this, 'ajax_send_has_email' ) );
		add_action( 'wp_ajax_nopriv_has_form_submission', array( $this, 'ajax_send_has_email' ) );

		// For the icons
		$this->maybe_migrate_icons();

		add_action( 'customize_register', array( $this, 'customizer' ) );

	} //end constructor

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
			if( false !== $options && isset( $options[ 'icons' ] ) && false === $options[ 'icons' ] ) {
				$options[ 'icons' ] = true;
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
     * @param  WP_Customize_Manager $customizer Customizer object
	 */
	public function customizer( $customizer ) {
		$options = $this->get_plugin_options();
		$customizer->add_section('highlight-and-share', array(
			'title'      => __( 'Highlight and Share', 'highlight-and-share' ),
			'priority'   => 120,
			'capability' => 'edit_theme_options'
		) );
		// Icons
		$customizer->add_setting( 'highlight-and-share[icons]',
			array(
				'capability'        => 'edit_theme_options',
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option'
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
				'description' => 'Requires <a href="https://wordpress.org/plugins/better-font-awesome/">Better Font Awesome plugin</a> or equivalent'
			)
		);

		// Themes
		$customizer->add_setting(
			'highlight-and-share[theme]',
			array(
				'default' => 'default',
				'sanitize_callback' => array( $this, 'customizer_sanitize_theme_select'),
				'type' => 'option'
			)
		);
		$customizer->add_control(
			'highlight-and-share[theme]',
			array(
				'label' => esc_html__( 'Choose a Theme', 'highlight-and-share' ),
				'section' => 'highlight-and-share',
				'type' => 'select',
				'choices' => array(
					'off' => esc_html__( 'Off', 'highligh-and-share' ),
					'default' => esc_html__( 'Default', 'highlight-and-share' ),
					'brand-colors' => esc_html__( 'Brand Colors (Icons Only)', 'highlight-and-share' ),
					'black' => 	esc_html__( 'Black (Icons Only)', 'highlight-and-share' ),
					'white' => esc_html__( 'White (Icons Only)', 'highlight-and-share' ),
					'magenta' => esc_html__( 'Magenta (Icons Only)', 'highlight-and-share' ),
					'blue' => esc_html__( 'Blue (Icons Only)', 'highlight-and-share' ),
					'green' => esc_html__( 'Green (Icons Only)', 'highlight-and-share' )
				)
			)
		);

		// Show Twitter
		$customizer->add_setting( 'highlight-and-share[show_twitter]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'show_twitter' ],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type' => 'option'
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
		));

		// Show Facebook
		$customizer->add_setting( 'highlight-and-share[show_facebook]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'show_facebook' ],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type' => 'option'
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
		));

		// Show LinkedIn
		$customizer->add_setting( 'highlight-and-share[show_linkedin]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'show_linkedin' ],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type' => 'option'
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
		));

		// Show Pinterest
		$customizer->add_setting( 'highlight-and-share[show_pinterest]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'show_pinterest' ],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[show_pinterest]',
			array(
				'type'     => 'checkbox',
				'label'    => __( 'Enable Pinterest Sharing', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[show_pinterest]',
				'priority' => 10,
			)
		));

		// Show Xing
		$customizer->add_setting( 'highlight-and-share[show_xing]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'show_xing' ],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type' => 'option'
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
		));

		// Show Whatsapp
		$customizer->add_setting( 'highlight-and-share[show_whatsapp]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'show_whatsapp' ],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type' => 'option'
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
		));

		// Show Email
		$customizer->add_setting( 'highlight-and-share[show_email]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'show_email' ],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type' => 'option'
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
		));

		// Show Twitter Font Awesome Class
		$customizer->add_setting( 'highlight-and-share[twitter_fa_class]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'twitter_fa_class' ],
				'sanitize_callback' => 'sanitize_text_field',
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[twitter_fa_class]',
			array(
				'type'     => 'text',
				'label'    => __( 'Twitter FontAwesome Class', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[twitter_fa_class]',
				'priority' => 10,
			)
		));

		// Show Facebook Font Awesome Class
		$customizer->add_setting( 'highlight-and-share[facebook_fa_class]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'facebook_fa_class' ],
				'sanitize_callback' => 'sanitize_text_field',
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[facebook_fa_class]',
			array(
				'type'     => 'text',
				'label'    => __( 'Facebook FontAwesome Class', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[facebook_fa_class]',
				'priority' => 10,
			)
		));

		// Show LinkedIn Font Awesome Class
		$customizer->add_setting( 'highlight-and-share[linkedin_fa_class]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'linkedin_fa_class' ],
				'sanitize_callback' => 'sanitize_text_field',
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[linkedin_fa_class]',
			array(
				'type'     => 'text',
				'label'    => __( 'LinkedIn FontAwesome Class', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[linkedin_fa_class]',
				'priority' => 10,
			)
		));

		// Show Pinterest Font Awesome Class
		$customizer->add_setting( 'highlight-and-share[pinterest_fa_class]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'pinterest_fa_class' ],
				'sanitize_callback' => 'sanitize_text_field',
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[pinterest_fa_class]',
			array(
				'type'     => 'text',
				'label'    => __( 'Pinterest FontAwesome Class', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[pinterest_fa_class]',
				'priority' => 10,
			)
		));

		// Show Xing Font Awesome Class
		$customizer->add_setting( 'highlight-and-share[xing_fa_class]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'xing_fa_class' ],
				'sanitize_callback' => 'sanitize_text_field',
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[xing_fa_class]',
			array(
				'type'     => 'text',
				'label'    => __( 'Xing FontAwesome Class', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[xing_fa_class]',
				'priority' => 10,
			)
		));

		// Show WhatsApp Font Awesome Class
		$customizer->add_setting( 'highlight-and-share[whatsapp_fa_class]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'whatsapp_fa_class' ],
				'sanitize_callback' => 'sanitize_text_field',
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[whatsapp_fa_class]',
			array(
				'type'     => 'text',
				'label'    => __( 'WhatsApp FontAwesome Class', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[whatsapp_fa_class]',
				'priority' => 10,
			)
		));

		// Show Email Font Awesome Class
		$customizer->add_setting( 'highlight-and-share[email_fa_class]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options[ 'email_fa_class' ],
				'sanitize_callback' => 'sanitize_text_field',
				'type' => 'option'
			)
		);
		$customizer->add_control(
			new WP_Customize_Control(
			$customizer,
			'highlight-and-share[email_fa_class]',
			array(
				'type'     => 'text',
				'label'    => __( 'Email FontAwesome Class', 'highlight-and-share' ),
				'section'  => 'highlight-and-share',
				'settings' => 'highlight-and-share[email_fa_class]',
				'priority' => 10,
			)
		));
	}

	/**
	 * Sanitizes an input variable
	 *
	 * Sanitizes an input variable
	 *
	 * @since 2.4.0
	 * @access public
	 *
     * @param bool $input Whether the input is checked or not
	 *
	 * @return bool Whether the input is checked or not
	 */
	public function customizer_sanitize_checkbox( $input ) {

		//returns true if checkbox is checked
		return ($input) ? true : false;
	}

	/**
	 * Sanitizes a select variable
	 *
	 * Sanitizes a select variable
	 *
	 * @since 2.4.0
	 * @access public
	 *
     * @param string                $input Value of the settings
	 * @param WP_Customize_Setting  Customizer setting object
	 *
	 * @return bool Whether the input is checked or not
	 */
	public function customizer_sanitize_theme_select( $input, $setting ){

		//input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only
		$input = sanitize_key($input);

		//get the list of possible select options
		$choices = $setting->manager->get_control( $setting->id )->choices;

		//return input if valid or return default option
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );

	}

	/**
	 * Processes an Ajax Request for emails
	 *
	 * Processes an Ajax Request for emails
	 *
	 * @since 2.3.5
	 * @access public
	 *
     * @param  array $data {
	 * 		An array of Ajax posted data
	 *		$has_email_nonce   string Nonce verifications
	 *		$has_target_email  string Email To
	 *		$has_source_name   string From Name
	 * 		$has_email_subject string Email Subject
	 * 		$has_source_email  string Email from
	 * 		$has_source_title  string Source Title
	 * 		$has_source_url    string Source URL
	 * }
	 * @return object JSON output
	 */
	public function ajax_send_has_email() {

		// Get Ajx data
		parse_str( $_POST[ 'data' ], $ajax_data );

		// Set up initial return array
		$return = array(
			'errors' => false,
		);

		// Check the nonce
		if( !wp_verify_nonce( $ajax_data[ 'has_email_nonce' ], 'has_email_nonce' ) ) {
			$return[ 'errors' ] = true;
			$return[ 'message' ] = __( 'Nonce could not be verified.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Set Email Variables
		$email_to = trim( urldecode( $ajax_data[ 'has_target_email' ] ) );
		$email_from = trim( urldecode( $ajax_data[ 'has_source_email' ] ) );
		$email_name = trim( urldecode( $ajax_data[ 'has_source_name' ] ) );
		$email_subject = trim( urldecode( $ajax_data[ 'has_email_subject' ] ) );
		$email_selected_text = trim( urldecode( $ajax_data[ 'has_selected_text' ] ) );

		// Set title and url variables
		$title = trim( urldecode( $ajax_data[ 'has_source_title' ] ) );
		$url = trim( urldecode( $ajax_data[ 'has_source_url' ] ) );

		// Check emails to destination
		if( !is_email( $email_to ) ) {
			$return[ 'errors' ] = true;
			$return[ 'message' ] = __( 'The Send email address is not a valid email address.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check emails from destination
		if( !is_email( $email_from ) ) {
			$return[ 'errors' ] = true;
			$return[ 'message' ] = __( 'Your email address is not a valid email address.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check emails from destination
		if( empty( $email_name ) ) {
			$return[ 'errors' ] = true;
			$return[ 'message' ] = __( 'Your name cannot be empty.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check Subject
		if( empty( $email_subject ) ) {
			$email_subject = __( '[Shared Post]', 'highlight-and-share' ) . ' ' . $title;
		}

		$message = sprintf( __( '%s (%s) wants to share a link with you.', 'highlight-and-share' ), esc_html( $email_name ), esc_html( $email_from ) ) . "\r\n\n";
		$message .= sprintf( '"%s"', esc_html( $email_selected_text ) ) . "\r\n\r\n";
    	$message .= sprintf( '%s', esc_html( $title ) ) . "\r\n";
		$message .= sprintf( '%s', esc_url( $url ) ) . "\r\n\r\n";

    	$headers = array();
    	$headers[] = sprintf( 'From: %s <%s>', $email_name, $email_from );

    	wp_mail( $email_to, $email_subject, $message, $headers );

		$return[ 'message_title' ] = __( 'This post has been shared!', 'highlight-and-share' );
		$return[ 'message_body' ] = sprintf( __( 'You have shared this post with %s', 'highlight-and-share' ), $email_to );
		$return[ 'message_subject' ] = __( '[Shared Post]', 'highlight-and-share' ) . ' ' . $title;
		$return[ 'message_source_name' ] = $email_name;
		$return[ 'message_source_email' ] = $email_from;
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
     * @param  string key to retrieve
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
	 *
	 */
	public function init() {
		$settings = $this->get_plugin_options();

		//Admin Settings
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'init_admin_settings' ) );

		//Plugin settings
		add_filter( 'plugin_action_links_' . plugin_basename(__FILE__) , array( $this, 'add_settings_link' ) );

	} //end init

	public function wp_loaded() {
    	//Disable if on a feed
		if ( is_feed() ) return;

		$settings = $this->get_plugin_options();

		//Skip loading if both twitter/facebook are turned off
		$show_facebook = (bool)apply_filters( 'has_show_facebook', $settings[ 'show_facebook' ] );
		$show_twitter = (bool)apply_filters( 'has_show_twitter', $settings[ 'show_twitter' ] );
		$show_linkedin = (bool)apply_filters( 'has_show_linkedin', $settings[ 'show_linkedin' ] );
		$show_pinterest = (bool)apply_filters( 'has_show_pinterest', $settings[ 'show_pinterest' ] );
		$show_email = (bool)apply_filters( 'has_show_email', $settings[ 'show_email' ] );
		if ( ! $show_facebook && ! $show_twitter && ! $show_linkedin && ! $show_pinterest && ! $show_email ) return;

		//Disable if mobile
		if ( wp_is_mobile() ) {
			if ( (bool)apply_filters( 'has_enable_mobile', true ) ) {
				add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_mobile' ) );
			} else {
				return;
			}
		}

		//Load scripts
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );

		//Load content area
		if ( apply_filters( 'has_enable_content', (bool)$settings[ 'enable_content' ] ) ) {
			add_filter( 'the_content', array( $this, 'content_area' ) );
		}
		if ( apply_filters( 'has_enable_excerpt', (bool)$settings[ 'enable_excerpt' ] ) ) {
			add_filter( 'the_excerpt', array( $this, 'excerpt_area' ) );
		}
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
	 * @param string $content Main post content
	 * @return string $content Modified
	 */
	public function content_area( $content ) {
		global $post;
		if ( !in_the_loop( ) ) return $content;
		if ( !is_object( $post ) ) return $content;

		$post_id = $post->ID;
		$url = $this->get_content_url( $post_id );
		$title = get_the_title( $post_id );
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
	 * @param string $content Main excerpt content
	 * @return string $content Modified
	 */
	public function excerpt_area( $content ) {
		global $post;
		if ( !in_the_loop( ) ) return $content;
		if ( !is_object( $post ) ) return $content;

		$post_id = $post->ID;
		$url = $this->get_content_url( $post_id );
		$title = get_the_title( $post_id );
		$content = sprintf( '<div class="has-excerpt-area" data-url="%s" data-title="%s">%s</div>', esc_url( $url ), esc_attr( $title ), $content );
		return $content;


	}

	/**
	 * Retrieve a post's URL
	 *
	 * Retrieve a post's URL (may be shortened)
	 *
	 * @since 1.1
	 * @access private
	 *
	 *
	 * @param int $post_id Post ID to retrieve the URL for
	 * @return string $url URL to the post
	 */
	private function get_content_url( $post_id ) {
		$settings = $this->get_plugin_options();
		$enable_shortlinks = isset( $settings[ 'shortlinks' ] ) ? (bool)$settings[ 'shortlinks' ] : false;
		$url = get_permalink( $post_id );
		if ( $enable_shortlinks ) {
			$url  = wp_get_shortlink( $post_id );
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
	 * @param array $links Array of plugin options
	 * @return array $links Array of plugin options
	 */
	public function add_settings_link( $links ) {
		$settings_link = sprintf( '<a href="%s">%s</a>', esc_url( admin_url( 'options-general.php?page=highlight-and-share' ) ), _x( 'Settings', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
			array_unshift($links, $settings_link);
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
	 *
	 */
	public function add_scripts() {
			$deps = array( 'jquery' );
			if ( wp_is_mobile() && apply_filters( 'has_enable_mobile', true ) ) {
				$deps[] = 'jquery.mobile';
			}
			$sweet_alert_uri = $this->get_plugin_url( 'js/sweetalert2.all.min.js');
			$deps[] = 'sweetalert2';
			wp_register_script( 'sweetalert2', $sweet_alert_uri, array( 'jquery' ), '7.28.4', true );
			$main_script_uri = $this->get_plugin_url( 'js/highlight-and-share.js' );
			wp_enqueue_script( 'highlight-and-share', $main_script_uri, $deps, HIGHLIGHT_AND_SHARE_VERSION, true );

			/**Build JSON Object**/
			$settings = $this->get_plugin_options();
			$json_arr = array();

			// Facebook
			if( is_customize_preview()) {
				$maybe_facebook = get_option( 'highlight-and-share');
				if( !isset( $maybe_facebook[ 'show_facebook' ] ) ) {
					$json_arr[ 'show_facebook' ] = (bool)apply_filters( 'has_show_facebook', $settings[ 'show_facebook' ] );
				} else {
					$json_arr[ 'show_facebook' ] =  apply_filters( 'has_show_facebook', $maybe_facebook[ 'show_facebook' ] );
				}
			} else {
				$json_arr[ 'show_facebook' ] = (bool)apply_filters( 'has_show_facebook', $settings[ 'show_facebook' ] );
			}

			// Twitter
			if( is_customize_preview()) {
				$maybe_twitter = get_option( 'highlight-and-share');
				if( !isset( $maybe_twitter[ 'show_twitter' ] ) ) {
					$json_arr[ 'show_twitter' ] = (bool)apply_filters( 'has_show_twitter', $settings[ 'show_twitter' ] );
				} else {
					$json_arr[ 'show_twitter' ] =  apply_filters( 'has_show_twitter', $maybe_twitter[ 'show_twitter' ] );
				}
			} else {
				$json_arr[ 'show_twitter' ] = (bool)apply_filters( 'has_show_twitter', $settings[ 'show_twitter' ] );
			}


			// Linked In
			if( is_customize_preview()) {
				$maybe_linkedin = get_option( 'highlight-and-share');
				if( !isset( $maybe_linkedin[ 'show_linkedin' ] ) ) {
					$json_arr[ 'show_linkedin' ] = (bool)apply_filters( 'has_show_linkedin', $settings[ 'show_linkedin' ] );
				} else {
					$json_arr[ 'show_linkedin' ] =  apply_filters( 'has_show_linkedin', $maybe_linkedin[ 'show_linkedin' ] );
				}
			} else {
				$json_arr[ 'show_linkedin' ] = (bool)apply_filters( 'has_show_linkedin', $settings[ 'show_linkedin' ] );
			}

			// Pinterest
			if( is_customize_preview()) {
				$maybe_pinterest = get_option( 'highlight-and-share');
				if( !isset( $maybe_pinterest[ 'show_pinterest' ] ) ) {
					$json_arr[ 'show_pinterest' ] = (bool)apply_filters( 'has_show_pinterest', $settings[ 'show_pinterest' ] );
				} else {
					$json_arr[ 'show_pinterest' ] =  apply_filters( 'has_show_pinterest', $maybe_pinterest[ 'show_pinterest' ] );
				}
			} else {
				$json_arr[ 'show_pinterest' ] = (bool)apply_filters( 'has_show_pinterest', $settings[ 'show_pinterest' ] );
			}

			// Email
			if( is_customize_preview()) {
				$maybe_email = get_option( 'highlight-and-share');
				if( !isset( $maybe_email[ 'show_email' ] ) ) {
					$json_arr[ 'show_email' ] = (bool)apply_filters( 'has_show_email', $settings[ 'show_email' ] );
				} else {
					$json_arr[ 'show_email' ] =  apply_filters( 'has_show_email', $maybe_email[ 'show_email' ] );
				}
			} else {
				$json_arr[ 'show_email' ] = (bool)apply_filters( 'has_show_email', $settings[ 'show_email' ] );
			}

			// Xing
			if( is_customize_preview()) {
				$maybe_xing = get_option( 'highlight-and-share');
				if( !isset( $maybe_xing[ 'show_xing' ] ) ) {
					$json_arr[ 'show_xing' ] = (bool)apply_filters( 'has_show_xing', $settings[ 'show_xing' ] );
				} else {
					$json_arr[ 'show_xing' ] =  apply_filters( 'has_show_xing', $maybe_xing[ 'show_xing' ] );
				}
			} else {
				$json_arr[ 'show_xing' ] = (bool)apply_filters( 'has_show_xing', $settings[ 'show_xing' ] );
			}

			// Whatsapp
			if( is_customize_preview()) {
				$maybe_whatsapp = get_option( 'highlight-and-share');
				if( !isset( $maybe_whatsapp[ 'show_whatsapp' ] ) ) {
					$json_arr[ 'show_whatsapp' ] = (bool)apply_filters( 'has_show_whatsapp', $settings[ 'show_whatsapp' ] );
				} else {
					$json_arr[ 'show_whatsapp' ] =  apply_filters( 'has_show_whatsapp', $maybe_whatsapp[ 'show_whatsapp' ] );
				}
			} else {
				$json_arr[ 'show_whatsapp' ] = (bool)apply_filters( 'has_show_whatsapp', $settings[ 'show_whatsapp' ] );
			}

			//Twitter Username
			$json_arr[ 'twitter_username' ] = trim( sanitize_text_field( apply_filters( 'has_twitter_username', $settings[ 'twitter' ] ) ) );

			// Twitter FontAwesome Class
			if( is_customize_preview()) {
				$font_awesome = get_option( 'highlight-and-share');
				if( !isset( $font_awesome[ 'twitter_fa_class' ] ) ) {
					$json_arr[ 'twitter_fa_class' ] = sanitize_text_field( $settings[ 'twitter_fa_class' ] );
				} else {
					$json_arr[ 'twitter_fa_class' ] = $font_awesome[ 'twitter_fa_class' ];
				}
			} else {
				$json_arr[ 'twitter_fa_class' ] = sanitize_text_field( $settings[ 'twitter_fa_class' ] );
			}

			// Facebook FontAwesome Class
			if( is_customize_preview()) {
				$font_awesome = get_option( 'highlight-and-share');
				if( !isset( $font_awesome[ 'facebook_fa_class' ] ) ) {
					$json_arr[ 'facebook_fa_class' ] = sanitize_text_field( $settings[ 'facebook_fa_class' ] );
				} else {
					$json_arr[ 'facebook_fa_class' ] = $font_awesome[ 'facebook_fa_class' ];
				}
			} else {
				$json_arr[ 'facebook_fa_class' ] = sanitize_text_field( $settings[ 'facebook_fa_class' ] );
			}

			// LinkedIn FontAwesome Class
			if( is_customize_preview()) {
				$font_awesome = get_option( 'highlight-and-share');
				if( !isset( $font_awesome[ 'linkedin_fa_class' ] ) ) {
					$json_arr[ 'linkedin_fa_class' ] = sanitize_text_field( $settings[ 'linkedin_fa_class' ] );
				} else {
					$json_arr[ 'linkedin_fa_class' ] = $font_awesome[ 'linkedin_fa_class' ];
				}
			} else {
				$json_arr[ 'linkedin_fa_class' ] = sanitize_text_field( $settings[ 'linkedin_fa_class' ] );
			}

			// Pinterest FontAwesome Class
			if( is_customize_preview()) {
				$font_awesome = get_option( 'highlight-and-share');
				if( !isset( $font_awesome[ 'pinterest_fa_class' ] ) ) {
					$json_arr[ 'pinterest_fa_class' ] = sanitize_text_field( $settings[ 'pinterest_fa_class' ] );
				} else {
					$json_arr[ 'pinterest_fa_class' ] = $font_awesome[ 'pinterest_fa_class' ];
				}
			} else {
				$json_arr[ 'pinterest_fa_class' ] = sanitize_text_field( $settings[ 'pinterest_fa_class' ] );
			}

			// Xing FontAwesome Class
			if( is_customize_preview()) {
				$font_awesome = get_option( 'highlight-and-share');
				if( !isset( $font_awesome[ 'xing_fa_class' ] ) ) {
					$json_arr[ 'xing_fa_class' ] = sanitize_text_field( $settings[ 'xing_fa_class' ] );
				} else {
					$json_arr[ 'xing_fa_class' ] = $font_awesome[ 'xing_fa_class' ];
				}
			} else {
				$json_arr[ 'xing_fa_class' ] = sanitize_text_field( $settings[ 'xing_fa_class' ] );
			}

			// WhatsApp FontAwesome Class
			if( is_customize_preview()) {
				$font_awesome = get_option( 'highlight-and-share');
				if( !isset( $font_awesome[ 'whatsapp_fa_class' ] ) ) {
					$json_arr[ 'whatsapp_fa_class' ] = sanitize_text_field( $settings[ 'whatsapp_fa_class' ] );
				} else {
					$json_arr[ 'whatsapp_fa_class' ] = $font_awesome[ 'whatsapp_fa_class' ];
				}
			} else {
				$json_arr[ 'whatsapp_fa_class' ] = sanitize_text_field( $settings[ 'whatsapp_fa_class' ] );
			}

			// Email FontAwesome Class
			if( is_customize_preview()) {
				$font_awesome = get_option( 'highlight-and-share');
				if( !isset( $font_awesome[ 'email_fa_class' ] ) ) {
					$json_arr[ 'email_fa_class' ] = sanitize_text_field( $settings[ 'email_fa_class' ] );
				} else {
					$json_arr[ 'email_fa_class' ] = $font_awesome[ 'email_fa_class' ];
				}
			} else {
				$json_arr[ 'email_fa_class' ] = sanitize_text_field( $settings[ 'email_fa_class' ] );
			}

			//Override the filter if no username is present for twitter
			if ( empty( $json_arr[ 'twitter_username' ] ) ) {
				$json_arr[ 'twitter_username' ] = '';
			}

			//Add mobile
			if ( wp_is_mobile() ) {
				$json_arr[ 'mobile' ] = true;
			} else {
				$json_arr[ 'mobile' ] = false;
			}

			//Content areas
			$classes = apply_filters( 'has_js_classes', $settings[ 'js_content' ] ); //Pass comma separated values (e.g., entry-content,type-post,type-page)
			$classes = explode( ',', $classes );
			if ( apply_filters( 'has_enable_content', (bool)$settings[ 'enable_content' ] ) ) {
				$classes[] = 'has-content-area';
			}
			if ( apply_filters( 'has_enable_excerpt', (bool)$settings[ 'enable_excerpt' ] ) ) {
				$classes[] = 'has-excerpt-area';
			}
			foreach( $classes as $index => &$string ) {
				$string = trim( $string ); //Trim
				if ( empty( $string ) ) {
					unset( $classes[ $index ] );
					continue;
				}
				$string = trim( esc_js( '.' . $string ) );	//Get in class format (.%s) and trim just in case
			}
			$ids = (array)apply_filters( 'has_js_ids', array() ); //Pass array of jQuery ID elements (without the #)
			foreach( $ids as $index => &$string ) {
				$string = trim( $string );
				if ( empty( $string ) ) continue;
				$string = trim( esc_js( '#' . $string ) ); //Get in ID format (#%s) and trim just in case
			}
			$elements = (array)apply_filters( 'has_js_elements', array() ); //Pass array of jQuery HTML elements (e.g., blockquote, article)
			foreach( $elements as $index => &$string ) {
				$string = trim( $string );
				if ( empty( $string ) ) continue;
				$string = trim( esc_js( $string ) );
			}
			$content = array_merge( $classes, $ids, $elements );
			$json_arr[ 'content' ] = apply_filters( 'has_js_selectors', implode(',', $content ), $content, $classes, $ids, $elements );

			//Text to display
			$json_arr[ 'tweet_text' ] = apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) );
			$json_arr[ 'facebook_text' ] = apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) );
			$json_arr[ 'linkedin_text' ] = apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) );
			$json_arr[ 'pinterest_text' ] = apply_filters( 'has_pinterest_text', _x( 'Pinterest', 'Pinterest share text', 'highlight-and-share' ) );
			$json_arr[ 'whatsapp_text' ] = apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) );
			$json_arr[ 'xing_text' ] = apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) );
			$json_arr[ 'email_text' ] = apply_filters( 'has_email_text', _x( 'E-mail', 'E-mail share text', 'highlight-and-share' ) );

			//Icons
			if( is_customize_preview()) {
				$maybe_icons = get_option( 'highlight-and-share' );
				if( isset( $maybe_icons[ 'icons' ] ) ) {
					$json_arr[ 'icons' ] =  apply_filters( 'has_icons', $maybe_icons[ 'icons' ] );
				} else {
					$json_arr[ 'icons' ] = apply_filters( 'has_icons', $settings[ 'icons' ] );
				}
			} else {
				$json_arr[ 'icons' ] = apply_filters( 'has_icons', $settings[ 'icons' ] );
			}


			// Facebook API Key
			$json_arr[ 'facebook_app_id' ] = isset( $settings[ 'facebook_app_id' ] ) ? sanitize_text_field( $settings[ 'facebook_app_id' ] ) : 0;

			// For emails
			if ( is_user_logged_in() ) {
				$user = wp_get_current_user();
				$json_arr[ 'email_your_name_value' ] = $user->display_name;
				$json_arr[ 'email_from_value' ] = $user->user_email;
			} else {
				$json_arr[ 'email_your_name_value' ] = '';
				$json_arr[ 'email_from_value' ] = '';
			}
			$json_arr[ 'nonce' ] = wp_create_nonce( 'has_email_nonce' );
			$json_arr[ 'ajax_url' ] = admin_url( 'admin-ajax.php' );
			$json_arr[ 'email_share' ] = __( 'Share This Post Via Email', 'highlight-and-share' );
			$json_arr[ 'email_subject' ] = __( 'Your Subject', 'highlight-and-share' );
			$json_arr[ 'email_your_name' ] = __( 'Your Name', 'highlight-and-share' );
			$json_arr[ 'email_send_email' ] = __( 'Send to Email Address', 'highlight-and-share' );
			$json_arr[ 'email_subject'] = __( 'Your Subject', 'highlight-and-share' );
			$json_arr[ 'email_subject_text'] = __( '[Shared Post]', 'highlight-and-share' ) . ' ' . '%title%';
			$json_arr[ 'email_from' ] = __( 'Your Email Address', 'highlight-and-share' );
			$json_arr[ 'email_send' ] = __( 'Send Email', 'highlight-and-share' );
			$json_arr[ 'email_cancel' ] = __( 'Cancel', 'highlight-and-share' );
			$json_arr[ 'email_close' ] = __( 'Close', 'highlight-and-share' );
			$json_arr[ 'email_loading' ] = $this->get_plugin_url( 'img/loading.gif' );
			$json_arr[ 'email_subject_error' ] = __( 'You must fill in a subject.', 'highlight-and-share' );
			$json_arr[ 'email_email_to' ] = __( 'Send to Email Address is blank.', 'highlight-and-share' );
			$json_arr[ 'email_email_from' ] = __( 'Your email address is blank.', 'highlight-and-share' );
			$json_arr[ 'email_email_name' ] = __( 'Your name is blank.', 'highlight-and-share' );
			$json_arr[ 'email_sending' ] = __( 'Sending...', 'highlight-and-share' );
			$json_arr[ 'customizer_preview' ] = is_customize_preview();

			//Localize
			wp_localize_script( 'highlight-and-share', 'highlight_and_share', $json_arr );

			//Add CSS
			if ( apply_filters( 'has_load_css', true ) ) {
				wp_enqueue_style( 'highlight-and-share-email', $this->get_plugin_url( 'css/highlight-and-share-emails.css'), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				if( is_customize_preview() ) {
					$maybe_theme = get_option( 'highlight-and-share' );
					if( isset( $maybe_theme[ 'theme' ] ) ) {
						$this->output_stylesheets( $maybe_theme[ 'theme' ] );
					} else {
						$this->output_stylesheets( $settings[ 'theme' ] );
					}
				} else {
					$this->output_stylesheets( $settings[ 'theme' ] );
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
	 * @param string $theme The theme to output
	 *
	 */
	private function output_stylesheets( $theme ) {
		switch( $theme ) {
			case 'off':
				break;
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
			case 'magenta':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-magenta.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			default:
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
		}
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
	 *
	 */
    public function add_scripts_mobile() {
        $main_script_uri = $this->get_plugin_url( 'js/jquery.mobile.custom.min.js' );
        if ( defined( 'SCRIPT_DEBUG' ) ) {
    		if ( SCRIPT_DEBUG == true ) {
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
	 *
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
	 *
	 */
	public function options_page() {
	?>
	    <div class="wrap">
	        <h2><?php echo esc_html( _x( 'Highlight and Share', 'Plugin Name - Settings Page Title', 'highlight-and-share' ) ); ?></h2>
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
	 *
	 */
	public function init_admin_settings() {
		register_setting( 'highlight-and-share', 'highlight-and-share', array( $this, 'sanitization' ) );
		add_settings_section( 'has-display', _x( 'Display', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );
		add_settings_section( 'has-config', _x( 'Content', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-twitter', _x( 'Twitter Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-facebook', _x( 'Facebook Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-linkedin', _x( 'LinkedIn Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-pinterest', _x( 'Pinterest Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-whatsapp', _x( 'WhatsApp Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-xing', _x( 'Xing Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-email', _x( 'E-mail Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-shortlink', _x( 'Post URL Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_section( 'has-advanced', _x( 'Advanced', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );

		add_settings_field( 'hightlight-and-share-display-enable', __( 'Show Icons Only', 'highlight-and-share' ), array( $this, 'add_settings_field_display_enable' ), 'highlight-and-share', 'has-display', array( 'desc' => __( 'Show icons only. Recommended if you choose more than two options to show.', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-display-theme', __( 'Choose Theme', 'highlight-and-share' ), array( $this, 'add_settings_field_display_theme' ), 'highlight-and-share', 'has-display', array( 'desc' => __( 'Choose a theme to display on the front-end. Some themes require Show Icons Only to be enabled.', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-content-enable', __( 'Add to Post Content', 'highlight-and-share' ), array( $this, 'add_settings_field_content_enable' ), 'highlight-and-share', 'has-config', array( 'desc' => __( 'Would you like to add sharing to the main content areas?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-excerpt-enable', __( 'Add to Excerpt Content', 'highlight-and-share' ), array( $this, 'add_settings_field_excerpt_enable' ), 'highlight-and-share', 'has-config', array( 'desc' => __( 'Would you like to add sharing to the excerpts?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-twitter-enable', __( 'Show Twitter Option', 'highlight-and-share' ), array( $this, 'add_settings_field_twitter_enable' ), 'highlight-and-share', 'has-twitter', array( 'desc' => __( 'Would you like to enable sharing via Twitter?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-linkedin-enable', __( 'Show LinkedIn Option', 'highlight-and-share' ), array( $this, 'add_settings_field_linkedin_enable' ), 'highlight-and-share', 'has-linkedin', array( 'desc' => __( 'Would you like to enable sharing via LinkedIn?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-pinterest-enable', __( 'Show Pinterest Option', 'highlight-and-share' ), array( $this, 'add_settings_field_pinterest_enable' ), 'highlight-and-share', 'has-pinterest', array( 'desc' => __( 'Would you like to enable sharing via Pinterest?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-whatsapp-enable', __( 'Show WhatsApp Option', 'highlight-and-share' ), array( $this, 'add_settings_field_whatsapp_enable' ), 'highlight-and-share', 'has-whatsapp', array( 'desc' => __( 'Would you like to enable sharing via WhatsApp?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-xing-enable', __( 'Show Xing Option', 'highlight-and-share' ), array( $this, 'add_settings_field_xing_enable' ), 'highlight-and-share', 'has-xing', array( 'desc' => __( 'Would you like to enable sharing via Xing?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-email-enable', __( 'Show E-mail Option', 'highlight-and-share' ), array( $this, 'add_settings_field_email_enable' ), 'highlight-and-share', 'has-email', array( 'desc' => __( 'Would you like to enable sharing via E-mail?', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-twitter-handle', __( 'Twitter Username', 'highlight-and-share' ), array( $this, 'add_settings_field_twitter' ), 'highlight-and-share', 'has-twitter', array( 'label_for' => 'hightlight-and-share-twitter-handle', 'desc' => __( 'Enter Your Twitter Username', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-facebook-enable', __( 'Show Facebook Option', 'highlight-and-share' ), array( $this, 'add_settings_field_facebook_enable' ), 'highlight-and-share', 'has-facebook', array( 'desc' => __( 'Would you like to enable sharing via Facebook?', 'highlight-and-share' ) ) );
		add_settings_field( 'hightlight-and-share-facebook-api', __( 'Facebook App ID', 'highlight-and-share' ), array( $this, 'add_settings_field_facebook_api' ), 'highlight-and-share', 'has-facebook', array( 'label_for' => 'hightlight-and-share-facebook-api', 'desc' => __( 'A Facebook App ID allows you to highlight text and share it.', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-shortlink-enable', __( 'Shortlinks', 'highlight-and-share' ), array( $this, 'add_settings_field_shortlink_enable' ), 'highlight-and-share', 'has-shortlink', array( 'desc' => __( 'Please decide if you would like to use the default post URL or a shortened version.', 'highlight-and-share' ) ) );

		add_settings_field( 'hightlight-and-share-js-content', _x( 'jQuery classes', 'Label - Where in the HTML document to search for text to capture', 'highlight-and-share' ), array( $this, 'add_settings_field_js_content' ), 'highlight-and-share', 'has-advanced', array( 'label_for' => 'hightlight-and-share-js-content', 'desc' => __( 'Enter jQuery classes to search for in the HTML.  You must comma-separate classes (e.g., entry-content,post,page).', 'highlight-and-share' ) ) );
		add_settings_field( 'hightlight-and-share-fa-content', __( 'Font Awesome Classes', 'highlight-and-share' ), array( $this, 'add_settings_field_fa_content' ), 'highlight-and-share', 'has-advanced', array( 'label_for' => 'hightlight-and-share-fa-content', 'desc' => __( 'Enter your own Font Awesome classes for the icons.', 'highlight-and-share' ) ) );

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
	 *
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
	 * @param array $input {
	 *		@type string $js_content Content to be parsed via Javascript.  Default 'entry-content'.
	 *
	 *		@type string $twitter Twitter username.  Default ''.
	 *		@type bool $show_twitter Whether to show twitter share option.  Default true.
	 *		@type bool $show_facebook Whether to show facebook share option.  Default true
	 * }
	 *
	 * @return array Sanitized array of options
	 */
	public function sanitization( $input = array() ) {
		$output = get_option( 'highlight-and-share' );

		//Check if settings are being initialized for the first time
		if ( false === $output ) {
			//No settings have been saved yet and we're being supplied with defaults
			foreach( $input as $key => &$value ) {
				if ( is_bool( $value ) ) continue;
				$value = sanitize_text_field( $value );
			}
			return $input;
		}
		//Settings are being saved.  Update.
		foreach( $input as $key => $value ) {
			switch( $key ) {
				case 'twitter':
					$twitter_username = trim( $value );
					if ( empty( $twitter_username ) ) {
						$output[ $key ] ='';
					} elseif ( !preg_match( '/^[a-zA-Z0-9_]{1,15}$/', $twitter_username ) ) {
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
					if( empty( $js_content ) || preg_match( '/[-_0-9a-zA-Z]+(,[-_0-9a-zA-Z]+)*$/', $js_content ) ) {
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
				case 'pinterest_fa_class':
				case 'xing_fa_class':
				case 'whatsapp_fa_class':
				case 'email_fa_class':
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
				case 'show_pinterest':
				case 'show_linkedin':
					if ( $input[ $key ] == 'on' ) {
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_js_content( $args = array() ) {
		$settings = $this->get_plugin_options();
		$js_content = isset( $settings[ 'js_content' ] ) ? $settings[ 'js_content' ] : '';
		printf( '<p>%s</p>', esc_html( $args[ 'desc' ] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[js_content]" value="%s" />', esc_attr( $args[ 'label_for' ] ), esc_attr( $js_content ) );
	}

	/**
	 * Output custom Font Awesome classes
	 *
	 * Output custom Font Awesome classes.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_fa_content( $args = array() ) {
		$settings = $this->get_plugin_options();
		$twitter_fa_class = isset( $settings[ 'twitter_fa_class' ] ) ? $settings[ 'twitter_fa_class' ] : '';
		$facebook_fa_class = isset( $settings[ 'facebook_fa_class' ] ) ? $settings[ 'facebook_fa_class' ] : '';
		$linkedin_fa_class = isset( $settings[ 'linkedin_fa_class' ] ) ? $settings[ 'linkedin_fa_class' ] : '';
		$pinterest_fa_class = isset( $settings[ 'pinterest_fa_class' ] ) ? $settings[ 'pinterest_fa_class' ] : '';
		$xing_fa_class = isset( $settings[ 'xing_fa_class' ] ) ? $settings[ 'xing_fa_class' ] : '';
		$whatsapp_fa_class = isset( $settings[ 'whatsapp_fa_class' ] ) ? $settings[ 'whatsapp_fa_class' ] : '';
		$email_fa_class = isset( $settings[ 'email_fa_class' ] ) ? $settings[ 'email_fa_class' ] : '';
		printf( '<p>%s</p>', esc_html( $args[ 'desc' ] ) );

		// Twitter
		echo '<p>';
		printf( '<label for="twitter_fa_class"><strong>%s</strong></label><br />', esc_html__( 'Twitter Font Awesome Class', 'highlight-and-share' ) );
		printf( '<input id="twitter_fa_class" type="text" name="highlight-and-share[twitter_fa_class]" value="%s" />', esc_attr( $twitter_fa_class ) );
		echo '</p>';

		// Facebook
		echo '<p>';
		printf( '<label for="facebook_fa_class"><strong>%s</strong></label><br />', esc_html__( 'Facebok Font Awesome Class', 'highlight-and-share' ) );
		printf( '<input id="facebook_fa_class" type="text" name="highlight-and-share[facebook_fa_class]" value="%s" />', esc_attr( $facebook_fa_class ) );
		echo '</p>';

		// LinkedIn
		echo '<p>';
		printf( '<label for="linkedin_fa_class"><strong>%s</strong></label><br />', esc_html__( 'LinkedIn Font Awesome Class', 'highlight-and-share' ) );
		printf( '<input id="linkedin_fa_class" type="text" name="highlight-and-share[linkedin_fa_class]" value="%s" />', esc_attr( $linkedin_fa_class ) );
		echo '</p>';

		// Pinterest
		echo '<p>';
		printf( '<label for="pinterest_fa_class"><strong>%s</strong></label><br />', esc_html__( 'Pinterest Font Awesome Class', 'highlight-and-share' ) );
		printf( '<input id="pinterest_fa_class" type="text" name="highlight-and-share[pinterest_fa_class]" value="%s" />', esc_attr( $pinterest_fa_class ) );
		echo '</p>';

		// Xing
		echo '<p>';
		printf( '<label for="xing_fa_class"><strong>%s</strong></label><br />', esc_html__( 'Xing Font Awesome Class', 'highlight-and-share' ) );
		printf( '<input id="xing_fa_class" type="text" name="highlight-and-share[xing_fa_class]" value="%s" />', esc_attr( $xing_fa_class ) );
		echo '</p>';

		// WhatsApp
		echo '<p>';
		printf( '<label for="whatsapp_fa_class"><strong>%s</strong></label><br />', esc_html__( 'WhatsApp Font Awesome Class', 'highlight-and-share' ) );
		printf( '<input id="whatsapp_fa_class" type="text" name="highlight-and-share[whatsapp_fa_class]" value="%s" />', esc_attr( $whatsapp_fa_class ) );
		echo '</p>';

		// Email
		echo '<p>';
		printf( '<label for="email_fa_class"><strong>%s</strong></label><br />', esc_html__( 'Email Font Awesome Class', 'highlight-and-share' ) );
		printf( '<input id="email_fa_class" type="text" name="highlight-and-share[email_fa_class]" value="%s" />', esc_attr( $email_fa_class ) );
		echo '</p>';
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_twitter( $args = array() ) {
		$settings = $this->get_plugin_options();
		$js_content = isset( $settings[ 'twitter' ] ) ? $settings[ 'twitter' ] : '';
		printf( '<p>%s</p>', esc_html( $args[ 'desc' ] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[twitter]" value="%s" />', esc_attr( $args[ 'label_for' ] ), esc_attr( $js_content ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_display_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_icons = isset( $settings[ 'icons' ] ) ? (bool)$settings[ 'icons' ] : false;
		echo '<input name="highlight-and-share[icons]" value="off" type="hidden" />';
		printf( '<input id="has-show-icons" type="checkbox" name="highlight-and-share[icons]" value="on" %s />&nbsp;<label for="has-show-icons">%s</label>', checked( true, $enable_icons, false ), __( 'Enable Icons Only?', 'highlight-and-share' ) );
		$bfa = sprintf( '<a href="%s">Requires %s or equivalent.</a>', 'https://wordpress.org/plugins/better-font-awesome/', __( 'Better Font Awesome', 'highlight-and-share' ) );
		printf( '<div><em>%s<br />%s</em></div>', $bfa, esc_html( $args[ 'desc' ] ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_display_theme( $args = array() ) {
		$settings = $this->get_plugin_options();
		$theme = isset( $settings[ 'theme' ] ) ? $settings[ 'theme' ] : 'default';
		?>
		<select name="highlight-and-share[theme]">
			<option value="off" <?php selected( 'off', $theme, true); ?>><?php esc_html_e( 'Off', 'highlight-and-share' ); ?></option>
			<option value="default" <?php selected( 'default', $theme, true); ?>><?php esc_html_e( 'Default', 'highlight-and-share' ); ?></option>
			<option value="brand-colors" <?php selected( 'brand-colors', $theme, true); ?>><?php esc_html_e( 'Brand Colors (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="black" <?php selected( 'black', $theme, true); ?>><?php esc_html_e( 'Black (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="white" <?php selected( 'white', $theme, true); ?>><?php esc_html_e( 'White (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="magenta" <?php selected( 'magenta', $theme, true); ?>><?php esc_html_e( 'Magenta (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="blue" <?php selected( 'blue', $theme, true); ?>><?php esc_html_e( 'Blue (Icons Only)', 'highlight-and-share' ); ?></option>
			<option value="green" <?php selected( 'green', $theme, true); ?>><?php esc_html_e( 'Green (Icons Only)', 'highlight-and-share' ); ?></option>
		</select>
		<?php
		printf( '<div><em></em></div>', esc_html( $args[ 'desc' ] ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_twitter_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_twitter = isset( $settings[ 'show_twitter' ] ) ? (bool)$settings[ 'show_twitter' ] : true;
		echo '<input name="highlight-and-share[show_twitter]" value="off" type="hidden" />';
		printf( '<input id="has-show-twitter" type="checkbox" name="highlight-and-share[show_twitter]" value="on" %s />&nbsp;<label for="has-show-twitter">%s</label>', checked( true, $enable_twitter, false ), __( 'Enable Twitter Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_linkedin_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$linkedin = isset( $settings[ 'show_linkedin' ] ) ? (bool)$settings[ 'show_linkedin' ] : true;
		echo '<input name="highlight-and-share[show_linkedin]" value="off" type="hidden" />';
		printf( '<input id="has-show-linkedin" type="checkbox" name="highlight-and-share[show_linkedin]" value="on" %s />&nbsp;<label for="has-show-linkedin">%s</label>', checked( true, $linkedin, false ), __( 'Enable LinkedIn Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Pinterest Option for Sharing
	 *
	 * Output checkbox for displaying Pinterest sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_pinterest_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$pinterest = isset( $settings[ 'show_pinterest' ] ) ? (bool)$settings[ 'show_pinterest' ] : true;
		echo '<input name="highlight-and-share[show_pinterest]" value="off" type="hidden" />';
		printf( '<input id="has-show-pinterest" type="checkbox" name="highlight-and-share[show_pinterest]" value="on" %s />&nbsp;<label for="has-show-pinterest">%s</label>', checked( true, $pinterest, false ), __( 'Enable Pinterest Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_xing_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$xing = isset( $settings[ 'show_xing' ] ) ? (bool)$settings[ 'show_xing' ] : true;
		echo '<input name="highlight-and-share[show_xing]" value="off" type="hidden" />';
		printf( '<input id="has-show-xing" type="checkbox" name="highlight-and-share[show_xing]" value="on" %s />&nbsp;<label for="has-show-xing">%s</label>', checked( true, $xing, false ), __( 'Enable Xing Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 *}
	 */
	public function add_settings_field_whatsapp_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$whatsapp = isset( $settings[ 'show_whatsapp' ] ) ? (bool)$settings[ 'show_whatsapp' ] : true;
		echo '<input name="highlight-and-share[show_whatsapp]" value="off" type="hidden" />';
		printf( '<input id="has-show-whatsapp" type="checkbox" name="highlight-and-share[show_whatsapp]" value="on" %s />&nbsp;<label for="has-show-whatsapp">%s</label>', checked( true, $whatsapp, false ), __( 'Enable WhatsApp Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 *		@type string $label_for Settings label and ID.
	 *
	 *		@type string $desc Description for the setting.
	 *
	 * }
	 */
	public function add_settings_field_email_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$email = isset( $settings[ 'show_email' ] ) ? (bool)$settings[ 'show_email' ] : true;
		echo '<input name="highlight-and-share[show_email]" value="off" type="hidden" />';
		printf( '<input id="has-show-email" type="checkbox" name="highlight-and-share[show_email]" value="on" %s />&nbsp;<label for="has-show-email">%s</label>', checked( true, $email, false ), __( 'Enable E-mail Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_facebook_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_facebook = isset( $settings[ 'show_facebook' ] ) ? (bool)$settings[ 'show_facebook' ] : true;
		echo '<input name="highlight-and-share[show_facebook]" value="off" type="hidden" />';
		printf( '<input id="has-show-facebook" type="checkbox" name="highlight-and-share[show_facebook]" value="on" %s />&nbsp;<label for="has-show-facebook">%s</label>', checked( true, $enable_facebook, false ), __( 'Enable Facebook Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_facebook_api( $args = array() ) {
		$settings = $this->get_plugin_options();
		$app_id = isset( $settings[ 'facebook_app_id' ] ) ? sanitize_text_field( $settings[ 'facebook_app_id' ] ) : '';
		if ( 0 === $app_id ) {
			$app_id = '';
		}
		printf( '<p>%s</p>', esc_html( $args[ 'desc' ] ) );
		printf( '<p><a href="%s">%s</a></p>', 'https://developers.facebook.com/apps', __( 'Requires a Facebook developer application.', 'highlight-and-share' ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[facebook_app_id]" value="%s" />', esc_attr( $args[ 'label_for' ] ), esc_attr( $app_id ) );

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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_content_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_content = isset( $settings[ 'enable_content' ] ) ? (bool)$settings[ 'enable_content' ] : true;
		echo '<input name="highlight-and-share[enable_content]" value="off" type="hidden" />';
		printf( '<input id="has-enable-content" type="checkbox" name="highlight-and-share[enable_content]" value="on" %s />&nbsp;<label for="has-enable-content">%s</label>', checked( true, $enable_content, false ), __( 'Enable Content?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_excerpt_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_excerpt = isset( $settings[ 'enable_excerpt' ] ) ? (bool)$settings[ 'enable_excerpt' ] : true;
		echo '<input name="highlight-and-share[enable_excerpt]" value="off" type="hidden" />';
		printf( '<input id="has-enable-excerpt" type="checkbox" name="highlight-and-share[enable_excerpt]" value="on" %s />&nbsp;<label for="has-enable-excerpt">%s</label>', checked( true, $enable_excerpt, false ), __( 'Enable Excerpt?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 * 		An array of arguments.
	 *		@type string $label_for Settings label and ID.
	 *		@type string $desc Description for the setting.
	 * }
	 */
	public function add_settings_field_shortlink_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_shortlinks = isset( $settings[ 'shortlinks' ] ) ? (bool)$settings[ 'shortlinks' ] : false;
		echo '<input name="highlight-and-share[shortlinks]" value="off" type="hidden" />';
		printf( '<input id="has-shortlinks" type="checkbox" name="highlight-and-share[shortlinks]" value="on" %s />&nbsp;<label for="has-shortlinks">%s</label>', checked( true, $enable_shortlinks, false ), __( 'Enable Shortlinks?', 'highlight-and-share' ) );
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
			'js_content'         => '',
			'twitter'            => '',
			'show_twitter'       => true,
			'show_facebook'      => true,
			'show_linkedin'      => false,
			'show_pinterest'     => false,
			'show_email'         => false,
			'show_whatsapp'      => false,
			'show_xing'          => false,
			'enable_content'     => true,
			'enable_excerpt'     => true,
			'shortlinks'         => false,
			'icons'              => false,
			'theme'              => 'default',
			'twitter_fa_class'   => 'fa fa-twitter',
			'facebook_fa_class'  => 'fa fa-facebook',
			'linkedin_fa_class'  => 'fa fa-linkedin',
			'pinterest_fa_class' => 'fa fa-pinterest',
			'xing_fa_class'      => 'fa fa-xing',
			'whatsapp_fa_class'  => 'fa fa-whatsapp',
			'email_fa_class'     => 'fa fa-envelope',
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
	 * @param string $path Relative file path to plugin asset
	 * @return string Full file path to plugin asset
	 */
	public function get_plugin_dir( $path = '' ) {
		$dir = rtrim( plugin_dir_path(__FILE__), '/' );
		if ( !empty( $path ) && is_string( $path) )
			$dir .= '/' . ltrim( $path, '/' );
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
	 * @param string $path Relative URL to plugin asset
	 * @return string Full URL to plugin asset
	 */
	public function get_plugin_url( $path = '' ) {
		$dir = rtrim( plugin_dir_url(__FILE__), '/' );
		if ( !empty( $path ) && is_string( $path) )
			$dir .= '/' . ltrim( $path, '/' );
		return $dir;
	}


} //end class Highlight_And_Share

add_action( 'plugins_loaded', 'highlightshare_instantiate' );
function highlightshare_instantiate() {
	Highlight_And_Share::get_instance();
} //end highlightshare_instantiate