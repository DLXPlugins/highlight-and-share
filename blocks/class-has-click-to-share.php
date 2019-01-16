<?php

/**
 * Registers the `core/latest-posts` block on server.
 */
function has_register_block_attributes() {

	// Check if the register function exists
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'has/click-to-share', array(
		'attributes' => array(
			'shareText'  => array(
				'type' => 'string',
				'default' => '',
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#FFFFFF',
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000000',
			),
			'fontSize' => array(
				'type' => 'int',
				'default' => 24
			),
			'clickShareFontSize' => array(
				'type' => 'int',
				'default' => 24
			),
			'clickText' => array(
				'type' => 'string',
				'default' => __( 'Click to Share', 'highlight-and-share' )
			),
			'padding' => array(
				'type' => 'int',
				'default' => 0,
			),
			'border' => array(
				'type' => 'int',
				'default' => 0,
			),
			'borderRounded' => array(
				'type' => 'string',
				'default' => '0',
			),
			'borderColor' => array(
				'type' => 'string',
				'default' => '#FFFFFF'
			),
			'fontWeight' => array(
				'type' => 'int',
				'default' => 100
			),
			'maxWidth' => array(
				'type' => 'int',
				'default' => 100,
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			),
			'marginLeft' => array(
				'type' => 'int',
				'default' => 0,
			),
			'marginRight' => array(
				'type' => 'int',
				'default' => 0,
			),
			'marginBottom' => array(
				'type' => 'int',
				'default' => 0,
			),
			'marginTop' => array(
				'type' => 'int',
				'default' => 0,
			)
		),
		'render_callback' => 'has_click_to_share',
		'editor_script'   => 'has-click-to-share'
	) );
}

function has_click_to_share( $attributes ) {
	ob_start();
	/*
	fontSize: fontSize + 'px',
			padding: padding + 'px',
			border: `${border}px solid ${borderColor}`,
			borderRadius: borderRounded + 'px',
			backgroundColor: backgroundColor,
			color: textColor,
			maxWidth: `${maxWidth}%`,
			marginLeft: marginLeft + 'px',
			marginRight: marginRight + 'px',
			marginBottom: marginBottom + 'px',
			marginTop: marginTop + 'px'
		};
		if ( 'center' == alignment ) {
			hasStyles.margin = '0 auto';
		}
		if( 'left' == alignment ) {
			hasStyles.float = 'left';
		}
		if( 'right' == alignment ) {
			hasStyles.float = 'right';
		}
		 */
	?>
	<div class='has-click-to-share' style="padding: <?php echo esc_attr( $attributes['padding'] ); ?>px; border: <?php echo esc_attr( $attributes['border'] . 'px solid' . ' ' . $attributes['borderColor'] ); ?>; border-radius: <?php echo esc_attr( $attributes['borderRounded'] ); ?>px; background-color: <?php echo esc_attr( $attributes['backgroundColor'] ); ?>; color: <?php echo esc_attr( $attributes['textColor'] ); ?>; max-width: <?php echo esc_attr( $attributes['maxWidth'] ); ?>%; margin-left: <?php echo esc_attr( $attributes['marginLeft'] ); ?>px; margin-right: <?php echo esc_attr( $attributes['marginRight'] ); ?>px; margin-bottom: <?php echo esc_attr( $attributes['marginBottom'] ); ?>px; margin-Top: <?php echo esc_attr( $attributes['marginTop'] ); ?>px; <?php echo 'center' === $attributes['alignment'] ? 'margin: 0 auto;' : ''; ?><?php echo 'left' === $attributes['alignment'] ? 'float: left;' : ''; ?><?php echo 'right' === $attributes['alignment'] ? 'float: right;' : ''; ?>">
		<div class="has-click-to-share-wrapper">
			<div class="has-click-to-share-text" style="color: <?php echo esc_attr( $attributes['textColor'] ); ?>; font-size: <?php echo esc_attr( $attributes['fontSize'] ); ?>px; font-weight: <?php echo esc_attr( $attributes['fontWeight'] ); ?>">
				<?php echo wp_kses_post( $attributes['shareText'] ); ?>
			</div>
			<div class='has-click-to-share-cta' style="font-size: <?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>; color: <?php echo esc_attr( $attributes['textColor'] ); ?>">
			<?php echo wp_kses_post( $attributes['clickText'] ); ?> <i class="material-icons" style="font-size: <?php echo esc_attr( $attributes['clickShareFontSize'] ); ?>">share</i>
			</div>
			<a class="has-click-prompt" href="#">
			</a>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function has_blocks_block_assets() {

	// Load the compiled styles
	if( is_admin() ) {
		wp_enqueue_style(
			'has-style-css',
			Highlight_And_Share::get_instance()->get_plugin_url( 'assets/dist/css/admin.css'),
			HIGHLIGHT_AND_SHARE_VERSION, 'all' );
		wp_enqueue_style('google-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
	} else {
		wp_register_style(
			'has-style-css',
			Highlight_And_Share::get_instance()->get_plugin_url( 'assets/dist/css/admin.css'),
			HIGHLIGHT_AND_SHARE_VERSION, 'all' );
		wp_register_style('google-material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
	}


}
add_action( 'enqueue_block_assets', 'has_blocks_block_assets' );

add_filter( 'render_block', 'has_render_block', 10, 2 );
function has_render_block( $block_content, $block ) {
	if( is_admin() ) return $block_content;
	if ( 'has/click-to-share' === $block['blockName'] ) {
		ob_start();
		wp_print_styles( 'has-style-css' );
		wp_print_styles( 'google-material-icons' );
		$block_content = ob_get_clean() . $block_content;
	}

	return $block_content;
}

/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function has_blocks_editor_assets() {

	// Load the compiled blocks into the editor
	wp_enqueue_script(
		'has-click-to-share-gutenberg',
		Highlight_And_Share::get_instance()->get_plugin_url( 'assets/dist/js/gutenberg.js'),
		array( 'wp-blocks', 'wp-element' ), HIGHLIGHT_AND_SHARE_VERSION, true
	);
	wp_localize_script( 'has-click-to-share-gutenberg', 'has_gutenberg', array(
		'svg' => Highlight_And_Share::get_instance()->get_plugin_url( 'img/share.svg' )
	) );
}
add_action( 'enqueue_block_editor_assets', 'has_blocks_editor_assets' );

add_action( 'init', 'has_register_block_attributes' );