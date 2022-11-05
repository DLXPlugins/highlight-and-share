/**
 * Dimensions Component.
 * Credit: Forked from @GenerateBlocks
 */
import React, { useEffect } from 'react';

/**
 * External dependencies
 */

import { __, sprintf, _x } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import HASColorPicker from '../ColorPicker';

const defaultColors = hasAppearanceAdmin.colors;

const TabColorPickers = ( props ) => {
	const getDefaultValues = () => {
		return {
			backgroundColor: props.backgroundColor,
			backgroundColorHover: props.backgroundColorHover,
			iconColor: props.iconColor,
			iconColorHover: props.iconColorHover,
		};
	};

	const {
		register,
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		trigger,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const { errors, isDirty, dirtyFields, touchedFields } = useFormState( {
		control,
	} );

	useEffect( () => {
		props.onValueChange( formValues );
	}, [ formValues ] );

	return (
		<>
			<div className="has-admin-component-row">
				<Controller
					name="backgroundColor"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<HASColorPicker
							value={ value }
							onChange={ ( slug, newValue ) => {
								onChange( newValue );
							} }
							label={ __( 'Background Color', 'highlight-and-share' ) }
							defaultColors={ defaultColors }
							defaultColor={ getValues( 'backgroundColor' ) }
							slug={ 'backgroundColor' }
						/>
					) }
				/>
			</div>
			<div className="has-admin-component-row">
				<Controller
					name="backgroundColorHover"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<HASColorPicker
							value={ value }
							onChange={ ( slug, newValue ) => {
								onChange( newValue );
							} }
							label={ __( 'Background Color Hover', 'highlight-and-share' ) }
							defaultColors={ defaultColors }
							defaultColor={ getValues( 'backgroundColorHover' ) }
							slug={ 'backgroundColorHover' }
						/>
					) }
				/>
			</div>
			<div className="has-admin-component-row">
				<Controller
					name="iconColor"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<HASColorPicker
							value={ value }
							onChange={ ( slug, newValue ) => {
								onChange( newValue );
							} }
							label={ __( 'Icon Color', 'highlight-and-share' ) }
							defaultColors={ defaultColors }
							defaultColor={ getValues( 'iconColor' ) }
							slug={ 'iconColor' }
						/>
					) }
				/>
			</div>
			<div className="has-admin-component-row">
				<Controller
					name="iconColorHover"
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<HASColorPicker
							value={ value }
							onChange={ ( slug, newValue ) => {
								onChange( newValue );
							} }
							label={ __( 'Icon Color Hover', 'highlight-and-share' ) }
							defaultColors={ defaultColors }
							defaultColor={ getValues( 'iconColorHover' ) }
							slug={ 'iconColorHover' }
						/>
					) }
				/>
			</div>
		</>
	);
};

export default TabColorPickers;
