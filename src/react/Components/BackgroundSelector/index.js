import React, { useState, useEffect } from 'react';
import fontFamilies from '../../../fonts/fonts';
import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button, SelectControl, BaseControl, TextControl, Popover } from '@wordpress/components';
import { useForm, Controller, useWatch } from 'react-hook-form';

const BackgroundSelector = ( props ) => {

	const [ backgroundSettingsVisible, setBackgroundSettingsVisible ] = useState( false );
	const [ backgroundSettingsPopoverAnchor, setBackgroundSettingsPopoverAnchor ] = useState( null );

	const getDefaultValues = () => {
		return {
			url: props.values.url,
			id: props.values.id,
			backgroundSize: props.values.backgroundSize,
			backgroundPosition: props.values.backgroundPosition,
			backgroundRepeat: props.values.backgroundRepeat,
			backgroundOpacity: props.values.backgroundOpacity,
			backgroundOpacityHover: props.values.backgroundOpacityHover,
		};
	};

	const {
		control,
		setValue,
		getValues,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { label } = props;

	useEffect( () => {
		props.onValuesChange( formValues );
	}, [ formValues ] );

	const getBackgroundRepeat = () => {
		const backgroundRepeat = [
			{ label: __( 'repeat-x', 'highlight-and-share' ), value: 'repeat-x' },
			{ label: __( 'repeat-y', 'highlight-and-share' ), value: 'repeat-y' },
			{ label: __( 'repeat', 'highlight-and-share' ), value: 'repeat' },
			{ label: __( 'no-repeat', 'highlight-and-share' ), value: 'no-repeat' },
		];
		return (
			<Controller
				name={ 'backgroundRepeat' }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Background Repeat', 'highlight-and-share' ) }
						value={ value }
						options={ backgroundRepeat }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};


	const getPopoverContent = () => {
		return (
			<BaseControl className="has-typography-picker">
				<div className="has-typography-picker__row has-typography-picker__row__col-full">
					<div className="has-typography-picker__row_item">
						{ getBackgroundRepeat() }
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-full">
					<div className="has-typography-picker__row_item">
						
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-2">
					<div className="has-typography-picker__row_item has-units">
					</div>
					<div className="has-typography-picker__row_item">
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-2">
					<div className="has-typography-picker__row_item has-units">
					</div>
					<div className="has-typography-picker__row_item has-units">
					</div>
				</div>
			</BaseControl>
		);
	};

	const getBackgroundUploader = () => {
		return (
			<div className="has-background-selector-upload-row">
				<Controller
					name={ 'url' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Background Image', 'highlight-and-share' ) }
							value={ value }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							placeholder={ __( 'Enter URL', 'highlight-and-share' ) }
						/>
					) }
				/>
				<div className="has-background-selector-upload-button">
					<Button
						isSecondary
						onClick={ () => {
							const mediaUploader = wp.media( {
								title: __( 'Select Background Image', 'highlight-and-share' ),
								button: {
									text: __( 'Select Background Image', 'highlight-and-share' ),
								},
								multiple: false,
							} );
							mediaUploader.on( 'select', () => {
								const attachment = mediaUploader.state().get( 'selection' ).first().toJSON();
								setValue( 'url', attachment.url );
								setValue( 'id', attachment.id );
							} );
							mediaUploader.on( 'open', () => {
								const attachmentId = getValues( 'id' );
								if ( attachmentId ) {
									const attachment = wp.media.attachment( attachmentId );
									mediaUploader.state( 'library' ).get( 'selection' ).add( attachment );
								}
							});
							mediaUploader.open();
						} }
						label={ __( 'Upload Background Image', 'highlight-and-share' ) }
						icon="format-image"
					/>
				</div>
			</div>
		);
	};

	return (
		<BaseControl className="has-background-selector-wrapper">
			<div className="has-background-selector__row_item">
				{ getBackgroundUploader() }
			</div>
			<div className="has-typography-component-label">
				{ label }
			</div>
			<div className="has-typography-component-settings">
				<Button
					variant="secondary"
					label={ __( 'Background Settings', 'highlight-and-share' ) }
					onClick={ () => {
						setBackgroundSettingsVisible( ! backgroundSettingsVisible );
					} }
					icon="admin-settings"
					ref={ setBackgroundSettingsPopoverAnchor }
				/>
				{ true === backgroundSettingsVisible && (
					<Popover
						className="has-component-typography-popup"
						noArrow={ false }
						anchor={ backgroundSettingsPopoverAnchor }
						placement="left"
						offset={ 10 }
					>
						{ getPopoverContent() }
					</Popover>
				) }
			</div>
		</BaseControl>
	);
};
export default BackgroundSelector;
