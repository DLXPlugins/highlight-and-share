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
class Blocks {

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
		return $self;
	}

	/**
	 * Registers the block on server.
	 */
	public function register_block() {

		register_block_type(
			Functions::get_plugin_dir( 'build/blocks/click-to-share/block.json' ),
			array(
				'render_callback' => array( $this, 'frontend' ),
			)
		);
	}

	/**
	 * Register frontend scripts/styles.
	 */
	public function enqueue_frontend_assets() {
		if ( ! is_admin() && has_block( 'has/click-to-share' ) ) {
			wp_register_style(
				'has-style-frontend-css',
				Functions::get_plugin_url( 'dist/has-cts-style.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);
		}
	}

	/**
	 * Register all block assets.
	 */
	public function register_block_assets() {
		wp_register_style(
			'has-style-admin-css',
			Functions::get_plugin_url( 'dist/has-cts-editor.css' ),
			array(),
			HIGHLIGHT_AND_SHARE_VERSION,
			'all'
		);
		wp_register_script(
			'has-click-to-share',
			Functions::get_plugin_url( 'build/has-click-to-share.js' ),
			array( 'wp-blocks', 'wp-element', 'wp-i18n' ),
			HIGHLIGHT_AND_SHARE_VERSION,
			true
		);
		$color_palette = array();
		$settings      = \WP_Theme_JSON_Resolver::get_theme_data()->get_settings();
		if ( isset( $settings['color']['palette']['theme'] ) ) {
			$color_palette = $settings['color']['palette']['theme'];
		}

		// Get adobe fonts.
		$block_editor_options = Options::get_block_editor_options( true );
		$adobe_fonts = $block_editor_options['adobe_fonts'] ?? array();
		wp_localize_script(
			'has-click-to-share',
			'has_gutenberg',
			array(
				'svg'          => Functions::get_plugin_url( 'img/share.svg' ),
				'colorPalette' => $color_palette,
				'adobeFonts'   => $adobe_fonts,
			)
		);
		wp_set_script_translations( 'has-click-to-share', 'highlight-and-share' );
		do_action( 'has_enqueue_block_styles_scripts' );
	}

	/**
	 * Output Click to Share Gutenberg block on the front-end.
	 *
	 * @param array $attributes Array of attributes for the Gutenberg block.
	 */
	public function frontend( $attributes ) {
		global $post;
		if ( '' === $attributes['uniqueId'] ) {
			return $this->get_legacy_frontend( $attributes );
		}
		ob_start();
		?>
		<style>
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
				border-style: solid;
				background-color: <?php echo esc_attr( $attributes['backgroundColor'] ); ?>;
				border-color: <?php echo esc_attr( $attributes['borderColor'] ); ?>;
				transition: all 0.3s ease-in-out;
				max-width: <?php echo esc_attr( $attributes['maxWidth'] ); ?><?php echo esc_attr( $attributes['maxWidthUnit'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover {
				background-color: <?php echo esc_attr( $attributes['backgroundColorHover'] ); ?>;
				border-color: <?php echo esc_attr( $attributes['borderColorHover'] ); ?>;
				transition: all 0.3s ease-in-out;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta {
				color: <?php echo esc_attr( $attributes['shareTextColor'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover .has-click-to-share-cta {
				color: <?php echo esc_attr( $attributes['shareTextColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-text {
				color: <?php echo esc_attr( $attributes['textColor'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover .has-click-to-share-text {
				color: <?php echo esc_attr( $attributes['textColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> .has-click-to-share-cta svg {
				fill: <?php echo esc_attr( $attributes['iconColor'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?>:hover .has-click-to-share-cta svg {
				fill: <?php echo esc_attr( $attributes['iconColorHover'] ); ?>;
			}
			.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
				padding: <?php echo esc_attr( $this->build_dimensions_css( $attributes['paddingSize'], 'mobile' ) ); ?>;
				margin: <?php echo esc_attr( $this->build_dimensions_css( $attributes['marginSize'], 'mobile' ) ); ?>;
				border-width: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderWidth'], 'mobile' ) ); ?>;
				border-radius: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderRadiusSize'], 'mobile' ) ); ?>;
				
			}
			@media screen and (min-width: 728px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
					padding: <?php echo esc_attr( $this->build_dimensions_css( $attributes['paddingSize'], 'tablet' ) ); ?>;
					margin: <?php echo esc_attr( $this->build_dimensions_css( $attributes['marginSize'], 'tablet' ) ); ?>;
					border-width: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderWidth'], 'tablet' ) ); ?>;
					border-radius: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderRadiusSize'], 'tablet' ) ); ?>;
				}
			}
			@media screen and (min-width: 1024px) {
				.has-click-to-share#<?php echo esc_attr( $attributes['uniqueId'] ); ?> {
					padding: <?php echo esc_attr( $this->build_dimensions_css( $attributes['paddingSize'], 'desktop' ) ); ?>;
					margin: <?php echo esc_attr( $this->build_dimensions_css( $attributes['marginSize'], 'desktop' ) ); ?>;
					border-width: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderWidth'], 'desktop' ) ); ?>;
					border-radius: <?php echo esc_attr( $this->build_dimensions_css( $attributes['borderRadiusSize'], 'desktop' ) ); ?>;
				}
			}
		</style>
		<div class='has-click-to-share' id="<?php echo esc_attr( $attributes['uniqueId'] ); ?>">
			<div class="has-click-to-share-wrapper">
				<div class="has-click-to-share-text">
					<?php echo wp_kses_post( $attributes['shareText'] ); ?>
				</div>
				<div class='has-click-to-share-cta'>
				<?php echo wp_kses_post( $attributes['clickText'] ); ?> <svg width="<?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>px" height="<?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>px" class="has-cts-block-icon"><use xlink:href="#has-share-icon"></use></svg>
				</div>
				<a class="has-click-prompt" href="#" data-title="<?php echo esc_attr( $post->post_title ); ?>" data-url="<?php echo esc_url( get_permalink( $post->ID ) ); ?>">
				</a>
			</div>
		</div>
		<?php

		return ob_get_clean();
		return 'hello';
	}

	/**
	 * Output Click to Share Gutenberg block on the front-end (legacy markup).
	 *
	 * @param array $attributes Array of attributes for the Gutenberg block.
	 */
	public function get_legacy_frontend( $attributes ) {
		ob_start();
		global $post;
		?>
		<div class='has-click-to-share' style="padding: <?php echo esc_attr( $attributes['padding'] ); ?>px; border: <?php echo esc_attr( $attributes['border'] . 'px solid ' . $attributes['borderColor'] ); ?>; border-radius: <?php echo esc_attr( $attributes['borderRadius'] ); ?>px; background-color: <?php echo esc_attr( $attributes['backgroundColor'] ); ?>; color: <?php echo esc_attr( $attributes['textColor'] ); ?>; max-width: <?php echo esc_attr( $attributes['maxWidth'] ); ?>%; margin-left: <?php echo esc_attr( $attributes['marginLeft'] ); ?>px; margin-right: <?php echo esc_attr( $attributes['marginRight'] ); ?>px; margin-bottom: <?php echo esc_attr( $attributes['marginBottom'] ); ?>px; margin-Top: <?php echo esc_attr( $attributes['marginTop'] ); ?>px; <?php echo 'center' === $attributes['alignment'] ? 'margin: ' . esc_attr( $attributes['marginTop'] ) . 'px auto ' . esc_attr( $attributes['marginBottom'] ) . 'px auto;' : ''; ?><?php echo 'left' === $attributes['alignment'] ? 'float: left;' : ''; ?><?php echo 'right' === $attributes['alignment'] ? 'float: right;' : ''; ?>">
			<div class="has-click-to-share-wrapper">
				<div class="has-click-to-share-text" style="color: <?php echo esc_attr( $attributes['textColor'] ); ?>; font-size: <?php echo esc_attr( $attributes['fontSize'] ); ?>px; font-weight: <?php echo esc_attr( $attributes['fontWeight'] ); ?>">
					<?php echo wp_kses_post( $attributes['shareText'] ); ?>
				</div>
				<div class='has-click-to-share-cta' style="font-size: <?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>; color: <?php echo esc_attr( $attributes['textColor'] ); ?>">
				<?php echo wp_kses_post( $attributes['clickText'] ); ?> <svg width="<?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>px" height="<?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>px" class="has-cts-block-icon"><use xlink:href="#has-share-icon"></use></svg>
				</div>
				<a class="has-click-prompt" href="#" data-title="<?php echo esc_attr( $post->post_title ); ?>" data-url="<?php echo esc_url( get_permalink( $post->ID ) ); ?>">
				</a>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	/**
	 * Build the CSS for the dimensions components.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 *
	 * @return string The CSS for the dimensions.
	 */
	public function build_dimensions_css( $sizes, $screen_size = 'desktop' ) {
		$dimensions = $sizes[ $screen_size ];

		if ( 'desktop' === $screen_size ) {
			$css = $this->get_dimensions_shorthand(
				$dimensions['top'],
				$dimensions['right'],
				$dimensions['bottom'],
				$dimensions['left'],
				$dimensions['unit']
			);
			return $css;
		}
		if ( 'tablet' === $screen_size || 'mobile' == $screen_size ) {
			$css = $this->get_dimensions_shorthand(
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['top'], 'top' ),
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['right'], 'right' ),
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['bottom'], 'bottom' ),
				$this->get_hierarchical_value( $sizes, $screen_size, $dimensions['left'], 'left' ),
				$this->get_hierarchical_value_unit( $sizes, $screen_size, $dimensions['unit'], 'unit' )
			);
			return $css;
		}

		return '';
	}

	/**
	 * Return a hierarchical unit value.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $value       The unit value (px, em, rem).
	 *
	 * @return string The unit to use.
	 */
	public function get_hierarchical_value_unit( $sizes, $screen_size, $value ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && null === $value ) {
			if ( null === $sizes['tablet']['unit'] ) {
				return $sizes['desktop']['unit'];
			}
			return $sizes['tablet']['unit'];
		}
		if ( 'tablet' === $screen_size && null === $value ) {
			return $sizes['desktop']['unit'];
		}
		if ( null === $value ) {
			return 'px';
		}
		return $value;
	}

	/**
	 * Get the hierarchical value for the dimension and screen size.
	 *
	 * @param array  $sizes {
	 *   An array of sizes.
	 *
	 *   @type string $top The top dimension.
	 *   @type string $right The right dimension.
	 *   @type string $bottom The bottom dimension.
	 *   @type string $left The left dimension.
	 *   @type string $unit The dimensikon's unit.
	 * }
	 * @param string $screen_size Screen size (desktop|mobile|tablet).
	 * @param string $value       The dimension value.
	 * @param string $type        The dimension type (top|right|bottom|left).
	 *
	 * @return string The value of the dimension type.
	 */
	public function get_hierarchical_value( $sizes, $screen_size, $value, $type ) {
		// Check mobile screen size.
		if ( 'mobile' === $screen_size && '' === $value ) {
			// Check tablet.
			if ( '' !== $sizes['tablet'][ $type ] ) {
				return $sizes['tablet'][ $type ];
			} elseif ( '' !== $sizes['desktop'][ $type ] ) {
				// Check desktop.
				return $sizes['desktop'][ $type ];
			}
		}

		// Check tablet screen size.
		if ( 'tablet' === $screen_size && '' === $value ) {
			if ( '' !== $sizes['desktop'][ $type ] ) {
				// Check desktop.
				return $sizes['desktop'][ $type ];
			}
		}

		if ( '' !== $value ) {
			return $value;
		}

		return '0';
	}

	/**
	 * Return dimensions shorthand.
	 *
	 * @param string $top   The top dimension.
	 * @param string $right The right dimension.
	 * @param string $bottom The bottom dimension.
	 * @param string $left The left dimension.
	 * @param string $unit The dimensions's unit.
	 *
	 * @return string The shorthand CSS for the dimensions.
	 */
	public function get_dimensions_shorthand( $top, $right, $bottom, $left, $unit ) {
		if ( '' === $top && '' === $right && '' === $bottom && '' === $left ) {
			return;
		}

		$top    = ( 0 !== (float) $top && '' !== $top ) ? (float) $top . $unit . ' ' : '0 ';
		$right  = ( 0 !== (float) $right && '' !== $right ) ? (float) $right . $unit . ' ' : '0 ';
		$bottom = ( 0 !== (float) $bottom && '' !== $bottom ) ? (float) $bottom . $unit . ' ' : '0 ';
		$left   = ( 0 !== (float) $left && '' !== $left ) ? (float) $left . $unit . ' ' : '0 ';

		if ( $right === $left ) {
			$left = '';

			if ( $top === $bottom ) {
				$bottom = '';

				if ( $top === $right ) {
					$right = '';
				}
			}
		}

		$output = $top . $right . $bottom . $left;

		return trim( $output );
	}
}
