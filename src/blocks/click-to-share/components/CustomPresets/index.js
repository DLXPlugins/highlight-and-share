import React, { useState } from 'react';
import CustomPresetsContext from './context';
import CustomPresetContainer from './CustomPresetContainer';

const CustomPresets = ( props ) => {
	const [ savedPresets, setSavedPresets ] = useState( [] );
	const [ savingPreset, setSavingPreset ] = useState( false );

	return (
		<CustomPresetsContext.Provider
			value={ {
				savedPresets,
				setSavedPresets,
				savingPreset,
				setSavingPreset,
			} }
		>
			<CustomPresetContainer { ...props } />
		</CustomPresetsContext.Provider>
	);
};

export default CustomPresets;
