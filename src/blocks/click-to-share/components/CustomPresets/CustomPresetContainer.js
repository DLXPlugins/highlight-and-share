import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Spinner,
	Button,
	Modal,
	RadioControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import CustomPresetsContext from './context';
import CustomPresetModal from './CustomPresetModal';

const CustomPresetContainer = ( props ) => {
	const [ loading, setLoading ] = useState( true );
	const [ savingPreset, setSavingPreset ] = useState( false );
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ presetSaveLabel, setPresetSaveLabel ] = useState( '' );
	const { setAttributes, clientId } = props;

	const { savedPresets, setSavedPresets } = useContext( CustomPresetsContext );

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
					setLoading( false );
					// setSavedPresets( json );
				} )
				.catch( ( error ) => {
					setLoading( false );
				} );
		}
	}, [ presetContainer ] );

	/**
	 * Show a loading spinner.
	 *
	 * @param {string} label Label of the loading spinner.
	 * @return {JSX} Loading spinner.
	 */
	const showLoading = ( label ) => {
		return (
			<div className="has-custom-preset-loading-container">
				<span className="has-custom-preset-loading-label">{ label }</span>
				<Spinner />
			</div>
		);
	};
	return (
		<div className="has-custom-preset-container" ref={ presetContainer }>
			{ loading && showLoading( 'Loading Presets' ) }
			{ ! loading && (
				<Button
					variant={ 'primary' }
					onClick={ ( e ) => {
						e.preventDefault();
						setSavingPreset( true );
					} }
					label={ __( 'Save Preset', 'highlight-and-share' ) }
				>
					{ __( 'Save Preset', 'highlight-and-share' ) }
				</Button>
			) }
			{ ( savingPreset || true ) && (
				<CustomPresetModal
					title={ __( 'Save Preset', 'highlight-and-share' ) }
					{ ...props }
				/>
			) }
		</div>
	);
};
export default CustomPresetContainer;
