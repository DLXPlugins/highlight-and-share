import React from 'react';
import { createRoot } from 'react-dom/client';
import Appearance from './appearance';

const container = document.getElementById( 'has-appearance-admin-settings' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Appearance />
	</React.StrictMode>
);
