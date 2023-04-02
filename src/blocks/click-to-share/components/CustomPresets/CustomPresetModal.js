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

const CustomPresetModal = ( props ) => {
	const [ savingPreset, setSavingPreset ] = useState( false );
	const [ presetSaveType, setPresetSaveType ] = useState( 'new' );
	const [ presetSaveLabel, setPresetSaveLabel ] = useState( '' );
	const { title, attributes, setAttributes, clientId } = props;

	const { savedPresets } = useContext( CustomPresetsContext );

	return (
		<div className="has-custom-preset-modal">
			<Modal
				title={ title }
				onRequestClose={ () => setSavingPreset( false ) }
				className="has-preset-modal"
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
				{ 'new' === presetSaveType && (
					<>
						<div className="has-preset-modal-new-preset">
							<TextControl
								label={ __( 'Preset Name', 'highlight-and-share' ) }
								value={ presetSaveLabel }
								onChange={ ( value ) => {
									setPresetSaveLabel( value );
								} }
							/>
						</div>
						<div className="has-preset-modal-button-group">
							<Button
								variant="primary"
								onClick={ () => {
									setSavingPreset( false );
								} }
								className="has-preset-modal-apply-button"
							>
								{ __( 'Save Preset', 'highlight-and-share' ) }
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
			</Modal>
		</div>
	);
};
export default CustomPresetModal;
