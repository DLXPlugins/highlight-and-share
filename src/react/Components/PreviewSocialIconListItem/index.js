/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import classNames from 'classnames';
import { escapeAttribute, escapeEditableHTML } from '@wordpress/escape-html';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';

const PreviewSocialIconListItem = ( { listItemKey, className, icon, label } ) => {
	const { theme, hasIconsOnly, socialNetworkColors, appearanceThemeData, mainSettings } = useContext( SocialNetworksContext );
	const classes = classNames( className, `has_${ listItemKey }`, { 'has-tooltip': appearanceThemeData.show_tooltips } );

	let iconStyles = '';
	if ( ! appearanceThemeData.groupIcons && 'custom' === theme ) {
		const iconColor = socialNetworkColors[ listItemKey ].icon_color;
		const iconColorHover = socialNetworkColors[ listItemKey ].icon_color_hover;
		const backgroundColor = socialNetworkColors[ listItemKey ].background;
		const backgroundColorHover = socialNetworkColors[ listItemKey ].background_hover;

		iconStyles = `
			.has_${ listItemKey } a {
				color: ${ iconColor } !important;
				background: ${ backgroundColor } !important;
			}
			.has_${ listItemKey } a:hover {
				color: ${ iconColorHover } !important;
				background: ${ backgroundColorHover } !important;
			}
		`;
	}

	/**
	 * Get a translated label for the social network.
	 *
	 * @return {string} The social network label.
	 */
	const getLabel = () => {
		const maybeLabel = mainSettings[ `${ listItemKey }_label` ] ?? '';
		if ( '' === maybeLabel ) {
			return label;
		}
		return maybeLabel;
	};

	/**
	 * Get a tooltip for the social network.
	 *
	 * @return {string} The social network label.
	 */
	const getTooltip = () => {
		const maybeTooltip = mainSettings[ `${ listItemKey }_tooltip` ] ?? '';
		return maybeTooltip;
	};

	return (
		<div key={ listItemKey } className={ classes } data-tooltip={ escapeAttribute( getTooltip() ) }>
			<>
				{ iconStyles && <style>{ iconStyles }</style> }
				<a
					href="#"
					onClick={ ( e ) => {
						e.preventDefault();
					} }
				>
					{ icon }
					{ ( 'default' === appearanceThemeData.theme || ( 'custom' === appearanceThemeData.theme && ! appearanceThemeData.icons_only ) ) && (
						<>
							<span className="has-icon-label">{ `${ escapeEditableHTML( getLabel() ) }` }</span>
						</>
					) }
				</a>
			</>
		</div>
	);
};

export default PreviewSocialIconListItem;
