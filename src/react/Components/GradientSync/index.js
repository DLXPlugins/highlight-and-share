/**
 * Color Picker.
 *
 * Credit: Forked from @generateblocks
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

import {
	BaseControl,
	Button,
} from '@wordpress/components';

const HASGradientSync = ( props ) => {
	const {
		label,
		attributes,
		setAttributes,
	} = props;

	const { backgroundGradient, backgroundGradientSync } = attributes;

	useEffect( () => {
		if ( backgroundGradientSync ) {
			setAttributes( {
				backgroundGradientHover: backgroundGradient,
			} );
		}
	}, [ backgroundGradient, backgroundGradientSync ] );

	return (
		<BaseControl className="has-component-gradient-sync-wrapper">
			<h3>{ label }</h3>
			<Button
				className="has-component-gradient-sync"
				label={ __( 'Sync Background Gradients', 'highlight-and-share' ) }
				icon={ backgroundGradientSync ? 'admin-links' : 'editor-unlink' }
				onClick={ () => {
					setAttributes( {
						backgroundGradientSync: ! backgroundGradientSync,
					} );
				} }
				variant={ backgroundGradientSync ? 'primary' : 'secondary' }
			/>
		</BaseControl>
	);
};

HASGradientSync.defaultProps = {
	label: __( 'Gradient Color', 'highlight-and-share' ),
	attributes: {},
	setAttributes: () => {},
};

HASGradientSync.propTypes = {
	label: PropTypes.string.isRequired,
	attributes: PropTypes.object.isRequired,
	setAttributes: PropTypes.func.isRequired,
};

export default HASGradientSync;
