import React from 'react';
const { escapeEditableHTML } = wp.escapeHtml;
import useDeviceType from '../../../react/Hooks/useDeviceType';
import { buildDimensionsCSS } from '../../../react/Utils/DimensionsHelper';
import {
	geHierarchicalPlaceholderValue,
	getHierarchicalValueUnit,
} from '../../../react/Utils/TypographyHelper';

const GetStyles = ( props ) => {
	const { attributes, isPreview } = props;

	const [ deviceType ] = useDeviceType( 'Desktop' );

	const {
		backgroundType,
		backgroundColor,
		backgroundColorHover,
		backgroundGradient,
		backgroundGradientHover,
		backgroundImage,
		textColor,
		textColorHover,
		shareTextColor,
		shareTextColorHover,
		borderColor,
		iconColor,
		iconColorHover,
		borderColorHover,
		clickShareFontSize,
		maximumWidth,
		marginSize,
		paddingSize,
		borderWidth,
		borderRadiusSize,
		uniqueId,
		typographyQuote,
		typographyShareText,
		iconSizeResponsive,
		showClickToShareText,
	} = attributes;
	const screenSize = deviceType.toLowerCase();
	const styles = `
		#${ uniqueId }.has-click-to-share {
			margin: ${ buildDimensionsCSS( marginSize, deviceType ) };
			border-radius: ${ buildDimensionsCSS( borderRadiusSize, deviceType ) };
			border-style: solid;
			border-width: ${ buildDimensionsCSS( borderWidth, deviceType ) };
			max-width: ${ geHierarchicalPlaceholderValue( maximumWidth, screenSize, maximumWidth[ screenSize ].width, 'maxWidth' ) }${ geHierarchicalPlaceholderValue( maximumWidth, screenSize, maximumWidth[ screenSize ].unit, 'maxWidth' ) };
			overflow: hidden;
		}
		#${ uniqueId }.has-click-to-share .has-click-to-share-cta,
		#${ uniqueId }.has-click-to-share .has-click-to-share-text {
			position: relative;
			z-index: 2;
		}
		#${ uniqueId }.has-click-to-share .has-click-to-share-wrapper {
			position: relative;
			padding: ${ buildDimensionsCSS( paddingSize, deviceType ) };
			font-size: ${ clickShareFontSize }px;
		}
		#${ uniqueId }.has-click-to-share.has-background-color {
			background-color: ${ backgroundColor };
		}
		#${ uniqueId }.has-click-to-share.has-background-color:hover {
			background-color: ${ backgroundColorHover };
		}
		#${ uniqueId }.has-click-to-share.has-background-gradient {
			background-image: ${ backgroundGradient };
		}
		#${ uniqueId }.has-click-to-share.has-background-gradient:hover {
			background-image: ${ backgroundGradientHover };
		}
		#${ uniqueId }.has-click-to-share {
			border-color: ${ borderColor };
		}
		#${ uniqueId }.has-click-to-share:hover {
			border-color: ${ borderColorHover };
		}
		
		#${ uniqueId } .has-click-to-share-cta {
			color: ${ shareTextColor };
		}
		#${ uniqueId }:hover .has-click-to-share-cta {
			color: ${ shareTextColorHover };
		}
		#${ uniqueId } .has-click-to-share-text,
		#${ uniqueId } .has-click-to-share-text p {
			color: ${ textColor };
		}
		#${ uniqueId }:hover .has-click-to-share-text,
		#${ uniqueId }:hover .has-click-to-share-text p {
			color: ${ textColorHover };
		}
		#${ uniqueId } .has-click-to-share-cta svg {
			color: ${ iconColor };
			width: ${ iconSizeResponsive[ deviceType.toLowerCase() ] }px;
		}
		#${ uniqueId }:hover .has-click-to-share-cta svg {
			color: ${ iconColorHover };
		}
		#${ uniqueId } .has-click-to-share-text,
		#${ uniqueId } .has-click-to-share-text p {
			font-family: "${ typographyQuote.desktop.fontFamily }";
			font-weight: ${ geHierarchicalPlaceholderValue(
		typographyQuote,
		screenSize,
		typographyQuote[ screenSize ].fontWeight,
		'fontWeight'
	) };
			font-size: ${
	geHierarchicalPlaceholderValue(
		typographyQuote,
		screenSize,
		typographyQuote[ screenSize ].fontSize,
		'fontSize'
	) +
				getHierarchicalValueUnit(
					typographyQuote,
					screenSize,
					typographyQuote[ screenSize ].fontSizeUnit,
					'fontSizeUnit'
				)
};
			line-height: ${
	geHierarchicalPlaceholderValue(
		typographyQuote,
		screenSize,
		typographyQuote[ screenSize ].lineHeight,
		'lineHeight'
	) +
				getHierarchicalValueUnit(
					typographyQuote,
					screenSize,
					typographyQuote[ screenSize ].lineHeightUnit,
					'lineHeightUnit'
				)
};
			letter-spacing: ${
	geHierarchicalPlaceholderValue(
		typographyQuote,
		screenSize,
		typographyQuote[ screenSize ].letterSpacing,
		'letterSpacing'
	) +
				getHierarchicalValueUnit(
					typographyQuote,
					screenSize,
					typographyQuote[ screenSize ].letterSpacingUnit,
					'letterSpacingUnit'
				)
};
			text-transform: ${ geHierarchicalPlaceholderValue(
		typographyQuote,
		screenSize,
		typographyQuote[ screenSize ].textTransform,
		'textTransform'
	) };
		}
		#${ uniqueId } .has-click-to-share-cta,
		#${ uniqueId } .has-click-to-share-cta p {
			font-family: "${ typographyShareText.desktop.fontFamily }";
			font-weight: ${ geHierarchicalPlaceholderValue(
		typographyShareText,
		screenSize,
		typographyShareText[ screenSize ].fontWeight,
		'fontWeight'
	) };
			font-size: ${
	geHierarchicalPlaceholderValue(
		typographyShareText,
		screenSize,
		typographyShareText[ screenSize ].fontSize,
		'fontSize'
	) +
				getHierarchicalValueUnit(
					typographyShareText,
					screenSize,
					typographyShareText[ screenSize ].fontSizeUnit,
					'fontSizeUnit'
				)
};
			line-height: ${
	geHierarchicalPlaceholderValue(
		typographyShareText,
		screenSize,
		typographyShareText[ screenSize ].lineHeight,
		'lineHeight'
	) +
				getHierarchicalValueUnit(
					typographyShareText,
					screenSize,
					typographyShareText[ screenSize ].lineHeightUnit,
					'lineHeightUnit'
				)
};
			letter-spacing: ${
	geHierarchicalPlaceholderValue(
		typographyShareText,
		screenSize,
		typographyShareText[ screenSize ].letterSpacing,
		'letterSpacing'
	) +
				getHierarchicalValueUnit(
					typographyShareText,
					screenSize,
					typographyShareText[ screenSize ].letterSpacingUnit,
					'letterSpacingUnit'
				)
};
			text-transform: ${ geHierarchicalPlaceholderValue(
		typographyShareText,
		screenSize,
		typographyShareText[ screenSize ].textTransform,
		'textTransform'
	) };
		}
	`;

	let backgroundImageStyles = '';
	if ( 'image' === backgroundType ) {
		backgroundImageStyles = `
		#${ uniqueId }.has-click-to-share.has-background-image {
			background-color: ${ backgroundImage.backgroundColor };
		}
		#${ uniqueId }.has-click-to-share.has-background-image .has-click-to-share-wrapper:after{
			display: block;
			content: '';
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			background-image: url('${ decodeURIComponent(
		encodeURIComponent( backgroundImage.url )
	) } ');
			background-position: ${ escapeEditableHTML( backgroundImage.backgroundPosition ) };
			background-repeat: ${ escapeEditableHTML( backgroundImage.backgroundRepeat ) };
			background-size: ${ escapeEditableHTML( backgroundImage.backgroundSize ) };
			opacity: ${ parseFloat( backgroundImage.backgroundOpacity ) };
		}
		#${ uniqueId }.has-click-to-share.has-background-image .has-click-to-share-wrapper:hover:after {
			opacity: ${ parseFloat( backgroundImage.backgroundOpacityHover ) };
		}
		`;
	}
	let previewStyles = '';
	if ( isPreview) {
		previewStyles = `
			#${ uniqueId }.has-click-to-share p {
				font-size: 12px;
			}
			#${ uniqueId }.has-click-to-share .has-click-to-share-cta {
				font-size: 12px;
			}
			#${ uniqueId }.has-click-to-share .has-click-to-share-cta svg {
				width: 12px !important;
				height: 12px !important;
			}
		`;
	}
	return (
		<>
			<style>{ styles }</style>
			{ 'image' === backgroundType && <style>{ backgroundImageStyles }</style> }
			{ isPreview && <style>{ previewStyles }</style> }
		</>
	);
};
export default GetStyles;
