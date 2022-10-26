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
	 * Highlight and Share Options
	 *
	 * @var array $instance Highlight and Share options.
	 */
	private static $instance = false;
	/**
	 * Main class runner.
	 *
	 * @return Blocks.
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
	public static function get_plugin_options() {
		if ( false === Options::$options ) {
			$settings = get_option( 'highlight-and-share' );
		} else {
			$settings = Options::$options;
		}

		$defaults = array(
			'js_content'            => '',
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

		if ( false === $settings || ! is_array( $settings ) ) {
			update_option( 'highlight-and-share', $defaults );
			return $defaults;
		} else {
			$settings = wp_parse_args( $settings, $defaults );
		}
		Options::$options = $settings;
		return $settings;
	}
}
