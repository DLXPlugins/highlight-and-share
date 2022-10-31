import React, { useState } from 'react';
import classNames from 'classnames';
import PreviewSocialIconListItem from '../PreviewSocialIconListItem';
// Import all the social media icons.
import socialIcons from '../SocialIcons';

const PreviewSocialIconList = () => {
	const [ networks, setNetworks ] = useState( socialIcons );

	return (
		<ul className="has-admin-theme-preview-list">{ networks.map( ( network, index ) => {
			if ( network.enabled ) {
				return (
					<PreviewSocialIconListItem
						key={ network.key }
						listItemKey={ network.key }
						className={ network.className }
						styles={ network.styles }
						icon={ network.icon }
						index={ index }
					/>
				);
			}
			return null;
		} ) }
		</ul>
	);
};

export default PreviewSocialIconList;
