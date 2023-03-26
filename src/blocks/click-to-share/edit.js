/**
 * External dependencies
 */

import classnames from 'classnames';
import { useEffect } from 'react';
import ColorPicker from '../../react/Components/ColorPicker';
import GradientPicker from '../../react/Components/GradientPicker';
import GradientSync from '../../react/Components/GradientSync';
import GradientGenerator from '../../react/Components/GradientGenerator';
import DimensionsControlBlock from '../../react/Components/DimensionsBlock';
import useDeviceType from '../../react/Hooks/useDeviceType';
import UnitChooser from '../../react/Components/unit-picker';
import Typography from '../../react/Components/Typography';
import BackgroundSelector from '../../react/Components/BackgroundSelector';
/* Preset Imports */
import PresetButton from './components/PresetButton';
import { attributes as purpleAttributes } from './presets/purple';
import { attributes as darkAttributes } from './presets/dark';
import { attributes as blueAttributes } from './presets/blue';
import { attributes as lightAttributes } from './presets/light';
import { attributes as pinkAttributes } from './presets/pink';
import { attributes as redAttributes } from './presets/red';
import BlockContent from './components/BlockContent';


const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	RangeControl,
	TextControl,
	TextareaControl,
	ButtonGroup,
	Button,
	ToggleControl,
	Toolbar,
	ToolbarButton,
	Popover,
} = wp.components;

const { useState } = wp.element;
const { InspectorControls, useBlockProps, BlockControls } = wp.blockEditor;

const { useInstanceId } = wp.compose;

const HAS_Click_To_Share = ( props ) => {
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );
	const generatedUniqueId = useInstanceId( HAS_Click_To_Share, 'has-cts' );
	const blockProps = useBlockProps( {
		className: classnames( `highlight-and-share`, `align${ align }` ),
	} );
	const [ quoteToolbarPopoverAnchor, setQuoteToolbarPopoverAnchor ] = useState( null );
	const [ isQuoteToolbarPopoverOpen, setIsQuoteToolbarPopoverOpen ] = useState( false );
	const quoteToolbarTogglePopover = () => setIsQuoteToolbarPopoverOpen( ! isQuoteToolbarPopoverOpen );

	const { attributes, setAttributes, clientId } = props;

	const {
		customShareText,
		shareText,
		backgroundType,
		backgroundColor,
		backgroundColorHover,
		backgroundGradient,
		backgroundGradientHover,
		backgroundGradientSync,
		backgroundImage,
		textColor,
		textColorHover,
		shareTextColor,
		shareTextColorHover,
		showClickToShare,
		showIcon,
		fontSize,
		iconSize,
		clickText,
		padding,
		border,
		borderRadius,
		borderColor,
		iconColor,
		iconColorHover,
		borderColorHover,
		clickShareFontSize,
		maxWidth,
		maxWidthUnit,
		alignment,
		align,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		marginSize,
		paddingSize,
		borderWidth,
		borderRadiusSize,
		uniqueId,
		typographyQuote,
		typographyShareText,
	} = attributes;

	useEffect( () => {
		// Set unique ID for block (for styling).
		setAttributes( { uniqueId: generatedUniqueId } );

		// Port padding to new dimensions object.
		if ( padding !== -1 ) {
			const portPadding = paddingSize;
			portPadding.desktop = {
				top: padding,
				right: padding,
				bottom: padding,
				left: padding,
				unit: 'px',
				unitSync: true,
			};
			
			setAttributes( {
				paddingSize: portPadding,
				padding: -1,
				backgroundColorHover: backgroundColor,
				shareTextColor: textColor,
				shareTextColorHover: textColor,
				textColorHover: textColor,
				borderColorHover: borderColor,
				iconColorHover: textColor,
				iconColor: textColor,
			} );
		}
		// Port margin to new dimensions object.
		if ( marginTop !== -1 ) {
			const portMargin = marginSize;
			portMargin.desktop = {
				top: marginTop,
				right: marginRight,
				bottom: marginBottom,
				left: marginLeft,
				unit: 'px',
				unitSync: true,
			};
			setAttributes( {
				marginSize: portMargin,
				marginTop: -1,
			} );
		}
		// Port border width to new dimensions object.
		if ( border !== -1 ) {
			const portBorderWidth = borderWidth;
			portBorderWidth.desktop = {
				top: border,
				right: border,
				bottom: border,
				left: border,
				unit: 'px',
				unitSync: true,
			};
			setAttributes( {
				borderWidth: portBorderWidth,
				border: -1,
			} );
		}
		// Port border radius to new dimensions object.
		if ( borderRadius !== -1 ) {
			const portBorderRadius = borderRadiusSize;
			portBorderRadius.desktop = {
				top: borderRadius,
				right: borderRadius,
				bottom: borderRadius,
				left: borderRadius,
				unit: 'px',
				unitSync: true,
			};
			setAttributes( {
				borderRadiusSize: portBorderRadius,
				borderRadius: -1,
			} );
		}

		// Port alignment over to align variable.
		if ( alignment !== 'none' ) {
			setAttributes( { align: alignment, alignment: 'none' } );
		}

		// Port over icon size.
		if ( -1 === iconSize ) {
			setAttributes( { iconSize: clickShareFontSize } );
		}
	}, [] );

	

	/* For sticky responsive: forked from GenerateBlocks */
	const panelHeader = document.querySelector(
		'.edit-post-sidebar .edit-post-sidebar__panel-tabs'
	);
	const panelHeaderHeight = panelHeader ? panelHeader.offsetHeight : 0;

	const shareTextToolbar = (
		<BlockControls>
			<Toolbar>
				<ToolbarButton
					icon="editor-quote"
					label={ __( 'Customize the Share Quote', 'highlight-and-share' ) }
					onClick={ quoteToolbarTogglePopover }
					ref={ setQuoteToolbarPopoverAnchor }
				/>
				{ isQuoteToolbarPopoverOpen && (
					<Popover
						placement="right-end"
						anchor={ quoteToolbarPopoverAnchor }
						noArrow={ false }
						className="has-custom-share-text-popover"
					>
						<TextareaControl
							className="has-custom-share-textarea"
							label={ __( 'Custom Share Quote', 'highlight-and-share' ) }
							help={ __(
								'Enter a custom quote to share. This will override what is in the share block.',
								'highlight-and-share'
							) }
							value={ customShareText }
							onChange={ ( value ) => setAttributes( { customShareText: value } ) }
						/>
					</Popover>
				) }
			</Toolbar>
		</BlockControls>
	);

	const inspectorControls = (
		<InspectorControls>
			<div
				id="has-screensize-group"
				className="has-screensize-variants"
				style={ { top: panelHeaderHeight + 'px' } }
			>
				<ButtonGroup>
					<Button
						variant={ deviceType === 'Desktop' ? 'primary' : 'secondary' }
						onClick={ ( e ) => {
							setDeviceType( 'Desktop' );
						} }
						icon="laptop"
						iconSize="14"
						label={ __( 'Desktop', 'highlight-and-share' ) }
					/>
					<Button
						variant={ deviceType === 'Tablet' ? 'primary' : 'secondary' }
						onClick={ ( e ) => {
							setDeviceType( 'Tablet' );
						} }
						icon="tablet"
						label={ __( 'Tablet', 'highlight-and-share' ) }
					/>
					<Button
						variant={ deviceType === 'Mobile' ? 'primary' : 'secondary' }
						onClick={ ( e ) => {
							setDeviceType( 'Mobile' );
						} }
						icon="smartphone"
						label={ __( 'Mobile', 'highlight-and-share' ) }
					/>
				</ButtonGroup>
			</div>
			<PanelBody
				title={ __( 'Presets', 'highlight-and-share' ) }
				initialOpen={ false }
				className="has-presets-panel"
			>
				<PanelRow>
					<div className="has-presets">
						<h3>{ __( 'Select a Preset', 'highlight-and-share' ) }</h3>
						<ButtonGroup>
							<PresetButton
								label={ __( 'Purple Theme', 'highlight-and-share' ) }
								setAttributes={ setAttributes }
								attributes={ purpleAttributes }
								uniqueId={ uniqueId }

							/>
							<PresetButton
								label={ __( 'Dark Theme', 'highlight-and-share' ) }
								setAttributes={ setAttributes }
								attributes={ darkAttributes }
								uniqueId={ uniqueId }

							/>
							<PresetButton
								label={ __( 'Light Theme', 'highlight-and-share' ) }
								setAttributes={ setAttributes }
								attributes={ lightAttributes }
								uniqueId={ uniqueId }

							/>
							<PresetButton
								label={ __( 'Pink Theme', 'highlight-and-share' ) }
								setAttributes={ setAttributes }
								attributes={ pinkAttributes }
								uniqueId={ uniqueId }

							/>
							<PresetButton
								label={ __( 'Blue Theme', 'highlight-and-share' ) }
								setAttributes={ setAttributes }
								attributes={ blueAttributes }
								uniqueId={ uniqueId }

							/>
							<PresetButton
								label={ __( 'Red Theme', 'highlight-and-share' ) }
								setAttributes={ setAttributes }
								attributes={ redAttributes }
								uniqueId={ uniqueId }
							/>
						</ButtonGroup>
					</div>
				</PanelRow>
			</PanelBody>
			{ deviceType === 'Desktop' && (
				<PanelBody
					title={ __( 'Share Settings', 'highlight-and-share' ) }
					initialOpen={ true }
				>
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Click to Share Text', 'alerts-dlx' ) }
							checked={ showClickToShare }
							onChange={ ( value ) => {
								setAttributes( {
									showClickToShare: value,
								} );
							} }
						/>
					</PanelRow>
					{ showClickToShare && (
						<PanelRow>
							<TextControl
								label={ __( 'Click to Share Text', 'highlight-and-share' ) }
								value={ clickText }
								onChange={ ( value ) => {
									setAttributes( { clickText: value } );
								} }
							/>
						</PanelRow>
					) }
					<PanelRow>
						<ToggleControl
							label={ __( 'Show Share Icon', 'alerts-dlx' ) }
							checked={ showIcon }
							onChange={ ( value ) => {
								setAttributes( {
									showIcon: value,
								} );
							} }
						/>
					</PanelRow>
					<PanelRow className="has-range-control">
						<RangeControl
							label={ __( 'Icon Size', 'highlight-and-share' ) }
							value={ iconSize }
							onChange={ ( value ) => setAttributes( { iconSize: value } ) }
							min={ 10 }
							max={ 150 }
							step={ 1 }
						/>
					</PanelRow>
				</PanelBody>
			) }
			{ deviceType === 'Desktop' && (
				<PanelBody
					title={ __( 'Background Settings', 'highlight-and-share' ) }
					initialOpen={ true }
				>
					<PanelRow className="has-background-type">
						<h3>{ __( 'Background Type', 'highlight-and-share' ) }</h3>
						<ButtonGroup>
							<Button
								variant={ backgroundType === 'solid' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( { backgroundType: 'solid' } );
								} }
								label={ __( 'Solid Background', 'highlight-and-share' ) }
							>
								{ __( 'Solid', 'highlight-and-share' ) }
							</Button>
							<Button
								variant={
									backgroundType === 'gradient' ? 'primary' : 'secondary'
								}
								onClick={ ( e ) => {
									setAttributes( { backgroundType: 'gradient' } );
								} }
								label={ __( 'Gradient Background', 'highlight-and-share' ) }
							>
								{ __( 'Gradient', 'highlight-and-share' ) }
							</Button>
							<Button
								variant={ backgroundType === 'image' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( { backgroundType: 'image' } );
								} }
								label={ __( 'Image Background', 'highlight-and-share' ) }
							>
								{ __( 'Image', 'highlight-and-share' ) }
							</Button>
						</ButtonGroup>
					</PanelRow>
					{ backgroundType === 'solid' && (
						<>
							<PanelRow>
								<ColorPicker
									value={ backgroundColor }
									key={ 'background-color' }
									onChange={ ( slug, newValue ) => {
										setAttributes( { backgroundColor: newValue } );
									} }
									label={ __( 'Background Color', 'highlight-and-share' ) }
									defaultColors={ has_gutenberg.colorPalette }
									defaultColor={ backgroundColor }
									slug={ 'background-color' }
								/>
							</PanelRow>
							<PanelRow>
								<ColorPicker
									value={ backgroundColorHover }
									key={ 'background-color-hover' }
									onChange={ ( slug, newValue ) => {
										setAttributes( { backgroundColorHover: newValue } );
									} }
									label={ __( 'Background Color Hover', 'highlight-and-share' ) }
									defaultColors={ has_gutenberg.colorPalette }
									defaultColor={ backgroundColorHover }
									slug={ 'background-color-hover' }
								/>
							</PanelRow>
						</>
					) }
					{ backgroundType === 'gradient' && (
						<>
							<PanelRow className="has-background-gradient-sync">
								<GradientSync
									attributes={ attributes }
									setAttributes={ setAttributes }
									label={ __( 'Sync Gradients', 'highlight-and-share' ) }
								/>
							</PanelRow>
							<PanelRow className="has-background-gradient">
								<GradientPicker
									value={ backgroundGradient }
									onChange={ ( newValue ) => {
										setAttributes( { backgroundGradient: newValue } );
									} }
									label={ __( 'Gradient Background', 'highlight-and-share' ) }
									clearable={ false }
								/>
							</PanelRow>
							<PanelRow className="has-background-gradient">
								<GradientPicker
									value={ backgroundGradientHover }
									onChange={ ( newValue ) => {
										setAttributes( { backgroundGradientHover: newValue } );
									} }
									label={ __( 'Gradient Background Hover', 'highlight-and-share' ) }
									clearable={ false }
								/>
							</PanelRow>
							<PanelRow className="has-background-gradient-generator">
								<GradientGenerator
									setAttributes={ setAttributes }
									label={ __( 'Generate Random Gradient', 'highlight-and-share' ) }
								/>
							</PanelRow>
						</>
					) }
					{ backgroundType === 'image' && (
						<>
							<PanelRow>
								<BackgroundSelector
									label={ __( 'Background Image', 'highlight-and-share' ) }
									values={ backgroundImage }
									onValuesChange={ ( newValue ) => {
										setAttributes( { backgroundImage: newValue } );
									} }
								/>
							</PanelRow>
						</>
					) }
				</PanelBody>
			) }
			{ deviceType === 'Desktop' && (
				<PanelBody
					title={ __( 'Colors', 'highlight-and-share' ) }
					initialOpen={ false }
				>
					<PanelRow>
						<ColorPicker
							value={ backgroundColor }
							key={ 'background-color' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { backgroundColor: newValue } );
							} }
							label={ __( 'Background Color', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ backgroundColor }
							slug={ 'background-color' }
						/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ backgroundColorHover }
							key={ 'background-color-hover' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { backgroundColorHover: newValue } );
							} }
							label={ __( 'Background Color Hover', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ backgroundColorHover }
							slug={ 'background-color-hover' }
						/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ textColor }
							key={ 'text-color' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { textColor: newValue } );
							} }
							label={ __( 'Text Color', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ textColor }
							slug={ 'text-color' }
						/>{ ' ' }
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ textColorHover }
							key={ 'text-color-hover' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { textColorHover: newValue } );
							} }
							label={ __( 'Text Color Hover', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ textColorHover }
							slug={ 'text-color-hover' }
						/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ shareTextColor }
							key={ 'share-text-color' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { shareTextColor: newValue } );
							} }
							label={ __( 'Share Text Color', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ shareTextColor }
							slug={ 'share-text-color' }
						/>{ ' ' }
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ shareTextColorHover }
							key={ 'share-text-color-hover' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { shareTextColorHover: newValue } );
							} }
							label={ __( 'Share Text Color Hover', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ shareTextColorHover }
							slug={ 'share-text-color-hover' }
						/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ borderColor }
							key={ 'border-color' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { borderColor: newValue } );
							} }
							label={ __( 'Border Color', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ borderColor }
							slug={ 'border-color' }
						/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ borderColorHover }
							key={ 'border-color-hover' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { borderColorHover: newValue } );
							} }
							label={ __( 'Border Color Hover', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ borderColorHover }
							slug={ 'border-color-hover' }
						/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ iconColor }
							key={ 'icon-color' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { iconColor: newValue } );
							} }
							label={ __( 'Icon Color', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ iconColor }
							slug={ 'icon-color' }
						/>
					</PanelRow>
					<PanelRow>
						<ColorPicker
							value={ iconColorHover }
							key={ 'icon-color-hover' }
							onChange={ ( slug, newValue ) => {
								setAttributes( { iconColorHover: newValue } );
							} }
							label={ __( 'Icon Color Hover', 'highlight-and-share' ) }
							defaultColors={ has_gutenberg.colorPalette }
							defaultColor={ iconColorHover }
							slug={ 'icon-color-hover' }
						/>
					</PanelRow>
				</PanelBody>
			) }
			<PanelBody
				title={ __( 'Fonts and Typography', 'highlight-and-share' ) }
				initialOpen={ true }
			>
				<PanelRow className="has-typography-panel-row">
					<Typography
						values={ typographyQuote }
						screenSize={ deviceType }
						onValuesChange={ ( formValues ) => {
							setAttributes( {
								typographyQuote: formValues,
							} );
						} }
						label={ __( 'Quote Typography', 'highlight-and-share' ) }
					/>
				</PanelRow>
				<PanelRow className="has-typography-panel-row">
					<Typography
						values={ typographyShareText }
						screenSize={ deviceType }
						onValuesChange={ ( formValues ) => {
							setAttributes( {
								typographyShareText: formValues,
							} );
						} }
						label={ __( 'Share Text Typography', 'highlight-and-share' ) }
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody
				title={ __( 'Spacing and Border', 'highlight-and-share' ) }
				initialOpen={ true }
			>
				{ deviceType === 'Desktop' && (
					<PanelRow className="has-unit-picker">
						<UnitChooser
							label={ __( 'Maximum Width', 'quotes-dlx' ) }
							value={ maxWidthUnit }
							units={ [ 'px', '%', 'vw' ] }
							onClick={ ( value ) => {
								setAttributes( {
									maxWidthUnit: value,
								} );
							} }
						/>

						<TextControl
							type={ 'number' }
							value={ maxWidth }
							onChange={ ( value ) => {
								setAttributes( {
									maxWidth: value,
								} );
							} }
						/>
					</PanelRow>
				) }
				<PanelRow>
					<DimensionsControlBlock
						label={ __( 'Inner Padding', 'highlight-and-share' ) }
						allowNegatives={ false }
						values={ paddingSize }
						labelTop={ __( 'Top', 'highlight-and-share' ) }
						labelRight={ __( 'Right', 'highlight-and-share' ) }
						labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
						labelLeft={ __( 'Left', 'highlight-and-share' ) }
						units={ [ 'px', 'em', 'rem' ] }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( {
								paddingSize: newValues,
							} );
						} }
					/>
				</PanelRow>
				<PanelRow>
					<DimensionsControlBlock
						label={ __( 'Outer Margin', 'highlight-and-share' ) }
						allowNegatives={ false }
						values={ marginSize }
						labelTop={ __( 'Top', 'highlight-and-share' ) }
						labelRight={ __( 'Right', 'highlight-and-share' ) }
						labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
						labelLeft={ __( 'Left', 'highlight-and-share' ) }
						units={ [ 'px', 'em', 'rem' ] }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( {
								marginSize: newValues,
							} );
						} }
					/>
				</PanelRow>
				<PanelRow>
					<DimensionsControlBlock
						label={ __( 'Border Width', 'highlight-and-share' ) }
						allowNegatives={ false }
						values={ borderWidth }
						labelTop={ __( 'Top', 'highlight-and-share' ) }
						labelRight={ __( 'Right', 'highlight-and-share' ) }
						labelBottom={ __( 'Bottom', 'highlight-and-share' ) }
						labelLeft={ __( 'Left', 'highlight-and-share' ) }
						units={ [ 'px', 'em', 'rem' ] }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( {
								borderWidth: newValues,
							} );
						} }
					/>
				</PanelRow>
				<PanelRow>
					<DimensionsControlBlock
						label={ __( 'Border Radius', 'highlight-and-share' ) }
						allowNegatives={ false }
						values={ borderRadiusSize }
						labelTop={ __( 'Top Left', 'highlight-and-share' ) }
						labelRight={ __( 'Top Right', 'highlight-and-share' ) }
						labelBottom={ __( 'Bottom Right', 'highlight-and-share' ) }
						labelLeft={ __( 'Bottom Left', 'highlight-and-share' ) }
						units={ [ 'px', 'em', 'rem', '%' ] }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( {
								borderRadiusSize: newValues,
							} );
						} }
					/>
				</PanelRow>
				{ deviceType === 'Desktop' && (
					<>
						<PanelRow>
							<ColorPicker
								value={ borderColor }
								key={ 'border-color' }
								onChange={ ( slug, newValue ) => {
									setAttributes( { borderColor: newValue } );
								} }
								label={ __( 'Border Color', 'highlight-and-share' ) }
								defaultColors={ has_gutenberg.colorPalette }
								defaultColor={ borderColor }
								slug={ 'border-color' }
							/>
						</PanelRow>
						<PanelRow>
							<ColorPicker
								value={ borderColorHover }
								key={ 'border-color-hover' }
								onChange={ ( slug, newValue ) => {
									setAttributes( { borderColorHover: newValue } );
								} }
								label={ __( 'Border Color Hover', 'highlight-and-share' ) }
								defaultColors={ has_gutenberg.colorPalette }
								defaultColor={ borderColorHover }
								slug={ 'border-color-hover' }
							/>
						</PanelRow>
					</>
				) }
			</PanelBody>
		</InspectorControls>
	);

	const block = (
		<>
			{ shareTextToolbar }
			{ inspectorControls }
			{ <BlockContent attributes={ attributes } setAttributes={ setAttributes } clientId={ clientId } /> }
		</>
	);

	

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default HAS_Click_To_Share;
