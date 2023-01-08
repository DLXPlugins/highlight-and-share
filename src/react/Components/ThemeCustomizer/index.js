import React, { useContext, useEffect, useState } from 'react';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
import {
	SelectControl,
	ToggleControl,
	RadioControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch } from 'react-hook-form';
import classNames from 'classnames';
import Notice from '../Notice';
import CircularInfoIcon from '../Icons/CircularInfo';
import HASColorPicker from '../ColorPicker';
import DimensionsControl from '../Dimensions';
import SocialNetworkColorsTabs from '../SocialNetworkColorsTabs';
import Spinner from '../Icons/Spinner';
import sendCommand from '../../Utils/SendCommand';
import ErrorBoundary from '../ErrorBoundary';

const defaultColors = hasAppearanceAdmin.colors;

const ThemeCustomizer = () => {
	const { theme, setTheme, appearanceThemeData, setAppearanceThemeData, socialNetworkColors, setSocialNetworkColors } = useContext( SocialNetworksContext );

	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );

	const getDefaultValues = () => {
		return {
			theme: appearanceThemeData.theme,
			icons_only: appearanceThemeData.icons_only,
			orientation: appearanceThemeData.orientation,
			group_icons: appearanceThemeData.group_icons,
			background_color: appearanceThemeData.background_color,
			background_color_hover: appearanceThemeData.background_color_hover,
			icon_colors_group: appearanceThemeData.icon_colors_group,
			icon_colors_group_hover: appearanceThemeData.icon_colors_group_hover,
			border_radius_group: appearanceThemeData.border_radius_group,
			icon_border_radius: appearanceThemeData.icon_border_radius,
			icon_padding: appearanceThemeData.icon_padding,
			icon_size: appearanceThemeData.icon_size,
			font_size: appearanceThemeData.font_size,
			icon_gap: appearanceThemeData.icon_gap,
			icon_colors: appearanceThemeData.icon_colors,
			show_tooltips: appearanceThemeData.show_tooltips,
			tooltips_text_color: appearanceThemeData.tooltips_text_color,
			tooltips_background_color: appearanceThemeData.tooltips_background_color,
		};
	};

	const {
		control,
		handleSubmit,
		getValues,
		reset,
	} = useForm( {
		defaultValues: getDefaultValues(),
	} );

	const formValues = useWatch( { control } );

	const onSubmit = ( formData ) => {
		const iconColors = { icon_colors: socialNetworkColors };
		setSaving( true );
		sendCommand( 'has_save_appearance_settings', {
			formData: { ...formData, ...iconColors },
			nonce: hasAppearanceAdmin.saveNonce,
		} ).then( ( response ) => {
			const { data, success } = response.data;
			if ( success ) {
				setAppearanceThemeData( data );
				setIsSaved( true );
				setTimeout( () => {
					setIsSaved( false );
				}, 3000 );
			}
		} )
			.catch( ( error ) => {
			} ).then( ( ) => {
				setSaving( false );
			} );
	};

	const handleReset = ( e ) => {
		setResetting( true );
		sendCommand( 'has_reset_appearance_settings', {
			nonce: hasAppearanceAdmin.resetNonce,
		} ).then( ( response ) => {
			const { data, success } = response.data;
			if ( success ) {
				setAppearanceThemeData( data );
				setTheme( data.theme );
				setSocialNetworkColors( data.icon_colors );
				reset( data, { keepDirtyValues: false, keepDirty: false, keepDefaultValues: false } );
				setIsReset( true );
				setTimeout( () => {
					setIsReset( false );
				}, 3000 );
			}
		} )
			.catch( ( error ) => {
			} ).then( ( ) => {
				setResetting( false );
			} );
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

	useEffect( () => {
		setAppearanceThemeData( formValues );
	}, [ formValues ] );

	return (
		<div className="has-admin-theme-customizer">
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="has-admin-component-row">
					<Controller
						name="theme"
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
								name="icons_only"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ToggleControl
										label={ __( 'Hide Labels (Icons Only)', 'highlight-and-share' ) }
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

						<div className="has-admin-component-row">
							<Controller
								name="group_icons"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<ToggleControl
										label={ __(
											'Group Icons Together',
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
						{ getValues( 'group_icons' ) && (
							<>
								<div className="has-admin-component-row">
									<Controller
										name="background_color"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Background Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#000000' }
												slug={ 'background_color' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="background_color_hover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Background Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#333333' }
												slug={ 'background_color_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="icon_colors_group"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Icon Color', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#FFFFFF' }
												slug={ 'icon_colors_group' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="icon_colors_group_hover"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<HASColorPicker
												value={ value }
												onChange={ ( slug, newValue ) => {
													onChange( newValue );
												} }
												label={ __( 'Icon Color Hover', 'highlight-and-share' ) }
												defaultColors={ defaultColors }
												defaultColor={ '#FFFFFF' }
												slug={ 'icon_colors_group_hover' }
											/>
										) }
									/>
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="border_radius_group"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<DimensionsControl
												label={ __( 'Border Radius', 'highlight-and-share' ) }
												allowNegatives={ false }
												attrTop={ value.attrTop }
												attrRight={ value.attrRight }
												attrBottom={ value.attrBottom }
												attrLeft={ value.attrLeft }
												attrUnit={ value.attrUnit }
												attrSyncUnits={ value.attrSyncUnits }
												labelTop={ __( 'Top Left', 'highlight-and-share' ) }
												labelRight={ __( 'Top Right', 'highlight-and-share' ) }
												labelBottom={ __( 'Bottom Right', 'highlight-and-share' ) }
												labelLeft={ __( 'Bottom Left', 'highlight-and-share' ) }
												units={ [ 'px', 'em', 'rem', '%' ] }
												onValuesChange={ ( newValues ) => {
													onChange( newValues );
												} }
											/>
										) }
									/>
								</div>
							</>
						) }
						{ ! getValues( 'group_icons' ) && (
							<>
								<div className="has-admin-component-row">
									<SocialNetworkColorsTabs />
								</div>
								<div className="has-admin-component-row">
									<Controller
										name="icon_border_radius"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<DimensionsControl
												label={ __( 'Icons Border Radius', 'highlight-and-share' ) }
												allowNegatives={ false }
												attrTop={ value.attrTop }
												attrRight={ value.attrRight }
												attrBottom={ value.attrBottom }
												attrLeft={ value.attrLeft }
												attrUnit={ value.attrUnit }
												attrSyncUnits={ value.attrSyncUnits }
												labelTop={ __( 'Top Left', 'highlight-and-share' ) }
												labelRight={ __( 'Top Right', 'highlight-and-share' ) }
												labelBottom={ __( 'Bottom Right', 'highlight-and-share' ) }
												labelLeft={ __( 'Bottom Left', 'highlight-and-share' ) }
												units={ [ 'px', 'em', 'rem', '%' ] }
												onValuesChange={ ( newValues ) => {
													onChange( newValues );
												} }
											/>
										) }
									/>
								</div>
							</>
						) }
						<div className="has-admin-component-row">
							<Controller
								name="icon_padding"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<DimensionsControl
										label={ __( 'Icons Padding', 'highlight-and-share' ) }
										allowNegatives={ false }
										attrTop={ value.attrTop }
										attrRight={ value.attrRight }
										attrBottom={ value.attrBottom }
										attrLeft={ value.attrLeft }
										attrUnit={ value.attrUnit }
										attrSyncUnits={ value.attrSyncUnits }
										labelTop={ __( 'Padding Left', 'highlight-and-share' ) }
										labelRight={ __( 'Padding Right', 'highlight-and-share' ) }
										labelBottom={ __( 'Padding Bottom', 'highlight-and-share' ) }
										labelLeft={ __( 'Padding Left', 'highlight-and-share' ) }
										units={ [ 'px', 'em', 'rem' ] }
										onValuesChange={ ( newValues ) => {
											onChange( newValues );
										} }
									/>
								) }
							/>
						</div>
						<div className="has-admin-component-row">
							<Controller
								name="icon_size"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<>
										<RangeControl
											label={ __(
												'Set the Icon Size',
												'highlight-and-share'
											) }
											step={ 1 }
											value={ value }
											max={ 64 }
											min={ 14 }
											currentInput={ 16 }
											initialPosition={ 16 }
											allowReset={ true }
											className="has-admin__range-control"
											onChange={ ( icon_sizeValue ) => {
												onChange( icon_sizeValue );
											} }
											trackColor="#4F4F4F"
											railColor="#CECECE"
										/>
									</>
								) }
							/>
						</div>
						{ ! getValues( 'icons_only' ) && (
							<>
								<div className="has-admin-component-row">
									<Controller
										name="font_size"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<>
												<RangeControl
													label={ __(
														'Set the Font Size',
														'highlight-and-share'
													) }
													step={ 1 }
													value={ value }
													max={ 64 }
													min={ 14 }
													currentInput={ 16 }
													initialPosition={ 16 }
													allowReset={ true }
													className="has-admin__range-control"
													onChange={ ( font_sizeValue ) => {
														onChange( font_sizeValue );
													} }
													trackColor="#4F4F4F"
													railColor="#CECECE"
												/>
											</>
										) }
									/>
								</div>
							</>
						) }
						{ ! getValues( 'group_icons' ) && (
							<>
								<div className="has-admin-component-row">
									<Controller
										name="icon_gap"
										control={ control }
										render={ ( { field: { onChange, value } } ) => (
											<>
												<RangeControl
													label={ __(
														'Gap Between Items',
														'highlight-and-share'
													) }
													step={ 1 }
													value={ value }
													max={ 48 }
													min={ 0 }
													currentInput={ 15 }
													initialPosition={ 15 }
													allowReset={ true }
													className="has-admin__range-control"
													onChange={ ( icon_gapValue ) => {
														onChange( icon_gapValue );
													} }
													trackColor="#4F4F4F"
													railColor="#CECECE"
												/>
											</>
										) }
									/>
								</div>
							</>
						) }
					</>
				) }
				<div className="has-admin-component-row">
					<Controller
						name="show_tooltips"
						control={ control }
						render={ ( { field: { onChange, value } } ) => (
							<ToggleControl
								label={ __( 'Show Tooltips', 'highlight-and-share' ) }
								className="has-admin__toggle-control"
								checked={ value }
								onChange={ ( boolValue ) => {
									onChange( boolValue );
								} }
								help={ __(
									'Hover over a social network to see a tooltip.',
									'highlight-and-share'
								) }
							/>
						) }
					/>
				</div>
				{ getValues( 'show_tooltips' ) && (
					<>
						<div className="has-admin-component-row">
							<Controller
								name="tooltips_background_color"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<HASColorPicker
										value={ value }
										onChange={ ( slug, newValue ) => {
											onChange( newValue );
										} }
										label={ __( 'Tooltips Background Color', 'highlight-and-share' ) }
										defaultColors={ defaultColors }
										defaultColor={ '#000000' }
										slug={ 'tooltips_background_color' }
									/>
								) }
							/>
						</div>
						<div className="has-admin-component-row">
							<Controller
								name="tooltips_text_color"
								control={ control }
								render={ ( { field: { onChange, value } } ) => (
									<HASColorPicker
										value={ value }
										onChange={ ( slug, newValue ) => {
											onChange( newValue );
										} }
										label={ __( 'Tooltips Text Color', 'highlight-and-share' ) }
										defaultColors={ defaultColors }
										defaultColor={ '#FFFFFF' }
										slug={ 'tooltips_text_color' }
									/>
								) }
							/>
						</div>	

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
				<div className="has-admin__tabs--content-actions">
					<div className="has-admin__tabs--content-actions--left">
						<Button
							className={ classNames(
								'has__btn has__btn-primary has__btn--icon-right',
								{ 'has-icon': saving },
								{ 'is-saving': { saving } }
							) }
							type="submit"
							text={
								saving
									? __( 'Saving…', 'highlight-and-share' )
									: __( 'Save Theme Options', 'highlight-and-share' )
							}
							icon={ saving ? Spinner : false }
							icon_size="18"
							iconPosition="right"
							disabled={ saving || resetting }
							onClick={ () => {

							} }
						/>
					</div>
					<div className="has-admin__tabs--content-actions--right">
						<Button
							className={ classNames(
								'has__btn has__btn-danger has__btn--icon-right',
								{ 'has-icon': resetting },
								{ 'is-resetting': { resetting } }
							) }
							type="button"
							text={
								resetting
									? __( 'Resetting…', 'highlight-and-share' )
									: __( 'Reset Theme Options', 'highlight-and-share' )
							}
							icon={ resetting ? Spinner : false }
							icon_size="18"
							iconPosition="right"
							disabled={ saving || resetting }
							onClick={ () => {
								handleReset();
							} }
						/>
					</div>
				</div>
				{ isSaved && (
					<Notice
						message={ __( 'Your settings have been saved.' ) }
						status="success"
						politeness="assertive"
					/>
				) }
				{ isReset && (
					<Notice
						message={ __( 'Your settings have been reset to defaults.' ) }
						status="success"
						politeness="assertive"
					/>
				) }
			</form>
		</div>
	);
};

export default ThemeCustomizer;
