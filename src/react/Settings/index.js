import React from 'react';
import { createRoot } from 'react-dom/client';
import Settings from './settings';

const container = document.getElementById( 'has-settings-admin' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Settings />
	</React.StrictMode>
);
