import React from 'react';
import { createRoot } from 'react-dom/client';
import View from './view';

const container = document.getElementById( 'has-email-interface' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<View />
	</React.StrictMode>
);
