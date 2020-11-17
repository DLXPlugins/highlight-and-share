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

const {__, _x} = wp.i18n;
const {registerFormatType, applyFormat, removeFormat} = window.wp.richText;
const {Fragment} = wp.element;
const {RichTextToolbarButton} = wp.blockEditor;

registerFormatType('has/inline', {
	title: __('Highlight and Share', 'highlight-and-share'),
	tagName: 'span',
	attributes: {
		class: 'class',
	},
	className: 'has-inline-text',
	edit: (props) => {
		const onClick = () => {
			if (props.isActive) {
				props.onChange(removeFormat(props.value, 'has/inline'));
				return;
			}
			if (props.value.start == props.value.end && !props.isActive) {
				return;
			}
			props.onChange(
				applyFormat(props.value, {
					type: 'has/inline',
					attributes: {
						class: 'has-inline-text',
					},
				})
			);
		};

		return (
			<Fragment>
				{false === props.isActive && (
					<RichTextToolbarButton
						icon={
							<svg
								xmlns='http://www.w3.org/2000/svg'
								enableBackground='new 0 0 24 24'
								height='24'
								viewBox='0 0 24 24'
								width='24'
							>
								<g>
									<rect fill='none' height='24' width='24' />
								</g>
								<g>
									<g>
										<g>
											<path d='M6,14l3,3v5h6v-5l3-3V9H6V14z M11,2h2v3h-2V2z M3.5,5.88l1.41-1.41l2.12,2.12L5.62,8L3.5,5.88z M16.96,6.59l2.12-2.12 l1.41,1.41L18.38,8L16.96,6.59z' />
										</g>
									</g>
								</g>
							</svg>
						}
						title={__('Highlight and Share', 'highlight-and-share')}
						onClick={onClick}
					/>
				)}
				{true === props.isActive && (
					<RichTextToolbarButton
						icon={
							<svg
								style={{backgroundColor: '#555d66', color: '#FFFFFF'}}
								xmlns='http://www.w3.org/2000/svg'
								enableBackground='new 0 0 24 24'
								height='24'
								viewBox='0 0 24 24'
								width='24'
							>
								<g>
									<rect fill='none' height='24' width='24' />
								</g>
								<g>
									<g>
										<g>
											<path d='M6,14l3,3v5h6v-5l3-3V9H6V14z M11,2h2v3h-2V2z M3.5,5.88l1.41-1.41l2.12,2.12L5.62,8L3.5,5.88z M16.96,6.59l2.12-2.12 l1.41,1.41L18.38,8L16.96,6.59z' />
										</g>
									</g>
								</g>
							</svg>
						}
						title={__('Highlight and Share', 'highlight-and-share')}
						onClick={onClick}
					/>
				)}
			</Fragment>
		);
	},
});
