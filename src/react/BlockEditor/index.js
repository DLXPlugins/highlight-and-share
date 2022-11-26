import React from 'react';
import { createRoot } from 'react-dom/client';
import BlockEditor from './block-editor';

const container = document.getElementById( 'has-block-editor-admin-settings' );
const root = createRoot( container );
root.render(
	<React.StrictMode>
		<BlockEditor />
	</React.StrictMode>
);
