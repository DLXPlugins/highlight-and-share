<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Admin
 */
class Admin {

	/**
	 * Class runner.
	 */
	public function run() {
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'init_admin_settings' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ) );
		// Plugin settings.
		add_filter( 'plugin_action_links_' . plugin_basename( Functions::get_plugin_file() ), array( $this, 'add_settings_link' ) );
	}

	/**
	 * Initialize options page
	 *
	 * Create plugin options page and callback
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function add_admin_menu() {
		add_options_page( _x( 'Highlight and Share', 'Plugin Name - Settings Page Title', 'highlight-and-share' ), _x( 'Highlight and Share', 'Plugin Name - Menu Item', 'highlight-and-share' ), 'manage_options', 'highlight-and-share', array( $this, 'options_page' ) );
	}

	/**
	 * Output options page HTML.
	 *
	 * Output option page HTML and fields/sections.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see add_admin_menu
	 */
	public function options_page() {
		?>
		<div class="has-form-wrapper">
			<header>
				<div class="has-admin-container-wrap">
					<div class="has-logo-wrapper">
						<h2 id="has-logo" style="display: flex; align-items: center;"><img 
						width="450" height="113" src="<?php echo esc_url( Functions::get_plugin_url( '/img/plugin-logo-horizontal.png' ) ); ?>" alt="Higlight and Share" /></h2>
					</div>
					<div class="header__btn-wrap">
						<a class=" has__btn-primary" href="https://has.dlxplugins.com"><i class="dashicons dashicons-media-document"></i> <?php esc_html_e( 'Documentation', 'highlight-and-share' ); ?></a>
						<a class=" has__btn-primary" href="https://dlxplugins.com/support/"><i class="dashicons dashicons-groups"></i> <?php esc_html_e( 'Support', 'highlight-and-share' ); ?></a>
					</div>
				</div>
			</header>
			<?php
			$current_tab = Functions::get_admin_tab();
			$settings_tab_class = array( 'nav-tab' );
			if ( null === $current_tab || 'settings' === $current_tab ) {
				$settings_tab_class[] = 'nav-tab-active';
			}
			$theme_tab_class = array( 'nav-tab' );
			if ( 'theme' === $current_tab ) {
				$theme_tab_class[] = 'nav-tab-active';
			}
?>


			<div class="has-admin-container-body-wrapper">
				<div class="has-admin-container-body">
					<nav class="nav-tab-wrapper">
						<a class="<?php echo esc_attr( implode( ' ', $settings_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url( 'settings' ) ); ?>"><?php esc_html_e( 'Settings', 'highlight-and-share' ); ?></a>
						<a class="<?php echo esc_attr( implode( ' ', $theme_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url( 'theme' ) ); ?>"><?php esc_html_e( 'Theme', 'highlight-and-share' ); ?></a>
					</nav>
					<div class="has-admin-container-body__content">
						<?php
						if ( null === $current_tab || 'settings' === $current_tab ) {
							?>
							<form action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>" method="POST">
							<?php settings_fields( 'highlight-and-share' ); ?>
							<?php do_settings_sections( 'highlight-and-share' ); ?>
							<?php submit_button(); ?>
							</form>
							<?php
						} elseif ( 'theme' === $current_tab ) {
							?>
							<div id="has-theme-admin-settings"></div>
							<?php
						}
						?>
				</div>
			</div>
			<div class="has-admin-container-footer">
				<footer>
					<div class="has-admin-container-wrap">
						<div class="footer-rate-icon" aria-hidden="true"><img 
							width="100" height="90" src="<?php echo esc_url( Functions::get_plugin_url( '/img/heart.png' ) ); ?>" /></div>
						<a class="has__btn-primary" href="https://wordpress.org/support/plugin/highlight-and-share/reviews/" target="_blank"><i ></i> <?php esc_html_e( 'Please Rate Highlight and Share', 'highlight-and-share' ); ?></a>
						<div class="has-plea"><?php esc_html_e( 'It really helps.', 'highlight-and-share' ); ?></div>
					</div>
				</footer>
			</div>
		</div>
		<?php
	}

	/**
	 * Enqueue the HAS admin stylesheet.
	 *
	 * @param string $hook The hook for the settings page admin menu.
	 */
	public function enqueue_admin_scripts( $hook ) {
		if ( 'settings_page_highlight-and-share' === $hook ) {
			wp_enqueue_style(
				'has-admin',
				Functions::get_plugin_url( '/dist/has-admin.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);
			wp_enqueue_style(
				'has-admin-css',
				Functions::get_plugin_url( '/dist/has-admin-style.css' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				'all'
			);

			wp_enqueue_script(
				'has-admin-js',
				Functions::get_plugin_url( '/dist/has-admin.js' ),
				array(),
				HIGHLIGHT_AND_SHARE_VERSION,
				true
			);
		}
	}

	/**
	 * Retrieve Theme Preview Html. HTML compatible with Photoswipe script.
	 *
	 * $see https://photoswipe.com/
	 */
	public static function output_main_themes_admin_html() {
		$themes = Themes::get_main_themes();

		// Need image dimensions for Photoswipe:  https://photoswipe.com/.
		$preview_dimensions = array(
			'brand'         => array(
				'width'  => 864,
				'height' => 384,
			),
			'black'         => array(
				'width'  => 838,
				'height' => 342,
			),
			'blue'          => array(
				'width'  => 838,
				'height' => 342,
			),
			'circle-glass'  => array(
				'width'  => 944,
				'height' => 382,
			),
			'color-circles' => array(
				'width'  => 1054,
				'height' => 368,
			),
			'color-circles' => array(
				'width'  => 1054,
				'height' => 368,
			),
			'default'       => array(
				'width'  => 2378,
				'height' => 654,
			),
			'green'         => array(
				'width'  => 822,
				'height' => 294,
			),
			'cyan'          => array(
				'width'  => 848,
				'height' => 320,
			),
			'magenta'       => array(
				'width'  => 830,
				'height' => 318,
			),
			'purple'        => array(
				'width'  => 868,
				'height' => 346,
			),
			'white'         => array(
				'width'  => 868,
				'height' => 350,
			),
		);

		foreach ( $themes as $slug => $label ) {
			$dimensions = $preview_dimensions[ $slug ] ?? array();

			if ( empty( $dimensions ) ) {
				continue;
			}

			add_filter( 'safe_style_css', array( '\DLXPlugins\HAS\Functions', 'safe_css' ) );

			$allowed_html = wp_kses_allowed_html( 'post' );

			echo wp_kses(
				sprintf(
					'<li><a class="has-gallery-image" href="%1$s" data-pswp-width="%2$s" data-pswp-height="%3$s"><img src="%1$s" style="display: none" />%4$s</a><div style="display: none" class="pswp-caption-content" aria-hidden="true">%4$s</div></li>',
					esc_url( Functions::get_plugin_url( '/img/screenshot-' . $slug . '.png' ) ),
					esc_attr( $preview_dimensions[ $slug ]['width'] ),
					esc_attr( $preview_dimensions[ $slug ]['height'] ),
					esc_html( $label ),
				),
				$allowed_html
			);
			remove_filter( 'safe_style_css', array( '\DLXPlugins\HAS\Functions', 'safe_css' ) );
		}
	}

	/**
	 * Add a settings link to the plugin's options.
	 *
	 * Add a settings link on the WordPress plugin's page.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @param array $links Array of plugin options.
	 * @return array $links Array of plugin options
	 */
	public function add_settings_link( $links ) {
		$settings_link = sprintf( '<a href="%s">%s</a>', esc_url( admin_url( 'options-general.php?page=highlight-and-share' ) ), _x( 'Settings', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
		$docs_link     = sprintf( '<a href="%s">%s</a>', esc_url( 'https://has.dlxplugins.com' ), _x( 'Documentation', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );
		$has_landing   = sprintf( '<a href="%s">%s</a>', esc_url( 'https://dlxplugins.com/plugins/highlight-and-share/' ), _x( 'Visit Highlight and Share', 'Plugin settings link on the plugins page', 'highlight-and-share' ) );

		array_unshift( $links, $has_landing );
		array_unshift( $links, $docs_link );
		array_unshift( $links, $settings_link );
		return $links;
	}

	/**
	 * Initialize options
	 *
	 * Initialize page settings, fields, and sections and their callbacks
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 */
	public function init_admin_settings() {
		register_setting(
			'highlight-and-share',
			'highlight-and-share',
			array( $this, 'sanitization' )
		);
		add_settings_section(
			'has-display',
			_x( 'Display', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);
		add_settings_section(
			'has-config',
			_x( 'Content', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-text',
			_x( 'Text Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-twitter',
			_x( 'Twitter Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-facebook',
			_x( 'Facebook Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-whatsapp',
			_x( 'WhatsApp Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-social',
			_x( 'Social Sharing Services', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-shortlink',
			_x( 'Post URL Settings', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_section(
			'has-advanced',
			_x( 'Advanced', 'plugin settings heading', 'highlight-and-share' ),
			array( $this, 'settings_section' ),
			'highlight-and-share'
		);

		add_settings_field(
			'hightlight-and-share-display-enable',
			__( 'Show Icons Only', 'highlight-and-share' ),
			array( $this, 'add_settings_field_display_enable' ),
			'highlight-and-share',
			'has-display',
			array(
				'desc' => __( 'Show icons only. Recommended if you choose more than two options to show.', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-display-theme',
			__( 'Choose Theme', 'highlight-and-share' ),
			array( $this, 'add_settings_field_display_theme' ),
			'highlight-and-share',
			'has-display',
			array(
				'desc' => __( 'Choose a theme to display on the front-end. Some themes require Show Icons Only to be enabled.', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-mobile-enable',
			__( 'Show on Mobile', 'highlight-and-share' ),
			array( $this, 'add_settings_field_mobile_enable' ),
			'highlight-and-share',
			'has-config',
			array(
				'desc' => __( 'Would you like to show on mobile?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-text-prefix',
			__( 'Sharing Text Before', 'highlight-and-share' ),
			array( $this, 'add_settings_field_prefix' ),
			'highlight-and-share',
			'has-text',
			array(
				'desc'      => __( 'Choose a prefix to go before the sharing text such as a quote.', 'highlight-and-share' ),
				'label_for' => 'hightlight-and-share-prefix',
			)
		);

		add_settings_field(
			'hightlight-and-share-text-suffix',
			__( 'Sharing Text After', 'highlight-and-share' ),
			array( $this, 'add_settings_field_suffix' ),
			'highlight-and-share',
			'has-text',
			array(
				'desc'      => __( 'Choose a suffix to go after the sharing text such as a quote.', 'highlight-and-share' ),
				'label_for' => 'hightlight-and-share-suffix',
			)
		);

		add_settings_field(
			'hightlight-and-share-content-enable',
			__( 'Add to Post Content', 'highlight-and-share' ),
			array( $this, 'add_settings_field_content_enable' ),
			'highlight-and-share',
			'has-config',
			array(
				'desc' => __( 'Would you like to add sharing to the main content areas?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-excerpt-enable',
			__( 'Add to Excerpt Content', 'highlight-and-share' ),
			array( $this, 'add_settings_field_excerpt_enable' ),
			'highlight-and-share',
			'has-config',
			array(
				'desc' => __( 'Would you like to add sharing to the excerpts?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-twitter-enable',
			__( 'Show Twitter Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_twitter_enable' ),
			'highlight-and-share',
			'has-twitter',
			array(
				'desc' => __( 'Would you like to enable sharing via Twitter?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-reddit-enable',
			__( 'Show Reddit Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_reddit_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via Reddit?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-telegram-enable',
			__( 'Show Telegram Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_telegram_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via Telegram?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-linkedin-enable',
			__( 'Show LinkedIn Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_linkedin_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via LinkedIn?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-whatsapp-enable',
			__( 'Show WhatsApp Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_whatsapp_enable' ),
			'highlight-and-share',
			'has-whatsapp',
			array(
				'desc' => __( 'Would you like to enable sharing via WhatsApp?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-whatsapp-url-endpoint',
			__( 'WhatsApp Endpoint', 'highlight-and-share' ),
			array( $this, 'add_settings_field_whatsapp_endpoint' ),
			'highlight-and-share',
			'has-whatsapp',
			array(
				'desc' => __( 'Choose a WhatsApp endpoint', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-xing-enable',
			__( 'Show Xing Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_xing_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via Xing?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-copy-enable',
			__( 'Show Copy Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_copy_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via copying?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-email-enable',
			__( 'Show E-mail Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_email_enable' ),
			'highlight-and-share',
			'has-social',
			array(
				'desc' => __( 'Would you like to enable sharing via E-mail?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-twitter-handle',
			__( 'Twitter Username', 'highlight-and-share' ),
			array( $this, 'add_settings_field_twitter' ),
			'highlight-and-share',
			'has-twitter',
			array(
				'label_for' => 'hightlight-and-share-twitter-handle',
				'desc'      => __( 'Enter Your Twitter Username', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-twitter-hashtags',
			__( 'Twitter Hashtags', 'highlight-and-share' ),
			array( $this, 'add_settings_field_twitter_hashtags' ),
			'highlight-and-share',
			'has-twitter',
			array(
				'label_for' => 'hightlight-and-share-twitter-hashtags',
				'desc'      => __( 'Enable Twitter Hashtags', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-facebook-enable',
			__( 'Show Facebook Option', 'highlight-and-share' ),
			array( $this, 'add_settings_field_facebook_enable' ),
			'highlight-and-share',
			'has-facebook',
			array(
				'desc' => __( 'Would you like to enable sharing via Facebook?', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-shortlink-enable',
			__( 'Shortlinks', 'highlight-and-share' ),
			array( $this, 'add_settings_field_shortlink_enable' ),
			'highlight-and-share',
			'has-shortlink',
			array(
				'desc' => __( 'Please decide if you would like to use the default post URL or a shortened version.', 'highlight-and-share' ),
			)
		);

		add_settings_field(
			'hightlight-and-share-js-content',
			_x( 'jQuery classes', 'Label - Where in the HTML document to search for text to capture', 'highlight-and-share' ),
			array( $this, 'add_settings_field_js_content' ),
			'highlight-and-share',
			'has-advanced',
			array(
				'label_for' => 'hightlight-and-share-js-content',
				'desc'      => __( 'Enter jQuery classes to search for in the HTML.  You must comma-separate classes (e.g., entry-content,post,page).', 'highlight-and-share' ),
			)
		);
	}

	/**
	 * Sanitize options before they are saved.
	 *
	 * Sanitize and prepare error messages when saving options.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $input Input array to sanitize.
	 *
	 * @return array Sanitized array of options
	 */
	public function sanitization( $input = array() ) {
		$output = get_option( 'highlight-and-share' );

		// Check if settings are being initialized for the first time.
		if ( false === $output ) {
			// No settings have been saved yet and we're being supplied with defaults.
			foreach ( $input as $key => &$value ) {
				if ( is_bool( $value ) ) {
					continue;
				}
				$value = sanitize_text_field( $value );
			}
			return $input;
		}
		// Settings are being saved.  Update.
		foreach ( $input as $key => $value ) {
			switch ( $key ) {
				case 'twitter':
					$twitter_username = trim( $value );
					if ( empty( $twitter_username ) ) {
						$output[ $key ] = '';
					} elseif ( ! preg_match( '/^[a-zA-Z0-9_]{1,15}$/', $twitter_username ) ) {
						add_settings_error( 'highlight-and-share', 'invalid_twitter', _x( 'You have entered an incorrect Twitter username', 'Twitter username error', 'highlight-and-share' ) );
					} else {
						$output[ $key ] = sanitize_text_field( $value );
					}
					break;
				case 'facebook_app_id':
					$app_id = sanitize_text_field( $value );

					if ( empty( $app_id ) || 0 === $app_id ) {
						$output[ $key ] = '';
					} else {
						$output[ $key ] = $app_id;
					}
					break;
				case 'js_content':
					$js_content = trim( $value );
					if ( empty( $js_content ) || preg_match( '/[-_0-9a-zA-Z]+(,[-_0-9a-zA-Z]+)*$/', $js_content ) ) {
						$output[ $key ] = sanitize_text_field( $js_content );
					} else {
						add_settings_error( 'highlight-and-share', 'invalid_twitter', _x( 'You must enter valid comma-separated values for the content.', 'Invalid comma-separated values', 'highlight-and-share' ) );
					}
					break;
				case 'theme':
					$output[ $key ] = sanitize_text_field( $value );
					break;
				case 'twitter_fa_class':
				case 'facebook_fa_class':
				case 'linkedin_fa_class':
				case 'ok_fa_class':
				case 'xing_fa_class':
				case 'whatsapp_fa_class':
				case 'email_fa_class':
				case 'copy_fa_class':
				case 'whatsapp_api_endpoint':
					$output[ $key ] = sanitize_text_field( $value );
					break;
				case 'show_twitter':
				case 'show_facebook':
				case 'enable_mobile':
				case 'enable_content':
				case 'enable_excerpt':
				case 'shortlinks':
				case 'icons':
				case 'show_email':
				case 'show_xing':
				case 'show_whatsapp':
				case 'show_linkedin':
				case 'show_ok':
				case 'show_vk':
				case 'show_telegram':
				case 'show_signal':
				case 'show_reddit':
				case 'show_copy':
				case 'enable_hashtags':
					if ( 'on' === $input[ $key ] ) {
						$output[ $key ] = true;
					} else {
						$output[ $key ] = false;
					}
					break;
				case 'sharing_prefix':
				case 'sharing_suffix':
					$output[ $key ] = sanitize_text_field( $value );
					break;
			}
		}
		return $output;
	}

	/**
	 * Output settings HTML
	 *
	 * Output any HTML required to go into a settings section
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 */
	public function settings_section() {
	}

	/**
	 * Add JavaScript content setting.
	 *
	 * Output text input HTML for JavaScript content classes.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args JS Arguments.
	 */
	public function add_settings_field_js_content( $args = array() ) {
		$settings   = Options::get_plugin_options();
		$js_content = isset( $settings['js_content'] ) ? $settings['js_content'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[js_content]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $js_content ) );
	}

	/**
	 * Add Twitter username setting.
	 *
	 * Output text input HTML for the Twitter username.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_twitter( $args = array() ) {
		$settings   = Options::get_plugin_options();
		$js_content = isset( $settings['twitter'] ) ? $settings['twitter'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[twitter]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $js_content ) );
	}

	/**
	 * Add a prefix to the sharing text.
	 *
	 * Output text input HTML for the sharing prefix.
	 *
	 * @since 3.4.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_prefix( $args = array() ) {
		$settings = Options::get_plugin_options();
		$prefix   = isset( $settings['sharing_prefix'] ) ? $settings['sharing_prefix'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[sharing_prefix]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $prefix ) );
	}

	/**
	 * Add a suffix to the sharing text.
	 *
	 * Output text input HTML for the sharing suffix.
	 *
	 * @since 3.4.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_suffix( $args = array() ) {
		$settings = Options::get_plugin_options();
		$suffix   = isset( $settings['sharing_suffix'] ) ? $settings['sharing_suffix'] : '';
		printf( '<p>%s</p>', esc_html( $args['desc'] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[sharing_suffix]" value="%s" />', esc_attr( $args['label_for'] ), esc_attr( $suffix ) );
	}

	/**
	 * Option for displaying icons only
	 *
	 * Output icons only
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_display_enable( $args = array() ) {
		$settings     = Options::get_plugin_options();
		$enable_icons = isset( $settings['icons'] ) ? (bool) $settings['icons'] : false;
		echo '<input name="highlight-and-share[icons]" value="off" type="hidden" />';
		printf( '<input id="has-show-icons" type="checkbox" name="highlight-and-share[icons]" value="on" %s />&nbsp;<label for="has-show-icons">%s</label>', checked( true, $enable_icons, false ), esc_html__( 'Enable Icons Only?', 'highlight-and-share' ) );
	}

	/**
	 * Option for displaying a theme
	 *
	 * Option for displaying a theme
	 *
	 * @since 2.3.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_display_theme( $args = array() ) {
		$settings = Options::get_plugin_options();
		$theme    = isset( $settings['theme'] ) ? $settings['theme'] : 'default';
		$themes   = Themes::get_main_themes();
		?>
		<select name="highlight-and-share[theme]">
			<?php
			foreach ( $themes as $slug => $label ) :
				?>
				<option value="<?php echo esc_attr( $slug ); ?>" <?php selected( $theme, $slug, true ); ?>><?php echo esc_html( $label ); ?></option>
				<?php
			endforeach;
			?>
		</select>
		<?php
		printf( '<div><em></em></div>', esc_html( $args['desc'] ) );
		?>
		<h4><?php esc_html_e( 'Preview', 'highlight-and-share' ); ?></h4>
		<ul class="has-admin-preview">
			<?php Admin::output_main_themes_admin_html(); ?>
		</ul>
		<?php
	}

	/**
	 * Add Twitter option for sharing.
	 *
	 * Output checkbox for displaying Twitter sharing.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_twitter_enable( $args = array() ) {
		$settings       = Options::get_plugin_options();
		$enable_twitter = isset( $settings['show_twitter'] ) ? (bool) $settings['show_twitter'] : true;
		echo '<input name="highlight-and-share[show_twitter]" value="off" type="hidden" />';
		printf( '<input id="has-show-twitter" type="checkbox" name="highlight-and-share[show_twitter]" value="on" %s />&nbsp;<label for="has-show-twitter">%s</label>', checked( true, $enable_twitter, false ), esc_html__( 'Enable Twitter Sharing?', 'highlight-and-share' ) );
		?>
		<p class="description"><?php esc_html_e( 'Twitter allows text sharing.', 'highlight-and-share' ); ?></p>
		<?php
	}

	/**
	 * Add LinkedIn Option for Sharing
	 *
	 * Output checkbox for displaying LinkedIn sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_linkedin_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$linkedin = isset( $settings['show_linkedin'] ) ? (bool) $settings['show_linkedin'] : true;
		echo '<input name="highlight-and-share[show_linkedin]" value="off" type="hidden" />';
		printf( '<input id="has-show-linkedin" type="checkbox" name="highlight-and-share[show_linkedin]" value="on" %s />&nbsp;<label for="has-show-linkedin">%s</label>', checked( true, $linkedin, false ), esc_html__( 'Enable LinkedIn Sharing?', 'highlight-and-share' ) );
		?>
		<p class="description"><?php esc_html_e( 'LinkedIn only allows URL sharing.', 'highlight-and-share' ); ?></p>
		<?php
	}

	/**
	 * Add VKontakte Option for Sharing
	 *
	 * Output checkbox for displaying VKontakte sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_vk_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$vk       = isset( $settings['show_vk'] ) ? (bool) $settings['show_vk'] : true;
		echo '<input name="highlight-and-share[show_vk]" value="off" type="hidden" />';
		printf( '<input id="has-show-vk" type="checkbox" name="highlight-and-share[show_vk]" value="on" %s />&nbsp;<label for="has-show-vk">%s</label>', checked( true, $vk, false ), esc_html__( 'Enable VKontakte Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Odnoklassniki Option for Sharing
	 *
	 * Output checkbox for displaying Odnoklassniki sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_ok_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$linkedin = isset( $settings['show_ok'] ) ? (bool) $settings['show_ok'] : true;
		echo '<input name="highlight-and-share[show_ok]" value="off" type="hidden" />';
		printf( '<input id="has-show-ok" type="checkbox" name="highlight-and-share[show_ok]" value="on" %s />&nbsp;<label for="has-show-ok">%s</label>', checked( true, $linkedin, false ), esc_html__( 'Enable Odnoklassniki (Однокла́ссники) Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Reddit Option for Sharing
	 *
	 * Output checkbox for displaying Reddit sharing.
	 *
	 * @since 3.3.5
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_reddit_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$reddit   = isset( $settings['show_reddit'] ) ? (bool) $settings['show_reddit'] : false;
		echo '<input name="highlight-and-share[show_reddit]" value="off" type="hidden" />';
		printf( '<input id="has-show-reddit" type="checkbox" name="highlight-and-share[show_reddit]" value="on" %s />&nbsp;<label for="has-show-reddit">%s</label>', checked( true, $reddit, false ), esc_html__( 'Enable Reddit Sharing?', 'highlight-and-share' ) );
		?>
		<p class="description"><?php esc_html_e( 'Reddit only allows URL sharing.', 'highlight-and-share' ); ?></p>
		<?php
	}

	/**
	 * Add Telegram Option for Sharing
	 *
	 * Output checkbox for displaying Telegram sharing.
	 *
	 * @since 3.3.5
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_telegram_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$telegram = isset( $settings['show_telegram'] ) ? (bool) $settings['show_telegram'] : false;
		echo '<input name="highlight-and-share[show_telegram]" value="off" type="hidden" />';
		printf( '<input id="has-show-telegram" type="checkbox" name="highlight-and-share[show_telegram]" value="on" %s />&nbsp;<label for="has-show-telegram">%s</label>', checked( true, $telegram, false ), esc_html__( 'Enable Telegram Sharing?', 'highlight-and-share' ) );
		?>
		<p class="description"><?php esc_html_e( 'Telegram allows text sharing.', 'highlight-and-share' ); ?></p>
		<?php
	}

	/**
	 * Add Xing Option for Sharing
	 *
	 * Output checkbox for displaying Xing sharing.
	 *
	 * @since 2.2.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_xing_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$xing     = isset( $settings['show_xing'] ) ? (bool) $settings['show_xing'] : true;
		echo '<input name="highlight-and-share[show_xing]" value="off" type="hidden" />';
		printf( '<input id="has-show-xing" type="checkbox" name="highlight-and-share[show_xing]" value="on" %s />&nbsp;<label for="has-show-xing">%s</label>', checked( true, $xing, false ), esc_html__( 'Enable Xing Sharing?', 'highlight-and-share' ) );
		?>
		<p class="description"><?php esc_html_e( 'Xing only allows URL sharing.', 'highlight-and-share' ); ?></p>
		<?php
	}

	/**
	 * Add WhatsApp Option for Sharing
	 *
	 * Output checkbox for displaying WhatsApp sharing.
	 *
	 * @since 2.2.2
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_whatsapp_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$whatsapp = isset( $settings['show_whatsapp'] ) ? (bool) $settings['show_whatsapp'] : true;
		echo '<input name="highlight-and-share[show_whatsapp]" value="off" type="hidden" />';
		printf( '<input id="has-show-whatsapp" type="checkbox" name="highlight-and-share[show_whatsapp]" value="on" %s />&nbsp;<label for="has-show-whatsapp">%s</label>', checked( true, $whatsapp, false ), esc_html__( 'Enable WhatsApp Sharing?', 'highlight-and-share' ) );
		?>
		<p class="description"><?php esc_html_e( 'WhatsApp allows text sharing.', 'highlight-and-share' ); ?></p>
		<?php
	}

	/**
	 * Add WhatsApp Option for Sharing
	 *
	 * Output checkbox for displaying WhatsApp sharing.
	 *
	 * @since 3.6.5
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_whatsapp_endpoint( $args = array() ) {
		$settings = Options::get_plugin_options();
		$whatsapp = isset( $settings['whatsapp_api_endpoint'] ) ? $settings['whatsapp_api_endpoint'] : 'app'; // Can also we 'web'.
		printf( '<input id="has-show-whatsapp-web" type="radio" name="highlight-and-share[whatsapp_api_endpoint]" value="web" %s />&nbsp;<label for="has-show-whatsapp-web">%s</label>', checked( 'web', $whatsapp, false ), esc_html__( 'Use the WhatsApp Web Endpoint', 'highlight-and-share' ) );
		echo '<br />';
		printf( '<input id="has-show-whatsapp-app" type="radio" name="highlight-and-share[whatsapp_api_endpoint]" value="app" %s />&nbsp;<label for="has-show-whatsapp-app">%s</label>', checked( 'app', $whatsapp, false ), esc_html__( 'Use the WhatsApp App Endpoint', 'highlight-and-share' ) );
	}

	/**
	 * Add E-mail Option for Sharing
	 *
	 * Output checkbox for displaying E-mail sharing.
	 *
	 * @since 2.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_email_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$email    = isset( $settings['show_email'] ) ? (bool) $settings['show_email'] : true;
		echo '<input name="highlight-and-share[show_email]" value="off" type="hidden" />';
		printf( '<input id="has-show-email" type="checkbox" name="highlight-and-share[show_email]" value="on" %s />&nbsp;<label for="has-show-email">%s</label>', checked( true, $email, false ), esc_html__( 'Enable E-mail Sharing?', 'highlight-and-share' ) );
	}

	/**
	 * Add Copy Option for Sharing
	 *
	 * Output checkbox for displaying E-mail sharing.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_copy_enable( $args = array() ) {
		$settings = Options::get_plugin_options();
		$copy     = isset( $settings['show_copy'] ) ? (bool) $settings['show_copy'] : true;
		echo '<input name="highlight-and-share[show_copy]" value="off" type="hidden" />';
		printf( '<input id="has-show-copy" type="checkbox" name="highlight-and-share[show_copy]" value="on" %s />&nbsp;<label for="has-show-copy">%s</label>', checked( true, $copy, false ), esc_html__( 'Enable Copying', 'highlight-and-share' ) );
	}

	/**
	 * Add Facebook option for sharing.
	 *
	 * Output checkbox for displaying Facebook sharing.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_facebook_enable( $args = array() ) {
		$settings        = Options::get_plugin_options();
		$enable_facebook = isset( $settings['show_facebook'] ) ? (bool) $settings['show_facebook'] : true;
		echo '<input name="highlight-and-share[show_facebook]" value="off" type="hidden" />';
		printf( '<input id="has-show-facebook" type="checkbox" name="highlight-and-share[show_facebook]" value="on" %s />&nbsp;<label for="has-show-facebook">%s</label>', checked( true, $enable_facebook, false ), esc_html__( 'Enable Facebook Sharing?', 'highlight-and-share' ) );
		?>
		<p class="description"><?php esc_html_e( 'Facebook only allows URL sharing.', 'highlight-and-share' ); ?></p>
		<?php
	}

	/**
	 * Add Twitter hashtags option for sharing.
	 *
	 * Output checkbox for displaying Twitter hashtags.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_twitter_hashtags( $args = array() ) {
		$settings        = Options::get_plugin_options();
		$enable_hashtags = isset( $settings['enable_hashtags'] ) ? (bool) $settings['enable_hashtags'] : true;
		echo '<input name="highlight-and-share[enable_hashtags]" value="off" type="hidden" />';
		printf( '<input id="has-enable-twitter-hashtags" type="checkbox" name="highlight-and-share[enable_hashtags]" value="on" %s />&nbsp;<label for="has-enable-twitter-hashtags">%s</label>', checked( true, $enable_hashtags, false ), esc_html__( 'Enable Twitter Hashtags', 'highlight-and-share' ) );
	}

	/**
	 * Add mobile option for sharing.
	 *
	 * Output checkbox for sharing on main post content
	 *
	 * @since 3.4.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_mobile_enable( $args = array() ) {
		$settings       = Options::get_plugin_options();
		$enable_content = isset( $settings['enable_mobile'] ) ? (bool) $settings['enable_mobile'] : true;
		echo '<input name="highlight-and-share[enable_mobile]" value="off" type="hidden" />';
		printf( '<input id="has-enable-mobile" type="checkbox" name="highlight-and-share[enable_mobile]" value="on" %s />&nbsp;<label for="has-enable-mobile">%s</label>', checked( true, $enable_content, false ), esc_html__( 'Enable on Mobile?', 'highlight-and-share' ) );
	}

	/**
	 * Add Content option for sharing.
	 *
	 * Output checkbox for sharing on main post content
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_content_enable( $args = array() ) {
		$settings       = Options::get_plugin_options();
		$enable_content = isset( $settings['enable_content'] ) ? (bool) $settings['enable_content'] : true;
		echo '<input name="highlight-and-share[enable_content]" value="off" type="hidden" />';
		printf( '<input id="has-enable-content" type="checkbox" name="highlight-and-share[enable_content]" value="on" %s />&nbsp;<label for="has-enable-content">%s</label>', checked( true, $enable_content, false ), esc_html__( 'Enable Content?', 'highlight-and-share' ) );
	}

	/**
	 * Add Content option for sharing.
	 *
	 * Output checkbox for sharing on main post content
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_excerpt_enable( $args = array() ) {
		$settings       = Options::get_plugin_options();
		$enable_excerpt = isset( $settings['enable_excerpt'] ) ? (bool) $settings['enable_excerpt'] : true;
		echo '<input name="highlight-and-share[enable_excerpt]" value="off" type="hidden" />';
		printf( '<input id="has-enable-excerpt" type="checkbox" name="highlight-and-share[enable_excerpt]" value="on" %s />&nbsp;<label for="has-enable-excerpt">%s</label>', checked( true, $enable_excerpt, false ), esc_html__( 'Enable Excerpt?', 'highlight-and-share' ) );
	}

	/**
	 * Add Shortlink Option for Sharing.
	 *
	 * Output checkbox for shortlinks.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init_admin_settings
	 *
	 * @param array $args Array of arguments.
	 */
	public function add_settings_field_shortlink_enable( $args = array() ) {
		$settings          = Options::get_plugin_options();
		$enable_shortlinks = isset( $settings['shortlinks'] ) ? (bool) $settings['shortlinks'] : false;
		echo '<input name="highlight-and-share[shortlinks]" value="off" type="hidden" />';
		printf( '<input id="has-shortlinks" type="checkbox" name="highlight-and-share[shortlinks]" value="on" %s />&nbsp;<label for="has-shortlinks">%s</label>', checked( true, $enable_shortlinks, false ), esc_html__( 'Enable Shortlinks?', 'highlight-and-share' ) );
		echo sprintf(
			'<p class="description">%s</p>',
			esc_html__( 'You must have a third-party shortlink plugin enabled. Jetpack is the recommended and easiest solution to install.', 'highlight-and-share' )
		);
	}

}
