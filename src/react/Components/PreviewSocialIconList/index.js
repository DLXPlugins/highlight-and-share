import React, { useContext } from 'react';
import classNames from 'classnames';
import PreviewSocialIconListItem from '../PreviewSocialIconListItem';
// Import all the social media icons.
import SocialIcons from '../SocialIcons';
import SocialNetworksContext from '../../Contexts/SocialNetworksContext';

const PreviewSocialIconList = () => {
	const { theme, appearanceThemeData } = useContext( SocialNetworksContext );
	const { getSocialIcons } = SocialIcons();
	const networks = getSocialIcons();

	let themeStyles = '';
	if ( 'custom' === theme ) {
		if ( typeof appearanceThemeData.groupIcons !== 'undefined' && appearanceThemeData.groupIcons ) {
			themeStyles += `
				.has-admin-theme-preview-list.highlight-and-share-wrapper {
					background-color: ${ appearanceThemeData.backgroundColor };
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
					color: ${ appearanceThemeData.iconColorsGroup } !important;
				}
				.has-admin-theme-preview-list.highlight-and-share-wrapper div a:hover {
					color: ${ appearanceThemeData.iconColorsGroupHover } !important;
					background-color: ${ appearanceThemeData.backgroundColorHover } !important;
				}
			`;
			// Get border radius values.
			if ( appearanceThemeData.borderRadiusGroup.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper {
						border-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper {
						border-top-left-radius: ${ appearanceThemeData.borderRadiusGroup.attrTop }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
						border-top-right-radius: ${ appearanceThemeData.borderRadiusGroup.attrRight }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
						border-bottom-right-radius: ${ appearanceThemeData.borderRadiusGroup.attrBottom }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
						border-bottom-left-radius: ${ appearanceThemeData.borderRadiusGroup.attrLeft }${ appearanceThemeData.borderRadiusGroup.attrUnit } !important;
					}
				`;
			}
		}
		if ( typeof appearanceThemeData.groupIcons !== 'undefined' && ! appearanceThemeData.groupIcons ) {
			if ( appearanceThemeData.borderRadiusIcons.attrSyncUnits ) {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-radius: ${ appearanceThemeData.borderRadiusIcons.attrTop }${ appearanceThemeData.borderRadiusIcons.attrUnit } !important;
					}
				`;
			} else {
				themeStyles += `
					.has-admin-theme-preview-list.highlight-and-share-wrapper div a {
						border-top-left-radius: ${ appearanceThemeData.borderRadiusIcons.attrTop }${ appearanceThemeData.borderRadiusIcons.attrUnit } !important;
						border-top-right-radius: ${ appearanceThemeData.borderRadiusIcons.attrRight }${ appearanceThemeData.borderRadiusIcons.attrUnit } !important;
						border-bottom-right-radius: ${ appearanceThemeData.borderRadiusIcons.attrBottom }${ appearanceThemeData.borderRadiusIcons.attrUnit } !important;
						border-bottom-left-radius: ${ appearanceThemeData.borderRadiusIcons.attrLeft }${ appearanceThemeData.borderRadiusIcons.attrUnit } !important;
					}
				`;
			}
		}
	}

	return (
		<>
			<style>
				{ themeStyles }
			</style>
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
		</>
	);
};

export default PreviewSocialIconList;
