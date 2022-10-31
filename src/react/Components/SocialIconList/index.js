import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialIconListItem from '../SocialIconListItem';
import SocialIcons from '../SocialIcons';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
import { faGameConsoleHandheld } from '@fortawesome/pro-solid-svg-icons';


const SocialIconList = () => {
	const { getSocialIcons } = SocialIcons();

	const { setSocialNetworks } = useContext( SocialNetworksContext );
	const networks = getSocialIcons();
	const moveSocialNetwork = useCallback(
		( dragIndex, hoverIndex ) => {
			const dragItem = networks[ dragIndex ];
			const hoverItem = networks[ hoverIndex ];
			// Swap places of dragItem and hoverItem in the pets array
			setSocialNetworks( () => {
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
				console.log( newNetworks );
				// Todo - Ajax call here to save the order.
				return newNetworks;
			} );
		},
		[ networks ],
	);

	console.log( networks );

	return (
		<ul className="has-admin-theme-reorder-list">{ networks.map( ( network, key ) => (
			<SocialIconListItem
				key={ network.key }
				listItemKey={ network.key }
				className={ network.className }
				styles={ network.styles }
				icon={ network.icon }
				index={ network.index }
				moveSocialNetwork={ moveSocialNetwork }
			/>
		) ) }
		</ul>
	);
};

export default SocialIconList;
