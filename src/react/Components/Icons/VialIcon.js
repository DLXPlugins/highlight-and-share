import React from 'react';
import PropTypes from 'prop-types'; // ES6

const VialIcon = ( props ) => {
	return (
		<svg
			width={ props.width }
			height={ props.height }
			{ ...props }
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			{ ...props }
		>
			<path
				fill={ props.fill }
				d="m502.6 169.4-160-160C336.4 3.125 328.2 0 320 0s-16.38 3.125-22.62 9.375c-12.5 12.5-12.5 32.75 0 45.25l6.975 6.977-271.4 271c-38.75 38.75-45.13 102-9.375 143.5C44.08 500 72.76 512 101.5 512h.447c26.38 0 52.75-9.1 72.88-30.12l275.2-274.6 7.365 7.367C463.6 220.9 471.8 224 480 224s16.38-3.125 22.62-9.375C515.1 202.1 515.1 181.9 502.6 169.4zm-192 86.6H200.2l149.3-149.1 55.18 55.12L310.6 256z"
			/>
		</svg>
	);
};
VialIcon.defaultProps = {
	width: 16,
	height: 16,
	fill: '#333333',
};

VialIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default VialIcon;
