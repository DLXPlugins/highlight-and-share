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
} = wp.editor;

class HAS_Click_To_Share extends Component {
	constructor() {
		super( ...arguments );
	}

	onChangeValue = (value) => {
		this.setState( {
			shareText: value
		} );
	}

	render() {

		let {
			attributes: {
				shareText,
				backgroundColor,
				textColor,
				fontSize,

			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;
		return (
			<div className="has-click-to-share'">
				<RichText
					tagName="div"
					placeholder={ __( 'Add share text', 'highlight-and-share' ) }
					value={ shareText }
					className='has-click-to-share-text'
					style={ {
						color: textColor,
						fontSize: fontSize + 'px'
					} }
					formattingControls={[]}
					onChange={ ( value ) => { this.onChangeValue(value); setAttributes( { shareText: value } ) } }
				/>
			</div>
		)
	}
}

export default HAS_Click_To_Share;