import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BeatLoader from 'react-spinners/BeatLoader';
import { __ } from '@wordpress/i18n';

const override = {
	display: 'block',
};

const Loader = ( props ) => {
	const [ loading, setLoading ] = useState( true );
	const [ color, setColor ] = useState( props.color );

	const { title, description, label, size } = props;

	/**
	 * Get the desired loader.
	 *
	 * @return {Object} The loader.
	 */
	const getLoader = () => {
		return (
			<BeatLoader
				color={ color }
				loading={ loading }
				cssOverride={ override }
				size={ 25 }
				speedMultiplier={ 0.65 }
			/>
		);
	};

	return (
		<>
			<div className="has-admin-content-wrapper">
				<div className="has-admin-content-panel">
					<div className="has-admin-content-heading">
						<h1>
							<span className="has-admin-content-heading-text">{ title }</span>
						</h1>
					</div>
					<div className="has-admin-content-body">
						<div className="has-admin-component-row">{ getLoader() }</div>
					</div>
				</div>
			</div>
		</>
	);
};

Loader.defaultProps = {
	title: '',
	description: '',
	label: __( 'Loading…', 'highlight-and-share' ),
	hasWrapper: false,
	size: 60,
};

Loader.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	hasWrapper: PropTypes.bool,
	label: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
};

export default Loader;
