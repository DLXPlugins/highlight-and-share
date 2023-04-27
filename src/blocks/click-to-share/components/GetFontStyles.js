/**
 * Block Functions.
 */
import React from "react";
import useDeviceType from '../../../react/Hooks/useDeviceType';

const GetFontStyles = ( props ) => {
	const [ deviceType ] = useDeviceType( 'Desktop' );
	const fontObject = props.fontObject;
	if ( 'undefined' === typeof fontObject ) {
		return null;
	}
	const fontType = fontObject.desktop.fontType;
	const fontSlug = fontObject.desktop.fontFamilySlug;
	if ( 'google' === fontType ) {
		return (
			<>
				<link
					rel="stylesheet"
					href={ `${ has_gutenberg.cssFolder }/has-gfont-${ fontSlug }.css` }
				/>
			</>
		);
	}
	if ( 'adobe' === fontType ) {
		return (
			<>
				<link
					rel="stylesheet"
					href={ `${ has_gutenberg.adobeFontsUrl }/${ has_gutenberg.adobeProjectId }.css` }
				/>
			</>
		);
	}
	return null;
};
export default GetFontStyles;
