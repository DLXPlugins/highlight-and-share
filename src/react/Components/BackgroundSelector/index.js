import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { RangeControl, Button, SelectControl, BaseControl, TextControl, Popover } from '@wordpress/components';
import { useForm, Controller, useWatch } from 'react-hook-form';
import ColorPicker from '../ColorPicker';

const BackgroundSelector = ( props ) => {
	const [ backgroundSettingsVisible, setBackgroundSettingsVisible ] = useState( false );
	const [ backgroundSettingsPopoverAnchor, setBackgroundSettingsPopoverAnchor ] = useState( null );

	const getDefaultValues = () => {
		return {
			url: props.values.url,
			id: props.values.id,
			backgroundColor: props.values.backgroundColor,
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
			<BaseControl className="has-background-settings-popover">
				<div className="has-background-selector__row_item">
					{ getBackgroundRepeat() }
				</div>
				<div className="has-background-selector__row_item">
					<Controller
						name={ 'backgroundSize' }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'Background Size', 'highlight-and-share' ) }
								value={ value }
								onChange={ ( newValue ) => {
									onChange( newValue );
								} }
							/>
						) }
					/>
				</div>
				<div className="has-background-selector__row_item">
					<Controller
						name={ 'backgroundPosition' }
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<TextControl
								label={ __( 'Background Position', 'highlight-and-share' ) }
								value={ value }
								onChange={ ( newValue ) => {
									onChange( newValue );
								} }
							/>
						) }
					/>
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
							} );
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
			<div className="has-background-selector__row_item has-background-selector__row_item-2">
				<h3>{ __( 'Background Settings', 'highlight-and-share' ) }</h3>
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
						className="has-component-background-settings-popup"
						noArrow={ false }
						anchor={ backgroundSettingsPopoverAnchor }
						placement="left"
						offset={ 10 }
						headerTitle={ __( 'Background Settings', 'highlight-and-share' ) }
					>
						{ getPopoverContent() }
					</Popover>
				) }
			</div>
			<div className="has-background-selector__row_item">
				<Controller
					name={ 'backgroundColor' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<ColorPicker
							value={ value }
							key={ 'background-color-image' }
							onChange={ ( slug, newValue ) => {
								onChange( newValue );
							} }
							label={ __( 'Background Color', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ '#000000' }
							slug={ 'background-color-image' }
						/>
					) }
				/>
			</div>
			<div className="has-background-selector__row_item">
				<Controller
					name={ 'backgroundOpacity' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<RangeControl
							label={ __( 'Background Opacity', 'highlight-and-share' ) }
							value={ value }
							onChange={ ( newValue ) => onChange( newValue ) }
							min={ 0 }
							max={ 1 }
							step={ 0.01 }
						/>
					) }
				/>
			</div>
			<div className="has-background-selector__row_item">
				<Controller
					name={ 'backgroundOpacityHover' }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<RangeControl
							label={ __( 'Background Opacity Hover', 'highlight-and-share' ) }
							value={ value }
							onChange={ ( newValue ) => onChange( newValue ) }
							min={ 0 }
							max={ 1 }
							step={ 0.01 }
						/>
					) }
				/>
			</div>
			<div className="has-typography-component-label">
				{ label }
			</div>
			<div className="has-typography-component-settings">

			</div>
		</BaseControl>
	);
};
export default BackgroundSelector;
