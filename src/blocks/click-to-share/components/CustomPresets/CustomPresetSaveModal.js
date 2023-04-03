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

	const { savedPresets, setSavedPresets, savingPreset, setSavingPreset } = useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			presetTitle: '',
		};
	};
	const { control, handleSubmit, setValue } =
		useForm( {
			defaultValues: getDefaultValues(),
		} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
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
							<div className="has-preset-modal-button-group">
								<Button
									type="submit"
									variant="primary"
									className="has-preset-modal-apply-button"
								>
									{ isSaving ? __( 'Saving…', 'highlight-and-share' ) : __( 'Save Preset', 'highlight-and-share' ) }
								</Button>
								<Button
									variant="secondary"
									onClick={ () => {
										setSavingPreset( false );
									} }
									className="has-preset-modal-cancel-button"
								>
									{ __( 'Cancel', 'highlight-and-share' ) }
								</Button>
							</div>
						</>
					) }
				</form>
			</Modal>
		</div>
	);
};
export default CustomPresetSaveModal;
