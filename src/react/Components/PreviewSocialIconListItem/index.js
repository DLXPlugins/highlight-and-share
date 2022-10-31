import React from 'react';
import classNames from 'classnames';

const PreviewSocialIconListItem = ( { listItemKey, className, icon } ) => {
	const classes = classNames( className, {} );
	return (
		<li key={ listItemKey } className={ classes }>
			{ icon }
		</li>
	);
};

export default PreviewSocialIconListItem;
