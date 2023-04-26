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
		add_action( 'wp_ajax_has_save_presets', array( static::class, 'ajax_save_presets' ) );
		add_action( 'wp_ajax_has_delete_preset', array( static::class, 'ajax_delete_preset' ) );
		add_action( 'wp_ajax_has_override_preset', array( static::class, 'ajax_override_preset' ) );
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
				$content                       = json_decode( $preset->post_content, true );
				$content['attributes']['icon'] = wp_unslash( $content['attributes']['icon'] );

				// Add missing attributes.
				if ( ! isset( $content['attributes']['maximumWidth'] ) ) {
					$content['attributes']['maximumWidth'] = array(
						'mobile'  => array(
							'width' => '',
							'unit'  => null,
						),
						'tablet'  => array(
							'width' => '',
							'unit'  => null,
						),
						'desktop' => array(
							'width' => '850',
							'unit'  => 'px',
						),
					);
				}
				if ( ! isset( $content['attributes']['iconSizeResponsive'] ) ) {
					$content['attributes']['iconSizeResponsive'] = array(
						'desktop' => -1,
						'tablet'  => -1,
						'mobile'  => -1,
					);
				}
				if ( ! isset( $content['attributes']['typographyQuote'] ) ) {
					$content['attributes']['typographyQuote'] = array(
						'mobile'  => array(
							'fontFamily'        => '',
							'fontFamilySlug'    => '',
							'fontSize'          => '',
							'fontSizeUnit'      => 'px',
							'fontWeight'        => '',
							'lineHeight'        => '',
							'lineHeightUnit'    => 'em',
							'textTransform'     => '',
							'letterSpacing'     => '',
							'letterSpacingUnit' => 'px',
							'fontFallback'      => '',
							'fontType'          => 'web',
						),
						'tablet'  => array(
							'fontFamily'        => '',
							'fontFamilySlug'    => '',
							'fontSize'          => '',
							'fontSizeUnit'      => 'px',
							'fontWeight'        => '',
							'lineHeight'        => '',
							'lineHeightUnit'    => 'em',
							'textTransform'     => '',
							'letterSpacing'     => '',
							'letterSpacingUnit' => 'px',
							'fontFallback'      => '',
							'fontType'          => 'web',
						),
						'desktop' => array(
							'fontFamily'        => 'Arial',
							'fontFamilySlug'    => 'arial',
							'fontSize'          => '24',
							'fontSizeUnit'      => 'px',
							'fontWeight'        => 'normal',
							'lineHeight'        => '1.3',
							'lineHeightUnit'    => 'em',
							'textTransform'     => 'none',
							'letterSpacing'     => '0',
							'letterSpacingUnit' => 'px',
							'fontFallback'      => 'serif',
							'fontType'          => 'web',
						),
					);
				}
				if ( ! isset( $content['attributes']['typographyShareText'] ) ) {
					$content['attributes']['typographyShareText'] = array(
						'mobile'  => array(
							'fontFamily'        => '',
							'fontFamilySlug'    => '',
							'fontSize'          => '',
							'fontSizeUnit'      => 'px',
							'fontWeight'        => '',
							'lineHeight'        => '',
							'lineHeightUnit'    => 'em',
							'textTransform'     => '',
							'letterSpacing'     => '',
							'letterSpacingUnit' => 'px',
							'fontFallback'      => '',
							'fontType'          => 'web',
						),
						'tablet'  => array(
							'fontFamily'        => '',
							'fontFamilySlug'    => '',
							'fontSize'          => '',
							'fontSizeUnit'      => 'px',
							'fontWeight'        => '',
							'lineHeight'        => '',
							'lineHeightUnit'    => 'em',
							'textTransform'     => '',
							'letterSpacing'     => '',
							'letterSpacingUnit' => 'px',
							'fontFallback'      => '',
							'fontType'          => 'web',
						),
						'desktop' => array(
							'fontFamily'        => 'Arial',
							'fontFamilySlug'    => 'arial',
							'fontSize'          => '24',
							'fontSizeUnit'      => 'px',
							'fontWeight'        => 'normal',
							'lineHeight'        => '1.3',
							'lineHeightUnit'    => 'em',
							'textTransform'     => 'none',
							'letterSpacing'     => '0',
							'letterSpacingUnit' => 'px',
							'fontFallback'      => 'serif',
							'fontType'          => 'web',
						),
					);
				}
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
	 * Saves a new preset and returns all via Ajax.
	 */
	public static function ajax_save_presets() {
		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_presets' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get attributes JSON.
		$attributes = json_decode( filter_input( INPUT_POST, 'attributes', FILTER_DEFAULT ), true );
		unset( $attributes['uniqueId'] );
		$attributes['icon'] = wp_slash( $attributes['icon'] );

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
				'post_content' => wp_json_encode( array( 'attributes' => $attributes ), 1048 ),
				'post_status'  => 'publish',
				'post_type'    => 'has-presets',
			)
		);

		// Get the presets.
		$return = self::return_saved_presets();
		wp_send_json_success( array( 'presets' => $return ) );
	}

	/**
	 * Overrides a preset and returns all saved presets.
	 */
	public static function ajax_override_preset() {
		 // Get preset post ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_save_presets' ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Get attributes JSON.
		$attributes = json_decode( filter_input( INPUT_POST, 'attributes', FILTER_DEFAULT ), true );
		unset( $attributes['uniqueId'] );

		// Update post with new attribute data.
		wp_update_post(
			array(
				'ID'           => $preset_id,
				'post_content' => wp_json_encode( $attributes ),
			)
		);

		// Get the presets.
		$return = self::return_saved_presets();
		wp_send_json_success( array( 'presets' => $return ) );
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
	 * Delete a preset and return all via Ajax.
	 */
	public static function ajax_delete_preset() {
		// Get preset post ID.
		$preset_id = absint( filter_input( INPUT_POST, 'editId', FILTER_DEFAULT ) );

		// Verify nonce.
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'has_delete_preset_' . $preset_id ) || ! current_user_can( 'edit_others_posts' ) ) {
			wp_send_json_error( array() );
		}

		// Remove the post.
		wp_delete_post( $preset_id, true );

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
