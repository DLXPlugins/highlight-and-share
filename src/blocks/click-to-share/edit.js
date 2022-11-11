/**
 * External dependencies
 */

import classnames from 'classnames';
import ColorPicker from '../../react/Components/ColorPicker';

const { __ } = wp.i18n;

const { PanelBody, RangeControl, SelectControl, TextControl } = wp.components;

const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;

const HAS_Click_To_Share = ( props ) => {
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
	} = attributes;

	const hasStyles = {
		fontSize: fontSize + 'px',
		padding: padding + 'px',
		border: `${ border }px solid ${ borderColor }`,
		borderRadius: borderRadius + 'px',
		backgroundColor,
		color: textColor,
		maxWidth: `${ maxWidth }%`,
		marginLeft: marginLeft + 'px',
		marginRight: marginRight + 'px',
		marginBottom: marginBottom + 'px',
		marginTop: marginTop + 'px',
	};
	if ( 'center' == alignment ) {
		hasStyles.margin = '0 auto';
	}
	if ( 'left' == alignment ) {
		hasStyles.float = 'left';
	}
	if ( 'right' == alignment ) {
		hasStyles.float = 'right';
	}
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

	const inspectorControls = (
		<InspectorControls>
			<PanelBody
				title={ __( 'Highlight and Share Settings', 'highlight-and-share' ) }
			>
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
					label={ __( 'Padding', 'highlight-and-share' ) }
					value={ padding }
					onChange={ ( value ) => setAttributes( { padding: value } ) }
					min={ 0 }
					max={ 60 }
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
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default HAS_Click_To_Share;
