<?php
/**
 * Functions for initializing and displaying the Gutenberg block.
 *
 * @package Highlight and Share
 */

/**
 * Registers the `core/latest-posts` block on server.
 */
function has_register_click_to_tweet_block_attributes() {

	register_block_type(
		'has/click-to-tweet',
		array(
			'attributes'      => array(
				'shareText'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'backgroundColor'    => array(
					'type'    => 'string',
					'default' => '#FFFFFF',
				),
				'textColor'          => array(
					'type'    => 'string',
					'default' => '#000000',
				),
				'fontSize'           => array(
					'type'    => 'integer',
					'default' => 24,
				),
				'clickShareFontSize' => array(
					'type'    => 'integer',
					'default' => 24,
				),
				'clickText'          => array(
					'type'    => 'string',
					'default' => __( 'Click to Share', 'highlight-and-share' ),
				),
				'padding'            => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'border'             => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'borderRadius'       => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'borderColor'        => array(
					'type'    => 'string',
					'default' => '#FFFFFF',
				),
				'fontWeight'         => array(
					'type'    => 'integer',
					'default' => 100,
				),
				'maxWidth'           => array(
					'type'    => 'integer',
					'default' => 100,
				),
				'alignment'          => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'marginLeft'         => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'marginRight'        => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'marginBottom'       => array(
					'type'    => 'integer',
					'default' => 0,
				),
				'marginTop'          => array(
					'type'    => 'integer',
					'default' => 0,
				),
			),
			'render_callback' => 'has_click_to_tweet',
			'editor_script'   => 'has-click-to-share',
			'editor_style'    => 'has-style-admin-css',
		)
	);
}

/**
 * Output Click to Share Gutenberg block on the front-end.
 *
 * @param array $attributes Array of attributes for the Gutenberg block.
 */
function has_click_to_tweet( $attributes ) {
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

add_action( 'init', 'has_register_click_to_tweet_block_attributes' );
