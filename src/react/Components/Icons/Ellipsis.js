import React from 'react';
import PropTypes from 'prop-types'; // ES6
const EllipsisIcon = ( props ) => (
	<svg
		aria-hidden="true"
		data-prefix="fal"
		data-icon="ellipsis-h"
		className="svg-inline--fa fa-ellipsis-h fa-w-10"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 320 512"
		width={ props.width }
		height={ props.height }
		{ ...props }
	>
		<path
			fill="currentColor"
			d="M192 256c0 17.7-14.3 32-32 32s-32-14.3-32-32 14.3-32 32-32 32 14.3 32 32zm88-32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-240 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
		/>
	</svg>
);

EllipsisIcon.defaultProps = {
	width: 48,
	height: 30,
	fill: '#FFFFFF',
};

EllipsisIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default EllipsisIcon;
