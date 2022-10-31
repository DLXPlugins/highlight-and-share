import React from 'react';
import PreviewSocialIconListItem from '../PreviewSocialIconListItem';
// Import all the social media icons.
import SocialIcons from '../SocialIcons';

const PreviewSocialIconList = () => {
	const { getSocialIcons } = SocialIcons();
	const networks = getSocialIcons();

	return (
		<div className="has-admin-theme-preview-list highlight-and-share-wrapper theme-blue">{ networks.map( ( network, index ) => {
			if ( network.enabled ) {
				return (
					<PreviewSocialIconListItem
						key={ network.key }
						listItemKey={ network.key }
						className={ network.className }
						icon={ network.icon }
						index={ index }
					/>
				);
			}
			return null;
		} ) }
		</div>
	);
};

export default PreviewSocialIconList;
