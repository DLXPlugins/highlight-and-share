import React from 'react';

/**
 * Build CSS rules for dimensions and screen size.
 * @param {array}  dimensions Dimensions array (see /components/DimensionsBlock).
 * @param {string} screenSize mobile|tablet|desktop.
 */
export function buildDimensionsCSS( dimensions, screenSize ) {
	
}

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {string} value Current value.
 * @param {string} type  Type of value (top, right, bottom, left, etc.).
 *
 * @return {string} Value placeholder.
 */
export function geHierarchicalPlaceholderValue( props, screenSize, value, type ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && '' === value ) {
		// Check tablet.
		if ( '' !== props.values.tablet[ type ] ) {
			return props.values.tablet[ type ];
		} else if ( '' !== props.values.desktop[ type ] ) {
			// Check desktop.
			return props.values.desktop[ type ];
		}
	}

	// Check tablet screen size.
	if ( 'tablet' === screenSize && '' === value ) {
		if ( '' !== props.values.desktop[ type ] ) {
			// Check desktop.
			return props.values.desktop[ type ];
		}
	}

	return '0';
};

/**
 * Get a value placeholder based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {string} value Current value.
 *
 * @return {string} Value default or hierarchical value.
 */
export function getHierarchicalValueUnit( props, screenSize, value ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && null === value ) {
		if ( null === props.values.tablet.unit ) {
			return props.values.desktop.unit;
		}
		return props.values.tablet.unit;
	}
	if ( 'tablet' === screenSize && null === value ) {
		return props.values.desktop.unit;
	}
	if ( null === value ) {
		return 'px';
	}
	return value;
};

/**
 * Get a value based on hierarchy. If the value is not set, get the value from the parent.
 *
 * @param {string} value Current value.
 *
 * @return {boolean} Value default or hierarchical value.
 */
export function getHierarchicalValueUnitSync( props, screenSize, value ) {
	// Check mobile screen size.
	if ( 'mobile' === screenSize && null === value ) {
		if ( null === props.values.tablet.unitSync ) {
			return props.values.desktop.unitSync;
		}
		return props.values.tablet.unitSync;
	}
	if ( 'tablet' === screenSize && null === value ) {
		return props.values.desktop.unitSync;
	}
	if ( null === value ) {
		return true;
	}
	return value;
};
