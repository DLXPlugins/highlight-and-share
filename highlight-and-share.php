<?php
/*
Plugin Name: Highlight and Share
Plugin URI: http://wordpress.org/extend/plugins/highlight-and-share/
Description: Highlight text and share via Twitter or Facebook
Author: ronalfy
Version: 1.0.0
Requires at least: 3.5
Author URI: http://www.ronalfy.com
Contributors: ronalfy
Text Domain: highlight-and-share
Domain Path: /languages
 
Recommended pre-requisite plugin - https://wordpress.org/plugins/better-font-awesome/
WordPress SEO - Twitter/Facebook OpenGraph data - https://wordpress.org/plugins/wordpress-seo/
*/ 

class Highlight_And_Share {
	private static $instance = null;
	private $options = false;
		
	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the Highlight and Share Class.
	 *
	 * @since 1.0.0
	 * @access public static
	 *
	 * @return Highlight_And_Share class instance.
	 */
	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;
	} //end get_instance
	
	/**
	 * Class constructor.
	 *
	 * Initialize plugin and load text domain for internationalization 
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'init' ), 9 );
			
		//* Localization Code */
		load_plugin_textdomain( 'highlight-and-share', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		
	} //end constructor
	
	/**
	 * Main plugin initialization
	 *
	 * Initialize admin menus, options,and scripts
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see __construct
	 *
	 */
	public function init() {
		$settings = $this->get_plugin_options();
				
		//Admin Settings
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );
		add_action( 'admin_init', array( $this, 'init_admin_settings' ) );
		
		//Plugin settings
		add_filter( 'plugin_action_links_' . plugin_basename(__FILE__) , array( $this, 'add_settings_link' ) );
		
		//Skip loading if both twitter/facebook are turned off
		$show_facebook = (bool)apply_filters( 'has_show_facebook', $settings[ 'show_facebook' ] );
		$show_twitter = (bool)apply_filters( 'has_show_twitter', $settings[ 'show_twitter' ] );
		if ( !$show_facebook && !$show_twitter ) return;
		
		//Disable if on a feed
		if ( is_feed() ) return;
		
		//Disable if mobile
		if ( wp_is_mobile() ) {
			if ( (bool)apply_filters( 'has_enable_mobile', true ) ) {
				add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts_mobile' ) );
			} else {
				return;
			}
		}
		
		//Load scripts
		add_action( 'wp_enqueue_scripts', array( $this, 'add_scripts' ) );
		
		//Load content area
		if ( apply_filters( 'has_enable_content', (bool)$settings[ 'enable_content' ] ) ) {
			add_filter( 'the_content', array( $this, 'content_area' ) );
		}
		if ( apply_filters( 'has_enable_excerpt', (bool)$settings[ 'enable_excerpt' ] ) ) { 
			add_filter( 'the_excerpt', array( $this, 'excerpt_area' ) );
		}		
	} //end init
	
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
	 * @param string $content Main post content
	 * @return string $content Modified
	 */
	public function content_area( $content ) {
		global $post;
		if ( !in_the_loop( ) ) return $content;
		if ( !is_object( $post ) ) return $content;
		
		$post_id = $post->ID;
		$url = get_permalink( $post_id );
		$title = get_the_title( $post_id );
		$content = sprintf( '<div class="has-content-area" data-url="%s" data-title="%s">%s</div>', esc_url( $url ), esc_attr( $title ), $content );
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
	 * @param string $content Main excerpt content
	 * @return string $content Modified
	 */
	public function excerpt_area( $content ) {
		global $post;
		if ( !in_the_loop( ) ) return $content;
		if ( !is_object( $post ) ) return $content;
		
		$post_id = $post->ID;
		$url = get_permalink( $post_id );
		$title = get_the_title( $post_id );
		$content = sprintf( '<div class="has-excerpt-area" data-url="%s" data-title="%s">%s</div>', esc_url( $url ), esc_attr( $title ), $content );
		return $content;
		
		
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
	 * @param array $links Array of plugin options
	 * @return array $links Array of plugin options
	 */
	public function add_settings_link( $links ) { 
		$settings_link = sprintf( '<a href="%s">%s</a>', esc_url( admin_url( 'options-general.php?page=highlight-and-share' ) ), _x( 'Settings', 'Plugin settings link on the plugins page', 'highlight-and-share' ) ); 
			array_unshift($links, $settings_link); 
			return $links; 
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
	 *
	 */
	public function add_scripts() {
			$deps = array( 'jquery' );
			if ( wp_is_mobile() && apply_filters( 'has_enable_mobile', true ) ) { 
				$deps[] = 'jquery.mobile';	
			}
			wp_enqueue_script( 'highlight-and-share', $this->get_plugin_url( 'js/highlight-and-share.js' ), $deps, '20141205', true );

			/**Build JSON Object**/
			$settings = $this->get_plugin_options();
			$json_arr = array();
			
			//Facebook
			$json_arr[ 'show_facebook' ] = (bool)apply_filters( 'has_show_facebook', $settings[ 'show_facebook' ] );
			
			//Twitter
			$json_arr[ 'show_twitter' ] = (bool)apply_filters( 'has_show_twitter', $settings[ 'show_twitter' ] );
			$json_arr[ 'twitter_username' ] = trim( sanitize_text_field( apply_filters( 'has_twitter_username', $settings[ 'twitter' ] ) ) );
			
			//Override the filter if no username is present for twitter
			if ( empty( $json_arr[ 'twitter_username' ] ) ) {
				$json_arr[ 'show_twitter' ] = false;
			}
			
			//Add mobile
			if ( wp_is_mobile() ) {
				$json_arr[ 'mobile' ] = true;	
			} else {
				$json_arr[ 'mobile' ] = false;		
			}
			
			//Content areas
			$classes = apply_filters( 'has_js_classes', $settings[ 'js_content' ] ); //Pass comma separated values (e.g., entry-content,type-post,type-page)
			$classes = explode( ',', $classes );
			if ( apply_filters( 'has_enable_content', (bool)$settings[ 'enable_content' ] ) ) {
				$classes[] = 'has-content-area';
			}
			if ( apply_filters( 'has_enable_excerpt', (bool)$settings[ 'enable_excerpt' ] ) ) {
				$classes[] = 'has-excerpt-area';	
			}
			foreach( $classes as $index => &$string ) {
				$string = trim( $string ); //Trim
				if ( empty( $string ) ) {
					unset( $classes[ $index ] );
					continue;
				}
				$string = trim( esc_js( '.' . $string ) );	//Get in class format (.%s) and trim just in case
			}
			$ids = (array)apply_filters( 'has_js_ids', array() ); //Pass array of jQuery ID elements (without the #)
			foreach( $ids as $index => &$string ) {
				$string = trim( $string );
				if ( empty( $string ) ) continue;
				$string = trim( esc_js( '#' . $string ) ); //Get in ID format (#%s) and trim just in case	
			}
			$elements = (array)apply_filters( 'has_js_elements', array() ); //Pass array of jQuery HTML elements (e.g., blockquote, article)
			foreach( $elements as $index => &$string ) {
				$string = trim( $string );
				if ( empty( $string ) ) continue;
				$string = trim( esc_js( $string ) );	
			}
			$content = array_merge( $classes, $ids, $elements );
			$json_arr[ 'content' ] = implode(',', $content );
			
			//Text to display
			$json_arr[ 'tweet_text' ] = apply_filters( 'has_twitter_text', _x( 'Tweet', 'Twitter share text', 'highlight-and-share' ) );
			$json_arr[ 'facebook_text' ] = apply_filters( 'has_facebook_text', _x( 'Share', 'Facebook share text', 'highlight-and-share' ) );
			
			//Localize
			wp_localize_script( 'highlight-and-share', 'highlight_and_share', $json_arr );		
			
			//Add CSS
			if ( apply_filters( 'has_load_css', true ) ) {
				wp_enqueue_style( 'highlight-and-share', $this->get_plugin_url( 'css/highlight-and-share.css' ), array(), '20141203', 'all' );
			}	
			
			
	}
	
	/**
	 * Load mobile scripts
	 *
	 * Enqueue scripts/styles to enable mobile events
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 */
	public function add_scripts_mobile() {
		wp_enqueue_script( 'jquery.mobile', $this->get_plugin_url( 'js/jquery.mobile.custom.js' ), array( 'jquery' ), '1.4.5', true );	
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
	 *
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
	 *
	 */
	public function options_page() {
	?>
	    <div class="wrap">
	        <h2><?php echo esc_html( _x( 'Highlight and Share', 'Plugin Name - Settings Page Title', 'highlight-and-share' ) ); ?></h2>
	        <form action="<?php echo esc_url( admin_url( 'options.php' ) ); ?>" method="POST">
	            <?php settings_fields( 'highlight-and-share' ); ?>
	            <?php do_settings_sections( 'highlight-and-share' ); ?>
	            <?php submit_button(); ?>
	        </form>
	    </div>
    <?php
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
	 *
	 */
	public function init_admin_settings() {
		register_setting( 'highlight-and-share', 'highlight-and-share', array( $this, 'sanitization' ) );
		
		add_settings_section( 'has-config', _x( 'Content', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );
		
		add_settings_section( 'has-twitter', _x( 'Twitter Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );
		
		add_settings_section( 'has-facebook', _x( 'Facebook Settings', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );
		
		add_settings_section( 'has-advanced', _x( 'Advanced', 'plugin settings heading' , 'highlight-and-share' ), array( $this, 'settings_section' ), 'highlight-and-share' );
		
		add_settings_field( 'hightlight-and-share-content-enable', __( 'Add to Post Content', 'highlight-and-share' ), array( $this, 'add_settings_field_content_enable' ), 'highlight-and-share', 'has-config', array( 'desc' => __( 'Would you like to add sharing to the main content areas?', 'highlight-and-share' ) ) );
		
		add_settings_field( 'hightlight-and-share-excerpt-enable', __( 'Add to Excerpt Content', 'highlight-and-share' ), array( $this, 'add_settings_field_excerpt_enable' ), 'highlight-and-share', 'has-config', array( 'desc' => __( 'Would you like to add sharing to the excerpts?', 'highlight-and-share' ) ) );
		
		add_settings_field( 'hightlight-and-share-twitter-enable', __( 'Show Twitter Option', 'highlight-and-share' ), array( $this, 'add_settings_field_twitter_enable' ), 'highlight-and-share', 'has-twitter', array( 'desc' => __( 'Would you like to enable sharing via Twitter?', 'highlight-and-share' ) ) );
		
		add_settings_field( 'hightlight-and-share-twitter-handle', __( 'Twitter Username', 'highlight-and-share' ), array( $this, 'add_settings_field_twitter' ), 'highlight-and-share', 'has-twitter', array( 'label_for' => 'hightlight-and-share-twitter-handle', 'desc' => __( 'Enter Your Twittter Username', 'highlight-and-share' ) ) );
		
		add_settings_field( 'hightlight-and-share-facebook-enable', __( 'Show Facebook Option', 'highlight-and-share' ), array( $this, 'add_settings_field_facebook_enable' ), 'highlight-and-share', 'has-facebook', array( 'desc' => __( 'Would you like to enable sharing via Facebook?', 'highlight-and-share' ) ) );
		
		add_settings_field( 'hightlight-and-share-js-content', _x( 'jQuery classes', 'Label - Where in the HTML document to search for text to capture', 'highlight-and-share' ), array( $this, 'add_settings_field_js_content' ), 'highlight-and-share', 'has-advanced', array( 'label_for' => 'hightlight-and-share-js-content', 'desc' => __( 'Enter jQuery classes to search for in the HTML.  You must comma-separate classes (e.g., entry-content,post,page).', 'highlight-and-share' ) ) );
		
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
	 *
	 */
	public function settings_section() {
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
	 * @param array $input {
	 		@type string $js_content Content to be parsed via Javascript.  Default 'entry-content'.
	
	 		@type string $twitter Twitter username.  Default ''.
	 		@type bool $show_twitter Whether to show twitter share option.  Default true.
	 		@type bool $show_facebook Whether to show facebook share option.  Default true
	 }
	 * @return array Sanitized array of options
	 */
	public function sanitization( $input = array() ) {
		$output = get_option( 'highlight-and-share' );
		
		//Check if settings are being initialized for the first time
		if ( false === $output ) {
			//No settings have been saved yet and we're being supplied with defaults
			foreach( $input as $key => &$value ) {
				if ( is_bool( $value ) ) continue;
				$value = sanitize_text_field( $value );
			}	
			return $input;
		}
		//Settings are being saved.  Update.
		foreach( $input as $key => $value ) {
			if ( 'twitter' == $key ) {
				$twitter_username = $input[ $key ];
				if ( !preg_match( '/^[a-zA-Z0-9_]{1,15}$/', $twitter_username ) ) {
					add_settings_error( 'highlight-and-share', 'invalid_twitter', _x( 'You have entered an incorrect Twitter username', 'Twitter username error', 'highlight-and-share' ) );
				} else {
					$output[ $key ] = sanitize_text_field( $value );
				}
			} elseif( 'js_content' == $key ) {
				$js_content = trim( $value );				
				if( empty( $js_content ) || preg_match( '/[-_0-9a-zA-Z]+(,[-_0-9a-zA-Z]+)*$/', $js_content ) ) {
					$output[ $key ] = sanitize_text_field( $js_content );
				} else {
					add_settings_error( 'highlight-and-share', 'invalid_twitter', _x( 'You must enter valid comma-separated values for the content.', 'Invalid comma-separated values', 'highlight-and-share' ) );
				}
			} elseif( ( 'show_twitter' || 'show_facebook' || 'enable_content' || 'enable_excerpt' ) == $key ) {
				if ( $input[ $key ] == 'on' ) {
					$output[ $key ] = true;	
				} else {
					$output[ $key ] = false;
				}
			}
		}
		return $output;
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
	 * @param array $args {
	 		@type string $label_for Settings label and ID.
	
	 		@type string $desc Description for the setting.
	 		
	 }
	 */
	public function add_settings_field_js_content( $args = array() ) {
		$settings = $this->get_plugin_options();
		$js_content = isset( $settings[ 'js_content' ] ) ? $settings[ 'js_content' ] : '';
		printf( '<p>%s</p>', esc_html( $args[ 'desc' ] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[js_content]" value="%s" />', esc_attr( $args[ 'label_for' ] ), esc_attr( $js_content ) );
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
	 * @param array $args {
	 		@type string $label_for Settings label and ID.
	
	 		@type string $desc Description for the setting.
	 		
	 }
	 */
	public function add_settings_field_twitter( $args = array() ) {
		$settings = $this->get_plugin_options();
		$js_content = isset( $settings[ 'twitter' ] ) ? $settings[ 'twitter' ] : '';
		printf( '<p>%s</p>', esc_html( $args[ 'desc' ] ) );
		printf( '<input id="%s" type="text" name="highlight-and-share[twitter]" value="%s" />', esc_attr( $args[ 'label_for' ] ), esc_attr( $js_content ) );
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
	 * @param array $args {
	 		@type string $label_for Settings label and ID.
	
	 		@type string $desc Description for the setting.
	 		
	 }
	 */
	public function add_settings_field_twitter_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_twitter = isset( $settings[ 'show_twitter' ] ) ? (bool)$settings[ 'show_twitter' ] : true;
		echo '<input name="highlight-and-share[show_twitter]" value="off" type="hidden" />';
		printf( '<input id="has-show-twitter" type="checkbox" name="highlight-and-share[show_twitter]" value="on" %s />&nbsp;<label for="has-show-twitter">%s</label>', checked( true, $enable_twitter, false ), __( 'Enable Twitter Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 		@type string $label_for Settings label and ID.
	
	 		@type string $desc Description for the setting.
	 		
	 }
	 */
	public function add_settings_field_facebook_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_facebook = isset( $settings[ 'show_facebook' ] ) ? (bool)$settings[ 'show_facebook' ] : true;
		echo '<input name="highlight-and-share[show_facebook]" value="off" type="hidden" />';
		printf( '<input id="has-show-facebook" type="checkbox" name="highlight-and-share[show_facebook]" value="on" %s />&nbsp;<label for="has-show-facebook">%s</label>', checked( true, $enable_facebook, false ), __( 'Enable Facebook Sharing?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 		@type string $label_for Settings label and ID.
	
	 		@type string $desc Description for the setting.
	 		
	 }
	 */
	public function add_settings_field_content_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_content = isset( $settings[ 'enable_content' ] ) ? (bool)$settings[ 'enable_content' ] : true;
		echo '<input name="highlight-and-share[enable_content]" value="off" type="hidden" />';
		printf( '<input id="has-enable-content" type="checkbox" name="highlight-and-share[enable_content]" value="on" %s />&nbsp;<label for="has-enable-content">%s</label>', checked( true, $enable_content, false ), __( 'Enable Content?', 'highlight-and-share' ) );
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
	 * @param array $args {
	 		@type string $label_for Settings label and ID.
	
	 		@type string $desc Description for the setting.
	 		
	 }
	 */
	public function add_settings_field_excerpt_enable( $args = array() ) {
		$settings = $this->get_plugin_options();
		$enable_excerpt = isset( $settings[ 'enable_excerpt' ] ) ? (bool)$settings[ 'enable_excerpt' ] : true;
		echo '<input name="highlight-and-share[enable_excerpt]" value="off" type="hidden" />';
		printf( '<input id="has-enable-excerpt" type="checkbox" name="highlight-and-share[enable_excerpt]" value="on" %s />&nbsp;<label for="has-enable-excerpt">%s</label>', checked( true, $enable_excerpt, false ), __( 'Enable Excerpt?', 'highlight-and-share' ) );
	}
	
	/**
	 * Initialize and return plugin options.
	 *
	 * Return an array of plugin options.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @see init
	 *
	 * @return array Plugin options
	 */
	public function get_plugin_options() {
		if ( false === $this->options ) {
			$settings = get_option( 'highlight-and-share' );	
		} else {
			$settings = $this->options;
		}
		
		if ( false === $settings || !is_array( $settings ) ) {
			$defaults = array(
				'js_content' => '',
				'twitter' => '',
				'show_twitter' => true,
				'show_facebook' => true,
				'enable_content' => true,
				'enable_excerpt' => true
			);
			update_option( 'highlight-and-share', $defaults );
			return $defaults;
		}
		$this->options = $settings;
		return $settings;
	}
	
	/**
	 * Return a plugin path relative to the file system
	 *
	 * Return a plugin path string relative to the file system.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $path Relative file path to plugin asset 
	 * @return string Full file path to plugin asset
	 */
	public function get_plugin_dir( $path = '' ) {
		$dir = rtrim( plugin_dir_path(__FILE__), '/' );
		if ( !empty( $path ) && is_string( $path) )
			$dir .= '/' . ltrim( $path, '/' );
		return $dir;		
	}
	
	/**
	 * Return a plugin path relative to the plugin URL
	 *
	 * Return a plugin path string relative to the plugin's URL.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $path Relative URL to plugin asset 
	 * @return string Full URL to plugin asset
	 */
	public function get_plugin_url( $path = '' ) {
		$dir = rtrim( plugin_dir_url(__FILE__), '/' );
		if ( !empty( $path ) && is_string( $path) )
			$dir .= '/' . ltrim( $path, '/' );
		return $dir;	
	}
	
	
} //end class Highlight_And_Share

add_action( 'plugins_loaded', 'highlightshare_instantiate' );
function highlightshare_instantiate() {
	Highlight_And_Share::get_instance();
} //end highlightshare_instantiate