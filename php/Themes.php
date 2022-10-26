<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Themes
 */
class Themes {
	/**
	 * Get the main themes.
	 */
	public static function get_main_themes() {
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
		 * @param array $default_themes slug -> label associative array.
		 */
		return apply_filters( 'has_main_themes', $default_themes );
	}
}
