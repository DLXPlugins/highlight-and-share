/* eslint-disable camelcase */
/**
 * External dependencies
 */

import classnames from 'classnames';
import twttr from '../validation/twitter';
import IconCircle from '../components/icons/Circle';
import UnitChooser from '../components/unit-picker';
import TwitterIcon from '../components/icons/twitter';
import PaintbrushIcon from '../components/icons/paintbrush';
import PreviewIcon from '../components/icons/Preview';
import EllipsisIcon from '../components/icons/Ellipsis';
import AlignmentGroup from '../components/alignment';
import CircularCount from '../components/CircularCount';
import LineCount from '../components/LineCount';

const { useEffect, useState } = wp.element;

const { createHooks } = wp.hooks;

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	ToolbarGroup,
	ToolbarButton,
	Toolbar,
	Popover,
	ToggleControl,
	TextControl,
	TextareaControl,
	Button,
	TabPanel,
	FormTokenField,
	RangeControl,
	RadioControl,
} = wp.components;

const { InspectorControls, RichText, BlockControls } = wp.blockEditor;

const HasClickToTweet = ( props ) => {
	// State.
	const [ editTweetPopoverVisible, setEditTweetPopoverVisible ] = useState( false );
	const [ isPreview, setIsPreview ] = useState( false );
	const [ tweetCharacterTotal, setTweetCharacterTotal ] = useState( 0 );

	// Shortcuts.
	const { attributes, setAttributes } = props;

	const {
		uniqueId,
		show_copy,
		show_permalink,
		template,
		hashtags,
		twitter_username,
		button_style,
		share_text,
		share_text_override,
		share_text_override_enabled,
		share_button_text,
		maximum_width,
		maximum_width_unit,
		tweet_button_alignment,
		tweet_icon_alignment,
		rtl,
		tweet_button_display,
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

	useEffect( () => {
		countCharacters();
	}, [ twitter_username, share_text, share_text_override, hashtags, share_text_override_enabled ] );

	/**
	 * Count  the characters including text, links, hashtags, and mentions.
	 */
	const countCharacters = () => {

		// Begin adding text entered.
		let tweetContent = '';

		// Get main tweet text.
		if ( share_text_override_enabled ) {
			tweetContent += share_text_override;
		} else {
			tweetContent += share_text;
		}
		tweetContent += '\r\n';

		// Add hashtags.
		hashtags.forEach( ( hashtag ) => {
			hashtag = '#' + hashtag + ' ';
			tweetContent += hashtag;
		} );
		tweetContent += '\r\n';

		// Add via.
		if ( twitter_username.length > 0 ) {
			tweetContent += 'Via ';
			tweetContent += twitter_username;
		}

		// Todo - Add URL.
		setTweetCharacterTotal( twttr.txt.getTweetLength( tweetContent ) );
	};

	const getCharacterBar = () => {
		return (
			<LineCount chars={ tweetCharacterTotal } />
		);
	};

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

	const getClickToShareButton = () => {
		return (
			<div
				className={ `has-click-to-tweet-button-wrapper  ${ tweet_button_alignment } ` }
			>
				<button
					className={ `has-click-to-tweet-button ${ tweet_button_display } has-button-icon-${ tweet_icon_alignment }` }
					onClick={ ( value ) => {} }
				>
					<>
						{ ( tweet_button_display === 'full' ||
							tweet_button_display === 'text' ) && (
							<span className="has-click-to-tweet-button-text">
								{ share_button_text }
							</span>
						) }
						{ ( tweet_button_display === 'icon' ||
							tweet_button_display === 'full' ) && (
							<span className="has-click-to-tweet-button-icon">
								<TwitterIcon />
							</span>
						) }
					</>
				</button>
			</div>
		);
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
					<UnitChooser
						label={ __( 'Maximum Width', 'highlight-and-share' ) }
						value={ maximum_width_unit }
						units={ [ 'px', 'em', '%' ] }
						onClick={ ( value ) => {
							setAttributes( {
								maximum_width_unit: value,
							} );
						} }
					/>

					<TextControl
						type={ 'number' }
						value={ maximum_width ? maximum_width : '' }
						onChange={ ( value ) => {
							setAttributes( {
								maximum_width: parseFloat( value ),
							} );
						} }
					/>
					<ToggleControl
						label={ __( 'Enable RTL', 'highlight-and-share' ) }
						checked={ rtl }
						onChange={ ( value ) => {
							setAttributes( {
								rtl: value,
							} );
						} }
						help={ __(
							'For right-to-left languages, select this option.',
							'highlight-and-share'
						) }
					/>
				</>
			</PanelBody>
			<PanelBody
				initialOpen={ true }
				title={ __( 'Click to Tweet Button', 'highlight-and-share' ) }
			>
				<PanelRow>
					<AlignmentGroup
						label={ __( 'Button Alignment', 'highlight-and-share' ) }
						alignment={ tweet_button_alignment }
						onClick={ ( value ) => {
							setAttributes( { tweet_button_alignment: value } );
						} }
					/>
				</PanelRow>
				{ tweet_button_display === 'full' &&
					<PanelRow>
						<AlignmentGroup
							label={ __( 'Icon Alignment', 'highlight-and-share' ) }
							alignment={ tweet_icon_alignment }
							onClick={ ( value ) => {
								setAttributes( { tweet_icon_alignment: value } );
							} }
							centerOn={ false }
						/>
					</PanelRow>
				}
				<PanelRow className="has-sidebar-button-options">
					<RadioControl
						label={ __( 'Button Options', 'highlight-and-share' ) }
						selected={ tweet_button_display }
						options={ [
							{ label: __( 'Text Only', 'highlight-and-share' ), value: 'text' },
							{ label: __( 'Icon Only', 'highlight-and-share' ), value: 'icon' },
							{ label: __( 'Text and Icon', 'highlight-and-share' ), value: 'full' },
						] }
						onChange={ ( value ) => {
							setAttributes( {
								tweet_button_display: value,
							} );
						} }
					/>
				</PanelRow>
			</PanelBody>
		</>
	);
	// Todo - Make this readable via JSON.
	let toolbarThemes = [
		{
			title: __( 'Blue Theme', 'highlight-and-share' ),
			isActive: template === 'blue',
			icon: (
				<IconCircle
					height="16"
					width="16"
					hexColor={ hexCodes.blue }
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
				<IconCircle
					height="16"
					width="16"
					hexColor={ hexCodes.dark }
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
				<IconCircle
					height="16"
					width="16"
					hexColor={ hexCodes.light }
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
				<IconCircle
					height="16"
					width="16"
					hexColor={ hexCodes.pink }
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
				<IconCircle
					height="16"
					width="16"
					hexColor={ hexCodes.purple }
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
				<IconCircle
					height="16"
					width="16"
					hexColor={ hexCodes.red }
					className={ template === 'red' ? 'has selected' : '' }
				/>
			),
			onClick: () => {
				setAttributes( {
					template: 'red',
				} );
			},
		},
	];

	const toolbarPreview = [
		{
			title: __( 'Preview On', 'highlight-and-share' ),
			isActive: isPreview,
			onClick: () => {
				setIsPreview( true );
			},
		},
		{
			title: __( 'Preview Off', 'highlight-and-share' ),
			isActive: ! isPreview,
			onClick: () => {
				setIsPreview( false );
			},
		},
	];

	// Start theme hooks. Find a way through PHP perhaps?
	const toolbarThemeHook = createHooks();
	toolbarThemes = toolbarThemeHook.applyFilters(
		'has_ctt_react_themes',
		toolbarThemes
	); // Allow others to add themes via React.
	return (
		<>
			<link
				href="https://fonts.googleapis.com/css2?family=Lato&family=Open+Sans:ital,wght@0,300;0,400;0,700;1,400&display=swap"
				rel="stylesheet"
			/>
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
						controls={ [ toolbarThemes ] }
					/>
					<ToolbarGroup
						icon={
							<PreviewIcon
								width="24"
								height="24"
								opacity={ isPreview ? 0.8 : 0.4 }
							/>
						}
						label={ __( 'Preview Mode', 'highlight-and-share' ) }
						isCollapsed={ true }
						popoverProps={ {
							className: `has-click-to-tweet-preview-popover ${ template }`,
						} }
						controls={ [ toolbarPreview ] }
					/>
				</>
			</BlockControls>
			<div
				className={ classnames( 'has-click-to-tweet', {
					[ `has-ctt-block-theme-${ template }` ]: true,
				} ) }
			>
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
									<>
										<div className="has-click-to-tweet-wrapper">
											<>
												<div className="has-click-to-tweet-text-wrapper">
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
												{ getClickToShareButton() }
												<span className="has-click-to-tweet-ellipsis">
													<EllipsisIcon />
												</span>
											</>
										</div>
									</>
								);
							} else if ( 'settings' === tab.name ) {
								tabContent = (
									<>
										<ToggleControl
											label={ __(
												'Customize Twitter Content',
												'highlight-and-share'
											) }
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
										{ share_text_override_enabled && (
											<TextareaControl
												label={ __(
													'Custom Tweet Content',
													'highlight-and-share'
												) }
												help={ __(
													'Enter your custom tweet content here if your quote is too long for Twitter'
												) }
												value={ share_text_override }
												onChange={ ( value ) => {
													setAttributes( {
														share_text_override: value,
													} );
												} }
											/>
										) }
										<FormTokenField
											value={ hashtags }
											placeholder={ __(
												'Enter hashtags separated by commas.',
												'highlight-and-share'
											) }
											tokenizeOnSpace={ true }
											label={ __( 'Hashtags', 'highlight-and-share' ) }
											onChange={ ( tokens ) => {
												const filteredTokens = [];
												tokens.forEach( function( item, index ) {
													const replacement = item.replace( '#', '' ); // Strip hashtag symbol.
													const hashtag = twttr.txt.extractHashtags(
														'#' + replacement
													); // Add it back in for extraction.
													// Check if array contains anything.
													if ( typeof hashtag[ 0 ] !== 'undefined' ) {
														filteredTokens.push( hashtag[ 0 ] );
													}
												} );
												setAttributes( { hashtags: filteredTokens } );
											} }
										/>
										<TextControl
											label={ __( 'Tweet Credit (via)', 'highlight-and-share' ) }
											help={ __(
												'Enter the Twitter username you would like to credit. Leave empty for no credit.'
											) }
											value={ twitter_username }
											onChange={ ( value ) => {
												const replacement = value.replace( '@', '' ); // Strip @ symbol.
												if ( value.length > 0 ) {
													const usernames = twttr.txt.extractMentions(
														'@' + replacement
													);
													if ( typeof usernames[ 0 ] !== 'undefined' ) {
														setAttributes( {
															twitter_username: '@' + usernames[ 0 ],
														} );
														return;
													}
												}
												setAttributes( {
													twitter_username: value,
												} );
											} }
										/>
									</>
								);
							}
							return (
								<>
									{ getCharacterBar() }
									{ tabContent }
								</>
							);
						} }
					</TabPanel>
					<div className="has-character-counter">
						<div className="has-characters">
							<CircularCount chars={ tweetCharacterTotal } />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default HasClickToTweet;
