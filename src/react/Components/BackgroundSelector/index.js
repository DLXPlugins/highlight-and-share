import React, { useState, useEffect, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import {
	RangeControl,
	Button,
	SelectControl,
	BaseControl,
	TextControl,
	Popover,
} from '@wordpress/components';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { useForm, Controller, useWatch } from 'react-hook-form';
import ColorPicker from '../ColorPicker';
import classNames from 'classnames';

const BackgroundSelector = ( props ) => {

	const mediaUploadButton = useRef( null );

	const [ backgroundSettingsVisible, setBackgroundSettingsVisible ] =
		useState( false );
	const [ backgroundSettingsPopoverAnchor, setBackgroundSettingsPopoverAnchor ] =
		useState( null );

	const [ isVisible, setIsVisible ] = useState( false );
	const [ isToggled, setIsToggled ] = useState( false );

	// Background error image state.
	const [ errorImage, setErrorImage ] = useState( false );
	

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

	const { control, setValue, getValues } = useForm( {
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

	/**
	 * Close color popup if visible.
	 */
	 const toggleClose = () => {
		setIsToggled( true );
		setIsVisible( ! isVisible );
		setTimeout( () => {
			setIsToggled( false );
		}, 500 );
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
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								if ( 'image' === media.type ) {
									setValue( 'url', media.url );
									setValue( 'id', media.id );
								} else {
									setErrorImage( true );
									setValue( 'url', '' );
									setValue( 'id', '0' );
									mediaUploadButton.current.focus();
									setTimeout(() => {
										setErrorImage( false );
									}, 8000 );
								}
							} }
							title={ __( 'Select Background Image', 'highlight-and-share' ) }
							mode={ 'upload' }
							multiple={ false }
							allowedTypes={ [ 'image' ] }
							value={ getValues( 'id' ) }
							render={ ( { open } ) => (
								<Button
									isSecondary
									className={ classNames( { 'has-background-selector-image-button-error': errorImage} ) }
									onClick={ () => {
										setErrorImage( false );
										open();
									 } }
									label={ ! errorImage ? __( 'Upload Background Image', 'highlight-and-share' ) : __( 'Please choose only images.', 'highlight-and-share' ) }
									icon="format-image"
									showTooltip={ errorImage }
									tooltipPosition="top center"
									ref={ mediaUploadButton }
								/>
							) }
						/>
					</MediaUploadCheck>
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
						if ( isToggled ) {
							setIsToggled( false );
						} else {
							setIsVisible( ! isVisible );
						}
					} }
					icon="admin-settings"
					ref={ setBackgroundSettingsPopoverAnchor }
				/>
				{ true === isVisible && (
					<Popover
						className="has-component-background-settings-popup"
						noArrow={ false }
						anchorRef={ backgroundSettingsPopoverAnchor }
						placement="left"
						offset={ 10 }
						headerTitle={ __( 'Background Settings', 'highlight-and-share' ) }
						onClose={ toggleClose }
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
		</BaseControl>
	);
};
export default BackgroundSelector;
