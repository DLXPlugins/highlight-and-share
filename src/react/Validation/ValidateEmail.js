const ValidateEmail = ( email ) => {
	// From: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
	const regex =
/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if ( regex.test( email ) ) {
		return true;
	}
	return false;
};
export default ValidateEmail;
