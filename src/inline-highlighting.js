import { __ } from '@wordpress/i18n';
import { registerFormatType, applyFormat, removeFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

const HighlightSvg = ( props ) => {
	return (
		<svg
			clipRule="evenodd"
			fillRule="evenodd"
			height={ 24 }
			strokeLinejoin="round"
			strokeMiterlimit={ 2 }
			viewBox="0 0 32 32"
			width={ 24 }
			xmlns="http://www.w3.org/2000/svg"
			style={{ backgroundColor: props.background, padding: props.padding } }
		>
			<path fill={ props.color } d="M3 30h14.503a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2zm6.515-19.054-1.592 1.077a3.001 3.001 0 0 0-.442 4.607l.796.795-1.458 6.368a.943.943 0 0 0-.022.138l-1.183 1.184a1 1 0 0 0 1.414 1.414l1.184-1.183a1.1 1.1 0 0 0 .138-.022l6.368-1.458.652.653a3.001 3.001 0 0 0 4.607-.442l1.077-1.592zm1.688-1.14 10.991 10.991 7.292-10.792a3.001 3.001 0 0 0-.365-3.801l-3.325-3.325a3.001 3.001 0 0 0-3.801-.365z" />
		</svg>
	);
};

registerFormatType( 'has/inline', {
	title: __( 'Highlight and Share', 'highlight-and-share' ),
	tagName: 'span',
	attributes: {
		class: 'class',
	},
	className: 'has-inline-text',
	edit: ( props ) => {
		const onClick = () => {
			if ( props.isActive ) {
				props.onChange( removeFormat( props.value, 'has/inline' ) );
				return;
			}
			if ( props.value.start === props.value.end && ! props.isActive ) {
				return;
			}
			props.onChange(
				applyFormat( props.value, {
					type: 'has/inline',
					attributes: {
						class: 'has-inline-text',
					},
				} )
			);
		};

		return (
			<>
				{ false === props.isActive && (
					<RichTextToolbarButton
						icon={
							<HighlightSvg background="transparent" color="#cbb200" padding="0" />
						}
						title={ __( 'Inline Social Highlight', 'highlight-and-share' ) }
						onClick={ onClick }
					/>
				) }
				{ true === props.isActive && (
					<RichTextToolbarButton
						icon={
							<HighlightSvg background="#1e1e1e" color="#ffd700" padding="5px" />
						}
						title={ __( 'Inline Social Highlight', 'highlight-and-share' ) }
						onClick={ onClick }
					/>
				) }
			</>
		);
	},
} );
