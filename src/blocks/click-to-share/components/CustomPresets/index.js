import React, { useState } from 'react';
import CustomPresetsContext from './context';
import CustomPresetContainer from './CustomPresetContainer';

const CustomPresets = ( props ) => {
	const [ savedPresets, setSavedPresets ] = useState( [] );

	return (
		<CustomPresetsContext.Provider
			value={ {
				savedPresets,
				setSavedPresets,
			} }
		>
			<CustomPresetContainer { ...props } />
		</CustomPresetsContext.Provider>
	);
};

export default CustomPresets;
