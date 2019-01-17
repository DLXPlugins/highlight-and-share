/**
 * External dependencies
 */

import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import { stringify } from 'querystringify';
import axios from 'axios';
var HtmlToReactParser = require('html-to-react').Parser;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { apiFetch } = wp;

const {
	registerStore,
} = wp.data;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;

const {
	InspectorControls,
	RichText,
	PanelColorSettings,
} = wp.editor;

class HAS_Click_To_Share extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			shareText: __( 'Click to Share', 'highlight-and-share' ),
			borderRadius: this.props.attributes.borderRadius
		};
	}

	onChangeValue = (value) => {
		this.setState( {
			shareText: value
		} );
	}

	borderRoundedChange = ( value ) => {
		this.setState( {
			borderRadius: value
		} );
	}

	render() {

		let {
			attributes: {
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
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;
		const onChangeBackgroundColor = value => setAttributes( { backgroundColor: value } );
		const onChangeTextColor = value => setAttributes( { textColor: value } );
		const onChangeBorderColor = value => setAttributes( { borderColor: value } );
		let hasStyles = {
			fontSize: fontSize + 'px',
			padding: padding + 'px',
			border: `${border}px solid ${borderColor}`,
			borderRadius: borderRadius + 'px',
			backgroundColor: backgroundColor,
			color: textColor,
			maxWidth: `${maxWidth}%`,
			marginLeft: marginLeft + 'px',
			marginRight: marginRight + 'px',
			marginBottom: marginBottom + 'px',
			marginTop: marginTop + 'px'
		};
		if ( 'center' == alignment ) {
			hasStyles.margin = '0 auto';
		}
		if( 'left' == alignment ) {
			hasStyles.float = 'left';
		}
		if( 'right' == alignment ) {
			hasStyles.float = 'right';
		}
		let fontWeightArr = Array();
		fontWeightArr.push( { label: __('Normal', 'highlight-and-share'), value: 100 } );
		fontWeightArr.push( { label: __('Bold', 'highlight-and-share'), value: 400 } );
		fontWeightArr.push( { label: __('Bolder', 'highlight-and-share'), value: 700 } );

		let alignmentArr = Array();
		alignmentArr.push( { label: __('Left', 'highlight-and-share'), value: 'left' } );
		alignmentArr.push( { label: __('center', 'highlight-and-share'), value: 'center' } );
		alignmentArr.push( { label: __('right', 'highlight-and-share'), value: 'right' } );

		return (
			<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Highlight and Share Settings', 'highlight-and-share' ) }>
					<PanelColorSettings
						title={ __( 'Background Color', 'highlight-and-share' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Background Color', 'highlight-and-share' ),
						} ] }
					></PanelColorSettings>
					<PanelColorSettings
						title={ __( 'Text Color', 'highlight-and-share' ) }
						initialOpen={ false }
						colorSettings={ [ {
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'highlight-and-share' ),
						} ] }
					></PanelColorSettings>
					<SelectControl
							label={ __( 'Font Weight', 'highlight-and-share' ) }
							value={fontWeight}
							options={ fontWeightArr }
							onChange={ ( value ) => { setAttributes({fontWeight: value}); } }
					/>
					<TextControl
						label={__('Click to Share Text', 'highlight-and-share')}
						value={clickText}
						onChange={ ( value ) => { this.props.setAttributes( { clickText: value }); } }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Spacing and Font Settings', 'highlight-and-share' ) } initialOpen={false}>
				<RangeControl
						label={ __( 'Font Size', 'highlight-and-share' ) }
						value={ fontSize }
						onChange={ ( value ) => this.props.setAttributes( { fontSize: value } ) }
						min={ 10 }
						max={ 40 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Click to Share Font Size', 'highlight-and-share' ) }
						value={ clickShareFontSize }
						onChange={ ( value ) => this.props.setAttributes( { clickShareFontSize: value } ) }
						min={ 10 }
						max={ 40 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Padding', 'highlight-and-share' ) }
						value={ padding }
						onChange={ ( value ) => this.props.setAttributes( { padding: value } ) }
						min={ 0 }
						max={ 60 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Border', 'highlight-and-share' ) }
						value={ border }
						onChange={ ( value ) => this.props.setAttributes( { border: value } ) }
						min={ 0 }
						max={ 10 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Border Rounded', 'highlight-and-share' ) }
						value={ this.state.borderRadius }
						onChange={ ( value ) => { this.borderRoundedChange(value); this.props.setAttributes( { borderRadius: value } ) } }
						min={ 0 }
						max={ 30 }
						step={ 1 }
					/>
					<PanelColorSettings
					title={ __( 'Border Color', 'highlight-and-share' ) }
					initialOpen={ false }
					colorSettings={ [ {
						value: borderColor,
						onChange: onChangeBorderColor,
						label: __( 'Border Color', 'highlight-and-share' ),
					} ] }
					></PanelColorSettings>
				</PanelBody>
				<PanelBody title={ __( 'Alignment, Width, and Margins', 'highlight-and-share' ) }>
					<RangeControl
						label={ __( 'Max Width', 'highlight-and-share' ) }
						value={ maxWidth }
						onChange={ ( value ) => this.props.setAttributes( { maxWidth: value } ) }
						min={ 0 }
						max={ 100 }
						step={ 5 }
					/>
					<SelectControl
							label={ __( 'Alignment', 'highlight-and-share' ) }
							value={alignment}
							options={ alignmentArr }
							onChange={ ( value ) => { setAttributes({alignment: value}); } }
					/>
					<RangeControl
						label={ __( 'Margin Left', 'highlight-and-share' ) }
						value={ marginLeft }
						onChange={ ( value ) => this.props.setAttributes( { marginLeft: value } ) }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Margin Right', 'highlight-and-share' ) }
						value={ marginRight }
						onChange={ ( value ) => this.props.setAttributes( { marginRight: value } ) }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Margin Top', 'highlight-and-share' ) }
						value={ marginTop }
						onChange={ ( value ) => this.props.setAttributes( { marginTop: value } ) }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Margin Bottom', 'highlight-and-share' ) }
						value={ marginBottom }
						onChange={ ( value ) => this.props.setAttributes( { marginBottom: value } ) }
						min={ 0 }
						max={ 20 }
						step={ 1 }
					/>
				</PanelBody>
			</InspectorControls>
			<Fragment>
				<div className={
					classnames(
						'has-click-to-share',
					)
				} style={hasStyles}>
					<div className="has-click-to-share-wrapper">
						<RichText
							tagName="div"
							placeholder={ __( 'Add share text', 'highlight-and-share' ) }
							value={ shareText }
							className='has-click-to-share-text'
							style={ {
								color: textColor,
								fontSize: fontSize + 'px',
								fontWeight: fontWeight
							} }
							formattingControls={[]}
							onChange={ ( value ) => { this.onChangeValue(value); setAttributes( { shareText: value } ) } }
						/>
						<div className='has-click-to-share-cta' style={{ fontSize: clickShareFontSize}}>
							{clickText} <i class="material-icons" style={{ fontSize: clickShareFontSize}}>share</i>
						</div>
					</div>
				</div>
			</Fragment>
			</Fragment>
		)
	}
}

export default HAS_Click_To_Share;