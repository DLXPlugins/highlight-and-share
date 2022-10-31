import React from 'react';
import classNames from 'classnames';

const PreviewSocialIconListItem = ( { listItemKey, className, styles, icon } ) => {
	const classes = classNames( className, {} );
	return (
		<li key={ listItemKey } className={ classes } style={ styles }>
			{ icon }
		</li>
	);
};

export default PreviewSocialIconListItem;
