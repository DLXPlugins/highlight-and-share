import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Spinner,
	Button,
	ButtonGroup,
	Modal,
	RadioControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import CustomPresetsContext from './context';
import CustomPresetSaveModal from './CustomPresetSaveModal';
import PresetButtonEdit from '../PresetButtonEdit';
import CustomPresetEditModal from './CustomPresetEditModal';

const CustomPresetContainer = ( props ) => {
	const [ loading, setLoading ] = useState( true );
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ presetSaveLabel, setPresetSaveLabel ] = useState( '' );
	const { setAttributes, clientId, uniqueId } = props;

	const { savedPresets, setSavedPresets, savingPreset, setSavingPreset, editPresets, setEditPresets, showEditModal, setShowEditModal } = useContext( CustomPresetsContext );

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
					const { presets } = json.data;
					setLoading( false );
					setSavedPresets( presets );
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
	const getSavedPresets = () => {
		if ( savedPresets.length > 0 ) {
			// Map to preset buttons.
			return (
				<div className="has-presets">
					<ButtonGroup>
						{ savedPresets.map( ( preset ) => {
							return (
								<PresetButtonEdit
									key={ preset.id }
									editId={ preset.id }
									title={ preset.title }
									setAttributes={ setAttributes }
									uniqueId={ uniqueId }
									clientId={ clientId }
									slug={ preset.slug }
									attributes={ preset.content }
									saveNonce={ preset.save_nonce }
									deleteNonce={ preset.delete_nonce }
								/>
							);
						} ) }
					</ButtonGroup>
				</div>
			);
		}
		return (
			<></>
		);
	};

	return (
		<>
			{
				showEditModal && (
					<CustomPresetEditModal
						editId={ showEditModal.editId }
						title={ showEditModal.title }
						saveNonce={ showEditModal.saveNonce }
					/>
				)
			}
			<div className="has-custom-preset-container" ref={ presetContainer }>
				{ loading && showLoading( 'Loading Presets' ) }
				{ ! loading && (
					<>
						{ getSavedPresets() }
						<div className="has-custom-preset-actions">
							{ ( ! editPresets ) && (
								<Button
									variant={ 'primary' }
									onClick={ ( e ) => {
										e.preventDefault();
										setSavingPreset( true );
									} }
									label={ __( 'Save New Preset', 'highlight-and-share' ) }
								>
									{ __( 'Save New Preset', 'highlight-and-share' ) }
								</Button>
							) }
							{ ( ! editPresets && ! savingPreset ) && (
								<Button
									variant={ 'secondary' }
									onClick={ ( e ) => {
										e.preventDefault();
										setEditPresets( true );
									} }
									label={ __( 'Edit Presets', 'highlight-and-share' ) }
								>
									{ __( 'Edit Presets', 'highlight-and-share' ) }
								</Button>
							) }
							{ ( editPresets && ! savingPreset ) && (
								<Button
									variant={ 'primary' }
									onClick={ ( e ) => {
										e.preventDefault();
										setEditPresets( false );
									} }
									label={ __( 'Exit Edit Mode', 'highlight-and-share' ) }
								>
									{ __( 'Exit Edit Mode', 'highlight-and-share' ) }
								</Button>
							) }
						</div>
					</>
				) }
				{ ( savingPreset ) && (
					<CustomPresetSaveModal
						title={ __( 'Save Preset', 'highlight-and-share' ) }
						{ ...props }
					/>
				) }
			</div>
		</>
	);
};
export default CustomPresetContainer;
