import React from 'react';
// From: https://blog.logrocket.com/async-rendering-react-suspense/
// Error boundaries currently have to be classes.
class ErrorBoundary extends React.Component {
	state = { hasError: false, error: null };
	static getDerivedStateFromError( error ) {
		return {
			hasError: true,
			error,
		};
	}
	render() {
		if ( this.state.hasError ) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
