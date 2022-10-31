import React, { useContext } from 'react';
import classNames from 'classnames';
import PreviewSocialIconListItem from '../PreviewSocialIconListItem';
// Import all the social media icons.
import SocialIcons from '../SocialIcons';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';

const PreviewSocialIconList = () => {
	const { theme } = useContext( SocialNetworksContext );

	const { getSocialIcons } = SocialIcons();
	const networks = getSocialIcons();

	return (
		<div
			className={ classNames(
				'has-admin-theme-preview-list highlight-and-share-wrapper',
				`theme-${ theme }`
			) }
		>
			{ networks.map( ( network, index ) => {
				if ( network.enabled ) {
					return (
						<PreviewSocialIconListItem
							key={ network.key }
							listItemKey={ network.key }
							className={ network.className }
							icon={ network.icon }
							index={ index }
							label={ network.label }
							theme={ `theme-${ theme }` }
						/>
					);
				}
				return null;
			} ) }
		</div>
	);
};

export default PreviewSocialIconList;
