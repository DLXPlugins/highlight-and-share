/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import classNames from 'classnames';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';

const PreviewSocialIconListItem = ( { listItemKey, className, icon, theme, label } ) => {
	const { hasIconsOnly } = useContext( SocialNetworksContext );
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
				{ ( 'theme-default' === theme || ! hasIconsOnly ) && (
					<>
						{ ` ${ label } ` }
					</>
				)}
			</a>
		</div>
	);
};

export default PreviewSocialIconListItem;
