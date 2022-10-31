import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialIconListItem from '../SocialIconListItem';
import socialIcons from '../SocialIcons';


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
