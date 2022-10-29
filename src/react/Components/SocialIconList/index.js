import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialIconListItem from '../SocialIconListItem';
// Import all the social media icons.
import {
	TwitterIcon,
	FacebookIcon,
	WhatsappIcon,
	LinkedinIcon,
	RedditIcon,
	XingIcon,
	CopyIcon,
	EmailIcon,
	TelegramIcon,
} from '../SocialIcons';

const socialIcons = [];
let socialIconCount = 0;
for ( const [ key, value ] of Object.entries( hasAppearanceAdmin.socialNetworks ) ) {
	const classes = classNames( key, {
		'is-disabled': ! value.enabled,
		'is-custom': value.custom,
	} );

	// Set styles for the icon.
	let styles = {};
	if ( ! value.custom ) {
		styles = {
			color: value.color,
			background: value.background,
		};
	}
	let icon = null;
	switch ( key ) {
		case 'twitter':
			icon = <FontAwesomeIcon size={ '1x' } icon={ TwitterIcon } />;
			break;
		case 'facebook':
			icon = <FontAwesomeIcon size={ '1x' } icon={ FacebookIcon } />;
			break;
		case 'whatsapp':
			icon = <FontAwesomeIcon size={ '1x' } icon={ WhatsappIcon } />;
			break;
		case 'reddit':
			icon = <FontAwesomeIcon size={ '1x' } icon={ RedditIcon } />;
			break;
		case 'telegram':
			icon = <FontAwesomeIcon size={ '1x' } icon={ TelegramIcon } />;
			break;
		case 'linkedin':
			icon = <FontAwesomeIcon size={ '1x' } icon={ LinkedinIcon } />;
			break;
		case 'xing':
			icon = <FontAwesomeIcon size={ '1x' } icon={ XingIcon } />;
			break;
		case 'copy':
			icon = <FontAwesomeIcon size={ '1x' } icon={ CopyIcon } />;
			break;
		case 'email':
			icon = <FontAwesomeIcon size={ '1x' } icon={ EmailIcon } />;
			break;
	}
	socialIcons.push( {
		key,
		listItemKey: key,
		className: classes,
		styles,
		icon,
		index: socialIconCount,
	}
	);
	socialIconCount++;
}

const SocialIconList = () => {
	const [ networks, setNetworks ] = useState( socialIcons );

	const moveSocialNetwork = useCallback(
		( dragIndex, hoverIndex ) => {
			const dragItem = networks[ dragIndex ];
			const hoverItem = networks[ hoverIndex ];
			// Swap places of dragItem and hoverItem in the pets array
			setNetworks( () => {
				// For loop to get new indexes.
				const newNetworks = [];
				networks.forEach( ( network, index ) => {
					if ( index !== dragIndex && index !== hoverIndex ) {
						newNetworks.push( network );
					} else {
						if ( index === hoverIndex && dragIndex < hoverIndex ) {
							newNetworks.push( hoverItem );
							newNetworks.push( dragItem );
						}
						if ( index === hoverIndex && dragIndex > hoverIndex ) {
							newNetworks.push( dragItem );
							newNetworks.push( hoverItem );
						}
					}
				} );

				// Todo - Ajax call here to save the order.
				return newNetworks;
			} );
		},
		[ networks ],
	);

	return (
		<ul className="has-admin-theme-reorder-list">{ networks.map( ( network, index ) => (
			<SocialIconListItem
				key={ network.key }
				listItemKey={ network.listItemKey }
				className={ network.className }
				styles={ network.styles }
				icon={ network.icon }
				index={ index }
				moveSocialNetwork={ moveSocialNetwork }
			/>
		) ) }
		</ul>
	);
};

export default SocialIconList;
