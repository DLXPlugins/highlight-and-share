/**
 * External dependencies
 */

import classnames from 'classnames';

const { useEffect, useState } = wp.element;

const { __ } = wp.i18n;

const { PanelBody, Toolbar, ToolbarDropdownMenu, ToolbarGroup } = wp.components;

const { InspectorControls, RichText, BlockControls, useBlockProps } = wp.blockEditor;

import CircleRed from '../components/icons/circle-red';
import CircleDark from '../components/icons/circle-dark';
import CircleLight from '../components/icons/circle-light';
import CirclePink from '../components/icons/circle-pink';
import CirclePurple from '../components/icons/circle-purple';
import CircleBlue from '../components/icons/circle-blue';

import PaintbrushIcon from '../components/icons/paintbrush';

const HasClickToTweet = ( props ) => {
	// Shortcuts.
	const { attributes, setAttributes } = props;

	const {
		uniqueId,
		show_copy,
		show_permalink,
		template,
		button_style,
		share_text,
		share_text_override,
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
				title={ __( 'Appearance', 'highlight-and-share' ) }
			>
				<div>test</div>
			</PanelBody>
		</>
	);
	return (
		<>
			<InspectorControls>
				{ inspectorControls }
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup
					icon={ <PaintbrushIcon width="24" height="24" fill={ hexCodes[ template ] } /> }
					label={ __( 'Select a Theme', 'highlight-and-share' ) }
					isCollapsed={ true }
					popoverProps={ { className: `has-click-to-tweet-popover ${template}` } }
					controls={ [
						{
							title: __( 'Blue Theme', 'highlight-and-share' ),
							isActive: template === 'blue',
							icon: <CircleBlue width="16" height="16" className={ template === 'blue' ? 'has selected' : '' } />,
							onClick: () => {
								setAttributes( {
									template: 'blue',
								} );
							},
						},
						{
							title: __( 'Dark Theme', 'highlight-and-share' ),
							isActive: template === 'dark',
							icon: <CircleDark width="16" height="16" className={ template === 'dark' ? 'has selected' : '' } />,
							onClick: () => {
								setAttributes( {
									template: 'dark',
								} );
							},
						},
						{
							title: __( 'Light Theme', 'highlight-and-share' ),
							isActive: template === 'light',
							icon: <CircleLight width="16" height="16" className={ template === 'light' ? 'has selected' : '' } />,
							onClick: () => {
								setAttributes( {
									template: 'light',
								} );
							},
						},
						{
							title: __( 'Pink Theme', 'highlight-and-share' ),
							isActive: template === 'pink',
							icon: <CirclePink width="16" height="16" className={ template === 'pink' ? 'has selected' : '' } />,
							onClick: () => {
								setAttributes( {
									template: 'pink',
								} );
							},
						},
						{
							title: __( 'Purple Theme', 'highlight-and-share' ),
							isActive: template === 'purple',
							icon: <CirclePurple width="16" height="16" className={ template === 'purple' ? 'has selected' : '' } />,
							onClick: () => {
								setAttributes( {
									template: 'purple',
								} );
							},
						},
						{
							title: __( 'Red Theme', 'highlight-and-share' ),
							isActive: template === 'red',
							icon: <CircleRed width="16" height="16" className={ template === 'red' ? 'has selected' : '' } />,
							onClick: () => {
								setAttributes( {
									template: 'red',
								} );
							},
						},
					] }
				/>
			</BlockControls>
			<div className={ classnames( 'has-click-to-share' ) }>
				<div className="has-click-to-tweet-wrapper">
					<RichText
						tagName="div"
						placeholder={ __( 'Add text to share', 'highlight-and-share' ) }
						value={ share_text }
						preserveWhiteSpace={ true }
						className="has-click-to-tweet-text"
						allowedFormats={ [ 'core/bold', 'core/italic', 'core/text-color', 'core/subscript', 'core/superscript', 'core/strikethrough', 'core/link' ] }
						onChange={ ( value ) => {
							setAttributes( { share_text: value } );
						} }
					/>
				</div>
			</div>
		</>
	);
};

export default HasClickToTweet;
