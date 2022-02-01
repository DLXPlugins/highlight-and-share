// From: https://itnext.io/how-to-create-a-twitter-inspired-character-counter-with-an-svg-progress-ring-react-js-352f3c8eefbc

import PropTypes from 'prop-types'; // ES6

const { __, _x } = wp.i18n;

const { Button, ButtonGroup } = wp.components;

const baseColor = "rgb(29, 161, 242)";

const CircularCount = ( props ) => {
	const {
		chars,
	} = props;

	const r = 15;
	const circleLength = 2*Math.PI*r;

	const status = (circleLength*chars)/280;
	const colorDefault = circleLength - status > 0 ? circleLength - status : 0;
	const ringStyle = {
		stroke:
			// eslint-disable-next-line no-nested-ternary
			280 - chars <= 0
				? 'red'
				: 280 - chars <= 20
				? 'orange'
				: baseColor,
		strokeDasharray: `${status}  ${colorDefault}`,
	};

	return (
		<div className="has-circular-count">
			<svg>
				<circle className="default" cx="50%" cy="50%" r="15"></circle>
				<circle className="status" cx="50%" cy="50%" r="15" style={ringStyle}></circle>
			</svg>
		</div>
	);
};

CircularCount.defaultProps = {
	chars: 120,
};

CircularCount.propTypes = {
	chars: PropTypes.number,
};

export default CircularCount;
