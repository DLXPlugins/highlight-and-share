/**
 * Gradient Generator (random)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import getRandomGradient from '../../Utils/GetRandomGradient';

import {
	BaseControl,
	Button,
} from '@wordpress/components';

const HASGradientGenerator = ( props ) => {
	const {
		label,
		setAttributes,
	} = props;

	const getGradient = () => {
		const gradient = getRandomGradient();
		setAttributes( {
			backgroundGradient: gradient,
			backgroundGradientHover: gradient,
		} );
	};

	return (
		<BaseControl className="has-component-gradient-generator-wrapper">
			<h3>{ label }</h3>
			<Button
				className="has-component-gradient-generator"
				label={ __( 'Generate Random Gradients', 'highlight-and-share' ) }
				icon="randomize"
				onClick={ () => {
					getGradient();
				} }
				variant="secondary"
			/>
		</BaseControl>
	);
};

HASGradientGenerator.defaultProps = {
	label: __( 'Gradient Color', 'highlight-and-share' ),
	setAttributes: () => {},
};

HASGradientGenerator.propTypes = {
	label: PropTypes.string.isRequired,
	setAttributes: PropTypes.func.isRequired,
};

export default HASGradientGenerator;
