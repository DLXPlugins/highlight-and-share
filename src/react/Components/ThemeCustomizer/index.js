import React, { useContext, useState } from 'react';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import classNames from 'classnames';

const ThemeCustomizer = () => {
	const { theme, setTheme } = useContext( SocialNetworksContext );

	const getDefaultValues = () => {
		return {
			selectedTheme: theme,
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

	const onSubmit = ( formData ) => {
	};

	const handleReset = ( e ) => {
	};

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
								label={ __(
									'Select a Theme',
									'highlight-and-share'
								) }
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
			</form>
		</div>
	);

	
}

export default ThemeCustomizer;