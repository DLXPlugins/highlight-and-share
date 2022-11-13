import { useDispatch, useSelect, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/* Credits: Forked from GenerateBlocks */

export default () => {
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType = () => {},
	} = useDispatch( 'core/edit-post' );

	const deviceType = useSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType: experimentalGetPreviewDeviceType = () => false,
		} = select( 'core/edit-post' );

		return experimentalGetPreviewDeviceType();
	}, [] );

	useEffect( () => {
	}, [ deviceType ] );

	const setDeviceType = ( type ) => {
		setPreviewDeviceType( type );
	};

	return [ deviceType, setDeviceType ];
};
