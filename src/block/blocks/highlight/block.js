const { PanelBody, PanelRow, Popover, TextControl, Popover, Button, CheckboxControl, withSpokenMessages } = wp.components;
const { __, _x } = wp.i18n;
const {registerFormatType, getActiveFormat, applyFormat, toggleFormat, removeFormat } = window.wp.richText;
const { Fragment, Component } = wp.element;
const {
	InspectorControls,
	BlockControls,
	MediaUpload,
	RichText,
	AlignmentToolbar,
	PanelColorSettings,
	RichTextToolbarButton,
} = window.wp.editor;
registerFormatType( 'has/inline', {
	title: __( 'Inline Share', 'metronet-tag-manager' ),
	tagName: 'span',
	attributes: {
		onclick: 'onclick',
		className: 'has-inline-text',
	},
	className: 'has-inline-text',
	edit: withSpokenMessages( class MTMDLEdit extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
			};
		}
		onClick = () => {
			if ( this.props.isActive ) {
				this.props.onChange( removeFormat(
					this.props.value,
					'has/inline'
				) );
				return;
			}
		}
		onRemove = () => {
			this.props.onChange( removeFormat(
				this.props.value,
				'has/inline'
			) );
			return;
		}
		render() {
			let isActive = this.props.isActive;
			let format = getActiveFormat(this.props.value, 'has/inline');
			return (
				<Fragment>
					{false === this.props.isActive &&
						<RichTextToolbarButton
							icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>}
							title={__('Datalayer Link', 'metronet-tag-manager')}
							onClick={this.onClick}
						/>
					}
					{true === this.props.isActive &&
						<RichTextToolbarButton
							icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{backgroundColor: '#555d66', color: '#FFFFFF'}} viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>}
							title={__('Datalayer Link', 'metronet-tag-manager')}
							onClick={this.onClick}
						/>
					}
				</Fragment>
			)
		}
	} )
} );