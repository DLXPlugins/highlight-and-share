/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */
import './block/style.scss';
import './block/editor.scss';
import './block/blocks/click-to-share/block';

const { PanelBody, PanelRow, TextControl, SelectControl, Popover, Button, CheckboxControl, withSpokenMessages } = wp.components;
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
} = wp.blockEditor;
registerFormatType( 'has/inline', {
	title: __( 'Highlight and Share', 'highlight-and-share' ),
	tagName: 'span',
	attributes: {
		onclick: 'onclick',
		class: 'class',
		data_theme: 'data-theme',
	},
	className: 'has-inline-text',
	edit: withSpokenMessages( class HASInline extends Component {
		constructor() {
			super( ...arguments );

			const format = getActiveFormat(this.props.value, 'has/inline');
			let theme = 'has-inline-theme-default';
			if ( undefined != format ) {
				theme = format.attributes.data_theme || theme;
			}
			this.state = {
				classname: 'has-inline-theme-default',
				modal: false,
				theme: theme,
			};
		}
		onClick = () => {
			if ( this.props.isActive ) {
				this.props.onChange( removeFormat(
					this.props.value,
					'has/inline'
				) );
				return;
			} else {
				this.props.onChange( applyFormat(
					this.props.value,
					{
						type: 'has/inline',
						attributes: {
						}
					}
				) );
			}
			let theme = '';

			if ( this.state.modal == false || this.props.isActive ) {
				let format = getActiveFormat(this.props.value, 'has/inline');
				if ( undefined != format ) {
					
					theme = format.attributes.theme;
					this.setState( { theme: theme } );
				}
				this.setState(
					{
						modal: true,
						theme: theme,
					}
				);
			} else {
				this.setState(
					{
						modal: false,
						theme: theme,
					}
				);
			}
		}
		onCancel = () => {
			this.setState( { modal: false } );
		}
		onRemove = () => {
			this.props.onChange( removeFormat(
				this.props.value,
				'has/inline'
			) );
			return;
		}
		onSave = ( themeValue = false ) => {
			this.props.onChange( applyFormat(
				this.props.value,
				{
					type: 'has/inline',
					attributes: {
						class: `has-inline-text`,
						theme: themeValue ? themeValue: this.state.theme,
						data_theme: themeValue ? themeValue: this.state.theme,
					}
				}
			) );
		}
		render() {
			let isActive = this.props.isActive;
			let format = getActiveFormat(this.props.value, 'has/inline');
			let renderModal = false;
			if ( ( this.state.modal && this.props.value.start != this.props.value.end ) || ( isActive && undefined !== format ) ) {
				renderModal = true;
			} else {
				renderModal = false;
			}			

			// Inline themes
			let inlineThemes = [];
			for (var key in has_gutenberg.themes) {
				inlineThemes.push({ value: key, label: has_gutenberg.themes[key] });
			}
			return (
				<Fragment>
					{false === this.props.isActive &&
						<RichTextToolbarButton
							icon={<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M6,14l3,3v5h6v-5l3-3V9H6V14z M11,2h2v3h-2V2z M3.5,5.88l1.41-1.41l2.12,2.12L5.62,8L3.5,5.88z M16.96,6.59l2.12-2.12 l1.41,1.41L18.38,8L16.96,6.59z"/></g></g></g></svg>}
							title={__('Highlight and Share', 'highlight-and-share')}
							onClick={this.onClick}
						/>
					}
					{true === this.props.isActive &&
						<RichTextToolbarButton
							icon={<svg style={{backgroundColor: '#555d66', color: '#FFFFFF'}} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><rect fill="none" height="24" width="24"/></g><g><g><g><path d="M6,14l3,3v5h6v-5l3-3V9H6V14z M11,2h2v3h-2V2z M3.5,5.88l1.41-1.41l2.12,2.12L5.62,8L3.5,5.88z M16.96,6.59l2.12-2.12 l1.41,1.41L18.38,8L16.96,6.59z"/></g></g></g></svg>}
							title={__('Highlight and Share', 'highlight-and-share')}
							onClick={this.onClick}
						/>
					}
					{renderModal && format !== undefined &&
						<Fragment>
							<Popover position="top" noArrow>
								<div className="has-inline-theme-edit">
									<h2>{__('Select a Highlight Theme', 'highlight-and-share')}</h2>
									<SelectControl
						label={__("Themes", "highlight-and-share")}
						options={inlineThemes}
						value={format.attributes.data_theme}
						onChange={(value) => {
							this.setState( {
								theme: value,
							});
							this.onSave( value );
						}}
					/>
								</div>
							</Popover>
						</Fragment>
					}
				</Fragment>
			)
		}
	} )
} );