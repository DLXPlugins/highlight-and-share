/**
 * External dependencies
 */

import classnames from 'classnames';
import { useEffect } from 'react';
import ColorPicker from '../../react/Components/ColorPicker';
import DimensionsControlBlock from '../../react/Components/DimensionsBlock';
import useDeviceType from '../../react/Hooks/useDeviceType';
import { buildDimensionsCSS } from '../../react/Utils/DimensionsHelper';

const { __ } = wp.i18n;

const { PanelBody, PanelRow, RangeControl, SelectControl, TextControl, ButtonGroup, Button, BaseControl } = wp.components;

const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;

const { useInstanceId } = wp.compose;

const HAS_Click_To_Share = ( props ) => {
	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );
	const generatedUniqueId = useInstanceId(
		HAS_Click_To_Share,
		'has-cts'
	);

	const { attributes, setAttributes } = props;
	const {
		shareText,
		backgroundColor,
		textColor,
		fontSize,
		clickText,
		padding,
		border,
		borderRadius,
		borderColor,
		fontWeight,
		clickShareFontSize,
		maxWidth,
		alignment,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		marginSize,
		paddingSize,
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
	}, [] );

	const hasStyles = {
		fontSize: fontSize + 'px',
		padding: buildDimensionsCSS( paddingSize, deviceType ),
		border: `${ border }px solid ${ borderColor }`,
		borderRadius: borderRadius + 'px',
		backgroundColor,
		color: textColor,
		maxWidth: `${ maxWidth }%`,
		margin: buildDimensionsCSS( marginSize, deviceType ),
	};
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

	const alignmentArr = Array();
	alignmentArr.push( {
		label: __( 'Left', 'highlight-and-share' ),
		value: 'left',
	} );
	alignmentArr.push( {
		label: __( 'center', 'highlight-and-share' ),
		value: 'center',
	} );
	alignmentArr.push( {
		label: __( 'right', 'highlight-and-share' ),
		value: 'right',
	} );

	/* For sticky responsive: forked from GenerateBlocks */
	const panelHeader = document.querySelector( '.edit-post-sidebar .edit-post-sidebar__panel-tabs' );
	const panelHeaderHeight = panelHeader ? panelHeader.offsetHeight : 0;

	const inspectorControls = (
		<InspectorControls>
			<div id="has-screensize-group" className="has-screensize-variants" style={ { top: panelHeaderHeight + 'px' } }>
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
					/></PanelRow>
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
					/>	</PanelRow>
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
					/></PanelRow>
					<div>Icon Color</div>
			</PanelBody>
			<PanelBody
				title={ __( 'Fonts and Typography', 'highlight-and-share' ) }
				initialOpen={ false }
			>
				<div>Coming Soon</div>
			</PanelBody>
			<PanelBody
				title={ __( 'Container Settings', 'highlight-and-share' ) }
				initialOpen={ false }
			>
				<div>Max Width</div>
				<div>Background Image</div>
			</PanelBody>
			<PanelBody
				title={ __( 'Spacing and Border', 'highlight-and-share' ) }
				initialOpen={ false }
			>
				<PanelRow>
					<DimensionsControlBlock
						label={ __( 'Inner Padding', 'highlight-and-share' ) }
						allowNegatives={ false }
						values={ paddingSize }
						labelTop={ __( 'T-Left', 'highlight-and-share' ) }
						labelRight={ __( 'T-Right', 'highlight-and-share' ) }
						labelBottom={ __( 'B-Right', 'highlight-and-share' ) }
						labelLeft={ __( 'B-Left', 'highlight-and-share' ) }
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
						labelTop={ __( 'T-Left', 'highlight-and-share' ) }
						labelRight={ __( 'T-Right', 'highlight-and-share' ) }
						labelBottom={ __( 'B-Right', 'highlight-and-share' ) }
						labelLeft={ __( 'B-Left', 'highlight-and-share' ) }
						units={ [ 'px', 'em', 'rem' ] }
						screenSize={ deviceType }
						onValuesChange={ ( newValues ) => {
							setAttributes( {
								marginSize: newValues,
							} );
						} }
					/>
				</PanelRow>
				<div>Padding</div>
				<div>Margin</div>
				<div>Border Width</div>
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
					/></PanelRow>
				<div>Border Radius</div>
			</PanelBody>
			<PanelBody
				title={ __( 'Highlight and Share Settings', 'highlight-and-share' ) }
			>
				<DimensionsControlBlock
					label={ __( 'Border Radius', 'highlight-and-share' ) }
					allowNegatives={ false }
					values={ paddingSize }
					labelTop={ __( 'T-Left', 'highlight-and-share' ) }
					labelRight={ __( 'T-Right', 'highlight-and-share' ) }
					labelBottom={ __( 'B-Right', 'highlight-and-share' ) }
					labelLeft={ __( 'B-Left', 'highlight-and-share' ) }
					units={ [ 'px', 'em', 'rem' ] }
					screenSize={ deviceType }
					onValuesChange={ ( newValues ) => {
						setAttributes( {
							paddingSize: newValues,
						} );
					} }
				/>

				<SelectControl
					label={ __( 'Font Weight', 'highlight-and-share' ) }
					value={ fontWeight }
					options={ fontWeightArr }
					onChange={ ( value ) => {
						setAttributes( { fontWeight: value } );
					} }
				/>
				<TextControl
					label={ __( 'Click to Share Text', 'highlight-and-share' ) }
					value={ clickText }
					onChange={ ( value ) => {
						setAttributes( { clickText: value } );
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
					onChange={ ( value ) =>
						setAttributes( { clickShareFontSize: value } )
					}
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
			<PanelBody
				title={ __( 'Alignment, Width, and Margins', 'highlight-and-share' ) }
			>
				<RangeControl
					label={ __( 'Max Width', 'highlight-and-share' ) }
					value={ maxWidth }
					onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
					min={ 0 }
					max={ 100 }
					step={ 5 }
				/>
				<SelectControl
					label={ __( 'Alignment', 'highlight-and-share' ) }
					value={ alignment }
					options={ alignmentArr }
					onChange={ ( value ) => {
						setAttributes( { alignment: value } );
					} }
				/>
				<RangeControl
					label={ __( 'Margin Left', 'highlight-and-share' ) }
					value={ marginLeft }
					onChange={ ( value ) => setAttributes( { marginLeft: value } ) }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Margin Right', 'highlight-and-share' ) }
					value={ marginRight }
					onChange={ ( value ) => setAttributes( { marginRight: value } ) }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Margin Top', 'highlight-and-share' ) }
					value={ marginTop }
					onChange={ ( value ) => setAttributes( { marginTop: value } ) }
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
				<RangeControl
					label={ __( 'Margin Bottom', 'highlight-and-share' ) }
					value={ marginBottom }
					onChange={ ( value ) =>
						setAttributes( { marginBottom: value } )
					}
					min={ 0 }
					max={ 20 }
					step={ 1 }
				/>
			</PanelBody>
		</InspectorControls>
	);

	const block = (
		<>
			{ inspectorControls }

			<div className={ classnames( 'has-click-to-share' ) } style={ hasStyles }>
				<div className="has-click-to-share-wrapper">
					<RichText
						tagName="div"
						placeholder={ __( 'Add share text', 'highlight-and-share' ) }
						value={ shareText }
						className="has-click-to-share-text"
						style={ {
							color: textColor,
							fontSize: fontSize + 'px',
							fontWeight,
						} }
						allowedFormats={ [] }
						onChange={ ( value ) => {
							setAttributes( { shareText: value } );
						} }
					/>
					<div
						className="has-click-to-share-cta"
						style={ { fontSize: clickShareFontSize } }
					>
						{ clickText }{ ' ' }
						<svg
							style={ {
								width: clickShareFontSize,
								height: clickShareFontSize,
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
					</div>
				</div>
			</div>
		</>
	);

	const blockProps = useBlockProps( {
		className: classnames( `highlight-and-share` ),
	} );

	return (
		<>
			<div { ...blockProps } id={ uniqueId }>{ block }</div>
		</>
	);
};

export default HAS_Click_To_Share;
