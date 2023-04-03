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
					'id'           => $preset->ID,
					'title'        => $preset->post_title,
					'slug'         => $preset->post_name,
					'content'      => $content,
					'delete_nonce' => wp_create_nonce( 'has_delete_preset_' . $preset->ID ),
					'save_nonce'   => wp_create_nonce( 'has_save_preset_' . $preset->ID ),
				);
			}
		}
		return $return;
	}

	/**
	 * Save a preset and return all via Ajax.
	 */
	public static function ajax_save_preset() {
		// Get preset post ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_preset_' . $preset_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get the preset title.
		$title = sanitize_text_field( filter_input( INPUT_POST, 'title', FILTER_DEFAULT ) );

		// Update the post title.
		wp_update_post(
			array(
				'ID'         => $preset_id,
				'post_title' => $title,
			)
		);

		// Retrieve all presets.
		$return = self::return_saved_presets();

		// Send json response.
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


