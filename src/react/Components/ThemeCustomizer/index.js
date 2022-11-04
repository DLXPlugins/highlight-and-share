import React, { useContext, useState } from 'react';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
import {
	SelectControl,
	ToggleControl,
	RadioControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';
import Notice from '../Notice';
import CircularInfoIcon from '../Icons/CircularInfo';
import HASColorPicker from '../ColorPicker';

const defaultColors = hasAppearanceAdmin.colors;

const ThemeCustomizer = () => {
	const { theme, setTheme } = useContext( SocialNetworksContext );

	const getDefaultValues = () => {
		return {
			selectedTheme: theme,
			iconsOnly: true,
			orientation: 'horizontal',
			groupIcons: true,
			backgroundColor: '#000000',
			iconColorsGroup: '#FFFFFF',
			iconColorsGroupHover: '#FFFFFF',
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

	const onSubmit = ( formData ) => {};

	const handleReset = ( e ) => {};

	const getThemes = () => {
		const themes = hasAppearanceAdmin.themes;

		// Loop through themes and populate label value relationship.
		const themeOptions = [];
		for ( const themeKey in themes ) {
			themeOptions.push( {
				label: themes[ themeKey ],
				value: themeKey,
			} );
		}
		// Add custom option.
		themeOptions.push( {
			label: __( 'Custom', 'highlight-and-share' ),
			value: 'custom',
		} );
		return themeOptions;
	};

	return (
		<div className="has-admin-theme-customizer">
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="has-admin-component-row">
					<Controller
						name="selectedTheme"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<SelectControl
								className="has-admin__theme-select"
								label={ __( 'Select a Theme', 'highlight-and-share' ) }
								value={ value }
								onChange={ ( newTheme ) => {
									setTheme( newTheme );
									onChange( newTheme );
								} }
								options={ getThemes() }
							/>
						) }
					/>
				</div>
				{ 'custom' === theme && (
					<>
						<div className="has-admin-component-row has-description">
							<Notice
								message={ __(
									'You have chosen a custom theme. You can configure the settings and see a preview below.',
									'highlight-and-share'
								) }
								status="info"
								politeness="polite"
								inline={ false }
								icon={ CircularInfoIcon }
							/>
						</div>
						<div className="has-admin-component-row">
							<Controller
								name="iconsOnly"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ToggleControl
										label={ __( 'Icons Only', 'highlight-and-share' ) }
										className="has-admin__toggle-control"
										checked={ value }
										onChange={ ( boolValue ) => {
											onChange( boolValue );
										} }
										help={ __(
											'Display only the icons without text.',
											'highlight-and-share'
										) }
									/>
								) }
							/>
						</div>
						{ getValues( 'iconsOnly' ) && (
							<>
								<div className="has-admin-component-row">
									<Controller
										name="groupIcons"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<ToggleControl
												label={ __(
													'Modify All Icons Together (Group them)',
													'highlight-and-share'
												) }
												className="has-admin__toggle-control"
												checked={ value }
												onChange={ ( boolValue ) => {
													onChange( boolValue );
												} }
												help={ __(
													'Modify all icons at once or have them separated with individual colors and backgrounds.',
													'highlight-and-share'
												) }
											/>
										) }
									/>
								</div>
								{ getValues( 'groupIcons' ) && (
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

									</>
								) }
							</>
						) }
						<div className="has-admin-component-row">
							<Controller
								name="orientation"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<RadioControl
										label="Orientation"
										help={ __(
											'Select the orientation of the icons (can be horizontal or vertical).',
											'highlight-and-share'
										) }
										selected={ value }
										options={ [
											{
												label: __( 'Horizontal', 'highlight-and-share' ),
												value: 'horizontal',
											},
											{
												label: __( 'Vertical', 'highlight-and-share' ),
												value: 'vertical',
											},
										] }
										onChange={ ( radioValue ) => onChange( radioValue ) }
									/>
								) }
							/>
						</div>
					</>
				) }
			</form>
		</div>
	);
};

export default ThemeCustomizer;
