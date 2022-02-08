import axios from 'axios';
import qs from 'qs';

export default function sendCommand( action, data ) {

	let params = {
		action: action,
	};

	let default_data = {
		nonce: false,
		action: action,
	};

	if ('undefined' === typeof data) data = {};

	for (var opt in default_data) {
		if (!data.hasOwnProperty(opt)) { data[opt] = default_data[opt]; }
	}

	const options = {
		method: 'post',
		url: ajaxurl,
		params: params,
		paramsSerializer: function( params ) {
			return qs.stringify(params, {arrayFormat: 'brackets'})
		},
		data: qs.stringify(data)
	};

	return axios(options);
}