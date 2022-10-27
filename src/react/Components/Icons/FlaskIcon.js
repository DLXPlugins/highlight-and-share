import React from 'react';
import PropTypes from 'prop-types'; // ES6

const FlaskIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			{ ...props }
			width={ props.width }
			height={ props.height }
		>
			<path
				fill={ props.fill }
				d="M437.2 403.5 319.1 215V64h7.1c13.25 0 23.1-10.75 23.1-24V24c0-13.25-10.75-24-23.1-24H120c-13.2 0-23.99 10.75-23.99 24v16c0 13.25 10.75 24 23.1 24h7.1L128 215 10.8 403.5C-18.48 450.6 15.27 512 70.89 512h306.2c55.61 0 89.41-61.5 60.11-108.5zM137.1 320l48.15-77.63c4.55-5.07 6.65-11.57 6.65-18.37l.065-160h63.99l-.06 160c0 6.875 2.25 13.25 5.875 18.38L309.9 320H137.1z"
			/>
		</svg>
	);
};

FlaskIcon.defaultProps = {
	width: 16,
	height: 16,
	fill: '#333333',
};

FlaskIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	fill: PropTypes.string,
};

export default FlaskIcon;
