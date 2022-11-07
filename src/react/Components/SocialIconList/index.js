import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SocialIconListItem from '../SocialIconListItem';
import SocialIcons from '../SocialIcons';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
import Spinner from '../Icons/Spinner';
import Notice from '../Notice';

const SocialIconList = () => {
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ resetting, setResetting ] = useState( false );
	const [ isReset, setIsReset ] = useState( false );

	// Get social icons function.
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
				// Todo - Ajax call here to save the order.
				return newNetworks;
			} );
		},
		[ networks ],
	);

	return (
		<>
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
			<div className="has-admin__tabs--content-actions">
				<div className="has-admin__tabs--content-actions--left">
					<Button
						className={ classNames(
							'has__btn has__btn-primary has__btn--icon-right',
							{ 'has-icon': saving },
							{ 'is-saving': { saving } }
						) }
						type="submit"
						text={
							saving
								? __( 'Saving…', 'highlight-and-share' )
								: __( 'Save Settings', 'highlight-and-share' )
						}
						icon={ saving ? Spinner : false }
						iconSize="18"
						iconPosition="right"
						disabled={ saving || resetting }
					/>
				</div>
				<div className="has-admin__tabs--content-actions--right">
					<Button
						className={ classNames(
							'has__btn has__btn-danger has__btn--icon-right',
							{ 'has-icon': resetting },
							{ 'is-resetting': { resetting } }
						) }
						type="button"
						text={
							resetting
								? __( 'Resetting…', 'highlight-and-share' )
								: __( 'Reset Settings', 'highlight-and-share' )
						}
						icon={ resetting ? Spinner : false }
						iconSize="18"
						iconPosition="right"
						disabled={ saving || resetting }
						onClick={ ( e ) => {
							setResetting( true );
							handleReset( e );
						} }
					/>
				</div>
			</div>
			{ isSaved && (
				<Notice
					message={ __( 'Your settings have been saved.' ) }
					status="success"
					politeness="assertive"
				/>
			) }
			{ isReset && (
				<Notice
					message={ __( 'Your settings have been reset to defaults.' ) }
					status="success"
					politeness="assertive"
				/>
			) }
		</>
	);
};

export default SocialIconList;
