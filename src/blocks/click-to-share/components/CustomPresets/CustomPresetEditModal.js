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
import CircularExclamationIcon from '../../../../react/Components/Icons/CircularExplanation';
import Notice from '../../../../react/Components/Notice';
import CustomPresetsContext from './context';

const CustomPresetEditModal = ( props ) => {
	const { title, editId, saveNonce } = props;
	const [ isSaving, setIsSaving ] = useState( false );

	const { setSavedPresets, showEditModal, setShowEditModal } =
		useContext( CustomPresetsContext );

	const getDefaultValues = () => {
		return {
			title: props.title,
			editId: props.editId,
		};
	};
	const { control, handleSubmit, setValue } = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const { errors } = useFormState( {
		control,
	} );

	const onSubmit = ( formData ) => {
		setIsSaving( true );
		const ajaxUrl = `${ ajaxurl }`; // eslint-disable-line no-undef
		const data = new FormData();
		data.append( 'action', 'has_save_preset' );
		data.append( 'nonce', saveNonce );
		data.append( 'editId', formData.editId );
		data.append( 'title', formData.title );
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
				setSavedPresets( presets );
				setIsSaving( false );
				setShowEditModal( false );
			} )
			.catch( ( error ) => {
				setIsSaving( false );
			} );
	};

	// Don't show modal if explicitly set.
	if ( ! showEditModal ) {
		return null;
	}

	return (
		<Modal
			title={ __( 'Update Preset', 'highlight-and-share' ) }
			onRequestClose={ () => setShowEditModal( false ) }
			className="has-preset-modal"
			shouldCloseOnClickOutside={ false }
		>
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<Controller
					name="title"
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
				{ 'required' === errors.title?.type && (
					<Notice
						message={ __( 'This field is required.' ) }
						status="error"
						politeness="assertive"
						icon={ CircularExclamationIcon }
					/>
				) }
				{ 'pattern' === errors.title?.type && (
					<Notice
						message={ __( 'This field contains invalid characters.' ) }
						status="error"
						politeness="assertive"
						icon={ CircularExclamationIcon }
					/>
				) }
				<Controller
					name="editId"
					control={ control }
					render={ ( { field } ) => <TextControl type="hidden" { ...field } /> }
				/>
				<Button
					type="submit"
					variant="primary"
					className="has-preset-modal-apply-button"
					disabled={ isSaving }
				>
					{ isSaving
						? __( 'Saving…', 'highlight-and-share' )
						: __( 'Apply Changes', 'highlight-and-share' ) }
				</Button>
				{ ! isSaving && (
					<Button
						variant="secondary"
						onClick={ () => {
							setShowEditModal( false );
						} }
					>
						{ __( 'Cancel', 'highlight-and-share' ) }
					</Button>
				) }
			</form>
		</Modal>
	);
};
export default CustomPresetEditModal;
