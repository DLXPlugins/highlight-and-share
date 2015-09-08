Highlight and Share for WordPress
===================

A WordPress plugin for highlighting text and sharing it via Twitter or Facebook (<a href="https://wordpress.org/plugins/highlight-and-share/">Now available on WordPress.org!</a>).

Sharing selectable text is only possible via Twitter, but an option to share the post via Facebook is also present when highlighting text as a convenience. 

This plugin is intended to be highly flexible in selecting content areas (via the Plugin's settings).  If you're looking for something more plug-and-play, please try <a href="https://wordpress.org/plugins/quotable/">Quotable</a>.

If you have a feature request, please add an issue.

Features
----------------------

<ul>
<li>Override which content is selectable (using jQuery class notation without the dots).</li>
<li>Enable or disable Facebook sharing.</li>
<li>Enable or disable Twitter sharing.</li>
<li>Customize the Twitter username used.</li>
</ul>

Advanced customization is allowed via hooks.  See the Plugin Filters section.

Recommended Plugins
---------------------------------
<ul>
<li><a href="https://wordpress.org/plugins/better-font-awesome/">Better Font Awesome</a> - Enables Twitter/Facebook sharing icons</li>
<li><a href="https://wordpress.org/plugins/wordpress-seo/">WordPress SEO</a> - For Facebook OpenGraph data</li>
</ul>

Installation
---------------------
Simply install as a WordPress plugin.

Head to the plugin settings and customize the content area and the Twitter username to use.

Tested on:
----------------------
The latest versions of Firefox, Chrome, and Safari.  IE testing is coming soon.

Themes tested on:
* TwentyFourteen
* TwentyThirteen

Plugin Filters
---------------------

The plugin filters are demonstrated in the code below.
```php
//Example filter usage for highlight and share
//https://github.com/ronalfy/highlight-and-share

/* The following filters take and return booleans (true, false)*/
/* Call WordPress functions __return_false or __return_true */
add_filter( 'has_show_facebook', '__return_true' ); //Disable or enable facebook sharing
add_filter( 'has_show_twitter', '__return_true' ); //Disable or enable twitter sharing
add_filter( 'has_load_css', '__return_true' ); //Disable or enable plugin's CSS - Use your own
add_filter( 'has_enable_content', '__return_true' ); //Disable or enable main post content
add_filter( 'has_enable_excerpt', '__return_true' ); //Disable or enable excerpt content
add_filter( 'has_enable_mobile', '__return_true' ); //Disable or enable on mobile devices

/* Override the Facebook share text (default is Share) */
add_filter( 'has_facebook_text', 'has_override_facebook_text' );
function has_override_facebook_text( $default ) {
	return 'Facebook';	
}

/* Override the Twitter share text (default is Tweet) */
add_filter( 'has_twitter_text', 'has_override_twitter_text' );
function has_override_twitter_text( $default ) {
	return 'Twitter';	
}

/* Override the JavaScript classes (assuming jQuery class format with no periods) */
add_filter( 'has_js_classes', 'has_override_js_classes' );
function has_override_js_classes( $content ) {
	return 'entry-content,type-page,type-post';	
}

/* Add JS IDs */
add_filter( 'has_js_ids', 'has_override_js_ids' );
function has_override_js_ids( $content = array() ) {
	if ( !is_array( $content ) ) $content = array();
	$new_arr = array( 'content', 'comments' );
	$content = array_merge( $content, $new_arr );
	return $content;
}

/* Add JS elements */
add_filter( 'has_js_elements', 'has_override_js_elements' );
function has_override_js_elements( $content = array() ) {
	if ( !is_array( $content ) ) $content = array();
	$new_arr = array( 'blockquote' );
	$content = array_merge( $content, $new_arr );
	return $content;
}

/* Override the Twitter username (no @ symbol needed) */
add_filter( 'has_twitter_username', 'has_override_twitter_username' );
function has_override_twitter_username( $username ) {
	return 'wordpress';	
}
```
Some examples are below:

### Disable sharing on a static front page.
```php
 add_action( 'wp', function() {
	if ( is_front_page() ) {
		add_filter( 'has_show_facebook', '__return_false' );
		add_filter( 'has_show_twitter', '__return_false' );
	}
} );
```
### Modify the Content URL
```php
add_filter( 'has_content_url', function( $url, $post_id ) {
	return 'https://wordpress.org';
}, 10, 2 );
```

### Modifying jQuery Selectors
The following demonstrates how to override the jQuery selectors used in choosing which content to share:
```php
//Demonstrates how to select paragraph text only

add_filter( 'has_js_selectors', 'hs_custom_selectors', 10, 5 );
function hs_custom_selectors( $selectors, $content = array(), $classes = array(), $ids = array(), $elements = array() ) {
	//With $content, $classes, $ids, $elements, you can build your own selectors
	//Or just override $selectors (a string) with your own custom ones
	return '.has-content-area p, .has-excerpt-area p';	
}
```

Credit
-------------
This script was originally observed on <a href="http://www.vogue.com/">Vogue.com</a> and was ported over for use in WordPress.