=== Highlight and Share ===
Contributors: ronalfy
Tags: quote, sharing, twitter, facebook, social
Requires at least: 3.5
Tested up to: 4.1
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

A WordPress plugin for highlighting text and sharing it via Twitter.

== Description ==

A WordPress plugin for highlighting text and sharing it via Twitter.

Sharing selectable text is only possible via Twitter, but an option to share the post via Facebook is also present when highlighting text as a convenience. 

This plugin is intended to be highly flexible in selecting content areas (via the Plugin's settings).  If you're looking for something more plug-and-play, please try <a href="https://wordpress.org/plugins/quotable/">Quotable</a>.

If you have a feature request, <a href="https://github.com/ronalfy/highlight-and-share/issues">please add a GitHub issue</a>.

<h3>Features</h3>

<ul>
<li>Enable or disable on main content and excerpts.</li>
<li>Enable or disable Facebook sharing.</li>
<li>Enable or disable Twitter sharing.</li>
<li>Customize the Twitter username used.</li>
<li>Advanced: Override which content is selectable (using jQuery class notation without the dots).</li>
</ul>

Advanced customization is allowed via hooks.  See the plugin's <a href="https://github.com/ronalfy/highlight-and-share#plugin-filters">GitHub page for filter documentation</a>.

<h3>Recommended Plugins</h3>
<ul>
<li><a href=" https://wordpress.org/plugins/better-font-awesome/">Better Font Awesome</a> - Enables Twitter/Facebook sharing icons</li>
<li><a href="https://wordpress.org/plugins/wordpress-seo/">WordPress SEO</a> - For Facebook OpenGraph data</li>
</ul>

<h3>Spread the Word</h3>
If you like this plugin, please help spread the word.  Rate the plugin.  Write about the plugin.  Something :)

<h3>Translations</h3>
 None so far.

If you would like to contribute a translation, please leave a support request with a link to your translation  or <a href="http://www.ronalfy.com/contact/">get in touch</a>.

You are welcome to help us out and <a href="https://github.com/ronalfy/highlight-and-share">contribute on GitHub</a>.

<em>Plugin is powered by caffeine and vodka.</em>

== Installation ==

1. Just unzip and upload the "highlight-and-share" folder to your '/wp-content/plugins/' directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

= Can I share text using Facebook? =

Facebook disabled that portion of the sharing API, so no, it is not possible.  If you don't like Facebook sharing, you can disable it via the plugin's options.

= Will you be adding more sharing services? =

Possibly.  <a href="https://github.com/ronalfy/highlight-and-share/issues">Open up an issue</a>.

= I want to include my own CSS.  How can I do that? =

Use the plugin hook `has_show_css` and <a href="https://github.com/ronalfy/highlight-and-share#plugin-filters">disable CSS</a>.  You can then  include your own CSS in your theme.

= Does this plugin work on mobile devices? =

Yes, it has successfully been tested on iOS and Android devices.

= What Browsers Have You Tested This In? =

So far, the latest versions of Chrome, Firefox, and Safari.   Works for IE9+

= What Themes Have You Tested This In? =
<ul>
<li>Twenty Thirteen</li>
<li>Twenty Fourteen</li>
</ul>

== Screenshots ==

1. Highlight and Share on a post.
2. Highlight and Share admin panel settings .

== Changelog ==

= 1.0.0 =
* Updated 2014-12-11 - Ensuring WordPress 4.1 compatibility 
* Released 2014-12-03
* Initial release on WordPress.org

== Upgrade Notice ==

= 1.0.0 =
Initial release.