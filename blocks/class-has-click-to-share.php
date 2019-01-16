<?php

/**
 * Registers the `core/latest-posts` block on server.
 */
function ptam_register_custom_posts_block() {

	// Check if the register function exists
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'has/click-to-share', array(
		'attributes' => array(
			'postType' => array(
				'type' => 'string',
				'default' => 'post',
			),
			'imageLocation' => array(
				'type' => 'string',
				'default' => 'regular'
			),
			'changeCapitilization' => array(
				'type' => 'bool',
				'value' => false
			),
			'imageSize' => array(
				'type' => 'string',
				'default' => 'ptam-block-post-grid-landscape'
			),
			'imageTypeSize' => array(
				'type' => 'string',
				'default' => 'thumbnail',
			),
			'imageType' => array(
				'type' => 'string',
				'default' => 'regular'
			),
			'avatarSize' => array(
				'type' => 'string',
				'default' => 500
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'category',
			),
			'displayTaxonomies' => array(
				'type' => 'bool',
				'default' => true,
			),
			'term' => array(
				'type' => 'number',
				'default' => 0,
			),
			'terms' => array(
				'type' => 'string',
				'default' => 'all',
			),
			'context' => array(
				'type' => 'string',
				'default' => 'view',
			),
			'className' => array(
				'type' => 'string',
			),
			'postsToShow' => array(
				'type' => 'number',
				'default' => 6,
			),
			'pagination' => array(
				'type' => 'boolean',
				'default' => false,
			),
			'displayPostDate' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostExcerpt' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostAuthor' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostImage' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'displayPostLink' => array(
				'type' => 'boolean',
				'default' => true,
			),
			'postLayout' => array(
				'type' => 'string',
				'default' => 'grid',
			),
			'columns' => array(
				'type' => 'number',
				'default' => 2,
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center',
			),
			'width' => array(
				'type' => 'string',
				'default' => 'wide',
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc',
			),
			'orderBy'  => array(
				'type' => 'string',
				'default' => 'date',
			),
			'imageCrop'  => array(
				'type' => 'string',
				'default' => 'landscape',
			),
			'readMoreText'  => array(
				'type' => 'string',
				'default' => 'Continue Reading',
			),
		),
		'render_callback' => 'has_click_to_share',
		'editor_script'   => 'has-click-to-share'
	) );
}

function has_click_to_share( $attributes ) {
	return 'hello';
}

add_action( 'init', 'has_register_block_attributes' );