<?php
/**
 * Set up helper functions for Adobe Fonts.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Helper class for registering Adobe Fonts.
 */
class Adobe_Fonts {

	/**
	 * Typekit CSS URL.
	 *
	 * @var string The typekit CSS URL.
	 */
	public static $typekit_css_url = 'https://use.typekit.net/';

	/**
	 * Determine if we've already prefetched adobe fonts.
	 *
	 * @var bool $has_prefetched true if fetched, false if not.
	 */
	private static $has_prefetched = false;
	/**
	 * Main class runner.
	 *
	 * @return Ajax.
	 */
	public static function run() {
		$self = new self();

		// For saving/resetting the default options.
		add_action( 'wp_ajax_has_retrieve_remote_adobe_fonts', array( static::class, 'ajax_retrieve_remote_adobe_fonts' ) );

		// if ( self::can_enqueue( 'frontend' ) ) {
		// 	add_action( 'wp_head', array( static::class, 'add_dns_prefetch' ), 1 );
		// 	add_action( 'wp_enqueue_scripts', array( static::class, 'enqueue_adobe_fonts' ) );
		// }
		// if ( self::can_enqueue( 'backend' ) ) {
		// 	add_action( 'admin_head', array( static::class, 'add_dns_prefetch' ), 1 );
		// 	add_action( 'admin_enqueue_scripts', array( static::class, 'enqueue_adobe_fonts' ) );
		// }
		return $self;
	}

	/**
	 * Set a DNS prefetch expicitly for loading Adobe fonts on the frontend or backend.
	 */
	public static function set_dns_prefetch() {
		add_action( 'wp_head', array( static::class, 'add_dns_prefetch' ), 1 );
		add_action( 'admin_head', array( static::class, 'add_dns_prefetch' ), 1 );
	}

	/**
	 * Adds DNS prefetch for the typekit CSS URL.
	 */
	public static function add_dns_prefetch() {
		if ( self::$has_prefetched ) {
			return;
		}
		$typekit_css_url = rtrim( self::$typekit_css_url, '/' );
		echo '<link rel="dns-prefetch" href="' . esc_url( $typekit_css_url ) . '">';
		echo '<link rel="preconnect" href="' . esc_url( $typekit_css_url ) . '" crossorigin="anonymous">';

		$preload_url = self::get_adobe_fonts_url();
		if ( ! empty( $preload_url ) ) {
			echo '<link rel="preload" href="' . esc_url( $preload_url ) . '" crossorigin="anonymous" as="font">';
		}
		self::$has_prefetched = true;
	}

	/**
	 * Get the URL to adobe fonts with passed project ID.
	 *
	 * @return string URL for adobe fonts with project ID.
	 */
	public static function get_adobe_fonts_url() {
		// Retrieve project ID if empty.
		$options = Options::get_block_editor_options( true );
		$project_id = $options['adobe_project_id'];
		// If still empty, return.
		if ( empty( $project_id ) ) {
			return '';
		}

		$adobe_fonts_url = sprintf(
			'%s%s.css',
			self::$typekit_css_url,
			$project_id
		);

		return $adobe_fonts_url;
	}

	/**
	 * Retrieve the theme size options.
	 */
	public static function ajax_retrieve_remote_adobe_fonts() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_block_editor' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		// Get the project/kit ID.
		$project_id = sanitize_text_field( filter_input( INPUT_POST, 'project_id', FILTER_DEFAULT ) );

		$adobe_fonts_url = 'https://typekit.com/api/v1/json/kits/' . $project_id . '/published';

		$response = wp_remote_get(
			esc_url( $adobe_fonts_url ),
			array(
				'timeout' => '30',
			)
		);

		// Make sure there is no error and we've received a valid status code.
		if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) !== 200 ) {
			wp_send_json_error(
				array(
					'message' => __( 'Could not connect to the Adobe Fonts API. The project ID may be incorrect.', 'quotes-dlx' ),
				)
			);
		}

		$font_data     = json_decode( wp_remote_retrieve_body( $response ), true );
		$font_families = $font_data['kit']['families'] ?? false;

		// Make sure we have font families.
		if ( ! $font_families ) {
			wp_send_json_error(
				array(
					'message' => __( 'There appears to be no fonts for the project ID.', 'quotes-dlx' ),
				)
			);
		}

		// Now interate over the fonts.
		$fonts = array();
		foreach ( $font_families as $font_family ) {
			// Retrieve fallback CSS.
			$fallback       = $font_family['css_stack'];
			$fallback_regex = '/,(.*+)$/';
			$fallback_css   = '';
			preg_match( $fallback_regex, $fallback, $matches );
			if ( $matches && isset( $matches[1] ) ) {
				$fallback_css = $matches[1];
			}
			$fonts[] = array(
				'name'     => sanitize_text_field( $font_family['name'] ),
				'slug'     => sanitize_text_field( $font_family['slug'] ),
				'family'   => sanitize_text_field( current( $font_family['css_names'] ) ),
				'fallback' => sanitize_text_field( $fallback_css ),
			);
		}

		// Retrieve options and add fonts.
		$options = Options::get_block_editor_options( true );
		$options['adobe_fonts']      = $fonts;
		$options['adobe_project_id'] = $project_id;
		update_option( 'highlight-and-share-block-editor-options', $options );

		wp_send_json_success( $fonts );
	}
}
