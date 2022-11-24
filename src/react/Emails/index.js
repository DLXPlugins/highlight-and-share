import React from 'react';
import { createRoot } from 'react-dom/client';
import Emails from './emails';

const container = document.getElementById( 'has-emails-admin-settings' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<Emails />
	</React.StrictMode>
);
