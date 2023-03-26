import React, { useState, useRef } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, Popover } from '@wordpress/components';
import TextInsertIcon from '../Icons/TextInsert';

const TEMPLATE_TAGS = [
	{ name: __( 'Site Name', 'highlight-and-share' ), tag: '{{site_name}}' },
	{ name: __( 'Site URL', 'highlight-and-share' ), tag: '{{site_url}}' },
	{ name: __( 'Post title', 'highlight-and-share' ), tag: '{{post_title}}' },
	{ name: __( 'Post excerpt', 'highlight-and-share' ), tag: '{{post_excerpt}}' },
	{ name: __( 'Post URL', 'highlight-and-share' ), tag: '{{post_url}}' },
	{ name: __( 'From Name', 'highlight-and-share' ), tag: '{{from_name}}' },
	{ name: __( 'From email', 'highlight-and-share' ), tag: '{{from_email}}' },
	{ name: __( 'To email', 'highlight-and-share' ), tag: '{{to_email}}' },
	{ name: __( 'Share Type', 'highlight-and-share' ), tag: '{{share_type}}' },
	{ name: __( 'Share Text', 'highlight-and-share' ), tag: '{{share_text}}' },
	{ name: __( 'Date', 'highlight-and-share' ), tag: '{{date}}' },
];

const EmailTemplateTags = ( props ) => {
	const { onSelect } = props;
	const [ isOpen, setIsOpen ] = useState( false );
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );
	const togglePopover = () => setIsOpen( ! isOpen );
	const toggleButton = useRef( null );

	return (
		<>
			<div className="has-email-template-tags">
				<Button
					className="has-icon"
					label={ __( 'Insert Email Template Tag', 'highlight-and-share' ) }
					icon={ TextInsertIcon }
					onClick={ togglePopover }
					ref={ setPopoverAnchor }
				/>
			</div>
			{ isOpen && (
				<Popover
					className="has-email-template-tags__popover"
					placement="right-end"
					onClose={ togglePopover }
					anchor={ popoverAnchor }
					noArrow={ false }
				>
					<ul className="has-email-template-tags__popover-tags">
						{ TEMPLATE_TAGS.map( ( tag ) => (
							<li key={ tag.tag }>
								<Button
									onClick={ () => {
										onSelect( tag.tag );
										togglePopover();
									} }
								>
									{ tag.name }
								</Button>
							</li>
						) ) }
					</ul>
				</Popover>
			) }
		</>
	);
};

export default EmailTemplateTags;
