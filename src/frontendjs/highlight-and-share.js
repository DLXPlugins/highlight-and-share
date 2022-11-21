( function() {
	'use strict';

	// Get localized var.
	const HAS = highlight_and_share;
	/**
	 * Determine if an element is visible or not.
	 *
	 * @param {Element} element The element to check if visible or not.
	 * @return {boolean} true if visible, false if not.
	 */
	const isVisible = ( element ) => {
		const style = window.getComputedStyle( element );
		return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
	};

	/**
	 * Remove any visible HAS containers.
	 */
	const hasRemoveVisibleElements = () => {
		const hasContainers = document.querySelectorAll( '.highlight-and-share-wrapper' );
		if ( null !== hasContainers ) {
			// Remove visible containers from dom.
			hasContainers.forEach( ( container ) => {
				if ( isVisible( container ) ) {
					container.remove();
				}
			} );
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
	const hasDisplay = ( text, title, href, hashtags, event ) => {

		// Do not show the interface if nothing is enabled.
		if ( false === highlight_and_share.show_twitter && false === highlight_and_share.show_facebook && false === highlight_and_share.show_linkedin && false === highlight_and_share.show_ok && false === highlight_and_share.show_vk && false === highlight_and_share.show_pinterest && false === highlight_and_share.show_email ) {
			return;
		}

		// Remove any existing visible interfaces/containers.
		hasRemoveVisibleElements();

		
	};
	// Get JS Content and return if not set.
	const jsContent = HAS.content;
	if ( '' === jsContent ) {
		return;
	}

	// Set variables.
	const prefix = HAS.prefix;
	const suffix = HAS.suffix;

	// Get all elements matching jsContent. Return if nothing is found.
	const elements = document.querySelectorAll( jsContent );
	if ( null === elements ) {
		return;
	}

	// Loop through elements and set up mouseup event.
	elements.forEach( ( element ) => {
		element.addEventListener( 'mouseup', ( event ) => {
			// Remove any visible elements.
			hasRemoveVisibleElements();

			// Get selected text.
			const selection = window.getSelection();
			const selectedText = selection.toString().trim();

			if ( '' === selectedText ) {
				return;
			}

			// Get closest parent container.
			const elementParent = event.target.closest( '.has-content-area' );

			// Get data attributes.
			const href = elementParent.dataset.url ?? window.location.href;
			const title = elementParent.dataset.title ?? document.title;
			const hashtags = elementParent.dataset.hashtags ?? '';

			// Display Highlight and Share.
			hasDisplay( selectedText, title, href, hashtags, event );
		} );
	} );
}() );
