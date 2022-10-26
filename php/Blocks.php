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
		wp_localize_script(
			'has-click-to-share',
			'has_gutenberg',
			array(
				'svg' => Functions::get_plugin_url( 'img/share.svg' ),
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
	 * Register front-end scripts/styles.
	 */
	public function register_frontend_scripts() {

		// Register front-end script if blocks are present on the post/page.
		if ( has_block( 'mediaron/alerts-dlx-material' ) || has_block( '"mediaron/alerts-dlx-bootstrap' ) || has_block( 'mediaron/alerts-dlx-chakra' ) ) {
			// Placeholder for now.
		}

		wp_register_style(
			'alerts-dlx-block-editor-styles-lato',
			Functions::get_plugin_url( 'dist/alerts-dlx-gfont-lato.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);

		wp_register_style(
			'alerts-dlx-common',
			Functions::get_plugin_url( 'dist/alerts-dlx-common.css' ),
			array( 'alerts-dlx-block-editor-styles-lato' ),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Register the block editor script with localized vars.
	 */
	public function register_block_editor_scripts() {

		// Register styles here because array in block.json fails when using array of styles (enqueues wrong script).
		wp_register_style(
			'alerts-dlx-block-editor',
			Functions::get_plugin_url( 'dist/alerts-dlx-block-editor.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		wp_register_style(
			'alerts-dlx-block-editor-styles',
			Functions::get_plugin_url( 'build/alerts-dlx.css' ),
			array( 'alerts-dlx-block-editor' ),
			Functions::get_plugin_version(),
			'all'
		);

		wp_register_style(
			'alerts-dlx-block-editor-styles-lato',
			Functions::get_plugin_url( 'dist/alerts-dlx-gfont-lato.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
		wp_register_style(
			'alerts-dlx-common',
			Functions::get_plugin_url( 'dist/alerts-dlx-common.css' ),
			array( 'alerts-dlx-block-editor-styles-lato' ),
			Functions::get_plugin_version(),
			'all'
		);

		wp_register_script(
			'alerts-dlx-block',
			Functions::get_plugin_url( 'build/alerts-dlx.js' ),
			array(),
			Functions::get_plugin_version(),
			true
		);

		wp_localize_script(
			'alerts-dlx-block',
			'alertsDlxBlock',
			array(
				'font_stylesheet' => Functions::get_plugin_url( 'dist/alerts-dlx-gfont-lato.css' ),
			)
		);
	}
}
