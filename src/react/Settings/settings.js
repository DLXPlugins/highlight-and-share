import React from 'react';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
export default () => {
	return (
		<>
			<ToggleControl
				label={ __(
					'Enable Akismet for Comments',
					'comment-edit-pro'
				) }
				className="sce-admin__toggle-control"
				checked={ true }
				onChange={ ( boolValue ) => {
					//setShowButtonOptions( boolValue );
					//onChange( boolValue );
				} }
				help={ __(
					'Akismet protection is on by default for comments. Disabling this will prevent Akismet protection for new comments.',
					'comment-edit-pro'
				) }
			/>
		</>
	);
};