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
				'color'      => '#1da1f2',
				'background' => '#fff',
				'order'      => 0,
				'custom'     => false,
			),
			'facebook' => array(
				'label'      => __( 'Facebook', 'highlight-and-share' ),
				'color'      => '#3b5998',
				'background' => '#fff',
				'order'      => 1,
				'custom'     => false,
			),
			'whatsapp' => array(
				'label'      => __( 'WhatsApp', 'highlight-and-share' ),
				'color'      => '#25d366',
				'background' => '#fff',
				'order'      => 2,
				'custom'     => false,
			),
			'reddit'   => array(
				'label'      => __( 'reddit', 'highlight-and-share' ),
				'color'      => '#ff4500',
				'background' => '#fff',
				'order'      => 3,
				'custom'     => false,
			),
			'telegram' => array(
				'label'      => __( 'Telegram', 'highlight-and-share' ),
				'color'      => '#0088cc',
				'background' => '#fff',
				'order'      => 4,
				'custom'     => false,
			),
			'linkedin' => array(
				'label'      => __( 'LinkedIn', 'highlight-and-share' ),
				'color'      => '#0077b5',
				'background' => '#fff',
				'order'      => 5,
				'custom'     => false,
			),
			'xing'     => array(
				'label'      => __( 'Xing', 'highlight-and-share' ),
				'color'      => '#006567',
				'background' => '#fff',
				'order'      => 6,
				'custom'     => false,
			),
			'copy'     => array(
				'label'      => __( 'Copy', 'highlight-and-share' ),
				'color'      => '#000',
				'background' => '#fff',
				'order'      => 7,
				'custom'     => false,
			),
			'email'    => array(
				'label'      => __( 'Email', 'highlight-and-share' ),
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
}
