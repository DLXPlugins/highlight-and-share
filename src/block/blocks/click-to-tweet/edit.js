/* eslint-disable camelcase */
/**
 * External dependencies
 */

import classnames from 'classnames';
import twttr from '../validation/twitter';

const { useEffect, useState } = wp.element;

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	ToolbarGroup,
	Popover,
	ToggleControl,
	TextareaControl,
	Button,
	TabPanel,
	FormTokenField,
} = wp.components;

const { InspectorControls, RichText, BlockControls } = wp.blockEditor;

import CircleRed from '../components/icons/circle-red';
import CircleDark from '../components/icons/circle-dark';
import CircleLight from '../components/icons/circle-light';
import CirclePink from '../components/icons/circle-pink';
import CirclePurple from '../components/icons/circle-purple';
import CircleBlue from '../components/icons/circle-blue';
import PaintbrushIcon from '../components/icons/paintbrush';
import TwitterIcon from '../components/icons/twitter';

const HasClickToTweet = ( props ) => {
	// State.
	const [ editTweetPopoverVisible, setEditTweetPopoverVisible ] = useState( false );

	// Shortcuts.
	const { attributes, setAttributes } = props;

	const {
		uniqueId,
		show_copy,
		show_permalink,
		template,
		hashtags,
		button_style,
		share_text,
		share_text_override,
		share_text_override_enabled,
	} = attributes;

	useEffect( () => {
		// Get unique ID for the block. Props @generateblocks.
		const id = props.clientId.substr( 2, 9 ).replace( '-', '' );
		if ( ! attributes.uniqueId ) {
			setAttributes( {
				uniqueId: id,
			} );
		}
	}, [] );

	const toggleEditTweetVisibility = () => {
		setEditTweetPopoverVisible( ! editTweetPopoverVisible );
	};

	const editTweetPopover = () => {
		if ( editTweetPopoverVisible ) {
			return (
				<Popover
					position="left"
					noArrow={ false }
					className="has-tweet-popover"
					expandOnMobile={ true }
				>
					<TextareaControl
						help={ __(
							'If your share text is too long, you can enter your Tweet content here.',
							'highlight-and-share'
						) }
						value={ share_text_override }
						onChange={ ( value ) => {
							setAttributes( {
								share_text_override: value,
							} );
						} }
					/>
				</Popover>
			);
		}
	};

	const editTweetButton = () => {
		return (
			<PanelRow>
				<Button
					className="is-secondary"
					isPressed={ editTweetPopoverVisible }
					showTooltip={ true }
					label={ __(
						'Displays a text box so you can customize the tweet.',
						'highlight-and-share'
					) }
					text={ __( 'Edit Tweet Content', 'highlight-and-share' ) }
					onClick={ () => {
						toggleEditTweetVisibility();
					} }
				/>
				{ editTweetPopover() }
			</PanelRow>
		);
	};

	const hexCodes = {
		light: '#BFBFBF',
		dark: '#2b2926',
		pink: '#cd17cd',
		purple: '#9932cc',
		red: '#d0121c',
		blue: '#0018a8',
	};

	const inspectorControls = (
		<>
			<PanelBody
				initialOpen={ true }
				title={ __( 'Tweet Settings', 'highlight-and-share' ) }
			>
				<>
					<ToggleControl
						label={ __( 'Override Twitter Content', 'highlight-and-share' ) }
						checked={ share_text_override_enabled }
						onChange={ ( value ) => {
							setAttributes( {
								share_text_override_enabled: value,
							} );
						} }
						help={ __(
							'Check this option to override the default sharing text (e.g., the quote is too large for Twitter and you would like to shorten it).',
							'highlight-and-share'
						) }
					/>
					{ editTweetButton() }
				</>
			</PanelBody>
		</>
	);
	return (
		<>
			<InspectorControls>{ inspectorControls }</InspectorControls>
			<BlockControls>
				<>
					<ToolbarGroup
						icon={
							<PaintbrushIcon
								width="24"
								height="24"
								fill={ hexCodes[ template ] }
							/>
						}
						label={ __( 'Select a Theme', 'highlight-and-share' ) }
						isCollapsed={ true }
						popoverProps={ { className: `has-click-to-tweet-popover ${ template }` } }
						controls={ [
							{
								title: __( 'Blue Theme', 'highlight-and-share' ),
								isActive: template === 'blue',
								icon: (
									<CircleBlue
										width="16"
										height="16"
										className={ template === 'blue' ? 'has selected' : '' }
									/>
								),
								onClick: () => {
									setAttributes( {
										template: 'blue',
									} );
								},
							},
							{
								title: __( 'Dark Theme', 'highlight-and-share' ),
								isActive: template === 'dark',
								icon: (
									<CircleDark
										width="16"
										height="16"
										className={ template === 'dark' ? 'has selected' : '' }
									/>
								),
								onClick: () => {
									setAttributes( {
										template: 'dark',
									} );
								},
							},
							{
								title: __( 'Light Theme', 'highlight-and-share' ),
								isActive: template === 'light',
								icon: (
									<CircleLight
										width="16"
										height="16"
										className={ template === 'light' ? 'has selected' : '' }
									/>
								),
								onClick: () => {
									setAttributes( {
										template: 'light',
									} );
								},
							},
							{
								title: __( 'Pink Theme', 'highlight-and-share' ),
								isActive: template === 'pink',
								icon: (
									<CirclePink
										width="16"
										height="16"
										className={ template === 'pink' ? 'has selected' : '' }
									/>
								),
								onClick: () => {
									setAttributes( {
										template: 'pink',
									} );
								},
							},
							{
								title: __( 'Purple Theme', 'highlight-and-share' ),
								isActive: template === 'purple',
								icon: (
									<CirclePurple
										width="16"
										height="16"
										className={ template === 'purple' ? 'has selected' : '' }
									/>
								),
								onClick: () => {
									setAttributes( {
										template: 'purple',
									} );
								},
							},
							{
								title: __( 'Red Theme', 'highlight-and-share' ),
								isActive: template === 'red',
								icon: (
									<CircleRed
										width="16"
										height="16"
										className={ template === 'red' ? 'has selected' : '' }
									/>
								),
								onClick: () => {
									setAttributes( {
										template: 'red',
									} );
								},
							},
						] }
					/>
				</>
			</BlockControls>
			<div className={ classnames( 'has-click-to-tweet' ) }>
				<div className="has-click-to-tweet-tabs">
					<TabPanel
						activeClass="active-tab"
						tabs={ [
							{
								title: __( 'Appearance', 'highlight-and-share' ),
								name: 'appearance',
								className: 'has-tab-appearance',
							},
							{
								title: __( 'Tweet Settings', 'highlight-and-share' ),
								name: 'settings',
								className: 'has-tab-settings',
							},
						] }
					>
						{ ( tab ) => {
							let tabContent;
							if ( 'appearance' === tab.name ) {
								tabContent = (
									<div className="has-click-to-tweet-wrapper">
										<RichText
											tagName="div"
											placeholder={ __(
												'Add text to share',
												'highlight-and-share'
											) }
											value={ share_text }
											preserveWhiteSpace={ true }
											className="has-click-to-tweet-text"
											allowedFormats={ [
												'core/bold',
												'core/italic',
												'core/text-color',
												'core/subscript',
												'core/superscript',
												'core/strikethrough',
												'core/link',
											] }
											onChange={ ( value ) => {
												setAttributes( { share_text: value } );
											} }
										/>
									</div>
								);
							} else if ( 'settings' === tab.name ) {
								tabContent = (
									<>
										<ToggleControl
											label={ __( 'Customize Twitter Content', 'highlight-and-share' ) }
											checked={ share_text_override_enabled }
											onChange={ ( value ) => {
												setAttributes( {
													share_text_override_enabled: value,
												} );
											} }
											help={ __(
												'If your quote is too large for Twitter, you can create custom tweet content here.',
												'highlight-and-share'
											) }
										/>
										<TextareaControl 
											label={ __( 'Custom Tweet Content', 'highlight-and-share' ) }
											help={ __( 'Enter your custom tweet content here if your quote is too long for Twitter' ) }
											value={ share_text_override }
											onChange={ ( value ) => {
												setAttributes( {
													share_text_override: value,
												} );
											} }
										/>
										<FormTokenField 
											value={ hashtags }
											placeholder={ __( 'Enter hashtags separated by commas.', 'highlight-and-share' ) }
											tokenizeOnSpace={ true }
											label={ __( 'Hashtags', 'highlight-and-share' ) }
											onChange={ ( tokens ) => {
												const filteredTokens = [];
												tokens.forEach(function (item, index) {
													const replacement = item.replace( '\#', '' ); // Strip hashtag symbol.
													const hashtag = twttr.txt.extractHashtags( '#' + replacement ); // Add it back in for extraction.
													// Check if array contains anything.
													if ( typeof hashtag[0] !== 'undefined' ) {
														filteredTokens.push( hashtag[0] );
													}
												  });
												setAttributes( { hashtags: filteredTokens } )
											} }
										/>
									</>
								);
							}
							return <div>{ tabContent }</div>;
						} }
					</TabPanel>
				</div>
			</div>
		</>
	);
};

export default HasClickToTweet;
