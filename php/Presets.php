<?php
/**
 * Set up the presets.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Presets class.
 */
class Presets {

	/**
	 * Main class runner.
	 */
	public static function run() {
		$self = new self();
		add_action( 'init', array( static::class, 'register_post_type' ) );
		add_action( 'wp_ajax_has_load_presets', array( static::class, 'ajax_load_presets' ) );
		add_action( 'wp_ajax_has_save_preset', array( static::class, 'ajax_save_preset' ) );
		return $self;
	}

	/**
	 * Loads the presets and returns via Ajax.
	 */
	public static function ajax_load_presets() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_load_presets' ) || ! current_user_can( 'edit_posts' ) ) {
			wp_send_json_error( array() );
		}

		$return = self::return_saved_presets();

		wp_send_json_success( array( 'presets' => $return ) );

	}

	/**
	 * Return saved presets.
	 *
	 * @return array $return The saved presets.
	 */
	private static function return_saved_presets() {
		// Get the presets.
		$args    = array(
			'post_type'      => 'has-presets',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'order'          => 'ASC',
			'orderby'        => 'title',
		);
		$presets = get_posts( $args );

		// Build the return array.
		$return = array();
		if ( $presets ) {
			foreach ( $presets as $preset ) {
				// Format content that is JSON into an array.
				$content  = json_decode( $preset->post_content, true );
				$return[] = array(
					'id'      => $preset->ID,
					'title'   => $preset->post_title,
					'slug'    => $preset->post_name,
					'content' => $content,
				);
			}
		}
		return $return;
	}

	/**
	 * Saves the presets and loads in via Ajax.
	 */
	public static function ajax_save_preset() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_presets' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get attributes JSON.
		$attributes = json_decode( filter_input( INPUT_POST, 'attributes', FILTER_DEFAULT ), true );
		unset( $attributes['uniqueId'] );

		// Get form data.
		$form_data = json_decode( filter_input( INPUT_POST, 'formData', FILTER_DEFAULT ), true );

		// Get the preset title.
		$title           = isset( $form_data['presetTitle'] ) ? sanitize_text_field( $form_data['presetTitle'] ) : '';
		$title_sanitized = sanitize_title( $title );

		// Insert new post with preset data.
		$post_id = wp_insert_post(
			array(
				'post_title'   => $title,
				'post_name'    => $title_sanitized,
				'post_content' => wp_json_encode( $attributes ),
				'post_status'  => 'publish',
				'post_type'    => 'has-presets',
			)
		);

		// Get the presets.
		$return = self::return_saved_presets();
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Registers the Presets Post type.
	 */
	public static function register_post_type() {
		$labels = array(
			'name'               => __( 'Presets', 'highlight-and-share' ),
			'singular_name'      => __( 'Presets', 'highlight-and-share' ),
			'add_new'            => __( 'Add New', 'highlight-and-share' ),
			'add_new_item'       => __( 'Add New Preset', 'highlight-and-share' ),
			'edit_item'          => __( 'Edit Preset', 'highlight-and-share' ),
			'new_item'           => __( 'New Preset', 'highlight-and-share' ),
			'all_items'          => __( 'All Presets', 'highlight-and-share' ),
			'view_item'          => __( 'View Preset', 'highlight-and-share' ),
			'search_items'       => __( 'Search Presets', 'highlight-and-share' ),
			'not_found'          => __( 'No presets found', 'highlight-and-share' ),
			'not_found_in_trash' => __( 'No presets found in Trash', 'highlight-and-share' ),
			'parent_item_colon'  => '',
			'menu_name'          => __( 'Presets', 'highlight-and-share' ),
		);

		$args = array(
			'labels'             => $labels,
			'public'             => false,
			'publicly_queryable' => false,
			'show_ui'            => false,
			'show_in_menu'       => false,
			'query_var'          => false,
			'rewrite'            => false,
			'has_archive'        => false,
			'hierarchical'       => false,
		);

		register_post_type( 'has-presets', $args );
	}

}


