import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
const { useInnerBlocksProps, RichText, store } = wp.blockEditor;
import { useDispatch } from '@wordpress/data';

import { rawHandler } from '@wordpress/blocks';

import GetFontStyles from './GetFontStyles';
import GetStyles from './GetStyles';
import useDeviceType from '../../../react/Hooks/useDeviceType';

const BlockContent = ( props ) => {
	const { attributes, setAttributes, isPreview, clientId } = props;

	const [ deviceType ] = useDeviceType( 'Desktop' );

	const innerBlocksRef = useRef( null );

	const { replaceInnerBlocks } =
		useDispatch( store );

	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'has-click-to-share-text has-click-to-share__share-text',
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: [ 'core/paragraph' ],
			template: [ [ 'core/paragraph', { placeholder: '' } ] ],
		}
	);
	const [ isBlockPreview ] = useState( isPreview ?? false );

	const {
		shareText,
		backgroundType,
		showClickToShare,
		showIcon,
		iconSize,
		clickText,
		uniqueId,
		typographyQuote,
		typographyShareText,
		showClickToShareText,
		showClickToShareIcon,
	} = attributes;

	/**
	 * Migrate RichText to InnerBlocks.
	 */
	useEffect( () => {
		// Port shareText attribute to use innerBlocks instead.
		if ( shareText !== '' && null !== innerBlocksRef.current && ! isBlockPreview ) {
			// Convert text over to blocks.
			const richTextConvertedToBlocks = rawHandler( { HTML: shareText } );
			replaceInnerBlocks( clientId, richTextConvertedToBlocks );
			setAttributes( { shareText: '' } );
		}
	}, [ innerBlocksRef ] );

	return (
		<>
			{ <GetFontStyles fontObject={ typographyQuote } /> }
			{ <GetFontStyles fontObject={ typographyShareText } /> }
			{ <GetStyles attributes={ attributes } isPreview={ isBlockPreview } /> }
			<div
				className={ classnames( 'has-click-to-share', {
					'has-background-color': 'solid' === backgroundType,
					'has-background-gradient': 'gradient' === backgroundType,
					'has-background-image': 'image' === backgroundType,
				} ) }
				id={ uniqueId }
			>
				<div className="has-click-to-share-wrapper">

					{ isBlockPreview && (
						<>
							<div className="has-click-to-share-text has-click-to-share__share-text">
								<p>Vivamus commodo nunc arcu, finibus cursus felis porta a. Nam ultrices, turpis eu fringilla molestie, lorem libero.</p>
							</div>
						</>
					) }
					{ ! isBlockPreview && (
						<>
							<div { ...innerBlockProps } />
						</>
					) }
					<div className="has-click-to-share-cta">
						{ ( showClickToShareText[ deviceType.toLowerCase() ] || isBlockPreview ) && <>{ clickText } </> }
						{ ( showClickToShareIcon[ deviceType.toLowerCase() ] || isBlockPreview ) && (
							<svg
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="share-alt"
								className="svg-inline--fa fa-share-alt fa-w-14"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
								></path>
							</svg>
						) }
					</div>
				</div>
			</div>
		</>
	);
};
export default BlockContent;
