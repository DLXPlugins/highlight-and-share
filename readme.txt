=== Highlight and Share ===
Contributors: ronalfy, bigwing
Tags: highlight, share, twitter, facebook
Requires at least: 4.4
Tested up to: 4.9
Stable tag: 2.1.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Donate link: https://mediaron.com/contribute/

A WordPress plugin for highlighting text and sharing it via Twitter and Facebook.

== Description ==

A WordPress plugin for highlighting text and sharing it via Twitter and Facebook.

Sharing selectable text is only possible via Twitter and Facebook, but an option to share the post via LinkedIn, Pinterest, and E-mail are also present when highlighting text as a convenience. 

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
<li><a href="https://wordpress.org/plugins/jetpack/">Jetpack</a> - For Shortlinks</li>
</ul>

<h3>Spread the Word</h3>
If you like this plugin, please help spread the word.  Rate the plugin.  Write about the plugin.  Something :)

<h3>Translations</h3>

Please translate using the Translate button on this page.

You are welcome to help us out and <a href="https://github.com/ronalfy/highlight-and-share">contribute on GitHub</a>.

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

1. Highlight and Share settings.
2. Highlight and Share on a post with icons. 
3. Highlight and Share on a post with all options showing.
4. Highlight and Share with custom CSS.

== Changelog ==

= 2.1.5 =
* Released 2017-11-15
* CSS adjustment for better theme compatibility.

= 2.1.2 =
* Released 2017-02-12
* Fixing iOS/Android issue with highlighted text being only the initial selection.

= 2.1.0 =
* Released 2017-01-11
* Sharing via Facebook is now possible if you create a Facebook application ID.

= 2.0.1 =
* Released 2016-10-20
* Fixing %text% issue in iOS10.

= 2.0.0 =
* Released 2016-05-21
* Enhancement: Added LinkedIn, Pinterest, and E-mail buttons
* Enhancement: Allow icons only view.

= 1.2.7 =
* Released 2015-11-08
* Fixing polish translation

= 1.2.5 =
* Released 2015-11-08
* Added Polish translation
* Added minified scripts

= 1.2.1 =
* Updated 2015-10-29
* Testing for WordPress 4.4
* Added German translation

= 1.2.0 =
* Updated 2015-09-07
* Fixed loading order of initial filters to be better overridable in the context of a WordPress query
* Fixed typo in the admin section
* Added filter to change content URL

= 1.1.2 =
* Updated 2015-08-20 - WordPress 4.3 compatibility 
* Released 2015-04-19
* Fixing issue with multiple twitter popups. 
* Ensuring WordPress 4.2 compatibility.  

= 1.1.1 =
* Released 2015-03-18
* Added filter for customizing the jQuery selectors

= 1.1.0 =
* Released 2015-03-16
* Added option for shortlink in the settings
* Removed the requirement for having to set a Twitter handle

= 1.0.0 =
* Updated 2014-12-11 - Ensuring WordPress 4.1 compatibility 
* Released 2014-12-03
* Initial release on WordPress.org

== Upgrade Notice ==

= 2.1.5 =
CSS adjustment for better theme compatibility.

= 2.1.2 =
Fixing iOS/Android issue with highlighted text being only the initial selection.