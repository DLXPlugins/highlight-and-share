/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./src/frontendjs/highlight-and-share.js ***!
  \***********************************************/
(function () {
  'use strict';

  // Get localized var.
  var HAS = highlight_and_share;
  /**
   * Determine if an element is visible or not.
   *
   * @param {Element} element The element to check if visible or not.
   * @return {boolean} true if visible, false if not.
   */
  var isVisible = function isVisible(element) {
    var style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  };

  /**
   * Remove any visible HAS containers.
   */
  var hasRemoveVisibleElements = function hasRemoveVisibleElements() {
    var hasContainers = document.querySelectorAll('.highlight-and-share-wrapper');
    if (null !== hasContainers) {
      // Remove visible containers from dom.
      hasContainers.forEach(function (container) {
        if (isVisible(container)) {
          container.remove();
        }
      });
    }
  };

  /**
   * Display the Highlight and Share Interface.
   *
   * @param {string} text     Text that is selected or to be shared.
   * @param {string} title    The title of the post/page.
   * @param {string} href     The URL of the post/page.
   * @param {string} hashtags Hashtags present on the post/page.
   * @param {event}  event    The original event.
   */
  var hasDisplay = function hasDisplay(text, title, href, hashtags, event) {
    // Do not show the interface if nothing is enabled.
    if (false === highlight_and_share.show_twitter && false === highlight_and_share.show_facebook && false === highlight_and_share.show_linkedin && false === highlight_and_share.show_ok && false === highlight_and_share.show_vk && false === highlight_and_share.show_pinterest && false === highlight_and_share.show_email) {
      return;
    }

    // Remove any existing visible interfaces/containers.
    hasRemoveVisibleElements();
  };
  // Get JS Content and return if not set.
  var jsContent = HAS.content;
  if ('' === jsContent) {
    return;
  }

  // Set variables.
  var prefix = HAS.prefix;
  var suffix = HAS.suffix;

  // Get all elements matching jsContent. Return if nothing is found.
  var elements = document.querySelectorAll(jsContent);
  if (null === elements) {
    return;
  }

  // Loop through elements and set up mouseup event.
  elements.forEach(function (element) {
    element.addEventListener('mouseup', function (event) {
      var _elementParent$datase, _elementParent$datase2, _elementParent$datase3;
      // Remove any visible elements.
      hasRemoveVisibleElements();

      // Get selected text.
      var selection = window.getSelection();
      var selectedText = selection.toString().trim();
      if ('' === selectedText) {
        return;
      }

      // Get closest parent container.
      var elementParent = event.target.closest('.has-content-area');

      // Get data attributes.
      var href = (_elementParent$datase = elementParent.dataset.url) !== null && _elementParent$datase !== void 0 ? _elementParent$datase : window.location.href;
      var title = (_elementParent$datase2 = elementParent.dataset.title) !== null && _elementParent$datase2 !== void 0 ? _elementParent$datase2 : document.title;
      var hashtags = (_elementParent$datase3 = elementParent.dataset.hashtags) !== null && _elementParent$datase3 !== void 0 ? _elementParent$datase3 : '';

      // Display Highlight and Share.
      hasDisplay(selectedText, title, href, hashtags, event);
    });
  });
})();
/******/ })()
;
//# sourceMappingURL=highlight-and-share.js.map