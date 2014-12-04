Highlight and Share for WordPress
===================

A WordPress plugin for highlighting text and sharing it via Twitter or Facebook.

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
add_filter( 'has_show_facebook', '__return_true' ); //Disable facebook sharing
add_filter( 'has_show_twitter', '__return_true' ); //Disable twitter sharing
add_filter( 'has_load_css', '__return_true' ); //Disable plugin's CSS - Use your own

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

/* Override the JavaScript content (assuming jQuery class format with no periods) */
add_filter( 'has_js_content', 'has_override_js_content' );
function has_override_js_content( $content ) {
	return 'entry-content,type-page,type-post';	
}

/* Override the Twitter username (no @ symbol needed) */
add_filter( 'has_twitter_username', 'has_override_twitter_username' );
function has_override_twitter_username( $username ) {
	return 'wordpress';	
}
```

Credit
-------------
This script was originally observed on <a href="http://www.vogue.com/">Vogue.com</a> and was ported over for use in WordPress.