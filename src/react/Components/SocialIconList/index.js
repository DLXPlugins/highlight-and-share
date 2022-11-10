import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SocialIconListItem from '../SocialIconListItem';
import SocialIcons from '../SocialIcons';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';
import Spinner from '../Icons/Spinner';
import Notice from '../Notice';
import sendCommand from '../../Utils/SendCommand';

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

	/**
	 * Save the social networks and their orders.
	 */
	const saveSocialNetworksOrder = () => {
		setSaving( true );

		// Get social networks pruned for Ajax.
		const socialNetworksForAjax = [];
		let order = 0;
		networks.forEach( ( network ) => {
			socialNetworksForAjax.push( {
				slug: network.key ?? network.slug,
				order,
			} );
			order++;
		} );
		sendCommand( 'has_save_social_icon_order', {
			nonce: hasAppearanceAdmin.saveNonce,
			socialNetworks: socialNetworksForAjax,
		} )
			.then( ( response ) => {
				const { data, success } = response.data;
				setSocialNetworks( data );
				if ( success ) {
					setIsSaved( true );
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				}
			} )
			.catch( ( error ) => {
			} ).then( ( ) => {
				setSaving( false );
			} );
	};

	/**
	 * Reset the social networks and their orders.
	 */
	 const resetSocialNetworksOrder = () => {
		setResetting( true );

		sendCommand( 'has_reset_social_icon_order', {
			nonce: hasAppearanceAdmin.resetNonce,
		} )
			.then( ( response ) => {
				const { data, success } = response.data;
				setSocialNetworks( data );
				if ( success ) {
					setIsReset( true );
					setTimeout( () => {
						setIsReset( false );
					}, 3000 );
				}
			} )
			.catch( ( error ) => {
			} ).then( ( ) => {
				setResetting( false );
			} );
	};

	return (
		<>
			<ul className="has-admin-theme-reorder-list">{ networks.map( ( network, key ) => (
				<SocialIconListItem
					key={ network.key ?? network.slug }
					listItemKey={ network.key ?? network.slug }
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
						type="button"
						text={
							saving
								? __( 'Saving…', 'highlight-and-share' )
								: __( 'Save Order', 'highlight-and-share' )
						}
						icon={ saving ? Spinner : false }
						iconSize="18"
						iconPosition="right"
						disabled={ saving || resetting }
						onClick={ saveSocialNetworksOrder }
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
								: __( 'Reset Order', 'highlight-and-share' )
						}
						icon={ resetting ? Spinner : false }
						iconSize="18"
						iconPosition="right"
						disabled={ saving || resetting }
						onClick={ resetSocialNetworksOrder }
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
