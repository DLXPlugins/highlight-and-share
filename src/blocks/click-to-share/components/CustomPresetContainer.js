import React, { useRef, useEffect, useState } from 'react';

const CustomPresetContainer = ( props ) => {
	const [ loading, setLoading ] = useState( true );
	const { setAttributes, clientId } = props;

	const presetContainer = useRef( null );

	useEffect( () => {
		if ( presetContainer.current ) {
			// Perform fetch request to ajax endpoint.
			const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
			const data = new FormData();
			data.append( 'action', 'has_load_presets' );
			data.append( 'nonce', has_gutenberg.blockPresetsNonceRetrieve );
			fetch( ajaxUrl, {
				method: 'POST',
				body: data,
				/* get return in json */
				headers: {
					Accept: 'application/json',
				},
			} )
				.then( ( response ) => response.json() )
				.then( ( json ) => {
					console.log( json );
					
				}
				);
		}
	}, [ presetContainer ] );
	return (
		<div
			className="has-custom-preset-container"
			ref={ presetContainer }
		>
			Hello
		</div>
	);
};
export default CustomPresetContainer;
