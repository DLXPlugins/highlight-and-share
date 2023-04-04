import React, { useRef, useEffect, useState, useContext } from 'react';
import {
	Spinner,
	Button,
	Modal,
	RadioControl,
	TextControl,
} from '@wordpress/components';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { __ } from '@wordpress/i18n';
import CustomPresetsContext from './context';
import CircularExclamationIcon from '../../../../react/Components/Icons/CircularExplanation';
import Notice from '../../../../react/Components/Notice';

const CustomPresetSaveModal = ( props ) => {
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ isSaving, setIsSaving ] = useState( false );
	const { title, attributes, setAttributes, clientId } = props;

	const { savedPresets, setSavedPresets, savingPreset, setSavingPreset } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			presetTitle: '',
			selectedPreset: null,
		};
	};
	const { control, handleSubmit, setValue } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		if ( 'new' === presetSaveType ) {
			saveNewPreset( formData );
		} else {
			overridePreset( formData );
		}
	};

	/**
	 * Save a new preset via Ajax.
	 *
	 * @param {Array} formData Form data array.
	 */
	const saveNewPreset = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'has_save_presets' );
		data.append( 'nonce', has_gutenberg.blockPresetsNonceSave );
		data.append( 'attributes', JSON.stringify( attributes ) );
		data.append( 'formData', JSON.stringify( formData ) );
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
				setIsSaving( false );
				setSavingPreset( false );
				setSavedPresets( presets );
			} )
			.catch( ( error ) => {
				setSavingPreset( false );
			} );
	};

	/**
	 * Save a new preset via Ajax.
	 *
	 * @param {Array} formData Form data array.
	 */
	const overridePreset = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'has_override_preset' );
		data.append( 'nonce', has_gutenberg.blockPresetsNonceSave );
		data.append( 'attributes', JSON.stringify( attributes ) );
		data.append( 'editId', formData.selectedPreset );
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
				setIsSaving( false );
				setSavingPreset( false );
				setSavedPresets( presets );
			} )
			.catch( ( error ) => {
				setSavingPreset( false );
			} );
	};

	/**
	 * Get the preset options in radio group format.
	 *
	 * @return {Array} Array of objects with label and value properties.
	 */
	const getPresetRadioOptions = () => {
		const options = [];
		savedPresets.forEach( ( preset ) => {
			options.push( {
				label: preset.title,
				value: preset.id + '',
			} );
		} );
		return options;
	};

	return (
		<div className="has-custom-preset-modal">
			<Modal
				title={ title }
				onRequestClose={ () => setSavingPreset( false ) }
				className="has-preset-modal"
				shouldCloseOnClickOutside={ false }
			>
				<RadioControl
					label={ __(
						'Save a new preset or override an existing one.',
						'highlight-and-share'
					) }
					className="has-preset-modal-radio-control"
					selected={ presetSaveType }
					options={ [
						{
							label: __( 'Save Preset', 'highlight-and-share' ),
							value: 'new',
						},
						{
							label: __( 'Override Preset', 'highlight-and-share' ),
							value: 'override',
						},
					] }
					onChange={ ( value ) => {
						setPresetSaveType( value );
					} }
				/>
				<form onSubmit={ handleSubmit( onSubmit ) }>
					{ 'new' === presetSaveType && (
						<>
							<div className="has-preset-modal-new-preset">
								<Controller
									name="presetTitle"
									control={ control }
									rules={ {
										required: true,
										pattern: /^[a-zA-Z0-9-_ ]+$/,
									} }
									render={ ( { field } ) => (
										<TextControl
											{ ...field }
											label={ __( 'Preset Name', 'highlight-and-share' ) }
											className="is-required"
										/>
									) }
								/>
								{ 'required' === errors.presetTitle?.type && (
									<Notice
										message={ __( 'This field is required.' ) }
										status="error"
										politeness="assertive"
										icon={ CircularExclamationIcon }
									/>
								) }
								{ 'pattern' === errors.presetTitle?.type && (
									<Notice
										message={ __( 'This field contains invalid characters.' ) }
										status="error"
										politeness="assertive"
										icon={ CircularExclamationIcon }
									/>
								) }
							</div>
						</>
					) }
					{ 'override' === presetSaveType && (
						<>
							{ savedPresets.length > 0 && (
								<div className="has-preset-modal-override-preset">
									<Controller
										name="selectedPreset"
										control={ control }
										rules={ {
											required: true,
										} }
										render={ ( { field: { onChange, value } } ) => (
											<RadioControl
												label={ __(
													'Select a preset to override',
													'highlight-and-share'
												) }
												className="is-required"
												selected={ value }
												options={ getPresetRadioOptions() }
												onChange={ ( radioValue ) => onChange( radioValue ) }
											/>
										) }
									/>
									{ 'required' === errors.selectedPreset?.type && (
										<Notice
											message={ __( 'This field is required.' ) }
											status="error"
											politeness="assertive"
											icon={ CircularExclamationIcon }
										/>
									) }
								</div>
							) }
						</>
					) }
					<div className="has-preset-modal-button-group">
						<Button
							type="submit"
							variant="primary"
							className="has-preset-modal-apply-button"
							disabled={ isSaving }
						>
							{ isSaving
								? __( 'Saving…', 'highlight-and-share' )
								: __( 'Save Preset', 'highlight-and-share' ) }
						</Button>
						<Button
							variant="secondary"
							onClick={ () => {
								setSavingPreset( false );
							} }
							className="has-preset-modal-cancel-button"
							disabled={ isSaving }
						>
							{ __( 'Cancel', 'highlight-and-share' ) }
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
};
export default CustomPresetSaveModal;
