/**
 * BLOCK: Basic with ESNext
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 *
 * Using inline styles - no external stylesheet needed.  Not recommended!
 * because all of these styles will appear in `post_content`.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

// Import JS
import edit from './edit';

export const name = 'has/click-to-tweet';

import hasTwitterIcon from './has-twitter-icon';

/**
 * Register Basic Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'has/click-to-tweet', { // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Highlight and Share: Click to Tweet', 'highlight-and-share' ), // Block title.
	icon: hasTwitterIcon,
	category: 'has', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __(
		'Add Click to Tweet functionality.',
		'highlight-and-share'
	),
	keywords: [
		__( 'highlight', 'highlight-and-share' ),
		__( 'share', 'poost-type-archive-mapping' ),
		__( 'click', 'highlight-and-share' ),
		__( 'tweet', 'highlight-and-share' ),
		__( 'social', 'highlight-and-share' ),
		__( 'twitter', 'highlight-and-share' ),

	],
	supports: {
		anchor: true,
		html: false,
	},
	example: {
		attributes: {
			preview: true,
		},
	},
	edit,

	// Render via PHP
	save() {
		return null;
	},
} );
