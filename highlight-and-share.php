<?php // phpcs:ignore

/*
Plugin Name: Highlight and Share
Plugin URI: https://dlxplugins.com/plugins/highlight-and-share/
Description: Allows you to highlight text and enable social sharing to share with services including Twitter, Facebook, LinkedIn, Xing, Telegram, Reddit, WhatsApp, email, and others.
Author: DLX Plugins
Version: 3.6.1
Requires at least: 5.1
Author URI: https://dlxplugins.com
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

		define( 'HIGHLIGHT_AND_SHARE_VERSION', '3.6.1' );

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
	 * Get the main themes.
	 */
	public function get_main_themes() {
		$default_themes = array(
			'off'                    => esc_html__( 'Off', 'highligh-and-share' ),
			'default'                => esc_html__( 'Default', 'highlight-and-share' ),
			'brand-colors'           => esc_html__( 'Brand Colors (Icons Only)', 'highlight-and-share' ),
			'colorful-circles'       => esc_html__( 'Colorful Circles (Icons Only)', 'highlight-and-share' ),
			'colorful-glass-circles' => esc_html__( 'Colorful Glass Circles (Icons Only)', 'highlight-and-share' ),
			'black'                  => esc_html__( 'Black (Icons Only)', 'highlight-and-share' ),
			'purple'                 => esc_html__( 'Purple (Icons Only)', 'highlight-and-share' ),
			'white'                  => esc_html__( 'White (Icons Only)', 'highlight-and-share' ),
			'cyan'                   => esc_html__( 'Cyan (Icons Only)', 'highlight-and-share' ),
			'magenta'                => esc_html__( 'Magenta (Icons Only)', 'highlight-and-share' ),
			'blue'                   => esc_html__( 'Blue (Icons Only)', 'highlight-and-share' ),
			'green'                  => esc_html__( 'Green (Icons Only)', 'highlight-and-share' ),
		);

		/**
		 * Filter: has_main_themes
		 *
		 * Modify the available default themes.
		 *
		 * @param array slug -> label associative array.
		 */
		return apply_filters( 'has_main_themes', $default_themes );
	}

	/**
	 * Allow display and visiblity to style attributes.
	 *
	 * @param array $css CSS rules.
	 */
	public function safe_css( $css = array() ) {
		$css[] = 'display';
		$css[] = 'visibility';
		return $css;
	}

	/**
	 * Retrieve Theme Preview Html. HTML compatible with Photoswipe script.
	 *
	 * $see https://photoswipe.com/
	 */
	private function output_main_themes_admin_html() {
		$themes = $this->get_main_themes();

		// Need image dimensions for Photoswipe:  https://photoswipe.com/.
		$preview_dimensions = array(
			'brand'         => array(
				'width'  => 864,
				'height' => 384,
			),
			'black'         => array(
				'width'  => 838,
				'height' => 342,
			),
			'blue'          => array(
				'width'  => 838,
				'height' => 342,
			),
			'circle-glass'  => array(
				'width'  => 944,
				'height' => 382,
			),
			'color-circles' => array(
				'width'  => 1054,
				'height' => 368,
			),
			'color-circles' => array(
				'width'  => 1054,
				'height' => 368,
			),
			'default'       => array(
				'width'  => 2378,
				'height' => 654,
			),
			'green'         => array(
				'width'  => 822,
				'height' => 294,
			),
			'cyan'          => array(
				'width'  => 848,
				'height' => 320,
			),
			'magenta'       => array(
				'width'  => 830,
				'height' => 318,
			),
			'purple'        => array(
				'width'  => 868,
				'height' => 346,
			),
			'white'         => array(
				'width'  => 868,
				'height' => 350,
			),
		);

		foreach ( $themes as $slug => $label ) {
			$dimensions = $preview_dimensions[ $slug ] ?? array();

			if ( empty( $dimensions ) ) {
				continue;
			}

			add_filter( 'safe_style_css', array( $this, 'safe_css' ) );

			$allowed_html = wp_kses_allowed_html( 'post' );

			echo wp_kses(
				sprintf(
					'<li><a class="has-gallery-image" href="%1$s" data-pswp-width="%2$s" data-pswp-height="%3$s"><img src="%1$s" style="display: none" />%4$s</a><div style="display: none" class="pswp-caption-content" aria-hidden="true">%4$s</div></li>',
					esc_url( $this->get_plugin_url( '/img/screenshot-' . $slug . '.png' ) ),
					esc_attr( $preview_dimensions[ $slug ]['width'] ),
					esc_attr( $preview_dimensions[ $slug ]['height'] ),
					esc_html( $label ),
				),
				$allowed_html
			);
			remove_filter( 'safe_style_css', array( $this, 'safe_css' ) );
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
				'choices' => $this->get_main_themes(),
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
			new WP_Customize_Control(
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
			new WP_Customize_Control(
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
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );

		// Plugin settings.
		add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'add_settings_link' ) );

		// Register Hashtags Taxonomy.
		$labels = array(
			'name'                       => _x( 'Hashtags', 'Taxonomy General Name', 'highlight-and-share' ),
			'singular_name'              => _x( 'Hashtag', 'Taxonomy Singular Name', 'highlight-and-share' ),
			'menu_name'                  => __( 'Hashtags', 'highlight-and-share' ),
			'all_items'                  => __( 'All Hashtags', 'highlight-and-share' ),
			'parent_item'                => __( 'Parent Hashtag', 'highlight-and-share' ),
			'parent_item_colon'          => __( 'Hashtag:', 'highlight-and-share' ),
			'new_item_name'              => __( 'New Hashtag', 'highlight-and-share' ),
			'add_new_item'               => __( 'Add New Hashtag', 'highlight-and-share' ),
			'edit_item'                  => __( 'Edit Hashtag', 'highlight-and-share' ),
			'update_item'                => __( 'Update Hashtag', 'highlight-and-share' ),
			'view_item'                  => __( 'View Hashtag', 'highlight-and-share' ),
			'separate_items_with_commas' => __( 'Separate hash tags with commas', 'highlight-and-share' ),
			'add_or_remove_items'        => __( 'Add or remove hash tags', 'highlight-and-share' ),
			'choose_from_most_used'      => __( 'Choose from the most used', 'highlight-and-share' ),
			'popular_items'              => __( 'Popular Hashtags', 'highlight-and-share' ),
			'search_items'               => __( 'Search Hashtags', 'highlight-and-share' ),
			'not_found'                  => __( 'Not Found', 'highlight-and-share' ),
			'no_terms'                   => __( 'No items', 'highlight-and-share' ),
			'items_list'                 => __( 'Items list', 'highlight-and-share' ),
			'items_list_navigation'      => __( 'Items list navigation', 'highlight-and-share' ),
		);
		$args   = array(
			'labels'            => $labels,
			'hierarchical'      => false,
			'public'            => true,
			'show_ui'           => true,
			'show_admin_column' => false,
			'show_in_nav_menus' => false,
			'show_tagcloud'     => false,
			'rewrite'           => false,
			'show_in_rest'      => true,
			'show_in_menu'      => false,
		);

		if ( ! $settings['enable_hashtags'] ) {
			return false;
		}

		/**
		 * Allow others to modify the taxonomy args for hashtags.
		 */
		$args = apply_filters( 'has_hashtags_taxonomy_args', $args );

		/**
		 * Filter: has_hashtags_post_types
		 *
		 * Allow others to programmatically add or substract post types that hashtags are enabled for.
		 *
		 * @param array Index array of post type slugs.
		 */
		$supported_post_types = apply_filters(
			'has_hashtags_post_types',
			array(
				'post',
				'page',
			)
		);

		/**
		 * Filter: has_show_hashtags_taxonomy
		 *
		 * Allow others to turn off hashtags.
		 *
		 * @param bool true to disable hashtags, false to not.
		 */
		if ( apply_filters( 'has_show_hashtags_taxonomy', true ) ) {
			register_taxonomy( 'hashtags', $supported_post_types, $args );
		}

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

		/**
		 * Filter: has_show_facebook
		 *
		 * Hide or show the Facebook sharing option.
		 *
		 * @param bool true to show Facebook, false to not.
		 */
		$show_facebook = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );

		/**
		 * Filter: has_show_twitter
		 *
		 * Hide or show the Twitter sharing option.
		 *
		 * @param bool true to show Twitter, false to not.
		 */
		$show_twitter = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );

		/**
		 * Filter: has_show_linkedin
		 *
		 * Hide or show the LinkedIn sharing option.
		 *
		 * @param bool true to show LinkedIn, false to not.
		 */
		$show_linkedin = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
		$show_ok       = (bool) apply_filters( 'has_show_ok', $settings['show_ok'] );
		$show_vk       = (bool) apply_filters( 'has_show_vk', $settings['show_vk'] );

		/**
		 * Filter: has_show_email
		 *
		 * Hide or show the email sharing option.
		 *
		 * @param bool true to show email, false to not.
		 */
		$show_email = (bool) apply_filters( 'has_show_email', $settings['show_email'] );

		/**
		 * Filter: has_show_copy
		 *
		 * Hide or show the copy option.
		 *
		 * @param bool true to show copy feature, false to not.
		 */
		$show_copy = (bool) apply_filters( 'has_show_copy', $settings['show_email'] );

		/**
		 * Filter: has_show_reddit
		 *
		 * Hide or show the reddit option.
		 *
		 * @param bool true to show reddit social network, false to not.
		 */
		$show_reddit = (bool) apply_filters( 'has_show_reddit', isset( $settings['show_reddit'] ) ? $settings['show_reddit'] : false );

		/**
		 * Filter: has_show_telegram
		 *
		 * Hide or show the Telegram option.
		 *
		 * @param bool true to show Telegram feature, false to not.
		 */
		$show_telegram = (bool) apply_filters( 'has_show_telegram', isset( $settings['show_telegram'] ) ? $settings['show_telegram'] : false );

		// Placeholder for signal.
		$show_signal = false;

		// If no social network is active, exit.
		if ( ! $show_facebook && ! $show_twitter && ! $show_linkedin && ! $show_ok && ! $show_email && ! $show_copy && ! $show_reddit && ! $show_telegram && ! $show_signal ) {
			return;
		}

		/**
		 * Filter: has_enable_mobile
		 *
		 * Whether Highlight and Share scripts are run on mobile.
		 *
		 * @param bool true to enable mobile, false to not.
		 */
		$show_on_mobile = (bool) apply_filters( 'has_enable_mobile', isset( $settings['enable_mobile'] ) ? $settings['enable_mobile'] : true );

		// Disable if mobile.
		if ( wp_is_mobile() ) {
			if ( $show_on_mobile ) {
				add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_mobile' ) );
			} else {
				return;
			}
		}

		// Load scripts.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );

		// Load html.
		add_action( 'wp_footer', array( $this, 'add_footer_html' ) );

		/**
		 * Filter: has_enable_content
		 *
		 * Whether Highlight and Share will work on regular post or page content.
		 *
		 * @param bool true to enable HAS on post content, false to not.
		 */
		if ( apply_filters( 'has_enable_content', (bool) $settings['enable_content'] ) ) {
			add_filter( 'the_content', array( $this, 'content_area' ) );
		}

		/**
		 * Filter: has_enable_excerpt
		 *
		 * Whether Highlight and Share will work on post excerpts.
		 *
		 * @param bool true to enable HAS on excerpts, false to not.
		 */
		if ( apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] ) ) {
			add_filter( 'the_excerpt', array( $this, 'excerpt_area' ) );
		}
	}

	/**
	 * Add general interface and SVG sprites.
	 */
	public function add_footer_html() {
		$settings       = $this->get_plugin_options();
		$html           = '<div class="highlight-and-share-wrapper">';
		$click_to_share = '<div class="highlight-and-share-wrapper-cts highlight-and-share-wrapper">';
		$inline_share   = '<div class="highlight-and-share-wrapper-inline highlight-and-share-wrapper">';
		if ( $settings['show_twitter'] && '' !== $settings['twitter'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		} elseif ( $settings['show_twitter'] && '' === $settings['twitter'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%" target="_blank"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
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
					$string           = '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' . esc_attr( $settings['facebook_app_id'] ) . '&display=popup&amp;quote=%prefix%%text%%suffix%&href=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) ) ) . '</a></div>';
					$html           .= $string;
					$click_to_share .= $string;
					$inline_share   .= $string;
				}
			} else {
				if ( 0 === $settings['facebook_app_id'] ) {
					$html .= '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg><span class="has-text">' . esc_html( apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				} else {
					$string          = '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' . esc_attr( $settings['facebook_app_id'] ) . '&display=popup&amp;quote=%prefix%%text%%suffix%&href=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
					$html           .= $string;
					$click_to_share .= $string;
					$inline_share   .= $string;
				}
			}
		}
		if ( $settings['show_linkedin'] ) {
			if ( ! $settings['icons'] ) {
				// Note, you must be on a publicly accesible URL to use this button.
				$html .= '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/sharing/share-offsite/?mini=true&url=%url%&title=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-linkedin-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) ) ) . '</a></div>';
			} else {
				$html .= '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/sharing/share-offsite/?mini=true&url=%url%&title=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-linkedin-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
			}
		}

		if ( $settings['show_xing'] ) {
			if ( ! $settings['icons'] ) {
				$html .= '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-xing-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) ) ) . '</a></div>';
			} else {
				$html .= '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-xing-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
			}
		}

		if ( $settings['show_reddit'] ) {
			if ( ! $settings['icons'] ) {
				$string = '<div class="has_reddit" style="display: none;" data-type="reddit"><a href="https://www.reddit.com/submit?resubmit=true&url=%url&title=%title" target="_blank"><svg class="has-icon"><use xlink:href="#has-reddit-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_reddit_text', _x( 'Reddit', 'Reddit share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html  .= $string;
			} else {
				$string = '<div class="has_reddit" style="display: none;" data-type="reddit"><a href="https://www.reddit.com/submit?resubmit=true&url=%url%&title=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-reddit-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_reddit_text', _x( 'Reddit', 'Reddit share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html  .= $string;
			}
		}

		if ( $settings['show_telegram'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_telegram" style="display: none;" data-type="telegram"><a href="https://t.me/share/url?url=%url%&text=%prefix%%text%%suffix%" target="_blank"><svg class="has-icon"><use xlink:href="#has-telegram-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_telegram_text', _x( 'Telegram', 'Telegram share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_telegram" style="display: none;" data-type="telegram"><a href="https://t.me/share/url?url=%url%&text=%prefix%%text%%suffix%" target="_blank"><svg class="has-icon"><use xlink:href="#has-telegram-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_telegram_text', _x( 'Telegram', 'Telegram share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}

		if ( false && $settings['show_signal'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_signal" style="display: none;" data-type="signal"><a href="signal://send?text=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-signal-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_signal_text', _x( 'Signal', 'Signal share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_signal" style="display: none;" data-type="signal"><a href="signal://send?text=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-signal-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_signal_text', _x( 'Signal', 'Signal share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}

		if ( $settings['show_whatsapp'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="whatsapp://send?text=%prefix%%text%%suffix%: ' . '%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-whatsapp-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) ) ) . '</a></div>'; // phpcs:ignore
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			} else {
				$string          = '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="whatsapp://send?text=%prefix%%text%%suffix%: ' . '%url%" target="_blank"><svg class="has-icon"><use xlink:href="#has-whatsapp-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) ) ) . '</span></a></div>'; // phpcs:ignore
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}

		if ( $settings['show_ok'] ) {
			if ( ! $settings['icons'] ) {
				// Note, you must be on a publicly accesible URL to use this button.
				$html .= '<div class="has_ok" style="display: none;" data-type="ok"><a href="https://connect.ok.ru/offer?url=%url%&title=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-ok-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_ok_text', _x( 'Odnoklassniki', 'Odnoklassniki share text', 'highlight-and-share' ) ) ) . '</a></div>';
			} else {
				$html .= '<div class="has_ok" style="display: none;" data-type="ok"><a href="https://connect.ok.ru/offer?url=%url%&title=%title%" target="_blank"><svg class="has-icon"><use xlink:href="#has-ok-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_ok_text', _x( 'Odnoklassniki', 'Odnoklassniki share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
			}
		}
		if ( $settings['show_vk'] ) {
			if ( ! $settings['icons'] ) {
				// Note, you must be on a publicly accesible URL to use this button.
				$html .= '<div class="has_vk" style="display: none;" data-type="vk"><a href="http://vk.com/share.php?url=%url%&title=%title%&description=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-vk-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_vk_text', _x( 'VKontakte', 'VKontakte share text', 'highlight-and-share' ) ) ) . '</a></div>';
			} else {
				$html .= '<div class="has_vk" style="display: none;" data-type="vk"><a href="http://vk.com/share.php?url=%url%&title=%title%&description=%text%" target="_blank"><svg class="has-icon"><use xlink:href="#has-vk-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_vk_text', _x( 'VKontakte', 'VKontakte share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
			}
		}

		if ( $settings['show_copy'] ) {
			if ( ! $settings['icons'] ) {
				$string          = '<div class="has_copy" style="display: none;" data-type="copy"><a href="#"><svg class="has-icon"><use xlink:href="#has-copy-icon"></use></svg>&nbsp;' . esc_html( apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) ) ) . '</a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $tring;
			} else {
				$string          = '<div class="has_copy" style="display: none;" data-type="copy"><a href="#"><svg class="has-icon"><use xlink:href="#has-copy-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) ) ) . '</span></a></div>';
				$html           .= $string;
				$click_to_share .= $string;
				$inline_share   .= $string;
			}
		}

		if ( $settings['show_email'] ) {
			if ( ! $settings['icons'] ) {
				// Note, you must be on a publicly accesible URL to use this button.
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
		echo $inline_share; // phpcs:ignore
		echo $click_to_share; // phpcs:ignore
		echo $html; // phpcs:ignore
		?>
		<svg width="0" height="0" class="hidden" style="display: none;">
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
			<symbol aria-hidden="true" data-prefix="fab" data-icon="reddit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-reddit-icon">
				<path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="telegram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-telegram-icon">
				<path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="signal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="has-signal-icon">
				<g>
					<path d="M97.2800192,3.739673 L100.160021,15.3787704 C88.8306631,18.1647705 77.9879854,22.6484879 68.0000023,28.6777391 L61.8399988,18.3985363 C72.8467373,11.7537029 84.7951803,6.81153332 97.2800192,3.739673 Z M158.720055,3.739673 L155.840053,15.3787704 C167.169411,18.1647705 178.012089,22.6484879 188.000072,28.6777391 L194.200075,18.3985363 C183.180932,11.7499974 171.218739,6.80771878 158.720055,3.739673 L158.720055,3.739673 Z M18.3999736,61.8351679 C11.7546212,72.8410466 6.81206547,84.7885562 3.73996516,97.2724198 L15.3799719,100.152197 C18.1661896,88.8237238 22.6502573,77.981893 28.6799796,67.9946902 L18.3999736,61.8351679 Z M11.9999699,127.990038 C11.9961044,122.172725 12.4306685,116.363392 13.2999707,110.611385 L1.43996383,108.811525 C-0.479938607,121.525138 -0.479938607,134.454937 1.43996383,147.168551 L13.2999707,145.36869 C12.4306685,139.616684 11.9961044,133.807351 11.9999699,127.990038 L11.9999699,127.990038 Z M194.160075,237.581539 L188.000072,227.302336 C178.024494,233.327885 167.195565,237.811494 155.880053,240.601305 L158.760055,252.240403 C171.231048,249.164732 183.165742,244.222671 194.160075,237.581539 L194.160075,237.581539 Z M244.000104,127.990038 C244.00397,133.807351 243.569406,139.616684 242.700103,145.36869 L254.56011,147.168551 C256.480013,134.454937 256.480013,121.525138 254.56011,108.811525 L242.700103,110.611385 C243.569406,116.363392 244.00397,122.172725 244.000104,127.990038 Z M252.260109,158.707656 L240.620102,155.827879 C237.833884,167.156352 233.349817,177.998183 227.320094,187.985385 L237.6001,194.184905 C244.249159,183.166622 249.191823,171.205364 252.260109,158.707656 L252.260109,158.707656 Z M145.380047,242.701142 C133.858209,244.43447 122.141865,244.43447 110.620027,242.701142 L108.820026,254.560223 C121.534632,256.479975 134.465442,256.479975 147.180048,254.560223 L145.380047,242.701142 Z M221.380091,196.804701 C214.461479,206.174141 206.175877,214.452354 196.800077,221.362797 L203.920081,231.022048 C214.262958,223.418011 223.404944,214.303705 231.040097,203.984145 L221.380091,196.804701 Z M196.800077,34.6172785 C206.177345,41.5338058 214.463023,49.8188367 221.380091,59.1953726 L231.040097,51.9959309 C223.429284,41.6822474 214.31457,32.5682452 204.000081,24.9580276 L196.800077,34.6172785 Z M34.619983,59.1953726 C41.5370506,49.8188367 49.8227288,41.5338058 59.1999972,34.6172785 L51.9999931,24.9580276 C41.6855038,32.5682452 32.5707896,41.6822474 24.9599774,51.9959309 L34.619983,59.1953726 Z M237.6001,61.8351679 L227.320094,67.9946902 C233.346114,77.969489 237.830073,88.7975718 240.620102,100.1122 L252.260109,97.2324229 C249.184198,84.7624043 244.241751,72.8286423 237.6001,61.8351679 L237.6001,61.8351679 Z M110.620027,13.2989317 C122.141865,11.5656035 133.858209,11.5656035 145.380047,13.2989317 L147.180048,1.43985134 C134.465442,-0.479901112 121.534632,-0.479901112 108.820026,1.43985134 L110.620027,13.2989317 Z M40.7799866,234.201801 L15.9999722,239.981353 L21.7799756,215.203275 L10.0999688,212.463487 L4.3199655,237.241566 C3.3734444,241.28318 4.58320332,245.526897 7.51859925,248.462064 C10.4539952,251.39723 14.6980441,252.606895 18.7399738,251.660448 L43.4999881,245.980888 L40.7799866,234.201801 Z M12.5999703,201.764317 L24.279977,204.484106 L28.2799793,187.305438 C22.4496684,177.507146 18.1025197,166.899584 15.3799719,155.827879 L3.73996516,158.707656 C6.34937618,169.311891 10.3154147,179.535405 15.539972,189.125297 L12.5999703,201.764317 Z M68.6000027,227.762301 L51.4199927,231.761991 L54.1399943,243.441085 L66.7800016,240.501313 C76.3706428,245.725462 86.5949557,249.691191 97.2000192,252.300398 L100.080021,240.6613 C89.0307035,237.906432 78.4495684,233.532789 68.6800027,227.682307 L68.6000027,227.762301 Z M128.000037,23.9980665 C90.1565244,24.0177003 55.3105242,44.590631 37.01511,77.715217 C18.7196958,110.839803 19.8628631,151.287212 39.9999861,183.325747 L29.9999803,225.982439 L72.660005,215.983214 C110.077932,239.548522 158.307237,236.876754 192.892851,209.322653 C227.478464,181.768552 240.856271,135.358391 226.242944,93.6248278 C211.629616,51.8912646 172.221191,23.9617202 128.000037,23.9980665 Z" fill="currentColor"></path>
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="ok" data-icon="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-ok-icon">
				<g>
					<path fill="currentColor" d="M357.1,324.5c-24.1,15.3-57.2,21.4-79.1,23.6l18.4,18.1l67,67c24.5,25.1-15.4,64.4-40.2,40.2c-16.8-17-41.4-41.6-67-67.3
						l-67,67.2c-24.8,24.2-64.7-15.5-39.9-40.2c17-17,41.4-41.6,67-67l18.1-18.1c-21.6-2.3-55.3-8-79.6-23.6
						c-28.6-18.5-41.2-29.3-30.1-51.8c6.5-12.8,24.3-23.6,48-5c0,0,31.9,25.4,83.4,25.4s83.4-25.4,83.4-25.4c23.6-18.5,41.4-7.8,48,5
						C398.3,295.1,385.7,305.9,357.1,324.5L357.1,324.5z M142,145c0-63,51.2-114,114-114s114,51,114,114c0,62.7-51.2,113.7-114,113.7
						S142,207.7,142,145L142,145z M200,145c0,30.8,25.1,56,56,56s56-25.1,56-56c0-31.1-25.1-56.2-56-56.2S200,113.9,200,145z"/>
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="vk" data-icon="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" id="has-vk-icon">
				<g
					style="fill:none;fill-rule:evenodd"
					transform="translate(0,664)"
				>
					<path fill="currentColor" d="m 1073.3513,-606.40537 h 196.278 c 179.2103,0 221.8795,42.66915 221.8795,221.8795 v 196.27799 c 0,179.2103512 -42.6692,221.879451 -221.8795,221.879451 h -196.278 c -179.21038,0 -221.87951,-42.6691298 -221.87951,-221.879451 v -196.27801 c 0,-179.21035 42.66913,-221.87946 221.87951,-221.87948 z" />
					<path fill="currentColor" d="m 1375.0576,-393.98425 c 2.9513,-9.7072 0,-16.85429 -14.1342,-16.85429 h -46.6693 c -11.8763,0 -17.3521,6.16927 -20.3212,12.97854 0,0 -23.7347,56.82106 -57.3544,93.74763 -10.8806,10.66728 -15.8232,14.08081 -21.7613,14.08081 -2.969,0 -7.2715,-3.39577 -7.2715,-13.12075 v -90.83194 c 0,-11.66288 -3.4491,-16.85429 -13.3341,-16.85429 h -73.3553 c -7.4138,0 -11.8763,5.40476 -11.8763,10.54286 0,11.0406 16.8188,13.60078 18.5433,44.67814 v 67.52388 c 0,14.80973 -2.7202,17.49433 -8.6583,17.49433 -15.8231,0 -54.3143,-57.08773 -77.16,-122.40705 -4.4447,-12.71185 -8.9427,-17.83214 -20.8723,-17.83214 h -46.68718 c -13.3341,0 -16.0009,6.16925 -16.0009,12.97852 0,12.12515 15.8232,72.35973 73.69318,152.02656 38.58,54.40315 92.8942,83.89819 142.3726,83.89819 29.6729,0 33.3353,-6.54262 33.3353,-17.83216 v -41.12238 c 0,-13.10297 2.809,-15.71646 12.214,-15.71646 6.9338,0 18.7922,3.41353 46.4916,29.63728 31.6463,31.09512 36.8555,45.03372 54.6698,45.03372 h 46.6694 c 13.3341,0 20.0189,-6.54262 16.1787,-19.46781 -4.2313,-12.88962 -19.3433,-31.57515 -39.38,-53.74532 -10.8807,-12.62294 -27.2016,-26.22375 -32.1441,-33.03302 -6.9338,-8.72941 -4.9603,-12.62294 0,-20.39227 0,0 56.8566,-78.68897 62.7947,-105.41058 z" />
					<path fill="currentColor" d="m 567.69877,-429.06912 c 3.15618,-10.38133 0,-18.0247 -15.11579,-18.0247 h -49.91013 c -12.70096,0 -18.55706,6.59763 -21.73232,13.87977 0,0 -25.38286,60.76685 -61.33724,100.25768 -11.63627,11.40806 -16.92197,15.05863 -23.27242,15.05863 -3.17519,0 -7.77644,-3.63156 -7.77644,-14.0319 v -97.13948 c 0,-12.47278 -3.68869,-18.0247 -14.26014,-18.0247 h -78.44923 c -7.92857,0 -12.70097,5.78005 -12.70097,11.27491 0,11.80736 17.98666,14.54527 19.83094,47.78071 v 72.21293 c 0,15.83815 -2.9091,18.70918 -9.25948,18.70918 -16.92197,0 -58.08598,-61.05206 -82.51817,-130.90731 -4.75337,-13.59458 -9.56381,-19.07042 -22.32175,-19.07042 h -49.92915 c -14.26014,0 -17.11213,6.59763 -17.11213,13.87977 0,12.96714 16.92197,77.38454 78.81059,162.58363 41.25909,58.18101 99.34506,89.72424 152.25931,89.72424 31.73343,0 35.65018,-6.99691 35.65018,-19.07043 v -43.978 c 0,-14.01288 3.00405,-16.80786 13.0622,-16.80786 7.41521,0 20.09716,3.65057 49.71998,31.69536 33.84387,33.25443 39.41486,48.16093 58.46622,48.16093 h 49.91026 c 14.26,0 21.40913,-6.99691 17.30216,-20.81966 -4.5252,-13.78473 -20.68653,-33.76783 -42.11468,-57.47752 -11.63621,-13.49953 -29.09043,-28.04479 -34.37631,-35.32694 -7.41508,-9.33557 -5.30458,-13.4995 0,-21.80835 0,0 60.80491,-84.15334 67.15549,-112.73048 z" />
				</g>
			</symbol>
		</svg>
		<?php
	}

	/**
	 * Enqueue the HAS admin stylesheet.
	 *
	 * @param string $hook The hook for the settings page admin menu.
	 */
	public function enqueue_admin_scripts( $hook ) {
		if ( 'settings_page_highlight-and-share' === $hook ) {
			wp_enqueue_style(
				'has-admin',
				$this->get_plugin_url( '/dist/has-admin.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);
			wp_enqueue_style(
				'has-admin-css',
				$this->get_plugin_url( '/dist/has-admin-style.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);

			wp_enqueue_script(
				'has-admin-js',
				$this->get_plugin_url( '/dist/has-admin.js' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				true
			);
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
		$content = sprintf( '<div class="has-content-area" data-url="%s" data-title="%s" data-hashtags="%s">%s</div>', esc_url( $url ), esc_attr( $title ), esc_attr( $this->get_hashtags( $post_id ) ), $content );
		return $content;
	}

	/**
	 * Retrieve hashtags for a post/page.
	 *
	 * @param int $post_id The post ID to retrieve hashtags for.
	 */
	public function get_hashtags( $post_id ) {
		$options = $this->get_plugin_options();
		if ( ! $options['enable_hashtags'] ) {
			return '';
		}
		$hashtags_raw = wp_get_object_terms( $post_id, 'hashtags' );

		if ( empty( $hashtags_raw ) ) {
			return '';
		}

		$hashtags = array();
		foreach ( $hashtags_raw as $hashtag_term ) {
			// Strip out pound sign in case it was entered accidentally.
			$hashtag = str_replace( '#', '', $hashtag_term->name );

			// Check for white-space.
			$hashtag = preg_replace( '/\s+/', '', $hashtag );
			$hashtag = sanitize_text_field( $hashtag );

			// Populate hashtags.
			$hashtags[] = $hashtag;
		}

		return implode( ',', $hashtags );
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
		$content = sprintf( '<div class="has-excerpt-area" data-url="%s" data-title="%s" data-hashtags="%s">%s</div>', esc_url( $url ), esc_attr( $title ), esc_attr( $this->get_hashtags( $post_id ) ), $content );
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

		/**
		 * Filter: has_content_url
		 *
		 * Modify the post or page URL that Highlight and Share uses for sharing.
		 *
		 * @param string Post or Page URL (may be shortened).
		 * @param int    The post or page ID.
		 */
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
		$docs_link     = sprintf( '<a href="%s">%s</a>', esc_url( 'https://has.dlxplugins.com' ), _x( 'Documentation', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
		$has_landing   = sprintf( '<a href="%s">%s</a>', esc_url( 'https://dlxplugins.com/plugins/highlight-and-share/' ), _x( 'Visit Highlight and Share', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );

		array_unshift( $links, $has_landing );
		array_unshift( $links, $docs_link );
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

		// Odnoklassniki.
		if ( is_customize_preview() ) {
			$maybe_ok = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_ok['show_ok'] ) ) {
				$json_arr['show_ok'] = (bool) apply_filters( 'has_show_ok', $settings['show_ok'] );
			} else {
				$json_arr['show_ok'] = apply_filters( 'has_show_ok', $maybe_ok['show_ok'] );
			}
		} else {
			$json_arr['show_ok'] = (bool) apply_filters( 'has_show_ok', $settings['show_ok'] );
		}

		// VKontakte.
		if ( is_customize_preview() ) {
			$maybe_vk = get_option( 'highlight-and-share' );
			if ( ! isset( $maybe_vk['show_vk'] ) ) {
				$json_arr['show_vk'] = (bool) apply_filters( 'has_show_vk', $settings['show_vk'] );
			} else {
				$json_arr['show_vk'] = apply_filters( 'has_show_vk', $maybe_vk['show_vk'] );
			}
		} else {
			$json_arr['show_vk'] = (bool) apply_filters( 'has_show_vk', $settings['show_vk'] );
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

		/**
		 * Filter: has_js_classes
		 *
		 * Comman-separated CSS classes (without the .) that Highlight and Share should be enabled on.
		 *
		 * @param string Comma-separated CSS classes
		 */
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

		/**
		 * Filter: has_js_ids
		 *
		 * Comman-separated CSS IDs (without the #) that Highlight and Share should be enabled on.
		 *
		 * @param string Comma-separated CSS IDs
		 */
		$ids = (array) apply_filters( 'has_js_ids', array() ); // Pass array of jQuery ID elements (without the #).
		foreach ( $ids as $index => &$string ) {
			$string = trim( $string );
			if ( empty( $string ) ) {
				continue;
			}
			$string = trim( esc_js( '#' . $string ) ); // Get in ID format (#%s) and trim just in case.
		}

		/**
		 * Filter: has_js_elements
		 *
		 * Comman-separated HTML elements that Highlight and Share should be enabled on.
		 *
		 * @param string Comma-separated CSS IDs
		 */
		$elements = (array) apply_filters( 'has_js_elements', array() ); // Pass array of jQuery HTML elements (e.g., blockquote, article).
		foreach ( $elements as $index => &$string ) {
			$string = trim( $string );
			if ( empty( $string ) ) {
				continue;
			}
			$string = trim( esc_js( $string ) );
		}
		$content = array_merge( $classes, $ids, $elements );

		/**
		 * Filter: has_js_selectors
		 *
		 * Modify all the selectors (classes, ids, elements) that are used for Highlight and Share.
		 *
		 * @param string          Comma-separated CSS IDs, classes and HTML elements.
		 * @param array $content  Array with all of the CSS classes (uses .), IDs (uses #), and HTML elements.
		 * @param array $classes  Array with CSS classes (with the .).
		 * @param array $ids      Array with CSS IDs (with the #).
		 * @param array $elements Array with HTML elements.
		 */
		$json_arr['content'] = apply_filters( 'has_js_selectors', implode( ',', $content ), $content, $classes, $ids, $elements );

		/**
		 * Filter: has_twitter_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Tweet
		 */
		$json_arr['tweet_text'] = apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_facebook_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Share
		 */
		$json_arr['facebook_text'] = apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_linkedin_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: LinkedIn
		 */
		$json_arr['linkedin_text'] = apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_ok_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Odnoklassniki
		 */
		$json_arr['ok_text'] = apply_filters( 'has_ok_text', _x( 'Odnoklassniki', 'Odnoklassniki share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_vk_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: VKontakte
		 */
		$json_arr['vk_text'] = apply_filters( 'has_vk_text', _x( 'VKontakte', 'VKontakte share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_whatsapp_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: WhatsApp
		 */
		$json_arr['whatsapp_text'] = apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_xing_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Xing
		 */
		$json_arr['xing_text'] = apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_copy_text
		 *
		 * Modify the Copy label on the frontend.
		 *
		 * @param string Default: Copy
		 */
		$json_arr['copy_text'] = apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_email_text
		 *
		 * Modify the Email label on the frontend.
		 *
		 * @param string Default: E-mail
		 */
		$json_arr['email_text'] = apply_filters( 'has_email_text', _x( 'E-mail', 'E-mail share text', 'highlight-and-share' ) );

		// Icons.
		if ( is_customize_preview() ) {
			$maybe_icons = get_option( 'highlight-and-share' );

			/**
			 * Filter: has_icons
			 *
			 * Whether icon-only view is supported.
			 *
			 * @param bool true for icons-only enabled, false if not.
			 */
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

		// Load prefix and suffix (before/after text).
		$json_arr['prefix'] = isset( $settings['sharing_prefix'] ) ? sanitize_text_field( $settings['sharing_prefix'] ) : '';
		$json_arr['suffix'] = isset( $settings['sharing_suffix'] ) ? sanitize_text_field( $settings['sharing_suffix'] ) : '';

		// Localize.
		wp_localize_script( 'highlight-and-share', 'highlight_and_share', $json_arr );

		/**
		 * Filter: has_load_css
		 *
		 * Whether to load Highlight and Share CSS.
		 *
		 * @param bool true for allowing CSS, false if not.
		 */
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
			case 'colorful-circles':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-circles.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'colorful-glass-circles':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-circles-glass.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
				break;
			case 'purple':
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share-purple.css' ), array(), HIGHLIGHT_AND_SHARE_VERSION, 'all' );
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
				do_action( 'has_default_theme', $theme );
				break;
		}
		add_filter( 'body_class', array( $this, 'add_body_class' ), 10, 2 );
	}

	/**
	 * Retrieve inline theme slugs and themes.
	 */
	public function get_inline_themes() {
		$has_inline_themes = array(
			'has-inline-theme-default'         => __( 'Default', 'highlight-and-share' ),
			'has-inline-theme-dark'            => __( 'Dark', 'highlight-and-share' ),
			'has-inline-theme-light'           => __( 'Light', 'highlight-and-share' ),
			'has-inline-theme-blood-red'       => __( 'Blood Red', 'highlight-and-share' ),
			'has-inline-theme-dark-blue'       => __( 'Dark Blue', 'highlight-and-share' ),
			'has-inline-theme-fire'            => __( 'Fire', 'highlight-and-share' ),
			'has-inline-theme-glow-blue'       => __( 'Glow Blue', 'highlight-and-share' ),
			'has-inline-theme-highlight'       => __( 'Highlight Yellow', 'highlight-and-share' ),
			'has-inline-theme-highlight-blue'  => __( 'Highlight Blue', 'highlight-and-share' ),
			'has-inline-theme-highlight-green' => __( 'Highlight Green', 'highlight-and-share' ),
			'has-inline-theme-highlight-pink'  => __( 'Highlight Pink', 'highlight-and-share' ),
			'has-inline-theme-highlight-red'   => __( 'Highlight Red', 'highlight-and-share' ),
			'has-inline-theme-purple'          => __( 'Purple', 'highlight-and-share' ),
			'has-inline-theme-rust'            => __( 'Rust', 'highlight-and-share' ),
		);

		/**
		 * Filter: has_inline_themes
		 *
		 * Whether to load Highlight and Share inline theme CSS (this is not used on the frontend).
		 *
		 * @param bool true for allowing inline themes, false if not.
		 */
		$has_inline_themes = apply_filters( 'has_inline_themes', $has_inline_themes );
		return $has_inline_themes;
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
		<div class="has-form-wrapper">
			<header>
				<div class="has-admin-container-wrap">
					<div class="has-logo-wrapper">
						<h2 id="has-logo" style="display: flex; align-items: center;"><img 
						width="450" height="113" src="<?php echo esc_url( $this->get_plugin_url( '/img/plugin-logo-horizontal.png' ) ); ?>" alt="Higlight and Share" /></h2>
					</div>
					<div class="header__btn-wrap">
						<a class=" has__btn-primary" href="https://has.dlxplugins.com"><i class="dashicons dashicons-media-document"></i> <?php esc_html_e( 'Documentation', 'highlight-and-share' ); ?></a>
						<a class=" has__btn-primary" href="https://dlxplugins.com/support/"><i class="dashicons dashicons-groups"></i> <?php esc_html_e( 'Support', 'highlight-and-share' ); ?></a>
					</div>
				</div>
			</header>
			<div class="has-admin-container-body-wrapper">
				<div class="has-admin-container-body">
					<form action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>" method="POST">
						<?php settings_fields( 'highlight-and-share' ); ?>
						<?php do_settings_sections( 'highlight-and-share' ); ?>
						<?php submit_button(); ?>
					</form>
				</div>
			</div>
			<div class="has-admin-container-footer">
				<footer>
					<div class="has-admin-container-wrap">
						<div class="footer-rate-icon" aria-hidden="true"><img 
							width="100" height="90" src="<?php echo esc_url( $this->get_plugin_url( '/img/heart.png' ) ); ?>" /></div>
						<a class="has__btn-primary" href="https://wordpress.org/support/plugin/highlight-and-share/reviews/" target="_blank"><i ></i> <?php esc_html_e( 'Please Rate Highlight and Share', 'highlight-and-share' ); ?></a>
						<div class="has-plea"><?php esc_html_e( 'It really helps.', 'highlight-and-share' ); ?></div>
					</div>
				</footer>
			</div>
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
			'has-text',
			_x( 'Text Settings', 'plugin settings heading', 'highlight-and-share' ),
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
			'has-social',
			_x( 'Social Sharing Services', 'plugin settings heading', 'highlight-and-share' ),
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
			'hightlight-and-share-mobile-enable',
			__( 'Show on Mobile', 'highlight-and-share' ),
			array( $this, 'add_settings_field_mobile_enable' ),
			'highlight-and-share',
			'has-config',
			array(
				'desc' => __( 'Would you like to show on mobile?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-text-prefix',
			__( 'Sharing Text Before', 'highlight-and-share' ),
			array( $this, 'add_settings_field_prefix' ),
			'highlight-and-share',
			'has-text',
			array(
				'desc'      => __( 'Choose a prefix to go before the sharing text such as a quote.', 'highlight-and-share' ),
				'label_for' => 'hightlight-and-share-prefix',
			)
		);

		add_settings_field(
			'hightlight-and-share-text-suffix',
			__( 'Sharing Text After', 'highlight-and-share' ),
			array( $this, 'add_settings_field_suffix' ),
			'highlight-and-share',
			'has-text',
			array(
				'desc'      => __( 'Choose a suffix to go after the sharing text such as a quote.', 'highlight-and-share' ),
				'label_for' => 'hightlight-and-share-suffix',
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
			'hightlight-and-share-reddit-enable',
			__( 'Show Reddit Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_reddit_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via Reddit?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-telegram-enable',
			__( 'Show Telegram Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_telegram_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via Telegram?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-signal-enable',
			__( 'Show Signal Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_signal_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via Signal?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-linkedin-enable',
			__( 'Show LinkedIn Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_linkedin_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via LinkedIn?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-whatsapp-enable',
			__( 'Show WhatsApp Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_whatsapp_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via WhatsApp?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-xing-enable',
			__( 'Show Xing Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_xing_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via Xing?', 'highlight-and-share' ),
			)
		);

		// add_settings_field(
		// 'hightlight-and-share-ok-enable',
		// __( 'Show Odnoklassniki Option', 'highlight-and-share' ),
		// array( $this, 'add_settings_field_ok_enable' ),
		// 'highlight-and-share',
		// 'has-social',
		// array(
		// 'desc' => __( 'Would you like to enable sharing via Odnoklassniki?', 'highlight-and-share' ),
		// )
		// );

		// add_settings_field(
		// 'hightlight-and-share-vk-enable',
		// __( 'Show VKontakte Option', 'highlight-and-share' ),
		// array( $this, 'add_settings_field_vk_enable' ),
		// 'highlight-and-share',
		// 'has-social',
		// array(
		// 'desc' => __( 'Would you like to enable sharing via Odnoklassniki?', 'highlight-and-share' ),
		// )
		// );

		add_settings_field(
			'hightlight-and-share-copy-enable',
			__( 'Show Copy Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_copy_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via copying?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-email-enable',
			__( 'Show E-mail Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_email_enable' ),
			'highlight-and-share',
			'has-social',
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
			'hightlight-and-share-twitter-hashtags',
			__( 'Twitter Hashtags', 'highlight-and-share' ),
			array( $this, 'add_settings_field_twitter_hashtags' ),
			'highlight-and-share',
			'has-twitter',
			array(
				'label_for' => 'hightlight-and-share-twitter-hashtags',
				'desc'      => __( 'Enable Twitter Hashtags', 'highlight-and-share' ),
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
				case 'ok_fa_class':
				case 'xing_fa_class':
				case 'whatsapp_fa_class':
				case 'email_fa_class':
				case 'copy_fa_class':
					$output[ $key ] = sanitize_text_field( $value );
					break;
				case 'show_twitter':
				case 'show_facebook':
				case 'enable_mobile':
				case 'enable_content':
				case 'enable_excerpt':
				case 'shortlinks':
				case 'icons':
				case 'show_email':
				case 'show_xing':
				case 'show_whatsapp':
				case 'show_linkedin':
				case 'show_ok':
				case 'show_vk':
				case 'show_telegram':
				case 'show_signal':
				case 'show_reddit':
				case 'show_copy':
				case 'enable_hashtags':
					if ( 'on' === $input[ $key ] ) {
						$output[ $key ] = true;
					} else {
						$output[ $key ] = false;
					}
					break;
				case 'sharing_prefix':
				case 'sharing_suffix':
					$output[ $key ] = sanitize_text_field( $value );
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
	 * Add a prefix to the sharing text.
	 *
	 * Output text input HTML for the sharing prefix.
	 *
	 * @since 3.4.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_prefix( $args = array() ) {
		$settings = $this->get_plugin_options();
		$prefix   = isset( $settings['sharing_prefix'] ) ? $settings['sharing_prefix'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[sharing_prefix]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $prefix ) );
	}

	/**
	 * Add a suffix to the sharing text.
	 *
	 * Output text input HTML for the sharing suffix.
	 *
	 * @since 3.4.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_suffix( $args = array() ) {
		$settings = $this->get_plugin_options();
		$suffix   = isset( $settings['sharing_suffix'] ) ? $settings['sharing_suffix'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[sharing_suffix]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $suffix ) );
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
		$themes   = $this->get_main_themes();
		?>
		<select name="highlight-and-share[theme]">
			<?php
			foreach ( $themes as $slug => $label ) :
				?>
				<option value="<?php echo esc_attr( $slug ); ?>" <?php selected( $theme, $slug, true ); ?>><?php echo esc_html( $label ); ?></option>
				<?php
			endforeach;
			?>
		</select>
		<?php
		printf( '<div><em></em></div>', esc_html( $args['desc'] ) );
		?>
		<h4><?php esc_html_e( 'Preview', 'highlight-and-share' ); ?></h4>
		<ul class="has-admin-preview">
			<?php $this->output_main_themes_admin_html(); ?>
		</ul>
		<?php
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
	 * Add VKontakte Option for Sharing
	 *
	 * Output checkbox for displaying VKontakte sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_vk_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$vk       = isset( $settings['show_vk'] ) ? (bool) $settings['show_vk'] : true;
		echo '<input name="highlight-and-share[show_vk]" value="off" type="hidden" />';
		printf( '<input id="has-show-vk" type="checkbox" name="highlight-and-share[show_vk]" value="on" %s />&nbsp;<label for="has-show-vk">%s</label>', checked( true, $vk, false ), esc_html__( 'Enable VKontakte Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Odnoklassniki Option for Sharing
	 *
	 * Output checkbox for displaying Odnoklassniki sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_ok_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$linkedin = isset( $settings['show_ok'] ) ? (bool) $settings['show_ok'] : true;
		echo '<input name="highlight-and-share[show_ok]" value="off" type="hidden" />';
		printf( '<input id="has-show-ok" type="checkbox" name="highlight-and-share[show_ok]" value="on" %s />&nbsp;<label for="has-show-ok">%s</label>', checked( true, $linkedin, false ), esc_html__( 'Enable Odnoklassniki (Однокла́ссники) Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Reddit Option for Sharing
	 *
	 * Output checkbox for displaying Reddit sharing.
	 *
	 * @since 3.3.5
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_reddit_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$reddit   = isset( $settings['show_reddit'] ) ? (bool) $settings['show_reddit'] : false;
		echo '<input name="highlight-and-share[show_reddit]" value="off" type="hidden" />';
		printf( '<input id="has-show-reddit" type="checkbox" name="highlight-and-share[show_reddit]" value="on" %s />&nbsp;<label for="has-show-reddit">%s</label>', checked( true, $reddit, false ), esc_html__( 'Enable Reddit Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Telegram Option for Sharing
	 *
	 * Output checkbox for displaying Telegram sharing.
	 *
	 * @since 3.3.5
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_telegram_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$telegram = isset( $settings['show_telegram'] ) ? (bool) $settings['show_telegram'] : false;
		echo '<input name="highlight-and-share[show_telegram]" value="off" type="hidden" />';
		printf( '<input id="has-show-telegram" type="checkbox" name="highlight-and-share[show_telegram]" value="on" %s />&nbsp;<label for="has-show-telegram">%s</label>', checked( true, $telegram, false ), esc_html__( 'Enable Telegram Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Signal Option for Sharing
	 *
	 * Output checkbox for displaying Signal sharing.
	 *
	 * @since 4.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_signal_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$signal   = isset( $settings['show_signal'] ) ? (bool) $settings['show_signal'] : false;
		echo '<input name="highlight-and-share[show_signal]" value="off" type="hidden" />';
		printf( '<input id="has-show-signal" type="checkbox" name="highlight-and-share[show_signal]" value="on" %s />&nbsp;<label for="has-show-signal">%s</label>', checked( true, $signal, false ), esc_html__( 'Enable Signal Sharing?', 'highlight-and-share' ) );
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
	 * Add Twitter hashtags option for sharing.
	 *
	 * Output checkbox for displaying Twitter hashtags.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_twitter_hashtags( $args = array() ) {
		$settings        = $this->get_plugin_options();
		$enable_hashtags = isset( $settings['enable_hashtags'] ) ? (bool) $settings['enable_hashtags'] : true;
		echo '<input name="highlight-and-share[enable_hashtags]" value="off" type="hidden" />';
		printf( '<input id="has-enable-twitter-hashtags" type="checkbox" name="highlight-and-share[enable_hashtags]" value="on" %s />&nbsp;<label for="has-enable-twitter-hashtags">%s</label>', checked( true, $enable_hashtags, false ), esc_html__( 'Enable Twitter Hashtags', 'highlight-and-share' ) );
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
	 * Add mobile option for sharing.
	 *
	 * Output checkbox for sharing on main post content
	 *
	 * @since 3.4.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_mobile_enable( $args = array() ) {
		$settings       = $this->get_plugin_options();
		$enable_content = isset( $settings['enable_mobile'] ) ? (bool) $settings['enable_mobile'] : true;
		echo '<input name="highlight-and-share[enable_mobile]" value="off" type="hidden" />';
		printf( '<input id="has-enable-content" type="checkbox" name="highlight-and-share[enable_mobile]" value="on" %s />&nbsp;<label for="has-enable-content">%s</label>', checked( true, $enable_content, false ), esc_html__( 'Enable on Mobile?', 'highlight-and-share' ) );
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
		echo sprintf(
			'<p class="description">%s</p>',
			esc_html__( 'You must have a third-party shortlink plugin enabled. Jetpack is the recommended and easiest solution to install.', 'highlight-and-share' )
		);
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
			'js_content'      => '',
			'twitter'         => '',
			'show_twitter'    => true,
			'show_facebook'   => true,
			'show_linkedin'   => false,
			'show_ok'         => false,
			'show_vk'         => false,
			'show_email'      => false,
			'show_copy'       => false,
			'show_whatsapp'   => false,
			'show_xing'       => false,
			'enable_mobile'   => true,
			'show_reddit'     => false,
			'show_telegram'   => false,
			'show_signal'     => false,
			'enable_content'  => true,
			'enable_excerpt'  => true,
			'enable_hashtags' => true,
			'shortlinks'      => false,
			'icons'           => false,
			'theme'           => 'default',
			'sharing_prefix'  => '',
			'sharing_suffix'  => '',
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
