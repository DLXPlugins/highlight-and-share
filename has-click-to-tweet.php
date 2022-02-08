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
				'show_copy'                   => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'show_permalink'              => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'template'                    => array(
					'type'    => 'string',
					'default' => 'light',
				),
				'button_style'                => array(
					'type'    => 'string',
					'default' => 'default',
				),
				'share_text'                  => array(
					'type'    => 'string',
					'default' => '',
				),
				'share_text_override'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'share_button_text'           => array(
					'type'    => 'string',
					'default' => __( 'Click to Tweet', 'highlight-and-share' ),
				),
				'share_text_override_enabled' => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'align'                       => array(
					'type'    => 'string',
					'default' => 'center',
				),
				'hashtags'                    => array(
					'type'    => 'array',
					'default' => array(),
				),
				'twitter_username'            => array(
					'type'    => 'string',
					'default' => '',
				),
				'maximum_width'               => array(
					'type'    => 'number',
					'default' => 850,
				),
				'maximum_width_unit'          => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'rtl'                         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'tweet_button_alignment'      => array(
					'type'    => 'string',
					'default' => 'right',
				),
				'tweet_icon_alignment'        => array(
					'type'    => 'string',
					'default' => 'right',
				),
				'tweet_button_display'        => array(
					'type'    => 'string',
					'default' => 'full',
				),
				'tweet_styles_disabled'       => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'anchor'                      => array(
					'type'    => 'text',
					'default' => '',
				),
				'has_anchor' => array(
					'type' => 'boolean',
					'default' => true,
				),
				'url_shortener' => array(
					'type' => 'boolean',
					'default' => true,
				),
				'url_shortening_service' => array(
					'type' => 'boolean',
					'default' => 'default',
				),
				'permalink' => array(
					'type' => 'text',
					'default' => '',
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
	return ob_get_clean();
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

/**
 * Generate anchor prefixed with "has-" followed by a generated string.
 */
function has_click_to_tweet_generate_anchor() {
	if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has-click-to-tweet-ajax' ) || ! current_user_can( 'edit_posts' ) ) {
		wp_send_json_error( array() );
	} else {
		wp_send_json_success(
			array(
				'unique_id' => 'has' . wp_generate_password( 8, false, ),
			)
		);
	}
}
add_action( 'wp_ajax_has_generate_unique_id', 'has_click_to_tweet_generate_anchor' );

