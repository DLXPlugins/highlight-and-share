<?php
/**
 * Set up the blocks and their attributes.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Helper class for registering blocks.
 */
class Options {
	/**
	 * Highlight and Share Options
	 *
	 * @var array $options Highlight and Share options.
	 */
	private static $options = false;

	/**
	 * Highlight and Share Social Networks.
	 *
	 * @var array $options Highlight and Share options.
	 */
	private static $options_social_networks = false;

	/**
	 * Highlight and Share Theme Options.
	 *
	 * @var array $options Highlight and Share theme options.
	 */
	private static $options_theme = false;

	/**
	 * Highlight and Share Options
	 *
	 * @var array $instance Highlight and Share options.
	 */
	private static $instance = false;
	/**
	 * Main class runner.
	 *
	 * @return Options.
	 */
	public static function run() {
		$self = new self();
		add_action( 'init', array( $self, 'register_block' ) );
		add_action( 'enqueue_block_editor_assets', array( $self, 'register_block_assets' ) );
		add_action( 'enqueue_block_assets', array( $self, 'enqueue_frontend_assets' ) );
		$self->instance = $self;
		return $self;
	}

	/**
	 * Retrieve local networks from storage.
	 */
	public static function get_social_network_defaults() {
		$social_networks = array(
			'twitter'  => array(
				'label'      => __( 'Twitter', 'highlight-and-share' ),
				'slug'       => 'twitter',
				'color'      => '#1da1f2',
				'background' => '#fff',
				'order'      => 0,
				'custom'     => false,
			),
			'facebook' => array(
				'label'      => __( 'Facebook', 'highlight-and-share' ),
				'slug'       => 'facebook',
				'color'      => '#3b5998',
				'background' => '#fff',
				'order'      => 1,
				'custom'     => false,
			),
			'whatsapp' => array(
				'label'      => __( 'WhatsApp', 'highlight-and-share' ),
				'slug'       => 'whatsapp',
				'color'      => '#25d366',
				'background' => '#fff',
				'order'      => 2,
				'custom'     => false,
			),
			'reddit'   => array(
				'label'      => __( 'reddit', 'highlight-and-share' ),
				'slug'       => 'reddit',
				'color'      => '#ff4500',
				'background' => '#fff',
				'order'      => 3,
				'custom'     => false,
			),
			'telegram' => array(
				'label'      => __( 'Telegram', 'highlight-and-share' ),
				'slug'       => 'telegram',
				'color'      => '#0088cc',
				'background' => '#fff',
				'order'      => 4,
				'custom'     => false,
			),
			'linkedin' => array(
				'label'      => __( 'LinkedIn', 'highlight-and-share' ),
				'slug'       => 'linkedin',
				'color'      => '#0077b5',
				'background' => '#fff',
				'order'      => 5,
				'custom'     => false,
			),
			'xing'     => array(
				'label'      => __( 'Xing', 'highlight-and-share' ),
				'slug'       => 'xing',
				'color'      => '#006567',
				'background' => '#fff',
				'order'      => 6,
				'custom'     => false,
			),
			'copy'     => array(
				'label'      => __( 'Copy', 'highlight-and-share' ),
				'slug'       => 'copy',
				'color'      => '#000',
				'background' => '#fff',
				'order'      => 7,
				'custom'     => false,
			),
			'email'    => array(
				'label'      => __( 'Email', 'highlight-and-share' ),
				'slug'       => 'email',
				'color'      => '#000',
				'background' => '#fff',
				'order'      => 8,
				'custom'     => false,
			),
		);

		/**
		 * Filter the default social networks.
		 *
		 * @param $social_networks array The default social networks.
		 */
		$social_networks = apply_filters( 'has_social_network_defaults', $social_networks );
		return $social_networks;
	}

	/**
	 * Get default options for custom themes.
	 */
	public static function get_theme_defaults() {
		$defaults = array(
			'theme'                   => 'default',
			'icons_only'              => true, /* custom theme option */
			'orientation'             => 'horizontal', /* custom theme option */
			'group_icons'             => true,
			'background_color'        => '#000000', /* only applicable if icons are grouped */
			'background_color_hover'  => '#333333', /* only applicable if icons are grouped */
			'icon_colors_group'       => '#FFFFFF', /* only applicable if icons are grouped */
			'icon_colors_group_hover' => '#FFFFFF', /* only applicable if icons are grouped */
			'border_radius_group'     => 0, /* only applicable if icons are grouped */
			'icon_border_radius'      => 0, /* only applicable if icons are NOT grouped */
			'icon_colors'             => array( /* Social Icon Colors */
				'twitter'  => array(
					'label'            => __( 'Twitter', 'highlight-and-share' ),
					'background'       => '#1da1f2',
					'background_hover' => '#1a91da',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'facebook' => array(
					'label'            => __( 'Facebook', 'highlight-and-share' ),
					'background'       => '#3b5998',
					'background_hover' => '#2d4373',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'whatsapp' => array(
					'label'            => __( 'WhatsApp', 'highlight-and-share' ),
					'background'       => '#25d366',
					'background_hover' => '#1fbf4f',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'reddit'   => array(
					'label'            => __( 'Reddit', 'highlight-and-share' ),
					'background'       => '#ff4500',
					'background_hover' => '#e63f00',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'telegram' => array(
					'label'            => __( 'Telegram', 'highlight-and-share' ),
					'background'       => '#0088cc',
					'background_hover' => '#006b9f',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'linkedin' => array(
					'label'            => __( 'LinkedIn', 'highlight-and-share' ),
					'background'       => '#0077b5',
					'background_hover' => '#005983',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'xing'     => array(
					'label'            => __( 'Xing', 'highlight-and-share' ),
					'background'       => '#006567',
					'background_hover' => '#004c4c',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'copy'     => array(
					'label'            => __( 'Copy', 'highlight-and-share' ),
					'background'       => '#000',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
				'email'    => array(
					'label'            => __( 'Email', 'highlight-and-share' ),
					'background'       => '#000',
					'background_hover' => '#000',
					'icon_color'       => '#fff',
					'icon_color_hover' => '#fff',
				),
			),
		);
		return $defaults;
	}

	/**
	 * Get default options.
	 */
	public static function get_defaults() {
		$defaults = array(
			'js_content'            => '',
			'element_content'       => '',
			'id_content'            => '',
			'twitter'               => '',
			'show_twitter'          => true,
			'show_facebook'         => true,
			'show_linkedin'         => false,
			'show_ok'               => false,
			'show_vk'               => false,
			'show_email'            => false,
			'show_copy'             => false,
			'show_whatsapp'         => false,
			'show_xing'             => false,
			'enable_mobile'         => true,
			'show_reddit'           => false,
			'show_telegram'         => false,
			'show_signal'           => false,
			'enable_content'        => true,
			'enable_excerpt'        => true,
			'enable_hashtags'       => true,
			'shortlinks'            => false,
			'icons'                 => false,
			'theme'                 => 'default',
			'sharing_prefix'        => '',
			'sharing_suffix'        => '',
			'whatsapp_api_endpoint' => 'app', // Can also we 'web'.
		);
		return $defaults;
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
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_plugin_options( $force = false ) {
		if ( false === self::$options ) {
			$settings = get_option( 'highlight-and-share' );
		} else {
			$settings = self::$options;
		}

		$defaults = self::get_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share', $defaults );
			return $defaults;
		}

		$settings      = wp_parse_args( $settings, $defaults );
		self::$options = $settings;
		return $settings;
	}

	/**
	 * Return the social network options.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_plugin_options_social_networks( $force = false ) {
		if ( false === self::$options_social_networks ) {
			$settings = get_option( 'highlight-and-share-social-networks' );
		} else {
			$settings = self::$options_social_networks;
		}

		$defaults = self::get_social_network_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share-social-networks', $defaults );
			return $defaults;
		}

		// Merge two multi-dimensional arrays (defaults, and from settings).
		$settings = array_replace_recursive( $defaults, $settings );

		// Add enabled/disabled state from main options.
		$plugin_options                  = self::get_plugin_options();
		$settings['twitter']['enabled']  = $plugin_options['show_twitter'] ?? false;
		$settings['facebook']['enabled'] = $plugin_options['show_facebook'] ?? false;
		$settings['linkedin']['enabled'] = $plugin_options['show_linkedin'] ?? false;
		$settings['email']['enabled']    = $plugin_options['show_email'] ?? false;
		$settings['copy']['enabled']     = $plugin_options['show_copy'] ?? false;
		$settings['whatsapp']['enabled'] = $plugin_options['show_whatsapp'] ?? false;
		$settings['xing']['enabled']     = $plugin_options['show_xing'] ?? false;
		$settings['reddit']['enabled']   = $plugin_options['show_reddit'] ?? false;
		$settings['telegram']['enabled'] = $plugin_options['show_telegram'] ?? false;

		// Now sort the arrays based on order.
		array_multisort( array_column( $settings, 'order' ), SORT_ASC, $settings );

		self::$options_social_networks = $settings;
		return $settings;
	}

	/**
	 * Return the social network options.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param bool $force Force a refresh of the options.
	 *
	 * @return array Plugin options
	 */
	public static function get_theme_options( $force = false ) {
		if ( false === self::$options_theme ) {
			$settings = get_option( 'highlight-and-share-theme-options' );
		} else {
			$settings = self::$options_theme;
		}

		$defaults = self::get_theme_defaults();

		if ( false === $settings || ! is_array( $settings ) ) {
			// Add theme option from old options into new one.
			$options           = self::get_plugin_options();
			$defaults['theme'] = sanitize_text_field( $options['theme'] );
			update_option( 'highlight-and-share-theme-options', $defaults );
			return $defaults;
		}

		// Merge two multi-dimensional arrays (defaults, and from settings).
		$settings = array_replace_recursive( $defaults, $settings );

		self::$options_theme = $settings;
		return $settings;
	}
}
