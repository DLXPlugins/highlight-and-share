Highlight and Share for WordPress
===================

A WordPress plugin for highlighting text and sharing it via Twitter or Facebook.

Plugin Filters
---------------------
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