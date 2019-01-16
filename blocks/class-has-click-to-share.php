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
				'type' => 'string',
				'default' => '24px'
			)
		),
		'render_callback' => 'has_click_to_share',
		'editor_script'   => 'has-click-to-share'
	) );
}

function has_click_to_share( $attributes ) {
	return 'hello';
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function has_blocks_block_assets() {

	// Load the compiled styles
	wp_enqueue_style(
		'has-style-css',
		Highlight_And_Share::get_instance()->get_plugin_url( 'assets/dist/css/admin.css'),
		HIGHLIGHT_AND_SHARE_VERSION, 'all' );
}
add_action( 'enqueue_block_assets', 'has_blocks_block_assets' );

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
}
add_action( 'enqueue_block_editor_assets', 'has_blocks_editor_assets' );

add_action( 'init', 'has_register_block_attributes' );