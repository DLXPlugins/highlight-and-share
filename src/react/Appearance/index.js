import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Appearance from './appearance';
import SocialNetworksContext from '../Contexts/SocialNetworksContext';

const container = document.getElementById( 'has-appearance-admin-settings' );
const root = createRoot( container );

const Wrapper = () => {
	const [ socialNetworks, setSocialNetworks ] = useState( hasAppearanceAdmin.socialNetworks );
	const [ theme, setTheme ] = useState( hasAppearanceAdmin.theme );
	const [ appearanceThemeData, setAppearanceThemeData ] = useState( { } );
	const [ hasIconsOnly, setHasIconsOnly ] = useState( hasAppearanceAdmin.themeOptionsCustom.icons_only );

	return (
		<SocialNetworksContext.Provider value={ { socialNetworks, setSocialNetworks, theme, setTheme, appearanceThemeData, setAppearanceThemeData, hasIconsOnly, setHasIconsOnly } }>
			<Appearance />
		</SocialNetworksContext.Provider>
	);
};
root.render(
	<React.StrictMode>
		<Wrapper />
	</React.StrictMode>
);
