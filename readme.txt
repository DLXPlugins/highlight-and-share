=== Highlight and Share ===
Contributors: ronalfy, bigwing
Tags: highlight, share, twitter, facebook
Requires at least: 4.7
Tested up to: 5.0
Stable tag: 2.4.8
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Donate link: https://mediaron.com/give/

A WordPress plugin for highlighting text and sharing it via Twitter and Facebook and other services including LinkedIn, Email, Xing, and WhatsApp.

== Description ==

A WordPress plugin for highlighting text and sharing it via Twitter and Facebook and other services including LinkedIn, Email, Xing, and WhatsApp.

Sharing selectable text is only possible via Twitter, Facebook, and WhatsApp. However an option to share the post via LinkedIn, Pinterest, and E-mail are also present when highlighting text as a convenience.

This plugin is intended to be highly flexible in selecting content areas (via the Plugin's settings).

If you have a feature request, <a href="https://github.com/ronalfy/highlight-and-share/issues">please add a GitHub issue</a>.

> Please <a href="https://wordpress.org/support/plugin/highlight-and-share/reviews/#new-post">Rate the Plugin</a> or <a href="https://mediaron.com/give/">Give Back</a> to show support.

https://www.youtube.com/watch?v=GMr4tmmKMz8

<h3>Features</h3>

<ul>
<li>Choose a theme for display.</li>
<li>Enable or disable on main content and excerpts.</li>
<li>Enable or disable Facebook sharing.</li>
<li>Enable or disable Twitter sharing.</li>
<li>Customize the Twitter username used.</li>
<li>Advanced: Override which content is selectable (using jQuery class notation without the dots).</li>
<li>Advanced: Override the Font Awesome classes, especially if you're using Font Awesome 5</li>
</ul>

Advanced customization is allowed via hooks.  See the plugin's <a href="https://github.com/ronalfy/highlight-and-share#plugin-filters">GitHub page for filter documentation</a>.

<h3>Recommended Plugins</h3>
<ul>
<li><a href=" https://wordpress.org/plugins/better-font-awesome/">Better Font Awesome</a> - Enables Twitter/Facebook sharing icons</li>
<li><a href="https://wordpress.org/plugins/wordpress-seo/">WordPress SEO</a> - For Facebook OpenGraph data</li>
<li><a href="https://wordpress.org/plugins/jetpack/">Jetpack</a> - For Shortlinks</li>
</ul>

You are welcome to help us out and <a href="https://github.com/ronalfy/highlight-and-share">contribute on GitHub</a>.

== Installation ==

1. Just unzip and upload the "highlight-and-share" folder to your '/wp-content/plugins/' directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

= Can I share text using Facebook? =

You can if you have a Facebook App ID. They <a href="https://developers.facebook.com/">are easy to create</a>.

Here's a video showing you how:

https://www.youtube.com/watch?v=ZtcPacmr87E

= Will you be adding more sharing services? =

Possibly.  <a href="https://github.com/ronalfy/highlight-and-share/issues">Open up an issue</a>.

= I'm using Font Awesome 5 and the icons aren't showing up =

FontAwesome 5 deprecated a lot of FontAwesome 4, so head to the settings and go under Advanced.

* For Twitter, enter: `fab fa-twitter`
* For Facebook, enter `fab fa-facebook`
* For LinkedIn, enter `fab fa-linkedin`
* For Pinterest, enter `fab fa-pinterest`
* For Xing, enter `fab fa-xing`
* For WhatsApp, enter `fab fa-whatsapp`
* For Email, you can leave this as `fa fa-envelope`

= I want to include my own CSS.  How can I do that? =

You can turn off the theme.

You can then  include your own CSS in your theme.

For the black CSS file shown in the, adhere to <a href="https://jsfiddle.net/0ej4qufs/26/">the JSFiddle</a> and place the CSS in the WordPress customizer. As of 2.3.0, themes are built in and there is no need to include custom styles.

= Does this plugin work on mobile devices? =

Yes, it has successfully been tested on iOS and Android devices.

= What Browsers Have You Tested This In? =

So far, the latest versions of Chrome, Firefox, and Safari. Works for IE9+

== Screenshots ==

1. Highlight and Share settings.
2. Highlight and Share Default Theme on a post with icons.
3. Highlight and Share Black Theme
4. Highlight and Share White Theme
5. Highlight and Share Magenta Theme
6. Highlight and Share Blue Theme
7. Highlight and Share Green Theme
8. Email functionality

== Changelog ==

= 2.4.8 =
* Released 2018-12-12
* Highlighted text now shows in email notifications

= 2.4.7 =
* Released 2018-12-10
* Ensuring undefines do not show up when emailing

= 2.4.6 =
* Released 2018-10-02
* Added modal to emails for better mobile compatibility

= 2.4.1 =
* Released 2018-09-05
* Fix: Facebook App ID uses a different sanitzation technique to prevent App ID errors.

= 2.4.0 =
* Released 2018-09-02
* New theme: Brand Colors (icons only).
* Enhancement: You can now customize Highlight and Share through the customizer.

= 2.3.6 =
* Released 2018-08-28
* Hotfix: Email styles failed to commit.

= 2.3.5 =
* Released 2018-08-26
* Reworked email so it doesn't pop up in a new window and is shown inline very similar to JetPack's email functionality.

= 2.3.1 =
* Released 2018-08-20
* Bug fix: some settings weren't being saved correctly.

= 2.3.0 =
* Released 2018-08-19
* Added the ability to select themes. No more need for custom CSS.
* Added the ability to change FontAwesome classes for compatibility with FontAwesome 5.

= 2.2.2 =
* Released 2018-07-27
* Added support for WhatsApp

= 2.2.0 =
* Released 2018-02-11
* Added support for XING
* Added better support for emailing

= 2.1.7 =
* Released 2018-02-10
* JS Related bug where the wrong text was showing for Twitter sharing.

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

= 2.4.8 =
Highlighted text now shows in email notifications

= 2.4.7 =
Ensuring undefines do not show up when emailing

= 2.4.6 =
Added modal to emails for better mobile compatibility

= 2.4.1 =
Fix: Facebook App ID uses a different sanitzation technique to prevent App ID errors.