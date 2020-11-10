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
		data_inline_type: 'data-inline-type'
	},
	className: 'has-inline-text',
	edit: withSpokenMessages( class HASInline extends Component {
		constructor() {
			super( ...arguments );

			const format = getActiveFormat(this.props.value, 'has/inline');
			let theme = 'has-inline-theme-default';
			let inlineType= 'inline';
			if ( undefined != format ) {
				theme = format.attributes.data_theme || theme;
				inlineType = format.attributtes.data_inline_type || inlineType
			}
			this.state = {
				classname: 'has-inline-theme-default',
				modal: false,
				theme: theme,
				inlineType: inlineType,
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
			let theme = this.state.theme;
			let inlineType = this.state.inlineType;

			if ( this.state.modal == false || this.props.isActive ) {
				let format = getActiveFormat(this.props.value, 'has/inline');
				if ( undefined != format ) {
					
					theme = format.attributes.data_theme;
					inlineType = format.attributes.data_inline_type;
					this.setState( { theme: theme, inlineType: inlineType } );
				}
				this.setState(
					{
						modal: true,
					}
				);
			} else {
				this.setState(
					{
						modal: false,
						theme: theme,
						inlineType: inlineType,
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
		onSaveTheme = ( themeValue = false ) => {
			this.props.onChange( applyFormat(
				this.props.value,
				{
					type: 'has/inline',
					attributes: {
						class: `has-inline-text`,
						data_inline_type: this.state.inlineType,
						data_theme: themeValue ? themeValue: this.state.theme,
					}
				}
			) );
		}
		onSaveInlineType = ( inlineType = false ) => {
			this.props.onChange( applyFormat(
				this.props.value,
				{
					type: 'has/inline',
					attributes: {
						class: `has-inline-text`,
						data_inline_type: inlineType ? inlineType: this.state.inlineType,
						data_theme: this.state.theme,
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

			const inlineTypes = [
				{
					value: 'inline', label: __( 'Inline', 'highlight-and-share' ),
				},
				{ value: 'inline-block', label: __('Inline Block', 'highlight-and-share' ) },
				{ value: 'block', label: __('Block', 'highlight-and-share' ) },
			];

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
									<SelectControl
						label={__("Themes", "highlight-and-share")}
						options={inlineThemes}
						value={format.attributes.data_theme}
						onChange={(value) => {
							this.setState( {
								theme: value,
							});
							this.onSaveTheme( value );
						}}
					/>
					<SelectControl
						label={__("Inline Type", "highlight-and-share")}
						options={inlineTypes}
						value={format.attributes.data_inline_type}
						onChange={(value) => {
							this.setState( {
								inlineType: value,
							});
							this.onSaveInlineType( value );
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