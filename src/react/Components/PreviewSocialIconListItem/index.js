/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classNames from 'classnames';

const PreviewSocialIconListItem = ( { listItemKey, className, icon, theme, label } ) => {
	const classes = classNames( className, `has_${ listItemKey }` );
	return (
		<div key={ listItemKey } className={ classes }>
			<a
				href="#"
				onClick={ ( e ) => {
					e.preventDefault();
				} }
			>
				{ icon }
				{ 'default' === theme && (
					<>
						{ ` ${ label } ` }
					</>
				)}
			</a>
		</div>
	);
};

export default PreviewSocialIconListItem;
