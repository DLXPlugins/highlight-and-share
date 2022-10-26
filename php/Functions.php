<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Functions
 */
class Functions {

	/**
	 * Checks if the plugin is on a multisite install.
	 *
	 * @since 1.0.0
	 *
	 * @param bool $network_admin Check if in network admin.
	 *
	 * @return true if multisite, false if not.
	 */
	public static function is_multisite( $network_admin = false ) {
		if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
			require_once ABSPATH . '/wp-admin/includes/plugin.php';
		}
		$is_network_admin = false;
		if ( $network_admin ) {
			if ( is_network_admin() ) {
				if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
					return true;
				}
			} else {
				return false;
			}
		}
		if ( is_multisite() && is_plugin_active_for_network( self::get_plugin_slug() ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Sanitize an attribute based on type.
	 *
	 * @param array  $attributes Array of attributes.
	 * @param string $attribute  The attribute to sanitize.
	 * @param string $type       The type of sanitization you need (values can be integer, text, float, boolean, url).
	 *
	 * @return mixed Sanitized attribute. wp_error on failure.
	 */
	public static function sanitize_attribute( $attributes, $attribute, $type = 'text' ) {
		if ( isset( $attributes[ $attribute ] ) ) {
			switch ( $type ) {
				case 'raw':
					return $attributes[ $attribute ];
				case 'post_text':
				case 'post':
					return wp_kses_post( $attributes[ $attribute ] );
				case 'string':
				case 'text':
					return sanitize_text_field( $attributes[ $attribute ] );
				case 'bool':
				case 'boolean':
					return filter_var( $attributes[ $attribute ], FILTER_VALIDATE_BOOLEAN );
				case 'int':
				case 'integer':
					return absint( $attributes[ $attribute ] );
				case 'float':
					if ( is_float( $attributes[ $attribute ] ) ) {
						return $attributes[ $attribute ];
					}
					return 0;
				case 'url':
					return esc_url( $attributes[ $attribute ] );
				case 'default':
					return new \WP_Error( 'has_dlx_unknown_type', __( 'Unknown type.', 'highlight-and-share' ) );
			}
		}
		return new \WP_Error( 'has_dlx_attribute_not_found', __( 'Attribute not found.', 'highlight-and-share' ) );
	}

	/**
	 * Allow display and visiblity to style attributes.
	 *
	 * @param array $css CSS rules.
	 */
	public static function safe_css( $css = array() ) {
		$css[] = 'display';
		$css[] = 'visibility';
		return $css;
	}

	/**
	 * Checks to see if an asset is activated or not.
	 *
	 * @since 1.0.0
	 *
	 * @param string $path Path to the asset.
	 * @param string $type Type to check if it is activated or not.
	 *
	 * @return bool true if activated, false if not.
	 */
	public static function is_activated( $path, $type = 'plugin' ) {

		// Gets all active plugins on the current site.
		$active_plugins = self::is_multisite() ? get_site_option( 'active_sitewide_plugins' ) : get_option( 'active_plugins', array() );
		if ( in_array( $path, $active_plugins, true ) ) {
			return true;
		}
		return false;
	}

	/**
	 * Take a _ separated field and convert to camelcase.
	 *
	 * @param string $field Field to convert to camelcase.
	 *
	 * @return string camelCased field.
	 */
	public static function to_camelcase( string $field ) {
		return str_replace( '_', '', lcfirst( ucwords( $field, '_' ) ) );
	}

	/**
	 * Return the plugin slug.
	 *
	 * @return string plugin slug.
	 */
	public static function get_plugin_slug() {
		return dirname( plugin_basename( HIGHLIGHT_AND_SHARE_FILE ) );
	}

	/**
	 * Return the basefile for the plugin.
	 *
	 * @return string base file for the plugin.
	 */
	public static function get_plugin_file() {
		return plugin_basename( HIGHLIGHT_AND_SHARE_FILE );
	}

	/**
	 * Return the version for the plugin.
	 *
	 * @return float version for the plugin.
	 */
	public static function get_plugin_version() {
		return HIGHLIGHT_AND_SHARE_VERSION;
	}

	/**
	 * Get the plugin author name.
	 */
	public static function get_plugin_author() {
		/**
		 * Filer the output of the plugin Author.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Author name.
		 */
		$plugin_author = apply_filters( 'has_dlx_plugin_author', 'MediaRon LLC' );
		return $plugin_author;
	}

	/**
	 * Return the Plugin author URI.
	 */
	public static function get_plugin_author_uri() {
		/**
		 * Filer the output of the plugin Author URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Author URI.
		 */
		$plugin_author = apply_filters( 'has_dlx_plugin_author_uri', 'https://mediaron.com' );
		return $plugin_author;
	}

	/**
	 * Return the plugin name for the plugin.
	 *
	 * @return string Plugin name.
	 */
	public static function get_plugin_name() {
		/**
		 * Filer the output of the plugin name.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin name.
		 */
		return apply_filters( 'has_dlx_plugin_name', __( 'Highlight and Share', 'highlight-and-share' ) );
	}

	/**
	 * Return the plugin description for the plugin.
	 *
	 * @return string plugin description.
	 */
	public static function get_plugin_description() {
		/**
		 * Filer the output of the plugin name.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin description.
		 */
		return apply_filters( 'has_dlx_plugin_description', __( 'An alert and notification block inspired by Bootstrap, Material UI, and Chakra UI.', 'highlight-and-share' ) );
	}

	/**
	 * Retrieve the plugin URI.
	 */
	public static function get_plugin_uri() {
		/**
		 * Filer the output of the plugin URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin URI.
		 */
		return apply_filters( 'has_dlx_plugin_uri', 'https://dlxplugins.com/plugins/highlight-and-share' );
	}

	/**
	 * Retrieve the plugin support URI.
	 */
	public static function get_plugin_support_uri() {
		/**
		 * Filer the output of the plugin support URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Support URI.
		 */
		return apply_filters( 'has_dlx_plugin_support_uri', 'https://dlxplugins.com/support/' );
	}

	/**
	 * Retrieve the plugin documentation URI.
	 */
	public static function get_plugin_docs_uri() {
		/**
		 * Filer the output of the plugin docs URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Docs URI.
		 */
		return apply_filters( 'has_dlx_plugin_docs_uri', 'https://has.dlxplugins.com/' );
	}

	/**
	 * Retrieve the plugin documentation URI.
	 */
	public static function get_plugin_ratings_uri() {
		/**
		 * Filer the output of the plugin ratings URI.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin ratings URI.
		 */
		return apply_filters( 'has_dlx_plugin_docs_uri', 'https://dlxplugins.com/support/' );
	}

	/**
	 * Retrieve the plugin title.
	 */
	public static function get_plugin_title() {
		/**
		 * Filer the output of the plugin title.
		 *
		 * Potentially change branding of the plugin.
		 *
		 * @since 1.0.0
		 *
		 * @param string Plugin Menu Name.
		 */
		return apply_filters( 'has_dlx_plugin_menu_title', self::get_plugin_name() );
	}

	/**
	 * Returns appropriate html for KSES.
	 *
	 * @param bool $svg Whether to add SVG data to KSES.
	 */
	public static function get_kses_allowed_html( $svg = true ) {
		$allowed_tags = wp_kses_allowed_html();

		$allowed_tags['nav']        = array(
			'class' => array(),
		);
		$allowed_tags['a']['class'] = array();

		if ( ! $svg ) {
			return $allowed_tags;
		}
		$allowed_tags['svg'] = array(
			'xmlns'       => array(),
			'fill'        => array(),
			'viewbox'     => array(),
			'role'        => array(),
			'aria-hidden' => array(),
			'focusable'   => array(),
			'class'       => array(),
		);

		$allowed_tags['path'] = array(
			'd'       => array(),
			'fill'    => array(),
			'opacity' => array(),
		);

		$allowed_tags['g'] = array();

		$allowed_tags['use'] = array(
			'xlink:href' => array(),
		);

		$allowed_tags['symbol'] = array(
			'aria-hidden' => array(),
			'viewBox'     => array(),
			'id'          => array(),
			'xmls'        => array(),
		);

		return $allowed_tags;
	}

	/**
	 * Get the plugin directory for a path.
	 *
	 * @param string $path The path to the file.
	 *
	 * @return string The new path.
	 */
	public static function get_plugin_dir( $path = '' ) {
		$dir = rtrim( plugin_dir_path( HIGHLIGHT_AND_SHARE_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Return a plugin URL path.
	 *
	 * @param string $path Path to the file.
	 *
	 * @return string URL to to the file.
	 */
	public static function get_plugin_url( $path = '' ) {
		$dir = rtrim( plugin_dir_url( HIGHLIGHT_AND_SHARE_FILE ), '/' );
		if ( ! empty( $path ) && is_string( $path ) ) {
			$dir .= '/' . ltrim( $path, '/' );
		}
		return $dir;
	}

	/**
	 * Gets the highest priority for a filter.
	 *
	 * @param int $subtract The amount to subtract from the high priority.
	 *
	 * @return int priority.
	 */
	public static function get_highest_priority( $subtract = 0 ) {
		$highest_priority = PHP_INT_MAX;
		$subtract         = absint( $subtract );
		if ( 0 === $subtract ) {
			--$highest_priority;
		} else {
			$highest_priority = absint( $highest_priority - $subtract );
		}
		return $highest_priority;
	}
}

