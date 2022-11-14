/**
 * External dependencies
 */

import classnames from 'classnames';
import { useEffect } from 'react';
import ColorPicker from '../../react/Components/ColorPicker';
import DimensionsControlBlock from '../../react/Components/DimensionsBlock';
import useDeviceType from '../../react/Hooks/useDeviceType';
import { buildDimensionsCSS } from '../../react/Utils/DimensionsHelper';
import UnitChooser from '../../react/Components/unit-picker';

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelRow,
	RangeControl,
	SelectControl,
	TextControl,
	ButtonGroup,
	Button,
	ToggleControl,
} = wp.components;

const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;

const { useInstanceId } = wp.compose;

const HAS_Click_To_Share = ( props ) => {
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );
	const generatedUniqueId = useInstanceId( HAS_Click_To_Share, 'has-cts' );

	const { attributes, setAttributes } = props;
	const {
		shareText,
		backgroundColor,
		backgroundColorHover,
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
		fontWeight,
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

	const hasStyles = {
		fontSize: fontSize + 'px',
		padding: buildDimensionsCSS( paddingSize, deviceType ),
		borderWidth: buildDimensionsCSS( borderWidth, deviceType ),
		borderRadius: buildDimensionsCSS( borderRadiusSize, deviceType ),
		maxWidth: `${ maxWidth }${ maxWidthUnit }`,
		margin: buildDimensionsCSS( marginSize, deviceType ),
	};
	const styles = `
		#${ uniqueId }.has-click-to-share {
			background-color: ${ backgroundColor };
			border-color: ${ borderColor };

		}
		#${ uniqueId }.has-click-to-share:hover {
			background-color: ${ backgroundColorHover };
			border-color: ${ borderColorHover };
		}
		
		#${ uniqueId } .has-click-to-share-cta {
			color: ${ shareTextColor }
		}
		#${ uniqueId }:hover .has-click-to-share-cta {
			color: ${ shareTextColorHover }
		}
		#${ uniqueId } .has-click-to-share-text {
			color: ${ textColor };
		}
		#${ uniqueId }:hover .has-click-to-share-text {
			color: ${ textColorHover };
		}
		#${ uniqueId } .has-click-to-share-cta svg {
			color: ${ iconColor };
		}
		#${ uniqueId }:hover .has-click-to-share-cta svg {
			color: ${ iconColorHover };
		}
	`;
	const fontWeightArr = Array();
	fontWeightArr.push( {
		label: __( 'Normal', 'highlight-and-share' ),
		value: 100,
	} );
	fontWeightArr.push( { label: __( 'Bold', 'highlight-and-share' ), value: 400 } );
	fontWeightArr.push( {
		label: __( 'Bolder', 'highlight-and-share' ),
		value: 700,
	} );

	/* For sticky responsive: forked from GenerateBlocks */
	const panelHeader = document.querySelector(
		'.edit-post-sidebar .edit-post-sidebar__panel-tabs'
	);
	const panelHeaderHeight = panelHeader ? panelHeader.offsetHeight : 0;

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
			<PanelBody
				title={ __( 'Fonts and Typography', 'highlight-and-share' ) }
				initialOpen={ false }
			>
				<div>Coming Soon</div>
			</PanelBody>
			<PanelBody
				title={ __( 'Spacing and Border', 'highlight-and-share' ) }
				initialOpen={ false }
			>
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
						labelTop={ __( 'T-Left', 'highlight-and-share' ) }
						labelRight={ __( 'T-Right', 'highlight-and-share' ) }
						labelBottom={ __( 'B-Right', 'highlight-and-share' ) }
						labelLeft={ __( 'B-Left', 'highlight-and-share' ) }
						units={ [ 'px', 'em', 'rem' ] }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( {
								borderRadiusSize: newValues,
							} );
						} }
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
			</PanelBody>
			<PanelBody
				title={ __( 'Highlight and Share Settings', 'highlight-and-share' ) }
			>

				<SelectControl
					label={ __( 'Font Weight', 'highlight-and-share' ) }
					value={ fontWeight }
					options={ fontWeightArr }
					onChange={ ( value ) => {
						setAttributes( { fontWeight: value } );
					} }
				/>

			</PanelBody>
			<PanelBody
				title={ __( 'Spacing and Font Settings', 'highlight-and-share' ) }
				initialOpen={ false }
			>
				<RangeControl
					label={ __( 'Font Size', 'highlight-and-share' ) }
					value={ fontSize }
					onChange={ ( value ) => setAttributes( { fontSize: value } ) }
					min={ 10 }
					max={ 40 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Click to Share Font Size', 'highlight-and-share' ) }
					value={ clickShareFontSize }
					onChange={ ( value ) => setAttributes( { clickShareFontSize: value } ) }
					min={ 10 }
					max={ 40 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Border', 'highlight-and-share' ) }
					value={ border }
					onChange={ ( value ) => setAttributes( { border: value } ) }
					min={ 0 }
					max={ 10 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Border Rounded', 'highlight-and-share' ) }
					value={ borderRadius }
					onChange={ ( value ) => {
						setAttributes( { borderRadius: value } );
					} }
					min={ 0 }
					max={ 30 }
					step={ 1 }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const block = (
		<>
			{ inspectorControls }
			<style>
				{ styles }
			</style>
			<div className={ classnames( 'has-click-to-share' ) } style={ hasStyles } id={ uniqueId }>
				<div className="has-click-to-share-wrapper">
					<RichText
						tagName="div"
						multiline="p"
						placeholder={ __( 'Add share text', 'highlight-and-share' ) }
						value={ shareText }
						className="has-click-to-share-text"
						allowedFormats={ [
							'core/bold',
							'core/italic',
							'core/text-color',
							'core/subscript',
							'core/superscript',
							'core/strikethrough',
						] }
						onChange={ ( value ) => {
							setAttributes( { shareText: value } );
						} }
					/>
					<div
						className="has-click-to-share-cta"
						style={ { fontSize: clickShareFontSize } }
					>
						{ showClickToShare && (
							<>
								{ clickText }{ ' ' }
							</>
						) }
						{ showIcon && (
							<svg
								style={ {
									width: iconSize,
									height: iconSize,
								} }
								aria-hidden="true"
								focusable="false"
								data-prefix="fas"
								data-icon="share-alt"
								className="svg-inline--fa fa-share-alt fa-w-14"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
							>
								<path
									fill="currentColor"
									d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
								></path>
							</svg>
						) }
					</div>
				</div>
			</div>
		</>
	);

	const blockProps = useBlockProps( {
		className: classnames( `highlight-and-share`, `align${ align }` ),
	} );

	return (
		<>
			<div { ...blockProps }>
				{ block }
			</div>
		</>
	);
};

export default HAS_Click_To_Share;
