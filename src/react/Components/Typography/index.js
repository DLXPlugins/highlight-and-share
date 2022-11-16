import React, { useState, useEffect } from 'react';
import fontFamilies from '../../../fonts/fonts';
import { __ } from '@wordpress/i18n';
import { ButtonGroup, Button, Tooltip, SelectControl, BaseControl, TextControl, Popover } from '@wordpress/components';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { geHierarchicalPlaceholderValue } from '../../Utils/TypographyHelper';

const Typography = ( props ) => {
	const [ screenSize, setScreenSize ] = useState( 'desktop' );
	const [ fontSizeUnitPopoverVisible, setFontSizeUnitPopoverVisible ] = useState( false );
	const [ fontSizeUnitPopoverAnchor, setFontSizeUnitPopoverAnchor ] = useState( null );
	const [ lineHeightUnitPopoverVisible, setLineHeightUnitPopoverVisible ] = useState( false );
	const [ lineHeightUnitPopoverAnchor, setLineHeightUnitPopoverAnchor ] = useState( null );
	const [ letterSpacingUnitPopoverVisible, setLetterSpacingUnitPopoverVisible ] = useState( false );
	const [ letterSpacingUnitPopoverAnchor, setLetterSpacingUnitPopoverAnchor ] = useState( null );
	const [ fontSettingsPopoverVisible, setFontSettingsPopoverVisible ] = useState( false );
	const [ fontSettingsPopoverAnchor, setFontSettingsPopoverAnchor ] = useState( null );

	const getDefaultValues = () => {
		return {
			mobile: {
				fontFamily: props.values.mobile.fontFamily,
				fontSize: props.values.mobile.fontSize,
				fontSizeUnit: props.values.mobile.fontSizeUnit,
				fontWeight: props.values.mobile.fontWeight,
				lineHeight: props.values.mobile.lineHeight,
				lineHeightUnit: props.values.mobile.lineHeightUnit,
				textTransform: props.values.mobile.textTransform,
				letterSpacing: props.values.mobile.letterSpacing,
				letterSpacingUnit: props.values.mobile.letterSpacingUnit,
				fontType: props.values.mobile.fontType,
				fontFallback: props.values.mobile.fontFallback,
			},
			tablet: {
				fontFamily: props.values.tablet.fontFamily,
				fontSize: props.values.tablet.fontSize,
				fontSizeUnit: props.values.tablet.fontSizeUnit,
				fontWeight: props.values.tablet.fontWeight,
				lineHeight: props.values.tablet.lineHeight,
				lineHeightUnit: props.values.tablet.lineHeightUnit,
				textTransform: props.values.tablet.textTransform,
				letterSpacing: props.values.tablet.letterSpacing,
				letterSpacingUnit: props.values.tablet.letterSpacingUnit,
				fontType: props.values.tablet.fontType,
				fontFallback: props.values.tablet.fontFallback,
			},
			desktop: {
				fontFamily: props.values.desktop.fontFamily,
				fontSize: props.values.desktop.fontSize,
				fontSizeUnit: props.values.desktop.fontSizeUnit,
				fontWeight: props.values.desktop.fontWeight,
				lineHeight: props.values.desktop.lineHeight,
				lineHeightUnit: props.values.desktop.lineHeightUnit,
				textTransform: props.values.desktop.textTransform,
				letterSpacing: props.values.desktop.letterSpacing,
				letterSpacingUnit: props.values.desktop.letterSpacingUnit,
				fontType: props.values.desktop.fontType,
				fontFallback: props.values.desktop.fontFallback,
			},
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

	useEffect( () => {
		setScreenSize( props.screenSize.toLowerCase() );
		setValue( props.screenSize.toLowerCase(), getValues( props.screenSize.toLowerCase() ) );
	}, [ props.screenSize ] );

	// Retrieve the list all available fonts.
	const getFonts = () => {
		const adobeFonts = has_gutenberg.adobeFonts;
		const fonts = [];
		const families = Object.values( fontFamilies );
		families.forEach( ( fontFamily ) => {
			fonts.push( { label: fontFamily.name, value: fontFamily.slug } );
		} );
		// Push adobe fonts to the front.
		adobeFonts.forEach( ( font ) => {
			fonts.unshift( { label: font.name, value: font.slug } );
		} );
		// Add placeholder.
		fonts.unshift( { label: __( 'Select a Font', 'highlight-and-share' ), value: '' } );
		return (
			<Controller
				name={ `${ screenSize }.fontFamily` }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Font Family', 'highlight-and-share' ) }
						value={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).fontFamily, 'fontFamily' ) }
						options={ fonts }
						onChange={ ( newValue ) => {
							console.log( newValue );
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	const getTextTransform = () => {
		const textTransform = [
			{ label: __( 'None', 'highlight-and-share' ), value: 'none' },
			{ label: __( 'Uppercase', 'highlight-and-share' ), value: 'uppercase' },
			{ label: __( 'Lowercase', 'highlight-and-share' ), value: 'lowercase' },
			{ label: __( 'Capitalize', 'highlight-and-share' ), value: 'capitalize' },
		];
		return (
			<Controller
				name={ `${ screenSize }.textTransform` }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Text Transform', 'highlight-and-share' ) }
						value={ geHierarchicalPlaceholderValue( props.values, screenSize, getValues( screenSize ).textTransform, 'textTransform' ) }
						options={ textTransform }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	const getFontSize = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.fontSize` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Font Size', 'highlight-and-share' ) }
							value={ value }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							type="number"
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.fontSizeUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ value }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.fontSizeUnit` ) }
					onClick={ () => {
						setFontSizeUnitPopoverVisible( ! fontSizeUnitPopoverVisible );
					} }
					ref={ setFontSizeUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.fontSizeUnit` ) }
				</Button>
				{ true === fontSizeUnitPopoverVisible && (
					<Popover
						className="has-component-font-unit-picker"
						noArrow={ true }
						anchor={ fontSizeUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'px' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'em' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.fontSizeUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.fontSizeUnit`, 'rem' );
									setFontSizeUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getFontWeights = () => {
		const fontWeights = [
			{ label: __( '100', 'highlight-and-share' ), value: '100' },
			{ label: __( '200', 'highlight-and-share' ), value: '200' },
			{ label: __( '300', 'highlight-and-share' ), value: '300' },
			{ label: __( '400', 'highlight-and-share' ), value: '400' },
			{ label: __( '500', 'highlight-and-share' ), value: '500' },
			{ label: __( '600', 'highlight-and-share' ), value: '600' },
			{ label: __( '700', 'highlight-and-share' ), value: '700' },
			{ label: __( '800', 'highlight-and-share' ), value: '800' },
			{ label: __( '900', 'highlight-and-share' ), value: '900' },
		];
		return (
			<Controller
				name={ `${ screenSize }.fontWeight` }
				control={ control }
				render={ ( { field: { onChange, value } } ) => (
					<SelectControl
						label={ __( 'Font Weight', 'highlight-and-share' ) }
						value={ value }
						options={ fontWeights }
						onChange={ ( newValue ) => {
							onChange( newValue );
						} }
					/>
				) }
			/>
		);
	};

	const getLineHeight = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.lineHeight` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Line Height', 'highlight-and-share' ) }
							value={ value }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							type="number"
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.lineHeightUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ value }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.lineHeightUnit` ) }
					onClick={ () => {
						setLineHeightUnitPopoverVisible( ! lineHeightUnitPopoverVisible );
					} }
					ref={ setLineHeightUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.lineHeightUnit` ) }
				</Button>
				{ true === lineHeightUnitPopoverVisible && (
					<Popover
						className="has-component-font-unit-picker"
						noArrow={ true }
						anchor={ lineHeightUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'px' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'em' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.lineHeightUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.lineHeightUnit`, 'rem' );
									setLineHeightUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getFontType = () => {
		return (
			<Controller
				name={ `${ screenSize }.fontType` }
				control={ control }
				render={ ( { field: { value } } ) => (
					<TextControl
						type="hidden"
						value={ value }
					/>
				) }
			/>
		);
	};

	const getFontFallback = () => {
		return (
			<Controller
				name={ `${ screenSize }.fontFallback` }
				control={ control }
				render={ ( { field: { value } } ) => (
					<TextControl
						type="hidden"
						value={ value }
					/>
				) }
			/>
		);
	};

	const getLetterSpacing = () => {
		return (
			<>
				<Controller
					name={ `${ screenSize }.letterSpacing` }
					control={ control }
					render={ ( { field: { onChange, value } } ) => (
						<TextControl
							label={ __( 'Letter Spacing', 'highlight-and-share' ) }
							value={ value }
							onChange={ ( newValue ) => {
								onChange( newValue );
							} }
							type="number"
						/>
					) }
				/>
				<Controller
					name={ `${ screenSize }.letterSpacingUnit` }
					control={ control }
					render={ ( { field: { value } } ) => (
						<TextControl
							type="hidden"
							value={ value }
						/>
					) }
				/>
				<Button
					variant="secondary"
					label={ getValues( `${ screenSize }.letterSpacingUnit` ) }
					onClick={ () => {
						setLetterSpacingUnitPopoverVisible( ! letterSpacingUnitPopoverVisible );
					} }
					ref={ setLetterSpacingUnitPopoverAnchor }
				>{ getValues( `${ screenSize }.letterSpacingUnit` ) }
				</Button>
				{ true === letterSpacingUnitPopoverVisible && (
					<Popover
						className="has-component-font-unit-picker"
						noArrow={ true }
						anchor={ letterSpacingUnitPopoverAnchor }
					>
						<ButtonGroup>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'px' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'px' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>px
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'em' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'em' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>em
							</Button>
							<Button
								isPrimary={ getValues( `${ screenSize }.letterSpacingUnit` ) === 'rem' }
								onClick={ () => {
									setValue( `${ screenSize }.letterSpacingUnit`, 'rem' );
									setLetterSpacingUnitPopoverVisible( false );
								} }
							>rem
							</Button>
						</ButtonGroup>
					</Popover>
				) }
			</>
		);
	};

	const getPopoverContent = () => {
		return (
			<BaseControl className="has-typography-picker">
				<div className="has-typography-picker__row has-typography-picker__row__col-full">
					<div className="has-typography-picker__row_item">
						{ getFonts() }
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-full">
					<div className="has-typography-picker__row_item">
						{ getTextTransform() }
						{ getFontType() }
						{ getFontFallback() }
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-2">
					<div className="has-typography-picker__row_item has-units">
						{ getFontSize() }
					</div>
					<div className="has-typography-picker__row_item">
						{ getFontWeights() }
					</div>
				</div>
				<div className="has-typography-picker__row has-typography-picker__row__col-2">
					<div className="has-typography-picker__row_item has-units">
						{ getLineHeight() }
					</div>
					<div className="has-typography-picker__row_item has-units">
						{ getLetterSpacing() }
					</div>
				</div>
			</BaseControl>
		);
	};

	return (
		<BaseControl className="has-typography-picker-wrapper">
			<div className="has-typography-component-label">
				{ label }
			</div>
			<div className="has-typography-component-settings">
				<Button
					variant="secondary"
					label={ __( 'Font Settings', 'highlight-and-share' ) }
					onClick={ () => {
						setFontSettingsPopoverVisible( ! fontSettingsPopoverVisible );
					} }
					icon="admin-settings"
				/>
				{ true === fontSettingsPopoverVisible && (
					<Popover
						className="has-component-typography-popup"
						noArrow={ false }
						anchor={ fontSettingsPopoverAnchor }
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
export default Typography;
