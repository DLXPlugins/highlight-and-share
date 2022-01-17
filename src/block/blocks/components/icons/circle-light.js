const CircleLight = ( props ) => (
	<svg
		viewBox="0 0 398 398"
		xmlns="http://www.w3.org/2000/svg"
		xmlSpace="preserve"
		style={ {
			fillRule: 'evenodd',
			clipRule: 'evenodd',
			strokeLinecap: 'round',
			strokeLinejoin: 'round',
			strokeMiterlimit: 1.5,
			background: 'transparent',
		} }
		{ ...props }
	>
		<circle
			cx={ 1186.81 }
			cy={ 972.734 }
			r={ 198.415 }
			style={ {
				fill: '#ededed',
				stroke: '#000',
				strokeWidth: 1,
			} }
			transform="translate(-987.894 -773.819)"
		/>
	</svg>
);

export default CircleLight;
