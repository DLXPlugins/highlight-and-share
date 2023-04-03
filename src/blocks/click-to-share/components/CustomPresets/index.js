import React, { useState } from 'react';
import CustomPresetsContext from './context';
import CustomPresetContainer from './CustomPresetContainer';

const CustomPresets = ( props ) => {
	const [ savedPresets, setSavedPresets ] = useState( [] );
	const [ savingPreset, setSavingPreset ] = useState( false );
	const [ editPresets, setEditPresets ] = useState( false );
	const [ showEditModal, setShowEditModal ] = useState( false );
	const [ showDeleteModal, setShowDeleteModal ] = useState( false );

	return (
		<CustomPresetsContext.Provider
			value={ {
				savedPresets,
				setSavedPresets,
				savingPreset,
				setSavingPreset,
				editPresets,
				setEditPresets,
				showEditModal,
				setShowEditModal,
				showDeleteModal,
				setShowDeleteModal,
			} }
		>
			<CustomPresetContainer { ...props } />
		</CustomPresetsContext.Provider>
	);
};

export default CustomPresets;
