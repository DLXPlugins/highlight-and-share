/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./src/frontendjs/highlight-and-share.js ***!
  \***********************************************/
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
(function () {
  'use strict';

  // Get localized var.
  var HAS = highlight_and_share;

  // Set variables.
  var prefix = HAS.prefix;
  var suffix = HAS.suffix;
  var currentElement = null;

  // Main HAS container in the footer. If ".highlight-and-share-wrapper" doesn't have this parent, it is a clone.
  var hasContainer = document.querySelector('#has-highlight-and-share');
  if (null === hasContainer) {
    return;
  }
  var socialNetworks = '.has_whatsapp, .has_facebook, .has_twitter, .has_copy, .has_email, .has_reddit, .has_telegram, .has_linkedin, .has_xing, .has_signal, .has_vk';

  // Get highlight and share container dimensions.
  var hasSharingIconsContainer = hasContainer.querySelector('.highlight-and-share-wrapper');

  // Populate container dimensions/width/height.
  var rect = hasSharingIconsContainer.getBoundingClientRect();
  var hasSharerWidth = rect.width;
  var hasSharerHeight = rect.height;

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
        // If the container is a clone, remove it. (doesn't have the parent "#has-highlight-and-share").
        if (null === container.closest('#has-highlight-and-share')) {
          container.remove();
        }
      });
    }
  };

  /**
   * Replace attributes of element and child elements.
   *
   * @param {Element} element  The element to replace attributes on with child social networks.
   * @param {string}  url      The URL of the post/page.
   * @param {string}  title    The title of the post/page.
   * @param {string}  text     Text that is selected or to be shared
   * @param {string}  hashtags Hashtags present on the post/page.
   *
   * @return {Element} The element with replaced attributes.
   *
   */
  var hasVariableReplace = function hasVariableReplace(element, url, title, text, hashtags) {
    var queryElements = element.querySelectorAll(socialNetworks);
    if (null === queryElements) {
      return element;
    }

    // Loop through elements.
    queryElements.forEach(function (el) {
      // Replace attributes in URL.
      var elementAnchor = el.querySelector('a');
      var elementUrl = elementAnchor.getAttribute('href');
      elementUrl = elementUrl.replace('%url%', encodeURIComponent(url));
      elementUrl = elementUrl.replace('%username%', encodeURIComponent(HAS.twitter_username));
      elementUrl = elementUrl.replace('%title%', encodeURIComponent(title));
      elementUrl = elementUrl.replace('%text%', encodeURIComponent(text));
      elementUrl = elementUrl.replace('%hashtags%', encodeURIComponent(hashtags));
      elementUrl = elementUrl.replace('%prefix%', encodeURIComponent(prefix));
      elementUrl = elementUrl.replace('%suffix%', encodeURIComponent(suffix));
      elementAnchor.setAttribute('href', elementUrl);

      // Replace the title data attribute.
      var title_attr = el.getAttribute('data-title');
      if (null !== title_attr) {
        title_attr = title_attr.replace('%title%', encodeURIComponent(title));
        el.setAttribute('data-title', title_attr);
      }

      // Replace the url data attribute.
      var url_attr = el.getAttribute('data-url');
      if (null !== url_attr) {
        url_attr = url_attr.replace('%url%', encodeURIComponent(url));
        el.setAttribute('data-url', url_attr);
      }
    });
  };

  /**
   * Display the Highlight and Share Interface.
   *
   * @param {string}  text           Text that is selected or to be shared.
   * @param {string}  title          The title of the post/page.
   * @param {string}  href           The URL of the post/page.
   * @param {string}  hashtags       Hashtags present on the post/page.
   * @param {string}  type           The type of display (selection|inline|cta).
   * @param {element} triggerElement The event initiator (null if no trigger element).
   */
  var hasDisplay = function hasDisplay(text, title, href, hashtags, type) {
    var triggerElement = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
    // Do not show the interface if nothing is enabled.
    if (false === highlight_and_share.show_twitter && false === highlight_and_share.show_facebook && false === highlight_and_share.show_linkedin && false === highlight_and_share.show_ok && false === highlight_and_share.show_vk && false === highlight_and_share.show_pinterest && false === highlight_and_share.show_email) {
      return;
    }

    // Remove any existing visible interfaces/containers.
    hasRemoveVisibleElements();

    // Get interface clone.
    var hasClone = hasContainer.querySelector('.highlight-and-share-wrapper').cloneNode(true);
    // Style the interface via inline styles and position.
    hasClone.style.display = 'block';
    hasClone.style.position = 'absolute';
    hasClone.style.width = 'auto';
    hasClone.style.height = 'auto';
    hasClone.style['z-index'] = 10000;
    hasVariableReplace(hasClone, href, title, text, hashtags); // Replaced by reference.

    // Add to the end of the body element.
    document.body.appendChild(hasClone);
    switch (type) {
      case 'selection':
        // Position the interface.
        setHasContainerPositionSelection(hasClone);
        break;
      case 'inline':
        // Position the interface.
        setHasContainerPositionInline(hasClone, triggerElement);
        break;
      case 'cta':
        // Position the interface.
        setHasContainerPositionCta(hasClone, triggerElement);
        break;
    }

    // Setup event handlers for links (for desktop).
    var queryElements = document.querySelector('body').querySelectorAll('.has_whatsapp, .has_facebook, .has_twitter, .has_telegram, .has_linkedin, .has_xing');
    if (null !== queryElements) {
      // Add click listeners to visible elements.
      queryElements.forEach(function (el) {
        if (isVisible(el)) {
          el.querySelector('a').addEventListener('click', function (event) {
            event.preventDefault();

            // Get the URL.
            var url = el.querySelector('a').getAttribute('href');
            window.open(url, 'Highlight and Share', 'width=575,height=430,toolbar=false,menubar=false,location=false,status=false');
          });
        }
      });
    }

    // Set up copy event.
    var copyButtons = document.querySelectorAll('.has_copy');
    if (null !== copyButtons) {
      copyButtons.forEach(function (el) {
        if (isVisible(el)) {
          el.addEventListener('click', function (event) {
            event.preventDefault();
            var copyBlob = new Blob([text], {
              type: 'text/plain'
            });
            var data = [new ClipboardItem(_defineProperty({}, copyBlob.type, copyBlob))];
            navigator.clipboard.write(data);
          });
        }
      });
    }

    // Todo - set up email event.
  };

  /**
   * Set the Social Sharer container position for the current selection. This needs to run after cloned element has been appended to the dom.
   *
   * @param {element} element The cloned social sharer element.
   */
  var setHasContainerPositionSelection = function setHasContainerPositionSelection(element) {
    // Get the dimensions of the window.
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Get the dimensions and location of the selection.
    var selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    var selectionTop = selectionRect.top; // top position relative to view port.
    var selectionLeft = selectionRect.left; // left position relative to view port.
    var selectionWidth = selectionRect.width;
    var selectionHeight = selectionRect.height;

    // Set container width to smaller than window width if larger.
    if (element.offsetWidth > windowWidth) {
      element.style.maxWidth = windowWidth - 20 + 'px';
      element.classList.add('has-no-margin-bottom');
    }

    // Get the dimensions of the click to share container.
    var hasCloneRect = element.getBoundingClientRect();
    var hasCloneWidth = hasCloneRect.width;
    var hasCloneHeight = hasCloneRect.height;

    // Get the X position of where the HAS Sharer inteface should be displayed.
    var hasSharerX = selectionLeft + window.scrollX + selectionWidth / 2 - hasCloneWidth / 2;
    // Get the Y position of where the HAS Sharer inteface should be displayed.
    var hasSharerY = selectionTop + window.scrollY - hasCloneHeight - 15;

    // Determine if hasSharerX is outside of view.
    element.classList.add('has-no-margin-bottom');
    if (hasSharerX < 0) {
      // If so, set to 0.
      element.style.left = '15px';
    } else if (hasSharerX + hasSharerWidth > windowWidth) {
      // If so, set to windowWidth - hasSharerWidth.
      element.style.right = '15px';
    } else {
      // Otherwise, set to hasSharerX.
      element.style.left = hasSharerX + 'px';
      element.classList.remove('has-no-margin-bottom');
    }

    // Set the left,top CSS in the clone.
    element.style.top = hasSharerY + 'px';
  };

  /**
   * Set the Social Sharer container position for the inline highlighter. This needs to run after cloned element has been appended to the dom.
   *
   * @param {element} element        The cloned social sharer element.
   * @param {element} triggerElement The event initiator (null if no trigger element).
   */
  var setHasContainerPositionInline = function setHasContainerPositionInline(element, triggerElement) {
    // Get the dimensions of the window.
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Get the dimensions and location of the selection.
    var inlineRect = triggerElement.getBoundingClientRect();
    var inlineTop = inlineRect.top; // top position relative to view port.
    var inlineLeft = inlineRect.left; // left position relative to view port.
    var inlineWidth = inlineRect.width;
    var inlineHeight = inlineRect.height;

    // Get the dimensions of the click to share container.
    var hasCloneRect = element.getBoundingClientRect();
    var hasCloneWidth = hasCloneRect.width;
    var hasCloneHeight = hasCloneRect.height;

    // Get the X position of where the HAS Sharer inteface should be displayed.
    var hasSharerX = inlineLeft + window.scrollX + inlineWidth / 2 - hasCloneWidth / 2;
    // Get the Y position of where the HAS Sharer inteface should be displayed.
    var hasSharerY = inlineTop + window.scrollY - hasCloneHeight - 15;

    // Determine if hasSharerX is outside of view.
    element.classList.add('has-no-margin-bottom');
    if (hasSharerX < 0) {
      // If so, set to 0.
      element.style.left = '15px';
    } else if (hasSharerX + hasSharerWidth > windowWidth) {
      // If so, set to windowWidth - hasSharerWidth.
      element.style.right = '15px';
    } else {
      // Otherwise, set to hasSharerX.
      element.style.left = hasSharerX + 'px';
      element.classList.remove('has-no-margin-bottom');
    }

    // Set the left,top CSS in the clone.
    element.style.top = hasSharerY + 'px';
  };

  /**
   * Set the Social Sharer container position for the inline highlighter. This needs to run after cloned element has been appended to the dom.
   *
   * @param {element} element        The cloned social sharer element.
   * @param {element} triggerElement The event initiator (null if no trigger element).
   */
  var setHasContainerPositionCta = function setHasContainerPositionCta(element, triggerElement) {
    // Get the dimensions of the window.
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    // Get the dimensions and location of the selection.
    var ctaRect = triggerElement.getBoundingClientRect();
    var ctaTop = ctaRect.top; // top position relative to view port.
    var ctaLeft = ctaRect.left; // left position relative to view port.
    var ctaWidth = ctaRect.width;
    var ctaHeight = ctaRect.height;
    console.log(windowWidth);

    // Set container width to smaller than window width if larger.
    if (element.getBoundingClientRect().width > windowWidth) {
      element.style.maxWidth = windowWidth - 20 + 'px';
      element.classList.add('has-no-margin-bottom');
    }

    // Get the dimensions of the click to share container.
    var hasCloneRect = element.getBoundingClientRect();
    var hasCloneWidth = hasCloneRect.width;
    var hasCloneHeight = hasCloneRect.height;

    // Get the X position of where the HAS Sharer inteface should be displayed.
    var hasSharerX = ctaLeft + window.scrollX + ctaWidth / 2 - hasCloneWidth / 2;
    // Get the Y position of where the HAS Sharer inteface should be displayed.
    var hasSharerY = ctaTop + window.scrollY - hasCloneHeight - 15;

    // Determine if hasSharerX is outside of view.
    element.classList.add('has-no-margin-bottom');
    if (hasSharerX < 0) {
      // If so, set to 0.
      element.style.left = '15px';
    } else if (hasSharerX + hasSharerWidth > windowWidth) {
      // If so, set to windowWidth - hasSharerWidth.
      element.style.right = '15px';
    } else {
      // Otherwise, set to hasSharerX.
      element.style.left = hasSharerX + 'px';
      element.classList.remove('has-no-margin-bottom');
    }

    // Set the left,top CSS in the clone.
    element.style.top = hasSharerY + 'px';
  };

  // Begin setting up events.

  // Get JS Content and return if not set.
  var jsContent = HAS.content;
  if ('' === jsContent) {
    return;
  }

  // Get all elements matching jsContent. Set up events.
  var elements = document.querySelectorAll(jsContent);
  if (null !== elements) {
    /**
     * Handle touch/click events for select (mouseup) events.
     *
     * @param {event} event The original event.
     */
    var hasHandleSelectEvents = function hasHandleSelectEvents(event) {
      var _elementParent$datase, _elementParent$datase2, _elementParent$datase3;
      // Remove any visible elements.
      hasRemoveVisibleElements();

      // Get selection.
      var selection = document.defaultView.getSelection();

      // Get the selected text.
      var selectedText = selection.toString().trim();
      if ('' === selectedText) {
        return;
      }

      // Exit early if the element selection is the same and the sharing interface is visible (works like a toggle).
      if (selection === currentElement) {
        currentElement = null;
        return;
      }
      currentElement = selection;

      // Get closest parent container.
      var elementParent = event.target.closest('.has-content-area');

      // Get data attributes.
      var href = (_elementParent$datase = elementParent.dataset.url) !== null && _elementParent$datase !== void 0 ? _elementParent$datase : window.location.href;
      var title = (_elementParent$datase2 = elementParent.dataset.title) !== null && _elementParent$datase2 !== void 0 ? _elementParent$datase2 : document.title;
      var hashtags = (_elementParent$datase3 = elementParent.dataset.hashtags) !== null && _elementParent$datase3 !== void 0 ? _elementParent$datase3 : '';

      // Display Highlight and Share.
      hasDisplay(selectedText, title, href, hashtags, 'selection');
    };
    // Loop through elements and set up mouseup event.
    elements.forEach(function (element) {
      // element.addEventListener( 'touchcancel', ( event ) => {  // This partially works on Android, but only for the first word. Selections do not work. Android is currently not supported. iOS still works.
      // 	hasHandleSelectEvents( event );
      // } );
      element.addEventListener('mouseup', function (event) {
        hasHandleSelectEvents(event);
      });
    });
  }

  // Get inline elements.
  var inlineElements = document.querySelectorAll('.has-inline-text');
  if (null !== inlineElements) {
    /**
     * Handle touch/click events for inline highlighting.
     *
     * @param {event}   event   The original event.
     * @param {element} element The element the event happened on.
     */
    var hasHandleInlineEvents = function hasHandleInlineEvents(event, element) {
      var _elementParent$datase4, _elementParent$datase5, _elementParent$datase6;
      // Remove any visible elements.
      hasRemoveVisibleElements();

      // Exit early if the element is already visible (works like a toggle).
      if (element === currentElement) {
        currentElement = null;
        return;
      }
      currentElement = element;

      // Get selected text.
      var selectedText = element.innerText.trim();
      if ('' === selectedText) {
        return;
      }

      // Get closest parent container.
      var elementParent = event.target.closest('.has-content-area');

      // Get data attributes.
      var href = (_elementParent$datase4 = elementParent.dataset.url) !== null && _elementParent$datase4 !== void 0 ? _elementParent$datase4 : window.location.href;
      var title = (_elementParent$datase5 = elementParent.dataset.title) !== null && _elementParent$datase5 !== void 0 ? _elementParent$datase5 : document.title;
      var hashtags = (_elementParent$datase6 = elementParent.dataset.hashtags) !== null && _elementParent$datase6 !== void 0 ? _elementParent$datase6 : '';

      // Display Highlight and Share.
      hasDisplay(selectedText, title, href, hashtags, 'inline', element);
    };
    inlineElements.forEach(function (element) {
      // For mobile.
      // element.addEventListener( 'touchend', ( event ) => {
      // 	hasHandleInlineEvents( event, element );
      // } );
      // For mouse and trackpad.
      element.addEventListener('click', function (event) {
        hasHandleInlineEvents(event, element);
      });
    });
  }

  // Get click to share block elements.
  var ctsElements = document.querySelectorAll('.has-click-prompt');
  if (null !== ctsElements) {
    ctsElements.forEach(function (element) {
      element.addEventListener('click', function (event) {
        var _elementParent$datase7, _elementParent$datase8, _elementParent$datase9;
        event.preventDefault();

        // Remove any visible elements.
        hasRemoveVisibleElements();

        // Exit early if the element is already visible (works like a toggle).
        if (element === currentElement) {
          currentElement = null;
          return;
        }
        currentElement = element;

        // Get parent element of prompt.
        var ctsTextElement = element.parentNode.querySelector('.has-click-to-share-text');

        // Get text.
        var selectedText = ctsTextElement.getAttribute('data-text-full');

        // Get closest parent container.
        var elementParent = element.closest('.has-content-area');

        // Get data attributes.
        var href = (_elementParent$datase7 = elementParent.dataset.url) !== null && _elementParent$datase7 !== void 0 ? _elementParent$datase7 : window.location.href;
        var title = (_elementParent$datase8 = elementParent.dataset.title) !== null && _elementParent$datase8 !== void 0 ? _elementParent$datase8 : document.title;
        var hashtags = (_elementParent$datase9 = elementParent.dataset.hashtags) !== null && _elementParent$datase9 !== void 0 ? _elementParent$datase9 : '';

        // Display Highlight and Share.
        hasDisplay(selectedText, title, href, hashtags, 'cta', element.closest('.has-click-to-share-wrapper'));
      });
    });
  }
})();
/******/ })()
;
//# sourceMappingURL=highlight-and-share.js.map