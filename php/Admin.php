<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Admin
 */
class Admin {

	/**
	 * Class runner.
	 */
	public function run() {

	}

	/**
	 * Retrieve Theme Preview Html. HTML compatible with Photoswipe script.
	 *
	 * $see https://photoswipe.com/
	 */
	public static function output_main_themes_admin_html() {
		$themes = Themes::get_main_themes();

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

			add_filter( 'safe_style_css', array( '\DLXPlugins\HAS\Functions', 'safe_css' ) );

			$allowed_html = wp_kses_allowed_html( 'post' );

			echo wp_kses(
				sprintf(
					'<li><a class="has-gallery-image" href="%1$s" data-pswp-width="%2$s" data-pswp-height="%3$s"><img src="%1$s" style="display: none" />%4$s</a><div style="display: none" class="pswp-caption-content" aria-hidden="true">%4$s</div></li>',
					esc_url( Functions::get_plugin_url( '/img/screenshot-' . $slug . '.png' ) ),
					esc_attr( $preview_dimensions[ $slug ]['width'] ),
					esc_attr( $preview_dimensions[ $slug ]['height'] ),
					esc_html( $label ),
				),
				$allowed_html
			);
			remove_filter( 'safe_style_css', array( '\DLXPlugins\HAS\Functions', 'safe_css' ) );
		}
	}
}
