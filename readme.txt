=== Highlight and Share - Highlight Text and Share It ===
Contributors: ronalfy
Tags: highlight, social sharing, click to tweet, sharing, highlight text
Requires at least: 5.1
Tested up to: 6.0
Stable tag: 3.6.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Donate link: https://github.com/sponsors/DLXPlugins

Allows you to highlight text and enable social sharing to share with services including Twitter, Facebook, LinkedIn, Xing, Telegram, Reddit, WhatsApp, and email.

== Description ==

https://www.youtube.com/watch?v=j2ZiUqGLSwc&rel=0

A social sharing plugin that allows you to highlight text and and share amonst several social networks including Twitter, Facebook, LinkedIn, Xing, Telegram, Reddit, WhatsApp, and email.

> <a href="https://has.dlxplugins.com/">In-depth Documentation</a> - Please check out our thorough documentation ❤️️

> <a href="https://dlxplugins.com/plugins/highlight-and-share/">View a Brief Overview of Highlight and Share</a>.

Click to Tweet functionality is allowed via highlighting text or using the Gutenberg block or inline highlighting for social sharing.

If you have a feature request, <a href="https://dlxplugins.com/support/">please leave a support request.</a>.

<h3>Features</h3>

<ul>
<li>A free alternative to Better Click to Tweet.</li>
<li>Choose from many themes for display.</li>
<li>Enable or disable on main content and excerpts.</li>
<li>Enable or disable Facebook sharing.</li>
<li>Enable or disable Twitter sharing.</li>
<li>Customize the Twitter username used.</li>
<li>Advanced: Override which content is selectable (using jQuery class notation without the dots).</li>
<li>Advanced: Override the Font Awesome classes, especially if you're using Font Awesome 5</li>
<li>Advanced: Gutenberg block for Click to Share and Click to Tweet functionality</li>
</ul>

Advanced customization is allowed via hooks.  See the plugin's <a href="https://has.dlxplugins.com/">documentation</a>.

> <a href="https://dlxplugins.com/plugins/highlight-and-share/">Visit Highlight and Share Overview</a>

== Installation ==

1. Search Highlight and Share in the plugin's screen.
2. Install and activate.

> <a href="https://has.dlxplugins.com/">In-depth Documentation</a> - Please check out our thorough documentation ❤️️

== Frequently Asked Questions ==

= Can I share text using Signal? =

Signal doesn't have a sharing API currently.

= Can I share text using Facebook? =

You can if you have a Facebook App ID. They <a href="https://developers.facebook.com/">are easy to create</a>.

Here's a video showing you how:

https://www.youtube.com/watch?v=ZtcPacmr87E

= Will you be adding more sharing services? =

Possibly.  <a href="https://dlxplugins.com/support/">Please send me a message</a>.

= Where did my icons go? =

Since people are having issues with the icons, I decided to do SVG includes instead. This should be more reliable and faster.

= I want to include my own CSS.  How can I do that? =

You can turn off the theme and include CSS in your own theme.

= Does this plugin work on mobile devices? =

Yes, it has successfully been tested on iOS and Android devices.

= What Browsers Have You Tested This In? =

So far, the latest versions of Chrome, Firefox, and Safari. Works for IE9+

== Screenshots ==

1. Highlight and Share Default Appearance.
2. Brand Colors With Icons Only.
3. Purple Theme. There are several themes to choose from.
4. Inline Highlighting Example with Purple Theme.
5. Circular Theme.
6. Circular Glass Theme.

== Changelog ==

= 3.6.1 =
* Released 2022-06-23
* Fixing typo that caused two Twitter buttons to show up when icons are off, the default theme is used, and a user has added their Facebook App ID.

= 3.6.0 =
* Released 2022-06-13
* Released new documentation
* Refreshed the admin panel.
* Replaced Fancybox with Photoswipe.

= 3.5.8 =
* Released 2022-04-09
* Fixed WhatsApp sharing. The text wasn't sharing correctly on desktop/mobile.
* Fixed inline highlighting and Click to Share from not being able to share on Twitter.

= 3.5.6 =
* Released 2022-03-26
* Fixed LinkedIn sharing (only URL is supported by LinkedIn now).
* WordPress 5.9 compatibility testing.

= 3.5.5 =
* Released 2021-06-18
* Added Hashtag support for Twitter.
* See https://mediaron.com/highlight-and-share-now-supports-hashtags/ for more details.

= 3.5.1 =
* Released 2021-05-30
* Adjusting glass styles to be more inline with glassmorphism.

= 3.5.0 =
* Released 2021-05-29
* Added two new themes: circular, and circular glass.
* Added two new social networks: Odnoklassniki and VKontakte.
* Fixed SVG bug on the front-end where it could cause extra space at the bottom of a theme.

= 3.4.1 =
* Released 2021-04-08
* Fixing email JavaScript bug preventing email options from showing.

= 3.4.0 =
* Released 2021-02-12
* Tested with WordPress 5.7.
* Updating Gutenberg functionality to fix deprecations.
* Added a prefix/suffix you can use to add quotations or other text around a text share.

= 3.3.8 =
* Released 2021-01-31
* Fixing typo in the Dark CSS theme.

= 3.3.7 =
* Released 2021-01-30
* Documentation update.

= 3.3.6 =
* Released 2020-12-01
* Fixing undefined notice errors in logs and JavaScript.

= 3.3.5 =
* Released 2020-11-16
* Added Reddit sharing option.
* Added Telegram sharing option.
* Added purple theme.

= 3.3.0 =
* Released 2020-11-09
* Removed Font Awesome requirement.
* Improve a little performance around the blocks and scripts.
* Remove Pinterest. It stopped working a long time ago.
* Removed icons from customizer and admin panel.
* Added SVG sprite for icon retrieval.
* Ensures all the themes were correct for the new icons.
* Fixed a few small errors in the Click to Share/Click to Tweet block.
* More changes coming soon: https://mediaron.com/highlight-and-share/

= 3.2.11 =
* Released 2020-05-10
* Adjusting styles (particularly for Elementor Pro) to be more specific in intention of what the colors of the highlighting interface is.

= 3.2.10 =
* Released 2020-04-29
* Fixed compatiblity issues with Page Builders.

= 3.2.9 =
* Released 2020-02-24
* Fixing inline highlighting on mobile devices.

= 3.2.0 =
* Released 2020-02-16
* Added inline highlighting formatting option in Gutenberg.

= 3.1.5 =
* Released 2019-10-20
* Code cleanup and smaller footprint for Gutenberg block.

= 3.1.2 =
* Released 2019-07-10
* Prevent HAS from showing in the admin area.

= 3.1.1 =
* Released 2019-06-13
* Fixing infinite loop issue with JS errors when clicking on the buttons.

= 3.1.0 =
* Released 2019-05-11
* Removing show service on hover (was conflicting on smaller screens)
* Adding Cyan theme (icons only)
* Fixing highlight position on desktop/mobile to it doesn't go off screen
* Fixing highlight position on Gutenberg block so that it's centered above the block

= 3.0.9 =
* Released 2019-04-07
* Show service on hover.

= 3.0.8 =
* Released 2019-03-30
* Fixing bug in Click to Share email functionality and honering margins on Click to Share block.

= 3.0.7 =
* Released 2019-03-03
* Hot fix for undefined JavaScript error in email popup

= 3.0.6 =
* Released 2019-03-03
* Resolving undefined error in email popup

= 3.0.5 =
* Released 2019-03-03
* Fixing email JavaScript error

= 3.0.4 =
* Released 2019-02-01
* Fixed copy functionality when Gutenberg block is present
* Fixed copy styling in default theme
* Fixed URL shortening error when URL shortening is enabled

= 3.0.3 =
* Released 2019-01-17
* Hotfix: Regular text was not showing all icons

= 3.0.2 =
* Released 2019-01-17
* Fixing issue when email addresses use an alias

= 3.0.1 =
* Released 2019-01-17
* Fixing multiple HAS interfaces showing in Gutenberg block.

= 3.0.0 =
* Released 2019-01-16
* Added copy functionality.
* Added Click to Share Gutenberg block.

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

= 3.6.1 =
Fixing typo that caused two Twitter buttons to show up when icons are off, the default theme is used, and a user has added their Facebook App ID.