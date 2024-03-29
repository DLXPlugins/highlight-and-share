<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Frontend
 */
class Frontend {

	/**
	 * Class runner.
	 */
	public function run() {
		add_action( 'wp', array( $this, 'wp_loaded' ), 15 );
	}

	/**
	 * When WP is loaded, output scripts.
	 */
	public function wp_loaded() {
		// Disable if on a feed.
		if ( is_feed() ) {
			return;
		}

		$settings = Options::get_plugin_options();

		/**
		 * Filter: has_show_facebook
		 *
		 * Hide or show the Facebook sharing option.
		 *
		 * @param bool true to show Facebook, false to not.
		 */
		$show_facebook = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );

		/**
		 * Filter: has_show_twitter
		 *
		 * Hide or show the Twitter sharing option.
		 *
		 * @param bool true to show Twitter, false to not.
		 */
		$show_twitter = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );

		/**
		 * Filter: has_show_linkedin
		 *
		 * Hide or show the LinkedIn sharing option.
		 *
		 * @param bool true to show LinkedIn, false to not.
		 */
		$show_linkedin = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
		$show_ok       = (bool) apply_filters( 'has_show_ok', $settings['show_ok'] );
		$show_vk       = (bool) apply_filters( 'has_show_vk', $settings['show_vk'] );

		/**
		 * Filter: has_show_email
		 *
		 * Hide or show the email sharing option.
		 *
		 * @param bool true to show email, false to not.
		 */
		$show_email = (bool) apply_filters( 'has_show_email', $settings['show_email'] ?? $settings['enable_emails'] );

		/**
		 * Filter: has_show_tumblr
		 *
		 * Hide or show the Tumblr sharing option.
		 *
		 * @param bool true to show Tumblr, false to not.
		 */
		$show_tumblr = (bool) apply_filters( 'has_show_tumblr', $settings['show_tumblr'] );

		/**
		 * Filter: has_show_copy
		 *
		 * Hide or show the copy option.
		 *
		 * @param bool true to show copy feature, false to not.
		 */
		$show_copy = (bool) apply_filters( 'has_show_copy', $settings['show_copy'] );

		/**
		 * Filter: has_show_reddit
		 *
		 * Hide or show the reddit option.
		 *
		 * @param bool true to show reddit social network, false to not.
		 */
		$show_reddit = (bool) apply_filters( 'has_show_reddit', isset( $settings['show_reddit'] ) ? $settings['show_reddit'] : false );

		/**
		 * Filter: has_show_telegram
		 *
		 * Hide or show the Telegram option.
		 *
		 * @param bool true to show Telegram feature, false to not.
		 */
		$show_telegram = (bool) apply_filters( 'has_show_telegram', isset( $settings['show_telegram'] ) ? $settings['show_telegram'] : false );

		/**
		 * Filter: has_show_whatsapp
		 *
		 * Hide or show the WhatsApp option.
		 *
		 * @param bool true to show WhatsApp feature, false to not.
		 */
		$show_whatsapp = (bool) apply_filters( 'has_show_whatsapp', isset( $settings['show_whats_app'] ) ? $settings['show_whats_app'] : false );

		/**
		 * Filter: has_show_webshare
		 *
		 * Hide or show the Webshare option.
		 *
		 * @param bool true to show WhatsApp feature, false to not.
		 */
		$show_webshare = (bool) apply_filters( 'has_show_webshare', isset( $settings['show_webshare'] ) ? $settings['show_webshare'] : false );

		/**
		 * Filter: has_show_mastodon
		 *
		 * Hide or show the Mastodon option.
		 *
		 * @param bool true to show Mastodon feature, false to not.
		 */
		$show_mastodon = (bool) apply_filters( 'has_show_mastodon', isset( $settings['show_mastodon'] ) ? $settings['show_mastodon'] : false );

		// Placeholder for signal.
		$show_signal = false;

		// If no social network is active, exit.
		if ( ! $show_facebook && ! $show_twitter && ! $show_linkedin && ! $show_ok && ! $show_email && ! $show_copy && ! $show_reddit && ! $show_telegram && ! $show_whatsapp && ! $show_tumblr && ! $show_webshare && ! $show_mastodon ) {
			return;
		}

		// Load scripts.
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );

		// Load html.
		add_action( 'wp_footer', array( $this, 'add_footer_html' ) );

		/**
		 * Filter: has_enable_content
		 *
		 * Whether Highlight and Share will work on regular post or page content.
		 *
		 * @param bool true to enable HAS on post content, false to not.
		 */
		if ( apply_filters( 'has_enable_content', (bool) $settings['enable_content'] ) ) {
			add_filter( 'the_content', array( $this, 'content_area' ) );
		}

		/**
		 * Filter: has_enable_excerpt
		 *
		 * Whether Highlight and Share will work on post excerpts.
		 *
		 * @param bool true to enable HAS on excerpts, false to not.
		 */
		if ( apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] ) ) {
			add_filter( 'the_excerpt', array( $this, 'excerpt_area' ) );
		}
	}

	/**
	 * Add a class and data attribute around the main content.
	 *
	 * Add a class and data attribute around the main content.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param string $content Main post content.
	 * @return string $content Modified
	 */
	public function content_area( $content ) {
		global $post;
		if ( ! in_the_loop() ) {
			return $content;
		}
		if ( ! is_object( $post ) ) {
			return $content;
		}
		if ( is_admin() ) {
			return $content;
		}

		// Get post vars.
		$post_id          = $post->ID;
		$url              = Functions::get_content_url( $post_id );
		$title            = get_the_title( $post_id );
		$is_legacy_markup = $this->is_legacy_content_loop_markup( $post_id ); // Determine if we're in legacy markup mode (wrap everything in a div) or not.

		// Get wrapper classes.
		$has_wrapper_classes = array(
			'has-content-area',
		);

		// Retrieve wrapper classes from options.
		$class_dots_regex = '/\./';
		$options          = Options::get_plugin_options();
		$wrapper_classes  = $options['wrapper_classes'] ?? '';
		if ( ! empty( $wrapper_classes ) ) {
			$wrapper_classes     = preg_replace( $class_dots_regex, '', $wrapper_classes );
			$wrapper_classes     = array_map( 'trim', explode( ',', $wrapper_classes ) );
			$has_wrapper_classes = array_merge( $has_wrapper_classes, $wrapper_classes );
		}

		/**
		 * Filter: has_content_wrapper_classes
		 *
		 * Add classes to the post wrapper container for the content area.
		 *
		 * @since 4.5.0
		 *
		 * @param array $has_wrapper_classes Index array of classes.
		 * @param int   $post_id             Post ID.
		 * @param bool  $is_legacy_markup    Whether we're in legacy markup mode or not.
		 */
		$has_wrapper_classes = apply_filters( 'has_content_wrapper_classes', $has_wrapper_classes, $post_id, $is_legacy_markup );

		$hashtags = Hashtags::get_hashtags( $post_id );

		if ( true === $is_legacy_markup ) {
			$content = sprintf(
				'<div class="has-social-placeholder %s" data-url="%s" data-title="%s" data-hashtags="%s" data-post-id="%s">%s</div>',
				esc_attr( implode( ' ', $has_wrapper_classes ) ),
				esc_attr( $url ),
				esc_attr( $title ),
				esc_attr( implode( ' ', $has_wrapper_classes ) ),
				esc_attr( $post_id ),
				$content
			);
		} else {
			// Add an empty div right below the content.
			$content = sprintf(
				'%s<div class="has-social-placeholder %s" data-url="%s" data-title="%s" data-hashtags="%s" data-post-id="%s"></div>',
				$content,
				esc_attr( implode( ' ', $has_wrapper_classes ) ),
				esc_attr( $url ),
				esc_attr( $title ),
				esc_attr( $hashtags ),
				esc_attr( $post_id )
			);
		}

		return $content;
	}

	/**
	 * Add a class and data attribute around the main excerpts.
	 *
	 * Add a class and data attribute around the main excerpts.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param string $content Main excerpt content.
	 * @return string $content Modified
	 */
	public function excerpt_area( $content ) {
		global $post;
		if ( ! in_the_loop() ) {
			return $content;
		}
		if ( ! is_object( $post ) ) {
			return $content;
		}
		if ( is_admin() ) {
			return $content;
		}

		$post_id = $post->ID;
		$url     = Functions::get_content_url( $post_id );
		$title   = get_the_title( $post_id );
		$content = sprintf( '<div class="has-excerpt-area" data-url="%s" data-title="%s" data-hashtags="%s">%s</div>', esc_url( $url ), esc_attr( $title ), esc_attr( Hashtags::get_hashtags( $post_id ) ), $content );
		return $content;
	}

	/**
	 * Check to see if the legacy content loop markup is enabled.
	 *
	 * This filter is used to determine whether to use the legacy content loop markup, which wraps a div around the content.
	 *
	 * @param int $post_id The Post ID to check. 0 if no post ID is found.
	 *
	 * @since 4.5.0
	 *
	 * @return bool true if legacy is enabled, false if not.
	 */
	public function is_legacy_content_loop_markup( $post_id = 0 ) {
		/**
		 * Filter: has_legacy_content_loop_markup.
		 *
		 * Whether to use the legacy content loop markup, which wraps a div around the content.
		 *
		 * @param bool $legacy_markup Whether to use the legacy content loop markup, which wraps a div around the content.
		 * @param int  $post_id       The Post ID to check. Post ID is zero if no post ID is found.
		 */
		return (bool) apply_filters( 'has_legacy_content_loop_markup', false, $post_id );
	}

	/**
	 * Add general interface and SVG sprites.
	 */
	public function add_footer_html() {

		// Get cached HTML.
		$maybe_cached_html = wp_cache_get( 'has_frontend_html', 'highlight-and-share' );
		if ( $maybe_cached_html ) {
			echo $maybe_cached_html;
			$this->get_footer_svgs();
			return;
		}
		$social_networks_ordered = Options::get_plugin_options_social_networks(); // ordered social networks (appearances tab).
		$theme_options           = Options::get_theme_options(); // appearance options (appearances tab).
		$settings                = Options::get_plugin_options(); // main plugin options (settings tab).
		$email_options           = Options::get_email_options(); // email options (emails tab).

		// Get HAS container classes.
		$has_container_classes = array(
			'highlight-and-share-wrapper',
			'theme-' . $theme_options['theme'],
		);
		// Check for horizontal vs vertical orientation.
		if ( 'vertical' === $theme_options['orientation'] ) {
			$has_container_classes[] = 'orientation-vertical';
		} else {
			$has_container_classes[] = 'orientation-horizontal';
		}
		// Determine if labels are enabled.
		if ( 'default' === $theme_options['theme'] || ( 'custom' === $theme_options['theme'] && false === (bool) $theme_options['icons_only'] ) ) {
			$has_container_classes[] = 'show-has-labels';
		} else {
			$has_container_classes[] = 'hide-has-labels';
		}

		// Tooltip styles.
		ob_start();
		?>
		<style>
			.highlight-and-share-wrapper div.has-tooltip:hover:after {
				background-color: <?php echo esc_attr( $theme_options['tooltips_background_color'] ); ?> !important;
				color: <?php echo esc_attr( $theme_options['tooltips_text_color'] ); ?> !important;
			}
		</style>
		<?php
		$tooltip_styles = ob_get_clean();

		// Get custom theme styles.
		$custom_styles = false;
		if ( 'custom' === $theme_options['theme'] ) {
			ob_start();
			?>
			<style>
			<?php
			if ( true === (bool) $theme_options['group_icons'] ) :
				?>
					.highlight-and-share-wrapper {
						background-color: <?php echo esc_attr( $theme_options['background_color'] ); ?> !important;
					}
					.highlight-and-share-wrapper div a {
						color:<?php echo esc_attr( $theme_options['icon_colors_group'] ); ?> !important;
						background-color:<?php echo esc_attr( $theme_options['background_color'] ); ?> !important;
					}
					.highlight-and-share-wrapper div a:hover {
						color:<?php echo esc_attr( $theme_options['icon_colors_group_hover'] ); ?> !important;
						background-color:<?php echo esc_attr( $theme_options['background_color_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper div:first-of-type a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
					.highlight-and-share-wrapper div:last-of-type a {
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true === (bool) $theme_options['border_radius_group']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper {
						border-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper,
					.highlight-and-share-wrapper a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrTop'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrRight'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrBottom'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['border_radius_group']['attrLeft'] . $theme_options['border_radius_group']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true !== (bool) $theme_options['group_icons'] ) :
				?>
					.highlight-and-share-wrapper .has_twitter a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_twitter a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['twitter']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_facebook a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_facebook a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['facebook']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_linkedin a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_linkedin a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['linkedin']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_whatsapp a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_whatsapp a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['whatsapp']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_telegram a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_telegram a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['telegram']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_reddit a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_reddit a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['reddit']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_tumblr a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_tumblr a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['tumblr']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_xing a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['xing']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['xing']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_xing a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['xing']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['xing']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_email a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['email']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['email']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_email a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['email']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['email']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_copy a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['copy']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['copy']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_copy a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['copy']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['copy']['background_hover'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_webshare a {
						color: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['icon_color'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['background'] ); ?> !important;
					}
					.highlight-and-share-wrapper .has_webshare a:hover {
						color: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['icon_color_hover'] ); ?> !important;
						background: <?php echo esc_attr( $theme_options['icon_colors']['webshare']['background_hover'] ); ?> !important;
					}	
				<?php
				if ( true === (bool) $theme_options['icon_border_radius']['attrSyncUnits'] ) :
					?>
						.highlight-and-share-wrapper div a {
							border-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						}
					<?php
				else :
					?>
						.highlight-and-share-wrapper div a {
							border-top-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
							border-top-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrRight'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
							border-bottom-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrBottom'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
							border-bottom-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrLeft'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						}
					<?php
				endif;
				if ( 'horizontal' === $theme_options['orientation'] ) :
					?>
						.highlight-and-share-wrapper div {
							margin-right: <?php echo esc_attr( $theme_options['icon_gap'] ); ?>px !important;
						}
						.highlight-and-share-wrapper div:last-child {
							margin-right: 0 !important;
						}
					<?php
				endif;
				if ( 'vertical' === $theme_options['orientation'] ) :
					?>
						.highlight-and-share-wrapper div {
							margin-bottom: <?php echo esc_attr( $theme_options['icon_gap'] ); ?>px !important;
						}
						.highlight-and-share-wrapper div:last-child {
							margin-bottom: 0 !important;
						}
					<?php
				endif;
			endif;
			if ( true === (bool) $theme_options['icon_border_radius']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper div a {
						border-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper div a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrRight'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrBottom'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrLeft'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true === (bool) $theme_options['icon_border_radius']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper div a {
						border-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper div a {
						border-top-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrTop'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-top-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrRight'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-right-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrBottom'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
						border-bottom-left-radius: <?php echo esc_attr( $theme_options['icon_border_radius']['attrLeft'] . $theme_options['icon_border_radius']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			if ( true === (bool) $theme_options['icon_padding']['attrSyncUnits'] ) :
				?>
					.highlight-and-share-wrapper div a {
						padding: <?php echo esc_attr( $theme_options['icon_padding']['attrTop'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
					}
				<?php
			else :
				?>
					.highlight-and-share-wrapper div a {
						padding-top: <?php echo esc_attr( $theme_options['icon_padding']['attrTop'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
						padding-right: <?php echo esc_attr( $theme_options['icon_padding']['attrRight'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
						padding-bottom: <?php echo esc_attr( $theme_options['icon_padding']['attrBottom'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
						padding-left: <?php echo esc_attr( $theme_options['icon_padding']['attrLeft'] . $theme_options['icon_padding']['attrUnit'] ); ?> !important;
					}
				<?php
			endif;
			?>
				.highlight-and-share-wrapper div a .has-icon {
					width: <?php echo esc_attr( $theme_options['icon_size'] ); ?>px !important;
					height: <?php echo esc_attr( $theme_options['icon_size'] ); ?>px !important;
				}
				.highlight-and-share-wrapper div a {
					font-size: <?php echo esc_attr( $theme_options['font_size'] ); ?>px !important;
				}
			</style>
			<?php
			// From: https://datayze.com/howto/minify-css-with-php.
			$custom_styles = ob_get_clean();
			$custom_styles = preg_replace( '/\/\*((?!\*\/).)*\*\//', '', $custom_styles ); // negative look ahead.
			$custom_styles = preg_replace( '/\s{2,}/', ' ', $custom_styles );
			$custom_styles = preg_replace( '/\s*([:;{}])\s*/', '$1', $custom_styles );
			$custom_styles = preg_replace( '/;}/', '}', $custom_styles );
		}

		// Get wrapper opening HTML.
		$html = sprintf(
			'<div id="has-highlight-and-share"><div class="%s">',
			esc_attr( implode( ' ', $has_container_classes ) )
		);

		if ( $custom_styles ) {
			$html .= $custom_styles;
		}
		if ( $tooltip_styles ) {
			$html .= $tooltip_styles;
		}

		// Loop through order and outout social network HTML.
		foreach ( $social_networks_ordered as $social_network ) {
			$is_enabled = (bool) $social_network['enabled'];
			if ( $is_enabled ) {
				switch ( $social_network['slug'] ) {
					case 'twitter':
						// If "via" is blank, no username will show in Twitter.
						$html .= '<div class="has_twitter ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="twitter" data-tooltip="' . esc_attr( apply_filters( 'has_twitter_tooltip', $settings['twitter_tooltip'] ) ) . '"><a href="https://x.com/intent/tweet?via=%username%&url=%url%&text=%prefix%%text%%suffix%&hashtags=%hashtags%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-twitter-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_twitter_text', $settings['twitter_label'] ) ) . '</span></a></div>';
						break;
					case 'facebook':
						$html .= '<div class="has_facebook ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="facebook" data-tooltip="' . esc_attr( apply_filters( 'has_facebook_tooltip', $settings['facebook_tooltip'] ) ) . '"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-facebook-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_facebook_text', $settings['facebook_label'] ) ) . '</span></a></div>';
						break;
					case 'linkedin':
						$html .= '<div class="has_linkedin ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="linkedin" data-tooltip="' . esc_attr( apply_filters( 'has_linkedin_tooltip', $settings['linkedin_tooltip'] ) ) . '"><a href="https://www.linkedin.com/sharing/share-offsite/?mini=true&url=%url%&title=%title%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-linkedin-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_linkedin_text', $settings['linkedin_label'] ) ) . '</span></a></div>';
						break;
					case 'xing':
						$html .= '<div class="has_xing ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="xing" data-tooltip="' . esc_attr( apply_filters( 'has_xing_tooltip', $settings['xing_tooltip'] ) ) . '"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-xing-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_xing_text', $settings['xing_label'] ) ) . '</span></a></div>';
						break;
					case 'reddit':
						$html .= '<div class="has_reddit ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="reddit" data-tooltip="' . esc_attr( apply_filters( 'has_reddit_tooltip', $settings['reddit_tooltip'] ) ) . '"><a href="https://www.reddit.com/submit?resubmit=true&url=%url%&title=%title%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-reddit-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_reddit_text', $settings['reddit_label'] ) ) . '</span></a></div>';
						break;
					case 'tumblr':
						// If "via" is blank, no username will show in Twitter.
						$html .= '<div class="has_tumblr ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="tumblr" data-tooltip="' . esc_attr( apply_filters( 'has_tumblr_tooltip', $settings['tumblr_tooltip'] ) ) . '"><a href="https://tumblr.com/widgets/share/tool?canonicalUrl=%url%&content=%prefix%%text%%suffix%&title=%title%&posttype=quote" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-tumblr"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_tumblr_text', $settings['tumblr_label'] ) ) . '</span></a></div>';
						break;
					case 'telegram':
						$html .= '<div class="has_telegram ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="telegram" data-tooltip="' . esc_attr( apply_filters( 'has_telegram_tooltip', $settings['telegram_tooltip'] ) ) . '"><a href="https://t.me/share/url?url=%url%&text=%prefix%%text%%suffix%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-telegram-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_telegram_text', $settings['telegram_label'] ) ) . '</span></a></div>';
						break;
					case 'whatsapp':
						$whatsapp_endpoint_url      = 'whatsapp://send';
						$whatsapp_endpoint_settings = $settings['whats_app_api_endpoint'] ?? 'app';
						if ( 'web' === $whatsapp_endpoint_settings ) {
							$whatsapp_endpoint_url = 'https://api.whatsapp.com/send';
						}
						/**
						 * Filter: has_whatsapp_endpoint_url
						 *
						 * Filter the endpoint URL used for WhatsApp.
						 *
						 * @param string The endpoint URL.
						 *
						 * @since 3.6.5.
						 */
						$whatsapp_endpoint_url = apply_filters(
							'has_whatsapp_endpoint_url',
							$whatsapp_endpoint_url
						);
						$html                 .= '<div class="has_whatsapp ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="whatsapp" data-tooltip="' . esc_attr( apply_filters( 'has_whatsapp_tooltip', $settings['whatsapp_tooltip'] ) ) . '"><a href="' . esc_url_raw( $whatsapp_endpoint_url, array( 'whatsapp', 'http', 'https' ) ) . '?text=%prefix%%text%%suffix%: %url%" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-whatsapp-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_whatsapp_text', $settings['whatsapp_label'] ) ) . '</span></a></div>';
						break;
					case 'copy':
						$html .= '<div class="has_copy ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="copy" data-tooltip="' . esc_attr( apply_filters( 'has_copy_tooltip', $settings['copy_tooltip'] ) ) . '"><a href="#"><svg class="has-icon" rel="nofollow"><use xlink:href="#has-copy-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_copy_text', $settings['copy_label'] ) ) . '</span></a></div>';
						break;
					case 'webshare':
						$html .= '<div class="has_webshare ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none !important;" data-type="webshare" data-tooltip="' . esc_attr( apply_filters( 'has_webshare_tooltip', $settings['webshare_tooltip'] ) ) . '"><a href="#"><svg class="has-icon" rel="nofollow"><use xlink:href="#has-webshare-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_webshare_text', $settings['webshare_label'] ) ) . '</span></a></div>';
						break;
					case 'mastodon':
						$html .= '<div class="has_mastodon ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="mastodon" data-tooltip="' . esc_attr( apply_filters( 'has_mastodon_tooltip', $settings['mastodon_tooltip'] ) ) . '"><a href="https://mastodon.social/share?text=%prefix%%text%%suffix%: %url%" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-mastodon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_mastodon_text', $settings['mastodon_label'] ) ) . '</span></a></div>';
						break;
					case 'email':
						global $post;
						$post_id     = $post->ID ?? 0;
						$email_url   = '';
						$email_class = 'has_email_form';
						if ( 'mailto' === $email_options['email_send_type'] ) {
							$email_url = add_query_arg(
								array(
									'body'    => '%prefix%%text%%suffix%',
									'subject' => __( '[Shared Post]', 'highlight-and-share' ) . ' %title%',

								),
								'mailto:ronalfy@gmail.com'
							);
							$email_class = 'has_email_mailto';
						} else {
							$ajax_nonce = wp_create_nonce( 'has_share_' . get_permalink( $post_id ) );
							$email_url  = admin_url( 'admin-ajax.php' );
							$email_url  = add_query_arg(
								array(
									'action'    => 'has_email_social_modal',
									'permalink' => '%url%',
									'nonce'     => $ajax_nonce,
									'text'      => '%prefix%%text%%suffix%',
									'post_id'   => $post_id,
									'type'      => '%type%',
								),
								$email_url
							);
						}
						$html .= '<div class="has_email ' . esc_attr( $email_class ) . ' ' . ( $theme_options['show_tooltips'] ? 'has-tooltip' : '' ) . '" style="display: none;" data-type="email" data-title="%title%" data-url="%url%" data-tooltip="' . esc_attr( apply_filters( 'has_email_tooltip', $settings['email_tooltip'] ) ) . '"><a href="' . esc_url( $email_url ) . '" target="_blank" rel="nofollow"><svg class="has-icon"><use xlink:href="#has-email-icon"></use></svg><span class="has-text">&nbsp;' . esc_html( apply_filters( 'has_email_text', $settings['email_label'] ) ) . '</span></a></div>';

						// Enqueue the modal script.
						if ( ! wp_script_is( 'fancybox', 'enqueued' ) && 'form' === $email_options['email_send_type'] ) {
							wp_register_script(
								'has-fancybox-js',
								Functions::get_plugin_url( '/js/fancybox.umd.js' ),
								array(),
								Functions::get_plugin_version(),
								true
							);

							wp_register_style(
								'has-fancybox-css',
								Functions::get_plugin_url( '/js/fancybox.css' ),
								array(),
								Functions::get_plugin_version(),
								'all'
							);
						}
						break;
				}
			}
		}
		$html .= '</div><!-- #highlight-and-share-wrapper --></div><!-- #has-highlight-and-share -->';

		// Cache HTML.
		wp_cache_set( 'has_frontend_html', $html, 'highlight-and-share', HOUR_IN_SECONDS );
		echo $html;
		$this->get_footer_svgs();

		// Enqueue / print fancybox styles.
		if ( wp_script_is( 'has-fancybox-js', 'registered' ) && ! wp_script_is( 'has-fancybox-js', 'done' ) && 'form' === $email_options['email_send_type'] ) {
			wp_print_scripts( 'has-fancybox-js' );
			wp_print_styles( 'has-fancybox-css' );
		}
	}

	/**
	 * Retrieve SVGs in the footer for reference.
	 */
	private function get_footer_svgs() {
		?>
		<svg width="0" height="0" class="hidden" style="display: none;">
			<symbol aria-hidden="true" data-prefix="fas" data-icon="twitter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="has-twitter-icon">
				<g><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="facebook" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="has-facebook-icon">
				<path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="at" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-email-icon">
				<path fill="currentColor" d="M256 8C118.941 8 8 118.919 8 256c0 137.059 110.919 248 248 248 48.154 0 95.342-14.14 135.408-40.223 12.005-7.815 14.625-24.288 5.552-35.372l-10.177-12.433c-7.671-9.371-21.179-11.667-31.373-5.129C325.92 429.757 291.314 440 256 440c-101.458 0-184-82.542-184-184S154.542 72 256 72c100.139 0 184 57.619 184 160 0 38.786-21.093 79.742-58.17 83.693-17.349-.454-16.91-12.857-13.476-30.024l23.433-121.11C394.653 149.75 383.308 136 368.225 136h-44.981a13.518 13.518 0 0 0-13.432 11.993l-.01.092c-14.697-17.901-40.448-21.775-59.971-21.775-74.58 0-137.831 62.234-137.831 151.46 0 65.303 36.785 105.87 96 105.87 26.984 0 57.369-15.637 74.991-38.333 9.522 34.104 40.613 34.103 70.71 34.103C462.609 379.41 504 307.798 504 232 504 95.653 394.023 8 256 8zm-21.68 304.43c-22.249 0-36.07-15.623-36.07-40.771 0-44.993 30.779-72.729 58.63-72.729 22.292 0 35.601 15.241 35.601 40.77 0 45.061-33.875 72.73-58.161 72.73z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="linkedin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-linkedin-icon">
				<path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="xing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" id="has-xing-icon">
				<path fill="currentColor" d="M162.7 210c-1.8 3.3-25.2 44.4-70.1 123.5-4.9 8.3-10.8 12.5-17.7 12.5H9.8c-7.7 0-12.1-7.5-8.5-14.4l69-121.3c.2 0 .2-.1 0-.3l-43.9-75.6c-4.3-7.8.3-14.1 8.5-14.1H100c7.3 0 13.3 4.1 18 12.2l44.7 77.5zM382.6 46.1l-144 253v.3L330.2 466c3.9 7.1.2 14.1-8.5 14.1h-65.2c-7.6 0-13.6-4-18-12.2l-92.4-168.5c3.3-5.8 51.5-90.8 144.8-255.2 4.6-8.1 10.4-12.2 17.5-12.2h65.7c8 0 12.3 6.7 8.5 14.1z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="whatsapp" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-whatsapp-icon">
				<path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-copy-icon">
				<path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fas" data-icon="share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-share-icon">
				<path fill="currentColor" d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="reddit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-reddit-icon">
				<path fill="currentColor" d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2 22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8-9.7-10.1-23.4-16.3-38.4-16.3-55.6 0-73.8 74.6-22.9 100.1-1.8 7.9-2.6 16.3-2.6 24.7 0 83.8 94.4 151.7 210.3 151.7 116.4 0 210.8-67.9 210.8-151.7 0-8.4-.9-17.2-3.1-25.1 49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7 21.6 0 39.2 17.6 39.2 39.7 0 21.6-17.6 39.2-39.2 39.2-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0-4-3.5-4-9.7 0-13.7 3.5-3.5 9.7-3.5 13.2 0 27.8 28.5 120 29 149 0 3.5-3.5 9.7-3.5 13.2 0 4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2 0-22 17.6-39.7 39.2-39.7 22 0 39.7 17.6 39.7 39.7-.1 21.5-17.7 39.2-39.7 39.2z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="telegram" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-telegram-icon">
				<path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"></path>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="signal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="has-signal-icon">
				<g>
					<path d="M97.2800192,3.739673 L100.160021,15.3787704 C88.8306631,18.1647705 77.9879854,22.6484879 68.0000023,28.6777391 L61.8399988,18.3985363 C72.8467373,11.7537029 84.7951803,6.81153332 97.2800192,3.739673 Z M158.720055,3.739673 L155.840053,15.3787704 C167.169411,18.1647705 178.012089,22.6484879 188.000072,28.6777391 L194.200075,18.3985363 C183.180932,11.7499974 171.218739,6.80771878 158.720055,3.739673 L158.720055,3.739673 Z M18.3999736,61.8351679 C11.7546212,72.8410466 6.81206547,84.7885562 3.73996516,97.2724198 L15.3799719,100.152197 C18.1661896,88.8237238 22.6502573,77.981893 28.6799796,67.9946902 L18.3999736,61.8351679 Z M11.9999699,127.990038 C11.9961044,122.172725 12.4306685,116.363392 13.2999707,110.611385 L1.43996383,108.811525 C-0.479938607,121.525138 -0.479938607,134.454937 1.43996383,147.168551 L13.2999707,145.36869 C12.4306685,139.616684 11.9961044,133.807351 11.9999699,127.990038 L11.9999699,127.990038 Z M194.160075,237.581539 L188.000072,227.302336 C178.024494,233.327885 167.195565,237.811494 155.880053,240.601305 L158.760055,252.240403 C171.231048,249.164732 183.165742,244.222671 194.160075,237.581539 L194.160075,237.581539 Z M244.000104,127.990038 C244.00397,133.807351 243.569406,139.616684 242.700103,145.36869 L254.56011,147.168551 C256.480013,134.454937 256.480013,121.525138 254.56011,108.811525 L242.700103,110.611385 C243.569406,116.363392 244.00397,122.172725 244.000104,127.990038 Z M252.260109,158.707656 L240.620102,155.827879 C237.833884,167.156352 233.349817,177.998183 227.320094,187.985385 L237.6001,194.184905 C244.249159,183.166622 249.191823,171.205364 252.260109,158.707656 L252.260109,158.707656 Z M145.380047,242.701142 C133.858209,244.43447 122.141865,244.43447 110.620027,242.701142 L108.820026,254.560223 C121.534632,256.479975 134.465442,256.479975 147.180048,254.560223 L145.380047,242.701142 Z M221.380091,196.804701 C214.461479,206.174141 206.175877,214.452354 196.800077,221.362797 L203.920081,231.022048 C214.262958,223.418011 223.404944,214.303705 231.040097,203.984145 L221.380091,196.804701 Z M196.800077,34.6172785 C206.177345,41.5338058 214.463023,49.8188367 221.380091,59.1953726 L231.040097,51.9959309 C223.429284,41.6822474 214.31457,32.5682452 204.000081,24.9580276 L196.800077,34.6172785 Z M34.619983,59.1953726 C41.5370506,49.8188367 49.8227288,41.5338058 59.1999972,34.6172785 L51.9999931,24.9580276 C41.6855038,32.5682452 32.5707896,41.6822474 24.9599774,51.9959309 L34.619983,59.1953726 Z M237.6001,61.8351679 L227.320094,67.9946902 C233.346114,77.969489 237.830073,88.7975718 240.620102,100.1122 L252.260109,97.2324229 C249.184198,84.7624043 244.241751,72.8286423 237.6001,61.8351679 L237.6001,61.8351679 Z M110.620027,13.2989317 C122.141865,11.5656035 133.858209,11.5656035 145.380047,13.2989317 L147.180048,1.43985134 C134.465442,-0.479901112 121.534632,-0.479901112 108.820026,1.43985134 L110.620027,13.2989317 Z M40.7799866,234.201801 L15.9999722,239.981353 L21.7799756,215.203275 L10.0999688,212.463487 L4.3199655,237.241566 C3.3734444,241.28318 4.58320332,245.526897 7.51859925,248.462064 C10.4539952,251.39723 14.6980441,252.606895 18.7399738,251.660448 L43.4999881,245.980888 L40.7799866,234.201801 Z M12.5999703,201.764317 L24.279977,204.484106 L28.2799793,187.305438 C22.4496684,177.507146 18.1025197,166.899584 15.3799719,155.827879 L3.73996516,158.707656 C6.34937618,169.311891 10.3154147,179.535405 15.539972,189.125297 L12.5999703,201.764317 Z M68.6000027,227.762301 L51.4199927,231.761991 L54.1399943,243.441085 L66.7800016,240.501313 C76.3706428,245.725462 86.5949557,249.691191 97.2000192,252.300398 L100.080021,240.6613 C89.0307035,237.906432 78.4495684,233.532789 68.6800027,227.682307 L68.6000027,227.762301 Z M128.000037,23.9980665 C90.1565244,24.0177003 55.3105242,44.590631 37.01511,77.715217 C18.7196958,110.839803 19.8628631,151.287212 39.9999861,183.325747 L29.9999803,225.982439 L72.660005,215.983214 C110.077932,239.548522 158.307237,236.876754 192.892851,209.322653 C227.478464,181.768552 240.856271,135.358391 226.242944,93.6248278 C211.629616,51.8912646 172.221191,23.9617202 128.000037,23.9980665 Z" fill="currentColor"></path>
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="ok" data-icon="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-ok-icon">
				<g>
					<path fill="currentColor" d="M357.1,324.5c-24.1,15.3-57.2,21.4-79.1,23.6l18.4,18.1l67,67c24.5,25.1-15.4,64.4-40.2,40.2c-16.8-17-41.4-41.6-67-67.3
						l-67,67.2c-24.8,24.2-64.7-15.5-39.9-40.2c17-17,41.4-41.6,67-67l18.1-18.1c-21.6-2.3-55.3-8-79.6-23.6
						c-28.6-18.5-41.2-29.3-30.1-51.8c6.5-12.8,24.3-23.6,48-5c0,0,31.9,25.4,83.4,25.4s83.4-25.4,83.4-25.4c23.6-18.5,41.4-7.8,48,5
						C398.3,295.1,385.7,305.9,357.1,324.5L357.1,324.5z M142,145c0-63,51.2-114,114-114s114,51,114,114c0,62.7-51.2,113.7-114,113.7
						S142,207.7,142,145L142,145z M200,145c0,30.8,25.1,56,56,56s56-25.1,56-56c0-31.1-25.1-56.2-56-56.2S200,113.9,200,145z"/>
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="vk" data-icon="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 700" id="has-vk-icon">
				<g
					style="fill:none;fill-rule:evenodd"
					transform="translate(0,664)"
				>
					<path fill="currentColor" d="m 1073.3513,-606.40537 h 196.278 c 179.2103,0 221.8795,42.66915 221.8795,221.8795 v 196.27799 c 0,179.2103512 -42.6692,221.879451 -221.8795,221.879451 h -196.278 c -179.21038,0 -221.87951,-42.6691298 -221.87951,-221.879451 v -196.27801 c 0,-179.21035 42.66913,-221.87946 221.87951,-221.87948 z" />
					<path fill="currentColor" d="m 1375.0576,-393.98425 c 2.9513,-9.7072 0,-16.85429 -14.1342,-16.85429 h -46.6693 c -11.8763,0 -17.3521,6.16927 -20.3212,12.97854 0,0 -23.7347,56.82106 -57.3544,93.74763 -10.8806,10.66728 -15.8232,14.08081 -21.7613,14.08081 -2.969,0 -7.2715,-3.39577 -7.2715,-13.12075 v -90.83194 c 0,-11.66288 -3.4491,-16.85429 -13.3341,-16.85429 h -73.3553 c -7.4138,0 -11.8763,5.40476 -11.8763,10.54286 0,11.0406 16.8188,13.60078 18.5433,44.67814 v 67.52388 c 0,14.80973 -2.7202,17.49433 -8.6583,17.49433 -15.8231,0 -54.3143,-57.08773 -77.16,-122.40705 -4.4447,-12.71185 -8.9427,-17.83214 -20.8723,-17.83214 h -46.68718 c -13.3341,0 -16.0009,6.16925 -16.0009,12.97852 0,12.12515 15.8232,72.35973 73.69318,152.02656 38.58,54.40315 92.8942,83.89819 142.3726,83.89819 29.6729,0 33.3353,-6.54262 33.3353,-17.83216 v -41.12238 c 0,-13.10297 2.809,-15.71646 12.214,-15.71646 6.9338,0 18.7922,3.41353 46.4916,29.63728 31.6463,31.09512 36.8555,45.03372 54.6698,45.03372 h 46.6694 c 13.3341,0 20.0189,-6.54262 16.1787,-19.46781 -4.2313,-12.88962 -19.3433,-31.57515 -39.38,-53.74532 -10.8807,-12.62294 -27.2016,-26.22375 -32.1441,-33.03302 -6.9338,-8.72941 -4.9603,-12.62294 0,-20.39227 0,0 56.8566,-78.68897 62.7947,-105.41058 z" />
					<path fill="currentColor" d="m 567.69877,-429.06912 c 3.15618,-10.38133 0,-18.0247 -15.11579,-18.0247 h -49.91013 c -12.70096,0 -18.55706,6.59763 -21.73232,13.87977 0,0 -25.38286,60.76685 -61.33724,100.25768 -11.63627,11.40806 -16.92197,15.05863 -23.27242,15.05863 -3.17519,0 -7.77644,-3.63156 -7.77644,-14.0319 v -97.13948 c 0,-12.47278 -3.68869,-18.0247 -14.26014,-18.0247 h -78.44923 c -7.92857,0 -12.70097,5.78005 -12.70097,11.27491 0,11.80736 17.98666,14.54527 19.83094,47.78071 v 72.21293 c 0,15.83815 -2.9091,18.70918 -9.25948,18.70918 -16.92197,0 -58.08598,-61.05206 -82.51817,-130.90731 -4.75337,-13.59458 -9.56381,-19.07042 -22.32175,-19.07042 h -49.92915 c -14.26014,0 -17.11213,6.59763 -17.11213,13.87977 0,12.96714 16.92197,77.38454 78.81059,162.58363 41.25909,58.18101 99.34506,89.72424 152.25931,89.72424 31.73343,0 35.65018,-6.99691 35.65018,-19.07043 v -43.978 c 0,-14.01288 3.00405,-16.80786 13.0622,-16.80786 7.41521,0 20.09716,3.65057 49.71998,31.69536 33.84387,33.25443 39.41486,48.16093 58.46622,48.16093 h 49.91026 c 14.26,0 21.40913,-6.99691 17.30216,-20.81966 -4.5252,-13.78473 -20.68653,-33.76783 -42.11468,-57.47752 -11.63621,-13.49953 -29.09043,-28.04479 -34.37631,-35.32694 -7.41508,-9.33557 -5.30458,-13.4995 0,-21.80835 0,0 60.80491,-84.15334 67.15549,-112.73048 z" />
				</g>
			</symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="tumblr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="has-tumblr"><path fill="currentColor" d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"></path></symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" id="has-webshare-icon"><path fill="currentColor" d="M512 208L320 384H288V288H208c-61.9 0-112 50.1-112 112c0 48 32 80 32 80s-128-48-128-176c0-97.2 78.8-176 176-176H288V32h32L512 208z"/></symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" id="has-x"><path fill="currentColor" d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"></path></symbol>
			<symbol aria-hidden="true" data-prefix="fab" data-icon="mastodon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" id="has-mastodon"><path fill="currentColor" d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z"/></symbol>
		</svg>
		<div id="has-mastodon-prompt" aria-hidden="true" style="display: none">
			<h3><?php esc_html_e( 'Share on Mastodon', 'highlight-and-share' ); ?></h3>
			<div class="mastodon-input-prompt">
				<form class="has-mastodon-form">
					<label><span class="has-mastodon-label"><?php esc_html_e( 'Enter your Mastodon instance URL (optional)', 'highlight-and-share' ); ?></span><input type="text" placeholder="<?php esc_attr_e( 'https://mastodon.social', 'highlight-and-share' ); ?>" tabindex="0" /></label>
					
					<button id="has-mastodon-submit" tabindex="0" class="button button-primary"><?php esc_html_e( 'Share', 'highlight-and-share' ); ?></button>
				</form>
			</div>
		</div>
		<?php
	}

	/**
	 * Load plugin scripts and styles
	 *
	 * Enqueue scripts/styles and provide localization
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function add_scripts() {
		// Divi compatibility.
		if ( isset( $_GET['et_fb'] ) ) { // phpcs:ignore
			return;
		}
		// Beaver Builder compatibility.
		if ( isset( $_GET['fl_builder'] ) ) { // phpcs:ignore
				return;
		}
		// Elementor compatibility.
		if ( false !== strpos( $_SERVER['REQUEST_URI'], 'elementor' ) ) { // phpcs:ignore
			return;
		}
		$main_script_uri = Functions::get_plugin_url( 'dist/highlight-and-share.js' );
		wp_enqueue_script( 'highlight-and-share', $main_script_uri, array(), HIGHLIGHT_AND_SHARE_VERSION, true );
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'highlight-and-share', 'highlight-and-share' );
		}

		// Build JSON Objects.
		$settings = Options::get_plugin_options();
		$json_arr = array();

		// Facebook.
		$json_arr['show_facebook'] = (bool) apply_filters( 'has_show_facebook', $settings['show_facebook'] );
		$json_arr['show_twitter']  = (bool) apply_filters( 'has_show_twitter', $settings['show_twitter'] );
		$json_arr['show_linkedin'] = (bool) apply_filters( 'has_show_linkedin', $settings['show_linkedin'] );
		$json_arr['show_ok']       = (bool) apply_filters( 'has_show_ok', $settings['show_ok'] );
		$json_arr['show_vk']       = (bool) apply_filters( 'has_show_vk', $settings['show_vk'] );
		$json_arr['show_email']    = (bool) apply_filters( 'has_show_email', ( $settings['show_email'] ?? $settings['enable_emails'] ) );
		$json_arr['show_xing']     = (bool) apply_filters( 'has_show_xing', $settings['show_xing'] );
		$json_arr['show_copy']     = (bool) apply_filters( 'has_show_copy', $settings['show_copy'] );
		$json_arr['show_whatsapp'] = (bool) apply_filters( 'has_show_whatsapp', ( $settings['show_whatsapp'] ?? $settings['show_whats_app'] ) );
		$json_arr['show_telegram'] = (bool) apply_filters( 'has_show_telegram', $settings['show_telegram'] );
		$json_arr['show_mastodon'] = (bool) apply_filters( 'has_show_mastodon', $settings['show_mastodon'] );

		// Twitter Username.
		$json_arr['twitter_username'] = trim( sanitize_text_field( apply_filters( 'has_twitter_username', $settings['twitter'] ) ) );

		// Override the filter if no username is present for twitter.
		if ( empty( $json_arr['twitter_username'] ) ) {
			$json_arr['twitter_username'] = '';
		}

		// Check Webshare variables and add to JSON output.
		$json_arr['enable_webshare_inline_highlight'] = (bool) apply_filters( 'has_enable_webshare_inline_highlight', $settings['enable_webshare_inline_highlight'] );
		$json_arr['enable_webshare_click_to_share']   = (bool) apply_filters( 'has_enable_webshare_click_to_share', $settings['enable_webshare_click_to_share'] );

		// Check if in legacy mode.
		$json_arr['content_legacy_mode'] = $this->is_legacy_content_loop_markup();

		// Add mobile.
		if ( wp_is_mobile() ) {
			$json_arr['mobile'] = true;
		} else {
			$json_arr['mobile'] = false;
		}

		$regex_style_elements = '/([.#])/';
		$js_selector_string   = '';

		/**
		 * Filter: has_js_classes
		 *
		 * Comman-separated CSS classes (without the .) that Highlight and Share should be enabled on.
		 *
		 * @param string Comma-separated CSS classes
		 */
		$classes = apply_filters( 'has_js_classes', $settings['js_content'] ); // Pass comma separated values (e.g., entry-content,type-post,type-page).
		$classes = explode( ',', $classes );
		$classes = preg_replace( $regex_style_elements, '', $classes );
		foreach ( $classes as $index => &$string ) {
			$string = trim( $string ); // Trim.
			if ( empty( $string ) ) {
				unset( $classes[ $index ] ); // Remove empty values.
				continue;
			}
			$string = trim( esc_js( '.' . $string ) ); // Get in class format (.%s) and trim just in case.
		}

		/**
		 * Filter: has_js_ids
		 *
		 * Comman-separated CSS IDs (without the #) that Highlight and Share should be enabled on.
		 *
		 * @param string Comma-separated CSS IDs
		 */
		$ids = apply_filters( 'has_js_ids', $settings['id_content'] ); // Pass array of jQuery ID elements (without the #).
		$ids = explode( ',', $ids );
		$ids = preg_replace( $regex_style_elements, '', $ids );
		foreach ( $ids as $index => &$string ) {
			$string = trim( $string ); // Trim.
			if ( empty( $string ) ) {
				unset( $ids[ $index ] ); // Remove empty values.
				continue;
			}
			$string = trim( esc_js( '#' . $string ) ); // Get in class format (.%s) and trim just in case.
		}

		$elements = apply_filters( 'has_js_elements', $settings['element_content'] ); // Pass array of jQuery HTML elements (e.g., blockquote, article).
		$elements = explode( ',', $elements );
		$elements = preg_replace( $regex_style_elements, '', $elements );
		foreach ( $elements as $index => &$string ) {
			$string = trim( $string ); // Trim.
			if ( empty( $string ) ) {
				unset( $elements[ $index ] ); // Remove empty values.
				continue;
			}
			$string = trim( esc_js( $string ) ); // Get in class format (.%s) and trim just in case.
		}

		// Populate/Add content items.
		if ( apply_filters( 'has_enable_content', (bool) $settings['enable_content'] ) ) {
			$classes[] = '.has-content-area';
		}
		if ( apply_filters( 'has_enable_excerpt', (bool) $settings['enable_excerpt'] ) ) {
			$classes[] = '.has-excerpt-area';
		}

		// Merge the content together.
		$js_selector_string = implode( ',', array_merge( $classes, $ids, $elements ) );

		/**
		 * Filter: has_js_selectors
		 *
		 * Modify all the selectors (classes, ids, elements) that are used for Highlight and Share.
		 *
		 * @param string          Comma-separated CSS IDs, classes and HTML elements.
		 * @param array $classes  Array with CSS classes (with the .).
		 * @param array $ids      Array with CSS IDs (with the #).
		 * @param array $elements Array with HTML elements.
		 */
		$json_arr['content'] = apply_filters( 'has_js_selectors', $js_selector_string, $classes, $ids, $elements );

		/**
		 * Filter: has_twitter_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Tweet
		 */
		$json_arr['tweet_text'] = apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_facebook_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Share
		 */
		$json_arr['facebook_text'] = apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_linkedin_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: LinkedIn
		 */
		$json_arr['linkedin_text'] = apply_filters( 'has_linkedin_text', _x( 'LinkedIn', 'LinkedIn share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_ok_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Odnoklassniki
		 */
		$json_arr['ok_text'] = apply_filters( 'has_ok_text', _x( 'Odnoklassniki', 'Odnoklassniki share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_vk_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: VKontakte
		 */
		$json_arr['vk_text'] = apply_filters( 'has_vk_text', _x( 'VKontakte', 'VKontakte share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_mastodon_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Mastodon
		 */
		$json_arr['mastodon_text'] = apply_filters( 'has_mastodon_text', _x( 'Mastodon', 'Mastodon share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_whatsapp_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: WhatsApp
		 */
		$json_arr['whatsapp_text'] = apply_filters( 'has_whatsapp_text', _x( 'WhatsApp', 'WhatsApp share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_xing_text
		 *
		 * Modify the social network name on the frontend.
		 *
		 * @param string Default: Xing
		 */
		$json_arr['xing_text'] = apply_filters( 'has_xing_text', _x( 'Xing', 'Xing share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_copy_text
		 *
		 * Modify the Copy label on the frontend.
		 *
		 * @param string Default: Copy
		 */
		$json_arr['copy_text'] = apply_filters( 'has_copy_text', _x( 'Copy', 'Copy share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_email_text
		 *
		 * Modify the Email label on the frontend.
		 *
		 * @param string Default: E-mail
		 */
		$json_arr['email_text'] = apply_filters( 'has_email_text', _x( 'E-mail', 'E-mail share text', 'highlight-and-share' ) );

		/**
		 * Filter: has_webshare_text
		 *
		 * Modify the Webshare text on the frontend.
		 *
		 * @param string Default: Share
		 */
		$json_arr['webshare_text'] = apply_filters( 'has_webshare_text', _x( 'Share', 'Webshare share text', 'highlight-and-share' ) );

		// Load prefix and suffix (before/after text).
		$json_arr['prefix'] = isset( $settings['sharing_prefix'] ) ? stripslashes_deep( sanitize_text_field( $settings['sharing_prefix'] ) ) : '';
		$json_arr['suffix'] = isset( $settings['sharing_suffix'] ) ? stripslashes_deep( sanitize_text_field( $settings['sharing_suffix'] ) ) : '';

		// Get highlight tooltip options.
		$block_editor_options = Options::get_block_editor_options();
		if ( (bool) $block_editor_options['inline_highlight_show_tooltips'] ) {
			$json_arr['inline_highlight_tooltips_enabled'] = true;
			$json_arr['inline_highlight_tooltips_text']    = $block_editor_options['inline_highlight_tooltips_text'];
		} else {
			$json_arr['inline_highlight_tooltips_enabled'] = false;
			$json_arr['inline_highlight_tooltips_text']    = '';
		}

		// Localize.
		wp_localize_script( 'highlight-and-share', 'highlight_and_share', $json_arr );

		/**
		 * Filter: has_load_css
		 *
		 * Whether to load Highlight and Share CSS.
		 *
		 * @param bool true for allowing CSS, false if not.
		 */
		if ( apply_filters( 'has_load_css', true ) && 'off' !== $settings['theme'] ) {

			// Add styles that don't need to be in the header or rendered above the fold.
			add_action( 'wp_footer', array( $this, 'output_footer_css' ), 1 );

			// Classes needed for CSS.
			add_filter( 'body_class', array( $this, 'add_body_class' ), 10, 2 );

			// Let's see if inline highlight tooltips are enabled.
			if ( (bool) $block_editor_options['inline_highlight_show_tooltips'] ) {
				// Load dummy stylesheet.
				wp_register_style( 'has-inline-highlight-tooltips', false );
				$inline_highlight_styles = ':root { --has-inline-highlight-tooltips-color: ' . esc_html( $block_editor_options['inline_highlight_tooltips_text_color'] ) . '; --has-inline-highlight-tooltips-background-color: ' . esc_html( $block_editor_options['inline_highlight_tooltips_background_color'] ) . '; }';
				// Add inline styles.
				wp_add_inline_style(
					'has-inline-highlight-tooltips',
					$inline_highlight_styles
				);
				wp_enqueue_style( 'has-inline-highlight-tooltips' );
			}

			// Output remaining inline styles.
			if ( true !== $this->is_legacy_content_loop_markup() ) { // Remove inline styles if legacy markup is enabled so we don't hide the wrong div.
				// Hide the placeholder div.
				wp_register_style( 'has-inline-styles', false );
				$inline_styles = '.has-social-placeholder {display: none;height: 0;width: 0;overflow: hidden;}' . Themes::get_inline_highlight_css();
				// Add inline styles.
				wp_add_inline_style(
					'has-inline-styles',
					$inline_styles
				);
				wp_enqueue_style( 'has-inline-styles' );
			}
		}
	}

	/**
	 * Output stylesheets in the footer that do not need to be loaded in the head.
	 *
	 * Enqueue styles
	 *
	 * @since 5.0.0
	 * @access public
	 *
	 * @see add_scripts
	 */
	public function output_footer_css() {
		wp_register_style(
			'highlight-and-share',
			Functions::get_plugin_url( 'dist/has-themes.css' ),
			array(),
			HIGHLIGHT_AND_SHARE_VERSION,
			'all'
		);
		wp_print_styles( 'highlight-and-share' );
	}

	/**
	 * Add a body class for styling.
	 *
	 * @since 3.2.11
	 *
	 * @param array $classes Array of class names.
	 * @param array $class   Array of additional classnaes added to the body.
	 *
	 * @return array Updated classnames.
	 */
	public function add_body_class( $classes, $class ) {
		$classes[] = 'has-body';
		return $classes;
	}
}
